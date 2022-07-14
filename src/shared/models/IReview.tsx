import IUser from "./IUser";

interface IReview {
    id: number | null;
    stars: number | null;
    comments: string;
    product_id: number | null;
    user_id: number | null;
    created_at: string;
    updated_at: string;
    user?: IUser | null;
    votes?: { likes: number, dislikes: number } | null;
}

export const reviewDefaultValue: IReview = {
    id: null,
    stars: null,
    comments: "",
    product_id: null,
    user_id: null,
    created_at: (new Date()).toISOString(),
    updated_at: (new Date()).toISOString()
};

export default IReview;
