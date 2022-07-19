import { faSearch, faTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Chip from '../../components/Chip/Chip';
import Product from '../../components/Product/Product';
import Select from '../../components/Select/Select';
import api from '../../config/api';
import { useAppSelector } from '../../config/store';
import IProduct from '../../shared/models/IProduct';
import styles from './search.module.scss';

type SortType = "price_asc" | "price_desc" | "created_at_asc" | "created_at_desc"

const SearchRoute = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState<IProduct[]>([]);
    const { entities: categories } = useAppSelector(state => state.categories);
    const [sort, setSort] = useState<SortType>("price_asc");

    const options = [{
        value: "price_asc", label: "Prezzo (Crescente)"
    }, {
        value: "price_desc", label: "Prezzo (Decrescente)"
    }, {
        value: "created_at_asc", label: "Data (Crescente)"
    }, {
        value: "created_at_desc", label: "Data (Decrescente)",
    }];

    useEffect(() => {
        const getProducts = async () => {
            const params = new URLSearchParams();
            if (searchParams.has("category_id") && searchParams.get("category_id") !== "all") {
                params.append("category_id", searchParams.get("category_id")!);
            }
            if (searchParams.has("search_name")) {
                params.append("search_name", searchParams.get("search_name")!);
            }

            params.append("sort_criteria", searchParams.get("sort_criteria")!);
            params.append("sort_order", searchParams.get("sort_order")!);

            const response = await api.get<{ data: IProduct[] }>(`/products`, {
                params
            });
            setProducts(response.data.data)
        }
        if (!searchParams.has("sort_criteria") || !searchParams.has("sort_order")) {
            setSearchParams({
                ...(searchParams.has("search_name") ? { search_name: searchParams.get("search_name")! } : {}),
                ...(searchParams.has("category_id") ? { category_id: searchParams.get("category_id")! } : {}),
                sort_criteria: "created_at",
                sort_order: "asc",
            })
            return
        } else {
            getProducts()
        }
    }, [searchParams])

    useEffect(() => {

        if (sort === "price_asc") {
            setSearchParams({
                ...(searchParams.has("search_name") ? { search_name: searchParams.get("search_name")! } : {}),
                ...(searchParams.has("category_id") ? { category_id: searchParams.get("category_id")! } : {}),
                sort_criteria: "price",
                sort_order: "asc",
            })
        } else if (sort === "price_desc") {
            setSearchParams({
                ...(searchParams.has("search_name") ? { search_name: searchParams.get("search_name")! } : {}),
                ...(searchParams.has("category_id") ? { category_id: searchParams.get("category_id")! } : {}),
                sort_criteria: "price",
                sort_order: "desc",
            })
        } else if (sort === "created_at_asc") {
            setSearchParams({
                ...(searchParams.has("search_name") ? { search_name: searchParams.get("search_name")! } : {}),
                ...(searchParams.has("category_id") ? { category_id: searchParams.get("category_id")! } : {}),
                sort_criteria: "created_at",
                sort_order: "asc",
            })
        } else if (sort === "created_at_desc") {
            setSearchParams({
                ...(searchParams.has("search_name") ? { search_name: searchParams.get("search_name")! } : {}),
                ...(searchParams.has("category_id") ? { category_id: searchParams.get("category_id")! } : {}),
                sort_criteria: "created_at",
                sort_order: "desc",
            })
        }
    }, [sort])

    useEffect(() => {
        if (searchParams.has("sort_criteria") && searchParams.has("sort_order")) {
            setSort((searchParams.get("sort_criteria") + "_" + searchParams.get("sort_order")) as SortType);
        }
    }, [])

    return (
        <div className={styles.content}>
            <div className={styles.header}>
                <div className={styles.info}>
                    <h3 className={styles.text}>Risultati ricerca per: </h3>
                    <div className={styles.filters}>
                        {searchParams.has("search_name") ? <Chip className={styles.chip} label={searchParams.get("search_name")!} leftIcon={<FontAwesomeIcon icon={faSearch} />} /> : null}
                        {searchParams.has("category_id") && searchParams.get("category_id") !== "all" ? <Chip className={styles.chip} label={categories?.find(c => c.id === parseInt(searchParams.get("category_id") || ""))?.name || ""} leftIcon={<FontAwesomeIcon icon={faTag} />} /> : null}
                    </div>

                </div>
                <div className={styles.options}>
                    <h3 className={styles.text}>Ordina risultati ricerca per: </h3>
                    <Select name="sort-products" options={options} value={sort} onChange={(event, value) => setSort(value as SortType)} />
                </div>
            </div>
            <div className={styles.products}>
                {products.map(product => <Product key={product.id} product={product} className={styles.product} />)}
            </div>
        </div>
    )
}

export default SearchRoute