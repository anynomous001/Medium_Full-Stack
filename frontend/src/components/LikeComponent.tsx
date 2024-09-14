import { Heart } from "lucide-react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { useParams } from "react-router-dom"
import { useRecoilState } from "recoil"
import { likeState } from "@/recoil/atom"
import { BACKEND_URL } from "@/config"
import axios from "axios"


const LikeComponent = () => {
    // bad practice prop drilling 
    const { id } = useParams()
    const [likeInfo, setLikeInfo] = useRecoilState(likeState)

    async function handleLikeToggle() {
        try {
            await axios.post(`${BACKEND_URL}/api/h1/blog/${id}/like-toggle`, {}, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }).then(response => {
                setLikeInfo(() => ({
                    hasLiked: response.data.hasliked,
                    likeCount: response.data.likeCount
                }))

                console.log(likeInfo)

            })
        } catch (error) {
            console.log(error)
        }
    }
    // console.log(likes + 'bottom like comp  ' + isLiked)

    return (
        <Button
            onClick={() => handleLikeToggle()}
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