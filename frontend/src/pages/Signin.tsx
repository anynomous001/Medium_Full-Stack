import React from 'react'
import QuoteComponent from '../components/QuoteComponent'
import Auth from '../components/Auth'

const Signin = () => {
    return (
        <div className='grid md:grid-cols-2 '>
            <Auth type="signin" />
            <QuoteComponent />

        </div>
    )
}

export default Signin