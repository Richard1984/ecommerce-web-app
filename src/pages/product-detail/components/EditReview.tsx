import { faSave, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import StarRatings from 'react-star-ratings';
import Button from "../../../components/Button/Button";
import Dialog, { DialogActions, DialogContent, DialogHeader } from "../../../components/Dialog/Dialog";
import Textarea from "../../../components/Textarea/Textarea";
import api from "../../../config/api";
import { useAppSelector } from "../../../config/store";
import IProduct from "../../../shared/models/IProduct";
import IReview, { reviewDefaultValue } from "../../../shared/models/IReview";

interface IEditReviewProps {
    review: IReview | null;
    product?: IProduct | null;
    open: boolean;
    onClose: () => void;
    onEdit: (review: IReview) => void;
}

const EditReview = (props: IEditReviewProps) => {
    const [form, setForm] = useState<IReview>(props.review || reviewDefaultValue);
    const { user } = useAppSelector(state => state.authentication)

    const isNew = !props.review?.id;

    const { review, open, onClose, product, onEdit: handleOnEdit } = props;

    const handleSubmit = async () => {
        if (isNew) {
            const response = await api.post <{ data: IReview }>("/products/" + product?.id + "/reviews", {
                stars: form.stars,
                comments: form.comments,
                user_id: user?.id
            });
            handleOnEdit(response.data.data);
        } else {
            const response = await api.put("/products/" + product?.id + "/reviews/" + review?.id, form);
            handleOnEdit(response.data.data);
        }
        handleOnClose();
    }

    useEffect(() => {
        if (review) {
            setForm(review)
        }
    }, [review])

    const handleOnClose = () => {
        onClose()
        setForm(reviewDefaultValue)
    }

    return (
        <Dialog open={open} width="600px" onClose={handleOnClose}>
            <DialogHeader title={isNew ? "Scrivi una recensione" : "Modifica recensione"} />
            {/* <Divider color="#cacaca"/> */}
            <DialogContent>
                <div className="rating" style={{ marginBottom: "10px "}}>
                    <p style={{margin: "0px", marginRight: "10px", fontSize: "14px", fontWeight: "bold", marginBottom: "5px" }}>Valutazione* </p>
                    <StarRatings
                        rating={form?.stars || 0}
                        changeRating={(stars: number) => setForm({ ...form, stars })}
                        starRatedColor="#ffbf00"
                        numberOfStars={5}
                        name='rating'
                        starDimension="20px"
                        starSpacing='1px'
                    />
                </div>
                <Textarea
                    label='Il tuo commento'
                    placeholder='Il tuo commento'
                    name="comment"
                    fullWidth
                    value={form.comments}
                    rows={3}
                    required={true}
                    onChange={(event, value) => setForm({...form, comments: value})} />
            </DialogContent>
            <DialogActions>
                <Button size="small" leftIcon={<FontAwesomeIcon icon={faSave}/>} text="Salva" onClick={handleSubmit} />
                <Button size="small" leftIcon={<FontAwesomeIcon icon={faXmark}/>} text="Annulla" onClick={handleOnClose}/>
            </DialogActions>
        </Dialog>
    )

}

export default EditReview