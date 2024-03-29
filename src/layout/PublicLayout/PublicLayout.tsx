import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useAppSelector } from "../../config/store";
import { AuthenticationState } from "../../reducers/authentication";
import styles from './public-layout.module.scss';

const PublicLayout = () => {
    const { user } = useAppSelector<AuthenticationState>(state => state.authentication)

    return (
        <div className={styles.container}>
            <Header user={user} />
            <div className={styles.content}>
                <Outlet/>
            </div>
        </div>
    )
}

export default PublicLayout;