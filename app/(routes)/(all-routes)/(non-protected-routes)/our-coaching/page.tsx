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
                                        <h2>{translate("OUR COACHING")}</h2>
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
                                                        {translate("Our Coaching")}
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
                                                Tại BEZON, chúng tôi cam kết đưa kỹ năng chơi game của bạn lên một tầm cao mới. Dịch vụ HLV của chúng tôi được thiết kế để giúp bạn rèn luyện khả năng của mình, phát triển chiến lược chiến thắng và đạt được tiềm năng chơi game tối đa.

                                                <span style="font-size:18px;font-weight:600">Tại sao nên chọn Dịch vụ HLV của BEZON?</span>
                                                • HLV Chuyên gia: Đội ngũ HLV của chúng tôi bao gồm các game thủ có kinh nghiệm và các chuyên gia xuất sắc trong nhiều thể loại game khác nhau. Họ cam kết chia sẻ kiến thức chuyên môn của họ với bạn.
                                                • Tiếp cận cá nhân hóa: Chúng tôi hiểu rằng mỗi game thủ là duy nhất. Dịch vụ HLV của chúng tôi được tùy chỉnh dựa trên trình độ kỹ năng, phong cách chơi game và mục tiêu của bạn, đảm bảo bạn nhận được sự hướng dẫn phù hợp nhất.
                                                • Hỗ trợ toàn diện: Cho dù bạn muốn nâng cao hiệu suất trong một trò chơi cụ thể, học các chiến thuật mới hoặc đơn giản là muốn trở nên giỏi hơn trong việc chơi game, các HLV của chúng tôi đều sẵn sàng cung cấp hỗ trợ và chiến lược bạn cần.                                            
                                            `;
                                            break;
                                        }
                                        case ELocale.KOREAN: {
                                            content = `
                                                BEZON에서는 여러분의 게임 스킬을 다음 레벨로 끌어올리는 데 전념합니다. 우리의 코칭 서비스는 여러분이 여러분만의 게임 능력을 갖추고 승리하는 전략을 개발하며 최고의 게임 잠재력을 발휘하는 데 도움을 주도록 고안되었습니다.

                                                <span style="font-size:18px;font-weight:600">왜 BEZON 코칭을 선택해야 하나요?</span>
                                                • 전문 코치: 우리의 코칭 팀은 다양한 게임 장르에서 뛰어난 경험을 가진 게이머와 전문가로 구성되어 있습니다. 그들은 여러분과 그들의 전문 지식을 공유하기 위해 헌신적으로 노력합니다.
                                                • 맞춤형 접근: 우리는 각 게이머가 독특하다는 것을 이해합니다. 우리의 코칭은 여러분의 스킬 레벨, 게임 스타일 및 목표에 맞게 맞춤형으로 제공되어 여러분에게 가장 잘 맞는 지도를 받을 수 있도록 합니다.
                                                • 포괄적인 지원: 특정 게임에서 성과를 높이려는지, 새로운 전술을 배우려는지, 또는 게임에서 더 나아지려는지, 우리의 코치들은 여러분이 필요로 하는 지원과 전략을 제공하기 위해 여기에 있습니다.                                            
                                            `;
                                            break;
                                        }
                                        default: {
                                            content =`
                                                At BEZON, we're committed to taking your gaming skills to the next level. Our coaching services are designed to help you hone your abilities, develop winning strategies, and reach your full gaming potential.

                                                <span style="font-size:18px;font-weight:600">Why Choose BEZON Coaching?</span>
                                                • Expert Coaches: Our coaching team comprises seasoned gamers and professionals who excel in a variety of game genres. They're dedicated to sharing their expertise with you.
                                                • Personalized Approach: We understand that each gamer is unique. Our coaching is tailored to your skill level, gaming style, and goals, ensuring that you get the guidance that suits you best.
                                                • Comprehensive Support: Whether you're looking to boost your performance in a specific game, learn new tactics, or simply get better at gaming, our coaches are here to provide the support and strategies you need.
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