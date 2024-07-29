// pages/appointment.js

import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import React, { useState } from 'react'
import InputError from '@/components/InputError'
import { useAuth } from '@/hooks/auth'
import axios from 'axios'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { format, setHours, setMinutes, addMinutes } from 'date-fns'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Popup from '@/components/Popup/Popup'

function AppointmentCalendar({ activePopup, closePopup }) {
    const baseuri = process.env.NEXT_PUBLIC_BACKEND_URL
    const { user } = useAuth({ middleware: 'auth' })
    const router = useRouter()
    // Appointment
    const [selectedDate, setSelectedDate] = useState(null)
    const [timeSlots, setTimeSlots] = useState([])
    const [selectedTimeSlots, setSelectedTimeSlots] = useState([])

    const generateTimeSlots = date => {
        const slots = []
        let startTime = setHours(setMinutes(date, 0), 9) // 9:00 AM
        const endTime = setHours(setMinutes(date, 0), 20) // 8:00 PM

        while (startTime < endTime) {
            const endTimeSlot = addMinutes(startTime, 30)
            slots.push(
                `${format(startTime, 'hh:mm a')} - ${format(
                    endTimeSlot,
                    'hh:mm a',
                )}`,
            )
            startTime = endTimeSlot
        }

        setTimeSlots(slots)
    }

    const handleDateChange = date => {
        setSelectedDate(date)
        generateTimeSlots(date)
    }

    const handleTimeSlotChange = slot => {
        setSelectedTimeSlots(prevSelectedSlots =>
            prevSelectedSlots.includes(slot)
                ? prevSelectedSlots.filter(s => s !== slot)
                : [...prevSelectedSlots, slot],
        )
    }

    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [errors, setErrors] = useState({
        appointmentName: '',
        email1: '',
    })
    const [loading, setLoading] = useState(false)
    const [inputField, setInputField] = useState({
        appointmentName: '',
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

    // Handle form submission
    const allInfoSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData()
        formData.append('appointment_name', inputField.appointmentName)
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

    const isDateDisabled = date => {
        const today = new Date()
        return date < today.setHours(0, 0, 0, 0)
    }

    return (
        <AppLayout>
            <Head>
                <title>Create Appointment </title>
            </Head>
            {activePopup && (
                <div className="welcome_model">
                    <div className="overlay-4">
                        <div className="popup-model-content">
                            <div
                                className="appointment-close-btn"
                                onClick={closePopup}>
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
                                        fill="white"
                                    />
                                </svg>
                            </div>
                            <div className="form-group-title">
                                <p>Appoinment Calendar</p>
                            </div>
                            <form action="">
                                <div className="popup-model-wrapper-content">
                                    <div
                                        className="information-form appointment-form-content"
                                        id="website">
                                        <div>
                                            <Calendar
                                                onChange={handleDateChange}
                                                value={selectedDate}
                                                tileDisabled={({ date }) =>
                                                    isDateDisabled(date)
                                                }
                                            />
                                            {selectedDate && (
                                                <div className="appointment-time-item">
                                                    <h3>
                                                        {format(
                                                            selectedDate,
                                                            'MMMM dd, yyyy',
                                                        )}
                                                        :
                                                    </h3>
                                                    <ul className="appointment-time">
                                                        {timeSlots.map(
                                                            (slot, index) => (
                                                                <li
                                                                    key={index}
                                                                    className={
                                                                        selectedTimeSlots.includes(
                                                                            slot,
                                                                        )
                                                                            ? 'active'
                                                                            : ''
                                                                    }
                                                                    onClick={() =>
                                                                        handleTimeSlotChange(
                                                                            slot,
                                                                        )
                                                                    }>
                                                                    <input
                                                                        type="checkbox"
                                                                        value={
                                                                            slot
                                                                        }
                                                                        readOnly
                                                                    />
                                                                    {slot}
                                                                </li>
                                                            ),
                                                        )}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                        <div className="appointment-time-item">
                                            <h3>Your Information</h3>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <input
                                                        type="text"
                                                        className="form-control mt-3"
                                                        name="name"
                                                        placeholder="Enter name"
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <input
                                                        type="email"
                                                        className="form-control mt-3"
                                                        name="email"
                                                        placeholder="Enter email"
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <input
                                                        type="phone"
                                                        className="form-control mt-3"
                                                        name="phone"
                                                        placeholder="Enter phone"
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <input
                                                        type="text"
                                                        className="form-control mt-3"
                                                        name="address"
                                                        placeholder="Enter address"
                                                    />
                                                </div>
                                                <div className="col-md-12 ">
                                                    <textarea
                                                        name="description"
                                                        className="form-control mt-3"
                                                        id=""
                                                        cols="30"
                                                        rows="5"
                                                        placeholder="Description"></textarea>
                                                </div>
                                            </div>
                                            <button
                                                type="submit"
                                                className="custom-btn mt-4">
                                                Request for Appointment
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

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
        </AppLayout>
    )
}

export default AppointmentCalendar
