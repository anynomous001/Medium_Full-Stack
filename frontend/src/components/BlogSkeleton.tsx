

const BlogSkeleton = () => {
    return (
        <div className='flex justify-center'>


            <div className='flex flex-col w-3/4 md:w-1/2 gap-4 my-4'>
                <div className='flex flex-col  gap-4 '>
                    <div className='flex items-center gap-6 '>
                        <div className="h-8 w-8 bg-gray-200 rounded-full   mb-4"></div>
                        <div className="h-4 w-48  bg-gray-200 rounded-full  mb-2.5"></div>
                        <div className="h-4 w-48  bg-gray-200 rounded-full   mb-2.5"></div>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full  max-w-[330px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full  max-w-[430px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full  max-w-[430px] mb-2.5"></div>
                    <hr />

                </div>
            </div>
        </div>

    )
}

export default BlogSkeleton