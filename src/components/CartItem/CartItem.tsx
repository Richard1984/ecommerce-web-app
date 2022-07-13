import { faMinusSquare, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import ICartItem from "../../shared/models/ICartItem";
import Button from "../Button/Button";
import styles from './cartItem.module.scss';


export interface CartItemEditableProps {
    item: ICartItem;
    setQuantity: (id: number | null, quantity: number) => void | undefined;
    isEditable?: true;
}

export interface CartItemProps {
    item: ICartItem;
    isEditable: false;
}

const CartItem = (props: CartItemEditableProps | CartItemProps) => {
    const { item, isEditable } = props;

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
                {
                    isEditable === false ||
                    <Button
                        leftIcon={<FontAwesomeIcon icon={faMinusSquare} />}
                        onClick={() => props.setQuantity(item.product.id, item.quantity - 1)}
                    />
                }
                <p className={styles.quantity}>x{item.quantity}</p>
                {
                    isEditable === false ||
                    <Button
                        leftIcon={<FontAwesomeIcon icon={faPlusSquare} />}
                        onClick={() => props.setQuantity(item.product.id, item.quantity + 1)}
                    />
                }
            </div>
        </div>
    );
};

export default CartItem;