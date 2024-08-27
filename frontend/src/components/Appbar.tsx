import { useUserDetails } from '@/hooks'
import { Avatar } from './Blogcards'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { SquarePen } from 'lucide-react'





const Appbar = () => {
    const { userDetails } = useUserDetails()

    return (
        <div className='mb-6'>
            <div className='flex items-center justify-between p-4'>
                <Link to={'/blogs'}>
                    <div className='font-bold text-xl hover:cursor-pointer hover:text-slate-600'>Medium</div>
                </Link>
                <div className='flex gap-5  items-center'>
                    <Link to={'/publish'}>
                        <Button className='space-y-10 rounded-3xl text-xl font-light py-5' size={'sm'} >

                            <SquarePen className='w-6 h-6 mr-3' />

                            Write
                        </Button>
                    </Link>

                    <Avatar name={userDetails?.name || ''} size='big' />


                </div>

            </div>
            <hr />
        </div>

    )
}

export default Appbar