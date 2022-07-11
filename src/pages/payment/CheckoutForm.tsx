import React, { FormEvent, useEffect, useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import Textfield from '../../components/Textfield/Textfield';
import ICartProduct from '../../shared/models/ICartProduct';
import Button from '../../components/Button/Button';
import { toast } from 'react-toastify';
import api from '../../config/api';

interface ICheckoutFormProps {
    cart: ICartProduct[];
    clientSecret: string;
}

const CheckoutForm = (props: ICheckoutFormProps) => {
    const { cart, clientSecret } = props;
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);

    const [form, setForm] = useState({
        firstname: "",
        lastname: "",
        address: "",
        house_number: "",
        zip: "",
        city: "",
        country: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };
    const [errorMessage, setErrorMessage] = useState<string>("");

    // on errorMessage change, setErrorMessage to empty string
    useEffect(() => {
        if (errorMessage.length > 0) {
            toast.error(errorMessage);
            setErrorMessage("");
        }
    }, [errorMessage]);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        // form should be filled out
        if (form.firstname === "" || form.lastname === "" || form.address === "" || form.house_number === "" || form.zip === "" || form.city === "" || form.country === "") {
            setErrorMessage("Please fill out all fields");
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            redirect: "if_required",
            confirmParams: {
                shipping: {
                    name: `${form.firstname} ${form.lastname}`,
                    address: {
                        line1: form.address,
                        line2: form.house_number,
                        city: form.city,
                        country: form.country,
                        postal_code: form.zip,
                    },
                },
                receipt_email: "test@mail.com"
            },
        });


        if (error) {
            setErrorMessage(error.message || "Something went wrong");
        } else {
            toast.success("Payment successful. Redirecting to order confirmation page...");
        }

        setIsLoading(false);
    };

    return (
        <form className="content" onSubmit={handleSubmit}>
            <div className="left-column">
                <div className="box-container">
                    <h2> Indirizzo e spedizione </h2>
                    <div className="multiple-input">
                        <Textfield
                            type="text"
                            name="firstname"
                            label="Nome"
                            placeholder="Nome"
                            fullWidth
                            value={form.firstname}
                            onChange={handleChange}
                            style={{ marginRight: "10px", flex: 1 }}
                            required={true}
                        />
                        <Textfield type="text"
                            name="lastname"
                            label="Cognome"
                            placeholder="Cognome"
                            fullWidth
                            value={form.lastname}
                            onChange={handleChange}
                            style={{ flex: 1 }}
                            required={true}
                        />
                    </div>
                    <div className="multiple-input">
                        <Textfield
                            type="text"
                            name="address"
                            label="Indirizzo"
                            placeholder="Indirizzo"
                            fullWidth
                            value={form.address}
                            onChange={handleChange}
                            style={{ marginRight: "10px", flex: 2 }}
                            required={true}
                        />
                        <Textfield
                            type="text"
                            name="house_number"
                            label="Civico"
                            placeholder="Civico"
                            fullWidth
                            value={form.house_number}
                            onChange={handleChange}
                            style={{ marginRight: "10px", flex: 1 }}
                            required={true}
                        />
                        <Textfield
                            type="text"
                            name="zip"
                            label="CAP"
                            placeholder="CAP"
                            fullWidth
                            value={form.zip}
                            onChange={handleChange}
                            style={{ flex: 1 }}
                            required={true}
                        />
                    </div>
                    <div className="multiple-input">
                        <Textfield
                            type="text"
                            name="city"
                            label="Città"
                            placeholder="Città"
                            fullWidth
                            value={form.city}
                            onChange={handleChange}
                            style={{ marginRight: "10px", flex: 1 }}
                            required={true}
                        />
                        <Textfield
                            type="text"
                            name="country"
                            label="Stato"
                            placeholder="Stato"
                            fullWidth
                            value={form.country}
                            onChange={handleChange}
                            style={{ flex: 1 }}
                            required={true}
                        />
                    </div>
                </div>
                <div className="box-container">
                    <h2> Pagamento </h2>
                    <PaymentElement id="payment-element" />
                </div>
            </div>

            <div className="right-column">
                <div className="box-container">
                    <div className="payment-title">
                        <h2>Riepilogo ordine</h2>
                    </div>
                    <div className="payment-info">
                        <ul>
                            {
                                cart.map((item: ICartProduct) => {
                                    return (
                                        <li key={item.id}>
                                            <span>x{item.quantity}</span>
                                            <b style={{ marginLeft: "10px" }}>{item.name}</b>
                                            <span style={{ marginLeft: "10px" }}>{item.price}€</span>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                        <p>
                            <span>Totale: </span>
                            <span>
                                {
                                    // sum of all the prices of the cart
                                    cart && cart.reduce((acc, item) => {
                                        return acc + item.price * item.quantity;
                                    }, 0)
                                }
                                €
                            </span>
                        </p>
                        {isLoading ?
                            <Button disabled text='Pagamento in corso' ></Button>
                            :
                            <Button text='Paga'></Button>
                        }
                    </div>
                </div>
            </div>
        </form>
    );
};

export default CheckoutForm;