import styles from './container.module.scss';

interface IContainerProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    size?: 'small' | 'medium' | 'large';
}

const Container = (props: IContainerProps) => {

    const { children, className, style, size } = props;

    const getMaxWidth = () => {
        if (size === "small") {
            return "600px"
        } else if (size === "medium") {
            return "800px"
        }
        return "1200px"
    }

    return (
        <div className={`${styles.container}${className ? " " + className : ""}`} style={{ ...style, maxWidth: getMaxWidth() }}>
            {children}
        </div>
    )
}

export default Container;