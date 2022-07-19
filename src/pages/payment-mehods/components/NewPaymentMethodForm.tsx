import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { FormEvent } from "react";
import { toast } from "react-toastify";
import Button from "../../../components/Button/Button";
import styles from "../payment-methods.module.scss";

const NewPaymentMethodForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        // create a payment method and add it to the customer
        if (!stripe || !elements) {
            return;
        }
        const { error } = await stripe.confirmSetup({
            elements,
            confirmParams: {
                return_url: window.location.origin + "/account/payment_methods"
            }
        });

        if (error) {
            toast.error(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <Button
                className={styles.addCardButton}
                size="large"
                text="Salva il metodo di pagamento"
                type="submit"
            />
        </form>
    );
};

export default NewPaymentMethodForm;