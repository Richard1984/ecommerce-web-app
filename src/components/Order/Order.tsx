import { Link } from "react-router-dom";
import IOrder from "../../shared/models/IOrder";
import CartItem from "../CartItem/CartItem";
import styles from "./order.module.scss";

interface OrderProps {
    order: IOrder;
}

const getShippingStatus = (order: IOrder) => {
    if (order.shipping_status === "delivered") {
        return "Consegnato";
    } else if (order.shipping_status === "shipped") {
        return "Spedito";
    } else if (order.shipping_status === "pending") {
        return "In attesa di spedizione";
    }
    return "Non spedito";
};

const Order = (props: OrderProps) => {
    const { order } = props;
    return (
        <div className={styles["order"]}>
            <div className={styles["order-header"]}>
                <h3> {`Ordine #${order.id} - ${order.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2)}€`} </h3>
                <h3> {getShippingStatus(order)} </h3>
                <Link to={"/orders/" + order.id} className={styles["order-link"]}>
                    <p> Dettagli ordine </p>
                </Link>
            </div>
            {
                order.items.map(item => (
                    <CartItem key={item.product.id} item={item} isEditable={false}/>
                    // <div key={item.product.id} className={styles["order-item"]}>
                    //     <p> {item.product.name} </p>
                    //     <p> x{item.quantity} </p>
                    // </div>
                ))
            }
        </div>
    );
};

export default Order;