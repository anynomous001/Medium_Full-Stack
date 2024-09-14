import { Blog } from "@/hooks";
import { atom } from "recoil";




export const blogState = atom<Blog | null>({
    key: 'blogState',
    default: null
})

interface LikeState {
    hasLiked: boolean,
    likeCount: number
}

export const likeState = atom<LikeState>({
    key: 'likeState',
    default: {
        hasLiked: false,
        likeCount: 0
    }
})