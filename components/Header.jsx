import React from 'react'
import ThemeToggle from './ThemeToggle'

const Header = () => {
    return (
        <header
            className='bg-sidebar h-20 flex items-center justify-between p-[2vw]'
        >
            <h2 className='font-bold text-xl'>To Do List</h2>
            <ThemeToggle />
        </header>
    )
}

export default Header