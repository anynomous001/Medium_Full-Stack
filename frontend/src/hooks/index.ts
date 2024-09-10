import axios from "axios"
import React from "react"
import { BACKEND_URL } from "../config"
import { useRecoilState, useRecoilValue } from "recoil"
import { LikeState, likesState } from "@/recoil/atom"

export interface Blog {
    id: string,
    title: string,
    date: string,
    content: string,
    author: {
        name: string
    }
}

export const useBlogs = () => {

    const [loading, setLoading] = React.useState(true);
    const [blogs, setBlogs] = React.useState<Blog[]>([]);

    React.useEffect(() => {
        axios.get(`${BACKEND_URL}/api/h1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then(response => {
            setBlogs(response.data);
            setLoading(false);
        })
    }, [])

    return {
        loading,
        blogs
    }
}


export const useSetLikes = ({ id }: { id: string }) => {

    const { likes, isLiked } = useRecoilValue(likesState);


    React.useEffect(() => {
        const response = axios.put(`${BACKEND_URL}/api/h1/blog/${id}/likes`, {
            likes,
            isLiked
        }, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })

        console.log(response)

    }, [])

}

export const useGetLikes = ({ id }: { id: string }) => {

    const [likeState, setLikeState] = useRecoilState<LikeState>(likesState);


    React.useEffect(() => {
        axios.get(`${BACKEND_URL}/api/h1/blog/${id}/likes`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then(response => {
            setLikeState(response.data.postLikes)
        })

    }, [])

    return {
        likeState
    }
}
export const useBlog = ({ id }: { id: string }) => {

    const [loading, setLoading] = React.useState(true);
    const [blog, setBlog] = React.useState<Blog>();

    React.useEffect(() => {
        axios.get(`${BACKEND_URL}/api/h1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then(response => {
            setBlog(response.data.post);
            setLoading(false);
        })
    }, [])

    return {
        loading,
        blog
    }
}


export interface UserDetails {
    id: string,
    email: string,
    password: string,
    name: string,
    posts: UserPosts[]
}

type UserPosts = {
    id: string,
    title: string,
    date: string,
    content: string,
    published: boolean,
    authorId: string

}

export const useUserDetails = () => {
    const [loading, setLoading] = React.useState(true);
    const [userDetails, setUserDetails] = React.useState<UserDetails>();

    React.useEffect(() => {
        axios.get(`${BACKEND_URL}/api/h1/user/details`, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }).then(response => {
            console.log('API Response:', response.data);
            setUserDetails(response.data.user); // Ensure you're accessing the correct property
            setLoading(false);
        }).catch(error => {
            console.error('Error fetching user details:', error);
            setLoading(false);
        });
    }, []); // Empty dependency array means this effect only runs once on mount

    return {
        loading,
        userDetails
    }
}





export const useDate = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString('default', { month: 'long' });
    const year = today.getFullYear();

    const daySuffix = (day: any) => {
        if (day > 3 && day < 21) return 'th'; // covers 4th to 20th
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };

    const date = `${day}${daySuffix(day)} ${month} ${year}`
    return { date };
}
