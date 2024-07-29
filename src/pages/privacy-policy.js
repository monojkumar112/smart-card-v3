import Footer from '@/components/Layouts/Footer'
import Header from '@/components/Layouts/Header'
import React from 'react'
import Head from 'next/head'

const PrivacyPolicyPage = () => {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                <title>Privacy Policy - Smart Card Generator</title>
                <meta property="og:type" content="website" />
                <meta
                    property="og:url"
                    content="https://smartcardgenerator.net/privacy-policy"
                />
                <meta
                    property="description"
                    content="Welcome to Smart Card Generator! We value your trust and are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, disclose, and safeguard your personal information."
                />
                <meta
                    property="og:description"
                    content="Welcome to Smart Card Generator! We value your trust and are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, disclose, and safeguard your personal information."
                />
                <meta property="og:type" content="Description" />
                <meta
                    property="og:title"
                    content="Privacy Policy - Smart Card Generator"
                />
                <meta
                    property="og:image"
                    content="/img/meta_image/privacy.jpg"
                />
                <meta property="image" content="/img/meta_image/privacy.jpg" />
                <meta property="og:site_name" content="Smart Card Generator" />
            </Head>
            <Header />

            <div className="faq-question-wrapper">
                <div className="faq-img">
                    <img src="/img/home/privacy.svg" alt="" />
                </div>
                <div className="container">
                    <div className="row d-flex align-items-center justify-content-center">
                        <div className="col-md-10">
                            <div className="faq-content-wrapper">
                                <div className="faq-content-item">
                                    <h2>Overview:</h2>
                                    <p>
                                        Welcome to Smart Card Generator! We
                                        value your trust and are committed to
                                        protecting your privacy. This Privacy
                                        Policy outlines how we collect, use,
                                        disclose, and safeguard your personal
                                        information.
                                    </p>
                                </div>
                                <h1>Information We Collect:</h1>
                                <div className="faq-content-item">
                                    <h2>1. Personal Information:</h2>
                                    <p>
                                        - When you use our services, we may
                                        collect personal information such as
                                        your name, contact details, and other
                                        information you provide voluntarily.
                                    </p>
                                </div>
                                <div className="faq-content-item">
                                    <h2>2. Device Information:</h2>
                                    <p>
                                        - We are not collecting information
                                        about the device you are using,
                                        including the device type, operating
                                        system, and unique device identifiers.
                                    </p>
                                </div>
                                <div className="faq-content-item">
                                    <h2>3. Usage Data:</h2>
                                    <p>
                                        - We may collect data about how you
                                        interact with our services, including
                                        pages visited, features used, and other
                                        usage patterns.
                                    </p>
                                </div>
                                <h1>How We Use Your Information:</h1>
                                <div className="faq-content-item">
                                    <h2>1. Providing Services:</h2>
                                    <p>
                                        - We use the collected information to
                                        deliver, maintain, and improve our
                                        services, ensuring a personalized and
                                        seamless user experience.
                                    </p>
                                </div>
                                <div className="faq-content-item">
                                    <h2> 2. Communication:</h2>
                                    <p>
                                        - We may use your contact information to
                                        communicate with you, providing updates,
                                        support, and information related to our
                                        services.
                                    </p>
                                </div>
                                <div className="faq-content-item">
                                    <h2>3. Analytics</h2>
                                    <p>
                                        - We analyze user behavior and patterns
                                        to enhance our services, troubleshoot
                                        issues, and optimize the user
                                        experience.
                                    </p>
                                </div>
                                <h1>Information Sharing:</h1>
                                <div className="faq-content-item">
                                    <h2> 1. Third-Party Service Providers:</h2>
                                    <p>
                                        - We may share your information with
                                        third-party service providers who assist
                                        us in delivering our services.
                                    </p>
                                </div>
                                <div className="faq-content-item">
                                    <h2>2. Legal Compliance:</h2>
                                    <p>
                                        - We may disclose information to comply
                                        with legal obligations, protect our
                                        rights, and ensure the safety of users.
                                    </p>
                                </div>
                                <h1>Security:</h1>
                                <div className="faq-content-item">
                                    <h2> 1. Data Security:</h2>
                                    <p>
                                        - We implement industry-standard
                                        security measures to protect your data
                                        from unauthorized access, alteration,
                                        disclosure, or destruction.
                                    </p>
                                </div>
                                <h1>Your Choices:</h1>
                                <div className="faq-content-item">
                                    <h2> 1.Opt-Out:</h2>
                                    <p>
                                        - You can opt-out of receiving
                                        promotional emails or newsletters by
                                        following the instructions in the
                                        emails.
                                    </p>
                                </div>
                                <div className="faq-content-item">
                                    <h2> 2. Access and Correction:</h2>
                                    <p>
                                        - You have the right to access, correct,
                                        or delete your personal information.
                                        Contact us at [contact@email.com] for
                                        assistance.
                                    </p>
                                </div>
                                <div className="faq-content-item">
                                    <h2> Updates to this Privacy Policy:</h2>
                                    <p>
                                        We may update this Privacy Policy to
                                        reflect changes in our practices. We
                                        encourage you to review this policy
                                        periodically.
                                    </p>
                                </div>
                                <div className="faq-content-item">
                                    <h2>Contact Us:</h2>
                                    <p>
                                        If you have questions or concerns
                                        regarding this Privacy Policy, please
                                        contact us at [contact@email.com].
                                    </p>
                                    <br />
                                    <p>
                                        By using our services, you agree to the
                                        terms outlined in this Privacy Policy.
                                    </p>
                                    <br />
                                    <p>Powered By Women In Digital</p>
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

export default PrivacyPolicyPage
