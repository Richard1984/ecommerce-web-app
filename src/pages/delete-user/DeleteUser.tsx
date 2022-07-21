import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Dialog, { DialogActions, DialogContent, DialogHeader } from "../../components/Dialog/Dialog";
import Textfield from "../../components/Textfield/Textfield";
import { useAppDispatch } from "../../config/store";
import { deleteAccount } from "../../reducers/authentication";
const DeleteUser = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const [password, setPassword] = useState<string>("")

    const handleCancel = () => {
        navigate(-1);
    }
    const handleDelete = async () => {
        dispatch(deleteAccount({
            password
        }))
    }
    
    return (
        <Dialog open={true} width="600px">
            <DialogHeader title="Elimina il tuo account" />
            {/* <Divider color="#cacaca"/> */}
            <DialogContent>
                <div>Sei sicuro di voler eliminare il tuo account?</div>
                <div>Reinserisci la password per confermare.</div>
            </DialogContent>
            <DialogContent>
                <Textfield
                    label='Password'
                    placeholder='Password'
                    name="password"
                    value={password}
                    required={true}
                    type="password"
                    onValueChange={(event, value) => setPassword(value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>Annulla</Button>
                <Button onClick={handleDelete}>Elimina</Button>
            </DialogActions>
        </Dialog>
    )
}
export default DeleteUser;