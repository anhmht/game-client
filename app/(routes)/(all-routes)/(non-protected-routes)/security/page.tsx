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
                                        <h2>{translate("Security").toUpperCase()}</h2>
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
                                                        {translate("Security")}
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
                                            <h3>Bảo Mật</h3>
                                            Tại BEZON, chúng tôi luôn nghiêm túc trong việc đảm bảo an ninh cho trò chơi trực tuyến của bạn. 
                                            Nền tảng của chúng tôi kết hợp công nghệ blockchain và cho phép bạn sử dụng tiền mặt thông thường cũng như tiền điện tử.
                                            Để đảm bảo bạn an toàn, chúng tôi đảm bảo chỉ những người dùng được ủy quyền mới được phép truy cập. 
                                            Chúng tôi cũng bảo vệ thông tin cá nhân của bạn bằng cách sử dụng mã hóa.
                                            Công nghệ blockchain của chúng tôi được thiết kế để đảm bảo an toàn và chúng tôi luôn theo dõi để ngăn xảy ra vấn đề gì.
                                            Các giao dịch thanh toán của bạn rất an toàn khi sử dụng dịch vụ của chúng tôi.
                                            Chúng tôi thường xuyên kiểm tra bảo mật và có khả năng xử lý các cuộc tấn công vào trang web của chúng tôi.
                                            Thông tin cá nhân của bạn luôn được bảo mật và chúng tôi tuân theo tất cả các quy định để bảo vệ nó. Chúng tôi luôn theo dõi vấn đề và sẵn sàng để giải quyết.
                                            Đội ngũ của chúng tôi được đào tạo để đảm bảo mọi thứ đều an toàn.
                                            Chúng tôi cập nhật hệ thống thường xuyên, hướng dẫn người dùng cách duy trì an toàn và đảm bảo tất cả mọi thứ tuân theo luật pháp.
                                            Chúng tôi cũng đánh giá cao những người giúp chúng tôi phát hiện vấn đề và đảm bảo rằng đối tác của chúng tôi an toàn. 
                                            Bảo mật của bạn luôn là ưu tiên hàng đầu của chúng tôi và chúng tôi luôn không ngừng cải tiến để bảo vệ bạn.
                                            `;
                                            break;
                                        }
                                        case ELocale.KOREAN: {
                                            content = `
                                            <h3>보안</h3>
                                            BEZON에서는 온라인 게임 보안을 진지하게 다룹니다.
                                            저희 플랫폼은 블록체인 기술을 활용하며 일반 화폐와 암호화폐를 사용할 수 있도록 합니다.
                                            여러분을 안전하게 지키기 위해 인가된 사용자만 허용하고 있습니다.
                                            또한 코드를 사용하여 여러분의 정보를 보호하고 있습니다.
                                            블록체인 기술은 안전하며 문제가 발생하지 않도록 주시하고 있습니다.
                                            여러분의 결제는 저희를 통해 매우 안전합니다.
                                            저희는 보안을 자주 테스트하며 웹사이트에 대한 공격을 처리할 수 있습니다.
                                            개인 정보는 개인 정보 보호 정책을 준수하며 비공개로 유지하고 있으며 모든 규정을 준수하여 보호하고 있습니다.
                                            우리는 문제에 대해 항상 주시하고 대응할 준비가 되어 있습니다.
                                            우리 팀은 모든 것을 안전하게 유지할 수 있도록 훈련을 받고 있습니다.
                                            시스템을 업데이트하고 사용자에게 안전한 방법을 가르치며 모든 것이 법률적으로 안전한지 확인합니다. 
                                            또한 문제를 찾아주는 분들에게 보상을 제공하며 파트너가 안전한지 확인합니다. 여러분의 보안은 우리의 최우선 과제이며 여러분을 보호하기 위해 항상 개선하고 있습니다.
                                            `;
                                            break;
                                        }
                                        case ELocale.MYANMAR: {
                                            content = `
                                            <h3>လုံခြုံရေး</h3>
                                            BEZON တွင် ကျွန်ုပ်တို့သည် သင်၏အွန်လိုင်းဂိမ်းလုံခြုံရေးကို အလေးအနက်ထားဆောင်ရွက်ပါသည်။ 
                                            ကျွန်ုပ်တို့၏ပလပ်ဖောင်းသည် blockchain နည်းပညာကိုပေါင်းစပ်ပြီး ပုံမှန်ငွေနှင့် cryptocurrencies ကိုအသုံးပြုခွင့်ပေးသည်။ 
                                            သင့်အား ဘေးကင်းစေရန်အတွက်၊ ခွင့်ပြုထားသော အသုံးပြုသူများသာ ဝင်ရောက်ရန် သေချာစေပါသည်။ 
                                            ကျွန်ုပ်တို့သည် သင့်အချက်အလက်များကို ကုဒ်များသုံးပြီး ကာကွယ်ပါသည်။ 
                                            blockchain နည်းပညာသည် လုံခြုံပြီး ၎င်းနှင့်ပတ်သက်သည့် ပြဿနာတစ်စုံတစ်ရာအတွက် ကျွန်ုပ်တို့ သတိထားပါ။ 
                                            သင့်ငွေပေးချေမှုများသည် ကျွန်ုပ်တို့အတွက် အလွန်လုံခြုံပါသည်။ 
                                            ကျွန်ုပ်တို့သည် ကျွန်ုပ်တို့၏လုံခြုံရေးကို မကြာခဏစမ်းသပ်ပြီး ကျွန်ုပ်တို့၏ဝဘ်ဆိုက်ပေါ်တွင် တိုက်ခိုက်မှုများကို ကိုင်တွယ်ဖြေရှင်းနိုင်ပါသည်။ 
                                            သင့်ကိုယ်ရေးကိုယ်တာအချက်အလက်သည် သီးသန့်ဖြစ်ပြီး ဘေးကင်းစေရန်အတွက် စည်းမျဉ်းအားလုံးကို ကျွန်ုပ်တို့လိုက်နာပါသည်။ 
                                            ကျွန်ုပ်တို့သည် ပြဿနာများကို အမြဲစောင့်ကြည့်နေပြီး ၎င်းတို့ကို ကိုင်တွယ်ဖြေရှင်းရန် အသင့်ရှိပါသည်။ 
                                            ကျွန်ုပ်တို့၏အဖွဲ့သည် အရာအားလုံးကို ဘေးကင်းစေရန် လေ့ကျင့်ထားသည်။ 
                                            ကျွန်ုပ်တို့သည် ကျွန်ုပ်တို့၏စနစ်များကို အပ်ဒိတ်လုပ်ကာ ကျွန်ုပ်တို့၏အသုံးပြုသူများအား ဘေးကင်းစေရန် မည်သို့နေထိုင်ရမည်ကို သင်ကြားပေးပြီး အရာအားလုံးသည် တရားဝင်ကြောင်း သေချာပါစေ။ 
                                            ကျွန်ုပ်တို့အား ပြဿနာရှာရာတွင် ကူညီပေးသူများကိုလည်း ကျွန်ုပ်တို့၏လုပ်ဖော်ကိုင်ဖက်များ လုံခြုံစိတ်ချမှုရှိစေရန် ဆုချပါသည်။ 
                                            သင့်လုံခြုံရေးသည် ကျွန်ုပ်တို့၏ ဦးစားပေးဖြစ်ပြီး သင့်အား ကာကွယ်ရန် ကျွန်ုပ်တို့ အမြဲတမ်း တိုးတက်နေပါသည်။
                                            `;
                                            break;
                                        }
                                        default: {
                                            content =`
                                            <h3>Security</h3>
                                            At BEZON, we take your online gaming security seriously. 
                                            Our platform combines blockchain technology and lets you use regular money and cryptocurrencies. 
                                            To keep you safe, we make sure only authorized users get in. We also protect your information using codes.
                                            The blockchain technology is secure, and we watch out for any problems with it.
                                            Your payments are super safe with us. We test our security often and can handle attacks on our website.
                                            Your personal info is private, and we follow all the rules to keep it safe.
                                            We always keep an eye out for issues and are ready to deal with them. Our team is trained to keep everything safe.
                                            We update our systems, teach our users how to stay safe, and make sure everything is legal.
                                            We also reward those who help us find problems and make sure our partners are secure. Your security is our priority, and we're always improving to protect you.
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