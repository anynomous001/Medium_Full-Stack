import { Heart } from "lucide-react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { updateLikes, useGetLikes } from "@/hooks"
import { useParams } from "react-router-dom"
import { likesState } from "@/recoil/atom"
import { useSetRecoilState } from "recoil"


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

            /*The original issue happens because React updates state asynchronously, 
            so when you click to toggle the like, setLikeState has not immediately reflected 
            the updated value of likes and isLiked, but you're calling updateLikes with the old values. 
            By ensuring you pass the correct updated state to your API call, you keep both the Recoil 
            state and the database in sync. */
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