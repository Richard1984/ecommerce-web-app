import styles from './chip.module.scss';

interface IChipProps {
    label: string;
    onClick?: () => void;
    leftIcon?: React.ReactNode;
    className?: string;
}

const Chip = (props: IChipProps) => {

    const { label, onClick, leftIcon, className } = props;

    return (
        <div className={styles.chip + (className ? " " + className : "")} onClick={onClick}>
            {leftIcon && <div className={styles.icon}>{leftIcon}</div>}
            <div className={styles.label}>{label}</div>
        </div>
    );
}

export default Chip;
