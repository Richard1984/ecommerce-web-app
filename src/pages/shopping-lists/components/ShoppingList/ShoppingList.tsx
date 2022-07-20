import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../../../components/Button/Button";
import IShoppingList from "../../../../shared/models/IShoppingList";
import styles from "./shopping-list.module.scss";

interface IShoppingListProps {
    shoppingList: IShoppingList;
    onEdit: (shoppingList: IShoppingList) => void;
    onDelete: (shoppingList: IShoppingList) => void;
}

const ShoppingList = (props: IShoppingListProps) => {

    const { shoppingList, onEdit: handleOnEdit, onDelete: handleOnDelete } = props;

    return (
        <div className={styles.shoppingList}>
            <p className={styles.title}>{shoppingList.name}</p>
            <div className={styles.actions}>
                <Button size="small" className={styles.action} leftIcon={<FontAwesomeIcon icon={faEdit} />} onClick={() => handleOnEdit(shoppingList)} />
                <Button size="small" className={styles.action} leftIcon={<FontAwesomeIcon icon={faTrash} />} onClick={() => handleOnDelete(shoppingList)} />
            </div>
        </div>
    );
}

export default ShoppingList;