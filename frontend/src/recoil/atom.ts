import { atom } from "recoil";


export interface LikeState {
    likes: number;
    isLiked: boolean;
}

export const likesState = atom<LikeState>({
    key: 'likesState',
    default: {
        likes: 0,
        isLiked: false,
    },
})