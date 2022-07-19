import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import Grid from "../../components/Grid/Grid";
import GridItem from "../../components/Grid/GridItem";
import Paper from "../../components/Paper/Paper";
import Select from "../../components/Select/Select";
import Textarea from "../../components/Textarea/Textarea";
import Textfield from "../../components/Textfield/Textfield";
import api from "../../config/api";
import { useAppDispatch, useAppSelector } from "../../config/store";
import { getCategories } from "../../reducers/categories";
import ICategory from "../../shared/models/ICategory";
import IProduct, { productDefaultValue } from "../../shared/models/IProduct";
import styles from "./edit-product.module.scss";


const EditProductRoute = () => {
    const params = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const [form, setForm] = useState<IProduct>(productDefaultValue);
    const { entities: categories } = useAppSelector(state => state.categories)

    const handleOnChange = (event: React.SyntheticEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, value: string | number) => {
        setForm({ ...form, [event.currentTarget.name]: value })
    }


    const isNew = !params.id;

    const handleSubmit = async () => {
        if (isNew) {
            const response = await api.post<{ data: IProduct }>("/products/", {
                name: form.name,
                price: form.price,
                description: form.description,
                availability: form.availability,
                category_id: form.category_id,
                // images: form.images,
            });
            // handleOnEdit(response.data.data);
        } else {
            const response = await api.put<{ data: IProduct }>("/products/" + params.id, {
                name: form.name,
                price: form.price,
                description: form.description,
                availability: form.availability,
                category_id: form.category_id,
                // images: form.images,
            });
            // handleOnEdit(response.data.data);
        }
    }

    const handleCancel = () => {
        navigate(-1);
    }

    useEffect(() => {
        const getProduct = async () => {
            const response = await api.get<{ data: IProduct }>(`/products/${params.id}`);
            setForm(response.data.data);
        }
        if (!isNew) {
            getProduct()
        } else {
            setForm(productDefaultValue)
        }
    }, [params.id])

    useEffect(() => {
        dispatch(getCategories())
    }, [])

    return (
        <Container size="large" className={styles.container}>
            <Paper className={styles.content}>
                <div className={styles.header}>
                    <div className={styles.title}>{isNew ? "Crea un nuovo prodotto" : "Modifica il prodotto"}</div>
                </div>
                <div className={styles.form}>
                    <Grid rowGap={2} colGap={1.5}>
                        <GridItem cols={12}>
                            <Textfield
                                name="name"
                                label="Nome"
                                placeholder="Nome"
                                type="text"
                                fullWidth
                                value={form.name}
                                onValueChange={handleOnChange}
                            />
                        </GridItem>
                        <GridItem cols={12}>
                            <Select
                                className={styles.selectCategory}
                                name="category_id"
                                label="Categoria"
                                required={true}
                                fullWidth
                                placeholder="Seleziona una categoria"
                                value={String(form.category_id)}
                                onChange={handleOnChange}
                                options={(categories || []).map((category: ICategory) => ({ value: String(category.id), label: category.name }))} />
                        </GridItem>
                        <GridItem cols={6}>
                            <Textfield
                                name="price"
                                label="Prezzo"
                                placeholder="Prezzo"
                                type="number"
                                fullWidth
                                value={form.price}
                                onValueChange={handleOnChange}
                                step="0.01"
                                min="0.00"
                            />
                        </GridItem>
                        <GridItem cols={6}>
                            <Textfield
                                name="availability"
                                label="Disponibilità"
                                placeholder="Disponibilità"
                                type="number"
                                fullWidth
                                value={form.availability}
                                onValueChange={handleOnChange}
                            />
                        </GridItem>
                        <GridItem cols={12}>
                            <Textarea
                                name="description"
                                label="Descrizione"
                                placeholder="Descrizione"
                                rows={3}
                                fullWidth
                                value={form.description}
                                onChange={handleOnChange}
                            />
                        </GridItem>
                        <GridItem cols={12} className={styles.actions}>
                            <Button className={styles.action} text="Salva" onClick={handleSubmit} />
                            <Button className={styles.action} text="Annulla" onClick={handleCancel} />
                        </GridItem>
                    </Grid>
                </div>
            </Paper>
        </Container>
    );
}

export default EditProductRoute;