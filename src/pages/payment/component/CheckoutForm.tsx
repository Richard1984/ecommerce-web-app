import React, { FormEvent, useEffect, useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import Textfield from '../../../components/Textfield/Textfield';
import ICartItem from '../../../shared/models/ICartItem';
import Button from '../../../components/Button/Button';
import { toast } from 'react-toastify';
import styles from "../payment.module.scss";
import { Link } from 'react-router-dom';

interface ICheckoutFormProps {
    cart: ICartItem[];
    clientSecret: string;
}

const CheckoutForm = (props: ICheckoutFormProps) => {
    const { cart } = props;
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
        <form className={styles["content"]} onSubmit={handleSubmit}>
            <div className={styles["left-column"]}>
                <div className={styles["box-container"]}>
                    <h2> Indirizzo e spedizione </h2>
                    <div className={styles["multiple-input"]}>
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
                    <div className={styles["multiple-input"]}>
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
                    <div className={styles["multiple-input"]}>
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
                <div className={styles["box-container"]}>
                    <h2> Pagamento </h2>
                    <PaymentElement id="payment-element" />
                </div>
            </div>

            <div className={styles["right-column"]}>
                <div className={styles["box-container"]}>
                    <div className={styles["payment-title"]}>
                        <h2>Riepilogo ordine</h2>
                    </div>
                    <div className={styles["payment-info"]}>
                        <ul>
                            {
                                cart.map((item: ICartItem) => {
                                    return (
                                        <li key={item.product.id}>
                                            <span>x{item.quantity}</span>
                                            <b style={{ marginLeft: "10px" }}>{item.product.name}</b>
                                            <span style={{ marginLeft: "10px" }}>{item.product.price}€</span>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                        <p>
                            <b>Totale: </b>
                            <span>
                                {
                                    // sum of all the prices of the cart
                                    cart && cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2)
                                }
                                €
                            </span>
                        </p>
                        {isLoading ?
                            <Button disabled text='Pagamento in corso' ></Button>
                            :
                            <div>
                                <Button type='submit' text='Paga' className={styles['submit-button']}></Button>
                                <Link to="/cart">
                                    <Button type='reset' text='Annulla ordine'></Button>
                                </Link>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </form>
    );
};

export default CheckoutForm;