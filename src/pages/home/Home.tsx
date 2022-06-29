import Header from "../../components/Header/Header"
import { useAppSelector } from "../../config/store"
import IProduct from "../../shared/models/IProduct"
import ProductsList from "./components/ProductsList/ProductsList"
import './home.scss'

const Home = () => {
    const { user } = useAppSelector(state => state.authentication)

    const products: IProduct[] = [{ id: 1, name: "Product 1", price: 100 }, { id: 2, name: "Product 2", price: 200 }, { id: 3, name: "Product 3", price: 300 }, {id: 4, name: "Product 4", price: 400}]

    return (
        <div>
            <Header user={user} />
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