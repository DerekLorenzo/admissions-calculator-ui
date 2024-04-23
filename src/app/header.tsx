'use client';
import { Fragment, useState } from 'react'
import {Dialog, Disclosure, Menu, Transition} from '@headlessui/react'
import {
    Bars3Icon,
    BanknotesIcon,
    CalculatorIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon } from '@heroicons/react/20/solid'
import Image from "next/image";
import Link from "next/link";

const tools = [
    { name: 'MoneyScore', description: 'Personalized income and aid details', href: '/money-score', icon: BanknotesIcon },
    { name: 'CombinedRate', description: 'Calculate combined acceptance rates', href: '/combined-rate-calculator', icon: CalculatorIcon },
]
const callsToAction = [
    { name: 'Placeholder', href: '/', icon: PhoneIcon },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div>
            <header className="bg-white dark:bg-slate-800 border-b-2 dark:border-b-2 border-solid border-gray-400 rounded-full">
                <nav className="mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-8" aria-label="Global">
                    <div className="flex">
                        <Link href="/" className="-m-1.5 p-1.5">
                            <div className="flex lg:hidden">
                                <Image src="/admitted_icon_light.png" className="hidden dark:block" width={34} height={34}
                                       alt="Admitted Icon"/>
                                <Image src="/admitted_icon.png" className="block dark:hidden" width={34} height={34}
                                       alt="Admitted Icon"/>
                            </div>
                            <div className="hidden lg:flex">
                                <Image src="/admitted_logo_light.png" className="hidden dark:block" width={164} height={34}
                                       alt="Admitted Logo"/>
                                <Image src="/admitted_logo.png" className="block dark:hidden" width={164} height={34}
                                       alt="Admitted Logo"/>
                            </div>
                        </Link>
                    </div>
                    <div className="flex lg:flex-1 lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-white"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="hidden pl-12 lg:flex lg:gap-x-12">
                            <Menu as="div" className="relative">
                                <Menu.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                                    Tools
                                    <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                                </Menu.Button>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-200"
                                    enterFrom="opacity-0 translate-y-1"
                                    enterTo="opacity-100 translate-y-0"
                                    leave="transition ease-in duration-150"
                                    leaveFrom="opacity-100 translate-y-0"
                                    leaveTo="opacity-0 translate-y-1"
                                >
                                    <Menu.Items className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                                        <div className="p-4">
                                            {tools.map((item) => (
                                                <Menu.Item key={"item-" + item.name}>
                                                    {({ close }) => (
                                                        <Menu.Button
                                                            key={item.name}
                                                            className="group relative w-full flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                                                        >
                                                            <div
                                                                className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                                <item.icon
                                                                    className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                                                                    aria-hidden="true"/>
                                                            </div>
                                                            <div className="flex-auto">
                                                                <Link href={item.href}
                                                                      className="block font-semibold text-gray-900"
                                                                      onClick={close}
                                                                >
                                                                    {item.name}
                                                                    <span className="absolute inset-0"/>
                                                                </Link>
                                                                <p className="mt-1 text-gray-600">{item.description}</p>
                                                            </div>
                                                        </Menu.Button>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </div>
                                        {/*<div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                                            {callsToAction.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                                                >
                                                    <item.icon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                        */
                                        }
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        {/*
                            <Link href="/" className="text-sm font-semibold leading-6 text-gray-900">
                                Home
                            </Link>
                            */
                        }
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <Link href="/" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                            Home <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>
                </nav>
                <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                    <div className="fixed inset-0 z-10" />
                    <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white dark:bg-slate-800 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <Link href="/" className="-m-1.5 p-1.5">
                                <Image src="/admitted_icon_light.png" className="hidden dark:block" width={34} height={34} alt=""/>
                                <Image src="/admitted_icon.png" className="block dark:hidden" width={34} height={34} alt=""/>
                            </Link>
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-200"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                        <Disclosure as="div" className="-mx-3">
                                        {({ open }) => (
                                            <>
                                                <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 dark:text-white hover:bg-gray-50">
                                                    Tools
                                                    <ChevronDownIcon
                                                        className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                                                        aria-hidden="true"
                                                    />
                                                </Disclosure.Button>
                                                <Disclosure.Panel className="mt-2 space-y-2">
                                                    {[...tools].map((item) => ( // add back ...callsToAction when needed
                                                        <Disclosure.Button
                                                            key={item.name}
                                                            as="a"
                                                            href={item.href}
                                                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 dark:text-white hover:bg-gray-50"
                                                            onClick={() => setMobileMenuOpen(false)}
                                                        >
                                                            {item.name}
                                                        </Disclosure.Button>
                                                    ))}
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                    {/*
                                    <Link
                                        href="/"
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        Home
                                    </Link>
                                    */
                                    }
                                </div>
                                <div className="py-6">
                                    <Link
                                        href="/"
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7
                                        text-gray-900 dark:text-gray-200 hover:bg-gray-50"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Home
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
                </Dialog>
            </header>
        </div>
    )
}
