import { faAdd, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import Button from '../../components/Button/Button';
import Container from '../../components/Container/Container';
import Divider from '../../components/Divider/Divider';
import Review from '../../components/Review/Review';
import ReviewStats from '../../components/ReviewStats/ReviewStats';
import api from '../../config/api';
import { useAppSelector } from '../../config/store';
import IProduct from '../../shared/models/IProduct';
import IReview from '../../shared/models/IReview';
import EditReview from './components/EditReview';
import Lists from './components/Lists/Lists';
import ProductImages from './components/ProductImages/ProductImages';
import styles from './product-detail.module.scss';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAppSelector(state => state.authentication);
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

    const handleAddTocard = async () => {
        if (!user) {
            return navigate('/login');
        }
        await api.put("/account/cart", {
            op: "create",
            product_id: product?.id,
            quantity: 1
        });
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
                        {/* <img src={product?.images[0]} alt="product" /> */}
                        <ProductImages images={product?.images} />
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
                            <Button className={styles.action} leftIcon={<FontAwesomeIcon icon={faShoppingCart} />} text="Aggiungi al carrello" onClick={handleAddTocard} />
                            {isAuthenticated ? <Lists product={product} /> : null }
                        </div>
                    </div>
                </section>
                <Divider color="#cacaca" className={styles.divider} />
                <section className={styles.reviewsSection}>
                    <div className={styles.header}>
                        <div className={styles.title}>Recensioni</div>
                        {user ? <Button text="Scrivi una recensione" leftIcon={<FontAwesomeIcon icon={faAdd} />} onClick={() => handleOpenEditReviewDialog(null)} /> : null}
                    </div>
                    {product?.reviews_by_stars ? <div className={styles.reviewStats}><ReviewStats stats={product?.reviews_by_stars} /></div> : null}
                    <div className={styles.reviews}>
                        {reviews.length ? (
                            reviews.map(review => (<Review review={review} className={styles.review} key={review.id} onEdit={handleOpenEditReviewDialog} onVote={getReviews} />))
                        ) : (<div className={styles.noReviews}>Nessuna recensione</div>)}
                    </div>
                </section>
            </Container>
            <EditReview open={editReviewDialog} review={reviewToEdit} product={product} onClose={handleCloseEditReviewDialog} onEdit={getReviews} />
        </>
    );
}

export default ProductDetail;

