
import Blogcards from '../components/Blogcards'
import Appbar from '../components/Appbar'
import { useBlogs } from '../hooks'
import BlogSkeleton from '../components/BlogSkeleton'

const Blogs = () => {
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
        <div  >
            <Appbar />
            <div className='bg-[#f8f9fa] pt-8' >

                <div className='flex flex-col items-center gap-6'>
                    {
                        blogs.map(blog => <Blogcards
                            key={blog.id}
                            id={blog.id}
                            authorName={blog.author.name || "Anonymous"}
                            title={blog.title}
                            content={blog.content}
                            publishedDate={blog.date ? blog.date : "No Date"}
                        />)
                    }
                </div>
            </div>
        </div>

    )
}

export default Blogs