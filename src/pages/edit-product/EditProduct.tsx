import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
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
import IProduct, { IProductImage, productDefaultValue } from "../../shared/models/IProduct";
import UploadImage from "./components/EditImages/EditImages";
import styles from "./edit-product.module.scss";


const EditProductRoute = () => {
    const params = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const [form, setForm] = useState<IProduct>(productDefaultValue);
    const { entities: categories } = useAppSelector(state => state.categories)
    const [imagesToAdd, setImagesToAdd] = useState<File[]>([]);
    const [imagesToDelete, setImagesToDelete] = useState<IProductImage[]>([]);

    const options = [{ value: "all", label: "Seleziona categoria", disabled: true }, ...(categories || []).map(category => ({ value: String(category.id), label: category.name }))]


    const handleOnChange = (event: React.SyntheticEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, value: string | number) => {
        setForm({ ...form, [event.currentTarget.name]: value })
    }

    const isNew = !params.id;

    const uploadImages = async (product: IProduct) => {
        if (imagesToAdd.length > 0) {
            const formData = new FormData();
            for (let i = 0; i < imagesToAdd.length; i++) {
                formData.append("images[]", imagesToAdd[i], imagesToAdd[i].name);
            }
            const response = await api.post<{ data: string }>(`/products/${product.id}/images/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setImagesToAdd([]);
        }
    }

    const deleteImages = async (product: IProduct) => {
        if (imagesToDelete.length > 0) {
            const response = await api.put<{ data: string }>(`/products/${product.id}/images/`, {
                images_ids: imagesToDelete.map(image => image.id)
            });
            setImagesToDelete([]);
        }
    }

    const getProduct = async () => {
        const response = await api.get<{ data: IProduct }>(`/products/${params.id}`);
        setForm(response.data.data);
    }

    const handleSubmit = async () => {
        if (isNew) {

            if (!(form.images.filter(image => imagesToDelete.findIndex(i => i.id === image.id) === -1).length || imagesToAdd.length)) {
                return toast.error("Devi selezionare almeno un'immagine.")
            }

            const response = await api.post<{ data: IProduct }>("/products/", {
                name: form.name,
                price: form.price,
                description: form.description,
                availability: form.availability,
                category_id: form.category_id,
            });

            const product = response.data.data;

            await deleteImages(product)
            await uploadImages(product)
 
        } else {
            const response = await api.put<{ data: IProduct }>("/products/" + params.id, {
                name: form.name,
                price: form.price,
                description: form.description,
                availability: form.availability,
                category_id: form.category_id,
            });

            const product = response.data.data;

            await deleteImages(product)
            await uploadImages(product)

            await getProduct()
        }
        navigate(-1);
    }

    const handleCancel = () => {
        navigate(-1);
    }

    useEffect(() => {
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
            <div className={styles.content}>
                {/* <div className={styles.image}> */}
                <UploadImage className={styles.image} product={form} imagesToAdd={imagesToAdd} imagesToDelete={imagesToDelete}  onImagesToAdd={(images) => setImagesToAdd(images)} onImagesToDelete={(images) => setImagesToDelete(images)} />
                {/* </div> */}
                <Paper className={styles.info}>
                    <div className={styles.header}>
                        <div className={styles.title}>{isNew ? "Crea un nuovo prodotto" : "Modifica il prodotto"}</div>
                    </div>
                    <div className={styles.form}>
                        <form onSubmit={(event) => {
                            event.preventDefault();
                            handleSubmit()
                        }} >
                            <Grid rowGap={2} colGap={1.5}>
                                <GridItem cols={12}>
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
                                <GridItem cols={12}>
                                    <Select
                                        className={styles.selectCategory}
                                        name="category_id"
                                        label="Categoria"
                                        fullWidth
                                        placeholder="Seleziona una categoria"
                                        value={form.category_id ? String(form.category_id) : "all"}
                                        onChange={handleOnChange}
                                        options={options} />
                                </GridItem>
                                <GridItem cols={6}>
                                    <Textfield
                                        name="price"
                                        label="Prezzo"
                                        required
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
                                        required
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
                                    <Button type="submit" className={styles.action} text="Salva" />
                                    <Button type="button" className={styles.action} text="Annulla" onClick={handleCancel} />
                                </GridItem>
                            </Grid>
                        </form>
                    </div>
                </Paper></div>
        </Container>
    );
}

export default EditProductRoute;