import React, { ChangeEvent } from 'react'
import Appbar from '../components/Appbar'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { useNavigate } from 'react-router-dom'
import { useDate } from '../hooks'

import { Button } from "@/components/ui/button"
import { Textarea } from '@/components/ui/textarea'


const PublishBlog = () => {
    const [title, setTitle] = React.useState('')
    const [content, setContent] = React.useState('')
    const navigate = useNavigate()
    const { date } = useDate()

    return (
        <div >
            <Appbar />
            <div className='flex flex-col items-center'>
                <div className=' w-3/4'>

                    <input type="search" onChange={(e) => setTitle(e.target.value)} id="default-search" className="block w-full p-4 ps-10  text-lg font-semibold   border border-gray-300 rounded-lg bg-gray-50 focus:outline-gray-200" placeholder="Title" required />
                    {/* <TextArea onChange={(e) => setContent(e.target.value)} /> */}
                    <Textarea className='mt-10 bg-gray-50 focus:outline-gray-200 text-lg font-semibold text-slate-400' placeholder='Write your blog here ...' onChange={(e) => setContent(e.target.value)} />
                    <Button className='mt-8'
                        onClick={async () => {
                            const response = await axios.post(`${BACKEND_URL}/api/h1/blog`, {
                                title,
                                content,
                                date
                            }, {
                                headers: {
                                    Authorization: localStorage.getItem('token')
                                }
                            })

                            console.log(response.data.post.id)
                            navigate(`/blog/${response.data.post.id}`)
                        }
                        }

                    >Publish post
                    </Button>

                </div>
            </div>
        </div>
    )
}



function TextArea({ onChange }: { onChange(e: ChangeEvent<HTMLTextAreaElement>): void }) {
    return <div>
        <div className=" my-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="p-1 bg-white rounded-lg">
                <textarea onChange={onChange} rows={18} className="p-4 rounded-lg w-full  text-lg font-semibold text-slate-400 bg-gray-50 border-0  focus:outline-slate-300 " placeholder="Write an article..." required ></textarea>
            </div>
        </div>

    </div>

}
export default PublishBlog