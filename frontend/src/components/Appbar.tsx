import { useUserDetails } from '@/hooks'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { SquarePen } from 'lucide-react'
import AvatarSkeleton from './AvatarSkeleton'
import Avatar from './Avatar'

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"




const Appbar = () => {
    const { userDetails, loading } = useUserDetails()

    return (
        <div className=''>
            <div className='flex items-center justify-between p-4'>
                <Link to={'/blogs'}>
                    <div className='text-xl md:text-2xl hover:cursor-pointer hover:text-slate-600 font-extrabold'>Readium</div>
                </Link>
                <div className='flex gap-5  items-center'>
                    <Link to={'/publish'}>
                        <Button className='space-y-10 rounded-md text-lg md:text-xl font-light p-3 md:px-6 md:py-6 bg-gray-700' size={'sm'} >

                            <SquarePen className=' w-5 h-5 md:w-6 md:h-6 mr-3' />
                            Write
                        </Button>
                    </Link>
                    {loading ? <AvatarSkeleton size='big' /> :
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Avatar name={userDetails?.name || 'U'} size='small' />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Profile</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                    }

                </div>

            </div>
            <hr />
        </div>

    )
}

export default Appbar