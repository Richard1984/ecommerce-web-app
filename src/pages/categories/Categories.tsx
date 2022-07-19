import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Button from "../../components/Button/Button";
import Category from "../../components/Category/Category";
import Container from "../../components/Container/Container";
import Paper from "../../components/Paper/Paper";
import { useAppDispatch, useAppSelector } from "../../config/store";
import { CategoriesState, getCategories } from "../../reducers/categories";
import ICategory from "../../shared/models/ICategory";
import styles from "./categories.module.scss";
import DeleteCategory from "./components/DeleteCategory";
import EditCategory from "./components/EditCategory";

const Categories = () => {
    const dispatch = useAppDispatch()
    const { entities: categories } = useAppSelector<CategoriesState>(state => state.categories);
    const [categoryToEdit, setCategoryToEdit] = useState<ICategory | null>(null);
    const [editCategoryDialog, setEditCategoryDialog] = useState<boolean>(false);
    const [deleteCategoryDialog, setDeleteCategoryDialog] = useState<boolean>(false);

    const handleOpenEditCategoryDialog = (category: ICategory | null) => {
        setCategoryToEdit(category);
        setEditCategoryDialog(true);
    }

    const handleCloseEditCategoryDialog = () => {
        setEditCategoryDialog(false);
        setCategoryToEdit(null);
    }

    const handleOpenDeleteCategoryDialog = (category: ICategory | null) => {
        setCategoryToEdit(category);
        setDeleteCategoryDialog(true);
    }

    const handleCloseDeleteCategoryDialog = () => {
        setDeleteCategoryDialog(false);
        setCategoryToEdit(null);
    }

    const handleGetCategories = async () => {
        // const response = await api.get<{ data: IReview[] }>(`/products/${id}/reviews`);
        // setReviews(response.data.data);
        dispatch(getCategories());
    }

    return (
        <>
            <Container size="large" className={styles.container}>
                <Paper className={styles.content}>
                    <div className={styles.header}>
                        <div className={styles.title}>Categorie</div>
                        <div className={styles.actions}>
                            <Button size="small" className={styles.action} leftIcon={<FontAwesomeIcon icon={faPlus} />} onClick={() => handleOpenEditCategoryDialog(null)} />
                        </div>
                    </div>
                    {
                        categories.length > 0 ?
                            categories.map(category => (
                                <Category key={category.id} category={category} onEdit={handleOpenEditCategoryDialog} onDelete={handleOpenDeleteCategoryDialog} />
                            ))
                            :
                            <p>Nessuna categoria presente.</p>
                    }
                </Paper>
            </Container>
            <EditCategory open={editCategoryDialog} category={categoryToEdit} onClose={handleCloseEditCategoryDialog} onEdit={handleGetCategories} />
            <DeleteCategory open={deleteCategoryDialog} category={categoryToEdit} onClose={handleCloseDeleteCategoryDialog} onDelete={handleGetCategories} />
        </>
    );
}

export default Categories;