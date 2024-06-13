import React from 'react'
import { Avatar } from './Blogcards'

const Appbar = () => {
    return (
        <div className='mb-6'>


            <div className='flex items-center justify-between p-4'>
                <div className='font-bold text-xl'>Medium</div>
                <Avatar name='Pritam' size='big' />

            </div>
            <hr />
        </div>

    )
}

export default Appbar