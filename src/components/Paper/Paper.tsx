import styles from './paper.module.scss';

interface IPaperProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

const Paper = (props: IPaperProps) => {
    
        const { className, children, ...rest } = props;
    
        return (
            <div {...rest}  className={`${styles.paper}${className ? " " + className : ""}`}>
                {children}
            </div>
        )
}
    
export default Paper;