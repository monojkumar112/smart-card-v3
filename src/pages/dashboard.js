import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useAuth } from '@/hooks/auth'
import QRCode from 'qrcode.react'
import Sidebar from 'components/sidebar'
import html2canvas from 'html2canvas'
import Popup from '@/components/Popup/Popup'

const Dashboard = () => {
    const { user, loading } = useAuth({ middleware: 'auth' })
    // const elementRef = useRef(null);
    const [subscription, setSubscription] = useState()
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    // useEffect(() => {
    //     if (user?.email_verified_at == null) {
    //         // alert('You are not verified User.')
    //         window.location.href = '/verify-email'
    //     }
    // }, [user])

    // const handleDownload = async () => {
    //     const element = elementRef.current

    //     if (!element) {
    //         console.error('Ref not found')
    //         return
    //     }

    //     try {
    //         const canvas = await html2canvas(element)
    //         const dataUrl = canvas.toDataURL('image/png')

    //         const link = document.createElement('a')
    //         link.download = 'smartcardgenerator.png'
    //         link.href = dataUrl
    //         link.click()
    //     } catch (error) {
    //         console.error('Error:', error)
    //     }
    // }
    const elementInRefs = useRef([])

    const handleInstaDownload = async () => {
        try {
            const promises = elementInRefs.current.map(
                async (element, index) => {
                    if (!element) {
                        console.error(`Ref not found for index ${index}`)
                        return
                    }
                    const canvas = await html2canvas(element)
                    const dataUrl = canvas.toDataURL('image/png')
                    const link = document.createElement('a')
                    link.download = `smartcardgenerator_${index}.png`
                    link.href = dataUrl
                    link.click()
                },
            )
            await Promise.all(promises)
        } catch (error) {
            console.error('Error:', error)
        }
    }
    const elementRefs = useRef([])
    const handleDownload = async () => {
        try {
            const promises = elementRefs.current.map(async (element, index) => {
                if (!element) {
                    console.error(`Ref not found for index ${index}`)
                    return
                }
                const canvas = await html2canvas(element)
                const dataUrl = canvas.toDataURL('image/png')
                const link = document.createElement('a')
                link.download = `smartcardgenerator_${index}.png`
                link.href = dataUrl
                link.click()
            })
            await Promise.all(promises)
        } catch (error) {
            console.error('Error:', error)
        }
    }
    const elementQrRefs = useRef([])

    const handleQRDownload = async () => {
        try {
            const promises = elementQrRefs.current.map(
                async (element, index) => {
                    if (!element) {
                        console.error(`Ref not found for index ${index}`)
                        return
                    }
                    const canvas = await html2canvas(element)
                    const dataUrl = canvas.toDataURL('image/png')
                    const link = document.createElement('a')
                    link.download = `smartcardgenerator_${index}.png`
                    link.href = dataUrl
                    link.click()
                },
            )
            await Promise.all(promises)
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const userId = user?.id
    const [getqr, setQRCode] = useState([])
    const [totalQrCount, setTotalQrCount] = useState(0)

    const baseuri = process.env.NEXT_PUBLIC_BACKEND_URL

    const handleQrDelete = async id => {
        try {
            const response = await axios.delete(`${baseuri}/api/deleteqr/${id}`)
            if (response.data.message) {
                setSuccessMessage('Smart Card QR deleted successfully')
                fetchUpdatedData()
                window.location.href = '/dashboard'
            } else {
                setErrorMessage('Smart Card QR deletion failed')
            }
        } catch (error) {
            console.log('Error deleting Smart Card QR:', error)
        }
    }
    const handleWebsiteDelete = async id => {
        try {
            const response = await axios.delete(
                `${baseuri}/api/delete_website/${id}`,
            )
            if (response.data.message) {
                // alert('Website deleted successfully')
                setSuccessMessage('Website deleted successfully')

                fetchUpdatedData()
                window.location.href = '/dashboard'
            } else {
                setErrorMessage('Website deletion failed')
            }
        } catch (error) {
            console.log('Error deleting Website:', error)
        }
    }
    const handleInstaDelete = async id => {
        try {
            const response = await axios.delete(
                `${baseuri}/api/delete_instagram/${id}`,
            )
            if (response.data.message) {
                // alert('Instagram deleted successfully')
                setSuccessMessage('Instagram deleted successfully')

                fetchUpdatedData()
                window.location.href = '/dashboard'
            } else {
                setErrorMessage('Instagram deletion failed')
            }
        } catch (error) {
            setErrorMessage('Error deleting Instagram:', error)
        }
    }

    const fetchUpdatedData = async () => {
        try {
            const response = await axios.get(`${baseuri}/api/getqr/${userId}`)
            setQRCode(response.data.getqr)
            setTotalQrCount(response.data.getqr.length)
        } catch (error) {
            console.error('Error fetching updated data:', error)
        }
    }

    // ============= Instagram  ====================

    const [getInstagram, setGetInstagram] = useState([])
    const fetchInstagramData = async () => {
        try {
            const response = await axios.get(
                `${baseuri}/api/get-instagram/${userId}`,
            )
            setGetInstagram(response.data.getInstagram)
        } catch (error) {
            console.error('Error fetching updated data:', error)
        }
    }

    // ========= Website ===========

    const [getWebsite, setGetWebsite] = useState([])
    const fetchWebsiteData = async () => {
        try {
            const response = await axios.get(
                `${baseuri}/api/get-website/${userId}`,
            )
            setGetWebsite(response.data.getWebsite)
        } catch (error) {
            console.error('Error fetching updated data:', error)
        }
    }
    useEffect(() => {
        fetchUpdatedData()
        fetchWebsiteData()
        fetchInstagramData()
    }, [userId])
    // ====================delete qr function --==========

    // ========================pause and resume function ==============?
    const [status, setStatus] = useState()

    const handleToggle = async id => {
        const newStatus = status === 'active' ? 'paused' : 'active'

        const response = await fetch(
            `${baseuri}/api/qrgen/toggle-status/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            },
        )

        if (response.ok) {
            setStatus(newStatus)
            fetchUpdatedData()
            alert(`Your QR Status Change`)
        } else {
            console.error('Failed to toggle status')
        }
    }

    const getStatusIcon = status =>
        status === 'active' ? (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="15"
                viewBox="0 0 16 15"
                fill="none">
                <g clipPath="url(#clip0_1664_139)">
                    <path
                        d="M14.2222 14.2222H0V0H10.9037V1.42222H1.42222V12.8H13.2741V7.58519H14.6963V14.2222H14.2222ZM2.65481 6.86222L3.72563 5.79141L6.93867 9.00444L15.0453 0.897778L16.1185 1.96622L6.93867 11.1461L2.65481 6.86222Z"
                        fill="#B5B5B5"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_1664_139">
                        <rect width="16" height="14.2222" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        ) : (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.05025 12.9497C4.36301 14.2625 6.14348 15 8 15C9.85652 15 11.637 14.2625 12.9497 12.9497C14.2625 11.637 15 9.85652 15 8C15 6.14348 14.2625 4.36301 12.9497 3.05025C11.637 1.7375 9.85652 1 8 1C6.14348 1 4.36301 1.7375 3.05025 3.05025C1.7375 4.36301 1 6.14348 1 8C1 9.85652 1.7375 11.637 3.05025 12.9497ZM13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569ZM5.36612 5.36612C5.1317 5.60054 5 5.91848 5 6.25V9.75C5 10.0815 5.1317 10.3995 5.36612 10.6339C5.60054 10.8683 5.91848 11 6.25 11C6.58152 11 6.89946 10.8683 7.13388 10.6339C7.3683 10.3995 7.5 10.0815 7.5 9.75V6.25C7.5 5.91848 7.3683 5.60054 7.13388 5.36612C6.89946 5.1317 6.58152 5 6.25 5C5.91848 5 5.60054 5.1317 5.36612 5.36612ZM8.86612 5.36612C8.6317 5.60054 8.5 5.91848 8.5 6.25V9.75C8.5 10.0815 8.6317 10.3995 8.86612 10.6339C9.10054 10.8683 9.41848 11 9.75 11C10.0815 11 10.3995 10.8683 10.6339 10.6339C10.8683 10.3995 11 10.0815 11 9.75V6.25C11 5.91848 10.8683 5.60054 10.6339 5.36612C10.3995 5.1317 10.0815 5 9.75 5C9.41848 5 9.10054 5.1317 8.86612 5.36612Z"
                    fill="#B5B5B5"
                />
            </svg>
        )

    return (
        <AppLayout>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                <title>Dashboard - Smart Card Generator</title>
                <meta property="og:type" content="website" />
                <meta
                    property="og:url"
                    content="https://smartcardgenerator.net/dashboard"
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
                <meta
                    property="og:title"
                    content="Dashboard - Smart Card Generator"
                />
                <meta
                    property="og:image"
                    content="/img/meta_image/dashboard.jpg"
                />
                <meta
                    property="image"
                    content="/img/meta_image/dashboard.jpg"
                />
                <meta property="og:site_name" content="Smart Card Generator" />
            </Head>

            <section className="dashboard-page">
                <div className="container-fluid">
                    <div className="dashboard-wrapper">
                        <Sidebar />
                        <div className="dashboard-content-item">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="dashboard-content">
                                        <div className="qr-show">
                                            <div className="qr-nav">
                                                <div className="qr-count">
                                                    <img
                                                        src="/img/icon/bi_person-vcard.svg"
                                                        alt=""
                                                    />
                                                    <p>
                                                        Active Smart Cards{' '}
                                                        <span>
                                                            ({totalQrCount})
                                                        </span>
                                                    </p>
                                                </div>

                                                <div className="qr-button">
                                                    <Link href="/select-qr">
                                                        <button className="submit-form">
                                                            Create New Smart
                                                            Card
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>

                                        {getqr && getqr.length > 0 ? (
                                            <div className="qr-list">
                                                <h3 className="qr-card-list-title">
                                                    All Smart Qr Card
                                                </h3>
                                                <ul className="qe-ul">
                                                    {getqr.map((qr, index) => (
                                                        <li key={qr.index}>
                                                            <div className="row align-items-center">
                                                                <div className="col-md-6">
                                                                    <div className="compnay-info">
                                                                        <div className="qr-logo">
                                                                            <img
                                                                                src="img/logo-qr.png"
                                                                                alt=""
                                                                            />
                                                                        </div>
                                                                        <div className="compnay-name-info">
                                                                            <h3>
                                                                                {
                                                                                    qr.cardname
                                                                                }
                                                                            </h3>

                                                                            <p>
                                                                                <img
                                                                                    src="/img/icon/in.svg"
                                                                                    alt=""
                                                                                />
                                                                                <a
                                                                                    href={`${qr.slug}`}
                                                                                    className="qr-url"
                                                                                    target="_blank">
                                                                                    {`smartcardgenerator.net/${qr.slug.substring(
                                                                                        0,
                                                                                        5,
                                                                                    )}`}
                                                                                </a>
                                                                            </p>

                                                                            <p>
                                                                                <img
                                                                                    src="/img/icon/tw.svg"
                                                                                    alt=""
                                                                                />
                                                                                <span>
                                                                                    {(() => {
                                                                                        const createdAtDate =
                                                                                            typeof qr.created_at ===
                                                                                                'string'
                                                                                                ? new Date(
                                                                                                    qr.created_at,
                                                                                                )
                                                                                                : qr.created_at

                                                                                        const formattedDate =
                                                                                            createdAtDate instanceof
                                                                                                Date
                                                                                                ? createdAtDate.toLocaleDateString(
                                                                                                    'en-US',
                                                                                                    {
                                                                                                        day: 'numeric',
                                                                                                        month: 'short',
                                                                                                        year: 'numeric',
                                                                                                    },
                                                                                                )
                                                                                                : 'Invalid Date'

                                                                                        return formattedDate
                                                                                    })()}
                                                                                </span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="qr-details">
                                                                        <div className="scan-details">
                                                                            <div className="scan">
                                                                                <p>
                                                                                    {
                                                                                        qr.viewcount
                                                                                    }
                                                                                </p>
                                                                                <p>
                                                                                    scans
                                                                                </p>
                                                                            </div>
                                                                            <div className="details">
                                                                                <Link
                                                                                    href={`/details/[id]`}
                                                                                    as={`/details/${qr.id}`}>
                                                                                    Details
                                                                                </Link>
                                                                            </div>
                                                                        </div>

                                                                        <div className="scan-ain">
                                                                            <div
                                                                                id={`capture-${qr.id}`}
                                                                                ref={el =>
                                                                                (elementQrRefs.current[
                                                                                    index
                                                                                ] =
                                                                                    el)
                                                                                }
                                                                                className="margin:auto"
                                                                                style={{
                                                                                    display:
                                                                                        'flex',
                                                                                    alignItems:
                                                                                        'center',
                                                                                    justifyContent:
                                                                                        'center',
                                                                                    padding:
                                                                                        '10px',
                                                                                }}>
                                                                                <div
                                                                                    style={{
                                                                                        position:
                                                                                            'relative',
                                                                                    }}>
                                                                                    <div className="qr-image-wrapper">
                                                                                        <QRCode
                                                                                            value={`https://smartcardgenerator.net/${qr.slug}`}
                                                                                            size={
                                                                                                100
                                                                                            }
                                                                                        />
                                                                                        <img
                                                                                            src={`/${qr.welcome}`}
                                                                                            width={
                                                                                                30
                                                                                            }
                                                                                            height={
                                                                                                30
                                                                                            }
                                                                                            style={{
                                                                                                position:
                                                                                                    'absolute',
                                                                                                top: '50%',
                                                                                                left: '50%',
                                                                                                transform:
                                                                                                    'translate(-50%, -50%)',
                                                                                            }}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="download-action">
                                                                            <a
                                                                                onClick={() =>
                                                                                    handleQRDownload(
                                                                                        index,
                                                                                    )
                                                                                }
                                                                                className="qr-downlod">
                                                                                Download
                                                                            </a>

                                                                            <div className="qr-action">
                                                                                <Link
                                                                                    href={`/update/[id]`}
                                                                                    as={`/update/${qr.id}`}>
                                                                                    <a>
                                                                                        <svg
                                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                                            width="16"
                                                                                            height="16"
                                                                                            viewBox="0 0 16 16"
                                                                                            fill="none">
                                                                                            <path
                                                                                                d="M12.8536 0.146391C12.7599 0.052657 12.6327 0 12.5001 0C12.3676 0 12.2404 0.052657 12.1467 0.146391L10.4997 1.79337L14.2066 5.50032L15.8536 3.85435C15.9002 3.8079 15.9371 3.75273 15.9623 3.69198C15.9875 3.63124 16.0005 3.56612 16.0005 3.50035C16.0005 3.43458 15.9875 3.36946 15.9623 3.30872C15.9371 3.24797 15.9002 3.1928 15.8536 3.14635L12.8536 0.146391ZM13.4996 6.20732L9.79268 2.50036L3.29276 9.00028H3.49976C3.63237 9.00028 3.75954 9.05296 3.85331 9.14672C3.94708 9.24049 3.99976 9.36767 3.99976 9.50027V10.0003H4.49975C4.63236 10.0003 4.75953 10.0529 4.8533 10.1467C4.94707 10.2405 4.99974 10.3677 4.99974 10.5003V11.0003H5.49974C5.63234 11.0003 5.75952 11.0529 5.85329 11.1467C5.94705 11.2405 5.99973 11.3676 5.99973 11.5002V12.0002H6.49972C6.63233 12.0002 6.75951 12.0529 6.85327 12.1467C6.94704 12.2405 6.99972 12.3676 6.99972 12.5002V12.7072L13.4996 6.20732ZM6.03173 13.6752C6.01069 13.6193 5.99985 13.56 5.99973 13.5002V13.0002H5.49974C5.36713 13.0002 5.23996 12.9476 5.14619 12.8538C5.05242 12.76 4.99974 12.6328 4.99974 12.5002V12.0002H4.49975C4.36714 12.0002 4.23997 11.9476 4.1462 11.8538C4.05243 11.76 3.99976 11.6329 3.99976 11.5002V11.0003H3.49976C3.36716 11.0003 3.23998 10.9476 3.14621 10.8538C3.05245 10.76 2.99977 10.6329 2.99977 10.5003V10.0003H2.49977C2.44 10.0002 2.38072 9.98933 2.32478 9.96827L2.14578 10.1463C2.09813 10.1943 2.06071 10.2514 2.03578 10.3143L0.0358056 15.3142C-0.000564587 15.4051 -0.00946798 15.5046 0.0101992 15.6005C0.0298664 15.6964 0.0772393 15.7843 0.146445 15.8536C0.215651 15.9228 0.303645 15.9701 0.399521 15.9898C0.495396 16.0095 0.594935 16.0006 0.685798 15.9642L5.68573 13.9642C5.7486 13.9393 5.80575 13.9019 5.85373 13.8542L6.03173 13.6752Z"
                                                                                                fill="#B5B5B5"
                                                                                            />
                                                                                        </svg>
                                                                                    </a>
                                                                                </Link>
                                                                                <button
                                                                                    onClick={() =>
                                                                                        handleToggle(
                                                                                            qr.id,
                                                                                        )
                                                                                    }
                                                                                    disabled={
                                                                                        !subscription
                                                                                    }
                                                                                    title={
                                                                                        qr.status
                                                                                    }>
                                                                                    {getStatusIcon(
                                                                                        qr.status,
                                                                                    )}
                                                                                </button>

                                                                                <button
                                                                                    onClick={() =>
                                                                                        handleQrDelete(
                                                                                            qr.id,
                                                                                        )
                                                                                    }>
                                                                                    <svg
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                        width="16"
                                                                                        height="16"
                                                                                        viewBox="0 0 16 16"
                                                                                        fill="none">
                                                                                        <path
                                                                                            d="M6.5715 3.4286H9.42864C9.42864 3.04972 9.27813 2.68635 9.01022 2.41845C8.74231 2.15054 8.37895 2.00003 8.00007 2.00003C7.62119 2.00003 7.25783 2.15054 6.98992 2.41845C6.72201 2.68635 6.5715 3.04972 6.5715 3.4286ZM5.71436 3.4286C5.71436 2.82239 5.95517 2.24101 6.38383 1.81235C6.81248 1.3837 7.39386 1.14288 8.00007 1.14288C8.60628 1.14288 9.18766 1.3837 9.61631 1.81235C10.045 2.24101 10.2858 2.82239 10.2858 3.4286H13.8572C13.9709 3.4286 14.0799 3.47375 14.1603 3.55412C14.2406 3.6345 14.2858 3.74351 14.2858 3.85717C14.2858 3.97083 14.2406 4.07984 14.1603 4.16021C14.0799 4.24059 13.9709 4.28574 13.8572 4.28574H13.1086L12.4132 12.6303C12.3626 13.2374 12.0857 13.8032 11.6375 14.2157C11.1892 14.6282 10.6024 14.8571 9.99321 14.8572H6.00693C5.39778 14.8571 4.81089 14.6282 4.36264 14.2157C3.9144 13.8032 3.63752 13.2374 3.58693 12.6303L2.8915 4.28574H2.14293C2.02926 4.28574 1.92025 4.24059 1.83988 4.16021C1.75951 4.07984 1.71436 3.97083 1.71436 3.85717C1.71436 3.74351 1.75951 3.6345 1.83988 3.55412C1.92025 3.47375 2.02926 3.4286 2.14293 3.4286H5.71436ZM4.44121 12.5589C4.47389 12.9517 4.653 13.3179 4.94301 13.5848C5.23302 13.8517 5.61276 14 6.00693 14H9.99321C10.3874 14 10.7671 13.8517 11.0571 13.5848C11.3471 13.3179 11.5262 12.9517 11.5589 12.5589L12.2492 4.28574H3.7515L4.44121 12.5589ZM6.71435 6.28574C6.82802 6.28574 6.93703 6.33089 7.0174 6.41127C7.09777 6.49164 7.14293 6.60065 7.14293 6.71431V11.5715C7.14293 11.6851 7.09777 11.7941 7.0174 11.8745C6.93703 11.9549 6.82802 12 6.71435 12C6.60069 12 6.49168 11.9549 6.41131 11.8745C6.33094 11.7941 6.28578 11.6851 6.28578 11.5715V6.71431C6.28578 6.60065 6.33094 6.49164 6.41131 6.41127C6.49168 6.33089 6.60069 6.28574 6.71435 6.28574ZM9.71435 6.71431C9.71435 6.60065 9.6692 6.49164 9.58883 6.41127C9.50846 6.33089 9.39945 6.28574 9.28578 6.28574C9.17212 6.28574 9.06311 6.33089 8.98274 6.41127C8.90237 6.49164 8.85721 6.60065 8.85721 6.71431V11.5715C8.85721 11.6851 8.90237 11.7941 8.98274 11.8745C9.06311 11.9549 9.17212 12 9.28578 12C9.39945 12 9.50846 11.9549 9.58883 11.8745C9.6692 11.7941 9.71435 11.6851 9.71435 11.5715V6.71431Z"
                                                                                            fill="#B5B5B5"
                                                                                        />
                                                                                    </svg>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ) : null}

                                        {getInstagram &&
                                            getInstagram.length > 0 ? (
                                            <div className="qr-list">
                                                <h3 className="qr-card-list-title">
                                                    {getInstagram &&
                                                        getInstagram.length > 0
                                                        ? 'All Instagram Qr Card'
                                                        : null}
                                                </h3>
                                                <ul className="qe-ul">
                                                    {getInstagram.map(
                                                        (instagram, index) => (
                                                            <li
                                                                key={
                                                                    instagram.index
                                                                }>
                                                                <div className="row align-items-center">
                                                                    <div className="col-md-6">
                                                                        <div className="compnay-info">
                                                                            <div className="qr-logo">
                                                                                <img
                                                                                    src="img/logo-qr.png"
                                                                                    alt=""
                                                                                />
                                                                            </div>
                                                                            <div className="compnay-name-info">
                                                                                <h3>
                                                                                    {
                                                                                        instagram.instagram_name
                                                                                    }
                                                                                </h3>

                                                                                <p>
                                                                                    <img
                                                                                        src="/img/icon/in.svg"
                                                                                        alt=""
                                                                                    />
                                                                                    <a
                                                                                        href={`${instagram.instagram_username}`}
                                                                                        className="qr-url"
                                                                                        target="_blank">
                                                                                        {
                                                                                            instagram.instagram_username
                                                                                        }
                                                                                    </a>
                                                                                </p>

                                                                                <p>
                                                                                    <svg
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                        width="16"
                                                                                        height="16"
                                                                                        viewBox="0 0 16 16"
                                                                                        fill="none">
                                                                                        <path
                                                                                            fillRule="evenodd"
                                                                                            clipRule="evenodd"
                                                                                            d="M13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569ZM12.9497 12.9497C14.2625 11.637 15 9.85652 15 8C15 6.14348 14.2625 4.36301 12.9497 3.05025C11.637 1.7375 9.85652 1 8 1C6.14348 1 4.36301 1.7375 3.05025 3.05025C1.7375 4.36301 1 6.14348 1 8C1 9.85652 1.7375 11.637 3.05025 12.9497C4.36301 14.2625 6.14348 15 8 15C9.85652 15 11.637 14.2625 12.9497 12.9497ZM7.85355 3.14645C7.94732 3.24021 8 3.36739 8 3.5V8.71L11.248 10.566C11.3598 10.6334 11.4408 10.7419 11.4736 10.8683C11.5065 10.9946 11.4886 11.1288 11.4238 11.2422C11.3591 11.3556 11.2525 11.4391 11.127 11.4749C11.0014 11.5108 10.8669 11.4961 10.752 11.434L7.252 9.434C7.17547 9.39029 7.11186 9.32712 7.06761 9.25091C7.02335 9.17469 7.00003 9.08813 7 9V3.5C7 3.36739 7.05268 3.24021 7.14645 3.14645C7.24021 3.05268 7.36739 3 7.5 3C7.63261 3 7.75979 3.05268 7.85355 3.14645Z"
                                                                                            fill="#B5B5B5"
                                                                                        />
                                                                                    </svg>

                                                                                    <span>
                                                                                        {(() => {
                                                                                            const createdAtDate =
                                                                                                typeof instagram.created_at ===
                                                                                                    'string'
                                                                                                    ? new Date(
                                                                                                        instagram.created_at,
                                                                                                    )
                                                                                                    : instagram.created_at

                                                                                            const formattedDate =
                                                                                                createdAtDate instanceof
                                                                                                    Date
                                                                                                    ? createdAtDate.toLocaleDateString(
                                                                                                        'en-US',
                                                                                                        {
                                                                                                            day: 'numeric',
                                                                                                            month: 'short',
                                                                                                            year: 'numeric',
                                                                                                        },
                                                                                                    )
                                                                                                    : 'Invalid Date'

                                                                                            return formattedDate
                                                                                        })()}
                                                                                    </span>
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <div className="qr-details">
                                                                            <div className="scan-details">
                                                                                {/* <div className="scan">
                                                                            <p>
                                                                                {
                                                                                    instagram.viewcount
                                                                                }
                                                                            </p>
                                                                            <p>
                                                                                scans
                                                                            </p>
                                                                        </div> */}
                                                                                <div className="details"></div>
                                                                            </div>

                                                                            <div className="scan-ain">
                                                                                <div
                                                                                    id={`capture-${instagram.id}`}
                                                                                    ref={el =>
                                                                                    (elementInRefs.current[
                                                                                        index
                                                                                    ] =
                                                                                        el)
                                                                                    }
                                                                                    className="margin:auto"
                                                                                    style={{
                                                                                        display:
                                                                                            'flex',
                                                                                        alignItems:
                                                                                            'center',
                                                                                        justifyContent:
                                                                                            'center',
                                                                                        padding:
                                                                                            '10px',
                                                                                    }}>
                                                                                    <div
                                                                                        style={{
                                                                                            position:
                                                                                                'relative',
                                                                                        }}>
                                                                                        <div className="qr-image-wrapper">
                                                                                            <QRCode
                                                                                                value={`${instagram.instagram_username}`}
                                                                                                size={
                                                                                                    100
                                                                                                }
                                                                                            />
                                                                                            <img
                                                                                                src={`/${instagram.image}`}
                                                                                                width={
                                                                                                    30
                                                                                                }
                                                                                                height={
                                                                                                    30
                                                                                                }
                                                                                                style={{
                                                                                                    position:
                                                                                                        'absolute',
                                                                                                    top: '50%',
                                                                                                    left: '50%',
                                                                                                    transform:
                                                                                                        'translate(-50%, -50%)',
                                                                                                }}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="download-action">
                                                                                <a
                                                                                    onClick={() =>
                                                                                        handleInstaDownload(
                                                                                            index,
                                                                                        )
                                                                                    }
                                                                                    className="qr-downlod">
                                                                                    Download
                                                                                </a>

                                                                                <div className="qr-action">
                                                                                    <Link
                                                                                        href={`/instagram/[id]`}
                                                                                        as={`/instagram/${instagram.id}`}>
                                                                                        <a>
                                                                                            <svg
                                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                                width="16"
                                                                                                height="16"
                                                                                                viewBox="0 0 16 16"
                                                                                                fill="none">
                                                                                                <path
                                                                                                    d="M12.8536 0.146391C12.7599 0.052657 12.6327 0 12.5001 0C12.3676 0 12.2404 0.052657 12.1467 0.146391L10.4997 1.79337L14.2066 5.50032L15.8536 3.85435C15.9002 3.8079 15.9371 3.75273 15.9623 3.69198C15.9875 3.63124 16.0005 3.56612 16.0005 3.50035C16.0005 3.43458 15.9875 3.36946 15.9623 3.30872C15.9371 3.24797 15.9002 3.1928 15.8536 3.14635L12.8536 0.146391ZM13.4996 6.20732L9.79268 2.50036L3.29276 9.00028H3.49976C3.63237 9.00028 3.75954 9.05296 3.85331 9.14672C3.94708 9.24049 3.99976 9.36767 3.99976 9.50027V10.0003H4.49975C4.63236 10.0003 4.75953 10.0529 4.8533 10.1467C4.94707 10.2405 4.99974 10.3677 4.99974 10.5003V11.0003H5.49974C5.63234 11.0003 5.75952 11.0529 5.85329 11.1467C5.94705 11.2405 5.99973 11.3676 5.99973 11.5002V12.0002H6.49972C6.63233 12.0002 6.75951 12.0529 6.85327 12.1467C6.94704 12.2405 6.99972 12.3676 6.99972 12.5002V12.7072L13.4996 6.20732ZM6.03173 13.6752C6.01069 13.6193 5.99985 13.56 5.99973 13.5002V13.0002H5.49974C5.36713 13.0002 5.23996 12.9476 5.14619 12.8538C5.05242 12.76 4.99974 12.6328 4.99974 12.5002V12.0002H4.49975C4.36714 12.0002 4.23997 11.9476 4.1462 11.8538C4.05243 11.76 3.99976 11.6329 3.99976 11.5002V11.0003H3.49976C3.36716 11.0003 3.23998 10.9476 3.14621 10.8538C3.05245 10.76 2.99977 10.6329 2.99977 10.5003V10.0003H2.49977C2.44 10.0002 2.38072 9.98933 2.32478 9.96827L2.14578 10.1463C2.09813 10.1943 2.06071 10.2514 2.03578 10.3143L0.0358056 15.3142C-0.000564587 15.4051 -0.00946798 15.5046 0.0101992 15.6005C0.0298664 15.6964 0.0772393 15.7843 0.146445 15.8536C0.215651 15.9228 0.303645 15.9701 0.399521 15.9898C0.495396 16.0095 0.594935 16.0006 0.685798 15.9642L5.68573 13.9642C5.7486 13.9393 5.80575 13.9019 5.85373 13.8542L6.03173 13.6752Z"
                                                                                                    fill="#B5B5B5"
                                                                                                />
                                                                                            </svg>
                                                                                        </a>
                                                                                    </Link>

                                                                                    <button
                                                                                        type="button"
                                                                                        onClick={() =>
                                                                                            handleInstaDelete(
                                                                                                instagram.id,
                                                                                            )
                                                                                        }>
                                                                                        <svg
                                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                                            width="16"
                                                                                            height="16"
                                                                                            viewBox="0 0 16 16"
                                                                                            fill="none">
                                                                                            <path
                                                                                                d="M6.5715 3.4286H9.42864C9.42864 3.04972 9.27813 2.68635 9.01022 2.41845C8.74231 2.15054 8.37895 2.00003 8.00007 2.00003C7.62119 2.00003 7.25783 2.15054 6.98992 2.41845C6.72201 2.68635 6.5715 3.04972 6.5715 3.4286ZM5.71436 3.4286C5.71436 2.82239 5.95517 2.24101 6.38383 1.81235C6.81248 1.3837 7.39386 1.14288 8.00007 1.14288C8.60628 1.14288 9.18766 1.3837 9.61631 1.81235C10.045 2.24101 10.2858 2.82239 10.2858 3.4286H13.8572C13.9709 3.4286 14.0799 3.47375 14.1603 3.55412C14.2406 3.6345 14.2858 3.74351 14.2858 3.85717C14.2858 3.97083 14.2406 4.07984 14.1603 4.16021C14.0799 4.24059 13.9709 4.28574 13.8572 4.28574H13.1086L12.4132 12.6303C12.3626 13.2374 12.0857 13.8032 11.6375 14.2157C11.1892 14.6282 10.6024 14.8571 9.99321 14.8572H6.00693C5.39778 14.8571 4.81089 14.6282 4.36264 14.2157C3.9144 13.8032 3.63752 13.2374 3.58693 12.6303L2.8915 4.28574H2.14293C2.02926 4.28574 1.92025 4.24059 1.83988 4.16021C1.75951 4.07984 1.71436 3.97083 1.71436 3.85717C1.71436 3.74351 1.75951 3.6345 1.83988 3.55412C1.92025 3.47375 2.02926 3.4286 2.14293 3.4286H5.71436ZM4.44121 12.5589C4.47389 12.9517 4.653 13.3179 4.94301 13.5848C5.23302 13.8517 5.61276 14 6.00693 14H9.99321C10.3874 14 10.7671 13.8517 11.0571 13.5848C11.3471 13.3179 11.5262 12.9517 11.5589 12.5589L12.2492 4.28574H3.7515L4.44121 12.5589ZM6.71435 6.28574C6.82802 6.28574 6.93703 6.33089 7.0174 6.41127C7.09777 6.49164 7.14293 6.60065 7.14293 6.71431V11.5715C7.14293 11.6851 7.09777 11.7941 7.0174 11.8745C6.93703 11.9549 6.82802 12 6.71435 12C6.60069 12 6.49168 11.9549 6.41131 11.8745C6.33094 11.7941 6.28578 11.6851 6.28578 11.5715V6.71431C6.28578 6.60065 6.33094 6.49164 6.41131 6.41127C6.49168 6.33089 6.60069 6.28574 6.71435 6.28574ZM9.71435 6.71431C9.71435 6.60065 9.6692 6.49164 9.58883 6.41127C9.50846 6.33089 9.39945 6.28574 9.28578 6.28574C9.17212 6.28574 9.06311 6.33089 8.98274 6.41127C8.90237 6.49164 8.85721 6.60065 8.85721 6.71431V11.5715C8.85721 11.6851 8.90237 11.7941 8.98274 11.8745C9.06311 11.9549 9.17212 12 9.28578 12C9.39945 12 9.50846 11.9549 9.58883 11.8745C9.6692 11.7941 9.71435 11.6851 9.71435 11.5715V6.71431Z"
                                                                                                fill="#B5B5B5"
                                                                                            />
                                                                                        </svg>
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ),
                                                    )}
                                                </ul>
                                            </div>
                                        ) : null}

                                        {getWebsite && getWebsite.length > 0 ? (
                                            <div className="qr-list">
                                                <h3 className="qr-card-list-title">
                                                    <h3 className="qr-card-list-title">
                                                        All Website Qr Card
                                                    </h3>
                                                </h3>
                                                <ul className="qe-ul">
                                                    {getWebsite.map(
                                                        (website, index) => (
                                                            <li
                                                                key={
                                                                    website.index
                                                                }>
                                                                <div className="row align-items-center">
                                                                    <div className="col-md-6">
                                                                        <div className="compnay-info">
                                                                            <div className="qr-logo">
                                                                                <img
                                                                                    src="img/logo-qr.png"
                                                                                    alt=""
                                                                                />
                                                                            </div>
                                                                            <div className="compnay-name-info">
                                                                                <h3>
                                                                                    {
                                                                                        website.website_name
                                                                                    }
                                                                                </h3>

                                                                                <p>
                                                                                    <img
                                                                                        src="/img/icon/in.svg"
                                                                                        alt=""
                                                                                    />
                                                                                    <a
                                                                                        href={`${website.website_url}`}
                                                                                        className="qr-url"
                                                                                        target="_blank">
                                                                                        {
                                                                                            website.website_url
                                                                                        }
                                                                                    </a>
                                                                                </p>

                                                                                <span>
                                                                                    {(() => {
                                                                                        const createdAtDate =
                                                                                            typeof website.created_at ===
                                                                                                'string'
                                                                                                ? new Date(
                                                                                                    website.created_at,
                                                                                                )
                                                                                                : website.created_at

                                                                                        const formattedDate =
                                                                                            createdAtDate instanceof
                                                                                                Date
                                                                                                ? createdAtDate.toLocaleDateString(
                                                                                                    'en-US',
                                                                                                    {
                                                                                                        day: 'numeric',
                                                                                                        month: 'short',
                                                                                                        year: 'numeric',
                                                                                                    },
                                                                                                )
                                                                                                : 'Invalid Date'

                                                                                        return formattedDate
                                                                                    })()}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <div className="qr-details">
                                                                            <div className="scan-details"></div>

                                                                            <div className="scan-ain">
                                                                                <div
                                                                                    id={`capture-${website.id}`}
                                                                                    ref={el =>
                                                                                    (elementRefs.current[
                                                                                        index
                                                                                    ] =
                                                                                        el)
                                                                                    }
                                                                                    className="margin:auto"
                                                                                    style={{
                                                                                        display:
                                                                                            'flex',
                                                                                        alignItems:
                                                                                            'center',
                                                                                        justifyContent:
                                                                                            'center',
                                                                                        padding:
                                                                                            '10px',
                                                                                    }}>
                                                                                    <div
                                                                                        style={{
                                                                                            position:
                                                                                                'relative',
                                                                                        }}>
                                                                                        <div className="qr-image-wrapper">
                                                                                            <QRCode
                                                                                                value={`${website.website_url}`}
                                                                                                size={
                                                                                                    100
                                                                                                }
                                                                                            />
                                                                                            <img
                                                                                                src={`/${website.image}`}
                                                                                                width={
                                                                                                    30
                                                                                                }
                                                                                                height={
                                                                                                    30
                                                                                                }
                                                                                                style={{
                                                                                                    position:
                                                                                                        'absolute',
                                                                                                    top: '50%',
                                                                                                    left: '50%',
                                                                                                    transform:
                                                                                                        'translate(-50%, -50%)',
                                                                                                }}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="download-action">
                                                                                <a
                                                                                    onClick={() =>
                                                                                        handleDownload(
                                                                                            index,
                                                                                        )
                                                                                    }
                                                                                    className="qr-downlod">
                                                                                    Download
                                                                                </a>

                                                                                <div className="qr-action">
                                                                                    <Link
                                                                                        href={`/website/[id]`}
                                                                                        as={`/website/${website.id}`}>
                                                                                        <a>
                                                                                            <svg
                                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                                width="16"
                                                                                                height="16"
                                                                                                viewBox="0 0 16 16"
                                                                                                fill="none">
                                                                                                <path
                                                                                                    d="M12.8536 0.146391C12.7599 0.052657 12.6327 0 12.5001 0C12.3676 0 12.2404 0.052657 12.1467 0.146391L10.4997 1.79337L14.2066 5.50032L15.8536 3.85435C15.9002 3.8079 15.9371 3.75273 15.9623 3.69198C15.9875 3.63124 16.0005 3.56612 16.0005 3.50035C16.0005 3.43458 15.9875 3.36946 15.9623 3.30872C15.9371 3.24797 15.9002 3.1928 15.8536 3.14635L12.8536 0.146391ZM13.4996 6.20732L9.79268 2.50036L3.29276 9.00028H3.49976C3.63237 9.00028 3.75954 9.05296 3.85331 9.14672C3.94708 9.24049 3.99976 9.36767 3.99976 9.50027V10.0003H4.49975C4.63236 10.0003 4.75953 10.0529 4.8533 10.1467C4.94707 10.2405 4.99974 10.3677 4.99974 10.5003V11.0003H5.49974C5.63234 11.0003 5.75952 11.0529 5.85329 11.1467C5.94705 11.2405 5.99973 11.3676 5.99973 11.5002V12.0002H6.49972C6.63233 12.0002 6.75951 12.0529 6.85327 12.1467C6.94704 12.2405 6.99972 12.3676 6.99972 12.5002V12.7072L13.4996 6.20732ZM6.03173 13.6752C6.01069 13.6193 5.99985 13.56 5.99973 13.5002V13.0002H5.49974C5.36713 13.0002 5.23996 12.9476 5.14619 12.8538C5.05242 12.76 4.99974 12.6328 4.99974 12.5002V12.0002H4.49975C4.36714 12.0002 4.23997 11.9476 4.1462 11.8538C4.05243 11.76 3.99976 11.6329 3.99976 11.5002V11.0003H3.49976C3.36716 11.0003 3.23998 10.9476 3.14621 10.8538C3.05245 10.76 2.99977 10.6329 2.99977 10.5003V10.0003H2.49977C2.44 10.0002 2.38072 9.98933 2.32478 9.96827L2.14578 10.1463C2.09813 10.1943 2.06071 10.2514 2.03578 10.3143L0.0358056 15.3142C-0.000564587 15.4051 -0.00946798 15.5046 0.0101992 15.6005C0.0298664 15.6964 0.0772393 15.7843 0.146445 15.8536C0.215651 15.9228 0.303645 15.9701 0.399521 15.9898C0.495396 16.0095 0.594935 16.0006 0.685798 15.9642L5.68573 13.9642C5.7486 13.9393 5.80575 13.9019 5.85373 13.8542L6.03173 13.6752Z"
                                                                                                    fill="#B5B5B5"
                                                                                                />
                                                                                            </svg>
                                                                                        </a>
                                                                                    </Link>

                                                                                    <button
                                                                                        onClick={() =>
                                                                                            handleWebsiteDelete(
                                                                                                website.id,
                                                                                            )
                                                                                        }>
                                                                                        <svg
                                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                                            width="16"
                                                                                            height="16"
                                                                                            viewBox="0 0 16 16"
                                                                                            fill="none">
                                                                                            <path
                                                                                                d="M6.5715 3.4286H9.42864C9.42864 3.04972 9.27813 2.68635 9.01022 2.41845C8.74231 2.15054 8.37895 2.00003 8.00007 2.00003C7.62119 2.00003 7.25783 2.15054 6.98992 2.41845C6.72201 2.68635 6.5715 3.04972 6.5715 3.4286ZM5.71436 3.4286C5.71436 2.82239 5.95517 2.24101 6.38383 1.81235C6.81248 1.3837 7.39386 1.14288 8.00007 1.14288C8.60628 1.14288 9.18766 1.3837 9.61631 1.81235C10.045 2.24101 10.2858 2.82239 10.2858 3.4286H13.8572C13.9709 3.4286 14.0799 3.47375 14.1603 3.55412C14.2406 3.6345 14.2858 3.74351 14.2858 3.85717C14.2858 3.97083 14.2406 4.07984 14.1603 4.16021C14.0799 4.24059 13.9709 4.28574 13.8572 4.28574H13.1086L12.4132 12.6303C12.3626 13.2374 12.0857 13.8032 11.6375 14.2157C11.1892 14.6282 10.6024 14.8571 9.99321 14.8572H6.00693C5.39778 14.8571 4.81089 14.6282 4.36264 14.2157C3.9144 13.8032 3.63752 13.2374 3.58693 12.6303L2.8915 4.28574H2.14293C2.02926 4.28574 1.92025 4.24059 1.83988 4.16021C1.75951 4.07984 1.71436 3.97083 1.71436 3.85717C1.71436 3.74351 1.75951 3.6345 1.83988 3.55412C1.92025 3.47375 2.02926 3.4286 2.14293 3.4286H5.71436ZM4.44121 12.5589C4.47389 12.9517 4.653 13.3179 4.94301 13.5848C5.23302 13.8517 5.61276 14 6.00693 14H9.99321C10.3874 14 10.7671 13.8517 11.0571 13.5848C11.3471 13.3179 11.5262 12.9517 11.5589 12.5589L12.2492 4.28574H3.7515L4.44121 12.5589ZM6.71435 6.28574C6.82802 6.28574 6.93703 6.33089 7.0174 6.41127C7.09777 6.49164 7.14293 6.60065 7.14293 6.71431V11.5715C7.14293 11.6851 7.09777 11.7941 7.0174 11.8745C6.93703 11.9549 6.82802 12 6.71435 12C6.60069 12 6.49168 11.9549 6.41131 11.8745C6.33094 11.7941 6.28578 11.6851 6.28578 11.5715V6.71431C6.28578 6.60065 6.33094 6.49164 6.41131 6.41127C6.49168 6.33089 6.60069 6.28574 6.71435 6.28574ZM9.71435 6.71431C9.71435 6.60065 9.6692 6.49164 9.58883 6.41127C9.50846 6.33089 9.39945 6.28574 9.28578 6.28574C9.17212 6.28574 9.06311 6.33089 8.98274 6.41127C8.90237 6.49164 8.85721 6.60065 8.85721 6.71431V11.5715C8.85721 11.6851 8.90237 11.7941 8.98274 11.8745C9.06311 11.9549 9.17212 12 9.28578 12C9.39945 12 9.50846 11.9549 9.58883 11.8745C9.6692 11.7941 9.71435 11.6851 9.71435 11.5715V6.71431Z"
                                                                                                fill="#B5B5B5"
                                                                                            />
                                                                                        </svg>
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ),
                                                    )}
                                                </ul>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {successMessage && (
                        <Popup
                            message={successMessage}
                            type="success"
                            onClose={() => setSuccessMessage('')}
                        />
                    )}
                    {errorMessage && (
                        <Popup
                            message={errorMessage}
                            type="error"
                            onClose={() => setErrorMessage('')}
                        />
                    )}
                </div>
            </section>
        </AppLayout>
    )
}

export default Dashboard
