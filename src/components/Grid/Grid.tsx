import styles from './grid.module.scss';

interface IGridProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    gap?: number;
    rowGap?: number;
    colGap?: number;
}

const Grid = (props: IGridProps) => {
    const { children, className, style, rowGap, colGap } = props;
    return (
        <div className={`${styles.grid}${className ? " " + className : ""}`} style={{ ...style, rowGap: `${(rowGap || 0) * 10}px`, columnGap: `${(colGap || 0) * 10}px` }}>
            {children}
        </div>
    )
}

export default Grid;

