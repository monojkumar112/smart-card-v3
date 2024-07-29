import Footer from '@/components/Layouts/Footer'
import Header from '@/components/Layouts/Header'
import Head from 'next/head'
import React from 'react'

const ComingSoonPage = () => {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                <title>Coming Soon - Smart Card Generator</title>
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://smartcardgenerator.net/coming-soon" />
                <meta property="description" content="At Smart Card Generator, our mission is to provide a user-friendly and innovative solution for creating QR codes that meet the diverse needs of our users. We aim to streamline the QR code generation process, making it accessible to small businesses and large enterprises." />
                <meta property="og:description" content="At Smart Card Generator, our mission is to provide a user-friendly and innovative solution for creating QR codes that meet the diverse needs of our users. We aim to streamline the QR code generation process, making it accessible to small businesses and large enterprises." />
                <meta property="og:type" content="Description" />
                <meta property="og:title" content="Coming Soon - Smart Card Generator" />
                <meta property="og:image" content="/img/meta_image/home-page.jpg" />
                <meta property="image" content="/img/meta_image/home-page.jpg" />
                <meta property="og:site_name" content="Smart Card Generator" />
            </Head>
            <Header />
            <div className="cooming-soon-img w-100">
                <img src="/img/coming-soon.jpg" alt="Image not found" />
            </div>
            <Footer />
        </>
    )
}

export default ComingSoonPage
