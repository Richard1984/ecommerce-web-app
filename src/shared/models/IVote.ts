interface IVote {
  id: number | null;
  likes: boolean;
  review_id: number | null;
  user_id: number | null;
  created_at: string;
  updated_at: string;
}

export const voteDefaultValue: IVote = {
  id: null,
  likes: true,
  review_id: null,
  user_id: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export default IVote;
