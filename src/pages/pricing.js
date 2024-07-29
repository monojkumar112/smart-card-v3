import AppLayout from '@/components/Layouts/AppLayout';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import React, { useEffect, useState } from 'react';
import Faq from 'react-faq-component';
import useSWR from 'swr';
import { useAuth } from '@/hooks/auth';
import axios from 'axios';
import PricingCard from './components/Pricing';

const Pricing = () => {

    return (
        <>
            <AppLayout>
                <section>
                    <div className="pricing-wrapper">
                        <div className="pricing-header-card">
                            <div className="pricing-card-bg-img">
                                <img src="/img/product/pricing-bg-img.svg" alt="" />
                            </div>
                            <div className="pricing-header">
                                <h1>Plans & <span>Pricing</span></h1>
                                <p>Find a plan that suits your needs</p>
                                {/* <div className="select-pricing-item">
                                    <div className="priching-input mt-3">
                                        <label htmlFor="">Country:</label>
                                        <select
                                            className="form-select form-control w-fit"
                                            aria-label="Default select example"
                                            value={countryId}
                                            onChange={(e) => setCountryId(e.target.value)}
                                        >
                                            <option value="">Please select your country</option>
                                            {countryData.map((bk_country) => (
                                                <option key={bk_country.id} value={bk_country.name}>
                                                    {bk_country.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div> */}
                            </div>
                        </div>

                        <div className="container">
                            <PricingCard />
                        </div>
                    </div>
                </section>
                {/* Pricing FAQ */}
                <section className="faq-pricing-wrapper">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-9">
                                <div className="pricing-faq-header">
                                    <h1>Get in touch</h1>
                                </div>
                                <div className="pricing-faq-content">
                                    <div className="pricing-faq-content-header">
                                        <h4>Questions</h4>
                                        <p>
                                            Find out everything you need to know
                                            about Smart Card Generator here
                                        </p>
                                    </div>
                                    <div className="pricing-faq-content-item">
                                        <Faq
                                            data={data}
                                            styles={styles}
                                            config={config}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </AppLayout>
        </>
    );
};

export default Pricing;

const data = {
    rows: [
        {
            title: 'When is my Plan ready to use?',
            content: `Once you have entered your payment and placed your order, all your Plan’s features are unlocked immediately and you can directly start to create new Smart Card or manage your Free Trial Codes again.`,
        },
        {
            title: 'Is the Smart Card Generator free to use?',
            content:
                'It depends on the plan you choose . Some plans offer basic features for free, while others may have premium plans with additional customization options and features.',
        },
        {
            title: 'Why should I use a Smart Visiting Card with a QR code?',
            content: `A QR code on your smart card enhances accessibility. Others can quickly scan the code with their smartphones, leading them directly to your digital card, eliminating the need for manual data entry.`,
        },
        {
            title: 'Is the generated QR code unique to my Smart Card?',
            content: `Yes, the QR code generated for your smart visiting card is unique to your information. It serves as a quick and secure way for others to access your professional details.`,
        },
    ],
}

const styles = {
    titleTextColor: 'blue',
    rowTitleColor: 'blue',
};

const config = {};
