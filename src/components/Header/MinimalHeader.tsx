import Link from "../Link/Link";
import styles from './header.module.scss';

const MinimalHeader = () => {
    return (
        <header className={`${styles.header} ${styles.minimalHeader}`}>
            <div className={styles.logoContainer}>
                <Link className={styles.logo} to="/" underline={false}>Amnazom</Link>
            </div>
        </header>
    )
}

export default MinimalHeader