import { Link } from 'react-router-dom'
import Avatar from './Avatar'
import { CircleEllipsis } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import axios from 'axios';
import { BACKEND_URL } from '@/config';
import { useSetRecoilState } from 'recoil';
import { userOwnPostInfo } from '@/recoil/atom';


export interface BlogcardProps {
    authorName: string,
    title: string,
    content: string,
    publishedDate: string,
    id: string,
    isAuthor: boolean
}


const Blogcards = ({ authorName, title, content, publishedDate, id, isAuthor }: BlogcardProps) => {

    const setUserOwnPosts = useSetRecoilState(userOwnPostInfo)

    const handleDelete = async (id: string) => {
        console.log(id)
        try {
            const response = await axios.delete(`${BACKEND_URL}/api/h1/blog/${id}`, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })

            setUserOwnPosts(response.data)
            console.log(response.data.posts)
        } catch (error: any) {
            console.log(error.message)
        }
    }



    return (
        <div className='  flex flex-col w-full md:w-3/4 gap-2 text-wrap py-2 md:py-6 hover:bg-slate-600/10 rounded-sm px-3'>
            <div className='flex flex-col  gap-2 '>
                <div className='flex items-center justify-between gap-3 md:gap-6 '>
                    <div
                        className={`relative   items-center justify-center flex-shrink-0 inline-flex w-8 h-8  md:w-12 md:h-12 
     overflow-hidden bg-slate-700 rounded-full dark:bg-gray-600`}>
                        <span className=" text-gray-100    font-bold :text-gray-300">{authorName[0]?.toUpperCase()}</span>

                    </div>
                    <span className='font-bold text-center text-gray-400 flex items-center text-xs gap-1 md:gap-2'>
                        {authorName} <span>{'.'}</span> {publishedDate}
                        {isAuthor && <span className='hover:cursor-pointer ' >
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <CircleEllipsis />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className='w-56' >

                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            Update
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />

                                        <DropdownMenuItem onClick={() => handleDelete(id)}>
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>

                        </span>}
                    </span>
                </div>
                <Link to={`/blog/${id}`}>
                    <div className='font-bold text-lg md:text-3xl'>{title}</div>
                    <div className='font-medium mt-1 md:mt-3 text-sm md:text-xl text-wrap max-w-[90%] text-slate-500 break-words'>{`${content.slice(0, 100)} ...`}</div>
                    <div className=' my-2 md:my-4 text-xs'>{`Reading ${Math.ceil(content.length / 1000)} minutes`}</div>
                </Link>
                <hr />

            </div>
        </div>
    )
}


export default Blogcards


