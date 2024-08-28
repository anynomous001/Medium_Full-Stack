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


export default Blogcards


