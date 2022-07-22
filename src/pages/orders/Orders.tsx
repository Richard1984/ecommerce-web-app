import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import Order from "../../components/Order/Order";
import Paper from "../../components/Paper/Paper";
import Textfield from "../../components/Textfield/Textfield";
import api from "../../config/api";
import IOrder from "../../shared/models/IOrder";
import styles from "./orders.module.scss";

const Orders = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const getOrders = async () => {
            const response = await api.get<{ data: IOrder[]; }>("/account/orders");
            setOrders(response.data.data.sort(order => - (order.id || 0)));
            setIsLoading(false);
        };
        getOrders();
    }, []);

    const searchOrders = async () => {
        const response = await api.post<{ data: IOrder[]; }>("/account/orders/search/", {
            search: search
        });
        setOrders(response.data.data);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Container size="large" className={styles.content}>
            <Paper className={styles.boxContainer}>
                <div className={styles.title}> I tuoi ordini </div>
                <div className={styles.searchBar}>
                    <Textfield
                        fullWidth={true}
                        className={styles.textfield}
                        type="text"
                        name="products-search"
                        placeholder="Cerca prodotti o ID ordine"
                        onEnter={searchOrders}
                        value={search}
                        onValueChange={(event, value) => setSearch(value)}
                    />
                    <Button
                        type="button"
                        className={styles.button}
                        leftIcon={<FontAwesomeIcon icon={faSearch} />}
                        onClick={searchOrders}
                    />
                </div>
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