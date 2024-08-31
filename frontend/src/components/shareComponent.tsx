import { Facebook, SquareArrowOutUpRight, Twitter } from "lucide-react"
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "./ui/dropdown-menu"


const ShareComponent = () => {

    const location = window.location.href

    console.log(location)
    return (
        <div>
            <hr></hr>
            <DropdownMenu>
                <DropdownMenuTrigger><SquareArrowOutUpRight /></DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>
                        <FacebookShareButton url={location} >
                            <Facebook />
                        </FacebookShareButton >
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <TwitterShareButton url={location} >
                            <Twitter />
                        </TwitterShareButton >
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    )
}

export default ShareComponent