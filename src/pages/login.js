import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import AuthSessionStatus from '@/components/AuthSessionStatus'
import Button from '@/components/Button'
import GuestLayout from '@/components/Layouts/GuestLayout'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Header from '@/components/Layouts/Header'
import Footer from '@/components/Layouts/Footer'

const Login = () => {
    const router = useRouter()

    const { user, login } = useAuth({
        middleware: 'guest'
    });

    useEffect(() => {
        if (user) {
            if (user.email_verified_at == null) {
                router.push('/verify-email');
            } else {
                router.push('/dashboard');
            }
        }
    }, [user, router]);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [shouldRemember, setShouldRemember] = useState(false)
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    useEffect(() => {
        if (router.query.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.query.reset))
        } else {
            setStatus(null)
        }
    })
    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }
    const [isLoading, setIsLoading] = useState(false);
    const submitForm = async event => {
        event.preventDefault();

        setIsLoading(true);

        login({
            email,
            password,
            remember: shouldRemember,
            setErrors,
            setStatus,
        }).finally(() => {
            setIsLoading(false);
        });
    };

    return (
        <>
            <Head>
                <meta charset="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                <title>Login - Smart Card Generator</title>
                <meta property="og:type" content="website" />
                <meta
                    property="og:url"
                    content="https://smartcardgenerator.net/login"
                />
                <meta
                    property="description"
                    content="Welcome to Smart Card Generator, your go-to destination for creating dynamic and efficient QR codes. We believe in simplifying the process of generating QR codes to empower businesses, individuals, and organizations with versatile and powerful tools."
                />
                <meta
                    property="og:description"
                    content="Welcome to Smart Card Generator, your go-to destination for creating dynamic and efficient QR codes. We believe in simplifying the process of generating QR codes to empower businesses, individuals, and organizations with versatile and powerful tools."
                />
                <meta property="og:type" content="Description" />
                <meta
                    property="og:title"
                    content="Login - Smart Card Generator"
                />
                <meta
                    property="og:image"
                    content="/img/meta_image/home-page.jpg"
                />
                <meta
                    property="image"
                    content="/img/meta_image/home-page.jpg"
                />
                <meta property="og:site_name" content="Smart Card Generator" />
            </Head>
            <Header />
            <GuestLayout>
                <AuthCard
                    logo={
                        <Link href="/">
                            <a>
                                <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                            </a>
                        </Link>
                    }>
                    {/* Session Status */}
                    <AuthSessionStatus className="mb-4" status={status} />
                    <div className="login-header">
                        <h1>Login</h1>
                    </div>
                    <div className="login-wrapper">
                        <form onSubmit={submitForm}>
                            <h2 className="login-head-text">
                                No account yet?{' '}
                                <span>
                                    &nbsp;
                                    <Link href={'/register'}>Register</Link>
                                </span>
                            </h2>

                            <div>
                                <Label htmlFor="email">Email</Label>

                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    className="block mt-1 w-full"
                                    onChange={event =>
                                        setEmail(event.target.value)
                                    }
                                    required
                                    autoFocus
                                />

                                <InputError
                                    messages={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            {/* Password */}
                            <div className="mt-3">
                                <Label htmlFor="password">Password</Label>

                                <div className="with-eye-btn">
                                    <Input
                                        id="password"
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        value={password}
                                        className="block mt-1 w-full"
                                        onChange={event =>
                                            setPassword(event.target.value)
                                        }
                                        required
                                        autoComplete="current-password"
                                    />

                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="eye-btn">
                                        {showPassword ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none">
                                                <g clipPath="url(#clip0_1752_80)">
                                                    <path
                                                        d="M2.54166 7.75833C2.50624 7.65255 2.49241 7.54072 2.50101 7.42949C2.50961 7.31827 2.54046 7.2099 2.59172 7.11081C2.64299 7.01172 2.71362 6.92394 2.79945 6.85266C2.88527 6.78139 2.98453 6.72807 3.09134 6.69587C3.19815 6.66367 3.31035 6.65324 3.42126 6.66521C3.53218 6.67718 3.63957 6.71129 3.73705 6.76554C3.83454 6.81978 3.92014 6.89304 3.98878 6.98099C4.05743 7.06893 4.10771 7.16976 4.13666 7.2775C5.87499 13.0992 14.1217 13.1 15.8617 7.28083C15.8928 7.17589 15.9444 7.07811 16.0134 6.99309C16.0824 6.90806 16.1674 6.83746 16.2637 6.7853C16.3599 6.73314 16.4655 6.70046 16.5744 6.68911C16.6833 6.67777 16.7934 6.68798 16.8983 6.71917C17.0033 6.75036 17.1011 6.80191 17.1861 6.87089C17.2711 6.93987 17.3417 7.02491 17.3939 7.12118C17.446 7.21744 17.4787 7.32303 17.49 7.43193C17.5014 7.54082 17.4912 7.65089 17.46 7.75583C17.1568 8.79849 16.6425 9.76771 15.9492 10.6033L17.0117 11.6667C17.1635 11.8238 17.2475 12.0343 17.2456 12.2528C17.2437 12.4713 17.156 12.6803 17.0015 12.8348C16.847 12.9894 16.638 13.077 16.4195 13.0789C16.201 13.0808 15.9905 12.9968 15.8333 12.845L14.7408 11.7525C14.1512 12.1971 13.4999 12.5533 12.8075 12.81L13.105 13.9225C13.1367 14.0292 13.1468 14.1412 13.1345 14.2518C13.1222 14.3625 13.0879 14.4696 13.0336 14.5667C12.9793 14.6639 12.906 14.7492 12.8182 14.8176C12.7303 14.886 12.6297 14.9361 12.5221 14.9649C12.4146 14.9938 12.3024 15.0008 12.1921 14.9855C12.0818 14.9703 11.9757 14.9331 11.8801 14.8762C11.7844 14.8192 11.7011 14.7437 11.6351 14.6541C11.5691 14.5644 11.5218 14.4624 11.4958 14.3542L11.1925 13.2233C10.4033 13.34 9.59666 13.34 8.80749 13.2233L8.50416 14.3542C8.47823 14.4624 8.43087 14.5644 8.36487 14.6541C8.29887 14.7437 8.21558 14.8192 8.11991 14.8762C8.02424 14.9331 7.91814 14.9703 7.80786 14.9855C7.69758 15.0008 7.58536 14.9938 7.47784 14.9649C7.37031 14.9361 7.26965 14.886 7.18181 14.8176C7.09396 14.7492 7.02071 14.6639 6.96638 14.5667C6.91205 14.4696 6.87775 14.3625 6.86548 14.2518C6.85322 14.1412 6.86326 14.0292 6.89499 13.9225L7.19249 12.81C6.50004 12.5531 5.84874 12.1965 5.25916 11.7517L4.16749 12.845C4.01124 13.0015 3.79922 13.0895 3.57808 13.0896C3.35694 13.0898 3.1448 13.0021 2.98833 12.8458C2.83185 12.6896 2.74385 12.4776 2.7437 12.2564C2.74354 12.0353 2.83124 11.8231 2.98749 11.6667L4.04999 10.6042C3.39666 9.82417 2.87499 8.87583 2.53999 7.75917"
                                                        fill="#B5B5B5"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_1752_80">
                                                        <rect
                                                            width="20"
                                                            height="20"
                                                            fill="white"
                                                        />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none">
                                                <path
                                                    d="M9.99998 7.5C9.33694 7.5 8.70105 7.76339 8.23221 8.23223C7.76337 8.70107 7.49998 9.33696 7.49998 10C7.49998 10.663 7.76337 11.2989 8.23221 11.7678C8.70105 12.2366 9.33694 12.5 9.99998 12.5C10.663 12.5 11.2989 12.2366 11.7677 11.7678C12.2366 11.2989 12.5 10.663 12.5 10C12.5 9.33696 12.2366 8.70107 11.7677 8.23223C11.2989 7.76339 10.663 7.5 9.99998 7.5ZM9.99998 14.1667C8.89491 14.1667 7.8351 13.7277 7.0537 12.9463C6.2723 12.1649 5.83331 11.1051 5.83331 10C5.83331 8.89493 6.2723 7.83512 7.0537 7.05372C7.8351 6.27232 8.89491 5.83333 9.99998 5.83333C11.105 5.83333 12.1649 6.27232 12.9463 7.05372C13.7277 7.83512 14.1666 8.89493 14.1666 10C14.1666 11.1051 13.7277 12.1649 12.9463 12.9463C12.1649 13.7277 11.105 14.1667 9.99998 14.1667ZM9.99998 3.75C5.83331 3.75 2.27498 6.34167 0.833313 10C2.27498 13.6583 5.83331 16.25 9.99998 16.25C14.1666 16.25 17.725 13.6583 19.1666 10C17.725 6.34167 14.1666 3.75 9.99998 3.75Z"
                                                    fill="#B5B5B5"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                </div>

                                <InputError
                                    messages={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            {/* Remember Me */}
                            <div className="mt-3 flex w-100 items-center justify-content-between">
                                <label
                                    htmlFor="remember_me"
                                    className="inline-flex items-center">
                                    <input
                                        id="remember_me"
                                        type="checkbox"
                                        name="remember"
                                        className="rounded border-gray-300 text-yellow-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        onChange={event =>
                                            setShouldRemember(
                                                event.target.checked,
                                            )
                                        }
                                    />

                                    <span className="ml-2 text-sm text-gray-600">
                                        Remember me
                                    </span>
                                </label>
                                <div className="forget-text-color">
                                    <Link
                                        href="/forgot-password"
                                        className="underline text-sm ">
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <Button
                                    className="ml-3"
                                    type="submit"
                                >
                                    {isLoading ? "Logining..." : "Login"}

                                </Button>
                            </div>
                        </form>
                    </div>
                </AuthCard>
            </GuestLayout>
            <Footer />
        </>
    )

}

export default Login
