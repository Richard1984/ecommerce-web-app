import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import Divider from "../../components/Divider/Divider";
import { renderOrder, getShippingStatus, getTotalOrder } from "../../components/Order/Order";
import Paper from "../../components/Paper/Paper";
import api from "../../config/api";
import IOrder, { PaymentStatusEnum } from "../../shared/models/IOrder";
import styles from "./order-detail.module.scss";

type OrderDetailParams = Record<"id", string>;

const OrderDetail = () => {
    const params = useParams<OrderDetailParams>();
    const [order, setOrder] = useState<IOrder>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getOrders = async () => {
            const response = await api.get<{ data: IOrder; }>("/account/orders/" + params.id);
            setOrder(response.data.data);
            setIsLoading(false);
        };
        getOrders();

    }, [params.id]);

    const handleReceipt = () => {
        // open receipt_url on a new window
        if (order?.receipt_url) {
            window.open(order.receipt_url, "_blank");
        }
    };

    const getPaymentStatus = (order: IOrder) => {
        switch (order.payment_status) {
            case PaymentStatusEnum.NOT_PAID:
                return "Non pagato";
            case PaymentStatusEnum.PAID_CLIENT:
                return "In attesa di verifica pagamento";
            case PaymentStatusEnum.PAID:
                return "Pagato";
            default:
                return "ERROR";
        }
    };

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
                            <p> Totale: <b>{getTotalOrder(order)}</b> <br />
                                Stato pagamento: <b>{getPaymentStatus(order)}</b> <br />
                                Stato spedizione: <b>{getShippingStatus(order)}</b> </p>
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