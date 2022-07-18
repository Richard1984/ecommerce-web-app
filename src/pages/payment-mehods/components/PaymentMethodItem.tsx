import Button from "../../../components/Button/Button";
import IPaymentMethod from "../../../shared/models/IPaymentMethod";
import styles from "../payment-methods.module.scss";

interface PaymentMethodItemProps {
    paymentMethod: IPaymentMethod;
    handleRemove: () => void;
}

const PaymentMethodItem = (props: PaymentMethodItemProps) => {
    const { paymentMethod, handleRemove } = props;

    return (
        <div className={styles.paymentMethodItem}>
            <div className={styles.name}>
                <span> {paymentMethod.card.brand.toUpperCase()} </span>
            </div>
            <div className={styles.type}>
                <span> {paymentMethod.card.funding} </span>
            </div>
            <div className={styles.number}>
                <span> **** **** **** {paymentMethod.card.last4} </span>
            </div>
            <div className={styles.bottomBar}>
                <Button size="small" text="Rimuovi" onClick={handleRemove} />
            </div>
        </div>
    );
};

export default PaymentMethodItem;