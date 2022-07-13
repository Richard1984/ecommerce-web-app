import { useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import Paper from "../../components/Paper/Paper";
import Order from "../../components/Order/Order";
import api from "../../config/api";
import IOrder from "../../shared/models/IOrder";
import styles from "./orders.module.scss";

const Orders = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getOrders = async () => {
            const response = await api.get<{ data: IOrder[] }>("/account/orders");
            setOrders(response.data.data);
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
                <h2> I tuoi ordini </h2>
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