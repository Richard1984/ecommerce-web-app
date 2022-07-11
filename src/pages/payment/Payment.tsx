import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import './payment.scss';
import MinimalHeader from '../../components/Header/MinimalHeader';
import api from "../../config/api";
import { useEffect, useState } from 'react';
import ICartProduct from '../../shared/models/ICartProduct';
import CheckoutForm from './CheckoutForm';

const stripe_key = process.env.REACT_APP_STRIPE_PUB_KEY || "";

const getOrder = async () => {
    // passing the client secret obtained from the server
    let response = await api.post("/payment/create_order");
    let clientSecret = response.data.client_secret;
    let cart = response.data.cart;
    return [clientSecret, cart] as [string, ICartProduct[]];
};

const Payment = () => {
    const [stripe, setStripe] = useState<Stripe>();
    const [clientSecret, setClientSecret] = useState<string>();
    const [cart, setCart] = useState<ICartProduct[]>([]);

    useEffect(() => {
        loadStripe(stripe_key).then(stripe => {
            if (stripe) {
                setStripe(stripe);
            }
        });

        getOrder().then((data: [string, ICartProduct[]]) => {
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
                {clientSecret && cart ?
                    <Elements stripe={stripe} options={{ clientSecret }}>
                        <CheckoutForm cart={cart} clientSecret={clientSecret}/>
                    </Elements>
                    :
                    <div>Loading...</div>
                }
            </div>
        );
    }
};

export default Payment;