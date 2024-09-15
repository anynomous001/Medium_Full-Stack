import { Heart } from "lucide-react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { useParams } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { likeState } from "@/recoil/atom"

import { handleLikeToggle } from "@/hooks"


const LikeComponent = () => {
    // bad practice prop drilling 
    const { id } = useParams()
    const likeInfo = useRecoilValue(likeState)


    return (
        <Button
            onClick={() => handleLikeToggle({ id: id || '' })}
            variant={'ghost'}
            size={'icon'}
        >
            <Heart
                className={cn("w-8 h-8",
                    likeInfo.hasLiked ? "fill-red-500/90 text-red-500/90" : "text-black"
                )}
                strokeWidth={1.5}
            />
            <p>{likeInfo.likeCount}</p>
        </Button>
    )
}

export default LikeComponent