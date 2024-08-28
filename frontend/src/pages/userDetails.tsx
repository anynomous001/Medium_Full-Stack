import Appbar from "@/components/Appbar"
import Avatar from "@/components/Avatar"
import AvatarSkeleton from "@/components/AvatarSkeleton"
import Blogcards from "@/components/Blogcards"
import BlogSkeleton from "@/components/BlogSkeleton"
import { useUserDetails } from "@/hooks"

import { Frown } from 'lucide-react';


const UserDetails = () => {

    const { loading, userDetails } = useUserDetails()

    console.log(loading)
    return (
        <div>
            <Appbar />
            <div className="flex  flex-col items-center space-y-4 mx-auto mt-8 ">
                {loading ? <AvatarSkeleton size='large' /> :
                    <Avatar name={userDetails?.name || 'U'} size='large' />
                }
                <h1 className="text-3xl font-bold">{userDetails?.name || 'User'} </h1>
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
                    <div><p className="text-2xl md:text-4xl text-slate-500 font-bold">Your Posts</p></div>
                    {loading ?
                        <>
                            <BlogSkeleton />
                            <BlogSkeleton />
                            <BlogSkeleton />
                            <BlogSkeleton />
                        </> : userDetails?.posts.length === 0 ?
                            <div className="flex items-center pt-32">
                                <p className="text-2xl text-slate-500/40 block font-bold mr-4">
                                    No Posts to Show !!
                                </p>
                                <span className="block"><Frown className="w-8 h-8 text-slate-500/40  font-bold block" /></span>
                            </div>
                            :
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