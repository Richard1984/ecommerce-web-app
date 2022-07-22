import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../../components/Button/Button";
import Dialog, { DialogActions, DialogContent, DialogHeader } from "../../../components/Dialog/Dialog";
import api from "../../../config/api";
import ICategory from "../../../shared/models/ICategory";

interface IDeleteCategoryProps {
    category: ICategory | null;
    open: boolean;
    onClose: () => void;
    onDelete: (category: ICategory) => void;
}

const DeleteCategory = (props: IDeleteCategoryProps) => {

    const { category, open, onClose: handleOnClose, onDelete: handleOnDelete } = props;

    const handleSubmit = async () => {
        const response = await api.delete<{ data: ICategory }>(`/categories/${category?.id}`);
        handleOnDelete(response.data.data);
        handleOnClose();
    }

    return (
        <Dialog open={open} width="600px" onClose={handleOnClose}>
            <DialogHeader title="Elimina la categoria" />
            {/* <Divider color="#cacaca"/> */}
            <DialogContent>
                <p>Sei sicuro di volere eliminare la categoria {category?.name}</p>
            </DialogContent>
            <DialogActions>
                <Button size="small" leftIcon={<FontAwesomeIcon icon={faCheck} />} text="Conferma" onClick={handleSubmit} />
                <Button size="small" leftIcon={<FontAwesomeIcon icon={faXmark} />} text="Annulla" onClick={handleOnClose} />
            </DialogActions>
        </Dialog>
    )

}

export default DeleteCategory