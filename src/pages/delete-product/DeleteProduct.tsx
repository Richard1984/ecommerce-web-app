import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import Paper from "../../components/Paper/Paper";
import api from "../../config/api";
import IProduct from "../../shared/models/IProduct";
import styles from './delete-product.module.scss';
const DeleteProduct = () => {
    const navigate = useNavigate();
    const [productName, setProductName] = useState<String | null>(null);
    const { id } = useParams();

    useEffect(() => {
        const getProductName = async () => {
            const response = await api.get<{ data: IProduct }>(`/products/${id}`);
            setProductName(response.data?.data?.name);
        }
        getProductName()
    }, [id])

    const handleCancel = () => {
        navigate(-1);
    }
    const handleDelete = async () => {
        const response = await api.delete(`/products/${id}`);
        if (!response?.data?.available) {
            navigate(-1)
        }
    }
    return (
        <div className={styles.container}>
            <Paper className={styles.deleteCard}>
                <div className={styles.name}>
                    Elimina "{productName}"
                </div>
                <div className={styles.description}>
                    Sei sicuro di voler eliminare questo prodotto?
                </div>
                <div className={styles.buttons}>
                    <Button onClick={handleDelete}>Elimina</Button>
                    <Button onClick={handleCancel}>Annulla</Button>
                </div>
            </Paper>
        </div>
    )
}
export default DeleteProduct;