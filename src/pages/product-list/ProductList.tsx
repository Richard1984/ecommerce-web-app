import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import api from "../../config/api";
import IProduct from "../../shared/models/IProduct";
import Product from "./component/Product";
import styles from "./product-list.module.scss";

const ProductList = () => {
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        const getProducts = async () => {
            const params = new URLSearchParams();
            params.append("sort_criteria", "created_at");
            params.append("sort_order", "desc");
            const result = await api.get<{ data: IProduct[] }>("/products", { params });
            setProducts(result.data.data)

        }
        getProducts()
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.title}>
                    Gestione prodotti
                </div>
                <Button to="/admin/products/new" text="Aggiungi prodotto" leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                    
                </Button>
            </div>
            <div className={styles.products}>
                {products.map(prod =>
                    <Product key={prod.id} img={prod.images[0]?.url || "https://via.placeholder.com/250"} name={prod.name} price={prod.price} id={prod.id} />
                )}
            </div>
        </div>
    )
}
export default ProductList;