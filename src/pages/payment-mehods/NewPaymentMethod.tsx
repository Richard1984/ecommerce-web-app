import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import Paper from "../../components/Paper/Paper";
import api from "../../config/api";
import styles from "./payment-methods.module.scss";
import NewPaymentMethodForm from "./components/NewPaymentMethodForm";

const stripe_key = STRIPE_PUB_KEY || "";
const stripePromise = loadStripe(stripe_key);

const NewPamentMethod = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [clientSecret, setClientSecret] = useState<string>("");

    useEffect(() => {
        const getClientSecret = async () => {
            const { data } = await api.get<{ data: string; }>("/account/payment_methods/new");
            setClientSecret(data.data);
            setIsLoading(false);
        };
        getClientSecret();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Container size="large" className={styles.content}>
            <Paper className={styles.boxContainer}>
                <div className={styles.title}> Aggiungi un metodo di pagamento </div>
                <Elements stripe={stripePromise} options={{ clientSecret }} >
                    <NewPaymentMethodForm />
                </Elements>
            </Paper>
        </Container>
    );
};
export default NewPamentMethod;