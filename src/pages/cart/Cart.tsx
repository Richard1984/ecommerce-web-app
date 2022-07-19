import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import CartItem from "../../components/CartItem/CartItem";
import Container from "../../components/Container/Container";
import Dialog, { DialogActions, DialogHeader } from "../../components/Dialog/Dialog";
import Paper from "../../components/Paper/Paper";
import api from "../../config/api";
import ICartItem from "../../shared/models/ICartItem";
import styles from "./cart.module.scss";

const Cart = () => {
    const [cart, setCart] = useState<ICartItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [itemIdToRemove, setItemIdToRemove] = useState<number>(0);

    useEffect(() => {
        const getProducts = async () => {
            const response = await api.get<{ data: ICartItem[]; }>("/account/cart");
            setCart(response.data.data);
            setIsLoading(false);
        };
        getProducts();
    }, []);

    const handleChangeQuantity = (id: number | null, quantity: number) => {
        if (id === null) return;
        setCart(cart.map(item => {
            if (item.product.id === id) {
                if (quantity <= 0) {
                    setItemIdToRemove(id);
                    setIsOpen(true);
                } else {
                    item.quantity = quantity;
                    api.put(`/account/cart`, {
                        op: "update",
                        product_id: item.product.id,
                        quantity: item.quantity
                    });
                }
            }
            return item;
        }
        ));
    };

    const handleSubmit = (id: number) => {
        // remove from cart
        setCart(cart.filter(item => item.product.id !== id));
        setIsOpen(false);
        api.put(`/account/cart`, {
            op: "remove",
            product_id: id
        });
    };

    const handleOnClose = () => {
        setIsOpen(false);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Dialog open={isOpen} width="600px">
                <DialogHeader title={"Vuoi davvero rimuovere questo prodotto dal carrello?"} />
                <DialogActions>
                    <Button size="small" text="Rimuovi" onClick={() => handleSubmit(itemIdToRemove)} />
                    <Button size="small" text="Annulla" onClick={handleOnClose} />
                </DialogActions>
            </Dialog>


            <Container size="large" className={styles.content}>
                <div className={styles.leftColumn}>
                    <Paper className={styles.boxContainer}>
                        <div className={styles.title}> Il tuo carrello </div>
                        {
                            cart.length > 0 ? (
                                cart.map(item => (
                                    <CartItem key={item.product.id} item={item} setQuantity={handleChangeQuantity} />
                                ))
                            ) : (
                                <p> Il tuo carrello è vuoto. </p>
                            )
                        }
                    </Paper>
                </div>
                {
                    cart.length > 0 && (
                        <div className={styles.rightColumn}>
                            <div className={styles.boxContainer}>
                                <div className={styles.title}> Totale </div>
                                <h3>
                                    {cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2) + " €"}
                                </h3>
                                <Link to={"/payment"} className={styles.image}>
                                    <Button text="Vai al checkout" />
                                </Link>
                            </div>
                        </div>
                    )
                }
            </Container>
        </>
    );
};

export default Cart;