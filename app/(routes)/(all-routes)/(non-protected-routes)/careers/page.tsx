"use client";

import { translate } from "@/src/languages";
import { CookieService, ECookieVariable } from "@/src/services";
import { ELocale } from "@/src/types";
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
                                        <h2>{translate("Careers").toUpperCase()}</h2>
                                        <div className="breadcrumb-area">
                                            <nav aria-label="breadcrumb">
                                                <ol className="breadcrumb d-flex align-items-center">
                                                    <li className="breadcrumb-item">
                                                        <Link href="/">{translate("Home")}</Link>
                                                    </li>
                                                    <li className="breadcrumb-item">
                                                        <Link href="#">{translate("Pages")}</Link>
                                                    </li>
                                                    <li
                                                        className="breadcrumb-item active"
                                                        aria-current="page"
                                                    >
                                                        {translate("Careers")}
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

            {/* <!-- Contact start --> */}
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div style={{padding: '48px 0', whiteSpace: 'pre-line'}} className="paragraph-content">
                                {(() => {
                                    let content;
                                    switch (CookieService.get(ECookieVariable.USER_LOCALE)) {
                                        case ELocale.VIETNAM: {
                                            content = `
                                            Tại BEZON, chúng tôi đánh giá cao sự đóng góp của những cá nhân tài năng chia sẻ đam mê của chúng tôi đối với chơi game và đổi mới. 
                                            Mặc dù chúng tôi hiện không tuyển dụng cho bất kỳ vị trí nào vào lúc này, nhưng chúng tôi luôn tìm kiếm những tài năng xuất sắc để tham gia vào đội ngũ của chúng tôi khi có cơ hội.
                                            `;
                                            break;
                                        }
                                        case ELocale.KOREAN: {
                                            content = `
                                            BEZON에서는 게임과 혁신에 대한 열정을 공유하는 재능 있는 개인들의 기여를 중요시합니다. 
                                            현재는 어떤 포지션에 대한 채용 활동을 진행하고 있지는 않지만, 우리는 언제든 특별한 재능이 기회가 찾아왔을 때 우리 팀에 합류할 수 있기를 기다리고 있습니다
                                            `;
                                            break;
                                        }
                                        default: {
                                            content =`
                                            At BEZON, we value the contributions of talented individuals who share our passion for gaming and innovation. 
                                            While we're not actively hiring for any positions at the moment, we're always on the lookout for exceptional talent to join our team when opportunities arise.
                                            `;
                                        }
                                    }
                                    return <div dangerouslySetInnerHTML={{__html: content}}></div>
                                })()}
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