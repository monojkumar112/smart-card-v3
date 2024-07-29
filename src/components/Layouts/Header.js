import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/auth'
const Header = () => {
    const { user, logout } = useAuth({ middleware: 'guest' })

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
        <>
            <header className={`${sticky ? 'is-sticky' : ''} menu-nav `}>
                <div className="container">
                    <div className="home-header">
                        <div className="logo">
                            <Link href={'/'}>
                                <a>
                                    <img src="/img/logo.png" alt="" />
                                </a>
                            </Link>
                        </div>

                        <div className="menu">

                            <ul>
                                {user ? (
                                    user.email_verified_at ? (
                                        <>
                                            <li className="custom-btn">
                                                <Link href="/dashboard">Dashboard</Link>
                                            </li>

                                        </>
                                    ) : (
                                        <>
                                            <li className="custom-btn">
                                                <button onClick={logout}>Logout</button>
                                            </li>
                                        </>
                                    )
                                ) : (
                                    <>
                                        <li className="custom-btn">
                                            <Link href="/login">Login</Link>
                                        </li>
                                        <li className="custom-btn">
                                            <Link href="/register">Register</Link>
                                        </li>
                                    </>
                                )}

                            </ul>
                        </div>
                    </div>
                </div>
            </header>
            {/* <header>
              <div className="container">
                  <div className="home-header">
                      <div className="logo">
                          <Link href={'/'}>
                              <a>
                                  <img src="img/logo.png" alt="" />
                              </a>
                          </Link>
                      </div>

                      <div className="menu">
                          <ul>
                              {user ? (
                                  <li className="custom-btn">
                                      <Link href="/dashboard">Dashboard</Link>
                                  </li>
                              ) : (
                                  <>
                                      <li className="custom-btn">
                                          <Link href={'/login'}>Login</Link>
                                      </li>
                                      <li className="custom-btn">
                                          <Link href={'/register'}>
                                              Register
                                          </Link>
                                      </li>
                                  </>
                              )}
                          </ul>
                      </div>
                  </div>
              </div>
          </header> */}
        </>
    )
}

export default Header