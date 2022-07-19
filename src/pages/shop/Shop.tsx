import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Paper from "../../components/Paper/Paper";
import { useAppSelector } from "../../config/store";
import styles from "./shop.module.scss";

const Shop = () => {
    const navigate = useNavigate()
    const { user } = useAppSelector(state => state.authentication)

    return (
        <div className={styles.container}>
            <Paper className={styles.shop}>
                <div className={styles.info}>
                    <div className={styles.name}>Il mio negozio</div>
                </div>

                <div className={styles.actions}>
                    <Button className={styles.action} fullWidth text="Modifica informazioni negozio" to="/admin/shop" />
                    <Button className={styles.action} fullWidth text="Gestione categorie" to="/admin/categories" />
                    <Button className={styles.action} fullWidth text="Aggiungi prodotto" to="/admin/products/new"/>
                    <Button className={styles.action} fullWidth text="Gestione prodotti" to="/admin/products"/>
                    <Button className={styles.action} fullWidth text="Visualizza ordini" to="./admin/orders"/>
                </div>
            </Paper>
        </div>
    )
}

export default Shop