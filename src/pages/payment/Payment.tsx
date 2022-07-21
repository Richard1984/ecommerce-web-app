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


interface PaymentResponse {
    payment_intent_id: string;
    client_secret: string;
    cart: ICartItem[];
    order_id: number;
    payment_methods: IPaymentMethod[];
}

const Payment = () => {
    const [paymentIntentId, setPaymentIntentId] = useState<string>();
    const [clientSecret, setClientSecret] = useState<string>();
    const [cart, setCart] = useState<ICartItem[]>([]);
    const [orderId, setOrderId] = useState<number>(-1);
    const [paymentMethods, setPaymentMethods] = useState<IPaymentMethod[]>([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const getOrder = async () => {
            const { data } = await api.get<{ data: PaymentResponse; }>("/payment");
            const pm_response = await api.get<{ data: IPaymentMethod[]; }>("/account/payment_methods");
            setPaymentIntentId(data.data.payment_intent_id);
            setClientSecret(data.data.client_secret);
            setCart(data.data.cart);
            setOrderId(data.data.order_id);
            setPaymentMethods(pm_response.data.data);
            setIsLoading(false);
        };
        getOrder();
    }, []);

    if (isLoading || clientSecret === undefined || paymentIntentId === undefined) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                <MinimalHeader />
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm cart={cart} paymentIntentId={paymentIntentId} orderId={orderId} clientSecret={clientSecret} paymentMethods={paymentMethods} />
                </Elements>
            </div>
        );
    }
};

export default Payment;