import { Heart } from "lucide-react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { updateLikes, useGetLikes } from "@/hooks"
import { useParams } from "react-router-dom"
import { likesState, LikeState } from "@/recoil/atom"
import { useRecoilState, useSetRecoilState } from "recoil"
import { BACKEND_URL } from "@/config"
import axios from "axios"


const LikeComponent = () => {
    // bad practice prop drilling 
    const { id } = useParams()
    const { likes, isLiked } = useGetLikes({
        id: id || ''
    })


    // console.log(likes + 'top like comp  ' + isLiked)

    // const [likeState, setLikeState] = useRecoilState<LikeState>(likesState)

    const setLikeState = useSetRecoilState(likesState);

    const handleLikeToggle = async () => {
        const updateState = {
            likes: isLiked ? likes - 1 : likes + 1,
            isLiked: !isLiked,
        };

        try {
            // Call the updateLikes function and await its result before updating Recoil state
            await updateLikes({ id: id || "", likes: updateState.likes, isLiked: updateState.isLiked });

            // Only update Recoil state after server update is successful
            setLikeState(updateState);
        } catch (error) {
            console.error("Failed to update likes on server", error);
            // Optionally, handle rollback or error UI
        }
    };


    // console.log(likes + 'bottom like comp  ' + isLiked)

    return (
        <Button
            onClick={() => handleLikeToggle()}
            variant={'ghost'}
            size={'icon'}
        >
            <Heart
                className={cn("w-8 h-8",
                    isLiked ? "fill-red-500/90 text-red-500/90" : "text-black"
                )}
                strokeWidth={1.5}
            />
            <p>{likes}</p>
        </Button>
    )
}

export default LikeComponent