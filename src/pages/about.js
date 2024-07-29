import Footer from '@/components/Layouts/Footer'
import Header from '@/components/Layouts/Header'
import Head from 'next/head'
import React from 'react'

const AboutPage = () => {
  return (
      <>
          <Head>
              <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1.0"
              />
              <meta http-equiv="X-UA-Compatible" content="ie=edge" />
              <title>About Us - Smart Card Generator</title>
              <meta property="og:type" content="website" />
              <meta
                  property="og:url"
                  content="https://smartcardgenerator.net/about"
              />
              <meta
                  property="description"
                  content="At Smart Card Generator, our mission is to provide a user-friendly and innovative solution for creating QR codes that meet the diverse needs of our users. We aim to streamline the QR code generation process, making it accessible to small businesses and large enterprises."
              />
              <meta
                  property="og:description"
                  content="At Smart Card Generator, our mission is to provide a user-friendly and innovative solution for creating QR codes that meet the diverse needs of our users. We aim to streamline the QR code generation process, making it accessible to small businesses and large enterprises."
              />
              <meta
                  property="og:title"
                  content="About Us - Smart Card Generator"
              />
              <meta
                  property="og:image"
                  content="/img/meta_image/about-us.jpg"
              />
              <meta property="image" content="/img/meta_image/about-us.jpg" />
              <meta property="og:site_name" content="Smart Card Generator" />
          </Head>
          <Header />

          <div className="faq-question-wrapper">
              <div className="faq-img">
                  <img src="/img/home/about.svg" alt="" />
              </div>
              <div className="container">
                  <div className="row d-flex align-items-center justify-content-center">
                      <div className="col-md-10">
                          <div className="faq-content-wrapper">
                              <div className="faq-content-item">
                                  <p>
                                      Welcome to Smart Card Generator, your
                                      go-to destination for creating dynamic and
                                      efficient QR codes. We believe in
                                      simplifying the process of generating QR
                                      codes to empower businesses, individuals,
                                      and organizations with versatile and
                                      powerful tools.
                                  </p>
                              </div>
                              <div className="faq-content-item">
                                  <h2>Our Mission </h2>
                                  <p>
                                      At Smart Card Generator, our mission is to
                                      provide a user-friendly and innovative
                                      solution for creating QR codes that meet
                                      the diverse needs of our users. We aim to
                                      streamline the QR code generation process,
                                      making it accessible to small businesses
                                      and large enterprises.
                                  </p>
                              </div>
                              <h1>What Sets Us Apart</h1>
                              <div className="faq-content-item">
                                  <h2>1. User-Friendly Interface:</h2>
                                  <p>
                                      Our platform boasts an intuitive and
                                      easy-to-use interface, ensuring users can
                                      create QR codes effortlessly, whether new
                                      to the concept or seasoned professionals.
                                  </p>
                              </div>
                              <div className="faq-content-item">
                                  <h2>2. Customization Options:</h2>
                                  <p>
                                      Tailor your QR codes to match your brand
                                      identity. Our customization features allow
                                      you to choose colors, add logos, and
                                      design QR codes that seamlessly integrate
                                      into your marketing materials.
                                  </p>
                              </div>
                              <div className="faq-content-item">
                                  <h2>3. Real-Time Analytics:</h2>
                                  <p>
                                      Gain insights into the performance of your
                                      QR codes with our real-time analytics.
                                      Track scans and monitor engagement to
                                      refine your strategies based on
                                      data-driven decisions.
                                  </p>
                              </div>
                              <div className="faq-content-item">
                                  <h2>
                                      Our Commitment to Privacy and Security
                                  </h2>
                                  <p>
                                      We prioritize the privacy and security of
                                      your data. Rest assured that your
                                      information is handled with the utmost
                                      care when you use Smart Card Generator. We
                                      adhere to industry best practices and
                                      employ robust security measures to protect
                                      your data.
                                  </p>
                              </div>
                              <div className="faq-content-item">
                                  <h2>Join Us on the Smart Card Journey</h2>
                                  <p>
                                      Whether you're a business looking to
                                      enhance your marketing strategy, an event
                                      organizer aiming to simplify check-ins, or
                                      an individual wanting to share information
                                      seamlessly, Smart Card Generator is here
                                      for you. Join us on the smart journey and
                                      experience the convenience and power of
                                      efficient information sharing.
                                  </p>
                              </div>
                              <div className="faq-content-item">
                                  <h2>Contact Us</h2>
                                  <p>
                                      Have questions, suggestions, or just want
                                      to say hello? Reach out to us at
                                      info@womenindigital.net. We value your
                                      feedback and will assist you on your Smart
                                      Card Generator adventure.
                                  </p>
                                  <br />
                                  <p>
                                      Thank you for choosing the Smart Card
                                      Generator!
                                  </p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <Footer />
      </>
  )
}

export default AboutPage