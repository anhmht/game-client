"use client"
import { translate } from "@/src/languages";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      <section className="banner-section inner-banner coach contact">
        <div className="overlay">
          <div className="banner-content">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 col-md-10">
                  <div className="main-content">
                    <h2>{translate('CONTACT US')}</h2>
                    <div className="breadcrumb-area">
                      <nav aria-label="breadcrumb">
                        <ol className="breadcrumb d-flex align-items-center">
                          <li className="breadcrumb-item">
                            <Link href="/">{translate('Home')}</Link>
                          </li>
                          <li className="breadcrumb-item">
                            <Link href="#">{translate('Pages')}</Link>
                          </li>
                          <li className="breadcrumb-item active" aria-current="page">
                            {translate('Contact Us')}
                          </li>
                        </ol>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Banner Section end --> */}

      {/* <!-- Contact Info start --> */}
      <section className="contact-info">
        <div className="overlay pb-120">
          <div className="container">
            <div className="row cus-mar">
              <div className="col-lg-4 col-md-6">
                <div className="single-info">
                  <div className="icon-area">
                    <img src="/images/icon/headphones.png" alt="icon" />
                  </div>
                  <h5>{translate('HELP & SUPPORT')}</h5>
                  <p>cs@bezon.bet</p>
                  <span onClick={() => window.open('https://t.me/SpBezon', '_blank')}>https://t.me/@SpBezon</span>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="single-info">
                  <div className="icon-area">
                    <img src="/images/icon/sales.png" alt="icon" />
                  </div>
                  <h5>{translate('SALES')}</h5>
                  <p>cs@bezon.bet</p>
                  <span onClick={() => window.open('https://t.me/SpBezon', '_blank')}>https://t.me/@SpBezon</span>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="single-info">
                  <div className="icon-area">
                    <img src="/images/icon/press.png" alt="icon" />
                  </div>
                  <h5>{translate('PRESS')}</h5>
                  <p>cs@bezon.bet</p>
                  <span onClick={() => window.open('https://t.me/SpBezon', '_blank')}>https://t.me/@SpBezon</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Contact Info end --> */}

      {/* <!-- Contact start --> */}
      <section className="contact-section">
        <div className="overlay pb-60">
          <div className="container wow fadeInUp">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <section className="faqs-section contact">
                  <div className="overlay">
                    <div className="container pt-120 pb-120">
                      <div className="row d-flex justify-content-center">
                        <div className="col-12">
                          <div className="section-header text-center">
                            <h5 className="sub-title">{translate('YOU HAVE A QUESTIONS')}</h5>
                            <h2 className="title">{translate('WE HAVE ANSWERS')}</h2>
                            <p>{translate('If you haven’t found your answer to your questions, Contact Us')}</p>
                          </div>
                        </div>
                      </div>
                      <div className="row cus-mar justify-content-center">
                        <div className="col-11">
                          <div className="accordion" id="accordionFaqs">
                            <div className="accordion-item">
                              <h6 className="accordion-header" id="headingLeftOne">
                                <button
                                  className="accordion-button collapsed"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#collapseLeftOne"
                                  aria-expanded="false"
                                  aria-controls="collapseLeftOne"
                                >
                                  {translate('Who can offer or sell services on the Marketplace')}?
                                </button>
                              </h6>
                              <div
                                id="collapseLeftOne"
                                className="accordion-collapse collapse"
                                aria-labelledby="headingLeftOne"
                                data-bs-parent="#accordionFaqs"
                              >
                                <div className="accordion-body">
                                  <p style={{whiteSpace: 'pre-line'}}>
                                    {translate('Only certified Coaches can offer their services on the Bezon Gaming Marketplace.\r\nOur Marketplace is a platform dedicated to connecting gamers with experienced coaches who can help them improve their skills and achieve their gaming goals')}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="accordion-item">
                              <h6 className="accordion-header" id="headingLeftTwo">
                                <button
                                  className="accordion-button collapsed"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#collapseLeftTwo"
                                  aria-expanded="false"
                                  aria-controls="collapseLeftTwo"
                                >
                                  {translate('How do I choose a good price for my Coach')}?
                                </button>
                              </h6>
                              <div
                                id="collapseLeftTwo"
                                className="accordion-collapse collapse"
                                aria-labelledby="headingLeftTwo"
                                data-bs-parent="#accordionFaqs"
                              >
                                <div className="accordion-body">
                                  <p style={{whiteSpace: 'pre-line'}}>
                                    {translate('When choosing a price, consider factors such as your experience, gaming specialization, and the market demand for your coaching')}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="accordion-item">
                              <h6 className="accordion-header" id="headingLeftThree">
                                <button
                                  className="accordion-button collapsed"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#collapseLeftThree"
                                  aria-expanded="false"
                                  aria-controls="collapseLeftThree"
                                >
                                  {translate('How do I get paid')}?
                                </button>
                              </h6>
                              <div
                                id="collapseLeftThree"
                                className="accordion-collapse collapse"
                                aria-labelledby="headingLeftThree"
                                data-bs-parent="#accordionFaqs"
                              >
                                <div className="accordion-body">
                                  <p style={{whiteSpace: 'pre-line'}}>
                                    {translate('Getting paid for your coaching services on Bezon Gaming is straightforward.\r\nWe offer secure payment options to ensure that Coaches receive their earnings promptly')}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="accordion-item">
                              <h6 className="accordion-header" id="headingLeftFour">
                                <button
                                  className="accordion-button collapsed"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#collapseLeftFour"
                                  aria-expanded="false"
                                  aria-controls="collapseLeftFour"
                                >
                                  {translate('How much can I earn on BEZON')}?
                                </button>
                              </h6>
                              <div
                                id="collapseLeftFour"
                                className="accordion-collapse collapse"
                                aria-labelledby="headingLeftFour"
                                data-bs-parent="#accordionFaqs"
                              >
                                <div className="accordion-body">
                                  <p style={{whiteSpace: 'pre-line'}}>
                                    {translate('Earnings as a Bezon Gaming Coach can vary depending on several factors, including your level of expertise, the demand for your coaching services, and the number of clients you work with.\r\nSome Coaches on Bezon Gaming earn a substantial income by offering high-quality coaching services, while others may start with more modest earnings as they build their reputation.\r\nThe more dedicated and skilled you are as a Coach, the greater your potential for earning higher income on Bezon Gaming')}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <div className="col-lg-6">
                <div className="row d-flex justify-content-center">
                  <div className="col-11">
                    <div className="section-text">
                      <h5 className="sub-title">{translate('CONTACT')}</h5>
                      <h2 style={{whiteSpace: 'nowrap'}} className="title">{translate('GET IN TOUCH TODAY')}!</h2>
                      <p>{translate(`We'd love to hear from you. Leave us a message using the form.Our team of experts welcome the chance to answer your questions`)}</p>
                    </div>
                    <div className="social">
                      <p style={{justifyContent: 'flex-start'}} className="mdr mb-3">{translate('FOLLOW US ON SOCIAL MEDIA')}</p>
                      <ul className="footer-link d-flex align-items-center">
                        <li>
                          <Link href="https://www.facebook.com/BezonOffical" target="_blank">
                            <i className="fab fa-facebook-f"></i>
                          </Link>
                        </li>
                        <li>
                          <Link href="https://www.instagram.com/bezon_official" target="_blank">
                            <i className="fab fa-instagram"></i>
                          </Link>
                        </li>
                        <li>
                          <Link href="https://twitter.com/Bezon_Official" target="_blank">
                            <i className="fab fa-twitch"></i>
                          </Link>
                        </li>
                        <li>
                          <Link href="https://www.youtube.com/@Bezon_Offical" target="_blank">
                            <i className="fab fa-youtube"></i>
                          </Link>
                        </li>
                        <li>
                          <Link href="https://www.tiktok.com/@bezon_official" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/></svg>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Contact end --> */}
    </>
  );
};

export default page;
