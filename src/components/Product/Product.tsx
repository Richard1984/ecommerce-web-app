import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import api from "../../config/api";
import IProduct from "../../shared/models/IProduct";
import Button from "../Button/Button";
import Paper from "../Paper/Paper";
import styles from './product.module.scss';

interface ProductProps {
    product: IProduct;
    className?: string;
}

const Product = (props: ProductProps) => {

    const { product, className } = props;

    const handleAddToCart = async () => {
        await api.put("/account/cart", { 
            op : "create",
            product_id: product.id,
            quantity: 1
        });
    };

    return (
        <Paper className={styles.product + (className ? " " + className : "")}>
            <Link to={"/products/" + product.id} className={styles.image}>
                <img src={product.images[0]?.url || "https://via.placeholder.com/230"} alt="product" />
            </Link>
            <div className={styles.body}>
                <Link to={"/products/" + product.id} className={styles.primary}>
                        <div className={styles.name}>{product.name}</div>
                </Link>
                <div className={styles.secondary}>
                    <Link to={"/products/" + product.id} className={styles.price}>{product.price + " €"}</Link>
                        <Button
                            size="small"
                            leftIcon={<FontAwesomeIcon icon={faShoppingCart} />}
                        onClick={handleAddToCart}
                        text="Aggiungi al carrello"
                        fullWidth
                        className={styles.addToCart}
                        />
                    </div>
            </div>
        </Paper>
    );
};

export default Product;