import { ArrowUpIcon } from '@heroicons/react/16/solid';
import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
    const [position, setPosition] = useState({ top: 0, left: 0 })
    const {pathname} = useLocation();

    useEffect(() => {
        window.scroll({
            top: position.top,
            left: position.left,
            behavior: 'smooth'
        })
    }, [pathname,position])

    const scrollTop = useRef(null);

   useEffect(() => {
        const handleScroll = () => {
            // Check if scrollTop.current is not null before accessing its style property
            if (scrollTop.current) {
                window.scrollY > 200
                    ? scrollTop.current.style.display = 'inline-block'
                    : scrollTop.current.style.display = 'none';
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener on unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className='scroll-button'
            onClick={() => setPosition({ top: 0, left: 0 })}
            ref={scrollTop}>
            <ArrowUpIcon className='w-5 h-5' />
        </div>
    )
}

export default ScrollToTop