import { faSave, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Button from "../../../components/Button/Button";
import Dialog, { DialogActions, DialogContent, DialogHeader } from "../../../components/Dialog/Dialog";
import Textfield from "../../../components/Textfield/Textfield";
import api from "../../../config/api";
import IShoppingList, { shoppingListDefaultValue } from "../../../shared/models/IShoppingList";

interface IEditShoppingListProps {
    shoppingList: IShoppingList | null;
    open: boolean;
    onClose: () => void;
    onEdit: (shoppingList: IShoppingList) => void;
}

const EditShoppingList = (props: IEditShoppingListProps) => {
    const [form, setForm] = useState<IShoppingList>(props.shoppingList || shoppingListDefaultValue);

    const isNew = !props.shoppingList?.id;

    const { shoppingList, open, onClose, onEdit: handleOnEdit } = props;

    const handleSubmit = async () => {
        if (isNew) {
            const response = await api.post<{ data: IShoppingList }>("/account/lists/", {
                name: form.name,
                products: []
            });
            handleOnEdit(response.data.data);
        } else {
            const response = await api.put(`/account/lists/${shoppingList?.id}`, {
                name: form.name,
                products_to_add: [],
                products_to_delete: []
            });
            handleOnEdit(response.data.data);
        }
        handleOnClose();
    }

    useEffect(() => {
        if (shoppingList) {
            setForm(shoppingList)
        } else {
            setForm(shoppingListDefaultValue)
        }
    }, [shoppingList])

    const handleOnClose = () => {
        onClose()
        setForm(shoppingListDefaultValue)
    }

    return (
        <Dialog open={open} width="600px" onClose={handleOnClose}>
            <DialogHeader title={isNew ? "Crea una lista" : "Modifica una lista"} />
            {/* <Divider color="#cacaca"/> */}
            <DialogContent>
                <Textfield
                    label='Nome'
                    placeholder='Nome'
                    name="name"
                    fullWidth
                    value={form.name}
                    required={true}
                    type="text"
                    onValueChange={(event, value) => setForm({ ...form, name: value })} />
            </DialogContent>
            <DialogActions>
                <Button size="small" leftIcon={<FontAwesomeIcon icon={faSave} />} text="Salva" onClick={handleSubmit} />
                <Button size="small" leftIcon={<FontAwesomeIcon icon={faXmark} />} text="Annulla" onClick={handleOnClose} />
            </DialogActions>
        </Dialog>
    )

}

export default EditShoppingList