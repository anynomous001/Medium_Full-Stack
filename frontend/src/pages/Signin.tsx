
import Auth from '@/components/Auth'
import QuoteComponent from '../components/QuoteComponent'
import Auth2 from '@/components/Auth2'

const Signin = () => {
    return (
        <div className='grid md:grid-cols-2 '>
            <Auth type='signin' />
            <QuoteComponent />

        </div>
    )
}

export default Signin