import { useRecoilValue } from 'recoil'
import { Blog } from '../hooks'
import Appbar from './Appbar'
import ShareComponent from './shareComponent'
import { commentState } from '@/recoil/atom'
import markdownit from 'markdown-it'
import DOMPurify from 'dompurify';


const md = markdownit()


const Fullblog = ({ blog }: { blog: Blog }) => {

    const comment = useRecoilValue(commentState)


    const parsedContent = DOMPurify.sanitize(md.render(blog.content || ''));

    console.log(blog)


    return (
        <div>
            <Appbar />
            <div className='md:mb-0 pb-24 flex flex-col gap-x-20 md:grid grid-cols-12 md:px-12 px-7 bg-[#f8f9fa] pt-8 h-auto min-h-screen '>
                <div className='col-span-8'>
                    <div className='text-2xl md:text-7xl  font-extrabold '>{blog.title}</div>
                    <div className='text-slate-500 text-sm md:text-lg mt-5 font-bold mb-8'>{`Posted on ${blog.date === null ? 'No Date' : blog.date}`}</div>
                    <ShareComponent />
                    {/* <div className='text-base md:text-2xl text-gray-500 mt-10 leading-snug font-medium break-words '
                        dangerouslySetInnerHTML={{ __html: parsedContent }} /> */}
                    {parsedContent ? (
                        <article
                            className=" mt-4 prose md:text-2xl max-w-6xl break-words md:leading-10 text-[#4A4A4A]  leading-relaxed tracking-wide"
                            dangerouslySetInnerHTML={{ __html: parsedContent }}
                        />
                    ) : (
                        <p className="no-result">No details provided</p>
                    )}
                </div>

                <div className='col-span-4 pr-4 md:mt-0 mt-10 '>
                    <div className='text-xl font-bold text-gray-400'>Author</div>
                    <div className='flex flex-col mt-2'>
                        <div className='flex gap-2'>
                            <div className='relative  items-center justify-center flex-shrink-0 inline-flex w-8 h-8
     overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600'>
                                <span className='text-gray-500    font-bold '>{blog.author.name[0]?.toUpperCase() || 'A'}</span>
                            </div>
                            <div className=' mb-2 text-lg  md:text-2xl font-bold  text-gray-600'>
                                {`${blog.author.name || 'Anynomous'}`}
                            </div>
                        </div>
                        <p className='text-base font-normal text-gray-400'>
                            {blog.author.about ? blog.author.about :
                                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis accusamus consequatur perspiciatis nesciunt commodi, libero impedit vitae alias vero praesentium quo earum omnis voluptate."}
                        </p>
                    </div>


                    <div className=' mt-12 w-full  border-2 border-blue-600 border-solid space-x-3'>
                        <p className='md:text-2xl text:xl font-semibold text-slate-700'>Comments</p>
                        <div className='my-3 '>

                            {
                                comment.length === 0 ?
                                    <div>
                                        No comments.
                                    </div>
                                    :
                                    comment?.map((comments) => (<div key={Math.random()} className='' >
                                        <div className='flex gap-6 mt-3 mb-4'>

                                            <div className='relative  items-center justify-center flex-shrink-0 inline-flex w-8 h-8
     overflow-hidden bg-slate-700 rounded-full dark:bg-gray-600'>
                                                <span className='text-white font-bold '>
                                                    {comments.commenter[0]?.toUpperCase() || 'A'}
                                                </span>
                                            </div>

                                            <p className='p-2 border-2 border-slate-300/80 max-w-full rounded-xl break-words'>
                                                {comments.content}
                                            </p>
                                        </div>
                                        <hr />
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