// Import necessary modules
import AppLayout from '@/components/Layouts/AppLayout';
import { useRouter } from 'next/router';
import Link from 'next/link'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/hooks/auth'

// Define the PackageDetails component
function PackageDetails({ qrData }) {
    const router = useRouter();

    const [currentStep, setCurrentStep] = useState(1)
    const [countryData, setCountryData] = useState([]);
    const [countryId, setCountryId] = useState();
    const [userLocation, setUserLocation] = useState(null);
    const baseUri = process.env.NEXT_PUBLIC_BACKEND_URL;
    const [paymentStatus, setPaymentStatus] = useState('');
    const { user } = useAuth({ middleware: 'auth' })
    const userId = user?.id
    const nextStep = () => {
        setCurrentStep(currentStep + 1)
    }

    const prevStep = () => {
        setCurrentStep(currentStep - 1)
    }

    const [orderCard, setOrderCard] = useState(1)

    const handleOrderCard = index => {
        setOrderCard(index)
    }

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get(`${baseUri}/api/country`);
                setCountryData(response.data);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
    }, []);

    //price calculate
    const [orderValidity, setOrderValidity] = useState('1')
    const totalPrice = qrData.price * orderValidity;
    const vatTotalPrice = totalPrice * 0.15;
    const subTotalPrice = totalPrice + vatTotalPrice;

    // Add Axios interceptor to set CORS headers
    axios.interceptors.request.use(function (config) {
        config.headers['Access-Control-Allow-Origin'] = '*';
        config.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
        config.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
        return config;
    });

    const [inputField, setInputField] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        district: '',
        zip: '',
    })


    const inputsHandler = e => {
        e.persist()
        setInputField({
            ...inputField,
            [e.target.name]: e.target.value,
        })
    }
    const [selectedValue, setSelectedValue] = useState('')

    // Function to handle select box changes
    const handleSelectChange = event => {
        setSelectedValue(event.target.value)
    }








    const handlePayment = async () => {

        const formData = new FormData()
        formData.append('amount', subTotalPrice)
        formData.append('user_id', userId)
        formData.append('package_id', qrData.id)
        formData.append('end_date', orderValidity)
        formData.append('name', inputField.name)
        formData.append('email', inputField.email)
        formData.append('country', selectedValue)
        formData.append('address', inputField.address)
        formData.append('city', inputField.city)
        formData.append('district', inputField.district)
        formData.append('phone', inputField.phone)
        formData.append('zip', inputField.zip)
        try {
            const response = await axios.post(`${baseUri}/api/make-payment`, formData);

            const paymentUrl = response.data.payment_url;
            window.open(paymentUrl);

        } catch (error) {
            console.error('Error making payment:', error);
            // Handle the error appropriately
        }
    };

    // Check if qrData is undefined or null
    if (!qrData) {
        // Handle the case when qrData is not available
        return (
            <AppLayout>
                <div>Loading...</div>
            </AppLayout>
        );
    }
    // Render the package details
    return (
        <>
            <AppLayout>

                <div className="business-cart">
                    <div className="business-wrapper">

                        {currentStep === 1 && (
                            <>
                                <form onSubmit={nextStep}>
                                    <div className="business-cart-item">
                                        <div className="shopping-cart-con">
                                            <div className="shopping-cart-header">
                                                <h2 className="shopping-cart-title">
                                                    Order Summary
                                                </h2>
                                            </div>
                                            <div className="row mt-4">

                                                <div className="col-md-12 mx-auto">
                                                    <div className="order-play-price-item">
                                                        <div className="col-12 px-0">
                                                            <label htmlFor="order_validity">Package Time</label>
                                                            <select
                                                                name="order_validity"
                                                                className='form-control'
                                                                value={orderValidity}
                                                                onChange={(e) => setOrderValidity(e.target.value)}
                                                                id="order_validity"
                                                                required
                                                            >
                                                                <option value="1" selected>1 Month</option>
                                                                <option value="3">3 Months</option>
                                                                <option value="6">6 Months</option>
                                                                <option value="12">1 Year</option>
                                                                <option value="24">2 Years</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    {/* <div className="order-play-price-item">
                                                    <p>Professional Plan</p>
                                                    <p>Yearly</p>
                                                </div> */}
                                                    <div className="order-play-price-item">
                                                        <p>Sub Total</p>
                                                        <p>৳ {totalPrice}</p>
                                                    </div>
                                                    <div className="order-play-price-item">
                                                        <p>Tax</p>
                                                        <p>৳ {vatTotalPrice}</p>
                                                    </div>
                                                    <div className="order-play-price-item order-play-price-total">
                                                        <p>Total</p>
                                                        <p>৳ {subTotalPrice}</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-12 mt-4">
                                                    <div className="d-flex algin-items-center gap-5">
                                                        <img
                                                            src="/img/icons/check-1.svg"
                                                            alt=""
                                                        />
                                                        <p>
                                                            Your selected Plan will
                                                            be ready to use
                                                            immediately.
                                                        </p>
                                                    </div>
                                                    <div className="d-flex algin-items-center gap-5">
                                                        <img
                                                            src="/img/icons/check-1.svg"
                                                            alt=""
                                                        />
                                                        <p>
                                                            You will receive an
                                                            invoice by email with
                                                            your billing details.
                                                        </p>
                                                    </div>
                                                    <div className="d-flex algin-items-center gap-5">
                                                        <img
                                                            src="/img/icons/check-1.svg"
                                                            alt=""
                                                        />
                                                        <p>
                                                            You can upgrade your
                                                            account at any time.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="business-cart-item">
                                        <div className="shopping-cart-con">
                                            <div className="shopping-cart-header">
                                                <h2 className="shopping-cart-title">
                                                    Billing Details:
                                                </h2>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-md-12 ">

                                                    <div className="delivery-input-item">
                                                        <label htmlFor="">
                                                            Full Name
                                                            <span> *</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            onChange={inputsHandler}
                                                            value={inputField.name}
                                                            name='name'
                                                            placeholder="Full Name" required
                                                        />
                                                    </div>

                                                </div>
                                                <div className="col-md-12">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="delivery-input-item">
                                                                <label htmlFor="">
                                                                    Mobile Number
                                                                    <span> *</span>
                                                                </label>
                                                                <input
                                                                    className="form-control"
                                                                    type="phone"
                                                                    onChange={inputsHandler}
                                                                    value={inputField.phone}
                                                                    name='phone'
                                                                    placeholder="Mobile number" required
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="delivery-input-item">
                                                                <label htmlFor="">
                                                                    Email Adress
                                                                    <span> *</span>
                                                                </label>
                                                                <input
                                                                    className="form-control"
                                                                    type="email"
                                                                    onChange={inputsHandler}
                                                                    value={inputField.email}
                                                                    name='email'
                                                                    placeholder="Email Adress" required
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="delivery-input-item">
                                                        <label htmlFor="">
                                                            Select Your Country
                                                            <span> *</span>
                                                        </label>
                                                        <select
                                                            className="form-select form-control"
                                                            aria-label="Default select example" required
                                                            name="country"
                                                            value={
                                                                selectedValue
                                                            }
                                                            onChange={
                                                                handleSelectChange
                                                            }

                                                        >
                                                            <option value="">Please select your country</option>
                                                            {countryData.map((bk_country) => (
                                                                <option key={bk_country.id} value={bk_country.name}>
                                                                    {bk_country.name}
                                                                </option>
                                                            ))}
                                                        </select>

                                                    </div>
                                                </div>


                                                <div className="col-md-12">
                                                    <div className="delivery-input-item">
                                                        <label htmlFor="">
                                                            District/Town
                                                            <span> *</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            onChange={inputsHandler}
                                                            value={inputField.district}
                                                            name='district'
                                                            placeholder="Enter District/Town" required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="delivery-input-item">
                                                        <label htmlFor="">
                                                            Address <span> *</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            onChange={inputsHandler}
                                                            value={inputField.address}
                                                            name='address'
                                                            placeholder="Address" required
                                                        />
                                                    </div>
                                                </div>


                                                <div className="col-md-12">
                                                    <div className="delivery-input-item">
                                                        <label htmlFor="">
                                                            City <span> *</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            onChange={inputsHandler}
                                                            value={inputField.city}
                                                            name='city' required
                                                            placeholder="City"
                                                        />
                                                    </div>
                                                </div>








                                                <div className="col-md-12">
                                                    <div className="delivery-input-item">
                                                        <label htmlFor="">
                                                            Zip Code
                                                            <span> *</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            onChange={inputsHandler}
                                                            value={inputField.zip}
                                                            name='zip' required
                                                            placeholder="Enter Zip Code"

                                                        />
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                    <button type='submit' className="custom-btn w-100">
                                        <span>

                                            CONTINUE
                                        </span>
                                    </button>
                                </form>

                            </>
                        )}
                        {currentStep === 2 && (
                            <>
                                <div className="business-cart-item ">
                                    <div className="shopping-cart-con ">
                                        <div className="shopping-cart-header">
                                            <h2 className="shopping-cart-title">
                                                Shipping & Billing
                                            </h2>
                                        </div>


                                        <div className="shipping-list-wrapper">
                                            <div className="shipping-list-item">
                                                <div className="shipping-icon">
                                                    <img
                                                        src="/img/icons/location.svg"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="shipping-content-list">
                                                    <p>{inputField.name}</p>
                                                    <p>
                                                        {selectedValue} {inputField.city}, {inputField.district}, {inputField.address}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="shipping-list-item">
                                                <div className="shipping-icon">
                                                    <img
                                                        src="/img/icons/number.svg"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="shipping-content-list">
                                                    <p>{inputField.phone}</p>

                                                </div>
                                            </div>
                                            <div className="shipping-list-item">
                                                <div className="shipping-icon">
                                                    <img
                                                        src="/img/icons/email.svg"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="shipping-content-list">
                                                    <p>
                                                        {inputField.email}
                                                    </p>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="step-btn-item">
                                    {/* Render Previous button if currentStep is greater than 1 */}
                                    {currentStep > 1 && (
                                        <div onClick={prevStep} className="custom-btn">
                                            <span>Previous</span>
                                        </div>
                                    )}
                                    {currentStep < 2 ? (
                                        <div className="custom-btn" disabled>
                                            <button onClick={handlePayment}>Make Payment</button>
                                            {paymentStatus && <p>Payment Status: {paymentStatus}</p>}
                                        </div>
                                    ) : <div className="custom-btn" disabled>
                                        <button onClick={handlePayment}>Make Payment</button>
                                        {paymentStatus && <p>Payment Status: {paymentStatus}</p>}
                                    </div>}
                                </div>

                            </>
                        )}



                    </div>
                </div>
            </AppLayout>
        </>
    );
}

// Fetch data from the server
export async function getServerSideProps(context) {
    const { params } = context;
    const { id } = params;
    const baseuri = process.env.NEXT_PUBLIC_BACKEND_URL;

    try {
        // Fetch data from the API endpoint
        const response = await fetch(`${baseuri}/api/packages/${id}`);

        // Check if the response status is OK
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status}`);
        }

        // Parse the JSON response
        const qrData = await response.json();

        // Return the data as props
        return {
            props: {
                qrData,
            },
        };
    } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error.message);
        return {
            props: {
                qrData: null, // Return null to indicate that data is not available
            },
        };
    }
}

// Export the PackageDetails component
export default PackageDetails;
