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