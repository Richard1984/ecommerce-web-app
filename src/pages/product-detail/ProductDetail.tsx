import { faAdd, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import Button from '../../components/Button/Button';
import Container from '../../components/Container/Container';
import Divider from '../../components/Divider/Divider';
import Review from '../../components/Review/Review';
import api from '../../config/api';
import IProduct from '../../shared/models/IProduct';
import IReview from '../../shared/models/IReview';
import EditReview from './component/EditReview';
import styles from './product-detail.module.scss';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<IProduct | null>(null);
    const [reviews, setReviews] = useState<IReview[]>([]);
    const [reviewToEdit, setReviewToEdit] = useState<IReview | null>(null);
    const [editReviewDialog, setEditReviewDialog] = useState<boolean>(false);

    const handleOpenEditReviewDialog = (review: IReview | null) => {
        setReviewToEdit(review);
        setEditReviewDialog(true);
    }

    const handleCloseEditReviewDialog = () => {
        setEditReviewDialog(false);
        setReviewToEdit(null);
    }


    const getReviews = async () => {
        const response = await api.get<{ data: IReview[] }>(`/products/${id}/reviews`);
        setReviews(response.data.data);
    }

    useEffect(() => {
        const getProduct = async () => {
            const response = await api.get<{ data: IProduct }>(`/products/${id}`);
            setProduct(response.data.data);
        }
        getProduct();
        getReviews()
    }, [id])

    return (
        <>
            <Container size='large' className={styles.content}>
                <section className={styles.productSection}>
                    <div className={styles.images}>
                        <img src="https://picsum.photos/150" alt="product" />
                    </div>
                    <div className={styles.info}>
                        <div className={styles.productName}>{product?.name}</div>
                        {/* <Chip className={styles.chip} label={product?.category_name || ""} leftIcon={<FontAwesomeIcon icon={faTag} />} /> */}
                        <div className={styles.productRating}>
                            {product?.avg_reviews ? <StarRatings
                                rating={product?.avg_reviews}
                                starRatedColor="#ffbf00"
                                numberOfStars={5}
                                name='rating'
                                starDimension="20px"
                                starSpacing='1px'
                            /> : null}
                        </div>
                        <div className={styles.productDescription}>
                            <div className={styles.text}>{product?.description}</div>
                        </div>
                    </div>
                    <div className={styles.sidebar}>
                        <div className={styles.availability}>{product?.availability + " ancora disponibili"}</div>
                        <div className={styles.actions}>
                            <Button leftIcon={<FontAwesomeIcon icon={faShoppingCart} />} text="Aggiungi al carrello" />
                        </div>
                    </div>
                </section>
                <Divider color="#cacaca" className={styles.divider} />
                <section className={styles.reviewsSection}>
                    <div className={styles.header}>
                        <div className={styles.title}>Recensioni</div>
                        <Button text="Scrivi una recensione" leftIcon={<FontAwesomeIcon icon={faAdd}/>}  onClick={() => handleOpenEditReviewDialog(null)} />
                    </div>
                    <div className={styles.reviews}>
                        {reviews.map(review => (<Review review={review} className={styles.review} key={review.id} onEdit={handleOpenEditReviewDialog} />))}
                    </div>
                </section>
            </Container>
            <EditReview open={editReviewDialog} review={reviewToEdit} product={product} onClose={handleCloseEditReviewDialog} onEdit={getReviews} />
        </>
    );
}

export default ProductDetail;

