import Button from "../../../components/Button/Button";
import Paper from "../../../components/Paper/Paper";
import styles from "./product.module.scss";

interface IProductProps {
    img: string;
    id: number | null;
    name: string;
    price: number

}

const Product = (props: IProductProps) => {
    const { id, img, name, price } = props
    return (

        <Paper className={styles.container}>
            <div className={styles.image}>
                <img src={img || "https://via.placeholder.com/230"} alt="prodotto" />
            </div>

            <div className={styles.info}>

                <div className={styles.name}>
                    {name}
                </div>

                <div className={styles.price}>
                    {price} €
                </div>

                <div className={styles.buttons}>
                    <Button to={`/admin/products/${id}/edit`}>Modifica prodotto</Button>
                    <Button to={`/admin/products/${id}/delete`}>Rimuovi prodotto</Button>
                </div>

            </div>
        </Paper>
    )
}
export default Product;