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
                                        <h2>{translate("Coach Demo").toUpperCase()}</h2>
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
                                                        {translate("Coach Demo")}
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
                                            Bạn có muốn nâng cao kỹ năng chơi game, cải thiện chiến lược hoặc chỉ đơn giản muốn có nhiều niềm vui hơn khi chơi trò chơi yêu thích của bạn không? BEZON vô cùng phấn khích khi giới thiệu tính năng Coach Demo của chúng tôi, được thiết kế để giúp bạn nâng cao trình độ chơi game.

                                            <span style="font-size:18px;font-weight:600">Coach Demo là gì?</span>

                                            Coach Demo của chúng tôi là một công cụ độc đáo nhằm hỗ trợ người chơi tinh chỉnh khả năng chơi game của họ. Dù bạn là người mới tinh hoặc là một game thủ có kinh nghiệm, tính năng này cung cấp cho bạn các mẹo và hướng dẫn cá nhân về cách xuất sắc trong các trò chơi mà bạn yêu thích.

                                            <span style="font-size:18px;font-weight:600">Cách truy cập Coach Demo:</span>

                                            1.	Đăng nhập: Đăng nhập vào tài khoản BEZON của bạn.
                                            2.	Chọn một trò chơi: Chọn một trò chơi mà bạn muốn cải thiện.
                                            3.	Tùy chọn Coach Demo: Tìm tùy chọn Coach Demo trong giao diện của trò chơi và nhấn để bắt đầu buổi học cùng HLV.

                                            <span style="font-size:18px;font-weight:600">Khám phá Tiềm Năng Chơi Game của Bạn</span>

                                            Dù bạn muốn trở thành bậc thầy trong trò chơi yêu thích của mình hoặc khám phá những cơ hội mới trong thế giới chơi game, Coach Demo của BEZON sẵn sàng giúp bạn trong hành trình của mình. Đây là người hướng dẫn chơi game cá nhân của bạn, luôn sẵn sàng khi bạn cần.

                                            <span style="font-size:18px;font-weight:600">Hãy Đón Chờ Nhiều Hơn Nữa</span>

                                            Coach Demo chỉ là một trong số nhiều tính năng thú vị mà chúng tôi cung cấp tại BEZON. Chúng tôi luôn không ngừng làm việc để cải thiện trải nghiệm chơi game của bạn, vì vậy hãy theo dõi để biết thêm về các công cụ đổi mới và cơ hội để nâng cao kỹ năng của bạn.

                                            Sẵn sàng bắt đầu chưa? Đăng nhập vào tài khoản BEZON của bạn và bắt đầu hành trình trở thành một game thủ chuyên nghiệp với Coach Demo của chúng tôi.
                                            `;
                                            break;
                                        }
                                        case ELocale.KOREAN: {
                                            content = `
                                            <span style="font-size:18px;font-weight:600">BEZON 코치 데모를 경험하세요</span>

                                            귀하는 게임 스킬을 향상시키거나 전략을 개선하거나 좋아하는 게임을 더 즐기고 싶나요? BEZON은 게임 플레이어들이 레벨 업할 수 있도록 도와주기 위해 개발한 코치 데모 기능을 소개하게 되어 기쁩니다.

                                            <span style="font-size:18px;font-weight:600">코치 데모란?</span>

                                            우리의 코치 데모는 게임 능력을 향상시키는 데 도움을 주기 위해 고안된 독특한 도구입니다. 초보자든 숙련된 게이머든, 이 기능은 선택한 게임에서 어떻게 더 뛰어날 수 있는지에 대한 맞춤형 팁과 지침을 제공합니다.

                                            <span style="font-size:18px;font-weight:600">코치 데모 액세스 방법:</span>

                                            1.	로그인: BEZON 계정에 로그인합니다.
                                            2.	게임 선택: 향상시키고 싶은 게임을 선택합니다.
                                            3.	코치 데모 옵션: 게임 인터페이스 내에서 코치 데모 옵션을 찾아 클릭하여 코칭 세션을 시작합니다. 

                                            <span style="font-size:18px;font-weight:600">게임 잠재력 발휘하기</span>

                                            좋아하는 게임을 마스터하려고 하거나 게임 세계에서 새로운 경험을 하고자 하는 경우 BEZON 코치 데모는 여러분이 필요할 때 언제든 사용 가능한 개인적인 게임 멘토입니다.

                                            <span style="font-size:18px;font-weight:600">더 많은 소식을 기다려보세요</span>

                                            우리의 코치 데모는 BEZON에서 제공하는 다양한 흥미로운 기능 중 하나일 뿐입니다. 우리는 게임 경험을 향상시키는 방법을 지속적으로 개발하고 있으므로 더 많은 혁신적인 도구와 스킬 향상 기회를 기대해주세요.
                                            `;
                                            break;
                                        }
                                        default: {
                                            content =`
                                            <span style="font-size:18px;font-weight:600">Experience the BEZON Coach Demo</span>

                                            Are you looking to enhance your gaming skills, improve your strategy, or just have more fun while playing your favorite games? BEZON is excited to introduce our Coach Demo feature, designed to help you level up your gameplay.

                                            <span style="font-size:18px;font-weight:600">What is the Coach Demo?</span>

                                            Our Coach Demo is a unique tool aimed at assisting players in refining their gaming abilities. Whether you're a novice or a seasoned gamer, this feature provides you with personalized tips and guidance on how to excel in your chosen games.

                                            <span style="font-size:18px;font-weight:600">How to Access the Coach Demo:</span>

                                            1. Login: Log in to your BEZON account.

                                            2. Select a Game: Choose a game you'd like to improve in.

                                            3. Coach Demo Option: Look for the Coach Demo option within the game interface and click to start your coaching session.

                                            <span style="font-size:18px;font-weight:600">Unleash Your Gaming Potential</span>

                                            Whether you're looking to master your favorite game or explore new horizons in the gaming world, the BEZON Coach Demo is here to help you on your journey. It's your personal gaming mentor, available whenever you need it.

                                            <span style="font-size:18px;font-weight:600">Stay Tuned for More</span>

                                            Our Coach Demo is just one of the many exciting features we offer at BEZON. We're continually working on ways to enhance your gaming experience, so stay tuned for more innovative tools and opportunities to take your skills to the next level.

                                            Ready to get started? Log in to your BEZON account and embark on your journey to becoming a gaming pro with our Coach Demo.
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