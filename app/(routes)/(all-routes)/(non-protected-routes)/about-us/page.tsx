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
                                        <h2>{translate("ABOUT US")}</h2>
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
                                                        {translate("About Us")}
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
                                                <h3>Về chúng tôi</h3>

                                                Tại Bezon, chúng tôi đang có nhiệm vụ cách mạng hóa thế giới của trò chơi và cược bằng tiền điện tử. Tầm nhìn của chúng tôi là tạo ra cửa hàng một điểm tới tối ưu cho các người yêu trò chơi và các người yêu tiền điện tử.
                                                
                                                <span style="font-size:18px;font-weight:600">Tầm nhìn của chúng tôi</span>
                                                Tầm nhìn của Bezon rất rõ ràng: phát triển cửa hàng một điểm hàng đầu cho trò chơi và cược bằng tiền điện tử. Chúng tôi tin vào sức mạnh của công nghệ blockchain và tiền điện tử để biến cách mọi người tương tác với các nền tảng trò chơi và cược.
                                                
                                                <span style="font-size:18px;font-weight:600">Nhiệm vụ của chúng tôi</span>
                                                Nhiệm vụ của chúng tôi là cung cấp cho cộng đồng tiền điện tử một giải pháp trò chơi và cược vượt trội so với các nhà cái truyền thống sử dụng tiền tệ. Chúng tôi cam kết tạo ra một nền tảng không chỉ công bằng, an toàn và hiệu quả về chi phí hơn, mà còn đầy đủ cách thú vị mà bạn chưa bao giờ trải nghiệm trước đây.
                                                
                                                Chúng tôi mời bạn tham gia cùng chúng tôi trong hành trình thú vị này khi chúng tôi tái định hình ngành công nghiệp trò chơi và cược. Bezon không chỉ là một nền tảng; đó là một cộng đồng của các game thủ đam mê, những người yêu tiền điện tử và những người tầm nhìn, họ tin vào một tương lai sáng sủa và đầy phần thưởng hơn cho trò chơi và cược.
                                                
                                                Cảm ơn bạn đã là một phần của gia đình Bezon, và cùng nhau, hãy tạo ra một trải nghiệm trò chơi và cược không giống ai.                                            
                                            `;
                                            break;
                                        }
                                        case ELocale.KOREAN: {
                                            content = `
                                                <h3>회사 소개</h3>

                                                Bezon에서는 암호화폐를 활용하여 게임과 베팅의 세계를 혁신하는 미션을 수행하고 있습니다. 우리의 비전은 게임 애호가와 암호화폐 애호가 모두에게 완벽한 원스톱 쇼핑 체험을 만드는 것입니다.
                                                
                                                <span style="font-size:18px;font-weight:600">우리의 비전</span>
                                                Bezon의 비전은 명확합니다. 암호화폐를 활용한 게임과 베팅의 선도적인 원스톱 쇼핑을 개발하는 것입니다. 우리는 블록체인 기술과 암호화폐의 힘을 믿고 있으며 이를 통해 사람들이 게임과 베팅 플랫폼과 상호작용하는 방식을 변화시킬 수 있다고 믿습니다.
                                                
                                                <span style="font-size:18px;font-weight:600">우리의 미션</span>
                                                우리의 미션은 암호화폐 커뮤니티에게 전통적인 통화 스포츠북을 모든 면에서 능가하는 게임과 베팅 솔루션을 제공하는 것입니다. 우리는 공정하며 안전하며 비용 효율적인 플랫폼을 만드는 것뿐만 아니라 이전에 경험하지 못한 방식으로 보상하는 것을 약속하고 있습니다.
                                                
                                                게임과 베팅 산업을 형태를 바꾸는 이 재미있는 여정에 참여하실 것을 초대합니다. Bezon은 단순히 플랫폼이 아닌 열정적인 게이머, 암호화폐 애호가, 비전을 가진 이들의 커뮤니티입니다. 이들은 게임과 베팅에 대한 더 밝고 보상적인 미래를 믿고 있습니다.
                                                
                                                Bezon 패밀리의 일원이 되어 주셔서 감사합니다. 함께 하여 게임과 베팅 경험을 다른 어떤 것과도 다른 것으로 만들어 봅시다.                                            
                                            `;
                                            break;
                                        }
                                        case ELocale.MYANMAR: {
                                            content = `
                                                <h3>ကြှနျုပျတို့အကွောငျး</h3>

                                                Bezon တွင်၊ ကျွန်ုပ်တို့သည် cryptocurrency ဖြင့် ဂိမ်းကစားခြင်းနှင့် လောင်းကစားလောကကို တော်လှန်ရန် ရည်မှန်းချက်ရှိနေသည်။ ကျွန်ုပ်တို့၏မျှော်မှန်းချက်မှာ ဂိမ်းဝါသနာအိုးများနှင့် cryptocurrency ဝါသနာရှင်များအတွက် အဆုံးစွန်သော တစ်ခုတည်းသောစတိုးဆိုင်ကို ဖန်တီးရန်ဖြစ်သည်။

                                                <span style="font-size:18px;font-weight:600">ကျွန်ုပ်တို့၏အမြင်</span>
                                                Bezon ၏ မျှော်မှန်းချက်သည် ရှင်းနေသည်- cryptocurrency ဖြင့် ဂိမ်းကစားခြင်းနှင့် လောင်းကစားအတွက် ထိပ်တန်း တစ်နေရာတည်းတွင် အရောင်းဆိုင်ကို ဖွံ့ဖြိုးတိုးတက်စေရန်။ လူများသည် ဂိမ်းကစားခြင်းနှင့် လောင်းကစားပလက်ဖောင်းများနှင့် ထိတွေ့ဆက်ဆံပုံကို ပြောင်းလဲရန် blockchain နည်းပညာနှင့် cryptocurrencies ၏ စွမ်းအားကို ကျွန်ုပ်တို့ယုံကြည်ပါသည်။

                                                <span style="font-size:18px;font-weight:600">ကျွန်ုပ်တို့၏သာသနာ</span>
                                                ကျွန်ုပ်တို့၏ရည်ရွယ်ချက်မှာ ရိုးရာငွေကြေးအားကစားစာအုပ်များကို နည်းလမ်းပေါင်းစုံဖြင့် သာလွန်သော ဂိမ်းနှင့်လောင်းကစားဖြေရှင်းချက်တစ်ခုဖြင့် cryptocurrency အသိုင်းအဝိုင်းကို ပံ့ပိုးပေးရန်ဖြစ်သည်။ ပိုမိုတရားမျှတ၊ လုံခြုံပြီး ကုန်ကျစရိတ်သက်သာရုံသာမက သင်တစ်ခါမှမကြုံဖူးသော နည်းလမ်းများဖြင့်လည်း ဆုလာဘ်များပေးသည့် ပလပ်ဖောင်းတစ်ခု ဖန်တီးရန် ကျွန်ုပ်တို့ကတိပြုပါသည်။

                                                ကျွန်ုပ်တို့သည် ဂိမ်းနှင့် လောင်းကစားလုပ်ငန်းကို ပြန်လည်ပုံဖော်ရာတွင် စိတ်လှုပ်ရှားစရာကောင်းသော ခရီးတွင် ကျွန်ုပ်တို့နှင့် ပူးပေါင်းရန် သင့်အား ဖိတ်ခေါ်အပ်ပါသည်။ Bezon သည် ပလပ်ဖောင်းတစ်ခုမျှသာ မဟုတ်ပါ။ ၎င်းသည် ဂိမ်းကစားခြင်းနှင့် လောင်းကစားအတွက် ပိုမိုတောက်ပပြီး အကျိုးရှိသော အနာဂတ်ကို ယုံကြည်သော စိတ်အားထက်သန်သော ဂိမ်းကစားသူများ၊ cryptocurrency ဝါသနာအိုးများနှင့် အမြော်အမြင်ရှိသူများ၏ အသိုင်းအဝိုင်းတစ်ခုဖြစ်သည်။

                                                Bezon မိသားစု၏ တစ်စိတ်တစ်ပိုင်းဖြစ်သည့်အတွက် ကျေးဇူးတင်ပါသည်၊ ဂိမ်းကစားခြင်းနှင့် လောင်းကစားခြင်းအတွေ့အကြုံကို အတူတကွ ဖန်တီးကြပါစို့။                                          
                                            `;
                                            break;
                                        }
                                        default: {
                                            content = `
                                                <h3>About Us</h3>

                                                At Bezon, we are on a mission to revolutionize the world of gaming and betting with cryptocurrency. Our vision is to create the ultimate one-stop shop for gaming enthusiasts and cryptocurrency enthusiasts alike.
                
                                                <span style="font-size:18px;font-weight:600">Our Vision</span>
                                                Bezon's vision is clear: to develop the leading one-stop shop for gaming and betting with cryptocurrency. We believe in the power of blockchain technology and cryptocurrencies to transform the way people engage with gaming and betting platforms.
                
                                                <span style="font-size:18px;font-weight:600">Our Mission</span>
                                                Our mission is to provide the cryptocurrency community with a gaming and betting solution that surpasses traditional currency sportsbooks in every way. We are committed to creating a platform that is not only fairer, safer, and more cost-effective but also rewarding in ways you've never experienced before.
                
                                                We invite you to join us on this exciting journey as we reshape the gaming and betting industry. Bezon is not just a platform; it's a community of passionate gamers, cryptocurrency enthusiasts, and visionaries who believe in a brighter and more rewarding future for gaming and betting.
                
                                                Thank you for being a part of the Bezon family, and together, let's create a gaming and betting experience like no other.
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