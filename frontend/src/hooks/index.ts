import axios from "axios"
import React from "react"
import { BACKEND_URL } from "../config"

export interface Blog {
    id: string,
    title: string,
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
