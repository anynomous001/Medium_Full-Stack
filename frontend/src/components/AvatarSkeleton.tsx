
const AvatarSkeleton = ({ size }: { size?: 'big' | 'small' | 'large' }) => {
    return (
        <div className={`relative inline-flex items-center justify-center ${size === 'small' ? 'w-8 h-8' : size === 'big' ? 'w-12 h-12' : 'w-40 h-40 text-3xl'}
     overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>

        </div>
    )
}

export default AvatarSkeleton