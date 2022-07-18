
import IOrder, { ShippingStatusEnum } from "../../shared/models/IOrder";
import CartItem from "../CartItem/CartItem";
import Link from "../Link/Link";
import styles from "./order.module.scss";

interface OrderProps {
    order: IOrder;
}

export const getShippingStatus = (order: IOrder) => {
    switch (order.shipping_status) {
        case ShippingStatusEnum.NOT_SHIPPED:
            return "Non spedito";
        case ShippingStatusEnum.PENDING:
            return "In lavorazione";
        case ShippingStatusEnum.SHIPPED:
            return "Spedito";
        case ShippingStatusEnum.DELIVERED:
            return "Consegnato";
        default:
            return "ERROR";
    }
};

export const renderOrder = (order: IOrder) => {
    return order.items.map(item => <CartItem key={item.product.id} item={item} isEditable={false} />);
};

export const getTotalOrder = (order: IOrder) => {
    return order.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2) + "€";
};

const Order = (props: OrderProps) => {
    const { order } = props;
    return (
        <div className={styles.order}>
            <div className={styles.orderHeader}>
                <h3> {`Ordine #${order.id} - ${getTotalOrder(order)}`} </h3>
                <h3> {getShippingStatus(order)} </h3>
                <Link to={"/account/orders/" + order.id}>
                    <p> Dettagli ordine </p>
                </Link>
            </div>
            {
                renderOrder(order)
            }
        </div>
    );
};

export default Order;