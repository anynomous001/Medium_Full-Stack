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
import { BACKEND_URL } from "@/config"
import { userInfo } from "@/recoil/atom"
import { DialogClose } from "@radix-ui/react-dialog"
import axios from "axios"
import { useRecoilState } from "recoil"


export function DialogDemo() {

    const [userDetails, setUserDetails] = useRecoilState(userInfo)

    const handleUpdateUserDetails = async () => {
        console.log(userDetails)


        try {
            const response = await axios.put(`${BACKEND_URL}/api/h1/user/details`, {
                name: userDetails.name,
                password: userDetails.password,
                email: userDetails.email,
                about: userDetails.about || ''
            }, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            console.log(response, userDetails)
        } catch (error) {
            console.log({ message: error })
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="mt-4 bg-white font-bold text-sm p-2 md:text-lg" variant="outline">Edit Profile</Button>
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
                            type="string"
                            defaultValue={userDetails?.name || ''}
                            className="col-span-3"
                            onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Password
                        </Label>
                        <Input
                            id="password"
                            type="string"
                            defaultValue={userDetails?.password || ''}
                            className="col-span-3"
                            onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}

                        />
                    </div>
                    {/* <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="string"

                            defaultValue={userDetails?.email || ''}
                            className="col-span-3"
                            onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}

                        />
                    </div> */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            About
                        </Label>
                        <Input
                            id="about"
                            type="string"

                            defaultValue={userDetails?.about || ''}
                            className="col-span-3"
                            onChange={(e) => setUserDetails({ ...userDetails, about: e.target.value })}

                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose>
                        <Button onClick={handleUpdateUserDetails} type="submit">Save changes</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}