
import Grid from "../../../components/Grid/Grid";
import GridItem from "../../../components/Grid/GridItem";
import Link from "../../../components/Link/Link";
import { getPaymentStatus, getShippingStatus, getTotalOrder, renderOrder } from "../../../components/Order/Order";
import IOrder from "../../../shared/models/IOrder";
import styles from "./admin-order.module.scss";

interface OrderProps {
    order: IOrder;
}

const AdminOrder = (props: OrderProps) => {
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
        </div>
    );
};

export default AdminOrder;