import { faEdit, faThumbsUp, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import StarRatings from 'react-star-ratings';
import api from '../../config/api';
import { useAppSelector } from '../../config/store';
import IReview from '../../shared/models/IReview';
import IVote from '../../shared/models/IVote';
import Button from '../Button/Button';
import Paper from '../Paper/Paper';
import styles from './review.module.scss';

interface IReviewProps {
    review: IReview;
    className?: string;
    onEdit: (review: IReview) => void;
}

const Review = (props: IReviewProps) => {
    const { user } = useAppSelector(state => state.authentication)
    const [vote, setVote] = useState<IVote | null>(null)

    const { review, className, onEdit: handleOnEdit } = props;

    useEffect(() => {
        const getVote = async () => {
            const response = await api.get(`/products/${review.product_id}/reviews/${review.id}/vote`)
            setVote(response.data.data)
        }
        if (user) {
            getVote()
        }
    }, [review])

    const voteReview = async () => {
        const response = await api.post(`/products/${review.product_id}/reviews/${review.id}/vote`, {
            likes: true,
            review_id: review.id
        })
        setVote(response.data.data)
    }

    const unvoteReview = async () => {
        await api.delete(`/products/${review.product_id}/reviews/${review.id}/vote`)
        setVote(null)
    }

    return (
        <Paper className={styles.review + (className ? " " + className : "")}>
            <div className={styles.header}>
                <div className={styles.avatar}>
                    <img src={review.user?.avatar || "https://picsum.photos/50"} alt="avatar" />
                </div>
                <div className={styles.info}>
                    <div className={styles.userName}>{review.user?.firstname + " " + review.user?.lastname}</div>
                    <StarRatings
                        rating={review.stars || 0}
                        starRatedColor="#ffbf00"
                        numberOfStars={5}
                        name='rating'
                        starDimension="20px"
                        starSpacing='1px'
                    />
                </div>
            </div>
            <div className={styles.info}>
                <div className={styles.date}>Recensito il {new Intl.DateTimeFormat('it-IT', { dateStyle: 'long' }).format(new Date(review.created_at))}</div>
            </div>
            <div className={styles.content}>
                <div className={styles.text}>{review.comments}</div>
            </div>
            <div className={styles.footer}>
                <div className={styles.stats}>{review.votes?.likes} persone l'hanno trovato utile</div>

                <div className={styles.actions}>
                    {review.user_id === user?.id ? <Button size="small" leftIcon={<FontAwesomeIcon icon={faEdit} />} text="Modifica" className={styles.action} onClick={() => handleOnEdit(review)} /> : null}
                    {user ?
                        (
                            vote?.likes ?
                                (
                                    <Button size="small" leftIcon={<FontAwesomeIcon icon={faXmark} />} text="Annulla voto" className={styles.action} onClick={unvoteReview} />
                                ) :
                                (
                                    <Button size="small" leftIcon={<FontAwesomeIcon icon={faThumbsUp} />} text="Utile" className={styles.action} onClick={voteReview} />
                                )
                        )
                        : null}
                </div>
            </div>
        </Paper>
    );
}

export default Review;