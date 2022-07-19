import { Outlet } from "react-router-dom";
import AdminHeader from "../../components/Header/AdminHeader";
import { useAppSelector } from "../../config/store";
import { AuthenticationState } from "../../reducers/authentication";
import styles from './admin-layout.module.scss';

const AdminLayout = () => {
    const { user } = useAppSelector<AuthenticationState>(state => state.authentication)

    return (
        <div className={styles.container}>
            <AdminHeader user={user} />
            <div className={styles.content}>
                <Outlet/>
            </div>
        </div>
    )
}

export default AdminLayout;