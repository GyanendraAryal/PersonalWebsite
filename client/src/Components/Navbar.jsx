import React from 'react'

const Navbar = () => {
    return (
        <>
            <div className="container px-2 relative flex flex-row flex-wrap text-xs h-12 max-w-325 border-2 bg-black justify-between items-center">
                <div className='flex text-white'>
                    <span>Gyanendra<span class="text-2xl text-green-600">.</span></span>
                </div>
                <span className="text-white rotate-270"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chart-no-axes-column-decreasing-icon lucide-chart-no-axes-column-decreasing"><path d="M5 21V3"/><path d="M12 21V9"/><path d="M19 21v-6"/></svg></span>
                <ul className='flex fixed top-[50%] right-0 w-full translate-x-full flex-wrap m-0 p-0 text-xs gap-1.5'>
                    <li>Home</li>
                    <li>Services</li>
                    <li>Resume</li>
                    <li>Work</li>
                    <li>Contact</li>
                </ul>
            </div>
        </>
    )
}

export default Navbar