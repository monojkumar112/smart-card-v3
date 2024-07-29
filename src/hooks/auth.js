import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter()
    const fetchCsrfToken = async () => {
        await axios.get('/sanctum/csrf-cookie')
    }
    let loginRequestInProgress = false

    const {
        data: user,
        error,
        mutate,
    } = useSWR('/api/user', () =>
        axios
            .get('/api/user', {
                headers: {
                    Authorization: `Bearer ${fetchCsrfToken}`,
                },
            })
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error

                router.push('/verify-email')
            }),
    )

    // const { data: user, error, mutate } = useSWR('/api/user', () =>
    //     axios

    //         .get('/api/user')
    //         .then(res => res.data)
    //         .catch(error => {
    //             if (error.response.status !== 409) throw error

    //             router.push('/verify-email')
    //         }),
    // )

    const register = async ({ setErrors, ...props }) => {
        await fetchCsrfToken()

        setErrors([])

        axios
            .post('/register', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    // const login = async ({ setErrors, setStatus, ...props }) => {
    //     if (loginRequestInProgress) {
    //         return
    //     }

    //     loginRequestInProgress = true

    //     await fetchCsrfToken()

    //     setErrors([])
    //     setStatus(null)

    //     axios
    //         .post('/login', props)
    //         .then(response => {
    //             if (response.status === 200) {
    //                 // Handle successful login
    //                 mutate()
    //             }
    //             loginRequestInProgress = false
    //         })
    //         .catch(error => {
    //             loginRequestInProgress = false // Reset the flag on error

    //             if (error.response.status === 403) {
    //                 // Handle custom message from the server
    //                 alert(error.response.data.message)
    //             } else if (error.response.status === 422) {
    //                 // Handle validation errors
    //                 setErrors(error.response.data.errors)
    //             } else {
    //                 // Handle other errors
    //                 throw error
    //             }
    //         })
    // }

    const login = async ({ setErrors, setStatus, ...props }) => {
        await fetchCsrfToken()

        setErrors([])
        setStatus(null)

        axios
            .post('/login', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    // const forgotPassword = async ({ setErrors, setStatus, email }) => {
    //     await fetchCsrfToken()

    //     setErrors([])
    //     setStatus(null)

    //     axios
    //         .post('/forgot-password', { email })
    //         .then(response => setStatus(response.data.status))
    //         .catch(error => {
    //             if (error.response.status !== 422) throw error

    //             setErrors(error.response.data.errors)
    //         })
    // }

    const forgotPassword = async ({
        setErrors,
        setStatus,
        setSuccess,
        email,
    }) => {
        try {
            await fetchCsrfToken()

            setErrors([])
            setStatus(null)

            const response = await axios.post('/password/email', { email })

            if (
                response &&
                response.data &&
                response.data.status === 'success'
            ) {
                setSuccess(
                    'Check your email for the password reset instructions.',
                )
            } else if (
                response &&
                response.data &&
                response.data.status === 'error'
            ) {
                // Handle other status codes if needed
                setErrors(['Failed to send reset email. Please try again.'])
            }
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors)
            } else {
                // Handle other errors or simply ignore them
                console.error('An error occurred:', error)
            }
        }
    }

    const resetPassword = async ({ setErrors, setStatus, ...props }) => {
        await fetchCsrfToken()

        setErrors([])
        setStatus(null)

        axios
            .post('/password/reset', { token: router.query.token, ...props })
            .then(response =>
                router.push('/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resendEmailVerification = ({ setStatus }) => {
        axios
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status))
    }

    const logout = async () => {
        if (!error) {
            await axios.post('/logout').then(() => mutate())
        }

        window.location.pathname = '/login'
    }

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user)
            router.push(redirectIfAuthenticated)
        if (
            window.location.pathname === '/verify-email' &&
            user?.email_verified_at
        )
            if (middleware === 'auth' && error)
                // router.push(redirectIfAuthenticated)
                logout()
    }, [user, error])

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    }
}
