import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import Button from '../../components/Button/Button';
import Divider from '../../components/Divider/Divider';
import Review from '../../components/Review/Review';
import api from '../../config/api';
import IProduct from '../../shared/models/IProduct';
import IReview from '../../shared/models/IReview';
import styles from './product-detail.module.scss';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<IProduct | null>(null);
    const [reviews, setReviews] = useState<IReview[]>([]);

    useEffect(() => {
        const getProduct = async () => {
            const response = await api.get<{ data: IProduct }>(`/products/${id}`);
            setProduct(response.data.data);
        }
        const getReviews = async () => {
            const response = await api.get<{ data: IReview[] }>(`/products/${id}/reviews`);
            console.log(response.data.data)
            setReviews(response.data.data);
        }
        getProduct();
        getReviews()
        }, [id])
    
    return (
        <div className={styles.content}>
            <section className={styles.productSection}>
                <div className={styles.images}>
                    <img src="https://picsum.photos/150" alt="product" />
                </div>
                <div className={styles.info}>
                    <div className={styles.productName}>{product?.name}</div>
                    <div className={styles.productRating}>
                        <StarRatings
                            rating={product?.avg_reviews}
                            starRatedColor="#ffbf00"
                            numberOfStars={5}
                            name='rating'
                            starDimension="20px"
                            starSpacing='1px'
                        />
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
                <div className={styles.sectionTitle}>Recensioni</div>
                <div className={styles.reviews}>
                    {reviews.map(review => (<Review review={review} className={styles.review} key={review.id} />))}
                </div>
            </section>
        </div>
    );
}

export default ProductDetail;

