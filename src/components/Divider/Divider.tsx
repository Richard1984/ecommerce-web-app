import styles from "./divider.module.scss";

interface DividerProps {
    text?: string;
    color?: string; 
    className?: string;
}

const Divider = (props: DividerProps) => {

    const { text, color, className } = props;

    return (
        <div className={styles.divider + (className ? " " + className : "")}>
            <div className={styles.line} style={color ? { backgroundColor: color } : {}}></div>
            {props.text && <div className={styles.text}>{text}</div>}
            <div className={styles.line} style={color ? { backgroundColor: color } : {}}></div>
        </div>
    )
}

export default Divider;