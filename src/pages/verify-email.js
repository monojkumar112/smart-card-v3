import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import Button from '@/components/Button'
import GuestLayout from '@/components/Layouts/GuestLayout'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useState, useEffect } from 'react'
import Header from '@/components/Layouts/Header'
import Footer from '@/components/Layouts/Footer'
import { useRouter } from 'next/router'

const VerifyEmail = () => {
    const { resendEmailVerification, user, logout } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: '/dashboard',
    })
    const router = useRouter()


    useEffect(() => {
        if (user) {
            if (user.email_verified_at == null) {
                router.push('/verify-email');
            } else {
                router.push('/dashboard');
            }
        }
    }, [user, router]);

    const [status, setStatus] = useState(null)

    return (
        <>
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
                            Thanks for signing up! Before getting started, could
                            you verify your email address by clicking on the
                            link we just emailed to you? If you didn't receive
                            the email, we will gladly send you another.
                        </div>
                        {status === 'verification-link-sent' && (
                            <div className="mb-4 font-medium text-sm text-green-600">
                                A new verification link has been sent to the
                                email address you provided during registration.
                            </div>
                        )}
                        <div className="login-wrapper">
                            <div className="mt-4  items-center justify-between">
                                <Button
                                    onClick={() =>
                                        resendEmailVerification({ setStatus })
                                    }>
                                    Resend Verification Email
                                </Button>


                            </div>
                        </div>


                    </div>
                </AuthCard>
            </GuestLayout>

            <Footer />
        </>
    )
}

export default VerifyEmail
