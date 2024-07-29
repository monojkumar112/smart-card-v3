// Your component file

import { useEffect, useState, useRef } from 'react'

import axios from 'axios'
import { useAuth } from '@/hooks/auth'
import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import Sidebar from 'components/sidebar'
import Link from 'next/link'
import { FaEdit } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
const AppointmentList = () => {
    const { user } = useAuth({ middleware: 'auth' })
    const elementRef = useRef(null)

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
                                            <div className="qr-nav justify-end gap-3">
                                                <div className="qr-button">
                                                    <Link href="/appointment/create">
                                                        <button className="submit-form">
                                                            Create Appointment
                                                        </button>
                                                    </Link>
                                                </div>
                                                <div className="qr-button">
                                                    <Link href="/appointment/create_schedule">
                                                        <button className="submit-form">
                                                            Create Schedule
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="qr-list">
                                            <div className="table-responsive">
                                                <table className="table table-hover table-bordered">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">
                                                                Id
                                                            </th>
                                                            <th scope="col">
                                                                Name
                                                            </th>
                                                            <th scope="col">
                                                                Email
                                                            </th>
                                                            <th scope="col">
                                                                Phone
                                                            </th>
                                                            <th scope="col">
                                                                Start time
                                                            </th>
                                                            <th scope="col">
                                                                End time
                                                            </th>
                                                            <th scope="col">
                                                                Action
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <th scope="row">
                                                                1
                                                            </th>
                                                            <td>Mark</td>
                                                            <td>Otto</td>
                                                            <td>@mdo</td>
                                                            <td>@mdo</td>
                                                            <td>@mdo</td>
                                                            <td>
                                                                <div className="appointment-btn-action">
                                                                    <Link
                                                                        href={
                                                                            '#'
                                                                        }>
                                                                        <button className="edit-btn">
                                                                            <FaEdit />
                                                                        </button>
                                                                    </Link>
                                                                    <button className="delete-btn">
                                                                        <RiDeleteBin6Line />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    )
}

export default AppointmentList
