import Button from "../../components/Button/Button";
import Paper from "../../components/Paper/Paper";
import { useAppSelector } from "../../config/store";
import UserRoleEnum from "../../shared/enums/role.enum";
import hasAnyAuthority from "../../shared/utils/authorities";
import styles from "./account.module.scss";

const Account = () => {
    const { user } = useAppSelector(state => state.authentication)

    return (
        <div className={styles.container}>
            <Paper className={styles.account}>
                <div className={styles.profile}>
                    <div className={styles.avatar}>
                        <img src={user?.avatar} alt="Avatar" />
                    </div>
                    <div className={styles.info}>
                        <div className={styles.name}>{user?.firstname + " " + user?.lastname}</div>
                        <div className={styles.email}>{user?.email}</div>
                    </div>
                </div>

                <div className={styles.actions}>
                    <Button className={styles.action} fullWidth text="Modifica account" to="/account/edit" />
                    <Button className={styles.action} fullWidth text="Modifica avatar" to="/account/avatar/edit" />
                    {!hasAnyAuthority(user?.roles || [], [UserRoleEnum.ADMIN]) ? <Button className={styles.action} fullWidth text="Gestione liste" to="/account/lists" /> : null}
                    {!hasAnyAuthority(user?.roles || [], [UserRoleEnum.ADMIN]) ? <Button className={styles.action} fullWidth text="Visualizza ordini" to="/account/orders" /> : null}
                    {!hasAnyAuthority(user?.roles || [], [UserRoleEnum.ADMIN]) ? <Button className={styles.action} fullWidth text="Visualizza metodi di pagamento" to="/account/payment_methods" /> : null}
                    <Button className={styles.action} fullWidth text="Elimina account" to="/account/delete" />
                </div>
            </Paper>
        </div>
    )
}

export default Account