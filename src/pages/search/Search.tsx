import { faSearch, faTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import Chip from '../../components/Chip/Chip';
import api from '../../config/api';
import { useAppSelector } from '../../config/store';
import IProduct from '../../shared/models/IProduct';
import ProductsList from '../home/components/ProductsList/ProductsList';
import styles from './search.module.scss';

interface IQuery {
    category_id?: string | null,
    search_name?: string | null,
}

interface SearchProps {

}

const useQuery = () => {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
}

const Search = (props: SearchProps) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [newestProducts, setNewestProducts] = useState<IProduct[]>([]);
    const [bestSellingProducts, setBestSellingProducts] = useState<IProduct[]>([]);
    const [bestDealsProducts, setBestDealsProducts] = useState<IProduct[]>([]);
    const [query, setQuery] = useState<IQuery>({
        category_id: searchParams.get("category_id") as string | null,
        search_name: searchParams.get("search_name") as string | null,
    });
    const { entities: categories } = useAppSelector(state => state.categories);


    const search = async (searchParams: IQuery & { sort_criteria: string, sort_order: string }) => {
        const params = new URLSearchParams();
        if (searchParams.category_id && searchParams.category_id !== "all") {
            params.append("category_id", searchParams.category_id);
        }
        if (searchParams.search_name) {
            params.append("search_name", searchParams.search_name);
        }
        params.append("sort_criteria", searchParams.sort_criteria);
        params.append("sort_order", searchParams.sort_order);

        const response = await api.get<{ data: IProduct[] }>("/products", { params });
        return response.data.data
    }

    useEffect(() => {
        setQuery({
            category_id: searchParams.get('category'),
            search_name: searchParams.get('search_name'),
        })
    }, [searchParams])

    useEffect(() => {
        const getProducts = async () => {
            const results = await Promise.all([search({ ...query, sort_criteria: "date_created", sort_order: "asc" }), search({ ...query, sort_criteria: "total_ordered", sort_order: "desc" }), search({ ...query, sort_criteria: "price", sort_order: "asc" })])
            setNewestProducts(results[0])
            setBestSellingProducts(results[1])
            setBestDealsProducts(results[2])
        }
        getProducts()
     }, [query])

    return (
        <>
            <div className={styles.header}>
                <h3 className={styles.title}>Risultati ricerca per: </h3>
                <div className={styles.filters}>
                    {query.search_name ? <Chip className={styles.chip} label={query.search_name} leftIcon={<FontAwesomeIcon icon={faSearch} />} /> : null}
                    {query.category_id && query.category_id !== "all" ? <Chip className={styles.chip} label={categories?.find(c => c.id === parseInt(query.category_id || ""))?.name || ""} leftIcon={<FontAwesomeIcon icon={faTag} />} /> : null}
               </div>
            </div>
            <div className={styles.content}>
                <ProductsList title="Nuovi prodotti" products={newestProducts} />
                <ProductsList title="Prodotti più venduti" products={bestSellingProducts} />
                <ProductsList title="Dal prezzo più basso" products={bestDealsProducts} />
            </div>
        </>
    )
}

export default Search