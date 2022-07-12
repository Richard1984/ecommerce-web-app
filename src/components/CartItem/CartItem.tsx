import { faMinusSquare, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import ICartItem from "../../shared/models/ICartItem";
import Button from "../Button/Button";
import styles from './cartItem.module.scss'


export interface CartItemProps {
    item: ICartItem;
    setQuantity: (id: number | null, quantity: number) => void;
}

const CartItem = (props: CartItemProps) => {
    const { item, setQuantity } = props;

    return (
        <div className={styles.product}>
            <Link to={"/products/" + item.product.id} className={styles.image}>
                <img src="https://picsum.photos/150" alt="product" />
            </Link>
            <div className={styles.body}>
                <Link to={"/products/" + item.product.id} className={styles.info}>
                    <h3 className={styles.name}>{item.product.name}</h3>
                    <p className={styles.price}>{item.product.price + " €"}</p>
                </Link>
            </div>
            <div className={styles.rightBody}>
                <Button leftIcon={<FontAwesomeIcon icon={faMinusSquare}/>} onClick={() => setQuantity(item.product.id, item.quantity - 1)} />
                <p className={styles.quantity}>{item.quantity}</p>
                <Button leftIcon={<FontAwesomeIcon icon={faPlusSquare}/>}onClick={() => setQuantity(item.product.id, item.quantity + 1)} />
            </div>
        </div>
    );
}

export default CartItem;