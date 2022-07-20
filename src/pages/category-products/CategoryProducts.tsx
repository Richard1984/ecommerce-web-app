import { faTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Chip from '../../components/Chip/Chip';
import ProductsList from '../../components/ProductsList/ProductsList';
import api from '../../config/api';
import { useAppSelector } from '../../config/store';
import IProduct from '../../shared/models/IProduct';
import styles from './category-products.module.scss';
const CategoryProductsRoute = () => {
    const params = useParams<{ id?: string }>();
    const [newestProducts, setNewestProducts] = useState<IProduct[]>([]);
    const [bestSellingProducts, setBestSellingProducts] = useState<IProduct[]>([]);
    const [bestDealsProducts, setBestDealsProducts] = useState<IProduct[]>([]);
    const { entities: categories } = useAppSelector(state => state.categories);


    const search = async (sort: { sort_criteria: string, sort_order: string }) => {
        const response = await api.get<{ data: IProduct[] }>(`/categories/${params.id}/products`, {
            params: {
                sort_criteria: sort.sort_criteria,
                sort_order: sort.sort_order,
            }
        });
        return response.data.data
    }

    useEffect(() => {
        const getProducts = async () => {
            const results = await Promise.all([
                search({ sort_criteria: "created_at", sort_order: "desc" }),
                search({ sort_criteria: "total_ordered", sort_order: "desc" }),
                search({ sort_criteria: "price", sort_order: "asc" })
            ])
            setNewestProducts(results[0])
            setBestSellingProducts(results[1])
            setBestDealsProducts(results[2])
        }
        getProducts()
    }, [params.id])

    return (
        <>
            <div className={styles.header}>
                <h1 className={styles.title}>Prodotti nella categoria </h1>
                <div className={styles.filters}>
                    {params.id ? <Chip className={styles.chip} label={categories?.find(c => c.id === parseInt(params.id || ""))?.name || ""} leftIcon={<FontAwesomeIcon icon={faTag} />} /> : null}
                </div>
            </div>
            <div className={styles.content}>
                <ProductsList title="Nuovi prodotti" products={newestProducts} />
                <ProductsList title="Prodotti più venduti" products={bestSellingProducts} />
                <ProductsList title="Dal prezzo più basso" products={bestDealsProducts} />
                <ProductsList title="Dal prezzo più alto" products={bestDealsProducts.reverse()} />
            </div>
        </>
    )
}

export default CategoryProductsRoute