import React, { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Header from '@/components/Layouts/Header'
import Footer from '@/components/Layouts/Footer'
import { useAuth } from '@/hooks/auth'
import GuestLayout from '@/components/Layouts/GuestLayout'
import AuthCard from '@/components/AuthCard'
import Link from 'next/link';

const VerifyEmail = () => {
    const { user } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: '/dashboard',
    })



    const router = useRouter();
    const { query } = router;

    useEffect(() => {
        const verificationUrl = query.verification_url;

        if (verificationUrl) {
            axios.get(verificationUrl)
                .then(response => {
                    router.push('/dashboard');
                })
                .catch(error => {
                    // Handle verification error
                    console.error('Verification failed', error);
                });
        }
    }, [query, router]);

    return (

        <>
            <Header />
            <GuestLayout>
                <AuthCard>
                    <div style={{ height: '60vh' }}>
                        <div>
                            <p>Your Email Verified Complete.</p>
                            <Link href="/dashboard">
                                <ul>
                                    <li className="custom-btn">Click here</li>
                                </ul>
                            </Link>
                        </div>
                    </div>
                </AuthCard>
            </GuestLayout >

            <Footer />
        </>

    );
};

export default VerifyEmail;
