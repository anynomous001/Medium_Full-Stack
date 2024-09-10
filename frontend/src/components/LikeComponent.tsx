import { Heart } from "lucide-react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { useGetLikes, useSetLikes } from "@/hooks"
import { useParams } from "react-router-dom"
import { LikeState, likesState } from "@/recoil/atom"
import { useRecoilState, useSetRecoilState } from "recoil"


const LikeComponent = () => {
    // bad practice prop drilling 
    const { id } = useParams()
    const { likeState } = useGetLikes({
        id: id || ''
    })

    // const [likeState, setLikeState] = useRecoilState<LikeState>(likesState)

    const setLikeState = useSetRecoilState(likesState);

    const isLikedFunc = () => {
        setLikeState((prevState) => {
            if (prevState.isLiked) {
                return {
                    likes: prevState.likes - 1,
                    isLiked: false
                }
            } else if (!prevState.isLiked) {
                return {
                    likes: prevState.likes + 1,
                    isLiked: true
                }
            }
        })

        useSetLikes(id)
    }


    return (
        <Button
            onClick={() => isLikedFunc()}
            variant={'ghost'}
            size={'icon'}
        >
            <Heart
                className={cn("w-8 h-8",
                    likeState.isLiked ? "fill-red-500/90 text-red-500/90" : "text-black"
                )}
                strokeWidth={1.5}
            />
            <p>{likeState.likes}</p>
        </Button>
    )
}

export default LikeComponent