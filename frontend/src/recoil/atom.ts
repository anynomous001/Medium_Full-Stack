import { atom } from "recoil";


export interface LikeState {
    likes: number;
    isLiked: boolean;
}

export const likeState = atom<LikeState>({
    key: 'likeState',
    default: {
        likes: 0,
        isLiked: false,
    },
})