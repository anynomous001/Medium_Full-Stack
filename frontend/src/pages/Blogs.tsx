import React from 'react'
import Blogcards from '../components/Blogcards'
import Appbar from '../components/Appbar'

const Blogs = () => {
    return (
        <div>
            <Appbar />
            <div className='flex flex-col items-center gap-12 '>
                <Blogcards
                    authorName='Pritam'
                    title='Flowbite is an open-source library of UI'
                    content=' components based on the utility-first Tailwind CSS framework
                 featuring dark mode support, a Figma design system, templates, and more.
                  It includes all of the commonly used components that a website requires,
                   such as buttons, dropdowns, navigation bars, modals, but also some more
                    advanced interactive elements  components based on the utility-first 
                    Tailwind CSS framework featuring dark mode support, a Figma design 
                    system, templates, and more. It includes all of the commonly used 
                    components that a website requires, such as buttons, dropdowns, 
                    navigation bars, modals, but also some more advanced interactive elements
                    components based on the utility-first Tailwind CSS framework featuring 
                    dark mode support, a Figma design system, templates, and more. It includes 
                    all of the commonly used components that a website requires, such as buttons,
                     dropdowns, navigation bars, modals, but also some more advanced interactive
                      elements'
                    publishedDate='2nd Dec 2024 '
                />
                <Blogcards
                    authorName='Pritam'
                    title='Flowbite is an open-source library of UI'
                    content=' components based on the utility-first Tailwind CSS framework
                 featuring dark mode support, a Figma design system, templates, and more.
                  It includes all of the commonly used components that a website requires,
                   such as buttons, dropdowns, navigation bars, modals, but also some more
                    advanced interactive elements  components based on the utility-first 
                    Tailwind CSS framework featuring dark mode support, a Figma design 
                    system, templates, and more. It includes all of the commonly used 
                    components that a website requires, such as buttons, dropdowns, 
                    navigation bars, modals, but also some more advanced interactive elements
                    components based on the utility-first Tailwind CSS framework featuring 
                    dark mode support, a Figma design system, templates, and more. It includes 
                    all of the commonly used components that a website requires, such as buttons,
                     dropdowns, navigation bars, modals, but also some more advanced interactive
                      elements'
                    publishedDate='2nd Dec 2024 '
                />

            </div>
        </div>

    )
}

export default Blogs