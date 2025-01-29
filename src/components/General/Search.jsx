import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React from 'react'

const Search = () => {
    return (

        <form className="flex items-center p-3">
            <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </div>
                <input type="search" id="simple-search" className="search-box bg-gray-200 border text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5" placeholder="Search for products, styles, brands & more" required />
            </div>
        </form>

    )
}

export default Search