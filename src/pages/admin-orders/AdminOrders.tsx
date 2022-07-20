import { useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import Paper from "../../components/Paper/Paper";
import api from "../../config/api";
import IOrder from "../../shared/models/IOrder";
import styles from "./admin-orders.module.scss";
import Order from "../../components/Order/Order";
import AdminOrder from "./components/AdminOrder";

const AdminOrders = () => {
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
        <Container size="large" className={styles.content}>
            <Paper className={styles.boxContainer}>
                <div className={styles.title}> Ordini effettuati nel tuo negozio </div>
                {
                    orders.length > 0 ?
                        orders.map(order => (
                            <AdminOrder key={order.id} order={order} />
                        ))
                        :
                        <p> Sembra che tu non abbia effettuato nessun ordine. </p>
                }
            </Paper>
        </Container>
    );
};
export default AdminOrders;