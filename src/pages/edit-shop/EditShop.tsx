import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import Grid from "../../components/Grid/Grid";
import GridItem from "../../components/Grid/GridItem";
import Paper from "../../components/Paper/Paper";
import Textfield from "../../components/Textfield/Textfield";
import api from "../../config/api";
import { useAppDispatch, useAppSelector } from "../../config/store";
import IShop, { shopDefaultValue } from "../../shared/models/IShop";
import styles from "./edit-shop.module.scss";


const EditShopRoute = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const [form, setForm] = useState<IShop>(shopDefaultValue);
    const { entities: categories } = useAppSelector(state => state.categories)

    const handleOnChange = (event: React.SyntheticEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, value: string | number) => {
        setForm({ ...form, [event.currentTarget.name]: value })
    }

    const handleSubmit = async () => {
        const response = await api.put<{ data: IShop }>("/shop/", {
            name: form.name,
            surname: form.surname,
            social_reason: form.social_reason,
            vat_number: form.vat_number,
            address: form.address,
            sector: form.sector,
        });
        setForm(response.data.data);
    }

    const handleCancel = () => {
        navigate(-1);
    }

    useEffect(() => {
        const getShop = async () => {
            const response = await api.get<{ data: IShop }>(`/shop`);
            setForm(response.data.data);
        }
            getShop()
    }, [])

    return (
        <Container size="large" className={styles.container}>
            <Paper className={styles.content}>
                <div className={styles.header}>
                    <div className={styles.title}>{"Modifica informazioni negozio"}</div>
                </div>
                <div className={styles.form}>
                    <form onSubmit={(event) => {
                        event.preventDefault();
                        handleSubmit()
                    }} >
                        <Grid rowGap={2} colGap={1.5}>
                            <GridItem cols={6}>
                                <Textfield
                                    name="name"
                                    label="Nome"
                                    required
                                    placeholder="Nome"
                                    type="text"
                                    fullWidth
                                    value={form.name}
                                    onValueChange={handleOnChange}
                                />
                            </GridItem>
                            <GridItem cols={6}>
                                <Textfield
                                    name="surname"
                                    label="Cognome"
                                    required
                                    placeholder="Cognome"
                                    type="text"
                                    fullWidth
                                    value={form.surname}
                                    onValueChange={handleOnChange}
                                />
                            </GridItem>
                            <GridItem cols={6}>
                                <Textfield
                                    name="social_reason"
                                    label="Ragione sociale"
                                    required
                                    placeholder="Ragione sociale"
                                    type="text"
                                    fullWidth
                                    value={form.social_reason}
                                    onValueChange={handleOnChange}
                                />
                            </GridItem>
                            <GridItem cols={6}>
                                <Textfield
                                    name="vat_number"
                                    label="P.IVA/Codice fiscale"
                                    required
                                    placeholder="P.IVA/Codice fiscale"
                                    type="text"
                                    fullWidth
                                    value={form.vat_number}
                                    onValueChange={handleOnChange}
                                />
                            </GridItem>
                            <GridItem cols={6}>
                                <Textfield
                                    name="address"
                                    label="Indirizzo sede legale"
                                    required
                                    placeholder="Indirizzo sede legale"
                                    type="text"
                                    fullWidth
                                    value={form.address}
                                    onValueChange={handleOnChange}
                                />
                            </GridItem>
                            <GridItem cols={6}>
                                <Textfield
                                    name="sector"
                                    label="Settore"
                                    required
                                    placeholder="Settore"
                                    type="text"
                                    fullWidth
                                    value={form.sector}
                                    onValueChange={handleOnChange}
                                />
                            </GridItem>
                            <GridItem cols={12} className={styles.actions}>
                                <Button type="submit" className={styles.action} text="Salva" />
                                <Button type="button" className={styles.action} text="Annulla" onClick={handleCancel} />
                            </GridItem>
                        </Grid>
                    </form>
                </div>
            </Paper>
        </Container>
    );
}

export default EditShopRoute;