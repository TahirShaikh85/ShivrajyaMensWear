import { Fragment, useEffect, useState } from 'react'
import { FunnelIcon, MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Dialog, Disclosure, Transition } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsByFiltersAsync, productCategory, selectAllProducts, selectAllCategories, selectAllLabels, fetchAllCategoriesAsync, fetchAllLabelsAsync, selectedProductCategory } from '../../Features/product/productSlice'


const Filter = () => {
    // select filter object states coming from API
    const categories = useSelector(selectAllCategories);
    const labels = useSelector(selectAllLabels);
    const selectedCategory = useSelector(selectedProductCategory);
    const newProducts = useSelector(selectAllProducts);

    // --------- filters ---------
    const filters = [
        {
            id: 'category',
            name: 'Category',
            options: categories,
        },
        {
            id: 'label',
            name: 'Label',
            options: labels,
        },
    ]

    // ------- filter logic ------------
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [filter, setFilter] = useState({});
    const dispatch = useDispatch();

    const handleFilter = (e, section, option) => {
        const newFilter = { ...filter };
        if (e.target.checked) {
            newFilter[section.id] = option.value;

            section.id == "category" && dispatch(productCategory(option.value));

        } else {
            delete newFilter[section.id];
            dispatch(productCategory("All"))
        }
        setFilter(newFilter);
        dispatch(fetchProductsByFiltersAsync(newFilter));
        setMobileFiltersOpen(false);
    }

    // dispatch actions to fetch all Filter options which are used in Filters object
    useEffect(() => {
        dispatch(fetchAllCategoriesAsync())
        dispatch(fetchAllLabelsAsync());
    }, [dispatch])

    return (
        <div>
            {/* -- for big screens -- */}
            <form className="hidden lg:block">
                <div className='flex justify-between'>
                    <h2 className="text-2xl tracking-wider font-bold text-gray-900 text-center md:text-left mb-1 font-agdasima">
                        Filters
                    </h2>
                    <div>
                        <h2 className="text-lg tracking-wide font-bold text-gray-800 text-left capitalize">
                            {selectedCategory}
                        </h2>
                        <span className='text-sm mb-4 text-gray-500'>
                            {newProducts.length} items
                        </span>
                    </div>
                </div>
                {filters.map((section) => (
                    <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-2">
                        {({ open }) => (
                            <>
                                <h3 className="">
                                    <Disclosure.Button className="flex w-full items-center justify-between bg-white py-1 text-gray-400 hover:text-gray-500">
                                        <span className="font-medium text-gray-900">
                                            {section.name}
                                        </span>
                                        {/* <span className="ml-6 flex items-center text-gray-900"> */}
                                        {open ? (
                                            <MinusIcon className='w-5 h-5 text-right' stroke='#000' />

                                        ) : (
                                            <PlusIcon className='w-5 h-5 text-right' stroke='#000' />

                                        )}
                                        {/* </span> */}
                                    </Disclosure.Button>
                                </h3>
                                <Disclosure.Panel className="pt-2">
                                    <div className="space-y-2">
                                        {section.options.map((option, optionIdx) => (
                                            <div key={option.value} className="flex items-center">
                                                <input
                                                    id={`filter-${section.id}-${optionIdx}`}
                                                    name={`${section.id}[]`}
                                                    defaultValue={option.value}
                                                    type="checkbox"
                                                    defaultChecked={selectedCategory === option.value}
                                                    onClick={(e) => handleFilter(e, section, option)}
                                                    className="h-4 w-4 rounded border-gray-400 text-orange-600 focus:ring-orange-500"
                                                />
                                                <label
                                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                                    className="ml-3 text-gray-600"
                                                >
                                                    {option.label}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                ))}
            </form>

            {/* Mobile filter dialog */}
            <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                <div className="flex items-center justify-between px-4">
                                    <h2 className="text-lg text-gray-900 font-bold">Filters</h2>
                                    <button
                                        type="button"
                                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                        onClick={() => setMobileFiltersOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" />
                                    </button>
                                </div>

                                {/* Filters */}
                                <form className="mt-4 border-t border-gray-200">
                                    <h3 className="sr-only">Categories</h3>

                                    {filters.map((section) => (
                                        <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                                            {({ open }) => (
                                                <>
                                                    <h3 className="-mx-2 -my-3 flow-root">
                                                        <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                            <span className="font-medium text-gray-900">{section.name}</span>
                                                            <span className="ml-6 flex items-center">
                                                                {open ? (
                                                                     <MinusIcon strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" />
                                                                ) : (
                                                                    <PlusIcon strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" />
                                                                )}
                                                            </span>
                                                        </Disclosure.Button>
                                                    </h3>
                                                    <Disclosure.Panel className="pt-6">
                                                        <div className="space-y-6">
                                                            {section.options.map((option, optionIdx) => (
                                                                <div key={option.value} className="flex items-center">
                                                                    <input
                                                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                        name={`${section.id}[]`}
                                                                        defaultValue={option.value}
                                                                        type="checkbox"
                                                                        defaultChecked={selectedCategory === option.value}
                                                                        onClick={(e) => handleFilter(e, section, option)}
                                                                        className="h-4 w-4 rounded border-gray-400 text-indigo-600 focus:ring-indigo-500"
                                                                    />
                                                                    <label
                                                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                        className="ml-3 min-w-0 flex-1 text-gray-500"
                                                                    >
                                                                        {option.label}
                                                                    </label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    ))}
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
            <button
                type="button"
                className="ml-2 mr-2 mt-2 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
            >
                <span className="sr-only">Filters</span>
                <FunnelIcon strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" />
            </button>
        </div>
    )
}

export default Filter