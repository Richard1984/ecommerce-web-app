import { useEffect, useState } from "react"
import ProductsList from "../../components/ProductsList/ProductsList"
import api from "../../config/api"
import IProduct from "../../shared/models/IProduct"
import styles from './home.module.scss'

const Home = () => {
    const [newestProducts, setNewestProducts] = useState<IProduct[]>([]);
    const [bestSellingProducts, setBestSellingProducts] = useState<IProduct[]>([]);
    const [bestDealsProducts, setBestDealsProducts] = useState<IProduct[]>([]);


    const search = async (searchParams: { sort_criteria: string, sort_order: string }) => {
        const params = new URLSearchParams();
        params.append("sort_criteria", searchParams.sort_criteria);
        params.append("sort_order", searchParams.sort_order);

        const response = await api.get<{ data: IProduct[] }>("/products", { params });
        return response.data.data
    }

    useEffect(() => {
        const getProducts = async () => {
            const results = await Promise.all([search({ sort_criteria: "created_at", sort_order: "asc" }), search({ sort_criteria: "total_ordered", sort_order: "desc" }), search({ sort_criteria: "price", sort_order: "asc" })])
            setNewestProducts(results[0])
            setBestSellingProducts(results[1])
            setBestDealsProducts(results[2])
        }
        getProducts()
    }, [])

    return (
        <div className={styles.content}>
            <ProductsList title="Nuovi prodotti" products={newestProducts} />
            <ProductsList title="Prodotti più venduti" products={bestSellingProducts} />
            <ProductsList title="Dal prezzo più basso" products={bestDealsProducts} />
        </div>
    )
}

export default Home