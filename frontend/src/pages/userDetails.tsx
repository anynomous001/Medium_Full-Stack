import Appbar from "@/components/Appbar"
import AvatarSkeleton from "@/components/AvatarSkeleton"
import Blogcards from "@/components/Blogcards"
import BlogSkeleton from "@/components/BlogSkeleton"
import { Frown } from 'lucide-react';
import { useUserDetails, useUserOwnPosts } from "@/hooks"


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DialogDemo } from "@/components/DialogBox"




const UserDetails = () => {

    const { loading, userDetails } = useUserDetails()
    const { loading2, userOwnPosts } = useUserOwnPosts()

    console.log(userDetails)
    console.log(userOwnPosts)

    return (
        <div className="">
            <Appbar />
            <div className="bg-[#f8f9fa] min-h-screen h-auto pt-10 flex flex-col items-center ">
                <div className="  flex  items-center flex-col md:flex-row gap-4 md:gap-20 w-3/4 mb-10 md:mb-20 pt-1 md:pt-8  md:h-80 mx-auto md:text-left text-center ">
                    {loading ? <AvatarSkeleton size='large' /> :
                        <div className={`relative  items-center justify-center flex-shrink-0 inline-flex  w-24 h-24 text-xl md:w-48 md:h-48 md:text-3xl
     overflow-hidden bg-slate-700 rounded-full dark:bg-gray-600`}>

                            <span className=" text-white text-4xl md:text-5xl   font-bold md:text-gray-300">{userDetails?.name[0]?.toUpperCase()}</span>

                        </div>
                    }
                    <div className="space-y-3 md:space-y-6">

                        <h1 className="text-3xl md:text-5xl text-slate-600/95 font-bold">{userDetails?.name || 'User'} </h1>
                        <div className="max-w-full md:text-xl font-bold text-base">
                            <div>
                                <p><span className="text-slate-600 ">Email</span>  : {userDetails?.email} </p>
                                <p>{loading}</p>
                            </div>
                            <div>
                                <p><span className="text-slate-600">Password</span> : {userDetails?.password} </p>
                            </div>

                            <DialogDemo />


                        </div>
                    </div>

                </div>
                <hr />
                <Tabs defaultValue="ownPost" className="mx-12 bg-[#f8f9fa] w-[90%] md:w-3/4">
                    <TabsList className="gap-6 mb-[2px] flex justify-around">
                        <TabsTrigger className="text-black font-bold text-base md:text-2xl" value="ownPost">Home</TabsTrigger>
                        <TabsTrigger className="text-black font-semibold text-base md:text-2xl " value="savedPost">Saved Posts</TabsTrigger>
                        <TabsTrigger className="text-black font-semibold text-base md:text-2xl " value="about">About</TabsTrigger>
                    </TabsList>
                    <hr />
                    <TabsContent value="ownPost">
                        <div>
                            <p className="text-2xl md:text-4xl mt-4 text-slate-500 font-bold">Your Posts</p>
                        </div>
                        <div className='flex  flex-col w-[90%] md:w-3/4 items-center gap-1  md:gap-6'>
                            {loading2 ?
                                <div className="md:w-full w-full md:ml-40">
                                    <BlogSkeleton />
                                    <BlogSkeleton />
                                    <BlogSkeleton />
                                    <BlogSkeleton />
                                </div>
                                : userOwnPosts?.posts.length === 0 ?
                                    <div className="flex min-w-full items-center pt-32">
                                        <p className="text-2xl text-slate-500/40 block font-bold mr-4">
                                            No Posts to Show !!
                                        </p>
                                        <span className="block"><Frown className="w-8 h-8 text-slate-500/40  font-bold block" /></span>
                                    </div>
                                    :
                                    userOwnPosts.posts.map(blog => <Blogcards
                                        key={blog.id}
                                        id={blog.id}
                                        authorName={userDetails.name || "Anonymous"}
                                        title={blog.title}
                                        content={blog.content}
                                        publishedDate={blog.date ? blog.date : "No Date"}
                                        isAuthor={true}
                                    />)
                            }
                        </div>


                    </TabsContent>
                    <TabsContent className='text-2xl md:text-4xl mt-4 text-slate-500 font-bold' value="about">{userDetails.about === '' ? <p className="text-2xl text-slate-500/40 block font-bold mr-4">
                        Update your about details by clicking edit profile.
                    </p> : userDetails.about}</TabsContent>

                    <TabsContent className='' value="savedPost">

                        <div className="w-full flex flex-col items-center space-y-1 md:space-y-10 py-4 md:py-10 ">
                            {loading ?
                                <div className="md:w-full w-full md:ml-40">
                                    <BlogSkeleton />
                                    <BlogSkeleton />
                                    <BlogSkeleton />
                                    <BlogSkeleton />
                                </div> : userDetails?.SavedPost.length === 0 ?
                                    <div className="flex min-w-full items-center pt-32">
                                        <p className="text-2xl text-slate-500/40 block font-bold mr-4">
                                            No Posts to Show !!
                                        </p>
                                        <span className="block"><Frown className="w-8 h-8 text-slate-500/40  font-bold block" /></span>
                                    </div>
                                    :
                                    userDetails?.SavedPost.map(blog => <Blogcards
                                        isAuthor={false}
                                        key={blog.post.id}
                                        id={blog.post.id}
                                        authorName={blog.post.author.name || "Anonymous"}
                                        title={blog.post.title}
                                        content={blog.post.content}
                                        publishedDate={blog.post.date ? blog.post.date : "No Date"}
                                    />)

                            }
                        </div>
                    </TabsContent>

                </Tabs>

            </div>
        </div>

    )
}

export default UserDetails 