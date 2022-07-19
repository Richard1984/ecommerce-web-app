import styles from './grid.module.scss';

interface IGridItemProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    cols: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

const GridItem = (props: IGridItemProps) => {
    const { children, className, style, cols } = props;

    return (
        <div className={`${styles.gridItem}${className ? " " + className : ""}`} style={{ ...style, gridColumnEnd: `span ${cols}` }}>
            {children}
        </div>
    )
}

export default GridItem;