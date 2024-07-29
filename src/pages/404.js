import Header from "@/components/Layouts/Header"
import Head from "next/head"

const NotFoundPage = () => (
    <>
    <Head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
        <title>Smart Card Generator</title>
        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://smartcardgenerator.net/404"/>
        <meta property="description" content= "Welcome to Smart Card Generator, your go-to destination for creating dynamic and efficient QR codes. We believe in simplifying the process of generating QR codes to empower businesses, individuals, and organizations with versatile and powerful tools." />
        <meta property="og:description" content="Welcome to Smart Card Generator, your go-to destination for creating dynamic and efficient QR codes. We believe in simplifying the process of generating QR codes to empower businesses, individuals, and organizations with versatile and powerful tools."/>
        <meta property="og:title" content="Smart Card Generator"/>
        <meta property="og:image" content="/img/meta_image/home-page.jpg"/>
        <meta property="image" content="/img/meta_image/home-page.jpg"/>
        <meta property="og:site_name" content="Smart Card Generator"/>
    </Head>
    <Header/>
    <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
        <div className="max-w-xl mx-auto sm:px-6 lg:px-8">
            <div className="flex items-center pt-8 sm:justify-start sm:pt-0">
                <div className="px-4 text-lg text-gray-500 border-r border-gray-400 tracking-wider">
                    404
                </div>

                <div className="ml-4 text-lg text-gray-500 uppercase tracking-wider">
                    Not Found
                </div>
            </div>
        </div>
    </div>
    </>
)

export default NotFoundPage
