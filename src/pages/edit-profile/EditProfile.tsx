import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import Grid from "../../components/Grid/Grid";
import GridItem from "../../components/Grid/GridItem";
import Paper from "../../components/Paper/Paper";
import Textfield from "../../components/Textfield/Textfield";
import { useAppDispatch, useAppSelector } from "../../config/store";
import { updateAccount } from "../../reducers/authentication";
import IUser, { userDefaultValue } from "../../shared/models/IUser";
import styles from "./edit-profile.module.scss";


const EditProfileRoute = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const { user } = useAppSelector(state => state.authentication)
    const [form, setForm] = useState<IUser>(userDefaultValue);

    const handleOnChange = (event: React.SyntheticEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, value: string | number) => {
        setForm({ ...form, [event.currentTarget.name]: value })
    }

    const handleSubmit = async () => {
        dispatch(updateAccount({
            firstname: form.firstname,
            lastname: form.lastname,
            email: form.email,
            country: form.country
        }))
    }

    const handleCancel = () => {
        navigate(-1);
    }

    useEffect(() => {
        if (user) {
            setForm(user)
        }
    }, [user])

    return (
        <Container size="large" className={styles.container}>
            <Paper className={styles.content}>
                <div className={styles.header}>
                    <div className={styles.title}>{"Modifica il tuo profilo"}</div>
                    <div className={styles.subtitle}>{"Aggiorna le informazioni del account"}</div>
                </div>
                <div className={styles.form}>
                    <form onSubmit={(event) => {
                        event.preventDefault();
                        handleSubmit()
                    }} >
                        <Grid rowGap={2} colGap={1.5}>
                            <GridItem cols={6}>
                                <Textfield
                                    name="firstname"
                                    label="Nome"
                                    required
                                    placeholder="Nome"
                                    type="text"
                                    fullWidth
                                    value={form.firstname}
                                    onValueChange={handleOnChange}
                                />
                            </GridItem>
                            <GridItem cols={6}>
                                <Textfield
                                    name="lastname"
                                    label="Cognome"
                                    required
                                    placeholder="Cognome"
                                    type="text"
                                    fullWidth
                                    value={form.lastname}
                                    onValueChange={handleOnChange}
                                />
                            </GridItem>
                            <GridItem cols={6}>
                                <Textfield
                                    name="email"
                                    label="Email"
                                    required
                                    placeholder="Email"
                                    type="text"
                                    fullWidth
                                    value={form.email}
                                    onValueChange={handleOnChange}
                                />
                            </GridItem>
                            <GridItem cols={6}>
                                <Textfield
                                    name="country"
                                    label="Paese"
                                    required
                                    placeholder="Paese"
                                    type="text"
                                    fullWidth
                                    value={form.country}
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

export default EditProfileRoute;