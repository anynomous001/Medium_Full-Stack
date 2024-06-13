import React from 'react'
import QuoteComponent from '../components/QuoteComponent'
import Auth from '../components/Auth'

const Signup = () => {
    return (
        <div className='grid md:grid-cols-2 '>
            <Auth type="signup" />
            <QuoteComponent />

        </div>
    )
}

export default Signup