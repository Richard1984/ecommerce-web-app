import React, { FormEvent, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import Textfield from '../../../components/Textfield/Textfield';
import ICartItem from '../../../shared/models/ICartItem';
import Button from '../../../components/Button/Button';
import { toast } from 'react-toastify';
import styles from "../payment.module.scss";
import { Link } from 'react-router-dom';
import api from '../../../config/api';
import IPaymentMethod from '../../../shared/models/IPaymentMethod';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';

interface ICheckoutFormProps {
    cart: ICartItem[];
    paymentIntentId: string;
    orderId: number;
    clientSecret: string;
    paymentMethods: IPaymentMethod[];
}

const CheckoutForm = (props: ICheckoutFormProps) => {
    const { cart, paymentIntentId, orderId, clientSecret, paymentMethods } = props;
    const stripe = useStripe();
    const elements = useElements();
    const [isPaying, setIsPaying] = useState(false);
    const navigate = useNavigate();
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<number>(-1);
    const [savePaymentMethod, setSavePaymentMethod] = useState(true);

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

    const handleSetSavePaymentMethod = async () => {
        toast.error("Per il momento non è possibile scegliere di non salvare il metodo di pagamento");
        // await api.put(`/payment/save_payment_method`, {
        //     payment_intent_id: paymentIntentId,
        //     save_payment_method: !savePaymentMethod
        // });
        // await elements?.fetchUpdates();
        // setSavePaymentMethod(!savePaymentMethod);
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        // form should be filled out
        if (form.firstname === "" || form.lastname === "" || form.address === "" || form.house_number === "" || form.zip === "" || form.city === "" || form.country === "") {
            toast.error("Please fill out all fields");
            return;
        }

        setIsPaying(true);

        try {
            let error;
            if (selectedPaymentMethod === -1) {
                let response = await stripe.confirmPayment({
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
                            }
                        },
                    },
                });
                error = response.error;
            } else {
                let response = await stripe.confirmCardPayment(
                    clientSecret,
                    {
                        payment_method: paymentMethods[selectedPaymentMethod].id,
                        shipping: {
                            name: `${form.firstname} ${form.lastname}`,
                            address: {
                                line1: form.address,
                                line2: form.house_number,
                                city: form.city,
                                country: form.country,
                                postal_code: form.zip,
                            }
                        }
                    }
                );
                error = response.error;
            }

            if (error) {
                toast.error(error.message || "Something went wrong");
            } else {
                toast.success("Payment successful. Redirecting to order confirmation page...");
                await api.post("/payment/success/client", {
                    order_id: orderId,
                    name: `${form.firstname} ${form.lastname}`,
                    address: {
                        line1: form.address,
                        line2: form.house_number,
                        city: form.city,
                        country: form.country,
                        postal_code: form.zip,
                    }
                });
                navigate("/account/orders/" + orderId);
            }
        } catch (err: any) {
            toast.error(err.message || "Something went wrong");
        }

        setIsPaying(false);
    };

    return (
        <form className={styles.content} onSubmit={handleSubmit}>
            <div className={styles.leftColumn}>
                <div className={styles.boxContainer}>
                    <h2> Indirizzo e spedizione </h2>
                    <div className={styles.multipleInput}>
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
                    <div className={styles.multipleInput}>
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
                    <div className={styles.multipleInput}>
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
                <div className={styles.boxContainer}>
                    <h2> Metodi di pagamento </h2>
                    {
                        props.paymentMethods.length > 0 &&
                        <div>
                            <p> Seleziona il metodo di pagamento che preferisci: </p>
                            {
                                props.paymentMethods.map((paymentMethod, index) => {
                                    return (
                                        <div
                                            key={paymentMethod.id}
                                            className={styles["paymentMethod"] + " " + (selectedPaymentMethod === index ? styles["selected"] : "")}
                                            onClick={() => setSelectedPaymentMethod(index)}
                                        >
                                            <p>
                                                <FontAwesomeIcon icon={faCreditCard} />
                                                <span style={{ marginLeft: "10px" }} />
                                                {paymentMethod.card.brand} - ****{paymentMethod.card.last4}
                                            </p>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    }
                    <div
                        className={styles["paymentMethod"] + " " + (selectedPaymentMethod === -1 ? styles["selected"] : "")}
                        onClick={() => setSelectedPaymentMethod(-1)}
                    >
                        <p>
                            <FontAwesomeIcon icon={faCreditCard} />
                            <span style={{ marginLeft: "10px" }} />
                            Aggiungi nuovo metodo di pagamento
                        </p>
                        <div style={selectedPaymentMethod === -1 ? {} : { display: "none" }}>
                            <PaymentElement id="payment-element" />
                            <div className={styles.checkbox}>
                                <input type="checkbox" id="save-payment-method" checked={savePaymentMethod} onChange={() => handleSetSavePaymentMethod()} />
                                <label htmlFor="save-payment-method">Salva questo metodo di pagamento</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.rightColumn}>
                <div className={styles.boxContainer}>
                    <div className={styles.paymentTitle}>
                        <h2>Riepilogo ordine</h2>
                    </div>
                    <div className={styles.paymentInfo}>
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
                        {isPaying ?
                            <Button disabled text='Pagamento in corso' ></Button>
                            :
                            <div>
                                <Button type='submit' text='Paga' className={styles.submitButton}></Button>
                                <Link to="/account/cart">
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