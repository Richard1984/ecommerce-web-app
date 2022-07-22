import { faCheck, faPencil, faShoppingCart, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../config/api";
import { useAppSelector } from "../../config/store";
import UserRoleEnum from "../../shared/enums/role.enum";
import IProduct from "../../shared/models/IProduct";
import hasAnyAuthority from "../../shared/utils/authorities";
import Button from "../Button/Button";
import Paper from "../Paper/Paper";
import styles from './product.module.scss';

interface ProductProps {
    product: IProduct;
    className?: string;
}

const Product = (props: ProductProps) => {
    const { user } = useAppSelector(state => state.authentication);
    const [addToCardButton, setAddToCardButton] = useState<{ icon: IconDefinition, text: string | undefined }>({
        icon: faShoppingCart,
        text: "Aggiungi al carrello"
    });

    const { product, className } = props;

    const handleAddToCart = async () => {
        await api.put("/account/cart", {
            op: "create",
            product_id: product.id,
            quantity: 1
        });
        setAddToCardButton({
            icon: faCheck,
            text: undefined
        })
        setTimeout(() => {
            setAddToCardButton({
                icon: faShoppingCart,
                text: "Aggiungi al carrello"
            })
        }, 2000);
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
                    {hasAnyAuthority(user?.roles || [], [UserRoleEnum.ADMIN]) ? <Button
                        size="small"
                        to={`/admin/products/${product.id}/edit`}
                        text="Modifica prodotto"
                        leftIcon={<FontAwesomeIcon icon={faPencil} />}
                        fullWidth
                        className={styles.addToCart}
                    /> : product.availability > 0 ? <Button
                        size="small"
                        leftIcon={<FontAwesomeIcon icon={addToCardButton.icon} />}
                        onClick={handleAddToCart}
                        text={addToCardButton.text}
                        fullWidth
                        className={styles.addToCart}
                    /> : <Button
                        size="small"
                        onClick={handleAddToCart}
                        text="Prodotto non disponibile"
                        disabled
                        fullWidth
                        className={styles.addToCart}
                    />}
                </div>
            </div>
        </Paper>
    );
};

export default Product;