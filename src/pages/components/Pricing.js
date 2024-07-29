import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import Link from 'next/link'

import axios from 'axios'
import Loading from '@/components/Loading' // Import the Loading component

const fetcher = url => fetch(url).then(res => res.json())

function Pricing() {
    const [userLocation, setUserLocation] = useState(null)
    const [countryId, setCountryId] = useState()
    const [countryData, setCountryData] = useState([])
    const [pricingDataState, setPricingDataState] = useState([])
    const [loading, setLoading] = useState(true) // Add loading state
    const baseUri = process.env.NEXT_PUBLIC_BACKEND_URL

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const ipResponse = await fetch(
                    'https://api64.ipify.org?format=json',
                )
                const ipData = await ipResponse.json()

                const locationResponse = await fetch(
                    `https://ipapi.co/${ipData.ip}/json/`,
                )
                const locationData = await locationResponse.json()

                setUserLocation({
                    city: locationData.city,
                    region: locationData.region,
                    country: locationData.country_name,
                    latitude: locationData.latitude,
                    longitude: locationData.longitude,
                })
            } catch (error) {
                console.error('Error fetching location data:', error)
            }
        }

        fetchLocation()
    }, [])

    useEffect(() => {
        if (userLocation) {
            setCountryId(userLocation.country)
        }
    }, [userLocation])

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get(`${baseUri}/api/country`)
                setCountryData(response.data)
            } catch (error) {
                console.error('Error fetching countries:', error)
            }
        }

        fetchCountries()
    }, [])

    const { data: fetchedPricingData, error: packagesError } = useSWR(
        `${baseUri}/api/packages/filter?country_name=${
            countryId || 'Afghanistan'
        }`,
        fetcher,
    )

    useEffect(() => {
        if (fetchedPricingData) {
            setPricingDataState(fetchedPricingData)
            setLoading(false)
        }
    }, [fetchedPricingData])

    // console.log('fetchedPricingData', fetchedPricingData)
    if (packagesError) return <div>Error fetching data</div>

    return (
        <div>
            {loading ? ( // Show loading spinner while data is being fetched
                <Loading />
            ) : (
                countryId && (
                    <div className="pricing-card-wrapper">
                        <Swiper
                            slidesPerView={4}
                            spaceBetween={25}
                            breakpoints={{
                                320: { slidesPerView: 1 },
                                480: { slidesPerView: 2.2 },
                                768: { slidesPerView: 3 },
                                1200: { slidesPerView: 4 },
                            }}
                            className="mySwiper">
                            {pricingDataState.length > 0 ? (
                                pricingDataState.map((item, id) => (
                                    <SwiperSlide key={id}>
                                        <div className="pricing-chard-item">
                                            <div className="pricing-card-list">
                                                <h3>{item.name}</h3>
                                            </div>
                                            <div className="pricing-card-list price">
                                                <h3>
                                                    <span>TK</span>
                                                    {item.price}
                                                </h3>
                                                <p>1 Month</p>
                                            </div>
                                            <div className="pricing-card-list-qr">
                                                <ul>
                                                    <li>
                                                        <p>Dynamic QR Code</p>
                                                        <p className="pricing-count">
                                                            {item.qr_qt}
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <p>Scan</p>
                                                        <p className="pricing-count">
                                                            {item.scan_limit}
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <p>Website QR</p>
                                                        <p className="pricing-count">
                                                            {
                                                                item.website_qr_limit
                                                            }
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <p>Ecommerce </p>
                                                        <p className="pricing-count">
                                                            {item.card}
                                                        </p>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="pricing-description">
                                                <Link
                                                    href={`/package/[id]`}
                                                    as={`/package/${item.id}`}>
                                                    <a
                                                        href=""
                                                        className="custom-btn">
                                                        Add to Cart
                                                    </a>
                                                </Link>
                                                <p
                                                    className="pricing-des"
                                                    dangerouslySetInnerHTML={{
                                                        __html: item.description,
                                                    }}
                                                />
                                            </div>
                                            {item.qr_most_text && (
                                                <div className="most-popular-label">
                                                    {item.qr_most_text}
                                                </div>
                                            )}
                                        </div>
                                    </SwiperSlide>
                                ))
                            ) : (
                                <Loading />
                            )}
                        </Swiper>
                    </div>
                )
            )}
        </div>
    )
}

export default Pricing
