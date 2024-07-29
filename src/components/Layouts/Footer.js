import Link from 'next/link'
import React from 'react'

function Footer() {
    return (
        <div>
            <footer className="py-6 footer">
                <div className="container">
                    <div className="footer-content-wrapper">
                        <div className="footer-logo">
                            <img src="/img/logo.png" alt="" />
                        </div>
                        <div className="footer-menu">
                            <ul>
                                <li>
                                    <Link href="/about">About Us</Link>
                                </li>
                                <li>
                                    <Link href="/contact-us">Contact Us</Link>
                                </li>
                                <li>
                                    <Link href="/faq-question">FAQ</Link>
                                </li>
                                <li>
                                    <Link href="/terms-of-services">
                                        Terms & Conditions
                                    </Link>
                                </li>

                                <li>
                                    <Link href="/privacy-policy">
                                        Privacy Policy
                                    </Link>
                                </li>

                                <li>
                                    <Link href="/refound-policy">
                                        Cancellation & Refound Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/cookie-policy">
                                        Cookie Policy
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <p>© 2023 All Rights Reserved</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer
