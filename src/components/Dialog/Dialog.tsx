import ClickAwayListener from 'react-click-away-listener';
import styles from './dialog.module.scss';

interface IDialogProps {
    open: boolean;
    children: React.ReactNode;
    width?: string;
    onClose?: () => void;
}

interface IDialogHeaderProps {
    title?: string;
    subtitle?: string;
    children?: React.ReactNode;
}

interface IDialogContentProps {
    children: React.ReactNode;
}

interface IDialogActionsProps {
    children: React.ReactNode;
}

const Dialog = (props: IDialogProps) => {
    const { open, children, width, onClose: handleOnClose } = props;

    if (!open) {
        return null;
    }

    return (
        <div className={styles.backdrop}>
            <ClickAwayListener onClickAway={() => handleOnClose && handleOnClose()}>
            <div className={styles.dialog}
            // style={width ? { width } : {}}
            >
                {children}
                </div>
            </ClickAwayListener>
        </div>
    );
}

export const DialogHeader = (props: IDialogHeaderProps) => {

    const { title, subtitle, children } = props;

    return (
        <div className={styles.dialogHeader}>
            {title ? <div className={styles.title}>{title}</div> : null}
            {subtitle ? <div className={styles.subtitle}>{subtitle}</div> : null}
            {children}
        </div>
    );
}

export const DialogContent = (props: IDialogContentProps) => {

    const { children } = props;

    return (
        <div className={styles.dialogContent}>
            {children}
        </div>
    );
}

export const DialogActions = (props: IDialogActionsProps) => {
    const { children } = props;

    return (
        <div className={styles.dialogActions}>
            {children}
        </div>
    );
}

export default Dialog