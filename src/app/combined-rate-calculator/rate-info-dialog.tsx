import React, { Fragment, useRef} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function RateInfoDialog({open, setOpen}: {open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>}) {
    const cancelButtonRef = useRef(null)

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white dark:bg-slate-800 px-4 pb-4 pt-2 sm:p-2 sm:pb-4">
                                    <div className="text-center">
                                        <div className="sm:flex justify-between">
                                            <div className="p-6"/>
                                            <Dialog.Title
                                                as="h3"
                                                className="font-bold leading-10 dark:text-gray-200 text-gray-900">
                                                Combined Rate Calculator
                                            </Dialog.Title>
                                            <button
                                                type="button"
                                                className="mt-3 rounded-md bg-sky-600 px-3 py-2 shadow-sm hover:bg-sky-200 sm:mt-0"
                                                onClick={() => setOpen(false)}
                                                ref={cancelButtonRef}
                                            >
                                            <XMarkIcon className="h-6 w-6 font-extrabold text-white"
                                                       aria-hidden="true"/>
                                            </button>
                                        </div>
                                        <div className="mt-4 mx-2 text-sm text-gray-500 dark:text-gray-400 text-center sm:mt-2">
                                            <div className="mt-2">
                                                <p>
                                                    The Combined Rate Calculator is a tool designed to estimate the
                                                    likelihood that a typical applicant is admitted to at least one of
                                                    the colleges or universities provided if the applicant were to apply
                                                    to all of the colleges or universities provided.
                                                </p>
                                                <br/>
                                                <p>
                                                    This tool does not yet factor in any specific characteristics of the
                                                    applicant such as GPA, standardized test scores, or demographics
                                                    such as gender or race.
                                                </p>
                                                <br/>
                                                <p>
                                                    Disclaimer: This calculation is not a guarantee of admission but
                                                    rather an estimation of the likelihood of acceptance for a typical
                                                    candidate based on historical acceptance rates.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
