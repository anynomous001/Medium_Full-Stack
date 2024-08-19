
import Blogcards from '../components/Blogcards'
import Appbar from '../components/Appbar'
import { useBlogs, useDate } from '../hooks'
import BlogSkeleton from '../components/BlogSkeleton'

const Blogs = () => {
    const { date } = useDate()
    const { blogs, loading } = useBlogs()

    if (loading) {
        return <div>

            <Appbar />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
        </div>
    }



    return (
        <div>
            <Appbar />
            <div className='flex flex-col items-center gap-12'>
                {
                    blogs.map(blog => <Blogcards
                        key={blog.id}
                        id={blog.id}
                        authorName={blog.author.name || "Anonymous"}
                        title={blog.title}
                        content={blog.content}
                        publishedDate={blog.date === null ? date : ''}
                    />)
                }
            </div>
        </div>

    )
}

export default Blogs