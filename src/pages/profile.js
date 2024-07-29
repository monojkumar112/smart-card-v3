import AppLayout from '@/components/Layouts/AppLayout'
import React, { useEffect, useState } from 'react'
import Sidebar from 'components/sidebar'
import { useAuth } from '@/hooks/auth'
import axios from 'axios'

const ProfilePage = () => {
    const baseuri = process.env.NEXT_PUBLIC_BACKEND_URL
    const { user } = useAuth({ middleware: 'auth' })
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        gender: '',
        country: '',
        address: '',
        phone: '',
        country_code: '',
        city: '',
        image: '',
        imageUrl: '',
    })
    const [isPopupVisible, setIsPopupVisible] = useState(false)

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                gender: user.gender || '',
                country: user.country || '',
                address: user.address || '',
                phone: user.phone || '',
                country_code: user.country_code || '',
                city: user.city || '',
                image: '',
                imageUrl: user?.image
                    ? `${baseuri}/${user?.image}`
                    : '/img/icon/profile.svg',
            })
        }
    }, [user])

    const handleChange = e => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleImage = e => {
        const selectedImage = e.target.files[0]

        setFormData(prevState => ({
            ...prevState,
            image: selectedImage,
            imageUrl: URL.createObjectURL(selectedImage),
        }))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const formDataToSend = new FormData()
            for (const key in formData) {
                formDataToSend.append(key, formData[key])
            }
            const response = await axios.post(
                `${baseuri}/api/users/${user?.id}`,
                formDataToSend,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            )
            console.log(response.data)
            setIsPopupVisible(true)
        } catch (error) {
            console.error('Error updating profile:', error)
        }
    }

    const closePopup = () => {
        setIsPopupVisible(false);
        window.location.reload();
    }

    if (!user) {
        return <div>Loading...</div>
    }

    return (
        <>
            <AppLayout>
                <section className="dashboard-page">
                    <div className="container-fluid">
                        <div className="dashboard-wrapper">
                            <Sidebar />
                            <div className="dashboard-content-item">
                                <div className="dashboard-content">
                                    <div className="row align-items-center justify-content-center">
                                        <div className="col-md-10">
                                            <form
                                                onSubmit={handleSubmit}
                                                encType="multipart/form-data">
                                                <div className="profile-wrapper">
                                                    <h1>Update Profile</h1>

                                                    <div className="user-profile mt-4">
                                                        <img
                                                            src={
                                                                formData.imageUrl
                                                            }
                                                            alt={
                                                                formData.name ||
                                                                'Profile'
                                                            }
                                                            className="h-8 w-8 rounded-full"
                                                        />
                                                        <label
                                                            htmlFor="image"
                                                            className="upload-button">
                                                            Upload Image
                                                        </label>
                                                        <input
                                                            type="file"
                                                            id="image"
                                                            name="image"
                                                            onChange={
                                                                handleImage
                                                            }
                                                            className="form-control"
                                                            style={{
                                                                display: 'none',
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="row mt-4">
                                                        <div className="col-md-6">
                                                            <div className="profile-input-item">
                                                                <label htmlFor="name">
                                                                    Name
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    id="name"
                                                                    name="name"
                                                                    value={
                                                                        formData.name
                                                                    }
                                                                    onChange={
                                                                        handleChange
                                                                    }
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="profile-input-item">
                                                                <label htmlFor="email">
                                                                    Email
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    id="email"
                                                                    name="email"
                                                                    value={
                                                                        formData.email
                                                                    }
                                                                    onChange={
                                                                        handleChange
                                                                    }
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="profile-input-item">
                                                                <label htmlFor="gender">
                                                                    Gender
                                                                </label>
                                                                <select
                                                                    name="gender"
                                                                    id="gender"
                                                                    value={
                                                                        formData.gender
                                                                    }
                                                                    onChange={
                                                                        handleChange
                                                                    }
                                                                    className="form-control">
                                                                    <option value="">
                                                                        Select
                                                                        Gender
                                                                    </option>
                                                                    <option value="Male">
                                                                        Male
                                                                    </option>
                                                                    <option value="Female">
                                                                        Female
                                                                    </option>
                                                                    <option value="Other">
                                                                        Other
                                                                    </option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="profile-input-item">
                                                                <label htmlFor="country">
                                                                    Country
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    id="country"
                                                                    name="country"
                                                                    value={
                                                                        formData.country
                                                                    }
                                                                    onChange={
                                                                        handleChange
                                                                    }
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="profile-input-item">
                                                                <label htmlFor="address">
                                                                    Address
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    id="address"
                                                                    name="address"
                                                                    value={
                                                                        formData.address
                                                                    }
                                                                    onChange={
                                                                        handleChange
                                                                    }
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="profile-input-item">
                                                                <label htmlFor="phone">
                                                                    Phone
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    id="phone"
                                                                    name="phone"
                                                                    value={
                                                                        formData.phone
                                                                    }
                                                                    onChange={
                                                                        handleChange
                                                                    }
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="profile-input-item">
                                                                <label htmlFor="country_code">
                                                                    Country Code
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    id="country_code"
                                                                    name="country_code"
                                                                    value={
                                                                        formData.country_code
                                                                    }
                                                                    onChange={
                                                                        handleChange
                                                                    }
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="profile-input-item">
                                                                <label htmlFor="city">
                                                                    City
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    id="city"
                                                                    name="city"
                                                                    value={
                                                                        formData.city
                                                                    }
                                                                    onChange={
                                                                        handleChange
                                                                    }
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button
                                                        type="submit"
                                                        className="upload-button">
                                                        Update Profile
                                                    </button>
                                                </div>
                                            </form>
                                            {isPopupVisible && (
                                                <div className="popup">
                                                    <div className="popup-content">
                                                        <p>
                                                            Profile updated
                                                            successfully!
                                                        </p>
                                                        <button
                                                            onClick={
                                                                closePopup
                                                            }>
                                                            Ok
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </AppLayout>
        </>
    )

}

export default ProfilePage
