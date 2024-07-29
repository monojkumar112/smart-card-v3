import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import React, { useRef, useEffect, useState } from 'react'
import QRCode from 'qrcode.react'
import InputError from '@/components/InputError'
import { useAuth } from '@/hooks/auth'
import axios from 'axios'
import { toPng } from 'html-to-image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Popup from '@/components/Popup/Popup'
import html2canvas from 'html2canvas'

function InstagramUpdatePage({ instagramData }) {
    const { user } = useAuth({ middleware: 'auth' })
    const router = useRouter()
    const baseuri = process.env.NEXT_PUBLIC_BACKEND_URL
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [categories, setCategories] = useState([])
    const [templates, setTemplates] = useState([])
    const [filteredTemplates, setFilteredTemplates] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(
        instagramData?.selectedCategory || 3,
    )
    const [selectedFileIndex, setSelectedFileIndex] = useState(null)
    const [frameColor, setFrameColor] = useState(
        instagramData.frame_color || '#000000',
    )
    const [codeColor, setCodeColor] = useState(
        instagramData.code_color || '#000000',
    )
    const [activeFrame, setActiveFrame] = useState(3)
    const [previewActive, setPreviewActive] = useState(1)
    const [loading, setLoading] = useState(false)
    const [inputField, setInputField] = useState({
        instagramName: instagramData.instagram_name,
        instagramUserName: instagramData.instagram_username,
        instaCategory: selectedCategory,
        frameColor: frameColor,
        codeColor: codeColor,
        status: 'active',
    })
    const [welcome, setWelcome] = useState({
        image: null,
        imageUrl: instagramData.image ? `/${instagramData.image}` : null,
    })
    const [errors, setErrors] = useState({
        instagramName: '',
        instagramUserName: '',
    })

    const elementRef = useRef(null)
    // const componentRef = useRef(null)

    // Fetch categories
    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${baseuri}/api/category`)
            setCategories(response.data)
        } catch (error) {
            console.error('Error fetching categories:', error)
        }
    }

    // Fetch templates
    const fetchTemplates = async () => {
        try {
            const response = await axios.get(`${baseuri}/api/template`)
            setTemplates(response.data)
        } catch (error) {
            console.error('Error fetching templates:', error)
        }
    }

    // Handle category selection
    const handleCategoryChange = categoryId => {
        setSelectedCategory(categoryId)
    }

    const handleColorChange = event => {
        setFrameColor(event.target.value)
    }

    useEffect(() => {
        fetchCategories()
        fetchTemplates()
    }, [baseuri])

    useEffect(() => {
        const filtered = templates.filter(
            template => template.insta_category === parseInt(selectedCategory),
        )
        setFilteredTemplates(filtered)
    }, [templates, selectedCategory])

    const [selectedTemplate, setSelectedTemplate] = useState({
        id: 1,
        template: `<svg width="300" height="350" viewBox="0 0 300 350" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<rect width="300" height="350" rx="5" fill="white"/>
<rect x="29" y="10" width="242" height="330" rx="10" fill="url(#paint0_linear_5248_399)"/>
<rect x="54" y="24" width="194" height="24" fill="url(#pattern0_5248_399)"/>
<rect x="67" y="284" width="167" height="48" fill="url(#pattern1_5248_399)"/>
<rect x="51" y="68" width="200" height="201" rx="5" fill="white"/>
<defs>
<pattern id="pattern0_5248_399" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_5248_399" transform="scale(0.00515464 0.0416667)"/>
</pattern>
<pattern id="pattern1_5248_399" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image1_5248_399" transform="scale(0.00598802 0.0208333)"/>
</pattern>
<linearGradient id="paint0_linear_5248_399" x1="261.375" y1="18.25" x2="35.875" y2="340" gradientUnits="userSpaceOnUse">
<stop stop-color="#4565DC"/>
<stop offset="0.265" stop-color="#A42DC3"/>
<stop offset="0.615" stop-color="#DF0A87"/>
<stop offset="1" stop-color="#FFCD5C"/>
</linearGradient>
<image id="image0_5248_399" width="194" height="24" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAAAYCAYAAACoRCJ4AAAAAXNSR0IArs4c6QAACEtJREFUeF7tXIuxFUUQnYlAiUCIQIlAiUCJQIhAiUCIQIhAiECJQIhAjMBnBL4M2j1bPVu9Pafnc+9eLlW8rXpFFXd2Pt19+j+bReS3NPe8zzm/Zq+IyHcppR9TSvj3vo65TSl9SCm9id7DOBH5JqX0k5sX77wb2Z6IvEwpfWHG/p1zxv9NPSKCfWMfP6SUvtS/7QzL2d7lnG/8pPreL739k30+yzlj/vVZfseav7p53uac/+gdRESwfqE7ht/mnJ+RvRY+2Z9esHPpnjAeNAGPyvzgKf7C93r7tb/ruQvdsQbo0KW7oZuX45uc84tATp+klL61v+WFeDKz4YUQr3POT8khwISfO3NBgB4FggRi/+nef9oCj9vDP04IILCPZs4mImBEDzw4w+OcM4Rge5SR/7n1Xi1CvqMJoTfm2oRclYmnw25MdCYRwXugY3kgDA8IECAIXnDAl53SUXBjnJ2TLf88EroR+ivdn6vwR6+A7lAaVCEEcvzQ80mBDUUOhb09RwHhd9WgI+emYAgE4KMBQbUpmDH6VEQWEQ9GaHJYlvVRq/eXWwDM3cAnIkxIKUOJgB8GBAUB5rMWpkWbl8z69Ih5At2fLOB+Q87OFHqliC4GhBMOgr1U2vqaQAiEr8dDABoCat0ar2l2GllEAAooDfvsLOxioAFG62LBvbnX24wy+EggwBIAlP7BuYvL6H+rrEpr3wo2KI+ZB/QG3XfuaWARMPaB5dEMEN4vg1uaEcxdNxFoDSwO3wwMvlUtCOZ7zbIj2pWB4DU5jvcKdNAzYO/w2zftrpyDf7zRighxWlyGXLis8YGPgzxYvHUddvGOco0CNw88h4Ve3ScRgcvnY5nhvQbAHaX7iMtZyL7j0QwQqhgggmugSXem3gDGI39HtGsBIVg3ioNwBmjD8uy0dUCP+0tM9W+D8fjpXtFaIgLXCUFpeWb4cYhFCGjC+OrXm7FeUC5eJuhZCcArTd+Idas9LQp8KEaYIbzXXiEheoe5IhC8KwIBjIKs5tjA1G+B7hIUIpi2QCrCvq1HGFoJYEMxXRIIVbzGLCAsfwF+xy0aCtgb1sd7FK2kj09IHA4Ez9jQNAam1ArAVbJGIjID5u4eibCvghy4G0VWyhimJYf97gNdI1gkH9QzFwP73bm8k+nunZto3UgLokDBeLe0BQTvfRwOBL94aE2CQHHTMle0CN4VaYGZCapniJ9v9WeD8xV+t8ZsblNLwwau10npUwWtdwOxxLB1OmqvJr5qyhqxpIhpLEg3hXKoazSCUofqpja9IhCm6g+E4D7r47XNmkIN3IhCog8554fEag773EcCIQoodbM439lFtFHrdQYQsE9b2N0U3CgQgKSqcqobAsPWSuUdEHgwS4R51crEBUNBrgTFq8CTrNK5WZiTLILhb6uOgP3DktEug49gEby7U1mMJcuFJIVNRSOVejMKhNYZLKq6bsJnahGqWgF8X5cNghAhTW19ZNCzaLGdy9QTKqM1DwmWzXzYU6+oFnYLdILlob02LMIIEKC0rYu3urF3QCCcIdXgphYecI2YgsD/WSv7drEGaBWwbQ6PVXvZ1OmUTz7qbgRpXhqUq+VHtmzXkuBIiXQm3t+1nVwbCGgFci7pmnbVNpqzWizuLELdm8VqDj6bhhYK23METQUg2Dw6ipC+aW84Y3R0jOCFeAAQVaX9EwEC0tW2Bwx0hmLqAgHaKmyec1VlXxCpUmzGtH0WwXIgkDYewJBVwF2q1Wc5MG44Y3RpIDh3CTUAD1oMCflPgHVx16g0hzpLCasAGe8CYaagNpM+ZUCwxaZujr6jYaayP4ax/r01g8PWCmoBLL8OC+BbKeyUq4CTKrIdE+4josMlXKPGWqzWQIPzgJbnAsFn60JZJBnJSumw7tMZIHgXYNdt6YJl1ptic7vXAoIvqIXMnGg9YFXTQo5t/qD3qIwLaXlpIIze7WBB56gVowGr6ctystMt8A3Ebh54OzKeC4ThXhO9AOS7GW2PzbWAwLQ3bRMIquOsj58xrhLwTtfrsJthrNtQlbwXLBNLFaVhWcvJaItFUzE6ILCuXd820Su4sTm2Zc4FAiME60lhmZRPuemO9taTDBMteHXaKTYBD+4nFOYMXcZxAsNAze5NsBbrNceusUbVgsA0PamNDMc1wdmjpjtfrcc62351z103vdHrlc4FAiLyqiNTS/FroUXdCbTr2rQgftoBJnA7EOG3rmralvDK18c+WnGFaSlmbdgAOQpG8OXL9Ulv0VotJWxObKenycqWhy7jOCAwq4pAHWsWIWdjfCv4IfO0aK+ywdwV0B1XdFH4At3ZzUeWqRsBAlPc6zbPAoIeJpxc75yybsvK1HZ6cSKaWu0aCV70rvXVW2YTWQZ2BnpBpOGmlJ+8JmPabnePoSdQZk3sE/OxW2XlAhE7C7PikU9d6iFsjSl3rsPziO6VNZiwCExxHwME3QRlZsDA6IYR00I9GTgECHqGXqbH76XpugSB8FBvPC7FR5mrHkGC5sbWa5H/P1JVtvOeWmFuKVK2bwq2XrBslAXl89kWQYUISMMCreojhtKL78aF8pfWe3w/DAgD1q3sBUBGxbfZYxMEpOyKKgsapzNGzkUqef7efWO4nbAGtLds4t7yzv3qMc3/3mlItHQHv+nHFSaAwOLV1TXyXzMIP9fSO6CaOjDha9tQpp/9QBFjvb7J5gk+h9JbcvvMCUn59d6NPnUCQkFLsTOgPwiBND2DE0bM44tOFW2Dcw99vqV1QJ0XLt/3yoviEkHoAYCZT+VgHvxZmmAeAAB7PanxjtALSgGfWbGfc8E6kJ0m3WfkWIH3lV3/f0sFiWI2y7ZRAAAAAElFTkSuQmCC"/>
<image id="image1_5248_399" width="167" height="48" xlink:href="data:image/png;base64,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"/>
</defs>
</svg>
`,
    })

    const handleTemplateClick = (template, index) => {
        setSelectedTemplate(template)
        setActiveFrame(index)
    }

    console.log('instagram', instagramData)

    const handleCodeColorChange = event => {
        setCodeColor(event.target.value)
    }

    const handleFileClick = index => {
        setSelectedFileIndex(index)
    }

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

    const qrCodeView = () => (
        <div style={{ position: 'relative' }} className="qr-image-wrapper">
            <QRCode
                fgColor={codeColor}
                value={inputField.instagramUserName || ''}
                size={140}
            />

            {welcome.imageUrl && (
                <img
                    src={welcome.imageUrl}
                    width={100}
                    height={100}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                />
            )}
        </div>
    )

    const handlePreview = index => {
        setPreviewActive(index)
    }

    const inputsHandler = e => {
        e.persist()
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
    const updateSvgColor = (svgContent, color) => {
        // Use a regular expression to target only the fill attribute of the first <path> element
        return svgContent.replace(/(<path[^>]*fill=")[^"]*"/, `$1${color}"`)
    }
    const updatedTemplate = updateSvgColor(
        selectedTemplate.template,
        frameColor,
    )

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

        const formData = new FormData()
        formData.append('instagram_name', inputField.instagramName)
        formData.append('instagram_username', inputField.instagramUserName)
        formData.append('insta_category', inputField.instaCategory)
        formData.append('frame_color', inputField.frameColor)
        formData.append('code_color', inputField.codeColor)
        formData.append('image', welcome.image)
        formData.append('user_id', user?.id)
        formData.append('status', inputField.status)

        try {
            const res = await axios.post(
                `${baseuri}/api/update-instagram/${instagramData.id}`,
                formData,
            )
            if (res.data.status === 200) {
                setLoading(false)
                setSuccessMessage('Instagram Update successfully')
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

    return (
        <AppLayout>
            <Head>
                <title>Create Instagram </title>
            </Head>

            <section>
                <div className="account-details">
                    <form onSubmit={allInfoSubmit}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 mb-4">
                                    <div className="mb-4 d-flex align-items-center gap-4">
                                        <div className="product-icon">
                                            <svg
                                                width="38"
                                                height="38"
                                                viewBox="0 0 32 32"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M23 30H9C5.14 30 2 26.86 2 23V9C2 5.14 5.14 2 9 2H23C26.86 2 30 5.14 30 9V23C30 26.86 26.86 30 23 30ZM9 3C5.691 3 3 5.691 3 9V23C3 26.309 5.691 29 9 29H23C26.309 29 29 26.309 29 23V9C29 5.691 26.309 3 23 3H9Z"
                                                    fill="#898989"
                                                />
                                                <path
                                                    d="M20 26H12C8.691 26 6 23.309 6 20V12C6 8.691 8.691 6 12 6H20C23.309 6 26 8.691 26 12V20C26 23.309 23.309 26 20 26ZM12 8C9.794 8 8 9.794 8 12V20C8 22.206 9.794 24 12 24H20C22.206 24 24 22.206 24 20V12C24 9.794 22.206 8 20 8H12Z"
                                                    fill="#898989"
                                                />
                                                <path
                                                    d="M21.5 11.75C20.811 11.75 20.25 11.189 20.25 10.5C20.25 9.811 20.811 9.25 21.5 9.25C22.189 9.25 22.75 9.811 22.75 10.5C22.75 11.189 22.189 11.75 21.5 11.75Z"
                                                    fill="#898989"
                                                />
                                                <path
                                                    d="M16 21C13.243 21 11 18.757 11 16C11 13.243 13.243 11 16 11C18.757 11 21 13.243 21 16C21 18.757 18.757 21 16 21ZM16 13C14.346 13 13 14.346 13 16C13 17.654 14.346 19 16 19C17.654 19 19 17.654 19 16C19 14.346 17.654 13 16 13Z"
                                                    fill="#898989"
                                                />
                                            </svg>
                                        </div>
                                        <div className="product-input w-100">
                                            <input
                                                type="text"
                                                id="instagramName"
                                                name="instagramName"
                                                className="form-control"
                                                autoFocus=""
                                                placeholder="Name your QR Instagram"
                                                value={inputField.instagramName}
                                                onChange={inputsHandler}
                                            />
                                            <InputError
                                                messages={errors.instagramName}
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
                                                Type in the Instagram username
                                                of your business to link with
                                                the QR Code.
                                            </p>
                                            <div className="row mt-3">
                                                <div className="col-md-2">
                                                    <div className="info-form-label">
                                                        <p>Instagram link:</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-10">
                                                    <div className="mb-3 instagram-input-fluid">
                                                        <span>@ *</span>
                                                        <input
                                                            id="instagramUserName"
                                                            type="text"
                                                            name="instagramUserName"
                                                            className="form-control"
                                                            onChange={
                                                                inputsHandler
                                                            }
                                                            value={
                                                                inputField.instagramUserName
                                                            }
                                                            placeholder="Enter your instagram link"
                                                        />
                                                    </div>
                                                    <InputError
                                                        messages={
                                                            errors.instagramUserName
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
                                            data-bs-target="#website"
                                            aria-expanded="false"
                                            aria-controls="website">
                                            <p>Choose Your Frame</p>
                                            <div className="bottom-arrow">
                                                <img
                                                    src="/img/icons/bottom-arrow.svg"
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                        {/* Instagram Frame  */}
                                        <div
                                            className="information-form collapse show"
                                            id="website">
                                            <div className="popup-model-wrapper">
                                                <div className="popop-model-right">
                                                    <div className="popup-content-right">
                                                        <div className="select-frame-list">
                                                            <label htmlFor="category-select">
                                                                Choose Select
                                                                Frame
                                                            </label>
                                                            <select
                                                                name="instaCategory"
                                                                className="form-control"
                                                                id="category-select"
                                                                value={
                                                                    selectedCategory
                                                                }
                                                                onChange={e =>
                                                                    setSelectedCategory(
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }>
                                                                {categories.map(
                                                                    (
                                                                        category,
                                                                        index,
                                                                    ) => (
                                                                        <option
                                                                            key={
                                                                                index
                                                                            }
                                                                            value={
                                                                                category.id
                                                                            }>
                                                                            {
                                                                                category.name
                                                                            }
                                                                        </option>
                                                                    ),
                                                                )}
                                                            </select>
                                                        </div>

                                                        {filteredTemplates.length >
                                                            0 && (
                                                            <div className="popup-frame-content">
                                                                <h2 className="frame-title">
                                                                    {
                                                                        categories.find(
                                                                            category =>
                                                                                category.id ===
                                                                                parseInt(
                                                                                    selectedCategory,
                                                                                ),
                                                                        )?.name
                                                                    }
                                                                </h2>
                                                                <div className="popup-frame-item-lists">
                                                                    {filteredTemplates.map(
                                                                        (
                                                                            template,
                                                                            index,
                                                                        ) => (
                                                                            <div
                                                                                key={
                                                                                    template.id
                                                                                }
                                                                                className={
                                                                                    activeFrame ===
                                                                                    index
                                                                                        ? 'popup-frame-list-item active'
                                                                                        : 'popup-frame-list-item'
                                                                                }
                                                                                onClick={() =>
                                                                                    handleTemplateClick(
                                                                                        template,
                                                                                        index,
                                                                                    )
                                                                                }>
                                                                                <img
                                                                                    src={`data:image/svg+xml;utf8,${encodeURIComponent(
                                                                                        template.template,
                                                                                    )}`}
                                                                                    alt={`Template ${template.id}`}
                                                                                />
                                                                            </div>
                                                                        ),
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}

                                                        <div className="popup-frame-input mt-2">
                                                            <div className="row">
                                                                <div className="col-md-4">
                                                                    <label
                                                                        htmlFor="Primarycolor"
                                                                        className="form-label color-pic-label">
                                                                        Frame
                                                                        Color
                                                                    </label>
                                                                    <div className="pic-with-color">
                                                                        <p>
                                                                            {
                                                                                frameColor
                                                                            }
                                                                        </p>
                                                                        <input
                                                                            type="color"
                                                                            className="form-control-color"
                                                                            name="frameColor"
                                                                            value={
                                                                                inputField.frameColor
                                                                            }
                                                                            onChange={
                                                                                handleColorChange
                                                                            }
                                                                            id="frameColor"
                                                                            title="Choose your color"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="popup-frame-qr-code-content mt-3">
                                                            <h2 className="frame-title">
                                                                QR Code
                                                            </h2>

                                                            <div className="qr-item-items my-2 ">
                                                                <img
                                                                    src="/img/frame/qr-logo.png"
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-4">
                                                                    <label
                                                                        htmlFor="Primarycolor"
                                                                        className="form-label color-pic-label">
                                                                        CODE
                                                                        Color
                                                                    </label>
                                                                    <div className="pic-with-color">
                                                                        <p>
                                                                            {
                                                                                codeColor
                                                                            }
                                                                        </p>
                                                                        <input
                                                                            type="color"
                                                                            className="form-control-color"
                                                                            name="codeColor"
                                                                            value={
                                                                                inputField.codeColor
                                                                            }
                                                                            onChange={
                                                                                handleCodeColorChange
                                                                            }
                                                                            id="codeColor"
                                                                            title="Choose your color"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
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
                                                <h4>Instagram Name</h4>
                                                <span>
                                                    {inputField.instagramName}
                                                </span>
                                            </div>
                                            <div className="smart-code-preview border-none">
                                                <div className="popop-model-left-content">
                                                    <div
                                                        ref={elementRef}
                                                        className="popop-model-left">
                                                        <div
                                                            className={
                                                                selectedTemplate
                                                                    ? 'popup-frame-list-item-view active'
                                                                    : 'popup-frame-list-item-view'
                                                            }>
                                                            {selectedTemplate && (
                                                                <div className="popup-frame-item-first popup-frame-item-con">
                                                                    <div className="qr-item-item">
                                                                        {qrCodeView()}
                                                                    </div>

                                                                    <div
                                                                        className="qr-frame-img"
                                                                        dangerouslySetInnerHTML={{
                                                                            __html: updatedTemplate,
                                                                        }}
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="frame-download-btn-item">
                                                        <button
                                                            className="custom-btn"
                                                            type="button"
                                                            onClick={
                                                                handleDownload
                                                            }>
                                                            Download QR Code
                                                        </button>
                                                    </div>
                                                </div>
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

export default InstagramUpdatePage

export async function getServerSideProps(context) {
    const { params } = context
    const { id } = params

    try {
        const baseuri = process.env.NEXT_PUBLIC_BACKEND_URL
        const response = await fetch(`${baseuri}/api/edit_instagram/${id}`)

        if (!response.ok) {
            throw new Error('Failed to fetch Instagram data')
        }

        const instagramData = await response.json()
        return {
            props: {
                instagramData: instagramData.instagram || {}, // Ensure an empty object if instagramData is null
            },
        }
    } catch (error) {
        console.error('Error fetching Instagram data:', error)
        return {
            props: {
                instagramData: instagramData.instagram,
            },
        }
    }
}
