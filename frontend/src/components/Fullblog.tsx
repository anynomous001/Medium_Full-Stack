import { useRecoilValue } from 'recoil'
import { Blog } from '../hooks'
import Appbar from './Appbar'
import Avatar from './Avatar'
import ShareComponent from './shareComponent'
import { commentState } from '@/recoil/atom'



const Fullblog = ({ blog }: { blog: Blog }) => {

    const comment = useRecoilValue(commentState)

    console.log(blog)


    return (
        <div>
            <Appbar />
            <div className='md:mb-0 pb-24 flex flex-col gap-x-20 md:grid grid-cols-12 md:px-12 px-7 bg-[#f8f9fa] pt-8 h-auto min-h-screen '>
                <div className='col-span-8'>
                    <div className='text-2xl md:text-7xl  font-extrabold '>{blog.title}</div>
                    <div className='text-slate-500 text-sm md:text-lg mt-5 font-bold mb-8'>{`Posted on ${blog.date === null ? 'No Date' : blog.date}`}</div>
                    <ShareComponent />
                    <div className='text-base md:text-2xl text-gray-500  mt-10 leading-snug font-medium'>{blog.content}</div>
                </div>

                <div className='col-span-4 pr-4 md:mt-0 mt-10 '>
                    <div className='text-xl font-bold text-gray-400'>Author</div>
                    <div className='flex flex-col mt-2'>
                        <div className='flex gap-2'>
                            <Avatar size='small' name={`${blog.author.name || 'Anynomous'}`} />
                            <div className=' mb-2 text-lg  md:text-2xl font-bold  text-gray-600'>
                                {`${blog.author.name || 'Anynomous'}`}
                            </div>
                        </div>
                        <p className='text-base font-normal text-gray-400'>
                            {blog.author.about ? blog.author.about :
                                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis accusamus consequatur perspiciatis nesciunt commodi, libero impedit vitae alias vero praesentium quo earum omnis voluptate."}
                        </p>
                    </div>


                    <div className=' mt-12  border-2 border-blue-600 border-solid space-x-3'>
                        <p>Comments</p>
                        <div className='my-3'>

                            {
                                comment?.map((comments) => (<div key={Math.random()} className='flex gap-3 mt-3' >
                                    <Avatar size='small' name={`${comments.commenter}` || 'Anynomous'} />
                                    <p>
                                        {comments.content}
                                    </p>
                                </div>
                                ))
                            }
                        </div>

                    </div>



                </div>

            </div>
        </div >
    )
}

export default Fullblog