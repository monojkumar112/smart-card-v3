import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import React, { useRef, useState } from 'react'
import QRCode from 'qrcode.react'
import InputError from '@/components/InputError'
import { useAuth } from '@/hooks/auth'
import axios from 'axios'
import html2canvas from 'html2canvas'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Popup from '@/components/Popup/Popup'

function WebsiteUpdatePage({ websiteData }) {
    const baseuri = process.env.NEXT_PUBLIC_BACKEND_URL
    const { user } = useAuth({ middleware: 'auth' })
    const router = useRouter()
    const [previewActive, setPreviewActive] = useState(1)
      const [successMessage, setSuccessMessage] = useState('')
      const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [inputField, setInputField] = useState({
        websiteName: websiteData.website_name,
        websiteUrl: websiteData.website_url,
        status: 'active',
    })
    const [welcome, setWelcome] = useState({
        imageUrl: websiteData.image ? `${baseuri}/${websiteData.image}` : null,
        image: null,
    })

    const inputsHandler = e => {
        setInputField({
            ...inputField,
            [e.target.name]: e.target.value,
        })
    }

    const handleWelcome = e => {
        const selectedImage = e.target.files[0]
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
                    // console.log('File uploaded successfully!');
                } else {
                    console.error('Failed to upload file')
                }
            } catch (error) {
                console.error('Error uploading file', error)
            }
        }
    }

    const allInfoSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        setErrors({})

   
        const formData = new FormData()
        formData.append('website_name', inputField.websiteName)
        formData.append('website_url', inputField.websiteUrl)
        formData.append('image', welcome.image)
        formData.append('user_id', user?.id)
        formData.append('status', inputField.status)
      try {
          const res = await axios.post(
              `${baseuri}/api/update_website/${websiteData.id}`,
              formData,
          )
          if (res.data.status === 200) {
              setLoading(false)
              setSuccessMessage('Website Update successfully')
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
        // try {
        //     const response = await axios.post(
        //         `${baseuri}/api/update_website/${websiteData.id}`,
        //         formData,
        //         {
        //             headers: {
        //                 'Content-Type': 'multipart/form-data',
        //             },
        //         },
        //     )

        //     console.log('Response:', response)

        //     if (response.status === 200) {
        //         setLoading(false)
        //         alert('Form updated successfully')
        //         handleFileUpload()
        //         router.push('/dashboard')
        //     } else if (response.status === 422) {
        //         setErrors(response.data.errors)
        //     } else {
        //         alert(
        //             `An error occurred: ${
        //                 response.data.message || 'Please try again.'
        //             }`,
        //         )
        //     }
        // } catch (error) {
        //     console.error('Error submitting form:', error)
        //     alert(
        //         `An error occurred: ${
        //             error.response?.data?.message || error.message
        //         }. Please try again.`,
        //     )
        // } finally {
        //     setLoading(false)
        // }
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
                <title>Update Website</title>
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
                                                messages={errors.websitename}
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
                                                Type in the website name of your
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
                                                            placeholder="Enter your website link"
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
                                                300*300)
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
                                                                            type="button"
                                                                            onClick={
                                                                                handleRemoveWelcome
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
                                                    setPreviewActive(1)
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
                                                        position: 'relative',
                                                        width: '250px',
                                                        height: '250px',
                                                    }}
                                                    className="qr-image-wrapper">
                                                    <QRCode
                                                        value={`${inputField.websiteUrl}`}
                                                        size={250}
                                                    />
                                                    {welcome.imageUrl && (
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
                                                    )}
                                                </div>
                                            </div>
                                            <div className="qr-download mt-3">
                                                <button
                                                    type="button"
                                                    className="custom-btn"
                                                    onClick={handleDownload}>
                                                    Download QR Code
                                                </button>
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

export async function getServerSideProps(context) {
    const { params } = context
    const { id } = params

    try {
        const baseuri = process.env.NEXT_PUBLIC_BACKEND_URL
        const response = await fetch(`${baseuri}/api/edit_website/${id}`)

        if (!response.ok) {
            throw new Error('Failed to fetch Website data')
        }

        const websiteData = await response.json()

        return {
            props: {
                websiteData: websiteData.website || null, // Access the `website` property correctly
            },
        }
    } catch (error) {
        console.error('Error fetching Website data:', error)
        return {
            props: {
                websiteData: null,
            },
        }
    }
}

export default WebsiteUpdatePage
