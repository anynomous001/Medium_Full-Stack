import { Facebook, MessageCircle, SquareArrowOutUpRight, Twitter } from "lucide-react"
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "./ui/dropdown-menu"
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import LikeComponent from "./LikeComponent";
import TooltipWrapper from "./ToolTipWrapper";
import SaveComponent from "./saveComponent";


const ShareComponent = () => {

    return (
        <>
            <hr></hr>
            <div className="flex items-center justify-between mx">
                <div className="flex items-center space-x-4 py-3">
                    <div className="">
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Button
                                    variant={'ghost'}
                                    size={'icon'}>
                                    <TooltipWrapper tooltipContent={'Share'} triggerText={
                                        <SquareArrowOutUpRight className="w-7 h-7 hover:bg-slate-400/10" />

                                    } />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                    <FacebookShareButton url={window.location.href} >
                                        <Facebook />
                                    </FacebookShareButton >
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <TwitterShareButton url={window.location.href} >
                                        <Twitter />
                                    </TwitterShareButton >
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu >
                    </div >
                    <div className=" space-x-3">
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
                        <TooltipWrapper tooltipContent={'Like'} triggerText={<LikeComponent />
                        } />

                    </div>

                </div >
                <div>
                    <TooltipWrapper tooltipContent={'Save'} triggerText={
                        <SaveComponent />
                    } />
                </div>
            </div>
            <hr></hr>
        </>
    )
}

export default ShareComponent