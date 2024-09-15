import Appbar from "@/components/Appbar"
import Avatar from "@/components/Avatar"
import AvatarSkeleton from "@/components/AvatarSkeleton"
import Blogcards from "@/components/Blogcards"
import BlogSkeleton from "@/components/BlogSkeleton"
import { Frown } from 'lucide-react';
import { useUserDetails } from "@/hooks"


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"



const UserDetails = () => {

    const { loading, userDetails } = useUserDetails()

    function DialogDemo() {
        return (
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Edit Profile</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                defaultValue="Pedro Duarte"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Username
                            </Label>
                            <Input
                                id="username"
                                defaultValue="@peduarte"
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )
    }






    return (
        <div>
            <Appbar />
            <div className="flex  flex-col items-center space-y-4 mx-auto mt-8 pb-32">
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

                    <DialogDemo />


                </div>
                {/* <div className="w-full flex flex-col items-center space-y-12 mx-auto py-20 ">
                    <div><p className="text-2xl md:text-4xl text-slate-500 font-bold">Your Posts</p></div>
                    {loading ?
                        <div className="md:w-full md:ml-40">
                            <BlogSkeleton />
                            <BlogSkeleton />
                            <BlogSkeleton />
                            <BlogSkeleton />
                        </div> : userDetails?.posts.length === 0 ?
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
*/}
            </div>
            <hr />
            <Tabs defaultValue="account" className="mx-12 bg-white">
                <TabsList className="gap-8 mb-[1px]">
                    <TabsTrigger className="text-black font-semibold text-2xl " value="account">Home</TabsTrigger>
                    <TabsTrigger className="text-black font-semibold text-2xl" value="password">About</TabsTrigger>
                </TabsList>
                <hr />
                <TabsContent value="account">Your Library</TabsContent>
                <TabsContent value="password">About You Goes Here.</TabsContent>
            </Tabs>

        </div>
    )
}

export default UserDetails