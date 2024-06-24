import React from 'react'
import { Link } from 'react-router-dom'

export interface BlogcardProps {
    authorName: string,
    title: string,
    content: string,
    publishedDate: string,
    id: string
}


const Blogcards = ({ authorName, title, content, publishedDate, id }: BlogcardProps) => {
    return (
        <Link to={`/blog/${id}`} className='flex flex-col w-3/4 md:w-1/2 gap-4 '>
            <div className='flex flex-col  gap-4 '>
                <div className='flex items-center gap-6 '>
                    <Avatar name={authorName} size='small' />
                    <span className='font-bold text-center text-gray-400 flex items-center gap-2'>{authorName} <span>{'.'}</span> {publishedDate}</span>
                </div>
                <div className='font-bold text-lg'>{title}</div>
                <div>{`${content.slice(0, 200)} ...`}</div>
                <div>{`Reading ${Math.ceil(content.length / 100)} minutes`}</div>
                <hr />

            </div>
        </Link>
    )
}

export function Avatar({ name, size }: { name: string, size?: 'big' | 'small' }) {
    return <div
        className={`relative inline-flex items-center justify-center ${size === 'small' ? 'w-8 h-8' : 'w-12 h-12'}
     overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
        <span className=" text-gray-500  font-bold dark:text-gray-300">{name[0].toUpperCase()}</span>
    </div>
}

export default Blogcards


