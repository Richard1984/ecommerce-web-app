import { Link } from "react-router-dom";
import IProduct from "../../shared/models/IProduct";
import Button from "../Button/Button";
import styles from './product-item.module.scss';

interface IProductAction {
    icon: React.ReactElement;
    onClick: (product: IProduct) => void;
}

interface IProductItemProps {
    product: IProduct;
    actions: IProductAction[]
    className?: string;
}

const ProductItem = (props: IProductItemProps) => {
    const { product, actions, className } = props;

    return (
        <div className={`${styles.product}${className ? " " + className : ""}`}>
            <Link to={"/products/" + product.id}>
                <div className={styles.image}>
                    <img src={(product?.images || [])[0]?.url} alt="product" />
                </div>
            </Link>
            <div className={styles.body}>
                <Link to={"/products/" + product.id} className={styles.info}>
                    <h3 className={styles.name}>{product.name}</h3>
                    <p className={styles.price}>{product.price + " €"}</p>
                </Link>
            </div>
            <div className={styles.rightBody}>
                {actions.map(action => (
                    <Button
                        leftIcon={action.icon}
                        size="small"
                        onClick={() => action.onClick(product)}
                    />
                )
                )}
            </div>
        </div>
    );
};

export default ProductItem;