import { Facebook, SquareArrowOutUpRight, Twitter } from "lucide-react"
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "./ui/dropdown-menu"
import { useLocation } from 'react-router-dom';


const ShareComponent = () => {

    const location = useLocation()


    return (
        <div>
            <hr></hr>
            <DropdownMenu>
                <DropdownMenuTrigger><SquareArrowOutUpRight /></DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>
                        <FacebookShareButton url={location.pathname} >
                            <Facebook />
                        </FacebookShareButton >
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <TwitterShareButton url={location.pathname} >
                            <Twitter />
                        </TwitterShareButton >
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    )
}

export default ShareComponent