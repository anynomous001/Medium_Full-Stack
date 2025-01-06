import Appbar from '../components/Appbar'
import axios, { AxiosError } from 'axios'
import { BACKEND_URL } from '../config'
import { useNavigate } from 'react-router-dom'
import { useDate } from '../hooks'

import { Button } from "@/components/ui/button"
import { useForm } from 'react-hook-form'
import { createBlogInput, createBlogType } from '@pritamchak/common-package'
import { zodResolver } from '@hookform/resolvers/zod'

import MDEditor from '@uiw/react-md-editor';
import React from 'react'



const PublishBlog = () => {

    const navigate = useNavigate()
    const { date } = useDate()

    const [content, setContent] = React.useState('')



    const { register, setError, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<createBlogType>({
        resolver: zodResolver(createBlogInput)
    })

    const handleContentChange = (value: string | undefined) => {
        setContent(value || '');
        setValue('content', value || '', { shouldValidate: true });
    };




    const onSubmit = async (data: createBlogType) => {

        const dataWithDate = { ...data, date, content }
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
            <div className='flex flex-col items-center pt-8 bg-[#f8f9fa] min-h-screen '>

                <form className='space-y-3 md:space-y-8 w-3/4 flex-col justify-end ' onSubmit={handleSubmit(onSubmit)} >
                    <div>

                        <input
                            type="search"
                            id="default-search"
                            className="block w-full py-2 px-1 md:p-4 ps-2 md:ps-4 text:xl  md:text-2xl text-slate-400 font-bold border border-gray-300 rounded-lg bg-gray-50 focus:outline-none"
                            placeholder="Title"
                            {...register('title')}
                        />
                        {errors.title && <p className='text-red-500'>{errors.title.message}</p>}

                    </div>
                    {/* <div>
                        <Textarea
                            className=' mt-4 md:mt-10 bg-gray-50 focus:outline-none text-xl font-bold  text-slate-400'
                            placeholder='Write your blog here ...'
                            {...register('content')}
                        />
                        {errors.content && <p className='text-red-500'>{errors.content.message}</p>}
                    </div> */}


                    <div>

                        {/* <Textarea onChange={(e) => setContent(e.target.value)} /> */}
                        <MDEditor
                            className=' mt-4 md:mt-10 bg-gray-50 focus:outline-none text-2xl font-normal  text-black'
                            onChange={handleContentChange}
                            value={content}
                            height={300}
                            preview='edit'
                        />
                        <MDEditor.Markdown source={content} style={{ whiteSpace: 'pre-wrap' }} />
                    </div>
                    <div className='flex justify-end mt-0'>

                        <Button
                            className='  border border-blue-200 md:py-6 md:px-5 p-4  mt-4 text-bold text-lg md:text-xl rounded-lg focus:border focus:border-slate-200  bg-slate-700 text-white  '
                            disabled={isSubmitting}
                            type='submit'
                            variant={'ghost'}
                        >{isSubmitting ? 'Publishing...' : 'Publish'}
                        </Button>

                    </div>


                </form>


            </div>
        </div>
    )
}




export default PublishBlog
