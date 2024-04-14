export default function Footer() {
    return (
        <footer className="w-3/4 mt-32 bg-white rounded-lg shadow m-4 dark:bg-slate-800">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-2">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a href="#" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-m font-semibold whitespace-nowrap text-wrap dark:text-white">Admitted</span>
                    </a>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Home</a>
                        </li>
                        <li>
                            <a href="mailto:admitted.feedback@gmail.com" className="hover:underline me-4 md:me-6">Contact</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-1 border-gray-200 sm:mx-auto lg:my-2"/>
                <div className="flex justify-between">
                    <span className="text-sm text-gray-500 text-left dark:text-gray-400">www.admitted.us</span>
                    <span className="text-sm text-gray-500 text-right dark:text-gray-400">© 2024 <a
                        href="#" className="hover:underline">Admitted</a>. All Rights Reserved.</span>
                </div>
            </div>
        </footer>
    )
}
