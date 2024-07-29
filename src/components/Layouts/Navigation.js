
import ApplicationLogo from '@/components/ApplicationLogo'
import Dropdown from '@/components/Dropdown'
import Link from 'next/link'
import { ResponsiveNavButton } from '../ResponsiveNavLink'
import { DropdownButton } from '@/components/DropdownLink'
import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
// import 'tailwindcss/tailwind.css';
const Navigation = ({ user }) => {
    const router = useRouter()
    const baseuri = process.env.NEXT_PUBLIC_BACKEND_URL
    const { logout } = useAuth()
    const [open, setOpen] = useState(false)


    return (
        <div>
            {/* Primary Navigation Menu */}
            <div className="header-bar mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between">
                    <div className="flex">
                        <Link href="/dashboard">
                            <a className="logo-img">
                                <ApplicationLogo className="block w-auto fill-current text-gray-600" />
                            </a>
                        </Link>
                    </div>

                    {/* Settings Dropdown */}

                    <div className="hidden sm:flex sm:items-center sm:ml-6">
                        <Dropdown
                            align="right"
                            width="48"
                            trigger={
                                <button className="flex items-center text-sm gap-2 font-medium text-gray-500 hover:text-gray-700 focus:outline-none transition duration-150 ease-in-out">
                                    <div>
                                        <img
                                            src={
                                                user && user.image
                                                    ? `${baseuri}/${user.image}`
                                                    : '/img/icon/profile.svg'
                                            }
                                            alt={
                                                user && user.name
                                                    ? user.name
                                                    : 'Profile'
                                            }
                                            className="h-8 w-8 rounded-full"
                                        />
                                    </div>
                                    <div>{user?.name}</div>

                                    <div className="ml-1">
                                        <svg
                                            className="fill-current h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                </button>
                            }>
                            {/* Authentication */}
                            <Link href="/dashboard" passHref>
                                <DropdownButton
                                    active={
                                        router.pathname === '/dashboard'
                                    }>
                                    Dashboard
                                </DropdownButton>
                            </Link>
                            <Link href="/profile" passHref>
                                <DropdownButton
                                    active={router.pathname === '/profile'}>
                                    Profile
                                </DropdownButton>
                            </Link>
                            <DropdownButton onClick={logout}>
                                Logout
                            </DropdownButton>
                        </Dropdown>
                    </div>
                    {/* Hamburger */}
                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setOpen(open => !open)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24">
                                {open ? (
                                    <path
                                        className="inline-flex"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        className="inline-flex"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Responsive Navigation Menu */}
            {open && (
                <div className="block sm:hidden header-drop-menu">
                    {/* Responsive Settings Options */}
                    <div className="pt-4 pb-4 border-t border-gray-200">
                        <div>
                            <div id="google_translate_element"> </div>
                        </div>
                        <div className="flex items-center px-4">
                            <div className="flex-shrink-0">
                                <img
                                    src={
                                        user && user.image
                                            ? `${baseuri}/${user.image}`
                                            : '/img/icon/profile.svg'
                                    }
                                    alt={
                                        user && user.name
                                            ? user.name
                                            : 'Profile'
                                    }
                                    className="h-8 w-8 rounded-full"
                                />
                            </div>

                            <div className="ml-3">
                                <div className="font-medium text-base text-gray-800">
                                    {user?.name}
                                </div>
                                <div className="font-medium text-sm text-gray-500">
                                    {user?.email}
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            {/* Authentication */}

                            <Link href="/dashboard" passHref>
                                <ResponsiveNavButton
                                    href="/dashboard"
                                    active={router.pathname === '/dashboard'}>
                                    Dashboard
                                </ResponsiveNavButton>
                            </Link>
                            <Link href="/profile" passHref>
                                <ResponsiveNavButton
                                    href="/profile"
                                    active={router.pathname === '/profile'}>
                                    Profile
                                </ResponsiveNavButton>
                            </Link>
                            <ResponsiveNavButton onClick={logout}>
                                Logout
                            </ResponsiveNavButton>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Navigation
