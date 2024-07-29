import { DataIcons } from '@/DataIcon/DataIcons'
import AppointmentCalendar from '@/components/AppointmentCalendar'
import Header from '@/components/Layouts/Header'
import axios from 'axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'

const Information = ({ information }) => {
    // =================== Appointment calendar ========
    const [activePopup, setActivePopup] = useState('')
    const handlePopup = () => {
        setActivePopup(!activePopup)
    }

    if (!information) {
        return null
    }

    const baseuri = process.env.NEXT_PUBLIC_BACKEND_URL

    const handleSaveContact = () => {
        // Generate a VCard content
        const vCardContent = `BEGIN:VCARD
VERSION:3.0
FN:${information.firstname} ${information.lastname}
TEL;TYPE=CELL:${information.mobile1}
EMAIL;TYPE=INTERNET:${information.email1}
ADR;TYPE=HOME:;;${information.address1}
URL:${information.webaddress1}
END:VCARD`

        const blob = new Blob([vCardContent], { type: 'text/vcard' })

        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = `${information.firstname}_${information.lastname}.vcf`
        link.click()
    }

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: document.title,
                    text: 'Check out “One Country One Card”',
                    url: window.location.href,
                })
            } catch (error) {
                console.error('Error sharing:', error)
            }
        } else {
            console.log('Web Share API is not supported.')
        }
    }

    const [showMore, setShowMore] = useState(false)

    const toggleShowMore = () => {
        setShowMore(!showMore)
    }

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 1000)
        return () => clearTimeout(timer)
    }, [])

    const divStyle = {
        background: `linear-gradient(133deg, ${information.maincolor} 0%, ${information.gradientcolor} 97.22%)`,
        transition: 'opacity 1s ease-in-in',
        opacity: loading ? 0.7 : 1,
    }

    return (
        <>
            <Head>
                <meta charset="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                <title>
                    {information.firstname} {information.lastname}
                </title>
                <meta property="og:type" content="website" />
                <meta
                    property="og:url"
                    content={`https://smartcardgenerator.net/${information.slug}`}
                />
                <meta
                    property="description"
                    content={`${information.summary}`}
                />
                <meta
                    property="og:description"
                    content={`${information.summary}`}
                />
                <meta
                    property="og:title"
                    content={`${information.firstname}`}
                />
                <meta property="og:image" content={`${information.image}`} />
                <meta property="image" content={`${information.image}`} />
                <meta property="og:site_name" content="Smart Card Generator" />
            </Head>
            {loading ? (
                information?.welcome ? (
                    <div
                        style={{ ...divStyle, opacity: loading ? 0.9 : 1 }}
                        className="loading-screen">
                        <img
                            className={`${loading ? 'zoom-out' : ''}`}
                            src={`${baseuri}/${information?.welcome}`}
                            alt="Welcome dynamically"
                        />
                    </div>
                ) : (
                    <div
                        style={{ ...divStyle, opacity: loading ? 0.9 : 1 }}
                        className="loading-screen">
                        <img
                            className={`${loading ? 'zoom-out' : ''}`}
                            src="img/welcome.gif"
                            alt="Welcome s"
                        />
                    </div>
                )
            ) : (
                <div>
                    {information ? (
                        <section>
                            <div className="view-information">
                                <div className="view-information-wrraper">
                                    <div className="preview">
                                        <div className="show-preview border-none">
                                            <div
                                                className="view-header-item"
                                                style={divStyle}>
                                                <div className="my-preview-top">
                                                    <div className="preview-image">
                                                        <img
                                                            alt=""
                                                            src={`${baseuri}/${information.image}`}
                                                        />
                                                    </div>
                                                    <h3 className="name">
                                                        {information.firstname}{' '}
                                                        {information.lastname}
                                                    </h3>
                                                    <p className="dajignation">
                                                        {information.jobtitle}
                                                    </p>
                                                    <ul className="social-aciton">
                                                        <li>
                                                            <a
                                                                href={`tel:${information.mobile1}`}>
                                                                <img
                                                                    src="img/icon/call.svg"
                                                                    alt=""
                                                                />
                                                                <p>Call</p>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                href={`mailto:${information.email1}`}>
                                                                <img
                                                                    src="img/icon/telegram2.svg"
                                                                    alt=""
                                                                />
                                                                <p>Email</p>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="card-list view-body-item">
                                                <div className="view-summary-title">
                                                    {information.summary && (
                                                        <>
                                                            <div
                                                                dangerouslySetInnerHTML={{
                                                                    __html: showMore
                                                                        ? information.summary
                                                                        : `${information.summary.substring(
                                                                              0,
                                                                              250,
                                                                          )}...`,
                                                                }}
                                                            />
                                                            {information.summary
                                                                .length >
                                                                250 && (
                                                                <span
                                                                    className="read-more-btn-item"
                                                                    onClick={
                                                                        toggleShowMore
                                                                    }>
                                                                    {showMore
                                                                        ? ' Read Less'
                                                                        : ' Read More'}
                                                                </span>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                                <ul>
                                                    <li className="card-list-header">
                                                        Personal Information
                                                    </li>
                                                    {information.mobile1 ? (
                                                        <li className="card-list-li">
                                                            <div
                                                                className="preview-info-icon"
                                                                style={{
                                                                    background: `${information.buttoncolor}`,
                                                                }}>
                                                                <img
                                                                    src="img/icon/phone.svg"
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div className="info-show">
                                                                <p>
                                                                    Mobile
                                                                    Number
                                                                </p>

                                                                <a
                                                                    href={`tel:${information.mobile1}`}>
                                                                    {
                                                                        information.mobile1
                                                                    }
                                                                </a>
                                                            </div>
                                                        </li>
                                                    ) : null}
                                                    {information.mobile2 ? (
                                                        <li className="card-list-li">
                                                            <div
                                                                className="preview-info-icon"
                                                                style={{
                                                                    background: `${information.buttoncolor}`,
                                                                }}>
                                                                <img
                                                                    src="img/icon/whatsapp2.svg"
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div className="info-show">
                                                                <p>
                                                                    WhatsApp
                                                                    Number
                                                                </p>
                                                                <a
                                                                    href={`tel:${information.mobile2}`}>
                                                                    {
                                                                        information.mobile2
                                                                    }
                                                                </a>
                                                            </div>
                                                        </li>
                                                    ) : null}
                                                    {information.phone1 ? (
                                                        <li className="card-list-li">
                                                            <div
                                                                className="preview-info-icon"
                                                                style={{
                                                                    background: `${information.buttoncolor}`,
                                                                }}>
                                                                <img
                                                                    src="img/icon/phone2.svg"
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div className="info-show">
                                                                <p>
                                                                    Phone Number
                                                                </p>
                                                                <a
                                                                    href={`tel:${information.phone1}`}>
                                                                    {
                                                                        information.phone1
                                                                    }
                                                                </a>
                                                            </div>
                                                        </li>
                                                    ) : null}

                                                    {information.fax ? (
                                                        <li className="card-list-li">
                                                            <div
                                                                className="preview-info-icon"
                                                                style={{
                                                                    background: `${information.buttoncolor}`,
                                                                }}>
                                                                <img
                                                                    src="img/icon/fax.svg"
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div className="info-show">
                                                                <p>Fax</p>
                                                                <a
                                                                    href={`tel:${information.fax}`}>
                                                                    {
                                                                        information.fax
                                                                    }
                                                                </a>
                                                            </div>
                                                        </li>
                                                    ) : null}
                                                    {information.email1 ? (
                                                        <li className="card-list-li">
                                                            <div
                                                                className="preview-info-icon"
                                                                style={{
                                                                    background: `${information.buttoncolor}`,
                                                                }}>
                                                                <img
                                                                    src="img/icon/email.svg"
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div className="info-show">
                                                                <p>Email</p>
                                                                <a
                                                                    href={`mailto:${information.email1}`}>
                                                                    {
                                                                        information.email1
                                                                    }
                                                                </a>
                                                            </div>
                                                        </li>
                                                    ) : null}
                                                    {information.address1 ? (
                                                        <li className="card-list-li">
                                                            <div
                                                                className="preview-info-icon"
                                                                style={{
                                                                    background: `${information.buttoncolor}`,
                                                                }}>
                                                                <img
                                                                    src="img/icon/address.svg"
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div className="info-show">
                                                                <p>Address</p>
                                                                <p className="mt-2">
                                                                    {
                                                                        information.address1
                                                                    }
                                                                </p>
                                                            </div>
                                                        </li>
                                                    ) : null}
                                                    {information.webaddress1 ? (
                                                        <li className="card-list-li">
                                                            <div
                                                                className="preview-info-icon"
                                                                style={{
                                                                    background: `${information.buttoncolor}`,
                                                                }}>
                                                                <img
                                                                    src="img/icon/web.svg"
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div className="info-show">
                                                                <p>
                                                                    Web Address
                                                                </p>
                                                                <a
                                                                    href={
                                                                        information.webaddress1
                                                                    }
                                                                    target="_blank"
                                                                    className="mt-2">
                                                                    {
                                                                        information.webaddress1
                                                                    }
                                                                </a>
                                                            </div>
                                                        </li>
                                                    ) : null}
                                                    <li className="card-list-header">
                                                        Organization Information
                                                    </li>
                                                    {information.companyname ? (
                                                        <>
                                                            <li className="card-list-li">
                                                                <div
                                                                    className="preview-info-icon"
                                                                    style={{
                                                                        background: `${information.buttoncolor}`,
                                                                    }}>
                                                                    <img
                                                                        src="img/icon/company.svg"
                                                                        alt=""
                                                                    />
                                                                </div>
                                                                <div className="info-show">
                                                                    <p>
                                                                        Company
                                                                        Name
                                                                    </p>
                                                                    <a
                                                                        href={
                                                                            information.webaddress2
                                                                        }
                                                                        target="_blank">
                                                                        {
                                                                            information.companyname
                                                                        }
                                                                    </a>
                                                                </div>
                                                            </li>
                                                        </>
                                                    ) : null}

                                                    {information.mobile3 ? (
                                                        <li className="card-list-li">
                                                            <div
                                                                className="preview-info-icon"
                                                                style={{
                                                                    background: `${information.buttoncolor}`,
                                                                }}>
                                                                <img
                                                                    src="img/icon/phone.svg"
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div className="info-show">
                                                                <p>
                                                                    Mobile
                                                                    Number
                                                                </p>
                                                                <a
                                                                    href={`tel:${information.mobile3}`}>
                                                                    {
                                                                        information.mobile3
                                                                    }
                                                                </a>
                                                            </div>
                                                        </li>
                                                    ) : null}
                                                    {information.mobile4 ? (
                                                        <li className="card-list-li">
                                                            <div
                                                                className="preview-info-icon"
                                                                style={{
                                                                    background: `${information.buttoncolor}`,
                                                                }}>
                                                                <img
                                                                    src="img/icon/whatsapp2.svg"
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div className="info-show">
                                                                <p>
                                                                    WhatsApp
                                                                    Number
                                                                </p>
                                                                <a
                                                                    href={`tel:${information.mobile4}`}>
                                                                    {
                                                                        information.mobile4
                                                                    }
                                                                </a>
                                                            </div>
                                                        </li>
                                                    ) : null}
                                                    {information.phone2 ? (
                                                        <li className="card-list-li">
                                                            <div
                                                                className="preview-info-icon"
                                                                style={{
                                                                    background: `${information.buttoncolor}`,
                                                                }}>
                                                                <img
                                                                    src="img/icon/phone2.svg"
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div className="info-show">
                                                                <p>
                                                                    Phone Number
                                                                </p>
                                                                <a
                                                                    href={`tel:${information.phone2}`}>
                                                                    {
                                                                        information.phone2
                                                                    }
                                                                </a>
                                                            </div>
                                                        </li>
                                                    ) : null}
                                                    {information.fax2 ? (
                                                        <li className="card-list-li">
                                                            <div
                                                                className="preview-info-icon"
                                                                style={{
                                                                    background: `${information.buttoncolor}`,
                                                                }}>
                                                                <img
                                                                    src="img/icon/fax.svg"
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div className="info-show">
                                                                <p>Fax</p>
                                                                <a
                                                                    href={`tel:${information.fax2}`}>
                                                                    {
                                                                        information.fax2
                                                                    }
                                                                </a>
                                                            </div>
                                                        </li>
                                                    ) : null}
                                                    {information.email2 ? (
                                                        <li className="card-list-li">
                                                            <div
                                                                className="preview-info-icon"
                                                                style={{
                                                                    background: `${information.buttoncolor}`,
                                                                }}>
                                                                <img
                                                                    src="img/icon/email.svg"
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div className="info-show">
                                                                <p>Email</p>
                                                                <p className="mt-2">
                                                                    {
                                                                        information.email2
                                                                    }
                                                                </p>
                                                            </div>
                                                        </li>
                                                    ) : null}
                                                    {information.address2 ? (
                                                        <li className="card-list-li">
                                                            <div
                                                                className="preview-info-icon"
                                                                style={{
                                                                    background: `${information.buttoncolor}`,
                                                                }}>
                                                                <img
                                                                    src="img/icon/address.svg"
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div className="info-show">
                                                                <p>Address</p>
                                                                <p className="mt-2">
                                                                    {
                                                                        information.address2
                                                                    }
                                                                </p>
                                                            </div>
                                                        </li>
                                                    ) : null}

                                                    {information.webaddress2 ? (
                                                        <li className="card-list-li">
                                                            <div
                                                                className="preview-info-icon"
                                                                style={{
                                                                    background: `${information.buttoncolor}`,
                                                                }}>
                                                                <img
                                                                    src="img/icon/web.svg"
                                                                    alt=""
                                                                />
                                                            </div>

                                                            <div className="info-show">
                                                                <p>
                                                                    Web Address
                                                                </p>
                                                                <a
                                                                    href={
                                                                        information.webaddress2
                                                                    }
                                                                    target="_blank">
                                                                    {
                                                                        information.webaddress2
                                                                    }
                                                                </a>
                                                            </div>
                                                        </li>
                                                    ) : null}

                                                    <li className="view-card-social">
                                                        <h4>Social Media</h4>

                                                        <div className="social-media-list-items">
                                                            {information.facebook ? (
                                                                <a
                                                                    href={
                                                                        information.facebook
                                                                    }
                                                                    className="preview-icon-item">
                                                                    <img
                                                                        src="/img/icons/facebook.svg"
                                                                        alt=""
                                                                    />
                                                                </a>
                                                            ) : (
                                                                ''
                                                            )}
                                                            {information.twitter ? (
                                                                <a
                                                                    href={
                                                                        information.twitter
                                                                    }
                                                                    className="preview-icon-item">
                                                                    <img
                                                                        src="/img/icons/twitter.svg"
                                                                        alt=""
                                                                    />
                                                                </a>
                                                            ) : (
                                                                ''
                                                            )}

                                                            {information.instagram ? (
                                                                <a
                                                                    href={
                                                                        information.instagram
                                                                    }
                                                                    className="preview-icon-item">
                                                                    <img
                                                                        src="/img/icons/instagram.svg"
                                                                        alt=""
                                                                    />
                                                                </a>
                                                            ) : (
                                                                ''
                                                            )}
                                                            {information.behance ? (
                                                                <a
                                                                    href={
                                                                        information.behance
                                                                    }
                                                                    className="preview-icon-item">
                                                                    <img
                                                                        src="/img/icons/behance.svg"
                                                                        alt=""
                                                                    />
                                                                </a>
                                                            ) : (
                                                                ''
                                                            )}
                                                            {information.linkedin ? (
                                                                <a
                                                                    className="preview-icon-item"
                                                                    href={
                                                                        information.linkedin
                                                                    }>
                                                                    <img
                                                                        src="/img/icons/linkedin.svg"
                                                                        alt=""
                                                                    />
                                                                </a>
                                                            ) : (
                                                                ''
                                                            )}
                                                            {information.google ? (
                                                                <a
                                                                    className="preview-icon-item"
                                                                    href={
                                                                        information.google
                                                                    }>
                                                                    <img
                                                                        src="/img/icons/google.svg"
                                                                        alt=""
                                                                    />
                                                                </a>
                                                            ) : (
                                                                ''
                                                            )}
                                                            {information.youtube ? (
                                                                <a
                                                                    className="preview-icon-item"
                                                                    href={
                                                                        information.youtube
                                                                    }>
                                                                    <img
                                                                        src="/img/icons/youtube.svg"
                                                                        alt=""
                                                                    />
                                                                </a>
                                                            ) : (
                                                                ''
                                                            )}
                                                            {information.apple ? (
                                                                <a
                                                                    className="preview-icon-item"
                                                                    href={
                                                                        information.apple
                                                                    }>
                                                                    <img
                                                                        src="/img/icons/apple.svg"
                                                                        alt=""
                                                                    />
                                                                </a>
                                                            ) : (
                                                                ''
                                                            )}
                                                            {information.snapchat ? (
                                                                <a
                                                                    className="preview-icon-item"
                                                                    href={
                                                                        information.snapchat
                                                                    }>
                                                                    <img
                                                                        src="/img/icons/snapchat.svg"
                                                                        alt=""
                                                                    />
                                                                </a>
                                                            ) : (
                                                                ''
                                                            )}
                                                            {information.figma ? (
                                                                <a
                                                                    className="preview-icon-item"
                                                                    href={
                                                                        information.figma
                                                                    }>
                                                                    <img
                                                                        src="/img/icons/figma.svg"
                                                                        alt=""
                                                                    />
                                                                </a>
                                                            ) : (
                                                                ''
                                                            )}

                                                            {information.reddit ? (
                                                                <a
                                                                    className="preview-icon-item"
                                                                    href={
                                                                        information.reddit
                                                                    }>
                                                                    <img
                                                                        src="/img/icons/reddit.svg"
                                                                        alt=""
                                                                    />
                                                                </a>
                                                            ) : (
                                                                ''
                                                            )}
                                                            {information.discord ? (
                                                                <a
                                                                    className="preview-icon-item"
                                                                    href={
                                                                        information.discord
                                                                    }>
                                                                    <img
                                                                        src="/img/icons/discord.svg"
                                                                        alt=""
                                                                    />
                                                                </a>
                                                            ) : (
                                                                ''
                                                            )}
                                                            {information.tiktok ? (
                                                                <a
                                                                    className="preview-icon-item"
                                                                    href={
                                                                        information.tiktok
                                                                    }>
                                                                    <img
                                                                        src="/img/icons/tiktok.svg"
                                                                        alt=""
                                                                    />
                                                                </a>
                                                            ) : (
                                                                ''
                                                            )}
                                                            {information.tumblr ? (
                                                                <a
                                                                    className="preview-icon-item"
                                                                    href={
                                                                        information.tumblr
                                                                    }>
                                                                    <img
                                                                        src="/img/icons/tumblr.svg"
                                                                        alt=""
                                                                    />
                                                                </a>
                                                            ) : (
                                                                ''
                                                            )}
                                                            {information.telegram ? (
                                                                <a
                                                                    className="preview-icon-item"
                                                                    href={
                                                                        information.telegram
                                                                    }>
                                                                    <img
                                                                        src="/img/icons/telegram.svg"
                                                                        alt=""
                                                                    />
                                                                </a>
                                                            ) : (
                                                                ''
                                                            )}
                                                            {information.pinterest ? (
                                                                <a
                                                                    className="preview-icon-item"
                                                                    href={
                                                                        information.pinterest
                                                                    }>
                                                                    <img
                                                                        src="/img/icons/pinterest.svg"
                                                                        alt=""
                                                                    />
                                                                </a>
                                                            ) : (
                                                                ''
                                                            )}
                                                            {information.github ? (
                                                                <a
                                                                    className="preview-icon-item"
                                                                    href={
                                                                        information.github
                                                                    }>
                                                                    <img
                                                                        src="/img/icons/githup.svg"
                                                                        alt=""
                                                                    />
                                                                </a>
                                                            ) : (
                                                                ''
                                                            )}
                                                            {information.messenger ? (
                                                                <a
                                                                    className="preview-icon-item"
                                                                    href={
                                                                        information.messenger
                                                                    }>
                                                                    <img
                                                                        src="/img/icons/messenger.svg"
                                                                        alt=""
                                                                    />
                                                                </a>
                                                            ) : (
                                                                ''
                                                            )}
                                                            {information.whatsapp ? (
                                                                <a
                                                                    className="preview-icon-item"
                                                                    href={
                                                                        information.whatsapp
                                                                    }>
                                                                    <img
                                                                        src="/img/icons/whatsapp.svg"
                                                                        alt=""
                                                                    />
                                                                </a>
                                                            ) : (
                                                                ''
                                                            )}
                                                            {information.skype ? (
                                                                <a
                                                                    className="preview-icon-item"
                                                                    href={
                                                                        information.skype
                                                                    }>
                                                                    <img
                                                                        src="/img/icons/skype.svg"
                                                                        alt=""
                                                                    />
                                                                </a>
                                                            ) : (
                                                                ''
                                                            )}
                                                            {information.spotify ? (
                                                                <a
                                                                    className="preview-icon-item"
                                                                    href={
                                                                        information.spotify
                                                                    }>
                                                                    <img
                                                                        src="/img/icons/spotify.svg"
                                                                        alt=""
                                                                    />
                                                                </a>
                                                            ) : (
                                                                ''
                                                            )}
                                                            {information.google_scholar ? (
                                                                <a
                                                                    className="preview-icon-item"
                                                                    href={
                                                                        information.google_scholar
                                                                    }>
                                                                    <img
                                                                        src="/img/icons/scholar.svg"
                                                                        alt=""
                                                                    />
                                                                </a>
                                                            ) : (
                                                                ''
                                                            )}
                                                        </div>
                                                    </li>
                                                </ul>

                                                <div className="view-btn-item">
                                                    <button
                                                        className="view-card-btn-appoint"
                                                        onClick={handlePopup}>
                                                        <svg
                                                            width="24"
                                                            height="23"
                                                            viewBox="0 0 24 23"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                fill-rule="evenodd"
                                                                clip-rule="evenodd"
                                                                d="M5.6 1.22V3.52C5.6 4.19 5.05 4.74 4.38 4.74C3.71 4.74 3.16 4.2 3.16 3.52V1.22C3.17 0.55 3.71 0 4.38 0C4.72 0 5.02 0.14 5.24 0.36C5.46 0.58 5.6 0.88 5.6 1.22ZM21.65 4.95V10.22C21.13 9.91 20.56 9.67 19.97 9.5V7.97H1.57V19C1.57 19.53 2 19.97 2.54 19.97H11.68C12.01 20.57 12.42 21.11 12.9 21.59H2.62C1.17 21.58 0 20.41 0 18.97V4.95C0 3.62 0.99 2.53 2.27 2.36V3.47C2.27 4.62 3.16 5.59 4.3 5.64C5.5 5.69 6.5 4.72 6.5 3.53V2.33H8.67V3.46C8.67 4.61 9.56 5.58 10.7 5.63C11.9 5.68 12.9 4.71 12.9 3.52V2.33H15.1V3.46C15.1 4.61 15.99 5.58 17.14 5.63C18.34 5.68 19.34 4.71 19.34 3.52V2.35C20.64 2.5 21.65 3.61 21.65 4.95ZM15.61 9.64C14.51 10.03 13.53 10.67 12.74 11.5V11.43V10.16C12.74 9.85 12.99 9.59 13.31 9.59H15.41L15.4239 9.59229C15.4806 9.60164 15.5453 9.61228 15.61 9.64ZM18 10.47C14.69 10.47 12 13.16 12 16.47C12 19.78 14.69 22.47 18 22.47C21.31 22.47 24 19.78 24 16.47C24 13.15 21.31 10.47 18 10.47ZM18 20.93C15.53 20.93 13.53 18.93 13.53 16.46C13.53 13.99 15.53 11.99 18 11.99C20.47 11.99 22.47 13.99 22.47 16.46C22.47 18.93 20.47 20.93 18 20.93ZM18.8 16.8V16.82C18.82 17.03 18.72 17.22 18.57 17.34L16.57 18.87C16.38 19.02 16.11 18.98 15.96 18.79C15.84 18.63 15.84 18.41 15.96 18.26L17.3 16.51L17.62 13.23C17.65 13 17.85 12.83 18.08 12.85C18.29 12.87 18.44 13.03 18.46 13.23L18.8 16.8ZM12 3.52V1.22C12 0.88 11.86 0.58 11.64 0.36C11.42 0.14 11.12 0 10.78 0C10.1 0 9.56 0.55 9.56 1.22V3.52C9.56 4.2 10.11 4.74 10.78 4.74C11.45 4.74 12 4.19 12 3.52ZM18.43 1.22V3.52C18.43 4.19 17.89 4.74 17.21 4.74C16.54 4.74 15.99 4.2 15.99 3.52V1.22C16 0.55 16.55 0 17.22 0C17.56 0 17.86 0.14 18.08 0.36C18.3 0.58 18.43 0.88 18.43 1.22ZM3.77 12H5.87C6.18 12 6.43 11.75 6.44 11.43V10.16C6.44 9.84 6.18 9.59 5.87 9.59H3.77C3.45 9.59 3.2 9.85 3.2 10.16V11.43C3.2 11.75 3.46 12 3.77 12ZM10.63 12H8.53C8.22 12 7.96 11.75 7.96 11.43V10.16C7.96 9.85 8.21 9.59 8.53 9.59H10.63C10.94 9.59 11.2 9.84 11.2 10.16V11.43C11.2 11.75 10.95 12 10.63 12ZM5.87 15.17H3.77C3.46 15.17 3.2 14.92 3.2 14.6V13.33C3.2 13.02 3.45 12.76 3.77 12.76H5.87C6.18 12.76 6.44 13.01 6.44 13.33V14.6C6.43 14.91 6.18 15.17 5.87 15.17ZM8.53 15.17H10.63C10.95 15.17 11.2 14.91 11.2 14.6V13.33C11.2 13.01 10.94 12.76 10.63 12.76H8.53C8.21 12.76 7.96 13.02 7.96 13.33V14.6C7.96 14.92 8.22 15.17 8.53 15.17ZM5.87 18.33H3.77C3.46 18.33 3.2 18.08 3.2 17.76V16.5C3.2 16.19 3.45 15.93 3.77 15.93H5.87C6.18 15.93 6.44 16.18 6.44 16.5V17.77C6.43 18.08 6.18 18.33 5.87 18.33ZM8.53 18.33H10.63C10.95 18.33 11.2 18.08 11.2 17.77V16.5C11.2 16.18 10.94 15.93 10.63 15.93H8.53C8.21 15.93 7.96 16.19 7.96 16.5V17.76C7.96 18.08 8.22 18.33 8.53 18.33Z"
                                                                fill="white"
                                                            />
                                                        </svg>

                                                        <span>
                                                            Request for
                                                            Appointment
                                                        </span>
                                                    </button>
                                                    {activePopup && (
                                                        <AppointmentCalendar
                                                            activePopup="activePopup"
                                                            closePopup={() =>
                                                                setActivePopup(
                                                                    '',
                                                                )
                                                            }
                                                        />
                                                    )}

                                                    <div className="view-card-btn">
                                                        <button
                                                            onClick={
                                                                handleSaveContact
                                                            }>
                                                            <svg
                                                                width="24"
                                                                height="20"
                                                                viewBox="0 0 24 20"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    fill-rule="evenodd"
                                                                    clip-rule="evenodd"
                                                                    d="M0 18.3333C0 20 1.5 20 1.5 20H16.5C16.5 20 18 20 18 18.3333C18 16.6667 16.5 11.6667 9 11.6667C1.5 11.6667 0 16.6667 0 18.3333ZM12.182 8.53554C11.3381 9.47322 10.1935 10 9 10C7.80653 10 6.66193 9.47322 5.81802 8.53554C4.97411 7.59786 4.5 6.32609 4.5 5C4.5 3.67392 4.97411 2.40215 5.81802 1.46447C6.66193 0.526785 7.80653 0 9 0C10.1935 0 11.3381 0.526785 12.182 1.46447C13.0259 2.40215 13.5 3.67392 13.5 5C13.5 6.32609 13.0259 7.59786 12.182 8.53554ZM20.7803 5.24408C20.6397 5.0878 20.4489 5 20.25 5C20.0511 5 19.8603 5.0878 19.7197 5.24408C19.579 5.40036 19.5 5.61232 19.5 5.83333V8.33333H17.25C17.0511 8.33333 16.8603 8.42113 16.7197 8.57741C16.579 8.73369 16.5 8.94565 16.5 9.16667C16.5 9.38768 16.579 9.59964 16.7197 9.75592C16.8603 9.9122 17.0511 10 17.25 10H19.5V12.5C19.5 12.721 19.579 12.933 19.7197 13.0893C19.8603 13.2455 20.0511 13.3333 20.25 13.3333C20.4489 13.3333 20.6397 13.2455 20.7803 13.0893C20.921 12.933 21 12.721 21 12.5V10H23.25C23.4489 10 23.6397 9.9122 23.7803 9.75592C23.921 9.59964 24 9.38768 24 9.16667C24 8.94565 23.921 8.73369 23.7803 8.57741C23.6397 8.42113 23.4489 8.33333 23.25 8.33333H21V5.83333C21 5.61232 20.921 5.40036 20.7803 5.24408Z"
                                                                    fill="#fff"
                                                                />
                                                            </svg>

                                                            <span>
                                                                DOWNLOAD VCARD
                                                            </span>
                                                        </button>
                                                    </div>
                                                    <div className="view-card-btn view-card-btn-share">
                                                        <button
                                                            onClick={
                                                                handleShare
                                                            }>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                fill="none">
                                                                <path
                                                                    d="M20.2476 1.50026C19.6509 1.50026 19.0787 1.73728 18.6568 2.15918C18.2349 2.58108 17.9979 3.15329 17.9979 3.74995C17.9979 4.3466 18.2349 4.91882 18.6568 5.34071C19.0787 5.76261 19.6509 5.99963 20.2476 5.99963C20.8442 5.99963 21.4164 5.76261 21.8383 5.34071C22.2602 4.91882 22.4972 4.3466 22.4972 3.74995C22.4972 3.15329 22.2602 2.58108 21.8383 2.15918C21.4164 1.73728 20.8442 1.50026 20.2476 1.50026ZM16.4981 3.74995C16.498 2.87022 16.8072 2.01846 17.3717 1.3437C17.9361 0.668937 18.7199 0.214136 19.5858 0.0588685C20.4517 -0.0963994 21.3447 0.057753 22.1084 0.494355C22.8721 0.930958 23.458 1.62221 23.7636 2.44717C24.0692 3.27212 24.0749 4.17826 23.7799 5.00703C23.4848 5.8358 22.9077 6.53444 22.1496 6.98071C21.3915 7.42698 20.5006 7.59246 19.6327 7.4482C18.7649 7.30395 17.9754 6.85914 17.4025 6.1916L7.32687 10.8709C7.5585 11.605 7.5585 12.3926 7.32687 13.1266L17.4025 17.806C18.0081 17.1016 18.8538 16.6471 19.7754 16.5306C20.6971 16.4142 21.6292 16.644 22.391 17.1756C23.1529 17.7072 23.6903 18.5027 23.899 19.4079C24.1078 20.3132 23.9731 21.2637 23.521 22.0752C23.0689 22.8868 22.3316 23.5016 21.452 23.8006C20.5724 24.0995 19.6132 24.0613 18.7602 23.6933C17.9072 23.3253 17.2212 22.6537 16.8351 21.8087C16.449 20.9637 16.3904 20.0055 16.6706 19.1198L6.59497 14.4404C6.0962 15.0217 5.43136 15.4363 4.68991 15.6284C3.94845 15.8205 3.16595 15.7809 2.44766 15.515C1.72937 15.2491 1.10976 14.7695 0.672165 14.1409C0.234573 13.5123 0 12.7647 0 11.9988C0 11.2329 0.234573 10.4853 0.672165 9.85666C1.10976 9.22803 1.72937 8.7485 2.44766 8.48256C3.16595 8.21663 3.94845 8.17706 4.68991 8.36917C5.43136 8.56128 6.0962 8.97586 6.59497 9.55713L16.6706 4.87779C16.5559 4.51284 16.4977 4.13249 16.4981 3.74995ZM3.74987 9.7491C3.15322 9.7491 2.581 9.98612 2.15911 10.408C1.73721 10.8299 1.50019 11.4021 1.50019 11.9988C1.50019 12.5954 1.73721 13.1677 2.15911 13.5896C2.581 14.0115 3.15322 14.2485 3.74987 14.2485C4.34653 14.2485 4.91874 14.0115 5.34064 13.5896C5.76254 13.1677 5.99956 12.5954 5.99956 11.9988C5.99956 11.4021 5.76254 10.8299 5.34064 10.408C4.91874 9.98612 4.34653 9.7491 3.74987 9.7491ZM20.2476 17.9979C19.6509 17.9979 19.0787 18.235 18.6568 18.6569C18.2349 19.0788 17.9979 19.651 17.9979 20.2476C17.9979 20.8443 18.2349 21.4165 18.6568 21.8384C19.0787 22.2603 19.6509 22.4973 20.2476 22.4973C20.8442 22.4973 21.4164 22.2603 21.8383 21.8384C22.2602 21.4165 22.4972 20.8443 22.4972 20.2476C22.4972 19.651 22.2602 19.0788 21.8383 18.6569C21.4164 18.235 20.8442 17.9979 20.2476 17.9979Z"
                                                                    fill="#FFFFFF"
                                                                />
                                                            </svg>
                                                            <span>
                                                                SHARE THIS PAGE
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="power-by-wid d-flex align-items-center gap-2 justify-content-end">
                                                    <svg
                                                        width="14"
                                                        height="14"
                                                        viewBox="0 0 20 20"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M9.5 18L14.36 8.27H11V2L6 11.73H9.5V18ZM10 0C12.75 0 15.1 1 17.05 2.95C19 4.9 20 7.25 20 10C20 12.75 19 15.1 17.05 17.05C15.1 19 12.75 20 10 20C7.25 20 4.9 19 2.95 17.05C1 15.1 0 12.75 0 10C0 7.25 1 4.9 2.95 2.95C4.9 1 7.25 0 10 0Z"
                                                            fill="#FF0000"
                                                        />
                                                    </svg>

                                                    <p>
                                                        Powered by Women In
                                                        Digital
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    ) : (
                        <p>No information found</p>
                    )}
                </div>
            )}
        </>
    )
}

Information.getInitialProps = async context => {
    try {
        const { slug } = context.query
        const baseuri = process.env.NEXT_PUBLIC_BACKEND_URL

        const response = await axios.get(`${baseuri}/api/information/${slug}`)
        const information = response.data
        return { information }
    } catch (error) {
        console.error('Error fetching data:', error)
        return { information: null }
    }
}

export default Information
