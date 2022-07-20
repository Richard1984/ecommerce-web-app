import { useEffect, useState } from 'react';
import Paper from '../../../../components/Paper/Paper';
import { IProductImage } from '../../../../shared/models/IProduct';
import styles from './product-images.module.scss';

interface IProductImages {
    images: IProductImage[]
}

const ProductImages = (props: IProductImages) => {
    const [mainImage, setMainImage] = useState <IProductImage | null>(props.images[0]);
    const [previews, setPreviews] = useState<IProductImage[]>(props.images.slice(1) || []);

    const { images } = props;

    const handleImageClick = (image: IProductImage, index: number) => {
        if (images.length > 1 && mainImage) {
            const results = [...previews]
            results[index] = mainImage
            setPreviews(results);
        }
        setMainImage(image);
    }

    useEffect(() => {
        if (images && images?.length > 0) {
            setMainImage(images[0]);
        }
        
        if (images && images?.length > 1) {
            setPreviews(images.slice(1));
        }
    }, [images])

    return (
        <div className={styles.container}>
            <Paper className={styles.mainImage}>
                {mainImage ? <img src={mainImage.url} alt="Main" /> : <img src="https://via.placeholder.com/250" alt="Main" />}
            </Paper>
            {previews ? <div className={styles.previews}>
                {previews.map((image, index) => (
                    <Paper className={styles.preview} onClick={() => handleImageClick(image, index)}>
                        <img src={image.url} alt="Preview" />
                    </Paper>
                ))}
            </div> : null}
        </div>
    );
}

export default ProductImages;

