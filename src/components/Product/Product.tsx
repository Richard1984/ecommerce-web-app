import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import IProduct from "../../shared/models/IProduct"
import Button from "../Button/Button"
import Paper from "../Paper/Paper"
import styles from './product.module.scss'

interface ProductProps {
    product: IProduct;
    className?: string;
}

const Product = (props: ProductProps) => {

    const { product, className } = props

    return (
        <Paper className={styles.product + (className ? " " + className : "")}>
            <Link to={"/products/" + product.id} className={styles.image}>
                <img src="https://picsum.photos/150" alt="product" />
            </Link>
            <div className={styles.body}>
                <Link to={"/products/" + product.id} className={styles.info}>
                    <h3 className={styles.name}>{product.name}</h3>
                    <p className={styles.price}>{product.price + " €"}</p>
                </Link>
                <div className={styles.actions}>
                    <Button size="small" leftIcon={<FontAwesomeIcon icon={faShoppingCart} />} text="Aggiungi al carrello" />
                </div>
            </div>
        </Paper>
    )
}

export default Product