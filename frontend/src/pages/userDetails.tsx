import Appbar from "@/components/Appbar"
import AvatarSkeleton from "@/components/AvatarSkeleton"
import Blogcards from "@/components/Blogcards"
import BlogSkeleton from "@/components/BlogSkeleton"
import { Frown } from 'lucide-react';
import { useUserDetails } from "@/hooks"


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DialogDemo } from "@/components/DialogBox"




const UserDetails = () => {

    const { loading, userDetails } = useUserDetails()


    return (
        <div className="">
            <Appbar />
            <div className="bg-[#f8f9fa] min-h-screen h-auto pt-10 flex flex-col items-center ">
                <div className="  flex  items-center flex-col md:flex-row gap-8 md:gap-20 w-3/4 mb-20 pt-1 md:pt-8  md:h-80 mx-auto text-none text-center ">
                    {loading ? <AvatarSkeleton size='large' /> :
                        <div className={`relative  items-center justify-center flex-shrink-0 inline-flex  w-24 h-24 text-xl md:w-48 md:h-48 md:text-3xl
     overflow-hidden bg-slate-700 rounded-full dark:bg-gray-600`}>

                            <span className=" text-white text-4xl md:text-5xl   font-bold md:text-gray-300">{userDetails?.name[0]?.toUpperCase()}</span>

                        </div>
                    }
                    <div className="space-y-6">

                        <h1 className="text-4xl md:text-5xl text-slate-600/95 font-bold">{userDetails?.name || 'User'} </h1>
                        <div className="max-w-full text-xl font-bold">
                            <div>
                                <p><span className="text-slate-600">Email</span>  : {userDetails?.email} </p>
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
                <Tabs defaultValue="account" className="mx-12 bg-[#f8f9fa] w-3/4">
                    <TabsList className="gap-6 mb-[2px]">
                        <TabsTrigger className="text-black font-bold text-2xl" value="account">Home</TabsTrigger>
                        <TabsTrigger className="text-black font-semibold text-2xl " value="password">About</TabsTrigger>
                    </TabsList>
                    <hr />
                    <TabsContent value="account">
                        <div>
                            <p className="text-2xl md:text-4xl mt-4 text-slate-500 font-bold">Your Library</p>
                        </div>
                        <div className="w-full flex flex-col items-center  space-y-10 py-10 ">
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
                                        key={blog.post.id}
                                        id={blog.post.id}
                                        authorName={userDetails.name || "Anonymous"}
                                        title={blog.post.title}
                                        content={blog.post.content}
                                        publishedDate={blog.post.date ? blog.post.date : "No Date"}
                                    />)
                            }
                        </div>


                    </TabsContent>
                    <TabsContent className='text-2xl md:text-4xl mt-4 text-slate-500 font-bold' value="password">{userDetails.about === '' ? <p className="text-2xl text-slate-500/40 block font-bold mr-4">
                        Update your about details by clicking edit profile.
                    </p> : userDetails.about}</TabsContent>
                </Tabs>

            </div>
        </div>

    )
}

export default UserDetails 