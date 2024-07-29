import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import React, { useEffect, useRef, useState } from 'react'
import QRCode from 'qrcode.react'
import html2canvas from 'html2canvas'
import InputError from '@/components/InputError'
import { useAuth } from '@/hooks/auth'
import axios from 'axios'
import { useReactToPrint } from 'react-to-print'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Popup from '@/components/Popup/Popup'

function WebsitePage() {
    const baseuri = process.env.NEXT_PUBLIC_BACKEND_URL
    const { user } = useAuth({ middleware: 'auth' })
    const router = useRouter()
    const [previewActive, setPreviewActive] = useState(1)
    const handlePreview = index => {
        setPreviewActive(index)
    }
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [errors, setErrors] = useState({
        websiteName: '',
        email1: '',
    })
    const [loading, setLoading] = useState(false)
    const [inputField, setInputField] = useState({
        websiteName: '',
        websiteUrl: '',
        status: 'active',
    })
    const inputsHandler = e => {
        e.persist()
        setInputField({
            ...inputField,
            [e.target.name]: e.target.value,
        })
    }

    const [welcome, setWelcome] = useState({
        image: '',
        imageUrl: null,
    })

    const handleWelcome = e => {
        const selectedImage = e.target.files[0]

        const maxSize = 300 * 300 // 1MB (adjust as needed)
        const allowedExtensions = ['jpg', 'jpeg', 'png'] // Add allowed extensions

        if (selectedImage.size > maxSize) {
            alert('File size exceeds the maximum allowed size.')
            return
        }

        const fileExtension = selectedImage.name.split('.').pop().toLowerCase()
        if (!allowedExtensions.includes(fileExtension)) {
            alert('Invalid file type. Please upload a valid image file.')
            return
        }

        setWelcome({
            image: selectedImage,
            imageUrl: URL.createObjectURL(selectedImage),
        })
    }

    const handleRemoveWelcome = () => {
        setWelcome({
            image: null,
            imageUrl: null,
        })
    }

    const handleFileUpload = async () => {
        if (welcome.image) {
            const formData = new FormData()
            formData.append('file', welcome.image)
            try {
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                })

                if (response.ok) {
                    console.log('File uploaded successfully!')
                } else {
                    console.error('Failed to upload file')
                }
            } catch (error) {
                console.error('Error uploading file', error)
            }
        }
    }
    // Handle form submission
    const allInfoSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData()
        formData.append('website_name', inputField.websiteName)
        formData.append('website_url', inputField.websiteUrl)
        formData.append('image', welcome.image)
        formData.append('user_id', user?.id)
        formData.append('status', inputField.status)
       
        try {
            const res = await axios.post(
                `${baseuri}/api/create-website`,
                formData,
            )
            if (res.data.status === 200) {
                setLoading(false)
                setSuccessMessage('Website created successfully')
                handleFileUpload()
                setTimeout(() => router.push('/dashboard'), 2000)
            } else if (res.data.status === 422 && res.data.errors) {
                setLoading(false)
                setErrors(res.data.errors)
            } else {
                setLoading(false)
                setErrorMessage('An error occurred. Please try again.')
            }
        } catch (error) {
            setLoading(false)
            console.error('An error occurred:', error)
            setErrorMessage('An error occurred. Please try again.')
        }
       
    }

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
            link.download = 'my-image-name.png'
            link.href = dataUrl
            link.click()
        } catch (error) {
            console.error('Error:', error)
        }
    }

    return (
        <AppLayout>
            <Head>
                <title>Create Website </title>
            </Head>

            <section>
                <div className="account-details">
                    <form onSubmit={allInfoSubmit}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 mb-4">
                                    <div className="mb-4 d-flex align-items-center gap-4">
                                        <div className="product-icon">
                                            <img
                                                src="/img/icons/website.svg"
                                                alt=""
                                            />
                                        </div>
                                        <div className="product-input w-100">
                                            <input
                                                id="websiteName"
                                                type="text"
                                                name="websiteName"
                                                className="form-control"
                                                onChange={inputsHandler}
                                                value={inputField.websiteName}
                                                autoFocus
                                                placeholder="Name your QR Website"
                                            />
                                            <InputError
                                                messages={errors.websiteName}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group-wrapper mt-3">
                                        <div
                                            className="form-group-title"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#website"
                                            aria-expanded="false"
                                            aria-controls="website">
                                            <p>Basic Information</p>
                                            <div className="bottom-arrow">
                                                <img
                                                    src="/img/icons/bottom-arrow.svg"
                                                    alt=""
                                                />
                                            </div>
                                        </div>

                                        <div
                                            className="information-form collapse show"
                                            id="website">
                                            <p>
                                                Type in the website link of your
                                                business to link with the QR
                                                Code.
                                            </p>
                                            <div className="row mt-3">
                                                <div className="col-md-2">
                                                    <div className="info-form-label">
                                                        <p>Website Link:</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-10">
                                                    <div className="mb-3 instagram-input-fluid">
                                                        <span>@ *</span>
                                                        <input
                                                            id="websiteUrl"
                                                            type="text"
                                                            name="websiteUrl"
                                                            className="form-control"
                                                            onChange={
                                                                inputsHandler
                                                            }
                                                            value={
                                                                inputField.websiteUrl
                                                            }
                                                            placeholder="Enter your Website link"
                                                        />
                                                    </div>
                                                    <InputError
                                                        messages={
                                                            errors.websiteUrl
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group-wrapper mt-3">
                                        <div
                                            className="form-group-title"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#welScreen"
                                            aria-expanded="true"
                                            aria-controls="welScreen">
                                            <p>Upload your logo</p>
                                            <div className="bottom-arrow">
                                                <img
                                                    src="/img/icons/bottom-arrow.svg"
                                                    alt=""
                                                />
                                            </div>
                                        </div>

                                        <div
                                            className="color-plate collapse show"
                                            id="welScreen">
                                            <p className="mb-3">
                                                Display your logo while your
                                                page is loading: (Max Image Size
                                                300*300 )
                                            </p>

                                            <div className="row d-flex justify-content-center">
                                                <div className="col-md-5">
                                                    <div className="upload-image">
                                                        <div className="view-image-upload">
                                                            {welcome.imageUrl ? (
                                                                <div>
                                                                    <img
                                                                        src={
                                                                            welcome.imageUrl
                                                                        }
                                                                        className="upload-ims"
                                                                        alt="Uploaded Image"
                                                                    />
                                                                    <div className="btn-container">
                                                                        <button
                                                                            onClick={() =>
                                                                                handleRemoveWelcome(
                                                                                    welcome.image,
                                                                                )
                                                                            }>
                                                                            <img
                                                                                src="/img/icon/xx.svg"
                                                                                alt=""
                                                                            />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                        <div className="upload-input">
                                                            <div className="file-btn custom-btn">
                                                                Upload
                                                                <input
                                                                    type="file"
                                                                    className="file-input"
                                                                    id="welcome"
                                                                    name="welcome"
                                                                    onChange={
                                                                        handleWelcome
                                                                    }
                                                                />
                                                                <InputError
                                                                    messages={
                                                                        errors.welcome
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 mb-4">
                                    <div className="preview">
                                        <div className="preview-btn-con mb-4">
                                            <div
                                                className={
                                                    previewActive === 1
                                                        ? 'preview-bar active'
                                                        : 'preview-bar'
                                                }
                                                onClick={() => {
                                                    handlePreview(1)
                                                }}>
                                                <p>Preview</p>
                                            </div>
                                        </div>

                                        <div
                                            className={
                                                previewActive === 1
                                                    ? 'show-preview-right active'
                                                    : 'show-preview-right'
                                            }>
                                            <div className="instagram-preview-username">
                                                <h4>Website Name</h4>
                                                <span>
                                                    {inputField.websiteName}
                                                </span>
                                            </div>
                                            <div className="smart-code-preview">
                                                <div
                                                    ref={elementRef}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent:
                                                            'center',
                                                        padding: '20px',
                                                    }}>
                                                    <div
                                                        style={{
                                                            position:
                                                                'relative',
                                                            width: '250px',
                                                            height: '250px',
                                                        }}
                                                        className="qr-image-wrapper">
                                                        <QRCode
                                                            value={`${inputField.websiteUrl}`}
                                                            size={250}
                                                        />
                                                        <img
                                                            src={
                                                                welcome.imageUrl
                                                            }
                                                            width={100}
                                                            height={100}
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
                                            <div className="qr-download mt-3">
                                                <a
                                                    className="custom-btn"
                                                    onClick={handleDownload}>
                                                    Download QR Code
                                                </a>
                                            </div>
                                            <div className="card-list-right text-center">
                                                <h1 className="opening-preview-title">
                                                    Scan this QR Code to preview
                                                </h1>
                                                <p>
                                                    You can customize the design
                                                    of your QR Code in the next
                                                    step.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="submit-form footer-submit-from">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="submit-back">
                                            <Link
                                                href={'/dashboard'}
                                                className="back">
                                                {'< Back'}
                                            </Link>

                                            {loading ? (
                                                <div className="submit-details-form">
                                                    Loading...
                                                </div>
                                            ) : (
                                                <button
                                                    className="submit-details-form"
                                                    type="submit">
                                                    Submit
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
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

export default WebsitePage
