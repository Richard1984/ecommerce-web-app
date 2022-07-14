import { debug } from "console";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import CartItem from "../../components/CartItem/CartItem";
import Container from "../../components/Container/Container";
import Divider from "../../components/Divider/Divider";
import Order, { renderOrder, getShippingStatus, getTotalOrder } from "../../components/Order/Order";
import Paper from "../../components/Paper/Paper";
import api from "../../config/api";
import IOrder from "../../shared/models/IOrder";
import styles from "./order-detail.module.scss";

type OrderDetailParams = Record<"id", string>;

const OrderDetail = () => {
    const params = useParams<OrderDetailParams>();
    const [order, setOrder] = useState<IOrder>();
    const [isLoading, setIsLoading] = useState(true);

    const handleReceipt = () => {

    };


    useEffect(() => {
        const getOrders = async () => {
            const response = await api.get<{ data: IOrder; }>("/account/orders/" + params.id);
            console.log(response.data.data);
            setOrder(response.data.data);
            setIsLoading(false);
        };
        getOrders();
    }, [params.id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!order) {
        return <div>Order not existing</div>;
    }

    return (
        <div>
            <Container size="large" className={styles["content"]}>
                <Paper className={styles["box-container"]}>
                    <h2> Dettagli ordine #{order.id} </h2>
                    <Divider />
                    <div className={styles["columns"]}>
                        <div className={styles["left-column"]}>
                            <h3> Indirizzo di spedizione </h3>
                        </div>
                        <div className={styles["right-column"]}>
                            <h3> Stato ordine </h3>
                            <p> Totale: {getTotalOrder(order)} <br />
                                Stato spedizione: {getShippingStatus(order)} </p>
                            <Button
                                text="Scarica ricevuta"
                                onClick={handleReceipt}
                            />
                        </div>
                    </div>
                </Paper>
            </Container>
            <Container size="large" className={styles["content"]}>
                <Paper className={styles["box-container"]}>
                    {renderOrder(order)}
                </Paper>
            </Container>
        </div>
    );
};
export default OrderDetail;