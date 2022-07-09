import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import IProduct from "../../shared/models/IProduct"
import Button from "../Button/Button"
import styles from './product.module.scss'

interface ProductProps {
    product: IProduct;
    className?: string;
}

const Product = (props: ProductProps) => {

    const { product, className } = props

    return (
        <Link to={"/products/" + product.id} className={styles.product + (className ? " " + className : "")}>
            <div className={styles.image}>
                <img src="https://picsum.photos/150" alt="product" />
            </div>
            <div className={styles.body}>
                <div className={styles.info}>
                    <h3 className={styles.name}>{product.name}</h3>
                    <p className={styles.price}>{product.price + " €"}</p>
                </div>
                <div className={styles.actions}>
                    <Button leftIcon={<FontAwesomeIcon icon={faShoppingCart} />} text="Aggiungi al carrello" />
                </div>
            </div>
        </Link>
    )
}

export default Product