import Fullblog from '../components/Fullblog'
import { useParams } from 'react-router-dom'
import { useBlog } from '../hooks'
import Spinner from '../components/Spinner'
import Appbar from '../components/Appbar'


const Blog = () => {
    const { id } = useParams()
    const { loading, blog } = useBlog({
        id: id || ''
    })



    if (loading || !blog) {
        return <div>
            <Appbar />
            <Spinner />
        </div>
    }

    return (
        <div>
            <Fullblog blog={blog} />
        </div>
    )
}

export default Blog