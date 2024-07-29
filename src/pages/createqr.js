import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import React, { useEffect, useRef, useState } from 'react'
import QRCode from 'qrcode.react'
// import htmlToImage from 'html-to-image'
import InputError from '@/components/InputError'
import { useAuth } from '@/hooks/auth'
// import { DataIcons } from '@/DataIcon/DataIcons'
import axios from 'axios'
import { useReactToPrint } from 'react-to-print'
import Link from 'next/link'
import html2canvas from 'html2canvas'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

import {
    FaFacebookF,
    FaInstagram,
    FaBehance,
    FaLinkedin,
    FaYoutube,
    FaGoogle,
    FaApple,
    FaFigma,
    FaReddit,
    FaDiscord,
    FaTiktok,
    FaTumblr,
    FaTelegram,
    FaPinterest,
    FaGithub,
    FaWhatsapp,
    FaSkype,
    FaSpotify,
} from 'react-icons/fa'
import { FaSnapchat, FaXTwitter, FaGoogleScholar } from 'react-icons/fa6'
import Popup from '@/components/Popup/Popup'
import { useRouter } from 'next/router'
function CreateQR() {
    const { user } = useAuth({ middleware: 'auth' })
    const router = useRouter()
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
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

    const [previewActive, setPreviewActive] = useState(1)
    const handlePreview = index => {
        setPreviewActive(index)
    }
    const [loading, setLoading] = useState(false)
    const [isChecked, setIsChecked] = useState(false)
    const [selectedValue, setSelectedValue] = useState('')
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    // Function to handle select box changes
    const handleSelectChange = event => {
        setSelectedValue(event.target.value)
    }

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked)
    }

    // ============= Social Media Items Start ================
    const [selectedSocialPlatforms, setSelectedSocialPlatforms] = useState([])
    const [previewIcons, setPreviewIcons] = useState([])
    const addInputField = socialPlatform => {
        if (!selectedSocialPlatforms.includes(socialPlatform)) {
            setSelectedSocialPlatforms(prevPlatforms => [
                ...prevPlatforms,
                socialPlatform,
            ])
            setPreviewIcons(prevIcons => [...prevIcons, socialPlatform])
        }
    }

    const removeInputField = socialPlatform => {
        setSelectedSocialPlatforms(prevPlatforms =>
            prevPlatforms.filter(platform => platform !== socialPlatform),
        )
        setPreviewIcons(prevIcons =>
            prevIcons.filter(icon => icon !== socialPlatform),
        )
    }

    // const renderPreviewIcons = () => {
    //     return previewIcons.map((socialPlatform, index) => (
    //         <div key={index} className="preview-icon-item">
    //             <a href={inputField[socialPlatform]}>
    //                 <img
    //                     src={
    //                         DataIcons.find(
    //                             item => item.name.toLowerCase() === socialPlatform
    //                         )?.img
    //                     }
    //                     alt={socialPlatform}
    //                 />
    //             </a>
    //         </div>
    //     ));
    // };
    const renderPreviewIcons = () => {
        return previewIcons.map((socialPlatform, index) => {
            const foundIcon = DataIcons.find(
                icon =>
                    icon.name.toLowerCase() === socialPlatform.toLowerCase(),
            )
            if (foundIcon) {
                const IconComponent = foundIcon.icon
                return (
                    <div key={index} className="preview-icon-item">
                        <a href={inputField[socialPlatform]}>
                            <IconComponent />
                        </a>
                    </div>
                )
            } else {
                return null
            }
        })
    }

    const renderInputFields = () => {
        return selectedSocialPlatforms.map((socialPlatform, index) => {
            const dataIcon = DataIcons.find(
                item => item.name.toLowerCase() === socialPlatform,
            )
            const placeholderText = dataIcon?.placeholder || socialPlatform

            return (
                <div key={index} className="row d-flex align-items-center mb-2">
                    <div className="col-md-3">
                        {dataIcon && (
                            <div className="info-form-label" key={dataIcon.id}>
                                <p>{dataIcon.placeholder || dataIcon.name}</p>
                                <span>{<dataIcon.icon />}</span>
                            </div>
                        )}
                    </div>
                    <div className="col-md-9">
                        <div className="social-media-field">
                            <div className="social-input-fields">
                                <div className="icon-send">
                                    <span>URL</span>
                                    <span>*</span>
                                </div>
                                <div className="social-item">
                                    <input
                                        type="text"
                                        placeholder={placeholderText}
                                        id={socialPlatform}
                                        name={socialPlatform}
                                        value={inputField[socialPlatform] || ''}
                                        onChange={inputsHandler}
                                    />
                                    <span>
                                        <InputError
                                            messages={errors[socialPlatform]}
                                            className="mt-2"
                                        />
                                    </span>
                                </div>
                            </div>
                            <div
                                onClick={() =>
                                    removeInputField(socialPlatform)
                                }>
                                <span>&#10006;</span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    // ============= Social Media Items end ================

    // ==================radio button color change ===============
    const [selectedColor, setSelectedColor] = useState('#FFB317')

    const [buttonColor, setButtoncolor] = useState('#555555')

    const [secondaryColorScheme, setSecondarycolorscheme] = useState('#555555')

    const divStyle = {
        background: isChecked
            ? `linear-gradient(133deg, ${selectedColor} 0%, ${secondaryColorScheme} 97.22%)`
            : `${selectedColor}`,
    }
    // =====================end================

    const [inputField, setInputField] = useState({
        cardName: '',
        firstName: '',
        lastName: '',
        email1: '',
        email2: '',
        phone1: '',
        phone2: '',
        mobile1: '',
        mobile2: '',
        mobile3: '',
        mobile4: '',
        fax: '',
        fax2: '',
        address1: '',
        address2: '',
        webaddress1: '',
        webaddress2: '',
        companyName: '',
        jobTitle: '',
        mainColor: selectedColor,
        gradientColor: secondaryColorScheme,
        buttonColor: buttonColor,
        checkgradient: isChecked,
        summary: '',
        cardtype: selectedValue,
        status: 'active',

        // ==================sociel link================
        facebook: '',
        twitter: '',
        instagram: '',
        youtube: '',
        github: '',

        behance: '',
        linkedin: '',
        spotify: '',
        tumblr: '',
        telegram: '',
        pinterest: '',
        snapchat: '',
        reddit: '',
        google: '',
        apple: '',
        figma: '',
        discord: '',
        tiktok: '',
        whatsapp: '',
        skype: '',
        google_scholar: '',
    })

    const handleColorChange = event => {
        setSelectedColor(event.target.value)
    }
    const inputsHandler = e => {
        // e.persist()
        setInputField({
            ...inputField,
            [e.target.name]: e.target.value,
        })
    }
    const handleInputChange = value => {
        setInputField(prev => ({ ...prev, summary: value }))
    }

    const [picture, setPicture] = useState({
        image: null,
        imageUrl: null,
    })
    // Info: Branding Info

    const handleImage = e => {
        const selectedImage = e.target.files[0]

        setPicture({
            image: selectedImage,
            imageUrl: URL.createObjectURL(selectedImage),
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

        // Update the state with the validated image information
        setWelcome({
            image: selectedImage,
            imageUrl: URL.createObjectURL(selectedImage),
        })
    }

    const handleRemoveWelcome = () => {
        // Handle removal logic, set the image state to null
        setWelcome({
            image: null,
            imageUrl: null,
        })
    }
    // =========================

    // const slugify = require('slugify')
    // function generateRandomNumber() {
    //     const min = 100
    //     const max = 999
    //     return Math.floor(Math.random() * (max - min + 1)) + min
    // }
    // // Example usage
    // const id = user?.id
    // const name = inputField.cardName
    // const firstName = inputField.firstName
    // const lastName = inputField.lastName

    // const uniqueSlug = generateUniqueSlug(
    //     firstName,
    //     lastName,
    //     generateRandomNumber,
    // )

    // function generateUniqueSlug(firstName, lastName) {
    //     const timestamp = new Date().getTime()

    //     const combinedString = `${firstName}${lastName}`

    //     const slug = slugify(combinedString, {
    //         lower: true,
    //         remove: /[*+~.()'"!:@]/g,
    //     })

    //     return slug
    // }

    const slugify = require('slugify')

    function generateRandomNumber() {
        const min = 1000000
        const max = 9999999
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    // Example usage
    const firstName = inputField.firstName
    const lastName = inputField.lastName

    // Call the function here to get the random number
    const randomNumber = generateRandomNumber()

    const uniqueSlug = generateUniqueSlug(firstName, lastName, randomNumber)

    function generateUniqueSlug(firstName, lastName, randomNumber) {
        const timestamp = new Date().getTime()

        const combinedString = `${firstName}${lastName}-${randomNumber}`

        const slug = slugify(combinedString, {
            lower: true,
            remove: /[*+~.()'"!:@]/g,
        })

        return slug
    }

    const [errors, setErrors] = useState({
        cardName: '',
        email1: '',
    })

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
    const allInfoSubmit = e => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData()
        formData.append('cardname', inputField.cardName)
        formData.append('firstname', inputField.firstName)
        formData.append('lastname', inputField.lastName)
        formData.append('email1', inputField.email1)
        formData.append('email2', inputField.email2)
        formData.append('phone1', inputField.phone1)
        formData.append('phone2', inputField.phone2)
        formData.append('mobile1', inputField.mobile1)
        formData.append('mobile2', inputField.mobile2)
        formData.append('mobile3', inputField.mobile3)
        formData.append('mobile4', inputField.mobile4)
        formData.append('fax', inputField.fax)
        formData.append('fax2', inputField.fax2)
        formData.append('address1', inputField.address1)
        formData.append('address2', inputField.address2)
        formData.append('maincolor', selectedColor)
        formData.append('webaddress1', inputField.webaddress1)
        formData.append('webaddress2', inputField.webaddress2)
        formData.append('companyname', inputField.companyName)
        formData.append('jobtitle', inputField.jobTitle)
        formData.append('gradientcolor', secondaryColorScheme)
        formData.append('buttoncolor', inputField.buttonColor)
        formData.append('checkgradient', isChecked)
        formData.append('summary', inputField.summary)
        formData.append('cardtype', selectedValue)

        formData.append('image', picture.image)
        formData.append('welcomeimage', welcome.image)
        formData.append('user_id', user?.id)
        formData.append('slug', uniqueSlug)
        formData.append('status', inputField.status)

        formData.append('facebook', inputField.facebook)
        formData.append('twitter', inputField.twitter)
        formData.append('instagram', inputField.instagram)
        formData.append('youtube', inputField.youtube)
        formData.append('github', inputField.github)

        formData.append('behance', inputField.behance)
        formData.append('linkedin', inputField.linkedin)
        formData.append('spotify', inputField.spotify)
        formData.append('tumblr', inputField.tumblr)
        formData.append('telegram', inputField.telegram)
        formData.append('pinterest', inputField.pinterest)
        formData.append('snapchat', inputField.snapchat)
        formData.append('reddit', inputField.reddit)
        formData.append('google', inputField.google)
        formData.append('apple', inputField.apple)
        formData.append('figma', inputField.figma)
        formData.append('discord', inputField.discord)
        formData.append('tiktok', inputField.tiktok)
        formData.append('whatsapp', inputField.whatsapp)
        formData.append('skype', inputField.skype)
        formData.append('google_scholar', inputField.google_scholar)

        console.log(formData)

        const baseuri = process.env.NEXT_PUBLIC_BACKEND_URL

        axios
            .post(`${baseuri}/api/qrcreate`, formData)
            .then(res => {
                if (res.data.status === 200) {
                    setLoading(false)
                    setSuccessMessage('Smart Card QR Created Successfully')
                    handleFileUpload()
                    setTimeout(() => router.push('/dashboard'), 2000)
                } else if (res.data.status === 422 && res.data.errors) {
                    setLoading(false)
                    const fieldErrors = res.data.errors

                    // Update state with errors
                    setErrors(fieldErrors)
                    const errorMessages = Object.values(res.data.errors).flat()
                    setErrorMessage(
                        'Validation Error:\n' + errorMessages.join('\n'),
                    )
                } else {
                    setLoading(false)
                    setErrorMessage('An error occurred. Please try again.')
                }
            })
            .catch(error => {
                setLoading(false)
                console.log('An error occurred. Please try again.')
            })
    }

    const componentRef = useRef()

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    return (
        <AppLayout>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                <title>Create QR - Smart Card Generator</title>
                <meta property="og:type" content="website" />
                <meta
                    property="og:url"
                    content="https://smartcardgenerator.net/createqr"
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
                    content="Create QR - Smart Card Generator"
                />
                <meta
                    property="og:image"
                    content="/img/meta_image/createQR.jpg"
                />
                <meta property="image" content="/img/meta_image/createQR.jpg" />
                <meta property="og:site_name" content="Smart Card Generator" />
                <meta
                    property="og:image"
                    content="/img/meta_image/createQR.jpg"
                />
                <meta property="image" content="/img/meta_image/createQR.jpg" />
                <meta property="og:site_name" content="Smart Card Generator" />
            </Head>

            <section>
                <div className="account-details">
                    <form onSubmit={allInfoSubmit}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 mb-4">
                                    <div className="mb-4  d-flex align-items-center gap-4">
                                        <div className="product-icon">
                                            <svg
                                                width="38"
                                                height="38"
                                                viewBox="0 0 32 32"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M28.1539 7.21289H4.03373C2.96647 7.21289 2.1001 8.07539 2.1001 9.13789V23.1004C2.1001 24.1629 2.96647 25.0254 4.03373 25.0254H28.1665C29.2337 25.0254 30.1001 24.1629 30.1001 23.1004V9.13789C30.1001 8.07539 29.2212 7.21289 28.1539 7.21289ZM29.1584 23.1004C29.1584 23.6504 28.7064 24.0879 28.1665 24.0879H4.03373C3.48126 24.0879 3.0418 23.6379 3.0418 23.1004V9.13789C3.0418 8.58789 3.49382 8.15039 4.03373 8.15039H28.1665C28.7189 8.15039 29.1584 8.60039 29.1584 9.13789V23.1004Z"
                                                    fill="#898989"
                                                />
                                                <path
                                                    d="M9.4956 11.2129C6.74582 11.2129 4.49829 13.4379 4.49829 16.1879C4.49829 18.9379 6.73327 21.1629 9.4956 21.1629C12.2579 21.1629 14.4929 18.9379 14.4929 16.1879C14.4929 13.4379 12.2454 11.2129 9.4956 11.2129ZM8.00143 19.9254V18.5879C8.00143 18.2879 8.23999 18.0504 8.54134 18.0504H10.5252C10.8265 18.0504 11.0651 18.2879 11.0651 18.5879V19.8879C10.5754 20.0879 10.0481 20.2129 9.48304 20.2129C8.96825 20.2129 8.45345 20.1129 8.00143 19.9254ZM12.0194 19.3254V18.5754C12.0194 17.7629 11.3539 17.1004 10.5378 17.1004H8.54134C7.7252 17.1004 7.05973 17.7629 7.05973 18.5754V19.3879C6.08035 18.6504 5.45255 17.4879 5.45255 16.1754C5.45255 13.9504 7.27318 12.1379 9.50816 12.1379C11.7431 12.1379 13.5638 13.9504 13.5638 16.1754C13.5386 17.4504 12.9485 18.5879 12.0194 19.3254Z"
                                                    fill="#898989"
                                                />
                                                <path
                                                    d="M9.49565 12.6377C8.32793 12.6377 7.38623 13.5877 7.38623 14.7377C7.38623 15.8877 8.34049 16.8377 9.49565 16.8377C10.6634 16.8377 11.6051 15.8877 11.6051 14.7377C11.6051 13.5877 10.6508 12.6377 9.49565 12.6377ZM9.49565 15.9127C8.85529 15.9127 8.32793 15.3877 8.32793 14.7502C8.32793 14.1127 8.85529 13.5877 9.49565 13.5877C10.136 13.5877 10.6634 14.1127 10.6634 14.7502C10.6634 15.3877 10.136 15.9127 9.49565 15.9127Z"
                                                    fill="#898989"
                                                />
                                                <path
                                                    d="M22.8175 13.1377H16.4139C16.1502 13.1377 15.9368 13.3502 15.9368 13.6127C15.9368 13.8752 16.1502 14.0877 16.4139 14.0877H22.8175C23.0812 14.0877 23.2946 13.8752 23.2946 13.6127C23.2946 13.3502 23.0686 13.1377 22.8175 13.1377Z"
                                                    fill="#898989"
                                                />
                                                <path
                                                    d="M26.5343 13.1377H24.6634C24.3997 13.1377 24.1863 13.3502 24.1863 13.6127C24.1863 13.8752 24.3997 14.0877 24.6634 14.0877H26.5343C26.7979 14.0877 27.0114 13.8752 27.0114 13.6127C27.0114 13.3502 26.7979 13.1377 26.5343 13.1377Z"
                                                    fill="#898989"
                                                />
                                                <path
                                                    d="M22.8175 15.6377H16.4139C16.1502 15.6377 15.9368 15.8502 15.9368 16.1127C15.9368 16.3752 16.1502 16.5877 16.4139 16.5877H22.8175C23.0812 16.5877 23.2946 16.3752 23.2946 16.1127C23.2946 15.8502 23.0686 15.6377 22.8175 15.6377Z"
                                                    fill="#898989"
                                                />
                                                <path
                                                    d="M26.5343 15.6377H24.6634C24.3997 15.6377 24.1863 15.8502 24.1863 16.1127C24.1863 16.3752 24.3997 16.5877 24.6634 16.5877H26.5343C26.7979 16.5877 27.0114 16.3752 27.0114 16.1127C27.0114 15.8502 26.7979 15.6377 26.5343 15.6377Z"
                                                    fill="#898989"
                                                />
                                                <path
                                                    d="M22.8175 18.1377H16.4139C16.1502 18.1377 15.9368 18.3502 15.9368 18.6127C15.9368 18.8752 16.1502 19.0877 16.4139 19.0877H22.8175C23.0812 19.0877 23.2946 18.8752 23.2946 18.6127C23.2946 18.3502 23.0686 18.1377 22.8175 18.1377Z"
                                                    fill="#898989"
                                                />
                                                <path
                                                    d="M26.5343 18.1377H24.6634C24.3997 18.1377 24.1863 18.3502 24.1863 18.6127C24.1863 18.8752 24.3997 19.0877 24.6634 19.0877H26.5343C26.7979 19.0877 27.0114 18.8752 27.0114 18.6127C27.0114 18.3502 26.7979 18.1377 26.5343 18.1377Z"
                                                    fill="#898989"
                                                />
                                            </svg>
                                        </div>
                                        <div className="product-input w-100">
                                            <input
                                                id="cardName"
                                                type="text"
                                                name="cardName"
                                                className="form-control "
                                                onChange={inputsHandler}
                                                value={inputField.cardName}
                                                autoFocus
                                                placeholder="Name your Smart Card"
                                            />
                                            <InputError
                                                messages={errors.cardname}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group-wrapper">
                                        <div
                                            className="form-group-title"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#colorPicker"
                                            aria-expanded="true"
                                            aria-controls="colorPicker">
                                            <p>
                                                Design and customize your Smart
                                                Card
                                            </p>
                                            <div className="bottom-arrow">
                                                <img
                                                    src="/img//icons/bottom-arrow.svg"
                                                    alt=""
                                                />
                                            </div>
                                        </div>

                                        <div
                                            className="color-plate collapse show"
                                            id="colorPicker">
                                            <p>
                                                Personalize your Smart Card by
                                                selecting colors.
                                            </p>
                                            <div className="color-point">
                                                <label className="custom-radio">
                                                    <input
                                                        type="radio"
                                                        value="#FF0000"
                                                        checked={
                                                            selectedColor ===
                                                            '#FF0000'
                                                        }
                                                        onChange={
                                                            handleColorChange
                                                        }
                                                    />

                                                    <span className="radio-btn">
                                                        <div className="hobbies-icon">
                                                            <img src="img/color/1.png" />
                                                        </div>
                                                        <img
                                                            src="img/icon/mark.svg"
                                                            className="mark-icon"
                                                            alt=""
                                                        />
                                                    </span>
                                                </label>
                                                <label className="custom-radio">
                                                    <input
                                                        type="radio"
                                                        name="radio"
                                                        value="#fb3d97"
                                                        checked={
                                                            selectedColor ===
                                                            '#fb3d97'
                                                        }
                                                        onChange={
                                                            handleColorChange
                                                        }
                                                    />
                                                    <span className="radio-btn">
                                                        <div className="hobbies-icon">
                                                            <img src="img/color/2.png" />
                                                        </div>
                                                        <img
                                                            src="img/icon/mark.svg"
                                                            className="mark-icon"
                                                            alt=""
                                                        />
                                                    </span>
                                                </label>
                                                <label className="custom-radio">
                                                    <input
                                                        type="radio"
                                                        name="radio"
                                                        value="#851DD7"
                                                        checked={
                                                            selectedColor ===
                                                            '#851DD7'
                                                        }
                                                        onChange={
                                                            handleColorChange
                                                        }
                                                    />
                                                    <span className="radio-btn">
                                                        <div className="hobbies-icon">
                                                            <img src="img/color/3.png" />
                                                        </div>
                                                        <img
                                                            src="img/icon/mark.svg"
                                                            className="mark-icon"
                                                            alt=""
                                                        />
                                                    </span>
                                                </label>
                                                <label className="custom-radio">
                                                    <input
                                                        type="radio"
                                                        name="radio"
                                                        value="#1023CA"
                                                        checked={
                                                            selectedColor ===
                                                            '#1023CA'
                                                        }
                                                        onChange={
                                                            handleColorChange
                                                        }
                                                    />
                                                    <span className="radio-btn">
                                                        <div className="hobbies-icon">
                                                            <img src="img/color/4.png" />
                                                        </div>
                                                        <img
                                                            src="img/icon/mark.svg"
                                                            className="mark-icon"
                                                            alt=""
                                                        />
                                                    </span>
                                                </label>
                                                <label className="custom-radio">
                                                    <input
                                                        type="radio"
                                                        name="radio"
                                                        value="#FFB317"
                                                        checked={
                                                            selectedColor ===
                                                            '#FFB317'
                                                        }
                                                        onChange={
                                                            handleColorChange
                                                        }
                                                    />
                                                    <span className="radio-btn">
                                                        <div className="hobbies-icon">
                                                            <img src="img/color/5.png" />
                                                        </div>
                                                        <img
                                                            src="img/icon/mark.svg"
                                                            className="mark-icon"
                                                            alt=""
                                                        />
                                                    </span>
                                                </label>
                                                <label className="custom-radio">
                                                    <input
                                                        type="radio"
                                                        name="radio"
                                                        value="#00D5D2"
                                                        checked={
                                                            selectedColor ===
                                                            '#00D5D2'
                                                        }
                                                        onChange={
                                                            handleColorChange
                                                        }
                                                    />
                                                    <span className="radio-btn">
                                                        <div className="hobbies-icon">
                                                            <img src="img/color/6.png" />
                                                        </div>
                                                        <img
                                                            src="img/icon/mark.svg"
                                                            className="mark-icon"
                                                            alt=""
                                                        />
                                                    </span>
                                                </label>
                                                <label className="custom-radio">
                                                    <input
                                                        type="radio"
                                                        name="radio"
                                                        value="#21CD12"
                                                        checked={
                                                            selectedColor ===
                                                            '#21CD12'
                                                        }
                                                        onChange={
                                                            handleColorChange
                                                        }
                                                    />
                                                    <span className="radio-btn">
                                                        <div className="hobbies-icon">
                                                            <img src="img/color/7.png" />
                                                        </div>
                                                        <img
                                                            src="img/icon/mark.svg"
                                                            className="mark-icon"
                                                            alt=""
                                                        />
                                                    </span>
                                                </label>
                                                <label className="custom-radio">
                                                    <input
                                                        type="radio"
                                                        name="radio"
                                                        value="#000000"
                                                        checked={
                                                            selectedColor ===
                                                            '#000000'
                                                        }
                                                        onChange={
                                                            handleColorChange
                                                        }
                                                    />
                                                    <span className="radio-btn">
                                                        <div className="hobbies-icon">
                                                            <img src="img/color/8.png" />
                                                        </div>
                                                        <img
                                                            src="img/icon/mark.svg"
                                                            className="mark-icon"
                                                            alt=""
                                                        />
                                                    </span>
                                                </label>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-3">
                                                    <label
                                                        htmlFor="Primarycolor"
                                                        className="form-label color-pic-label">
                                                        Primary color
                                                    </label>
                                                    <div className="pic-with-color">
                                                        <p>{selectedColor}</p>
                                                        <input
                                                            type="color"
                                                            className=" form-control-color"
                                                            name="primaryColor"
                                                            value={
                                                                selectedColor
                                                            }
                                                            onChange={
                                                                handleColorChange
                                                            }
                                                            id="Primarycolor"
                                                            title="Choose your color"></input>
                                                    </div>
                                                </div>

                                                <div className="col-md-3">
                                                    <label
                                                        htmlFor="Primarycolor"
                                                        className="form-label color-pic-label">
                                                        Button color
                                                    </label>
                                                    <div className="pic-with-color">
                                                        <p>{buttonColor}</p>
                                                        <input
                                                            type="color"
                                                            className=" form-control-color"
                                                            id="Primarycolor"
                                                            value={buttonColor}
                                                            onChange={e => {
                                                                setButtoncolor(
                                                                    e.target
                                                                        .value,
                                                                )
                                                                inputsHandler(e)
                                                            }}
                                                            title="Choose your color"></input>
                                                    </div>
                                                </div>

                                                <div className="col-md-3">
                                                    <div className="parmision-checkbox">
                                                        <div className="form-check ">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                value=""
                                                                id="flexCheckDefault"
                                                                checked={
                                                                    isChecked
                                                                }
                                                                onChange={
                                                                    handleCheckboxChange
                                                                }
                                                            />
                                                            <label
                                                                className="form-check-label"
                                                                htmlFor="flexCheckDefault">
                                                                Use color
                                                                gradient
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <label
                                                        htmlFor="primarycolor"
                                                        className="form-label color-pic-label">
                                                        Gradient color
                                                    </label>
                                                    <div className="pic-with-color">
                                                        <p>
                                                            {
                                                                secondaryColorScheme
                                                            }
                                                        </p>
                                                        <input
                                                            type="color"
                                                            className=" form-control-color"
                                                            id="primarycolor"
                                                            value={
                                                                secondaryColorScheme
                                                            }
                                                            onChange={e => {
                                                                setSecondarycolorscheme(
                                                                    e.target
                                                                        .value,
                                                                )
                                                                inputsHandler(e)
                                                            }}
                                                            title="Choose your color"></input>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="upload-image-wrapper">
                                                <div className="row ">
                                                    <div className="col-md-4">
                                                        <div className="image-up-label">
                                                            <p>
                                                                Upload your
                                                                image (400*400).
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-5">
                                                        <div className="upload-image">
                                                            <div className="view-image">
                                                                <img
                                                                    src={
                                                                        picture.imageUrl
                                                                    }
                                                                    width={200}
                                                                />
                                                            </div>
                                                            <div className="upload-input">
                                                                <div className="file-btn custom-btn">
                                                                    Upload
                                                                    <input
                                                                        type="file"
                                                                        name="image"
                                                                        onChange={
                                                                            handleImage
                                                                        }
                                                                        className="file-input"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <InputError
                                                    messages={errors.image}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group-wrapper mt-3">
                                        <div
                                            className="form-group-title"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#information"
                                            aria-expanded="true"
                                            aria-controls="information">
                                            <p>Your information</p>
                                            <div className="bottom-arrow">
                                                <img
                                                    src="/img//icons/bottom-arrow.svg"
                                                    alt=""
                                                />
                                            </div>
                                        </div>

                                        <div
                                            className="information-form collapse show"
                                            id="information">
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <div className="info-form-label">
                                                        <p>Name:</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-10">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <input
                                                                    id="firstName"
                                                                    type="text"
                                                                    name="firstName"
                                                                    className="form-control"
                                                                    onChange={
                                                                        inputsHandler
                                                                    }
                                                                    value={
                                                                        inputField.firstName
                                                                    }
                                                                    placeholder="First name"
                                                                />

                                                                <InputError
                                                                    messages={
                                                                        errors.firstname
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <input
                                                                    id="lastName"
                                                                    type="text"
                                                                    name="lastName"
                                                                    className="form-control"
                                                                    onChange={
                                                                        inputsHandler
                                                                    }
                                                                    value={
                                                                        inputField.lastName
                                                                    }
                                                                    placeholder="Last name"
                                                                />
                                                                <InputError
                                                                    messages={
                                                                        errors.lastname
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <div className="info-form-label">
                                                        <p>Home:</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-10">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <input
                                                                    id="mobile1"
                                                                    type="number"
                                                                    name="mobile1"
                                                                    className="form-control"
                                                                    onChange={
                                                                        inputsHandler
                                                                    }
                                                                    value={
                                                                        inputField.mobile1
                                                                    }
                                                                    placeholder="Mobile number"
                                                                />
                                                                <InputError
                                                                    messages={
                                                                        errors.mobile1
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <input
                                                                    id="mobile2"
                                                                    type="number"
                                                                    name="mobile2"
                                                                    className="form-control"
                                                                    onChange={
                                                                        inputsHandler
                                                                    }
                                                                    value={
                                                                        inputField.mobile2
                                                                    }
                                                                    placeholder="WhatsApp number"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <input
                                                                    id="phone1"
                                                                    type="number"
                                                                    name="phone1"
                                                                    className="form-control"
                                                                    onChange={
                                                                        inputsHandler
                                                                    }
                                                                    value={
                                                                        inputField.phone1
                                                                    }
                                                                    placeholder="Phone Number"
                                                                />
                                                                <InputError
                                                                    messages={
                                                                        errors.phone1
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <input
                                                                    id="fax"
                                                                    type="number"
                                                                    name="fax"
                                                                    className="form-control"
                                                                    onChange={
                                                                        inputsHandler
                                                                    }
                                                                    value={
                                                                        inputField.fax
                                                                    }
                                                                    placeholder="Fax"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="mb-3">
                                                                <input
                                                                    id="email1"
                                                                    type="email"
                                                                    name="email1"
                                                                    className="form-control"
                                                                    onChange={
                                                                        inputsHandler
                                                                    }
                                                                    value={
                                                                        inputField.email1
                                                                    }
                                                                    placeholder="Email address"
                                                                />

                                                                <InputError
                                                                    messages={
                                                                        errors.email1
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="mb-3">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="address1"
                                                                    name="address1"
                                                                    onChange={
                                                                        inputsHandler
                                                                    }
                                                                    value={
                                                                        inputField.address1
                                                                    }
                                                                    placeholder="Address"
                                                                />
                                                                <InputError
                                                                    messages={
                                                                        errors.address1
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="mb-3">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="webaddress1"
                                                                    name="webaddress1"
                                                                    onChange={
                                                                        inputsHandler
                                                                    }
                                                                    value={
                                                                        inputField.webaddress1
                                                                    }
                                                                    placeholder="Enter web address"
                                                                />
                                                                <InputError
                                                                    messages={
                                                                        errors.webaddress1
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-12">
                                                            <div className="mb-3">
                                                                {isClient && (
                                                                    <ReactQuill
                                                                        theme="snow"
                                                                        placeholder="summary"
                                                                        id="summary"
                                                                        name="summary"
                                                                        onChange={
                                                                            handleInputChange
                                                                        }
                                                                        value={
                                                                            inputField.summary
                                                                        }
                                                                    />
                                                                )}

                                                                <InputError
                                                                    messages={
                                                                        errors.summary
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-2">
                                                    <div className="info-form-label">
                                                        <p>Others:</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-10">
                                                    <div className="mb-3">
                                                        <select
                                                            className="form-select form-control"
                                                            aria-label="Default select example"
                                                            name="cardtype"
                                                            value={
                                                                selectedValue
                                                            }
                                                            onChange={
                                                                handleSelectChange
                                                            }>
                                                            <option>
                                                                Please Select
                                                                Card Type
                                                            </option>
                                                            <option
                                                                value="Home"
                                                                selected>
                                                                Home
                                                            </option>
                                                            <option value="Business">
                                                                Business
                                                            </option>
                                                            <option value="Others">
                                                                Others
                                                            </option>
                                                        </select>

                                                        <InputError
                                                            messages={
                                                                errors.cardtype
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="company-info-form">
                                                <div className="row">
                                                    <div className="col-md-2">
                                                        <div className="info-form-label">
                                                            <p>Company:</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-10">
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="mb-3">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Company name"
                                                                        id="companyName"
                                                                        name="companyName"
                                                                        onChange={
                                                                            inputsHandler
                                                                        }
                                                                        value={
                                                                            inputField.companyName
                                                                        }
                                                                    />
                                                                    <InputError
                                                                        messages={
                                                                            errors.companyName
                                                                        }
                                                                        className="mt-2"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="mb-3">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Job title"
                                                                        id="jobTitle"
                                                                        name="jobTitle"
                                                                        onChange={
                                                                            inputsHandler
                                                                        }
                                                                        value={
                                                                            inputField.jobTitle
                                                                        }
                                                                    />
                                                                    <InputError
                                                                        messages={
                                                                            errors.jobTitle
                                                                        }
                                                                        className="mt-2"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="mb-3">
                                                                    <input
                                                                        type="number"
                                                                        className="form-control"
                                                                        id="mobile3"
                                                                        name="mobile3"
                                                                        onChange={
                                                                            inputsHandler
                                                                        }
                                                                        value={
                                                                            inputField.mobile3
                                                                        }
                                                                        placeholder="Mobile number"
                                                                    />
                                                                    <InputError
                                                                        messages={
                                                                            errors.mobile3
                                                                        }
                                                                        className="mt-2"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="mb-3">
                                                                    <input
                                                                        type="number"
                                                                        className="form-control mt-2"
                                                                        placeholder="WhatsApp number"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="mb-3">
                                                                    <input
                                                                        type="number"
                                                                        className="form-control"
                                                                        placeholder="Phone"
                                                                        id="phone2"
                                                                        name="phone2"
                                                                        onChange={
                                                                            inputsHandler
                                                                        }
                                                                        value={
                                                                            inputField.phone2
                                                                        }
                                                                    />
                                                                    <InputError
                                                                        messages={
                                                                            errors.phone2
                                                                        }
                                                                        className="mt-2"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="mb-3">
                                                                    <input
                                                                        type="number"
                                                                        className="form-control"
                                                                        placeholder="Fax"
                                                                        id="fax2"
                                                                        name="fax2"
                                                                        onChange={
                                                                            inputsHandler
                                                                        }
                                                                        value={
                                                                            inputField.fax2
                                                                        }
                                                                    />
                                                                    <InputError
                                                                        messages={
                                                                            errors.fax2
                                                                        }
                                                                        className="mt-2"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="col-md-12">
                                                                <div className="mb-3">
                                                                    <input
                                                                        type="email"
                                                                        className="form-control"
                                                                        placeholder="Email address"
                                                                        id="email2"
                                                                        name="email2"
                                                                        onChange={
                                                                            inputsHandler
                                                                        }
                                                                        value={
                                                                            inputField.email2
                                                                        }
                                                                    />
                                                                    <InputError
                                                                        messages={
                                                                            errors.email2
                                                                        }
                                                                        className="mt-2"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12">
                                                                <div className="mb-3">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Address"
                                                                        id="address2"
                                                                        name="address2"
                                                                        onChange={
                                                                            inputsHandler
                                                                        }
                                                                        value={
                                                                            inputField.address2
                                                                        }
                                                                    />
                                                                    <InputError
                                                                        messages={
                                                                            errors.address2
                                                                        }
                                                                        className="mt-2"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12">
                                                                <div className="mb-3">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Enter web address"
                                                                        id="webaddress2"
                                                                        name="webaddress2"
                                                                        onChange={
                                                                            inputsHandler
                                                                        }
                                                                        value={
                                                                            inputField.webaddress2
                                                                        }
                                                                    />
                                                                    <InputError
                                                                        messages={
                                                                            errors.webaddress2
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
                                    {/* ========== Social Media Item ============ */}
                                    <div className="form-group-wrapper mt-3">
                                        <div
                                            className="form-group-title"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#social-media"
                                            aria-expanded="true"
                                            aria-controls="social-media">
                                            <p>Social media</p>
                                            <div className="bottom-arrow">
                                                <img
                                                    src="/img//icons/bottom-arrow.svg"
                                                    alt=""
                                                />
                                            </div>
                                        </div>

                                        <div
                                            className="color-plate  collapse show"
                                            id="social-media">
                                            <p className="mb-3">
                                                Click on the icon to add social
                                                media channel:
                                            </p>

                                            <div className="social-list-item">
                                                {renderInputFields()}
                                            </div>

                                            <div className="row mt-4 mb-4">
                                                <div className="col-md-3">
                                                    <div className="info-form-label">
                                                        <p>Add more:</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-9">
                                                    <div className="social-all-item">
                                                        {DataIcons.map(item => (
                                                            <div
                                                                className="social-icon-item"
                                                                key={item.id}
                                                                onClick={() =>
                                                                    addInputField(
                                                                        item.name.toLowerCase(),
                                                                    )
                                                                }>
                                                                <div className="icon">
                                                                    {
                                                                        <item.icon />
                                                                    }
                                                                </div>
                                                                <span>
                                                                    {item.placeholder ||
                                                                        item.name}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group-wrapper mt-3">
                                        <div
                                            className="form-group-title"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#shareItem"
                                            aria-expanded="false"
                                            aria-controls="shareItem">
                                            <p>Apperment Calendar</p>
                                            <div className="bottom-arrow">
                                                <img
                                                    src="/img//icons/bottom-arrow.svg"
                                                    alt=""
                                                />
                                            </div>
                                        </div>

                                        <div
                                            className="color-plate collapse show"
                                            id="shareItem">
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <div className="info-form-label">
                                                        <p>Calendar:</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-10">
                                                    <div className="share-check-item d-flex align-items-center gap-2">
                                                        <input
                                                            type="checkbox"
                                                            id="check"
                                                        />
                                                        <label htmlFor="check">
                                                            Add a Apperment Calender
                                                        </label>
                                                    </div>
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
                                            <p>Welcome screen</p>
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

                                    {/* <div className="form-group-wrapper mt-3">
                                        <div
                                            className="form-group-title"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#shareItem"
                                            aria-expanded="false"
                                            aria-controls="shareItem">
                                            <p>Advance Options</p>
                                            <div className="bottom-arrow">
                                                <img
                                                    src="/img//icons/bottom-arrow.svg"
                                                    alt=""
                                                />
                                            </div>
                                        </div>

                                        <div
                                            className="color-plate collapse show"
                                            id="shareItem">
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <div className="info-form-label">
                                                        <p>Sharing:</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-10">
                                                    <div className="share-check-item d-flex align-items-center gap-2">
                                                        <input
                                                            type="checkbox"
                                                            id="check"
                                                        />
                                                        <label htmlFor="check">
                                                            Add a share button
                                                            to the page.
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-md-2">
                                                    <div className="info-form-label">
                                                        <p>Status:</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-10">
                                                    <div className="share-check-item">
                                                        <input
                                                            type="checkbox"
                                                            className="checkbox"
                                                            id="checkbox"
                                                        />
                                                        <label
                                                            htmlFor="checkbox"
                                                            className="checkbox-label">
                                                            <i className="fas fa-moon"></i>
                                                            <i className="fas fa-sun"></i>
                                                            <span className="ball"></span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}

                                    {/* <div className="form-group-wrapper mt-3">
                                        <div className="color-plate feedback-title">
                                            <h4>We want your feedback.</h4>
                                            <p>
                                                How can we improve this
                                                Solution? What other features
                                                would you like to have?
                                            </p>
                                            <div className="row mt-4">
                                                <div className="col-md-2">
                                                    <div className="info-form-label">
                                                        <img
                                                            src="/img/feedback.svg"
                                                            alt=""
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-10">
                                                    <div className="mb-3">
                                                        <textarea
                                                            cols="30"
                                                            rows="5"
                                                            placeholder="Description in 250 characters."
                                                            className="form-control"
                                                            id="summary"
                                                            name="summary"
                                                            onChange={
                                                                inputsHandler
                                                            } // Use 'inputAreaHandler' for textarea
                                                            value={
                                                                inputField.summary
                                                            }
                                                            maxLength={250} // Set maximum character length
                                                        ></textarea>
                                                        <div className="text-right">
                                                            <small>
                                                                {
                                                                    inputField
                                                                        .summary
                                                                        .length
                                                                }
                                                                /250 characters
                                                            </small>
                                                        </div>
                                                        {errors.summary && (
                                                            <div className="text-danger">
                                                                {errors.summary}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
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
                                            <div
                                                className={
                                                    previewActive === 2
                                                        ? 'preview-bar active'
                                                        : 'preview-bar'
                                                }
                                                onClick={() => {
                                                    handlePreview(2)
                                                }}>
                                                <p>Smart Code</p>
                                            </div>
                                        </div>

                                        <div
                                            className={
                                                previewActive === 1
                                                    ? 'show-preview-right active'
                                                    : 'show-preview-right'
                                            }>
                                            <div
                                                className="my-preview-top-header"
                                                style={divStyle}>
                                                <div className="preview-image">
                                                    <img
                                                        src={picture.imageUrl}
                                                        alt=""
                                                    />
                                                </div>
                                                <h3 className="name">
                                                    {inputField.firstName}{' '}
                                                    {inputField.lastName}
                                                </h3>
                                                <p className="dajignation">
                                                    {inputField.jobTitle}
                                                </p>

                                                <ul className="social-aciton-right">
                                                    <li>
                                                        <a
                                                            href={`tel:${inputField.mobile1}`}>
                                                            <img
                                                                src="img/icon/call.svg"
                                                                alt=""
                                                            />
                                                            <p>Call</p>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href={`mailto:${inputField.email1}`}>
                                                            <img
                                                                src="img/icon/telegram2.svg"
                                                                alt=""
                                                            />
                                                            <p>Email</p>
                                                        </a>
                                                    </li>
                                                    {/* <li>
                                                        <a
                                                            href={`location:${inputField.address1}`}>
                                                            <img
                                                                src="img/icon/location.svg"
                                                                alt=""
                                                            />
                                                            <p>Location</p>
                                                        </a>
                                                    </li> */}
                                                </ul>
                                            </div>

                                            <div className="card-list-right">
                                                <ul>
                                                    <li className="card-list-li discription">
                                                        {/* <p>
                                                            {inputField.summary}
                                                        </p> */}
                                                        <div
                                                            dangerouslySetInnerHTML={{
                                                                __html: inputField.summary,
                                                            }}
                                                        />
                                                    </li>
                                                    <li className="card-list-li">
                                                        <div className="preview-info-icon">
                                                            <img
                                                                src="img/icon/phone.svg"
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="info-show">
                                                            <p>Mobile</p>

                                                            <a
                                                                href={`tel:${inputField.mobile1}`}>
                                                                {
                                                                    inputField.mobile1
                                                                }
                                                            </a>
                                                        </div>
                                                    </li>
                                                    <li className="card-list-li">
                                                        {' '}
                                                        <div className="preview-info-icon">
                                                            <img
                                                                src="img/icon/email.svg"
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="info-show">
                                                            <p>Email</p>
                                                            <a
                                                                href={`mailto:${inputField.email1}`}>
                                                                {
                                                                    inputField.email1
                                                                }
                                                            </a>
                                                        </div>
                                                    </li>
                                                    <li className="card-list-li">
                                                        <div className="preview-info-icon">
                                                            <img
                                                                src="img/icon/company.svg"
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="info-show">
                                                            <p>Company Name</p>
                                                            <a
                                                                href={
                                                                    inputField.webaddress2
                                                                }>
                                                                {
                                                                    inputField.companyName
                                                                }
                                                            </a>
                                                        </div>
                                                    </li>
                                                    <li className="card-list-li">
                                                        <div className="preview-info-icon">
                                                            <img
                                                                src="img/icon/web.svg"
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="info-show">
                                                            <p>Web address</p>
                                                            <a
                                                                href={
                                                                    inputField.webaddress2
                                                                }>
                                                                {
                                                                    inputField.webaddress2
                                                                }
                                                            </a>
                                                        </div>
                                                    </li>
                                                    <li className="card-list-li card-list-social">
                                                        <div className="preview-info-icon">
                                                            <img
                                                                src="/img/icon/share.svg"
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="info-show border-none">
                                                            <div className="preview-section">
                                                                <h2>
                                                                    Social Media
                                                                </h2>
                                                            </div>
                                                            <div className="social-media-list-items">
                                                                {renderPreviewIcons()}
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div
                                            className={
                                                previewActive === 2
                                                    ? 'show-preview-right active'
                                                    : 'show-preview-right'
                                            }>
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
                                                        ref={componentRef}
                                                        style={{
                                                            position:
                                                                'relative',
                                                            width: '250px',
                                                            height: '250px',
                                                        }}
                                                        className="qr-image-wrapper">
                                                        <QRCode
                                                            value={`https://smartcardgenerator.net/${uniqueSlug}`}
                                                            size={250}
                                                        />
                                                        {welcome.imageUrl ? (
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
                                                        ) : null}
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

export default CreateQR

export const DataIcons = [
    {
        id: 1,
        name: 'Facebook',
        icon: FaFacebookF,
    },
    {
        id: 2,
        name: 'Behance',
        icon: FaBehance,
    },

    {
        id: 3,
        name: 'Instagram',
        icon: FaInstagram,
    },
    {
        id: 4,
        name: 'LinkedIn',
        icon: FaLinkedin,
    },
    {
        id: 5,
        name: 'Google',
        icon: FaGoogle,
    },
    {
        id: 6,
        name: 'Youtube',
        icon: FaYoutube,
    },
    {
        id: 7,
        name: 'Apple',
        icon: FaApple,
    },
    {
        id: 8,
        name: 'Snapchat',
        icon: FaSnapchat,
    },
    {
        id: 9,
        name: 'Figma',
        icon: FaFigma,
    },
    {
        id: 10,
        name: 'Reddit',
        icon: FaReddit,
    },
    {
        id: 11,
        name: 'Discord',
        icon: FaDiscord,
    },
    {
        id: 12,
        name: 'Tiktok',
        icon: FaTiktok,
    },
    {
        id: 13,
        name: 'Tumblr',
        icon: FaTumblr,
    },
    {
        id: 14,
        name: 'Telegram',
        icon: FaTelegram,
    },
    {
        id: 15,
        name: 'Pinterest',
        icon: FaPinterest,
    },
    {
        id: 16,
        name: 'Github',
        icon: FaGithub,
    },
    {
        id: 17,
        name: 'WhatsApp',
        icon: FaWhatsapp,
    },
    {
        id: 18,
        name: 'Skype',
        icon: FaSkype,
    },
    {
        id: 19,
        name: 'Spotify',
        icon: FaSpotify,
    },

    {
        id: 20,
        name: 'Twitter',
        icon: FaXTwitter,
    },
    {
        id: 21,
        name: 'Google_Scholar',
        placeholder: 'Google Scholar',
        icon: FaGoogleScholar,
    },
]
