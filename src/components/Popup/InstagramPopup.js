import React, { useEffect, useRef, useState } from 'react'
import QRCode from 'qrcode.react'
import { useDropzone } from 'react-dropzone'
import { toPng } from 'html-to-image'
const InstagramPopup = ({
    activePopup,
    handlePopup,
    componentRef,
    uniqueSlug,
}) => {
    const [selectedFileIndex, setSelectedFileIndex] = useState(null)
    const [selectedColor, setSelectedColor] = useState('#000000')
    const handleColorChange = event => {
        const newColor = event.target.value
        setSelectedColor(newColor)
    }
    const [selectedCodeColor, setSelectedCodeColor] = useState('#000000')
    const handleCodeColorChange = event => {
        const newColor = event.target.value
        setSelectedCodeColor(newColor)
    }
    const handleFileClick = index => {
        setSelectedFileIndex(index)
    }

    const [activeFrame, setActiveFrame] = useState(1)
    const toggleFrame = index => {
        setActiveFrame(index)
    }

    const [uploadedFiles, setUploadedFiles] = useState([])

    const onDrop = acceptedFiles => {
        const updatedFiles = uploadedFiles.concat(acceptedFiles)
        setUploadedFiles(updatedFiles)
    }

    const removeFile = index => {
        const updatedFiles = [...uploadedFiles]
        updatedFiles.splice(index, 1)
        setUploadedFiles(updatedFiles)
    }

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
    })

    useEffect(() => {
        // Update Swiper instance when uploadedFiles change
    }, [uploadedFiles])
    const elementRef = useRef(null)
    const handleDownload = () => {
        toPng(elementRef.current, { cacheBust: false })
            .then(dataUrl => {
                const link = document.createElement('a')
                link.download = 'my-image-name.png'
                link.href = dataUrl
                link.click()
            })
            .catch(err => {
                console.log(err)
            })
    }

    // popup left big qr view
    const qrCodeView = () => (
        <div
            ref={componentRef}
            style={{
                position: 'relative',
            }}
            className="qr-image-wrapper">
            <QRCode
                fgColor={selectedCodeColor}
                value={`https://smartcardgenerator.net/${uniqueSlug}`}
                size={231}
            />
            {selectedFileIndex !== null &&
                uploadedFiles[selectedFileIndex] !== undefined && (
                    <img
                        src={URL.createObjectURL(
                            uploadedFiles[selectedFileIndex],
                        )}
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

    return (
        <>
            {activePopup && (
                <div className="welcome_model">
                    <div className="overlay-4">
                        <div className="popup-model-content">
                            <div className="popup-model-wrapper">
                                <div className="popop-model-left-content">
                                    <div
                                        ref={elementRef}
                                        className="popop-model-left">
                                        <div
                                            className={
                                                activeFrame === 1
                                                    ? 'popup-frame-list-item-view active'
                                                    : 'popup-frame-list-item-view'
                                            }>
                                            <div
                                                className="popup-frame-item-first popup-frame-item-con"
                                                style={{
                                                    backgroundColor:
                                                        selectedColor,
                                                }}>
                                                <div className="qr-item-item">
                                                    {qrCodeView()}
                                                </div>

                                                <div className="scan-me-text scan-me-text-download">
                                                    <h4>SCAN ME</h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className={
                                                activeFrame === 2
                                                    ? 'popup-frame-list-item-view active'
                                                    : 'popup-frame-list-item-view'
                                            }>
                                            <div className="popup-frame-item-second popup-frame-item-con">
                                                <div
                                                    className="qr-item-item"
                                                    style={{
                                                        border: `10px solid ${selectedColor}`,
                                                    }}>
                                                    {qrCodeView()}
                                                </div>
                                                <div className="scan-me-text scan-me-text-download">
                                                    <h4
                                                        style={{
                                                            color: selectedColor,
                                                        }}>
                                                        SCAN ME
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className={
                                                activeFrame === 3
                                                    ? 'popup-frame-list-item-view active'
                                                    : 'popup-frame-list-item-view'
                                            }>
                                            <div className="popup-frame-item-third popup-frame-item-con">
                                                <div
                                                    style={{
                                                        background:
                                                            selectedColor,
                                                    }}
                                                    className="scan-me-text scan-me-text-item scan-me-text-download">
                                                    <div className="frame-arrow-icon">
                                                        <svg
                                                            width="16"
                                                            height="13"
                                                            viewBox="0 0 16 13"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M8.86602 12.5C8.48112 13.1667 7.51888 13.1667 7.13397 12.5L1.0718 2C0.686896 1.33333 1.16802 0.500001 1.93782 0.500001L14.0622 0.5C14.832 0.5 15.3131 1.33333 14.9282 2L8.86602 12.5Z"
                                                                fill={
                                                                    selectedColor
                                                                }
                                                            />
                                                        </svg>
                                                    </div>

                                                    <h4>SCAN ME</h4>
                                                </div>
                                                <div
                                                    className="qr-item-item"
                                                    style={{
                                                        border: `10px solid ${selectedColor}`,
                                                    }}>
                                                    {qrCodeView()}
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className={
                                                activeFrame === 4
                                                    ? 'popup-frame-list-item-view active'
                                                    : 'popup-frame-list-item-view'
                                            }>
                                            <div className="popup-frame-item-four popup-frame-item-con">
                                                <div
                                                    className="qr-item-item"
                                                    style={{
                                                        border: `10px solid ${selectedColor}`,
                                                    }}>
                                                    {qrCodeView()}
                                                </div>
                                                <div
                                                    style={{
                                                        background:
                                                            selectedColor,
                                                    }}
                                                    className="scan-me-text scan-me-text-item scan-me-text-download">
                                                    <div className="frame-arrow-icon">
                                                        <svg
                                                            width="16"
                                                            height="13"
                                                            viewBox="0 0 16 13"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M7.13398 0.499999C7.51888 -0.166668 8.48112 -0.166667 8.86602 0.5L14.9282 11C15.3131 11.6667 14.832 12.5 14.0622 12.5L1.93782 12.5C1.16802 12.5 0.686897 11.6667 1.0718 11L7.13398 0.499999Z"
                                                                fill={
                                                                    selectedColor
                                                                }
                                                            />
                                                        </svg>
                                                    </div>
                                                    <h4>SCAN ME</h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className={
                                                activeFrame === 5
                                                    ? 'popup-frame-list-item-view active'
                                                    : 'popup-frame-list-item-view'
                                            }>
                                            <div className="popup-frame-item-five popup-frame-item-con">
                                                <div
                                                    className="qr-item-item"
                                                    style={{
                                                        border: `10px solid ${selectedColor}`,
                                                    }}>
                                                    {qrCodeView()}
                                                </div>
                                                <div className="scan-me-text scan-me-text-download">
                                                    <h4
                                                        style={{
                                                            color: selectedColor,
                                                        }}>
                                                        SCAN ME
                                                    </h4>
                                                </div>
                                                <div className="frame-arrow-item">
                                                    <svg
                                                        width="21"
                                                        height="64"
                                                        viewBox="0 0 21 64"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M17.7201 20.9379C18.8036 14.5162 19.8872 8.0944 20.9707 1.67264C21.1757 0.65711 20.2679 0 19.36 0C13.3273 0.0597373 7.29449 0.0896059 1.23242 0.149343C-0.641841 0.179212 -0.261131 3.13621 1.58385 3.10634C6.44521 3.07647 11.3066 3.01673 16.1679 2.98686C7.70448 12.4851 0.471002 24.4624 1.37885 37.7241C1.84741 44.6835 4.60024 51.3442 8.84661 56.8102C10.8087 59.3191 13.0637 61.8281 15.6408 63.7098C17.1929 64.815 19.0086 62.4852 17.4565 61.3801C14.3815 59.1698 12.1266 56.5413 9.98874 53.4051C6.00593 47.6106 3.78025 40.6214 4.30738 33.5126C5.0688 23.1183 10.633 14.0084 17.2515 6.30228C16.4315 11.0514 15.6408 15.8304 14.8208 20.5795C14.4987 22.4314 17.3979 22.8196 17.7201 20.9379Z"
                                                            fill={selectedColor}
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className={
                                                activeFrame === 6
                                                    ? 'popup-frame-list-item-view active'
                                                    : 'popup-frame-list-item-view'
                                            }>
                                            <div
                                                className="popup-frame-item-first popup-frame-item-six popup-frame-item-con"
                                                style={{
                                                    backgroundColor:
                                                        selectedColor,
                                                }}>
                                                <div className="frame-icon-6">
                                                    <svg
                                                        width="60"
                                                        height="40"
                                                        viewBox="0 0 60 40"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            fill-rule="evenodd"
                                                            clip-rule="evenodd"
                                                            d="M10 0C4.47716 0 0 4.47717 0 10V30C0 35.5228 4.47716 40 10 40H50C55.5229 40 60 35.5228 60 30V10C60 4.47717 55.5229 0 50 0H10ZM13 6C9.68629 6 7 8.68628 7 12V26C7 29.3137 9.68629 32 13 32H47C50.3137 32 53 29.3137 53 26V12C53 8.68628 50.3137 6 47 6H13Z"
                                                            fill={selectedColor}
                                                        />
                                                    </svg>
                                                </div>
                                                <div className="qr-item-item">
                                                    {qrCodeView()}
                                                </div>

                                                <div className="scan-me-text scan-me-text-download">
                                                    <h4>SCAN ME</h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className={
                                                activeFrame === 7
                                                    ? 'popup-frame-list-item-view active'
                                                    : 'popup-frame-list-item-view'
                                            }>
                                            <div className="popup-frame-item-seven popup-frame-item-con">
                                                <div className="popup-frame-item-seven-head">
                                                    <div className="frame-icon-7">
                                                        <svg
                                                            width="184"
                                                            height="100"
                                                            viewBox="0 0 184 100"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <g filter="url(#filter0_d_1970_724)">
                                                                <path
                                                                    d="M132.457 3.91576C148.539 -5.29219 154.57 4.20054 156.279 7.42807C157.987 10.6556 164.119 20.0534 165.828 23.2809C167.536 26.5085 167.335 32.1092 158.993 36.8555C150.65 41.6019 128.135 51.3794 114.063 55.841L88.5323 50.3352C88.5323 50.2403 116.375 13.1237 132.457 3.91576Z"
                                                                    fill={
                                                                        selectedColor
                                                                    }
                                                                />
                                                                <path
                                                                    d="M50.8395 3.91576C34.7573 -5.29219 28.7264 4.20054 27.0177 7.42807C25.309 10.5607 19.1776 20.0534 17.4689 23.2809C15.7601 26.5085 15.9612 32.1092 24.3038 36.8555C32.6465 41.6019 55.2621 51.3794 69.3341 55.841L94.8646 50.3352C94.7641 50.2403 66.9218 13.1237 50.8395 3.91576Z"
                                                                    fill={
                                                                        selectedColor
                                                                    }
                                                                />
                                                                <path
                                                                    d="M135.456 40.642C150.46 33.4602 162.013 26.5009 161.26 25.098C160.507 23.695 147.734 28.3797 132.73 35.5615C117.726 42.7432 106.174 49.7025 106.927 51.1054C107.68 52.5084 120.453 47.8237 135.456 40.642Z"
                                                                    fill="#A09E99"
                                                                />
                                                                <path
                                                                    d="M77.0439 51.0731C77.7968 49.6702 66.2443 42.7109 51.2406 35.5291C36.237 28.3474 23.4638 23.6627 22.7108 25.0656C21.9579 26.4686 33.5104 33.4279 48.5141 40.6096C63.5177 47.7914 76.291 52.4761 77.0439 51.0731Z"
                                                                    fill="#A09E99"
                                                                />
                                                                <path
                                                                    d="M91.6482 63.8149C100.419 63.8149 107.529 57.0998 107.529 48.8164C107.529 40.5329 100.419 33.8179 91.6482 33.8179C82.8772 33.8179 75.767 40.5329 75.767 48.8164C75.767 57.0998 82.8772 63.8149 91.6482 63.8149Z"
                                                                    fill="#A09E99"
                                                                />
                                                                <path
                                                                    d="M173.668 91.059H10.2319C6.81439 91.059 4 88.4011 4 85.1735V54.2272C4 50.9997 6.81439 48.3417 10.2319 48.3417H173.768C177.186 48.3417 180 50.9997 180 54.2272V69.7479V85.2685C179.899 88.496 177.085 91.059 173.668 91.059Z"
                                                                    fill={
                                                                        selectedColor
                                                                    }
                                                                />
                                                            </g>
                                                            <defs>
                                                                <filter
                                                                    id="filter0_d_1970_724"
                                                                    x="0"
                                                                    y="0"
                                                                    width="184"
                                                                    height="99.0586"
                                                                    filterUnits="userSpaceOnUse"
                                                                    color-interpolation-filters="sRGB">
                                                                    <feFlood
                                                                        flood-opacity="0"
                                                                        result="BackgroundImageFix"
                                                                    />
                                                                    <feColorMatrix
                                                                        in="SourceAlpha"
                                                                        type="matrix"
                                                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                                        result="hardAlpha"
                                                                    />
                                                                    <feOffset dy="4" />
                                                                    <feGaussianBlur stdDeviation="2" />
                                                                    <feComposite
                                                                        in2="hardAlpha"
                                                                        operator="out"
                                                                    />
                                                                    <feColorMatrix
                                                                        type="matrix"
                                                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                                                                    />
                                                                    <feBlend
                                                                        mode="normal"
                                                                        in2="BackgroundImageFix"
                                                                        result="effect1_dropShadow_1970_724"
                                                                    />
                                                                    <feBlend
                                                                        mode="normal"
                                                                        in="SourceGraphic"
                                                                        in2="effect1_dropShadow_1970_724"
                                                                        result="shape"
                                                                    />
                                                                </filter>
                                                            </defs>
                                                        </svg>
                                                    </div>
                                                    <div className="scan-me-text scan-me-text-seven">
                                                        <h4>SCAN ME</h4>
                                                    </div>
                                                </div>
                                                <div
                                                    className="qr-item-item"
                                                    style={{
                                                        border: `10px solid ${selectedColor}`,
                                                    }}>
                                                    {qrCodeView()}
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className={
                                                activeFrame === 8
                                                    ? 'popup-frame-list-item-view active'
                                                    : 'popup-frame-list-item-view'
                                            }>
                                            <div className="popup-frame-item-eight popup-frame-item-con">
                                                <div
                                                    className="qr-item-item"
                                                    style={{
                                                        border: `10px solid ${selectedColor}`,
                                                    }}>
                                                    {qrCodeView()}
                                                </div>
                                                <div className="popup-frame-item-eight-bottom">
                                                    <div className="frame-icon-8">
                                                        <svg
                                                            width="300"
                                                            height="133"
                                                            viewBox="0 0 300 133"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <g clip-path="url(#clip0_2283_214)">
                                                                <path
                                                                    d="M297.424 1.34474C297.262 1.34474 297.262 1.23265 297.424 1.34474Z"
                                                                    fill="#F4A019"
                                                                />
                                                                <path
                                                                    d="M297.423 1.34513L266.506 23.7639L192.109 77.5689L156.039 71.2917L114.171 79.9229L33.6554 21.1857L5.63607 0.784657L4.50886 0C1.77134 1.68141 0 4.14747 0 6.83772V123.527C0 128.572 5.7971 132.607 13.0435 132.607H287.118C294.364 132.607 300.161 128.572 300.161 123.527V6.83772C300 4.82003 299.034 2.80235 297.423 1.34513Z"
                                                                    fill={
                                                                        selectedColor
                                                                    }
                                                                />
                                                                <path
                                                                    d="M33.4943 21.1853L5.63599 0.78418L33.4943 21.1853Z"
                                                                    fill="#E5CAB5"
                                                                />
                                                                <path
                                                                    d="M297.424 1.34507C297.263 1.34507 297.263 1.23298 297.424 1.34507Z"
                                                                    fill="#E5CAB5"
                                                                />
                                                                <path
                                                                    d="M4.50903 130.123L125.765 72.0587C128.342 70.4894 138.648 64.8847 154.106 64.9968C169.082 65.1089 179.066 70.6015 181.804 72.1708C219.485 91.6751 257.327 111.292 295.008 130.796"
                                                                    fill={
                                                                        selectedColor
                                                                    }
                                                                />
                                                                <path
                                                                    d="M4.50903 130.123L125.765 72.0587C128.342 70.4894 138.648 64.8847 154.106 64.9968C169.082 65.1089 179.066 70.6015 181.804 72.1708C219.485 91.6751 257.327 111.292 295.008 130.796"
                                                                    stroke="#A09E99"
                                                                    strokeWidth="2"
                                                                    stroke-miterlimit="10"
                                                                />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_2283_214">
                                                                    <rect
                                                                        width="300"
                                                                        height="132.607"
                                                                        fill="white"
                                                                    />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                    </div>
                                                    <div className="scan-me-text scan-me-text-eight">
                                                        <h4>SCAN ME</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className={
                                                activeFrame === 9
                                                    ? 'popup-frame-list-item-view active'
                                                    : 'popup-frame-list-item-view'
                                            }>
                                            <div className="popup-frame-item-eight popup-frame-item-con">
                                                <div className="qr-item-item popup-frame-item-nine-border">
                                                    {qrCodeView()}
                                                </div>
                                                <div className="popup-frame-item-nine-bottom">
                                                    <h4>FOLLOW US ON</h4>
                                                    <div className="instagram-icon-item">
                                                        <img
                                                            src="/img/icons/instagram1.svg"
                                                            alt=""
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className={
                                                activeFrame === 10
                                                    ? 'popup-frame-list-item-view active'
                                                    : 'popup-frame-list-item-view'
                                            }>
                                            <div className="popup-frame-item-ten popup-frame-item-con">
                                                <div className="popup-frame-item-ten-header">
                                                    <h4>FOLLOW US ON</h4>
                                                </div>
                                                <div className="qr-item-item">
                                                    {qrCodeView()}
                                                </div>
                                                <div className="popup-frame-item-ten-bottom">
                                                    <div className="instagram-icon-item">
                                                        <img
                                                            src="/img/icons/heart.svg"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="instagram-icon-item">
                                                        <img
                                                            src="/img/icons/instagram-text.svg"
                                                            alt=""
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className={
                                                activeFrame === 11
                                                    ? 'popup-frame-list-item-view active'
                                                    : 'popup-frame-list-item-view'
                                            }>
                                            <div className="popup-frame-item-elevent popup-frame-item-con">
                                                <div className="popup-frame-item-elevent-header">
                                                    <h4>FOLLOW US ON</h4>
                                                </div>
                                                <div className="qr-item-item">
                                                    {qrCodeView()}
                                                </div>
                                                <div className="popup-frame-item-elevent-bottom">
                                                    <div className="instagram-icon-item ">
                                                        <img
                                                            src="/img/icons/instagram-text-2.svg"
                                                            alt=""
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="frame-download-btn-item">
                                        <button
                                            className="custom-btn"
                                            onClick={handleDownload}>
                                            Download QR Code
                                        </button>
                                    </div>
                                </div>
                                <div className="popop-model-right">
                                    <button
                                        className="btn-close"
                                        onClick={handlePopup}>
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 18 18"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M1.8 18L0 16.2L7.2 9L0 1.8L1.8 0L9 7.2L16.2 0L18 1.8L10.8 9L18 16.2L16.2 18L9 10.8L1.8 18Z"
                                                fill="#fff"
                                            />
                                        </svg>
                                    </button>
                                    <div className="popup-content-right">
                                        <div className="popup-frame-content">
                                            <h2 className="frame-title">
                                                FRAME
                                            </h2>
                                            <div className="popup-frame-item-lists">
                                                <div
                                                    className={
                                                        activeFrame === 1
                                                            ? 'popup-frame-list-item active'
                                                            : ' popup-frame-list-item'
                                                    }
                                                    onClick={() =>
                                                        toggleFrame(1)
                                                    }>
                                                    <img
                                                        src="/img/icons/frame-1.png"
                                                        alt=""
                                                    />
                                                </div>
                                                <div
                                                    className={
                                                        activeFrame === 2
                                                            ? 'popup-frame-list-item active'
                                                            : ' popup-frame-list-item'
                                                    }
                                                    onClick={() =>
                                                        toggleFrame(2)
                                                    }>
                                                    <img
                                                        src="/img/icons/frame-2.png"
                                                        alt=""
                                                    />
                                                </div>
                                                <div
                                                    className={
                                                        activeFrame === 3
                                                            ? 'popup-frame-list-item active'
                                                            : ' popup-frame-list-item'
                                                    }
                                                    onClick={() =>
                                                        toggleFrame(3)
                                                    }>
                                                    <img
                                                        src="/img/icons/frame-3.png"
                                                        alt=""
                                                    />
                                                </div>
                                                <div
                                                    className={
                                                        activeFrame === 4
                                                            ? 'popup-frame-list-item active'
                                                            : ' popup-frame-list-item'
                                                    }
                                                    onClick={() =>
                                                        toggleFrame(4)
                                                    }>
                                                    <img
                                                        src="/img/icons/frame-4.png"
                                                        alt=""
                                                    />
                                                </div>
                                                <div
                                                    className={
                                                        activeFrame === 5
                                                            ? 'popup-frame-list-item active'
                                                            : ' popup-frame-list-item'
                                                    }
                                                    onClick={() =>
                                                        toggleFrame(5)
                                                    }>
                                                    <img
                                                        src="/img/icons/frame-5.png"
                                                        alt=""
                                                    />
                                                </div>
                                                <div
                                                    className={
                                                        activeFrame === 6
                                                            ? 'popup-frame-list-item active'
                                                            : ' popup-frame-list-item'
                                                    }
                                                    onClick={() =>
                                                        toggleFrame(6)
                                                    }>
                                                    <img
                                                        src="/img/icons/fram-5.png"
                                                        alt=""
                                                    />
                                                </div>
                                                <div
                                                    className={
                                                        activeFrame === 7
                                                            ? 'popup-frame-list-item active'
                                                            : ' popup-frame-list-item'
                                                    }
                                                    onClick={() =>
                                                        toggleFrame(7)
                                                    }>
                                                    <img
                                                        src="/img/icons/frame-7.png"
                                                        alt=""
                                                    />
                                                </div>
                                                <div
                                                    className={
                                                        activeFrame === 8
                                                            ? 'popup-frame-list-item active'
                                                            : ' popup-frame-list-item'
                                                    }
                                                    onClick={() =>
                                                        toggleFrame(8)
                                                    }>
                                                    <img
                                                        src="/img/icons/frame-8.png"
                                                        alt=""
                                                    />
                                                </div>
                                                <div
                                                    className={
                                                        activeFrame === 9
                                                            ? 'popup-frame-list-item active'
                                                            : ' popup-frame-list-item'
                                                    }
                                                    onClick={() =>
                                                        toggleFrame(9)
                                                    }>
                                                    <img
                                                        src="/img/icons/frame-9.png"
                                                        alt=""
                                                    />
                                                </div>
                                                <div
                                                    className={
                                                        activeFrame === 10
                                                            ? 'popup-frame-list-item active'
                                                            : ' popup-frame-list-item'
                                                    }
                                                    onClick={() =>
                                                        toggleFrame(10)
                                                    }>
                                                    <img
                                                        src="/img/icons/frame-10.png"
                                                        alt=""
                                                    />
                                                </div>
                                                <div
                                                    className={
                                                        activeFrame === 11
                                                            ? 'popup-frame-list-item active'
                                                            : ' popup-frame-list-item'
                                                    }
                                                    onClick={() =>
                                                        toggleFrame(11)
                                                    }>
                                                    <img
                                                        src="/img/icons/frame-11.png"
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="popup-frame-input mt-2">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <label
                                                        htmlFor="Primarycolor"
                                                        className="form-label color-pic-label">
                                                        Frame Color
                                                    </label>
                                                    <div className="pic-with-color">
                                                        <p>{selectedColor}</p>
                                                        <input
                                                            type="color"
                                                            className=" form-control-color "
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
                                                <div className="col-md-4 ">
                                                    <label
                                                        htmlFor="frameText"
                                                        className="form-label color-pic-label">
                                                        Frame Text
                                                    </label>
                                                    <div className="frame-input-text-name">
                                                        <input
                                                            type="text"
                                                            className=" form-control-color form-control-color-frame-text"
                                                            name="frameText"
                                                            placeholder="SCAN ME"
                                                            id="frameText"
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

                                            <div className="qr-item-item mt-2">
                                                <div
                                                    ref={componentRef}
                                                    style={{
                                                        position: 'relative',
                                                        width: '60px',
                                                        height: '60px',
                                                    }}
                                                    className="qr-image-wrapper">
                                                    <QRCode
                                                        value={`https://smartcardgenerator.net/${uniqueSlug}`}
                                                        size={60}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <label
                                                        htmlFor="Primarycolor"
                                                        className="form-label color-pic-label">
                                                        CODE Color
                                                    </label>
                                                    <div className="pic-with-color">
                                                        <p>
                                                            {selectedCodeColor}
                                                        </p>
                                                        <input
                                                            type="color"
                                                            className=" form-control-color "
                                                            name="primaryColor"
                                                            value={
                                                                selectedCodeColor
                                                            }
                                                            onChange={
                                                                handleCodeColorChange
                                                            }
                                                            id="Primarycolor"
                                                            title="Choose your color"></input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="popup-frame-logo-content mt-3">
                                            <div className="logo-frame-item-header d-flex align-items-center gap-3">
                                                <h2 className="frame-title">
                                                    Logo
                                                </h2>
                                                <div
                                                    {...getRootProps()}
                                                    className="dropzone-upload-imgs d-flex align-items-center gap-2">
                                                    <input
                                                        {...getInputProps()}
                                                    />
                                                    <svg
                                                        width="18"
                                                        height="18"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M23.6712 4.665L21.6712 0.665C21.609 0.540279 21.5132 0.435379 21.3946 0.362073C21.2761 0.288768 21.1394 0.249958 21 0.25H3C2.8606 0.249958 2.72395 0.288768 2.60538 0.362073C2.48681 0.435379 2.39102 0.540279 2.32875 0.665L0.32875 4.665C0.277189 4.76916 0.250246 4.88378 0.25 5V22C0.25 22.4641 0.434375 22.9092 0.762563 23.2374C1.09075 23.5656 1.53587 23.75 2 23.75H22C22.4641 23.75 22.9092 23.5656 23.2374 23.2374C23.5656 22.9092 23.75 22.4641 23.75 22V5C23.7498 4.88378 23.7228 4.76916 23.6712 4.665ZM3.46375 1.75H20.5362L21.7862 4.25H2.21375L3.46375 1.75ZM22 22.25H2C1.9337 22.25 1.87011 22.2237 1.82322 22.1768C1.77634 22.1299 1.75 22.0663 1.75 22V5.75H22.25V22C22.25 22.0663 22.2237 22.1299 22.1768 22.1768C22.1299 22.2237 22.0663 22.25 22 22.25ZM16.53 14.47C16.6705 14.6106 16.7493 14.8012 16.7493 15C16.7493 15.1988 16.6705 15.3894 16.53 15.53L12.53 19.53C12.3894 19.6705 12.1988 19.7493 12 19.7493C11.8012 19.7493 11.6106 19.6705 11.47 19.53L7.47 15.53C7.33752 15.3878 7.2654 15.1998 7.26882 15.0055C7.27225 14.8112 7.35097 14.6258 7.48838 14.4884C7.62579 14.351 7.81118 14.2723 8.00548 14.2688C8.19978 14.2654 8.38783 14.3375 8.53 14.47L11.25 17.1887V9C11.25 8.80109 11.329 8.61032 11.4697 8.46967C11.6103 8.32902 11.8011 8.25 12 8.25C12.1989 8.25 12.3897 8.32902 12.5303 8.46967C12.671 8.61032 12.75 8.80109 12.75 9V17.1887L15.47 14.47C15.6106 14.3295 15.8012 14.2507 16 14.2507C16.1988 14.2507 16.3894 14.3295 16.53 14.47Z"
                                                            fill="#B5B5B5"
                                                        />
                                                    </svg>

                                                    <p>upload</p>
                                                </div>
                                            </div>
                                            <div className="logo-frame-list-item">
                                                <ul>
                                                    {uploadedFiles.map(
                                                        (file, index) => (
                                                            <li
                                                                key={index}
                                                                className="logo-frame-item"
                                                                onClick={() =>
                                                                    handleFileClick(
                                                                        index,
                                                                    )
                                                                }>
                                                                <img
                                                                    src={URL.createObjectURL(
                                                                        file,
                                                                    )}
                                                                    alt={`Uploaded ${file.name}`}
                                                                />
                                                                <button
                                                                    className="remove-btn"
                                                                    onClick={() =>
                                                                        removeFile(
                                                                            index,
                                                                        )
                                                                    }>
                                                                    <svg
                                                                        width="8"
                                                                        height="8"
                                                                        viewBox="0 0 18 18"
                                                                        fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg">
                                                                        <path
                                                                            d="M1.8 18L0 16.2L7.2 9L0 1.8L1.8 0L9 7.2L16.2 0L18 1.8L10.8 9L18 16.2L16.2 18L9 10.8L1.8 18Z"
                                                                            fill="white"
                                                                        />
                                                                    </svg>
                                                                </button>
                                                            </li>
                                                        ),
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default InstagramPopup
