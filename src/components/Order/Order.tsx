
import IOrder, { PaymentStatusEnum, ShippingStatusEnum } from "../../shared/models/IOrder";
import CartItem from "../CartItem/CartItem";
import Grid from "../Grid/Grid";
import GridItem from "../Grid/GridItem";
import Link from "../Link/Link";
import styles from "./order.module.scss";

interface OrderProps {
    order: IOrder;
}

export const getPaymentStatus = (order: IOrder): string => {
    switch (order.payment_status) {
        case PaymentStatusEnum.NOT_PAID:
            return "In attesa di pagamento";
        case PaymentStatusEnum.PAID_CLIENT:
            return "In attesa di verifica";
        case PaymentStatusEnum.PAID:
            return "Pagato";
        case PaymentStatusEnum.FAILED:
            return "Pagamento fallito";
        default:
            return "ERROR";
    }
};

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
            <Grid className={styles.orderHeader} colGap={1.5}>
                <GridItem cols={3} style={{ textAlign: "start" }}>
                    <h3> {`Ordine #${order.id} - ${getTotalOrder(order)}`} </h3>
                </GridItem>
                <GridItem cols={3} style={{ textAlign: "center" }}>
                    <h3> {getPaymentStatus(order)} </h3>
                </GridItem>
                <GridItem cols={3} style={{ textAlign: "center" }}>
                    <h3> {getShippingStatus(order)} </h3>
                </GridItem>
                <GridItem cols={3} style={{ textAlign: "end" }}>
                    <Link to={"/account/orders/" + order.id}>
                        <p> Dettagli ordine </p>
                    </Link>
                </GridItem>
            </Grid>
            {
                renderOrder(order)
            }
        </div>
    );
};

export default Order;