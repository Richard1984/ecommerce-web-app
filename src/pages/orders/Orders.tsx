import { useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import Order from "../../components/Order/Order";
import Paper from "../../components/Paper/Paper";
import api from "../../config/api";
import IOrder from "../../shared/models/IOrder";
import styles from "./orders.module.scss";

const Orders = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getOrders = async () => {
            const response = await api.get<{ data: IOrder[]; }>("/account/orders");
            setOrders(response.data.data.sort(order => - (order.id || 0)));
            setIsLoading(false);
        };
        getOrders();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Container size="large" className={styles["content"]}>
            <Paper className={styles["box-container"]}>
                <div className={styles.title}> I tuoi ordini </div>
                {
                    orders.map(order => (
                        <Order key={order.id} order={order} />
                    ))
                }
            </Paper>
        </Container>
    );
};

export default Orders;