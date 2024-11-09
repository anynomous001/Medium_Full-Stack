import { Link } from 'react-router-dom'
import Avatar from './Avatar'

export interface BlogcardProps {
    authorName: string,
    title: string,
    content: string,
    publishedDate: string,
    id: string
}


const Blogcards = ({ authorName, title, content, publishedDate, id }: BlogcardProps) => {
    return (
        <Link to={`/blog/${id}`} className='  flex flex-col w-full md:w-3/4 gap-2 text-wrap py-6 hover:bg-slate-600/10 rounded-sm px-3'>
            <div className='flex flex-col  gap-2 '>
                <div className='flex items-center gap-6 '>
                    <Avatar name={authorName} size='small' />
                    <span className='font-bold text-center text-gray-400 flex items-center gap-2'>{authorName} <span>{'.'}</span> {publishedDate}</span>
                </div>
                <div className='font-bold text-3xl'>{title}</div>
                <div className='font-medium mt-3 text-xl text-slate-500'>{`${content.slice(0, 200)} ...`}</div>
                <div className='my-4'>{`Reading ${Math.ceil(content.length / 1000)} minutes`}</div>
                <hr />

            </div>
        </Link>
    )
}


export default Blogcards


