import axios from "axios"
import React from "react"

const QuoteComponent = () => {
    const [quote, setQuote] = React.useState({

        content: "The customer support I received was exceptional.The support team went above and beyond to address my concerns",
        author: "Julies Winfield",
        authorSlug: 'CEO | Acme corp'

    })




    const fetchQuote = async () => {
        console.log('fetched')
        try {
            const response = await axios.get('https://api.quotable.io/quotes/random?minLength=100&maxLength=140')
            setQuote(() => ({
                content: response.data[0].content,
                author: response.data[0].author, // Fixed typo: "auhtor" to "author"
                authorSlug: response.data[0].authorSlug,
            }));

            console.log(response.data[0].content)
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            fetchQuote()
        }, 10000) // Set interval to 300ms

        // Cleanup function
        return () => clearInterval(intervalId)
    }, []) // Use empty dependency array to run only once


    return (
        <div className="hidden md:flex bg-slate-200 h-screen  justify-center flex-col">
            <div className="flex justify-center">
                <div className="max-w-lg">
                    <div className="text-3xl font-bold">{quote.content}
                    </div>
                    <div className="max-w-md text-xl font-semibold text-left mt-4">
                        {quote.author}
                    </div>
                    <div className="max-w-md text-sm font-light text-slate-400">
                        {quote.authorSlug}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default QuoteComponent