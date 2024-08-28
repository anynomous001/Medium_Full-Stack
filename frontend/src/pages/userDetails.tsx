import Appbar from "@/components/Appbar"
import Avatar from "@/components/Avatar"
import AvatarSkeleton from "@/components/AvatarSkeleton"
import Blogcards from "@/components/Blogcards"
import BlogSkeleton from "@/components/BlogSkeleton"
import { useUserDetails } from "@/hooks"


const UserDetails = () => {

    const { loading, userDetails } = useUserDetails()

    console.log(loading)
    return (
        <div>
            <Appbar />
            <div className="flex  flex-col items-center space-y-4 mx-auto mt-8 ">
                {loading ? <AvatarSkeleton size='large' /> :
                    <Avatar name={userDetails?.name} size='large' />
                }
                <h1 className="text-3xl font-bold">{userDetails?.name} </h1>
                <div className="max-w-full ">
                    <div>
                        <p>Email : {userDetails?.email} </p>
                        <p>{loading}</p>
                    </div>
                    <div>
                        <p>Password : {userDetails?.password} </p>
                    </div>
                </div>
                <div className="w-full flex flex-col items-center space-y-12 mx-auto py-20 ">
                    <div><p className="text-2xl text-slate-500/40 font-bold">Your Posts</p></div>
                    {loading ?
                        <>
                            <BlogSkeleton />
                            <BlogSkeleton />
                            <BlogSkeleton />
                            <BlogSkeleton />
                        </> :
                        userDetails?.posts.map(blog => <Blogcards
                            key={blog.id}
                            id={blog.id}
                            authorName={userDetails.name || "Anonymous"}
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

export default UserDetails