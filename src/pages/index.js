import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useReactToPrint } from 'react-to-print'
import { useState, useRef } from 'react'
import Footer from '@/components/Layouts/Footer'
import QRCode from 'qrcode.react'
import Header from '@/components/Layouts/Header'
import html2canvas from 'html2canvas'
import PaymentLogoImg from '@/components/PaymentLogoImg'
import PricingCard from './components/Pricing';

export default function Home() {
    const { user } = useAuth({ middleware: 'guest' })
    const elementRef = useRef(null)

    const handleDownload = async () => {
        const element = elementRef.current

        if (!element) {
            console.error('Ref not found')
            return
        }

        try {
            const canvas = await html2canvas(element)
            const dataUrl = canvas.toDataURL('image/png')

            const link = document.createElement('a')
            link.download = 'smartcardgenerator.png'
            link.href = dataUrl
            link.click()
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const [inputField, setInputField] = useState({
        smarturl: '',
    })

    const inputsHandler = e => {
        e.persist()
        setInputField({
            ...inputField,
            [e.target.name]: e.target.value,
        })
    }

    const inputFieldRef = useRef(null)

    const handleSmartUrlClick = () => {
        // Trigger a click on the input field
        if (inputFieldRef.current) {
            inputFieldRef.current.focus()
        } else {
            console.error('Ref not initialized for input field')
        }
    }
    return (
        <>
            <Head>
                <meta charset="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                <title>Smart Card Generator</title>
                <meta property="og:type" content="website" />
                <meta
                    property="og:url"
                    content="https://smartcardgenerator.net"
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
                <meta property="og:title" content="Smart Card Generator" />
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
            {/* ============= Hero Section ================ */}

            {/* ============= Hero Section ================ */}
            <section className="hero-wrapper">
                <div
                    className="hero-section"
                    style={{
                        backgroundImage: 'url(./img/hero-img.png)',
                    }}>
                    <div className="container">
                        <div className="hero-content">
                            <div className="row">
                                <div className="col-lg-7 col-md-12">
                                    <div className="qr-input-item-wrapper">
                                        <div className="qr-input-items">
                                            <div className="qr-input-list-items">
                                                <Link href={'/register'}>
                                                    <div className="qr-input-list-item">
                                                        <span>
                                                            <img
                                                                src="/img/1.svg"
                                                                alt=""
                                                            />
                                                        </span>
                                                        <p>
                                                            Smart Visiting Card
                                                        </p>
                                                    </div>
                                                </Link>
                                                <div
                                                    className="qr-input-list-item"
                                                    id="smarturl"
                                                    onClick={
                                                        handleSmartUrlClick
                                                    }>
                                                    <span>
                                                        <img
                                                            src="/img/icon/www.svg"
                                                            alt=""
                                                        />
                                                    </span>
                                                    <p>Smart URL</p>
                                                </div>
                                            </div>
                                            <div className="qr-input-list-items">
                                                <Link href={'/register'}>
                                                    <div className="qr-input-list-item">
                                                        <span>
                                                            <img
                                                                src="/img/3.svg"
                                                                alt=""
                                                            />
                                                        </span>
                                                        <p>
                                                            Smart Profile
                                                            Creator
                                                        </p>
                                                    </div>
                                                </Link>
                                                <Link href={'/coming-soon'}>
                                                    <div className="qr-input-list-item">
                                                        <span>
                                                            <img
                                                                src="/img/2.svg"
                                                                alt=""
                                                            />
                                                        </span>
                                                        <p>Smart Resume</p>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="qr-input-content">
                                            <h4>Enter your website</h4>
                                            <p>
                                                (Your QR Code will be generated
                                                automatically)
                                            </p>
                                            <div className="input-group mt-2">
                                                <input
                                                    type="text"
                                                    id="smarturl"
                                                    className="form-control"
                                                    name="smarturl"
                                                    placeholder="Enter Your Website Link"
                                                    onChange={inputsHandler}
                                                    value={inputField.smarturl}
                                                    ref={inputFieldRef}
                                                />
                                            </div>
                                            <Link href={'/register'}>
                                                <button className="custom-btn">
                                                    Signup for Free
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-5 col-md-12">
                                    <div className="qr-code-item">
                                        <Link
                                            href={'/login'}
                                            to={user ? '/website' : '/login'}>
                                            <div className="with-logo">
                                                <img
                                                    src="/img/icon/with-logo.png"
                                                    alt=""
                                                />
                                            </div>
                                        </Link>
                                        <div
                                            className="qr-code-img"
                                            ref={elementRef}>
                                            <QRCode
                                                value={inputField.smarturl}
                                                size={250}
                                            />
                                        </div>
                                        <button
                                            className="qr-code-download-btn custom-btn"
                                            onClick={handleDownload}>
                                            DOWNLOAD
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* ======== Input Website ============ */}


            {/* ============= Smart Card Plus Roadmap =========== */}
            <section className="vCard-roadmap">
                <div className="container">
                    <div className="vCard-roadmap-wrapper">
                        <div className="vcard-roadmap-title">
                            <h4>How do I create a free vCard Plus?</h4>
                        </div>
                        <div className="vcard-roadmap-content">
                            <div className="vcard-roadmap-content-items">
                                <div className="vcard-roadmap-content-item">
                                    <div className="roadmap-img">
                                        <img
                                            src="/img/home/roadmap-1.svg"
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <div className="vcard-roadmap-content-item">
                                    <h3>Create a free account</h3>
                                    <p>
                                        Here you go, a general guide on creating
                                        a free account at Smart Card Generator.
                                        Initially locate the Register Button at
                                        the top right corner of the homepage and
                                        click on the designated button to
                                        initiate the account creation process.
                                        Afterwards, provide the required
                                        information such as name, email address,
                                        password and confirm password. Lastly,
                                        click on the Register button to complete
                                        your registration.
                                    </p>
                                </div>
                            </div>
                            <div className="vcard-roadmap-content-items vcard-roadmap-content-items-2">
                                <div className="vcard-roadmap-content-item">
                                    <h3>Fill in the details</h3>
                                    <p>
                                        You must need to put values in all the
                                        required fields for registration along
                                        with generating a QR code such as
                                        display picture, name, phone numbers,
                                        email address, living address, and
                                        company information. You will not be
                                        able to submit the QR-generating form
                                        unless you fill in all the required
                                        details.
                                    </p>
                                </div>
                                <div className="vcard-roadmap-content-item vcard-roadmap-content-item2">
                                    <div className="roadmap-img">
                                        <img
                                            src="/img/home/roadmap-2.svg"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="vcard-roadmap-content-items">
                                <div className="vcard-roadmap-content-item ">
                                    <div className="roadmap-img">
                                        <img
                                            src="/img/home/roadmap-3.svg"
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <div className="vcard-roadmap-content-item vcard-roadmap-content-item3">
                                    <h3>Download the QR Code</h3>
                                    <p>
                                        Once you have provided all necessary
                                        information and completed generating the
                                        QR code, The site will take you to your
                                        dashboard where you will be able to see
                                        your QR code and download option.
                                        Clicking the download button, you have
                                        downloaded the QR code linked with your
                                        personal profile.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <PaymentLogoImg/> */}

            <section>
                <div className="pricing-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="pricing-area-title">
                                    <h2>
                                        Plans & Pricing
                                    </h2>
                                    <p>
                                        Find a plan that suits your needs
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <PricingCard />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}
