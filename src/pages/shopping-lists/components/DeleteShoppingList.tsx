import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../../components/Button/Button";
import Dialog, { DialogActions, DialogContent, DialogHeader } from "../../../components/Dialog/Dialog";
import api from "../../../config/api";
import IShoppingList from "../../../shared/models/IShoppingList";

interface IDeleteShoppingListProps {
    shoppingList: IShoppingList | null;
    open: boolean;
    onClose: () => void;
    onDelete: (shoppingList: IShoppingList) => void;
}

const DeleteShoppingList = (props: IDeleteShoppingListProps) => {

    const { shoppingList, open, onClose: handleOnClose, onDelete: handleOnDelete } = props;

    const handleSubmit = async () => {
        const response = await api.delete<{ data: IShoppingList }>(`/account/lists/${shoppingList?.id}`);
        handleOnDelete(response.data.data);
        handleOnClose();
    }

    return (
        <Dialog open={open} width="600px" onClose={handleOnClose}>
            <DialogHeader title="Elimina la lista" />
            <DialogContent>
                <p>Sei sicuro di volere eliminare la lista {shoppingList?.name}</p>
            </DialogContent>
            <DialogActions>
                <Button size="small" leftIcon={<FontAwesomeIcon icon={faCheck} />} text="Conferma" onClick={handleSubmit} />
                <Button size="small" leftIcon={<FontAwesomeIcon icon={faXmark} />} text="Annulla" onClick={handleOnClose} />
            </DialogActions>
        </Dialog>
    )

}

export default DeleteShoppingList