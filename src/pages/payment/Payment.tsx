import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import MinimalHeader from '../../components/Header/MinimalHeader';
import api from "../../config/api";
import ICartItem from '../../shared/models/ICartItem';
import CheckoutForm from './component/CheckoutForm';

const stripe_key = STRIPE_PUB_KEY || "";

const getOrder = async () => {
    // passing the client secret obtained from the server
    let response = await api.get("/payment");
    let clientSecret = response.data.client_secret;
    let cart = response.data.cart;
    return [clientSecret, cart] as [string, ICartItem[]];
};

const Payment = () => {
    const [stripe, setStripe] = useState<Stripe>();
    const [clientSecret, setClientSecret] = useState<string>();
    const [cart, setCart] = useState<ICartItem[]>([]);

    useEffect(() => {
        loadStripe(stripe_key).then(stripe => {
            if (stripe) {
                setStripe(stripe);
            }
        });

        getOrder().then((data: [string, ICartItem[]]) => {
            setClientSecret(data[0]);
            setCart(data[1]);
        });
    }, []);


    if (!stripe) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                <MinimalHeader />
                {
                    clientSecret && cart ? (
                        <Elements stripe={stripe} options={{ clientSecret }}>
                            <CheckoutForm cart={cart} clientSecret={clientSecret} />
                        </Elements>
                    ) : (
                        <div>Loading...</div>
                    )
                }
            </div>
        );
    }
};

export default Payment;