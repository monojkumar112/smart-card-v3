import Head from 'next/head'

const GuestLayout = ({ children }) => {
    return (
        <>
            <div className="font-sans text-gray-900 antialiased login-page">
                {children}
            </div>
        </>
    )
}

export default GuestLayout
