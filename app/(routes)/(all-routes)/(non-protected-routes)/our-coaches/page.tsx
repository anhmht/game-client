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
                                        <h2>{translate("Our Coaches").toUpperCase()}</h2>
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
                                                        {translate("Our Coaches")}
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
                                            <h3>Đội HLV của Chúng Tôi</h3>
                                            Bạn là một game thủ đam mê và muốn chia sẻ kỹ năng của mình?
                                            Hãy tham gia vào đội ngũ HLV chuyên nghiệp của chúng tôi tại Bezon Gaming và giúp những game thủ trẻ hoàn thiện tiềm năng của họ.
                                            Là HLV tại Bezon Gaming, bạn sẽ có cơ hội hướng dẫn, hỗ trợ và đào tạo các game thủ ở mọi cấp độ. 
                                            Dù bạn xuất sắc trong các trò chơi chiến thuật, bắn súng góc nhìn người đầu tiên, hoặc esports, kiến thức và chuyên môn của bạn có thể tạo ra sự khác biệt đáng kể.
                                            Hãy tham gia cùng chúng tôi ngay hôm nay và trở thành một phần của cộng đồng HLV Bezon Gaming.
                                            `;
                                            break;
                                        }
                                        case ELocale.KOREAN: {
                                            content = `
                                            <h3>우리의 코치</h3>
                                            귀하께서 게임에 열정적이고 공유할 능력이 있다면, Bezon Gaming의 전문 코치 팀에 가입하여 비상류의 게이머들이 최대한의 잠재력을 발휘하도록 돕는 기회를 제공합니다. 
                                            Bezon Gaming 코치로서, 당신은 모든 스킬 레벨의 게이머들을 지도, 멘토링하고 훈련할 수 있는 기회가 주어집니다.
                                            전략 게임, 일인칭 슈팅 게임 또는 e스포츠 중 어떤 것에서도 뛰어나신다면, 귀하의 지식과 전문성은 차별을 만들 수 있습니다.
                                            지금 바로 참여하여 Bezon Gaming 코칭 커뮤니티의 일원이 되십시오.
                                            `;
                                            break;
                                        }
                                        case ELocale.MYANMAR: {
                                            content = `
                                            <h3>ကျွန်ုပ်တို့၏ နည်းပြများ</h3>
                                            သင်သည် သင်၏အရည်အချင်းများကို မျှဝေရန် စိတ်အားထက်သန်သော ဂိမ်းကစားသူတစ်ဦးလား။
                                            Bezon Gaming တွင်ကျွန်ုပ်တို့၏ကျွမ်းကျင်သောနည်းပြအဖွဲ့နှင့်ပူးပေါင်းကာ ဂိမ်းကစားသူများကို ၎င်းတို့၏စွမ်းရည်အပြည့်အ၀ထုတ်လွှတ်ပေးရန် ကူညီပေးပါ။ 
                                            Bezon Gaming Coach တစ်ဦးအနေဖြင့် သင်သည် ဗျူဟာဂိမ်းများ၊ ပထမလူသေနတ်သမားများ သို့မဟုတ် esports များတွင် ကျွမ်းကျင်သူဖြစ်စေ ဂိမ်းကစားသူများကို ကျွမ်းကျင်မှုအဆင့်အားလုံးတွင် လမ်းညွှန်ရန်၊ လမ်းညွှန်ရန်၊ လေ့ကျင့်ပေးရန် အခွင့်အရေးရမည်ဖြစ်ပါသည်။
                                            သင်၏ အသိပညာနှင့် ကျွမ်းကျင်မှုသည် အမှန်တကယ် ပြောင်းလဲမှုကို ဖြစ်စေနိုင်သည်။
                                            ယနေ့ကျွန်ုပ်တို့နှင့်ပူးပေါင်းပြီး Bezon Gaming နည်းပြအသိုင်းအဝိုင်း၏တစ်စိတ်တစ်ပိုင်းဖြစ်လာပါ။
                                            `;
                                            break;
                                        }
                                        default: {
                                            content =`
                                            <h3>Our Coaches</h3>
                                            Are you a passionate gamer eager to share your skills? 
                                            Join our team of expert coaches at Bezon Gaming and help budding gamers unleash their full potential.
                                            As a Bezon Gaming Coach, you'll have the chance to guide, mentor, and train gamers at all skill levels, whether you're an expert in strategy games, first-person shooters, or esports.
                                            Your knowledge and expertise can truly make a difference.
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