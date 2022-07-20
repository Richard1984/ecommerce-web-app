import { faMinus, faPlus, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createRef } from "react";
import Paper from "../../../../components/Paper/Paper";
import IProduct, { IProductImage } from "../../../../shared/models/IProduct";
import styles from "./edit-image.module.scss";

interface IEditImagesProps {
    product: IProduct;
    className?: string;
    onImagesToDelete: (images: IProductImage[]) => void;
    onImagesToAdd: (images: File[]) => void;
    imagesToAdd: File[];
    imagesToDelete: IProductImage[];
}

const EditImages = (props: IEditImagesProps) => {
    const fileInput = createRef<HTMLInputElement>();

    const { product, imagesToAdd, imagesToDelete, onImagesToAdd: handleOnImagesToAdd, onImagesToDelete: handleOnImagesToDelete, className } = props;

    const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.currentTarget.files;
        if (files && files.length) {
            handleOnImagesToAdd([...imagesToAdd, ...Array.from(files)]);
        }
    }

    const selectFiles = () => {
        fileInput?.current?.click();
    };

    const addImageToDelete = (image: IProductImage) => {
        handleOnImagesToDelete([...imagesToDelete, image]);
    }

    const removeImageToDelete = (image: IProductImage) => {
        handleOnImagesToDelete(imagesToDelete.filter(i => i.id !== image.id));
    }

    const removeImageToUpload = (index: number) => {
        const results = [...imagesToAdd];
        results.splice(index, 1);
        handleOnImagesToAdd(results);
    }

    return (
        <div {...(className ? { className } : {})}>
            <div className={styles.container}>
                {product.images.map(image => (
                    <Paper key={image.id} className={styles.preview} onClick={() => {
                        if (imagesToDelete.findIndex(i => image.id === i.id) !== -1) {
                            removeImageToDelete(image)
                        } else {
                            addImageToDelete(image)
                        }
                    }}>
                        <div className={styles.image}>
                            <img src={image.url} alt="Selected" />
                        </div>
                        <div className={styles.action} style={{ ...(imagesToDelete.findIndex(i => image.id === i.id) !== -1 ? { opacity: 1 } : {}) }}>

                            <FontAwesomeIcon icon={imagesToDelete.findIndex(i => image.id === i.id) !== -1 ? faTrash : faXmark} />
                        </div>
                    </Paper>
                ))}
                {imagesToAdd.map((image, index) => (
                    <Paper key={index} className={styles.preview} onClick={() => removeImageToUpload(index)}>
                        <div className={styles.image}>
                            <img src={URL.createObjectURL(image)} alt="Selected" />
                        </div>
                        <div className={styles.action}>
                            <FontAwesomeIcon icon={faMinus} />
                        </div>
                    </Paper>
                ))}
                <div className={styles.addImage} onClick={selectFiles}>
                    <FontAwesomeIcon icon={faPlus} />
                </div>
            </div>
            <input ref={fileInput} multiple hidden type="file" onChange={handleFile} accept="image/*" />
        </div>
    )
}

export default EditImages;