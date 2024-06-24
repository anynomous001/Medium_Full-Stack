import React, { ChangeEvent } from 'react'
import Appbar from '../components/Appbar'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { useNavigate } from 'react-router-dom'

const PublishBlog = () => {
    const [title, setTitle] = React.useState('')
    const [content, setContent] = React.useState('')
    const navigate = useNavigate()

    return (
        <div >
            <Appbar />
            <div className='flex flex-col items-center'>
                <div className=' w-3/4'>
                    <input type="search" onChange={(e) => setTitle(e.target.value)} id="default-search" className="block w-full p-4 ps-10  text-lg font-semibold text-slate-400 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-gray-200" placeholder="Title" required />
                    <TextArea onChange={(e) => setContent(e.target.value)} />
                    <button
                        onClick={async () => {
                            const response = await axios.post(`${BACKEND_URL}/api/h1/blog`, {
                                title,
                                content
                            }, {
                                headers: {
                                    Authorization: localStorage.getItem('token')
                                }
                            })

                            console.log(response.data.post.id)
                            navigate(`/blog/${response.data.post.id}`)
                        }
                        }
                        className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                        Publish post
                    </button>
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