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
                                        <h2>{translate("How It Works").toUpperCase()}</h2>
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
                                                        {translate("How It Works")}
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
                                            BEZON là một nền tảng chơi game trực tuyến cho phép người dùng đăng ký và lựa chọn từ một loạt các trò chơi đa dạng. 
                                            Bạn có thể chơi game bằng cả tiền tệ fiat truyền thống hoặc tiền điện tử như Bitcoin và Ethereum. 
                                            Khi bạn chơi, bạn có thể kiếm được tiền ảo và phần thưởng, có thể rút hoặc chuyển thành tiền mặt. 
                                            Nền tảng đảm bảo tính bảo mật cho các giao dịch của bạn và cung cấp hỗ trợ khách hàng. 
                                            Nó được thiết kế để đảm bảo chơi công bằng, tuân thủ các quy định về chơi game và tạo dựng một cộng đồng. 
                                            BEZON có thể truy cập thông qua ứng dụng di động, và công ty liên tục nỗ lực để cải thiện và mở rộng sự đề nghị của mình.
                                            `;
                                            break;
                                        }
                                        case ELocale.KOREAN: {
                                            content = `
                                            BEZON은 사용자가 등록하고 다양한 게임 중에서 선택할 수 있는 온라인 게임 플랫폼입니다. 
                                            전통적인 피아트 화폐 또는 비트코인 및 이더리움과 같은 암호화폐를 사용하여 게임을 할 수 있습니다. 
                                            게임을 하는 동안 가상 화폐와 보상을 획득할 수 있으며 이를 인출하거나 현금으로 교환할 수 있습니다. 
                                            이 플랫폼은 거래의 안전성을 보장하며 고객 지원을 제공합니다. 
                                            게임 규정을 준수하고 커뮤니티를 육성하기 위해 공정한 게임을 지향하고 있습니다. 
                                            BEZON은 모바일 앱을 통해 접근할 수 있으며 회사는 지속적으로 그 서비스를 개선하고 확장하고 있습니다.
                                            `;
                                            break;
                                        }
                                        default: {
                                            content =`
                                            BEZON is an online gaming platform that lets users register and choose from a wide variety of games. 
                                            You can play games using either traditional fiat money or cryptocurrencies like Bitcoin and Ethereum. 
                                            As you play, you earn virtual currency and rewards, which can be withdrawn or cashed out. 
                                            The platform ensures security for your transactions and offers customer support. 
                                            It's designed for fair play, adhering to gaming regulations and fostering a community. 
                                            BEZON can be accessed through a mobile app, and the company is continually working on improving and expanding its offerings.
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