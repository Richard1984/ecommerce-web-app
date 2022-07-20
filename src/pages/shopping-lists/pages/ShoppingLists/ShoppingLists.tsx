import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../../components/Button/Button";
import Container from "../../../../components/Container/Container";
import Paper from "../../../../components/Paper/Paper";
import api from "../../../../config/api";
import IShoppingList from "../../../../shared/models/IShoppingList";
import DeleteShoppingList from "../../components/DeleteShoppingList";
import EditShoppingList from "../../components/EditShoppingList";
import ShoppingList from "../../components/ShoppingList/ShoppingList";
import styles from "./shopping-lists.module.scss";

const ShoppingListsRoute = () => {
    const navigate = useNavigate()
    const [shoppingLists, setShoppingLists] = useState<IShoppingList[]>([]);
    const [shoppingListToEdit, setShoppingListToEdit] = useState<IShoppingList | null>(null);
    const [editShoppingListDialog, setEditShoppingListDialog] = useState<boolean>(false);
    const [deleteShoppingListDialog, setDeleteShoppingListDialog] = useState<boolean>(false);

    const handleOpenEditShoppingListDialog = (shoppingList: IShoppingList | null) => {
        setShoppingListToEdit(shoppingList);
        setEditShoppingListDialog(true);
    }

    const handleCloseEditShoppingListDialog = () => {
        setEditShoppingListDialog(false);
        setShoppingListToEdit(null);
    }

    const handleOpenDeleteShoppingListDialog = (shoppingList: IShoppingList | null) => {
        setShoppingListToEdit(shoppingList);
        setDeleteShoppingListDialog(true);
    }

    const handleCloseDeleteShoppingListDialog = () => {
        setDeleteShoppingListDialog(false);
        setShoppingListToEdit(null);
    }

    const handleGetShoppingLists = async () => {
        const response = await api.get<{ data: IShoppingList[] }>(`/account/lists/`);
        setShoppingLists(response.data.data);
        // dispatch(getCategories());
    }

    const handleOnOpen = (shoppingList: IShoppingList | null) => {
        navigate(`/account/lists/${shoppingList?.id}/products`);
    }

    useEffect(() => { 
        handleGetShoppingLists();
    }, []);

    return (
        <>
            <Container size="large" className={styles.container}>
                <Paper className={styles.content}>
                    <div className={styles.header}>
                        <div className={styles.title}>Le mie liste</div>
                        <div className={styles.actions}>
                            <Button size="small" className={styles.action} leftIcon={<FontAwesomeIcon icon={faPlus} />} onClick={() => handleOpenEditShoppingListDialog(null)} />
                        </div>
                    </div>
                    {
                        shoppingLists.length > 0 ?
                            shoppingLists.map(shoppingList => (
                                <ShoppingList key={shoppingList.id} shoppingList={shoppingList} onOpen={handleOnOpen}  onEdit={handleOpenEditShoppingListDialog} onDelete={handleOpenDeleteShoppingListDialog} />
                            ))
                            :
                            <p>Nessuna lista presente.</p>
                    }
                </Paper>
            </Container>
            <EditShoppingList open={editShoppingListDialog} shoppingList={shoppingListToEdit} onClose={handleCloseEditShoppingListDialog} onEdit={handleGetShoppingLists} />
            <DeleteShoppingList open={deleteShoppingListDialog} shoppingList={shoppingListToEdit} onClose={handleCloseDeleteShoppingListDialog} onDelete={handleGetShoppingLists} />
        </>
    );
}

export default ShoppingListsRoute;