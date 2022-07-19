import { faSave, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Button from "../../../components/Button/Button";
import Dialog, { DialogActions, DialogContent, DialogHeader } from "../../../components/Dialog/Dialog";
import Textfield from "../../../components/Textfield/Textfield";
import api from "../../../config/api";
import ICategory, { categoryDefaultValue } from "../../../shared/models/ICategory";

interface IEditCategoryProps {
    category: ICategory | null;
    open: boolean;
    onClose: () => void;
    onEdit: (review: ICategory) => void;
}

const EditCategory = (props: IEditCategoryProps) => {
    const [form, setForm] = useState<ICategory>(props.category || categoryDefaultValue);

    const isNew = !props.category?.id;

    const { category, open, onClose, onEdit: handleOnEdit } = props;

    const handleSubmit = async () => {
        if (isNew) {
            const response = await api.post<{ data: ICategory }>("/categories/", {
                name: form.name,
            });
            handleOnEdit(response.data.data);
        } else {
            const response = await api.put("/categories/" + category?.id, form);
            handleOnEdit(response.data.data);
        }
        handleOnClose();
    }

    useEffect(() => {
        if (category) {
            setForm(category)
        } else {
            setForm(categoryDefaultValue)
        }
    }, [category])

    const handleOnClose = () => {
        onClose()
        setForm(categoryDefaultValue)
    }

    return (
        <Dialog open={open} width="600px">
            <DialogHeader title={isNew ? "Crea una categoria" : "Modifica una categoria"} />
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

export default EditCategory