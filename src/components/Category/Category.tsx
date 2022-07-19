import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ICategory from "../../shared/models/ICategory";
import Button from "../Button/Button";
import styles from "./category.module.scss";

interface ICategoryProps {
    category: ICategory;
    onEdit: (category: ICategory) => void;
    onDelete: (category: ICategory) => void;
}

const Category = (props: ICategoryProps) => {

    const { category, onEdit: handleOnEdit, onDelete: handleOnDelete } = props;

    return (
        <div className={styles.category}>
            <p className={styles.title}>{category.name}</p>
            <div className={styles.actions}>
                <Button size="small" className={styles.action} leftIcon={<FontAwesomeIcon icon={faEdit} />} onClick={() => handleOnEdit(category)} />
                <Button size="small" className={styles.action} leftIcon={<FontAwesomeIcon icon={faTrash} />} onClick={() => handleOnDelete(category)} />
            </div>
        </div>
    );
}

export default Category;