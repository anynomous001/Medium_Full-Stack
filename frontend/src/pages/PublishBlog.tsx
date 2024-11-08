import React from 'react'
import Appbar from '../components/Appbar'
import axios, { AxiosError } from 'axios'
import { BACKEND_URL } from '../config'
import { useNavigate } from 'react-router-dom'
import { useDate } from '../hooks'

import { Button } from "@/components/ui/button"
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form'
import { createBlogInput, createBlogType } from '@pritamchak/common-package'
import { zodResolver } from '@hookform/resolvers/zod'

// import MDEditor from '@uiw/react-md-editor';



const PublishBlog = () => {
    const [title, setTitle] = React.useState('')
    const [content, setContent] = React.useState('')
    const navigate = useNavigate()
    const { date } = useDate()

    const { register, setError, handleSubmit, formState: { errors, isSubmitting } } = useForm<createBlogType>({
        resolver: zodResolver(createBlogInput)
    })


    const onSubmit = async (data: createBlogType) => {

        const dataWithDate = { ...data, date }
        try {

            const response = await axios.post(`${BACKEND_URL}/api/h1/blog`, dataWithDate, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })

            console.log(response.data.post.id)
            navigate(`/blog/${response.data.post.id}`)
        } catch (error) {
            const axiosError = error as AxiosError
            const errorResponse: any = axiosError.response?.data
            if (errorResponse.errors) {
                const errorMessages = errorResponse.errors;

                if (errorMessages.title) {
                    setError("title", {
                        type: "server",
                        message: errorMessages.title,
                    });
                }
                if (errorMessages.content) {
                    setError("content", {
                        type: "server",
                        message: errorMessages.content,
                    });
                }

            }
            console.log(axiosError)
        }

    }


    return (
        <div >
            <Appbar />
            <div className='flex flex-col items-center'>

                <form className='space-y-8 w-3/4 ' onSubmit={handleSubmit(onSubmit)} >
                    <div>

                        <input
                            type="search"
                            id="default-search"
                            className="block w-full p-4 ps-10  text-lg font-semibold border border-gray-300 rounded-lg bg-gray-50 focus:outline-gray-200"
                            placeholder="Title"
                            {...register('title')}
                        />
                        {errors.title && <p className='text-red-500'>{errors.title.message}</p>}

                    </div>
                    <div>
                        <Textarea
                            className='mt-10 bg-gray-50 focus:outline-gray-200 text-lg font-semibold text-slate-400' placeholder='Write your blog here ...'
                            {...register('content')}
                        />
                        {errors.content && <p className='text-red-500'>{errors.content.message}</p>}
                    </div>


                    {/*
                         <TextArea onChange={(e) => setContent(e.target.value)} /> 
                        <MDEditor
                        value={content}
                        onChange={(value) => setContent(value as string)}
                        height={300}
                        preview='edit'
                        /> 
                         <MDEditor.Markdown source={content} style={{ whiteSpace: 'pre-wrap' }} />
                          */}

                    <Button
                        className='border border-blue-200 text-lg mt-6 text-bold rounded-lg focus:border focus:border-slate-200  bg-slate-800 text-white  p-2.5'
                        disabled={isSubmitting}
                        type='submit'
                        variant={'ghost'}
                    >{isSubmitting ? 'Publishing...' : 'Publish'}
                    </Button>



                </form>


            </div>
        </div>
    )
}




export default PublishBlog