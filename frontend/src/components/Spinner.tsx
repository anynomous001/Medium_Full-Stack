

const Spinner = () => {
    return (
        <div className='flex items-center justify-center h-[70vh] bg-[#f8f9fa] min-h-screen'>
            <div
                className="inline-block h-14 w-14 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                >Loading...</span>
            </div>
        </div>

    )
}

export default Spinner