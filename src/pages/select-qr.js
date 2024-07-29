import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/auth'

import checkSubscription from './api/checkSubscription';

const SelectQr = () => {
    const [activeItem, setActiveItem] = useState(null)
    const [subscription, setSubscription] = useState()
    const { user } = useAuth({ middleware: 'auth' })

    const handleItemClick = itemName => {
        setActiveItem(itemName)
        // Your other logic or actions here
    }

    useEffect(() => {
        const checkUserSubscription = async () => {
            if (!user || !user?.id) {
                return;
            }

            try {
                const subscribed = await checkSubscription(user?.id);
                if (subscribed) {
                    setSubscription(true)
                } else {
                    setSubscription(false)
                }
            } catch (error) {
                console.error('Error checking subscription:', error);
            }
        };

        checkUserSubscription();
    }, [user]);

    return (
        <AppLayout>
            <Head>
                <title>Create Smart Card</title>
            </Head>

            <section className="select-qr-wrapper">
                <div className="container">
                    <h4 className="select-qr-title">
                        Select your QR Code type
                    </h4>
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="row">
                                <div className="col-md-6">
                                    <Link href={'/website'}>
                                        <div className="select-qr-item">
                                            <div className="select-qr-item-icon">
                                                <img
                                                    src="/img/icons/website.svg"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="select-qr-content">
                                                <h4>Website</h4>
                                                <p>
                                                    Link to any page on the web
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                {/* <div className="col-md-6">
                                    <Link href={'/social-media'}>
                                        <div className="select-qr-item">
                                            <div className="select-qr-item-icon">
                                                <img
                                                    src="/img/icons/social.svg"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="select-qr-content">
                                                <h4>Social Media</h4>
                                                <p>
                                                    Link to your social media
                                                    channels
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </div> */}
                                <div className="col-md-6">
                                    <Link
                                        href={
                                            subscription
                                                ? '/createqr'
                                                : '/pricing'
                                        }>
                                        <div className="select-qr-item">
                                            <div className="select-qr-item-icon">
                                                <img
                                                    src="/img/icons/vcard.svg"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="select-qr-content">
                                                <h4>Smart visiting card</h4>
                                                <p>
                                                    Share personalized contact
                                                    details
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                {/* <div className="col-md-6">
                                    <Link href={'/business-page'}>
                                        <div className="select-qr-item">
                                            <div className="select-qr-item-icon">
                                                <img
                                                    src="/img/icons/business.svg"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="select-qr-content">
                                                <h4>Business Page</h4>
                                                <p>
                                                    Provide your company
                                                    information
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </div> */}
                                <div className="col-md-6">
                                    <Link href={'/instagram'}>
                                        <div className="select-qr-item">
                                            <div className="select-qr-item-icon">
                                                <img
                                                    src="/img/icons/instagram.svg"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="select-qr-content">
                                                <h4>Instagram</h4>
                                                <p>
                                                    Link to your Instagram
                                                    business page
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                {/* <div className="col-md-6">
                                    <Link href={'/resume'}>
                                        <div className="select-qr-item">
                                            <div className="select-qr-item-icon">
                                                <img
                                                    src="/img/icons/resume.svg"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="select-qr-content">
                                                <h4>Create Your Resume</h4>
                                                <p>
                                                    Link to your profile 
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </div> */}
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="select-qr-img">
                                <img
                                    src="/img/icons/select-qr-img.png"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    )
}

export default SelectQr
