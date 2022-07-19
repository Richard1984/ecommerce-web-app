import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import Dialog, { DialogActions, DialogHeader } from "../../components/Dialog/Dialog";
import Paper from "../../components/Paper/Paper";
import api from "../../config/api";
import IPaymentMethod from "../../shared/models/IPaymentMethod";
import PaymentMethodItem from "./components/PaymentMethodItem";
import styles from "./payment-methods.module.scss";


const PaymentMethods = () => {
    const [paymentMethods, setPaymentMethods] = useState<IPaymentMethod[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [paymentMethodIdToRemove, setPaymentMethodIdToRemove] = useState<string>("");


    useEffect(() => {
        const getPaymentMethods = async () => {
            try {
                const response = await api.get<{ data: IPaymentMethod[]; }>("/account/payment_methods");
                setPaymentMethods(response.data.data);
                setIsLoading(false);
            } catch (error: any) {
                if (!error || !error.response || error.response.status === 403) {
                    window.location.href = "/";
                }
            }
        };
        getPaymentMethods();
    }, []);


    const handleRemove = async (id: string) => {
        await api.post(`/account/payment_methods/remove`, {
            payment_method_id: id
        });
        setPaymentMethods(paymentMethods.filter(item => item.id !== id));
        setIsOpen(false);
    };

    const handleOnClose = () => {
        setIsOpen(false);
    };

    const openDialog = (id: string) => {
        setPaymentMethodIdToRemove(id);
        setIsOpen(true);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Dialog open={isOpen} width="600px">
                <DialogHeader title={"Vuoi davvero rimuovere questo metodo di pagamento?"} />
                <DialogActions>
                    <Button size="small" text="Rimuovi" onClick={() => handleRemove(paymentMethodIdToRemove)} />
                    <Button size="small" text="Annulla" onClick={handleOnClose} />
                </DialogActions>
            </Dialog>


            <Container size="large" className={styles.content}>
                <Paper className={styles.boxContainer}>
                    <div className={styles.title}> I tuoi metodi di pagamento </div>
                    {
                        paymentMethods.length > 0 ? (
                            paymentMethods.map(item => (
                                <PaymentMethodItem key={item.id} paymentMethod={item} handleRemove={() => openDialog(item.id)} />
                            ))
                        ) : (
                            <p> Non hai metodi di pagamento salvati. </p>
                        )
                    }
                    <Link to="/account/payment_methods/new">
                        <Button className={styles.addCardButton} size="large" text="Aggiungi una nuova carta" />
                    </Link>
                </Paper>
            </Container>
        </>
    );
};
export default PaymentMethods;