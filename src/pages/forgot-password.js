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
import { useState } from 'react'
import Header from '@/components/Layouts/Header'
import Head from 'next/head'
import Footer from '@/components/Layouts/Footer'

const ForgotPassword = () => {
    const { forgotPassword } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)
    const [success, setSuccess] = useState(null) // Added state for success message

    const submitForm = async event => {
        event.preventDefault();

        await forgotPassword({ email, setErrors, setStatus, setSuccess });
        // console.log('Password reset email sent successfully.'); // Log the success message
        setSuccess("Password reset email sent successfully.")
    };


    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                <title>Forgot Password - Smart Card Generator</title>
                <meta property="og:type" content="website" />
                <meta
                    property="og:url"
                    content="https://smartcardgenerator.net/forgot-password"
                />
                <meta
                    property="description"
                    content="Welcome to Smart Card Generator. This Cookie Policy explains how we use cookies and similar technologies on our website and platform. By using our services, you consent to the use of cookies as described in this policy."
                />
                <meta
                    property="og:description"
                    content="Welcome to Smart Card Generator. This Cookie Policy explains how we use cookies and similar technologies on our website and platform. By using our services, you consent to the use of cookies as described in this policy."
                />
                <meta property="og:type" content="Description" />
                <meta
                    property="og:title"
                    content="Forgot Password - Smart Card Generator"
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
                            <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                        </Link>
                    }>
                    <div className="forget-page">
                        <div className="mb-4 text-sm text-gray-600">
                            Forgot your password? No problem. Just let us know
                            your email address and we will email you a password
                            reset link that will allow you to choose a new one.
                        </div>

                        {/* Session Status */}
                        <AuthSessionStatus className="mb-4" status={status} />

                        {/* Success Message */}
                        {success && (
                            <div className="mb-4 text-green-500">{success}</div>
                        )}
                        <div className="login-wrapper">
                            <form onSubmit={submitForm}>
                                {/* Email Address */}
                                <div>
                                    <Label htmlFor="email" className={'text-start'}>Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
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

                                <div className="flex items-center justify-end mt-4">
                                    <Button>Email Password Reset Link</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </AuthCard>
            </GuestLayout>
            <Footer />
        </>
    )
}

export default ForgotPassword
