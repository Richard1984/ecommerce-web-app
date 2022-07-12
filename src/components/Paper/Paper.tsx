import styles from './paper.module.scss';

interface IPaperProps {
    className?: string;
    children: React.ReactNode;
}

const Paper = (props: IPaperProps) => {
    
        const { className, children } = props;
    
        return (
            <div className={`${styles.paper}${className ? " " + className : ""}`}>
                {children}
            </div>
        )
}
    
export default Paper;