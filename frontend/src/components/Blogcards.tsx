import { Link } from 'react-router-dom'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



export interface BlogcardProps {
    authorName: string,
    title: string,
    content: string,
    publishedDate: string,
    id: string
}


const Blogcards = ({ authorName, title, content, publishedDate, id }: BlogcardProps) => {
    return (
        <Link to={`/blog/${id}`} className=' flex flex-col w-3/4 md:w-1/2 gap-4 text-wrap'>
            <div className='flex flex-col  gap-4 '>
                <div className='flex items-center gap-6 '>
                    <Avatar name={authorName} size='small' />
                    <span className='font-bold text-center text-gray-400 flex items-center gap-2'>{authorName} <span>{'.'}</span> {publishedDate}</span>
                </div>
                <div className='font-bold text-lg'>{title}</div>
                <div>{`${content.slice(0, 200)} ...`}</div>
                <div>{`Reading ${Math.ceil(content.length / 1000)} minutes`}</div>
                <hr />

            </div>
        </Link>
    )
}

function logout() {
    localStorage.removeItem('token'); // Remove JWT from localStorage
    sessionStorage.removeItem('token'); // Remove JWT from sessionStorage
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Invalidate JWT cookie
    window.location.href = '/'; // Redirect to login page
}


export function Avatar({ name, size }: { name: string, size?: 'big' | 'small' | 'large' }) {
    return <div
        className={`relative inline-flex items-center justify-center ${size === 'small' ? 'w-8 h-8' : size === 'big' ? 'w-12 h-12' : 'w-40 h-40 text-3xl'}
     overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
        <DropdownMenu>
            <DropdownMenuTrigger>
                <span className=" text-gdarkray-500  font-bold :text-gray-300">{name[0]?.toUpperCase()}</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to={"/profile"}><DropdownMenuItem>Profile</DropdownMenuItem></Link>
                <DropdownMenuItem onClick={() => logout()}>Log Out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
}

export default Blogcards


