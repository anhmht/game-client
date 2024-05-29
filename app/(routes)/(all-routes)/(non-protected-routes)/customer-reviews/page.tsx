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
                                        <h2>{translate("Customer Reviews").toUpperCase()}</h2>
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
                                                        {translate("Customer Reviews")}
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
                                            Những gì Người chơi của chúng tôi nói về BEZON

                                            Tại BEZON, trải nghiệm của người chơi luôn là trung tâm của mọi hoạt động của chúng tôi. Chúng tôi tự hào về việc cung cấp một loạt các trò chơi đa dạng, các giao dịch trơn tru và một cộng đồng chơi game sôi nổi. Nhưng hãy đừng chỉ tin lời nói của chúng tôi. Hãy đọc những gì một số người chơi của chúng tôi nói về trải nghiệm của họ với BEZON:

                                            John D. (5/5):
                                            "Lựa chọn các trò chơi trên nền tảng ấn tượng, và quá trình chuyển đổi mượt mà giữa tiền tệ fiat và tiền điện tử thực sự là một cách chơi game đột phá đối với tôi. Hệ thống thưởng rất hào phóng và đội ngũ hỗ trợ luôn sẵn sàng giúp đỡ."

                                            Sarah W. (4/5):
                                            "Tôi là người mới tương đối trên BEZON, nhưng tôi đã bị mê hoặc! Nền tảng dễ sử dụng, và tôi yêu thích sự đa dạng của các trò chơi có sẵn. Trải nghiệm trong game rất xuất sắc, và cộng đồng thân thiện. Tôi không thể chờ đợi để khám phá thêm những gì BEZON cung cấp."

                                            Mike S. (5/5):
                                            "BEZON đã làm mới không khí cho tôi như một game thủ. Tùy chọn sử dụng tiền điện tử để thanh toán là một tính năng nổi bật, và nó được xử lý một cách an toàn. Tôi đã rút tiền thắng mà không gặp bất kỳ rắc rối nào, và đội ngũ hỗ trợ khách hàng phản hồi nhanh chóng. Tôi rất nghiên cứu BEZON đối với những người chơi đồng đội."

                                            Linda R. (4/5):
                                            "Tôi đánh giá cao sự công bằng và tính minh bạch mà BEZON cung cấp. Những trò chơi thú vị, và sự cam kết của nền tảng về việc tuân theo quy định làm tôi cảm thấy yên tâm. Đó là một nơi tuyệt vời để thư giãn và có một chút vui vẻ!"

                                            Chia sẻ Trải Nghiệm Của Bạn

                                            Phản hồi của bạn là quan trọng đối với chúng tôi, và chúng tôi mời bạn chia sẻ trải nghiệm BEZON của riêng bạn. Dù bạn là người chơi lâu năm hay chỉ mới bắt đầu, đánh giá và bình luận của bạn giúp chúng tôi cải thiện và định hình tương lai của nền tảng của chúng tôi. Tham gia cùng cộng đồng của chúng tôi, khám phá các trò chơi của chúng tôi và cho chúng tôi biết bạn nghĩ gì!

                                            Cảm ơn bạn đã trở thành một phần của gia đình BEZON.
                                            `;
                                            break;
                                        }
                                        case ELocale.KOREAN: {
                                            content = `
                                            BEZON 고객들이 BEZON에 대해 어떻게 생각하는지

                                            BEZON에서는 우리 고객들의 경험이 우리의 모든 것 중심입니다. 다양한 게임, 원활한 거래 및 매료되는 게임 커뮤니티를 제공하는 데 자부심을 가집니다. 그런데 우리 말만 듣지 마세요. BEZON과의 경험에 대해 몇몇 고객이 무엇을 말하고 있는지 확인해보세요:

                                            John D. (5/5):
                                            "이 플랫폼의 게임 선택은 인상적이며 피아트와 암호화폐 거래 간의 원활한 전환이 나에게 큰 변화를 주었습니다. 보상 시스템은 관대하며 지원 팀은 항상 도와주는 곳입니다."

                                            Sarah W. (4/5):
                                            "BEZON에는 비교적 새로운 플레이어입니다만 이미 중독되었습니다! 플랫폼은 사용자 친화적이며 다양한 게임 종류를 사랑합니다. 게임 내 경험은 최고이며 커뮤니티는 친절합니다. BEZON이 제공하는 더 많은 것을 탐험할 기대가 큽니다."

                                            Mike S. (5/5):
                                            "BEZON은 게이머로서 나에게 상쾌한 바람이었습니다. 암호화폐를 사용할 수 있는 옵션은 두드러진 기능이며 안전하게 처리됩니다. 내 이긴 돈을 수월하게 현금화했으며 고객 지원팀은 민감하게 대응합니다. BEZON을 동료 게이머에게 강력히 추천합니다."

                                            Linda R. (4/5):
                                            "BEZON이 제공하는 공정성과 투명성을 평가합니다. 게임은 재미있으며 플랫폼이 규정을 준수하는 것은 안심감을 줍니다. 이곳은 휴식을 취하고 즐기기에 훌륭한 장소입니다!"

                                            경험을 공유하세요

                                            당신의 피드백은 우리에게 중요하며, BEZON 경험을 공유하도록 초대합니다. 오래된 플레이어이든 막 시작한 플레이어이든, 리뷰와 의견은 우리가 플랫폼의 미래를 개선하고 형성하는 데 도움이 됩니다. 우리의 커뮤니티에 참여하고 게임을 탐험하며 당신의 생각을 알려주세요!

                                            BEZON 패밀리의 일원이 되어 주셔서 감사합니다.
                                            `;
                                            break;
                                        }
                                        default: {
                                            content =`
                                            What Our Players Are Saying About BEZON

                                            At BEZON, our players' experiences are at the heart of everything we do. We take pride in providing a diverse range of games, seamless transactions, and an engaging gaming community. But don't just take our word for it. Read what some of our players have to say about their experiences with BEZON:

                                            John D. (5/5):
                                            "The platform's selection of games is impressive, and the seamless transition between fiat and cryptocurrency transactions is a game-changer for me. The rewards system is generous, and the support team is always there to help."

                                            Sarah W. (4/5):
                                            "I'm relatively new to BEZON, but I'm already hooked! The platform is user-friendly, and I love the variety of games available. The in-game experience is top-notch, and the community is friendly. I can't wait to explore more of what BEZON has to offer."

                                            Mike S. (5/5):
                                            "BEZON has been a breath of fresh air for me as a gamer. The option to use cryptocurrency for payments is a standout feature, and it's handled securely. I've cashed out my winnings without any hassle, and the customer support team is responsive. I highly recommend BEZON to fellow gamers."

                                            Linda R. (4/5):
                                            "I appreciate the fairness and transparency that BEZON offers. The games are entertaining, and the platform's commitment to adhering to regulations is reassuring. It's a great place to unwind and have some fun!"

                                            Share Your Experience

                                            Your feedback is essential to us, and we invite you to share your own BEZON experience. Whether you're a long-time player or just getting started, your reviews and comments help us improve and shape the future of our platform. Join our community, explore our games, and let us know what you think!

                                            Thank you for being a part of the BEZON family.
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