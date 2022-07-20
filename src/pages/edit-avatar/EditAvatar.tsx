import { createRef } from 'react';
import Button from '../../components/Button/Button';
import Paper from '../../components/Paper/Paper';
import { useAppDispatch, useAppSelector } from '../../config/store';
import { updateAvatar } from '../../reducers/authentication';
import styles from './edit-avatar.module.scss';

const EditAvatarRoute = () => {
    const dispatch = useAppDispatch()
    const fileInput = createRef<HTMLInputElement>();
    const { user } = useAppSelector(state => state.authentication)
    
    const selectFile = () => {
        fileInput?.current?.click();
    };

    const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files && event.currentTarget.files[0];
        if (file) {
            dispatch(updateAvatar(file))
        }
    }

    return (
        <>
          <div className={styles.container}>
            <Paper className={styles.box}>

                <div className={styles.header}>
                    <div className={styles.title}>Modifica la tua immagine di profilo</div>
                </div>
                <div className={styles.profile}>
                    <div className={styles.avatar}>
                        <img src={user?.avatar} alt="Avatar" />
                    </div>
                </div>

                <div className={styles.actions}>
                        <Button className={styles.action} fullWidth text="Carica una nuova immagine" onClick={selectFile} />
                </div>
            </Paper>
        </div>
        <input ref={fileInput} hidden type="file" onChange={handleFile} />
        </>
    );
}
    
export default EditAvatarRoute;