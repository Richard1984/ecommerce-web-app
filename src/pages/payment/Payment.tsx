import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import MinimalHeader from '../../components/Header/MinimalHeader';
import api from "../../config/api";
import ICartItem from '../../shared/models/ICartItem';
import IPaymentMethod from '../../shared/models/IPaymentMethod';
import CheckoutForm from './component/CheckoutForm';

const stripe_key = STRIPE_PUB_KEY || "";
const stripePromise = loadStripe(stripe_key);

const Payment = () => {
    const [clientSecret, setClientSecret] = useState<string>();
    const [cart, setCart] = useState<ICartItem[]>([]);
    const [orderId, setOrderId] = useState<number>(-1);
    const [paymentMethods, setPaymentMethods] = useState<IPaymentMethod[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const getOrder = async () => {
        // passing the client secret obtained from the server
        let response = await api.get("/payment");
        let clientSecret = response.data.client_secret as string;
        let cart = response.data.cart as ICartItem[];
        let orderId = response.data.order_id as number;
        let paymentMethods = response.data.payment_methods as IPaymentMethod[];
        return { clientSecret, cart, orderId, paymentMethods };
    };

    useEffect(() => {
        getOrder().then(({ clientSecret, cart, orderId, paymentMethods }) => {
            setClientSecret(clientSecret);
            setCart(cart);
            setOrderId(orderId);
            setPaymentMethods(paymentMethods);
            setIsLoading(false);
        });
    }, []);


    if (isLoading || clientSecret === undefined) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                <MinimalHeader />
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm cart={cart} orderId={orderId} clientSecret={clientSecret} paymentMethods={paymentMethods} />
                </Elements>
            </div>
        );
    }
};

export default Payment;