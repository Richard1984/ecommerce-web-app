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
            try {
                const response = await api.get<{ data: IOrder[]; }>("/account/orders");
                setOrders(response.data.data.sort(order => - (order.id || 0)));
                setIsLoading(false);
            } catch (error: any) {
                if(error.response.status === 403) {
                    window.location.href = "/";
                }
            }
        };
        getOrders();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Container size="large" className={styles.content}>
            <Paper className={styles.boxContainer}>
                <div className={styles.title}> I tuoi ordini </div>
                {
                    orders.length > 0 ?
                        orders.map(order => (
                            <Order key={order.id} order={order} />
                        ))
                        :
                        <p> Sembra che tu non abbia effettuato nessun ordine. </p>
                }
            </Paper>
        </Container>
    );
};

export default Orders;