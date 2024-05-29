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
                                        <h2>{translate("BECOME A COACH")}</h2>
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
                                                        {translate("Become A Coach")}
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
            <section className="about-us">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div style={{padding: '48px 0', whiteSpace: 'pre-line'}} className="paragraph-content">
                                {(() => {
                                    let content;
                                    switch (CookieService.get(ECookieVariable.USER_LOCALE)) {
                                        case ELocale.VIETNAM: {
                                            content = `
                                                <h3>Trở thành một HLV</h3>
                                                Bạn có phải là một game thủ đam mê với kỹ năng để chia sẻ không? 
                                                Hãy tham gia vào đội ngũ HLV chuyên nghiệp của chúng tôi và giúp các game thủ trẻ tham vọng đạt được tiềm năng tối đa của họ. 
                                                Là một HLV Bezon Gaming, bạn sẽ có cơ hội hướng dẫn, hỗ trợ và đào tạo game thủ ở mọi cấp độ. 
                                                Cho dù bạn xuất sắc trong các trò chơi chiến thuật, bắn súng góc nhìn thứ nhất, hay esports, kiến thức và chuyên môn của bạn có thể tạo ra sự khác biệt. 
                                                Hãy tham gia cùng chúng tôi ngay hôm nay và trở thành một phần của cộng đồng HLV Bezon Gaming.                                            
                                            `;
                                            break;
                                        }
                                        case ELocale.KOREAN: {
                                            content = `
                                                <h3>코치가 되어보세요</h3>
                                                열정적인 게이머이며 공유할 기술이 있으신가요? 
                                                우리의 전문 코치 팀에 합류하고 향후 게이머들이 최대한의 잠재력을 발휘할 수 있도록 도와주세요. 
                                                Bezon Gaming 코치로서 여러분은 모든 레벨의 게이머를 안내, 멘토링하고 훈련할 기회를 가질 것입니다. 
                                                전략 게임, 일인칭 슈팅 게임 또는 이스포츠에서 뛰어나든, 여러분의 지식과 전문성은 차이를 만들 수 있습니다. 
                                                오늘 우리에 합류하고 Bezon Gaming 코칭 커뮤니티의 일원이 되어보세요.                                            
                                            `;
                                            break;
                                        }
                                        default: {
                                            content =`
                                                <h3>Become a Coach</h3>
                                                Are you a passionate gamer with skills to share? 
                                                Join our team of expert coaches and help aspiring gamers reach their full potential. 
                                                As a Bezon Gaming Coach, you'll have the opportunity to guide, mentor, and train gamers of all levels. 
                                                Whether you excel in strategy games, first-person shooters, or esports, your knowledge and expertise can make a difference. 
                                                Join us today and become a part of the Bezon Gaming coaching community.                                            
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