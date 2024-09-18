import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import TooltipWrapper from "./ToolTipWrapper"
import { Button } from "./ui/button"
import { MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

import { Textarea } from "./ui/textarea"
import axios from "axios"
import { BACKEND_URL } from "@/config"
import { useParams } from "react-router-dom"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { commentMessageState, commentState, userInfo } from "@/recoil/atom"




const CommentSidebar = () => {

    const [commentMessage, setCommentMessage] = useRecoilState(commentMessageState)
    const userDetails = useRecoilValue(userInfo)
    const setComment = useSetRecoilState(commentState)
    const { id } = useParams()

    const handleComment = async () => {
        if (!commentMessage) {
            console.error("Comment message is empty.");
            return;
        } else {
            try {

                const response = await axios.post(`${BACKEND_URL}/api/h1/blog/${id}/comments`, {
                    content: commentMessage.message,
                    name: userDetails.name
                }, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                })

                setComment(prevComments => [
                    ...prevComments,
                    { content: commentMessage.message, commenter: userDetails.name }
                ]);

                setCommentMessage({ message: '' });

                console.log(response)
            } catch (error) {
                console.error(error)
            }
        }
    }


    return (
        <Sheet>
            <SheetTrigger>
                <TooltipWrapper tooltipContent={'Comment'} triggerText={
                    <Button
                        variant={'ghost'}
                        size={'icon'}
                    >
                        <MessageCircle
                            className={cn("w-8 h-8")}
                            strokeWidth={1.5}
                        />
                    </Button>
                } />
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Write Your Comments here.</SheetTitle>
                    <SheetDescription>
                        Let us know your opinion about this blog. what this helpful?
                    </SheetDescription>
                </SheetHeader>
                <div className="mt-3">
                    <Textarea onChange={(e) => setCommentMessage({ message: e.target.value })} placeholder="Your comment goes here." />
                </div>
                <SheetFooter>
                    <SheetClose>
                        <Button size={'sm'} onClick={handleComment} className="mt-3" >Send</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default CommentSidebar