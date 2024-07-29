import Navigation from '@/components/Layouts/Navigation'
import { useAuth } from '@/hooks/auth'
import Footer from './Footer'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
const AppLayout = ({ children }) => {
    const { user } = useAuth({ middleware: 'auth' })
    const router = useRouter()
    const isDashboardPage =
        router.pathname === '/dashboard' ||
        router.pathname === '/activecard' ||
        router.pathname === '/pausecard' ||
        router.pathname === '/profile' ||
        router.pathname === '/details/[id]'
    const [sticky, setSticky] = useState(false)
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setSticky(true)
            } else {
                setSticky(false)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])
    return (
        <div className="min-h-screen">
            <div className={`${sticky ? 'is-sticky' : ''} menu-nav `}>
                <header
                    className={`header ${isDashboardPage ? 'container-fluid' : 'container'
                        }`}>
                    <Navigation user={user} />
                </header>
            </div>

            {/* Page Content */}
            <main>{children}</main>
            {/* <Footer /> */}
        </div>
    )
}

export default AppLayout

