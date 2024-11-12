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
interface SaveState {
    hasSaved: boolean
}

export const saveState = atom<SaveState>({
    key: 'saveState',
    default: {
        hasSaved: false
    }
})


type UserPosts = {
    id: string,
    title: string,
    date: string,
    content: string,
    published: boolean,
    authorId: string
    author: {
        name: string
    }
}
type UserOwnPostsType = {
    id: string,
    title: string,
    date: string,
    content: string,
    published: boolean,
    authorId: string
    author: {
        name: string
    }
}
export interface UserOwnPosts {
    posts: UserOwnPostsType[];
}

export const userOwnPostInfo = atom<UserOwnPosts>({
    key: 'userOwnPostInfo',
    default: {
        posts: []
    }

})



export interface UserDetails {
    id: string;
    email: string;
    password: string;
    name: string;
    about: string;
    posts: UserPosts[];
    likedPost: UserPosts[];
    SavedPost: {
        post: UserPosts;
    }[];
}

export const userInfo = atom<UserDetails>({
    key: 'userInfo',
    default: {
        id: '',
        email: '',
        password: '',
        name: '',
        about: '',
        posts: [],
        likedPost: [],
        SavedPost: []
    }
})


export interface CommentState {
    content: string;
    commenter: string;
}

export const commentState = atom<CommentState[]>({
    key: 'commentState',
    default: []
})


export interface CommentMessage {
    message: string;
}
export const commentMessageState = atom<CommentMessage>({
    key: 'commentMessageState',
    default: {
        message: ''
    }
});