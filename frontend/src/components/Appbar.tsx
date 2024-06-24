import React from 'react'
import { Avatar } from './Blogcards'
import { Link } from 'react-router-dom'

const Appbar = () => {
    return (
        <div className='mb-6'>


            <div className='flex items-center justify-between p-4'>
                <Link to={'/blogs'}>
                    <div className='font-bold text-xl hover:cursor-pointer hover:text-slate-600'>Medium</div>
                </Link>
                <div>
                    <Link to={'/publish'}>
                        <button type="button" className=" mr-6 text-white bg-green-500 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">New</button>
                    </Link>

                    <Avatar name='Pritam' size='big' />
                </div>

            </div>
            <hr />
        </div>

    )
}

export default Appbar