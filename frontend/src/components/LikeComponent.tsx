import { Heart } from "lucide-react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { useLikes } from "@/hooks"
import { useParams } from "react-router-dom"


const LikeComponent = () => {
    // bad practice prop drilling 
    const { id } = useParams()
    const { likesState } = useLikes({
        id: id || ''
    })

    const isLikedFunc = () => {
        console.log(likesState)
    }


    return (
        <Button
            onClick={() => isLikedFunc()}
            variant={'ghost'}
            size={'icon'}
        >
            <Heart
                className={cn("w-8 h-8",
                    true ? "fill-red-500/90 text-red-500/90" : "text-black"
                )}
                strokeWidth={1.5}
            />
            <p>{likesState.likes}</p>
        </Button>
    )
}

export default LikeComponent