import { ShippingStatusEnum } from "../../../shared/models/IOrder";
import styles from "./step-progress-bar.module.scss";

const steps = ["Non spedito", "In lavorazione", "Spedito", "Consegnato"];

interface StepProgressBarProps {
    currentStep: ShippingStatusEnum;
}

const StepProgressBar = (props: StepProgressBarProps) => {
    const { currentStep } = props;

    return (
        <div className={styles.stepperWrapper}>
            {
                steps.map((step, index) => {
                    const isActive = index === currentStep;
                    const isCompleted = index < currentStep || (index === steps.length - 1 && isActive);
                    const style = `${styles.stepperItem} ${isActive ? styles.active : ""} ${isCompleted ? styles.completed : ""}`;
                    return (
                        <div className={style} key={index}>
                            <div className={styles.stepCounter}>{index + 1}</div>
                            <div className={styles.stepName}>{step}</div>
                        </div>
                    );
                })
            }
        </div>
    );
};

export default StepProgressBar;