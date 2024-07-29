import Footer from '@/components/Layouts/Footer'
import Header from '@/components/Layouts/Header'
import React from 'react'
import Head from 'next/head'
import PaymentLogoImg from '@/components/PaymentLogoImg'

const ContactUsPage = () => {
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
                    content="https://smartcardgenerator.net/contact-us"
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
                    <img src="/img/home/contact-us.svg" alt="" />
                </div>

                <div className="container">
                    <div className="row d-flex align-items-center justify-content-center contact-us-wrapper">
                        <div className="col-md-10">
                            <div className="contact-us-header">
                                <h1>Get In Touch With Us</h1>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <p>
                                Have questions or feedback? We'd love to hear
                                from you! Reach out to us via email at
                                info.womenindigital@gmail.com or use the form
                                below to get in touch. Our team is here to
                                assist you with any inquiries or concerns you
                                may have.
                            </p>
                            <div className="contact-address">
                                <ul>
                                    <li>
                                        <div className="contact-item">
                                            <svg
                                                width="18"
                                                height="24"
                                                viewBox="0 0 18 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M9 24C9 24 18 15.471 18 9C18 6.61305 17.0518 4.32387 15.364 2.63604C13.6761 0.948211 11.3869 0 9 0C6.61305 0 4.32387 0.948211 2.63604 2.63604C0.948211 4.32387 3.55683e-08 6.61305 0 9C0 15.471 9 24 9 24ZM9 13.5C7.80653 13.5 6.66193 13.0259 5.81802 12.182C4.97411 11.3381 4.5 10.1935 4.5 9C4.5 7.80653 4.97411 6.66193 5.81802 5.81802C6.66193 4.97411 7.80653 4.5 9 4.5C10.1935 4.5 11.3381 4.97411 12.182 5.81802C13.0259 6.66193 13.5 7.80653 13.5 9C13.5 10.1935 13.0259 11.3381 12.182 12.182C11.3381 13.0259 10.1935 13.5 9 13.5Z"
                                                    fill="#fff"
                                                />
                                            </svg>
                                        </div>

                                        <div className="contact-content-item">
                                            <h2>Location:</h2>
                                            <p>
                                                50-51, Janata Co-operative
                                                Housing Society, Ring Road,
                                                Mohammadpur, Dhaka - 1207.
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="contact-item">
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M23.9468 1.0287C24.0014 0.892402 24.0147 0.743093 23.9852 0.599281C23.9557 0.455468 23.8847 0.323476 23.7809 0.219667C23.6771 0.115859 23.5451 0.0447997 23.4013 0.0152988C23.2574 -0.014202 23.1081 -0.00084688 22.9718 0.0537084L1.15161 8.7821H1.15011L0.472119 9.05209C0.343706 9.10332 0.23195 9.18904 0.149196 9.29979C0.0664425 9.41054 0.0159114 9.54201 0.00318479 9.67967C-0.00954186 9.81734 0.0160312 9.95584 0.0770792 10.0799C0.138127 10.2039 0.232274 10.3087 0.34912 10.3826L0.964113 10.7726L0.965613 10.7756L8.45802 15.5425L13.225 23.0349L13.228 23.0379L13.618 23.6529C13.6921 23.7693 13.7969 23.863 13.9209 23.9237C14.0448 23.9843 14.1831 24.0096 14.3205 23.9967C14.4579 23.9839 14.5891 23.9333 14.6996 23.8507C14.8101 23.7681 14.8957 23.6566 14.9469 23.5284L23.9468 1.0287ZM21.1974 3.86366L9.9565 15.1045L9.634 14.5975C9.57491 14.5045 9.49604 14.4256 9.40301 14.3665L8.89601 14.044L20.1369 2.80317L21.9038 2.09668L21.1989 3.86366H21.1974Z"
                                                    fill="#FFFFFF"
                                                />
                                            </svg>
                                        </div>

                                        <div className="contact-content-item">
                                            <h2>Email:</h2>
                                            <p>info@womenindigital.net</p>
                                            <p>womenindigital.net@gmail.com</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="contact-item">
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M2.82812 0.765291C3.09057 0.503212 3.40572 0.299907 3.75268 0.168848C4.09965 0.0377897 4.4705 -0.0180293 4.84066 0.00509005C5.21083 0.0282094 5.57185 0.129739 5.89982 0.302951C6.22778 0.476164 6.51519 0.717103 6.743 1.0098L9.43541 4.46896C9.9289 5.10349 10.1029 5.93003 9.9079 6.71006L9.08742 9.99521C9.045 10.1654 9.04729 10.3436 9.09407 10.5126C9.14086 10.6816 9.23054 10.8356 9.35441 10.9598L13.0398 14.6454C13.164 14.7696 13.3183 14.8594 13.4876 14.9062C13.6569 14.953 13.8354 14.9551 14.0058 14.9124L17.2892 14.0919C17.6741 13.9957 18.0758 13.9882 18.464 14.07C18.8523 14.1519 19.2168 14.321 19.5301 14.5644L22.989 17.2555C24.2324 18.2231 24.3464 20.0607 23.2335 21.1722L21.6825 22.7233C20.5726 23.8333 18.9136 24.3209 17.3672 23.7763C13.4091 22.3836 9.81531 20.1174 6.85249 17.146C3.88152 14.1834 1.61557 10.5899 0.222699 6.63206C-0.320284 5.08699 0.167201 3.42641 1.27717 2.31636L2.82812 0.765291Z"
                                                    fill="#FFFFFF"
                                                />
                                            </svg>
                                        </div>

                                        <div className="contact-content-item">
                                            <h2>Mobile:</h2>
                                            <p>+8801635-497868</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="contact-us-content">
                                <form action="">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-input-list">
                                                <label htmlFor="name">
                                                    Name:*
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-input-list">
                                                <label htmlFor="email">
                                                    Email:*
                                                </label>
                                                <input
                                                    id="email"
                                                    type="text"
                                                    name="email"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-input-list">
                                                <label htmlFor="phone">
                                                    Phone:*
                                                </label>
                                                <input
                                                    type="text"
                                                    id="phone"
                                                    name="phone"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-input-list">
                                                <label htmlFor="address">
                                                    Address:*
                                                </label>
                                                <input
                                                    type="text"
                                                    name="address"
                                                    id="address"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-input-list">
                                                <label htmlFor="description">
                                                    Message:*
                                                </label>

                                                <textarea
                                                    name="description"
                                                    id="description"
                                                    cols="30"
                                                    rows="6"
                                                    className="form-control"></textarea>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <button
                                                className="contact-btn mt-3"
                                                type="submit">
                                                Send
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default ContactUsPage
