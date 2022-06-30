import { useEffect, useState } from "react"
import Header from "../../components/Header/Header"
import api from "../../config/api"
import { useAppDispatch, useAppSelector } from "../../config/store"
import { getCategories } from "../../reducers/categories"
import IProduct from "../../shared/models/IProduct"
import ProductsList from "./components/ProductsList/ProductsList"
import './home.scss'

const Home = () => {
    const dispatch = useAppDispatch()
    const [products, setProducts] = useState<IProduct[]>([])
    const { user } = useAppSelector(state => state.authentication)

    useEffect(() => {
        const getProducts = async () => {
            const response = await api.get<{ data: IProduct[] }>("/products")
            setProducts(response.data.data)
        }
        getProducts()
        dispatch(getCategories())
    }, [])

    return (
        <div>
            <Header user={user}/>
            <div className="content">
                <ProductsList title="I prodotti piu venduti" products={products} />
                <ProductsList title="I prodotti piu amati" products={products} />
                <ProductsList title="I prodotti piu venduti" products={products} />
                <ProductsList title="I prodotti piu amati" products={products} />
            </div>
        </div>
    )
}

export default Home