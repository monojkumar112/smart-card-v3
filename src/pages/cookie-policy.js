import Footer from '@/components/Layouts/Footer'
import Header from '@/components/Layouts/Header'
import React from 'react'
import Head from 'next/head'

const CookiePolicyPage = () => {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                <title>Cookie Policy - Smart Card Generator</title>
                <meta property="og:type" content="website" />
                <meta
                    property="og:url"
                    content="https://smartcardgenerator.net/cookie-policy"
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
                    content="Cookie Policy - Smart Card Generator"
                />
                <meta
                    property="og:image"
                    content="/img/meta_image/cookie.jpg"
                />
                <meta property="image" content="/img/meta_image/cookie.jpg" />
                <meta property="og:site_name" content="Smart Card Generator" />
            </Head>
            <Header />

            <div className="faq-question-wrapper">
                <div className="faq-img">
                    <img src="/img/home/cooke.svg" alt="" />
                </div>
                <div className="container">
                    <div className="row d-flex align-items-center justify-content-center">
                        <div className="col-md-10">
                            <div className=" faq-content-wrapper">
                                <h1>Cookie Policy for Smart Card Generator</h1>
                                <div className="faq-content-item">
                                    <h2>1. Introduction</h2>
                                    <p>
                                        Welcome to Smart Card Generator. This
                                        Cookie Policy explains how we use
                                        cookies and similar technologies on our
                                        website and platform. By using our
                                        services, you consent to the use of
                                        cookies as described in this policy.
                                    </p>
                                </div>
                                <div className="faq-content-item">
                                    <h2>2. What are Cookies?</h2>
                                    <p>
                                        Cookies are small text files that are
                                        placed on your device when you visit our
                                        website. They help us provide you with a
                                        better user experience by enabling the
                                        platform to remember your preferences,
                                        analyze performance, and deliver
                                        relevant content.
                                    </p>
                                </div>
                                <div className="faq-content-item">
                                    <h2>3. Types of Cookies We Use</h2>
                                    <h3>Essential Cookies</h3>
                                    <p>
                                        These cookies are necessary for the
                                        proper functioning of our platform. They
                                        enable you to navigate and use essential
                                        features, such as generating QR codes
                                        and accessing your account.
                                    </p>
                                </div>
                                <div className="faq-content-item">
                                    <h2>Analytics Cookies</h2>
                                    <p>
                                        We use analytics cookies to collect
                                        information about how users interact
                                        with our platform. This helps us improve
                                        our services, identify areas for
                                        enhancement, and understand user
                                        preferences.
                                    </p>
                                </div>
                                <div className="faq-content-item">
                                    <h2>Advertising Cookies</h2>
                                    <p>
                                        We may use advertising cookies to
                                        deliver personalized advertisements to
                                        you based on your interests and online
                                        behavior.
                                    </p>
                                </div>
                                <div className="faq-content-item">
                                    <h2>Third-Party Cookies</h2>
                                    <p>
                                        Some cookies may be placed by
                                        third-party services integrated into our
                                        platform, such as analytics providers or
                                        advertising partners.
                                    </p>
                                </div>
                                <div className="faq-content-item">
                                    <h2>4. How to Manage Cookies</h2>
                                    <p>
                                        You can manage cookie preferences
                                        through your browser settings. Most
                                        browsers allow you to block or delete
                                        cookies. However, please note that
                                        blocking essential cookies may or may
                                        not impact the functionality of our
                                        platform.
                                    </p>
                                </div>
                                <div className="faq-content-item">
                                    <h2>5. Consent</h2>
                                    <p>
                                        By using our platform, you consent to
                                        the use of cookies in accordance with
                                        this policy. We may ask for your
                                        explicit consent for non-essential
                                        cookies through a cookie banner or
                                        pop-up.
                                    </p>
                                </div>
                                <div className="faq-content-item">
                                    <h2>6. Changes to the Cookie Policy</h2>
                                    <p>
                                        We may update this Cookie Policy to
                                        reflect changes in our practices or
                                        legal requirements. Any updates will be
                                        posted on this page with the revised
                                        effective date.
                                    </p>
                                    <br />
                                    <p>
                                        If you have any questions or concerns
                                        about our use of cookies, please contact
                                        us at pm.womenindigital@gmail.com.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default CookiePolicyPage
