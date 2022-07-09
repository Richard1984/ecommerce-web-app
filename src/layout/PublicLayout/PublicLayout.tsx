import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useAppSelector } from "../../config/store";
import styles from './public-layout.module.scss';

interface PublicLayoutProps {
}

const PublicLayout = (props: PublicLayoutProps) => {
    const { user } = useAppSelector(state => state.authentication)

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