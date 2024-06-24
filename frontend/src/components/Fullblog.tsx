import React from 'react'
import { useBlog } from '../hooks'
import { Blog } from '../hooks'
import Appbar from './Appbar'
import { Avatar } from './Blogcards'



const Fullblog = ({ blog }: { blog: Blog }) => {


    return (
        <div>
            <Appbar />
            <div className='grid grid-cols-12 px-20 mt-9'>
                <div className='col-span-8'>
                    <div className='text-7xl font-extrabold '>{blog.title}</div>
                    <div className='text-slate-500 text-lg mt-5 font-bold'>{'Post on 2nd December 2023'}</div>
                    <div className='text-2xl text-gray-500  mt-10 leading-snug font-semibold'>{blog.content}</div>
                </div>
                <div className='col-span-3 '>
                    <div className='text-xl font-bold text-gray-400'>Author</div>
                    <div className=' grid grid-cols-6  mt-4'>
                        <Avatar size='big' name={`${blog.author.name || 'Anynomous'}`} />
                        <div className=' flex flex-col items-start col-span-5   '>
                            <div className=' mb-2   text-2xl font-bold  text-gray-600'> {`${blog.author.name || 'Anynomous'}`}</div>
                            <div className='flex  text-slate-400 font-semibold text-wrap'>
                                <p className=''> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis accusamus consequatur perspiciatis nesciunt commodi, libero impedit vitae alias vero praesentium quo earum omnis voluptate.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Fullblog