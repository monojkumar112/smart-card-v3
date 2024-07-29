// Your component file

import { useEffect, useState, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import QRCode from 'qrcode.react'

import axios from 'axios'
import { useAuth } from '@/hooks/auth'
import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import Sidebar from 'components/sidebar'
import Link from 'next/link'
import html2canvas from 'html2canvas'

const activecard = () => {
    const { user } = useAuth({ middleware: 'auth' })
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
    const userId = user?.id
    const [totalQrCount, setTotalQrCount] = useState(0)

    const [activeQr, setActiveQr] = useState([])
    const baseuri = process.env.NEXT_PUBLIC_BACKEND_URL

    const fetchActiveQr = async () => {
        try {
            const response = await axios.get(
                `${baseuri}/api/getActiveQr/${userId}`,
            )
            setActiveQr(response.data.activeQr)
            setTotalQrCount(response.data.activeQr.length)
        } catch (error) {
            console.error('Error fetching active QR codes:', error)
        }
    }
    useEffect(() => {
        fetchActiveQr()
    }, [userId])
    // ===================qr code ====================
    const componentRef = useRef()

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    // ===================delete=====================
    const handleDelete = async id => {
        try {
            const response = await axios.delete(`${baseuri}/api/deleteqr/${id}`)
            if (response.data.message) {
                alert('Qrgen deleted successfully')
                fetchActiveQr()
            } else {
                alert('Qrgen deletion failed')
            }
        } catch (error) {
            console.error('Error deleting Qrgen:', error)
        }
    }

    // ========================pause and resume function ==============?
    const [status, setStatus] = useState('')

    const handleToggle = async id => {
        const newStatus = status === 'active' ? 'paused' : 'paused'

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
            fetchActiveQr()
            alert(`Your QR is ${newStatus}`)
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
                <title>Active cards - Smart Card Generator</title>
                <meta property="og:type" content="website" />
                <meta
                    property="og:url"
                    content="https://smartcardgenerator.net/activecard"
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
                    content="Active cards - Smart Card Generator"
                />
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
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="36"
                                                        height="36"
                                                        viewBox="0 0 36 36"
                                                        fill="none">
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M21.0423 3.5288L23.1148 5.65301L26.0806 5.61701C26.6472 5.61037 27.2095 5.71706 27.7343 5.93078C28.2592 6.14451 28.736 6.46097 29.1368 6.86158C29.5376 7.26219 29.8544 7.73886 30.0684 8.26359C30.2824 8.78832 30.3893 9.35053 30.383 9.91719L30.347 12.8875L32.4712 14.9577C32.8767 15.3538 33.199 15.827 33.419 16.3495C33.639 16.8719 33.7523 17.4331 33.7523 18C33.7523 18.5669 33.639 19.1281 33.419 19.6505C33.199 20.173 32.8767 20.6462 32.4712 21.0423L30.347 23.1148L30.383 26.0806C30.3896 26.6472 30.2829 27.2095 30.0692 27.7343C29.8555 28.2592 29.539 28.736 29.1384 29.1368C28.7378 29.5376 28.2611 29.8544 27.7364 30.0684C27.2117 30.2824 26.6495 30.3893 26.0828 30.383L23.1125 30.347L21.0423 32.4712C20.6462 32.8767 20.173 33.199 19.6505 33.419C19.1281 33.639 18.5669 33.7523 18 33.7523C17.4331 33.7523 16.8719 33.639 16.3495 33.419C15.827 33.199 15.3538 32.8767 14.9577 32.4712L12.8852 30.347L9.91944 30.383C9.35279 30.3896 8.79052 30.2829 8.26568 30.0692C7.74083 29.8555 7.264 29.539 6.86318 29.1384C6.46236 28.7378 6.14565 28.2611 5.93165 27.7364C5.71765 27.2117 5.61067 26.6495 5.61701 26.0828L5.65301 23.1125L3.5288 21.0423C3.12327 20.6462 2.80104 20.173 2.58103 19.6505C2.36103 19.1281 2.2477 18.5669 2.2477 18C2.2477 17.4331 2.36103 16.8719 2.58103 16.3495C2.80104 15.827 3.12327 15.3538 3.5288 14.9577L5.65301 12.8852L5.61701 9.91944C5.61037 9.35279 5.71706 8.79052 5.93078 8.26568C6.14451 7.74083 6.46097 7.264 6.86158 6.86318C7.26219 6.46236 7.73886 6.14565 8.26359 5.93165C8.78832 5.71765 9.35053 5.61067 9.91719 5.61701L12.8875 5.65301L14.9577 3.5288C15.3538 3.12327 15.827 2.80104 16.3495 2.58103C16.8719 2.36103 17.4331 2.2477 18 2.2477C18.5669 2.2477 19.1281 2.36103 19.6505 2.58103C20.173 2.80104 20.6462 3.12327 21.0423 3.5288ZM24.0509 3.39153L22.6512 1.95814C22.0455 1.33829 21.3221 0.845761 20.5233 0.509492C19.7246 0.173224 18.8666 0 18 0C17.1334 0 16.2755 0.173224 15.4767 0.509492C14.678 0.845761 13.9545 1.33829 13.3488 1.95814L11.9491 3.38928L9.94644 3.36678C9.07954 3.35652 8.21934 3.5197 7.41643 3.84673C6.61351 4.17375 5.88409 4.65802 5.27105 5.27105C4.65802 5.88409 4.17375 6.61351 3.84673 7.41643C3.5197 8.21934 3.35652 9.07954 3.36678 9.94644L3.39153 11.9491L1.95814 13.3488C1.33829 13.9545 0.845761 14.678 0.509492 15.4767C0.173224 16.2755 0 17.1334 0 18C0 18.8666 0.173224 19.7246 0.509492 20.5233C0.845761 21.3221 1.33829 22.0455 1.95814 22.6512L3.38928 24.0509L3.36678 26.0536C3.35652 26.9205 3.5197 27.7807 3.84673 28.5836C4.17375 29.3865 4.65802 30.1159 5.27105 30.729C5.88409 31.342 6.61351 31.8263 7.41643 32.1533C8.21934 32.4803 9.07954 32.6435 9.94644 32.6332L11.9491 32.6085L13.3488 34.0419C13.9545 34.6617 14.678 35.1542 15.4767 35.4905C16.2755 35.8268 17.1334 36 18 36C18.8666 36 19.7246 35.8268 20.5233 35.4905C21.3221 35.1542 22.0455 34.6617 22.6512 34.0419L24.0509 32.6107L26.0536 32.6332C26.9205 32.6435 27.7807 32.4803 28.5836 32.1533C29.3865 31.8263 30.1159 31.342 30.729 30.729C31.342 30.1159 31.8263 29.3865 32.1533 28.5836C32.4803 27.7807 32.6435 26.9205 32.6332 26.0536L32.6085 24.0509L34.0419 22.6512C34.6617 22.0455 35.1542 21.3221 35.4905 20.5233C35.8268 19.7246 36 18.8666 36 18C36 17.1334 35.8268 16.2755 35.4905 15.4767C35.1542 14.678 34.6617 13.9545 34.0419 13.3488L32.6107 11.9491L32.6332 9.94644C32.6435 9.07954 32.4803 8.21934 32.1533 7.41643C31.8263 6.61351 31.342 5.88409 30.729 5.27105C30.1159 4.65802 29.3865 4.17375 28.5836 3.84673C27.7807 3.5197 26.9205 3.35652 26.0536 3.36678L24.0509 3.39153ZM23.5416 14.1934C23.4848 14.0567 23.4017 13.9326 23.2969 13.8281C23.1924 13.7233 23.0683 13.6402 22.9316 13.5834C22.7949 13.5267 22.6483 13.4975 22.5004 13.4975C22.3524 13.4975 22.2058 13.5267 22.0691 13.5834C21.9324 13.6402 21.8083 13.7233 21.7038 13.8281L15.7497 19.7844L13.1709 17.2034C13.0663 17.0988 12.9421 17.0158 12.8054 16.9592C12.6688 16.9026 12.5223 16.8735 12.3743 16.8735C12.2264 16.8735 12.0799 16.9026 11.9432 16.9592C11.8066 17.0158 11.6824 17.0988 11.5778 17.2034C11.4731 17.308 11.3902 17.4322 11.3336 17.5689C11.2769 17.7056 11.2478 17.8521 11.2478 18C11.2478 18.1479 11.2769 18.2944 11.3336 18.4311C11.3902 18.5678 11.4731 18.692 11.5778 18.7966L14.9531 22.1719C15.0576 22.2767 15.1818 22.3598 15.3185 22.4165C15.4551 22.4733 15.6017 22.5025 15.7497 22.5025C15.8977 22.5025 16.0442 22.4733 16.1809 22.4165C16.3176 22.3598 16.4417 22.2767 16.5463 22.1719L23.2969 15.4212C23.4017 15.3167 23.4848 15.1926 23.5416 15.0559C23.5983 14.9192 23.6275 14.7726 23.6275 14.6247C23.6275 14.4767 23.5983 14.3301 23.5416 14.1934Z"
                                                            fill="#00B2D9"
                                                        />
                                                    </svg>
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
                                        <div className="qr-list">
                                            <ul className="qe-ul">
                                                {activeQr.map(qr => (
                                                    <li key={qr.id}>
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
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width="16"
                                                                                height="16"
                                                                                viewBox="0 0 16 16"
                                                                                fill="none">
                                                                                <path
                                                                                    fillRule="evenodd"
                                                                                    clipRule="evenodd"
                                                                                    d="M4.89104 5.66436C5.10112 5.00339 5.46669 4.40247 5.95706 3.91202L8.59904 1.27005C9.41223 0.45685 10.5152 0 11.6652 0C12.8152 0 13.9182 0.45685 14.7314 1.27005C15.5446 2.08324 16.0014 3.18618 16.0014 4.33621C16.0014 5.48625 15.5446 6.58918 14.7314 7.40238L12.7484 9.3853C12.7875 8.76094 12.7253 8.13224 12.5634 7.52522L13.7096 6.38056C14.2519 5.83817 14.5566 5.10254 14.5566 4.33549C14.5566 3.56844 14.2519 2.8328 13.7096 2.29042C13.1672 1.74803 12.4315 1.44332 11.6645 1.44332C10.8974 1.44332 10.1618 1.74803 9.61941 2.29042L6.97888 4.93239C6.62011 5.29112 6.36208 5.73796 6.23072 6.22801C6.09936 6.71806 6.09929 7.23405 6.23053 7.72413C6.36176 8.21421 6.61967 8.66111 6.97835 9.01994C7.33702 9.37876 7.78382 9.63686 8.27385 9.7683L7.15376 10.8898C6.52798 10.5908 5.98308 10.146 5.56477 9.59284C5.14646 9.03964 4.86696 8.39417 4.74973 7.7106C4.6325 7.02704 4.68096 6.32532 4.89104 5.66436ZM1.27005 8.59763L3.25297 6.6147C3.21379 7.24065 3.27626 7.86736 3.43797 8.47333L2.29186 9.618C1.74947 10.1604 1.44476 10.896 1.44476 11.6631C1.44476 12.4301 1.74947 13.1658 2.29186 13.7081C2.83425 14.2505 3.56988 14.5552 4.33693 14.5552C5.10399 14.5552 5.83962 14.2505 6.38201 13.7081L9.02254 11.0662C9.37842 10.7106 9.63535 10.2683 9.76791 9.78303C9.90048 9.29775 9.9041 8.78626 9.77842 8.29915C9.65274 7.81203 9.4021 7.36616 9.05129 7.00559C8.70048 6.64502 8.26163 6.38226 7.77815 6.24326C7.83996 6.13842 7.91474 6.04179 8.00072 5.95565L8.84766 5.10872C9.47343 5.40774 10.0183 5.85252 10.4366 6.40572C10.855 6.95892 11.1344 7.60439 11.2517 8.28795C11.3689 8.97152 11.3205 9.67324 11.1104 10.3342C10.9003 10.9952 10.5347 11.5961 10.0443 12.0865L7.40238 14.73C6.58918 15.5432 5.48625 16 4.33621 16C3.18618 16 2.08324 15.5432 1.27005 14.73C0.456849 13.9168 0 12.8138 0 11.6638C0 10.5138 0.456849 9.41082 1.27005 8.59763Z"
                                                                                    fill="#B5B5B5"
                                                                                />
                                                                            </svg>
                                                                            {/* <span>
                                                                                {`smartcardgenerator.net/${qr.slug.substring(
                                                                                    0,
                                                                                    5,
                                                                                )}`}
                                                                            </span> */}
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
                                                                            <Link href="details">
                                                                                Details
                                                                            </Link>
                                                                        </div>
                                                                    </div>

                                                                    <div className="scan-ain">
                                                                        <div
                                                                            className="margin:auto"
                                                                            style={{
                                                                                display:
                                                                                    'flex',
                                                                                alignItems:
                                                                                    'center',
                                                                                justifyContent:
                                                                                    'center',
                                                                            }}>
                                                                            <div
                                                                                ref={
                                                                                    elementRef
                                                                                }
                                                                                style={{
                                                                                    position:
                                                                                        'relative',
                                                                                    width: '100px',
                                                                                    height: '100px',
                                                                                }}>
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
                                                                    <div className="download-action">
                                                                        <a
                                                                            onClick={
                                                                                handleDownload
                                                                            }
                                                                            className="qr-downlod">
                                                                            Download
                                                                        </a>

                                                                        <div className="qr-action">
                                                                            <Link
                                                                                href={`/update/[id]`}
                                                                                as={`/update/${qr.id}`}>
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
                                                                            </Link>
                                                                            <button
                                                                                onClick={() =>
                                                                                    handleToggle(
                                                                                        qr.id,
                                                                                    )
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
                                                                                    handleDelete(
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <section>
                <div className="container">
                    <div className="row">
                        <Sidebar />
                        <div className="col-xl-8">
                            <div className="qr-show">
                                <div className="qr-nav">
                                    <div className="qr-count">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="36"
                                            height="36"
                                            viewBox="0 0 36 36"
                                            fill="none">
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M21.0423 3.5288L23.1148 5.65301L26.0806 5.61701C26.6472 5.61037 27.2095 5.71706 27.7343 5.93078C28.2592 6.14451 28.736 6.46097 29.1368 6.86158C29.5376 7.26219 29.8544 7.73886 30.0684 8.26359C30.2824 8.78832 30.3893 9.35053 30.383 9.91719L30.347 12.8875L32.4712 14.9577C32.8767 15.3538 33.199 15.827 33.419 16.3495C33.639 16.8719 33.7523 17.4331 33.7523 18C33.7523 18.5669 33.639 19.1281 33.419 19.6505C33.199 20.173 32.8767 20.6462 32.4712 21.0423L30.347 23.1148L30.383 26.0806C30.3896 26.6472 30.2829 27.2095 30.0692 27.7343C29.8555 28.2592 29.539 28.736 29.1384 29.1368C28.7378 29.5376 28.2611 29.8544 27.7364 30.0684C27.2117 30.2824 26.6495 30.3893 26.0828 30.383L23.1125 30.347L21.0423 32.4712C20.6462 32.8767 20.173 33.199 19.6505 33.419C19.1281 33.639 18.5669 33.7523 18 33.7523C17.4331 33.7523 16.8719 33.639 16.3495 33.419C15.827 33.199 15.3538 32.8767 14.9577 32.4712L12.8852 30.347L9.91944 30.383C9.35279 30.3896 8.79052 30.2829 8.26568 30.0692C7.74083 29.8555 7.264 29.539 6.86318 29.1384C6.46236 28.7378 6.14565 28.2611 5.93165 27.7364C5.71765 27.2117 5.61067 26.6495 5.61701 26.0828L5.65301 23.1125L3.5288 21.0423C3.12327 20.6462 2.80104 20.173 2.58103 19.6505C2.36103 19.1281 2.2477 18.5669 2.2477 18C2.2477 17.4331 2.36103 16.8719 2.58103 16.3495C2.80104 15.827 3.12327 15.3538 3.5288 14.9577L5.65301 12.8852L5.61701 9.91944C5.61037 9.35279 5.71706 8.79052 5.93078 8.26568C6.14451 7.74083 6.46097 7.264 6.86158 6.86318C7.26219 6.46236 7.73886 6.14565 8.26359 5.93165C8.78832 5.71765 9.35053 5.61067 9.91719 5.61701L12.8875 5.65301L14.9577 3.5288C15.3538 3.12327 15.827 2.80104 16.3495 2.58103C16.8719 2.36103 17.4331 2.2477 18 2.2477C18.5669 2.2477 19.1281 2.36103 19.6505 2.58103C20.173 2.80104 20.6462 3.12327 21.0423 3.5288ZM24.0509 3.39153L22.6512 1.95814C22.0455 1.33829 21.3221 0.845761 20.5233 0.509492C19.7246 0.173224 18.8666 0 18 0C17.1334 0 16.2755 0.173224 15.4767 0.509492C14.678 0.845761 13.9545 1.33829 13.3488 1.95814L11.9491 3.38928L9.94644 3.36678C9.07954 3.35652 8.21934 3.5197 7.41643 3.84673C6.61351 4.17375 5.88409 4.65802 5.27105 5.27105C4.65802 5.88409 4.17375 6.61351 3.84673 7.41643C3.5197 8.21934 3.35652 9.07954 3.36678 9.94644L3.39153 11.9491L1.95814 13.3488C1.33829 13.9545 0.845761 14.678 0.509492 15.4767C0.173224 16.2755 0 17.1334 0 18C0 18.8666 0.173224 19.7246 0.509492 20.5233C0.845761 21.3221 1.33829 22.0455 1.95814 22.6512L3.38928 24.0509L3.36678 26.0536C3.35652 26.9205 3.5197 27.7807 3.84673 28.5836C4.17375 29.3865 4.65802 30.1159 5.27105 30.729C5.88409 31.342 6.61351 31.8263 7.41643 32.1533C8.21934 32.4803 9.07954 32.6435 9.94644 32.6332L11.9491 32.6085L13.3488 34.0419C13.9545 34.6617 14.678 35.1542 15.4767 35.4905C16.2755 35.8268 17.1334 36 18 36C18.8666 36 19.7246 35.8268 20.5233 35.4905C21.3221 35.1542 22.0455 34.6617 22.6512 34.0419L24.0509 32.6107L26.0536 32.6332C26.9205 32.6435 27.7807 32.4803 28.5836 32.1533C29.3865 31.8263 30.1159 31.342 30.729 30.729C31.342 30.1159 31.8263 29.3865 32.1533 28.5836C32.4803 27.7807 32.6435 26.9205 32.6332 26.0536L32.6085 24.0509L34.0419 22.6512C34.6617 22.0455 35.1542 21.3221 35.4905 20.5233C35.8268 19.7246 36 18.8666 36 18C36 17.1334 35.8268 16.2755 35.4905 15.4767C35.1542 14.678 34.6617 13.9545 34.0419 13.3488L32.6107 11.9491L32.6332 9.94644C32.6435 9.07954 32.4803 8.21934 32.1533 7.41643C31.8263 6.61351 31.342 5.88409 30.729 5.27105C30.1159 4.65802 29.3865 4.17375 28.5836 3.84673C27.7807 3.5197 26.9205 3.35652 26.0536 3.36678L24.0509 3.39153ZM23.5416 14.1934C23.4848 14.0567 23.4017 13.9326 23.2969 13.8281C23.1924 13.7233 23.0683 13.6402 22.9316 13.5834C22.7949 13.5267 22.6483 13.4975 22.5004 13.4975C22.3524 13.4975 22.2058 13.5267 22.0691 13.5834C21.9324 13.6402 21.8083 13.7233 21.7038 13.8281L15.7497 19.7844L13.1709 17.2034C13.0663 17.0988 12.9421 17.0158 12.8054 16.9592C12.6688 16.9026 12.5223 16.8735 12.3743 16.8735C12.2264 16.8735 12.0799 16.9026 11.9432 16.9592C11.8066 17.0158 11.6824 17.0988 11.5778 17.2034C11.4731 17.308 11.3902 17.4322 11.3336 17.5689C11.2769 17.7056 11.2478 17.8521 11.2478 18C11.2478 18.1479 11.2769 18.2944 11.3336 18.4311C11.3902 18.5678 11.4731 18.692 11.5778 18.7966L14.9531 22.1719C15.0576 22.2767 15.1818 22.3598 15.3185 22.4165C15.4551 22.4733 15.6017 22.5025 15.7497 22.5025C15.8977 22.5025 16.0442 22.4733 16.1809 22.4165C16.3176 22.3598 16.4417 22.2767 16.5463 22.1719L23.2969 15.4212C23.4017 15.3167 23.4848 15.1926 23.5416 15.0559C23.5983 14.9192 23.6275 14.7726 23.6275 14.6247C23.6275 14.4767 23.5983 14.3301 23.5416 14.1934Z"
                                                fill="#00B2D9"
                                            />
                                        </svg>
                                        <p>
                                            Active Smart Cards{' '}
                                            <span>({totalQrCount})</span>
                                        </p>
                                    </div>

                                    <div className="qr-button">
                                        <Link href="/createqr">
                                            <button className="submit-form">
                                                Create New Smart Card
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="qr-list">
                                <ul className="qe-ul">
                                    {activeQr.map(qr => (
                                        <li key={qr.id}>
                                            <div className="row">
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
                                                                {qr.cardname}
                                                            </h3>

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
                                                                        d="M4.89104 5.66436C5.10112 5.00339 5.46669 4.40247 5.95706 3.91202L8.59904 1.27005C9.41223 0.45685 10.5152 0 11.6652 0C12.8152 0 13.9182 0.45685 14.7314 1.27005C15.5446 2.08324 16.0014 3.18618 16.0014 4.33621C16.0014 5.48625 15.5446 6.58918 14.7314 7.40238L12.7484 9.3853C12.7875 8.76094 12.7253 8.13224 12.5634 7.52522L13.7096 6.38056C14.2519 5.83817 14.5566 5.10254 14.5566 4.33549C14.5566 3.56844 14.2519 2.8328 13.7096 2.29042C13.1672 1.74803 12.4315 1.44332 11.6645 1.44332C10.8974 1.44332 10.1618 1.74803 9.61941 2.29042L6.97888 4.93239C6.62011 5.29112 6.36208 5.73796 6.23072 6.22801C6.09936 6.71806 6.09929 7.23405 6.23053 7.72413C6.36176 8.21421 6.61967 8.66111 6.97835 9.01994C7.33702 9.37876 7.78382 9.63686 8.27385 9.7683L7.15376 10.8898C6.52798 10.5908 5.98308 10.146 5.56477 9.59284C5.14646 9.03964 4.86696 8.39417 4.74973 7.7106C4.6325 7.02704 4.68096 6.32532 4.89104 5.66436ZM1.27005 8.59763L3.25297 6.6147C3.21379 7.24065 3.27626 7.86736 3.43797 8.47333L2.29186 9.618C1.74947 10.1604 1.44476 10.896 1.44476 11.6631C1.44476 12.4301 1.74947 13.1658 2.29186 13.7081C2.83425 14.2505 3.56988 14.5552 4.33693 14.5552C5.10399 14.5552 5.83962 14.2505 6.38201 13.7081L9.02254 11.0662C9.37842 10.7106 9.63535 10.2683 9.76791 9.78303C9.90048 9.29775 9.9041 8.78626 9.77842 8.29915C9.65274 7.81203 9.4021 7.36616 9.05129 7.00559C8.70048 6.64502 8.26163 6.38226 7.77815 6.24326C7.83996 6.13842 7.91474 6.04179 8.00072 5.95565L8.84766 5.10872C9.47343 5.40774 10.0183 5.85252 10.4366 6.40572C10.855 6.95892 11.1344 7.60439 11.2517 8.28795C11.3689 8.97152 11.3205 9.67324 11.1104 10.3342C10.9003 10.9952 10.5347 11.5961 10.0443 12.0865L7.40238 14.73C6.58918 15.5432 5.48625 16 4.33621 16C3.18618 16 2.08324 15.5432 1.27005 14.73C0.456849 13.9168 0 12.8138 0 11.6638C0 10.5138 0.456849 9.41082 1.27005 8.59763Z"
                                                                        fill="#B5B5B5"
                                                                    />
                                                                </svg>
                                                                <span>
                                                                    {`smartcardgenerator.net/${qr.slug.substring(
                                                                        0,
                                                                        5,
                                                                    )}`}
                                                                </span>
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
                                                                <p>scans</p>
                                                            </div>
                                                            <div className="details">
                                                                <Link href="details">
                                                                    Details
                                                                </Link>
                                                            </div>
                                                        </div>

                                                        <div className="scan-ain">
                                                            <div
                                                                className="margin:auto"
                                                                style={{
                                                                    display:
                                                                        'flex',
                                                                    alignItems:
                                                                        'center',
                                                                    justifyContent:
                                                                        'center',
                                                                }}>
                                                                <div
                                                                    ref={
                                                                        elementRef
                                                                    }
                                                                    style={{
                                                                        position:
                                                                            'relative',
                                                                        width: '100px',
                                                                        height: '100px',
                                                                    }}>
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
                                                        <div className="download-action">
                                                            <a
                                                                onClick={
                                                                    handleDownload
                                                                }
                                                                className="qr-downlod">
                                                                Download
                                                            </a>

                                                            <div className="qr-action">
                                                                <Link
                                                                    href={`/update/[id]`}
                                                                    as={`/update/${qr.id}`}>
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
                                                                </Link>
                                                                <button
                                                                    onClick={() =>
                                                                        handleToggle(
                                                                            qr.id,
                                                                        )
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
                                                                        handleDelete(
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
                        </div>
                    </div>
                </div>
            </section> */}
        </AppLayout>
    )
}

export default activecard
