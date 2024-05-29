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
                                        <h2>{"FAQ"}</h2>
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
                                                        {"FAQ"}
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
                                                <h3>FAQ</h3>

                                                <span style="font-size:18px;font-weight:600">Ai có thể tham gia?</span>
                                                Khách hàng của Bezon phải từ 18 tuổi trở lên và đồng ý tuân thủ các điều khoản và điều kiện áp dụng.
                                                
                                                <span style="font-size:18px;font-weight:600">Làm cách nào để mở tài khoản với Bezon?</span>
                                                Truy cập vào "ĐĂNG KÝ" trên trang chủ của trang web Bezon và bạn sẽ được chuyển đến trang "Đăng ký".
                                                Hãy điền vào các trường sau đây:
                                                •	Địa chỉ email - Để thông báo cho bạn về bất kỳ thông báo quản lý tài khoản quan trọng nào, thông báo về sản phẩm và thông tin khuyến mãi. Hãy đảm bảo bạn cung cấp một địa chỉ email hợp lệ chỉ có bạn mới có thể truy cập.
                                                •	Tên người dùng - Định danh duy nhất của bạn khi đăng nhập vào tài khoản của bạn
                                                •	Mật khẩu - Mật khẩu phải có ít nhất 8 ký tự, 1 chữ in hoa, 1 chữ thường, 1 số. Bạn có trách nhiệm giữ mật khẩu trực tuyến của mình bí mật.
                                                
                                                <span style="font-size:18px;font-weight:600">Quên mật khẩu?</span>
                                                Để lấy lại mật khẩu, bạn có thể nhấp vào "Quên mật khẩu" và điền vào các chi tiết cụ thể tương ứng. Mật khẩu của bạn sẽ được thiết lập lại và gửi qua email.
                                                
                                                <span style="font-size:18px;font-weight:600">Làm thế nào để rút tiền?</span>
                                                Để rút tiền, hãy vào mục "Rút tiền" và nhập số tiền bạn muốn. Hãy đảm bảo rằng tên tài khoản ngân hàng của bạn phù hợp với tên tài khoản Bezon của bạn.
                                                Khi được phê duyệt, tiền của bạn sẽ được chuyển nhanh chóng vào tài khoản ngân hàng của bạn thông qua việc chuyển khoản ngân hàng địa phương, theo thời gian xử lý cụ thể.
                                                Đối với việc rút tiền tiền điện tử, hãy truy cập trang Ví, mở tùy chọn rút tiền, nhập địa chỉ ví của bạn và số tiền bạn muốn rút. Hãy lưu ý về bất kỳ khoản phí nào. Sau khi xác nhận, tiền tiền điện tử của bạn sẽ được gửi vào ví của bạn.
                                                
                                                <span style="font-size:18px;font-weight:600">Thông tin cá nhân của tôi có an toàn không?</span>
                                                Bezon sẽ không tiết lộ thông tin cá nhân của bạn cho bất kỳ bên thứ ba nào. Chi tiết cá nhân của bạn là bí mật và chúng tôi sẽ đảm bảo rằng chúng luôn được bảo vệ.
                                                
                                                <span style="font-size:18px;font-weight:600">Ý nghĩa của "Ví" trong Bezon là gì?</span>
                                                Tất cả tiền gửi vào Ví chính của bạn, có thể được sử dụng để cược trong các trò chơi, rút tiền hoặc chuyển vào Ví Sản phẩm để tài trợ giao dịch cược.
                                                
                                                <span style="font-size:18px;font-weight:600">Làm cách nào để tham gia?</span>
                                                •	Điều hướng đến "ĐĂNG KÝ" và điền thông tin cá nhân của bạn theo đúng cách.
                                                •	Yêu cầu tiền gửi tối thiểu được yêu cầu. Số tiền tối thiểu là $10 phải được gửi lần đầu từ tài khoản ngân hàng của bạn vào tài khoản ngân hàng của Công ty chúng tôi.
                                                •	Sau khi tiền được gửi, điều hướng đến phần "Nạp tiền" của tài khoản Bezon của bạn và gửi thông báo cho chúng tôi.
                                                •	Số tiền gửi sẽ được thanh toán vào "Ví chính" của bạn.
                                                •	Chuyển tiền từ "Ví chính" của bạn vào "Ví Sản phẩm" được chọn
                                                •	Chúc bạn vui vẻ và may mắn khi chơi trò chơi của bạn!
                                                
                                                <span style="font-size:18px;font-weight:600">Làm cách nào để tôi thực hiện việc nạp tiền?</span>
                                                Đăng nhập vào tài khoản Bezon của bạn và nhấp vào 'Nạp tiền'. Theo dõi tất cả các bước được hiển thị, bao gồm việc chọn tùy chọn ngân hàng/thanh toán ưa thích của bạn.
                                                
                                                <span style="font-size:18px;font-weight:600">Số tiền tối thiểu yêu cầu cho một lần nạp tiền là bao nhiêu?</span>
                                                Số tiền tối thiểu yêu cầu cho mỗi giao dịch nạp tiền là $10.
                                                
                                                <span style="font-size:18px;font-weight:600">Tôi cần cung cấp bất kỳ chứng từ giao dịch nào cho khoản nạp tiền của tôi không?</span>
                                                Nếu khoản nạp tiền không được thực hiện đúng hạn, chúng tôi sẽ xử lý càng sớm càng tốt vào ngày hôm sau. Nếu bạn có bất kỳ câu hỏi, vui lòng tìm sự làm rõ từ bất kỳ một trong số đại diện hỗ trợ khách hàng của chúng tôi, người luôn sẵn sàng hỗ trợ bạn suốt ngày đêm.
                                                
                                                <span style="font-size:18px;font-weight:600">Tôi có thể thực hiện việc nạp tiền thông qua một tài khoản của bên thứ ba không?</span>
                                                Không, tên đã đăng ký trên cả tài khoản Bezon và tài khoản ngân hàng phải khớp nhau.
                                                
                                                <span style="font-size:18px;font-weight:600">Làm cách nào để rút tiền?</span>
                                                Đăng nhập vào tài khoản Bezon của bạn và nhấp vào 'Rút tiền' dưới 'Ví'. Theo dõi tất cả các bước được hiển thị, bao gồm việc chọn tùy chọn ngân hàng ưa thích của bạn.
                                                
                                                <span style="font-size:18px;font-weight:600">Số tiền tối thiểu yêu cầu cho một giao dịch rút tiền là bao nhiêu?</span>
                                                Số tiền tối thiểu yêu cầu cho một giao dịch rút tiền là $10.
                                                
                                                <span style="font-size:18px;font-weight:600">Mất bao lâu để xử lý giao dịch rút tiền của tôi?</span>
                                                Các giao dịch rút tiền lớn có thể mất thời gian để được xử lý. Nếu bạn có bất kỳ câu hỏi nào, hãy tìm sự làm rõ từ bất kỳ một trong số đại diện hỗ trợ khách hàng của chúng tôi.
                                                
                                                <span style="font-size:18px;font-weight:600">Có phí nào cho việc rút tiền không?</span>
                                                Không, không có phí hoặc lệ phí nào được tính cho các giao dịch rút tiền.
                                                
                                                <span style="font-size:18px;font-weight:600">Thông tin giao dịch của tôi có được bảo mật không?</span>
                                                Có, bạn có thể rút tiền trong những trường hợp như vậy, nhưng số tiền rút tiền sẽ dựa trên số tiền trong "Ví chính".
                                                
                                                <span style="font-size:18px;font-weight:600">Tôi có thể rút tiền trước khi tôi hoàn thành cược không?</span>
                                                Có, bạn có thể rút tiền trong trường hợp như vậy, nhưng số tiền rút tiền sẽ dựa trên số tiền trong "Ví chính".
                                                
                                                <span style="font-size:18px;font-weight:600">Tôi có thể rút tiền thông qua tài khoản của bên thứ ba không?</span>
                                                Không, tất cả các giao dịch rút tiền phải thông qua tài khoản ngân hàng đã đăng ký trong hồ sơ Bezon của người dùng. Tên đã đăng ký trên cả tài khoản Bezon và tài khoản ngân hàng phải khớp nhau.                                            
                                            `;
                                            break;
                                        }
                                        case ELocale.KOREAN: {
                                            content = `
                                                <h3>FAQ</h3>

                                                <span style="font-size:18px;font-weight:600">누가 참여할 수 있나요?</span>
                                                Bezon 고객은 최소 18세 이상이어야하며 약관을 준수해야 합니다.
                                                
                                                <span style="font-size:18px;font-weight:600">Bezon과 계정을 어떻게 개설하나요?</span>
                                                Bezon 웹 사이트의 홈페이지에서 "가입"을 클릭하면 "등록" 페이지로 이동됩니다.
                                                다음 필드를 작성해 주십시오:
                                                •	이메일 주소 - 계정 관리 공지, 제품 발표 및 프로모션 정보를 알려 드리기 위해 사용됩니다. 유효한 이메일 주소를 제공하십시오.
                                                •	사용자 이름 - 계정에 로그인할 때 사용되는 고유 식별자
                                                •	비밀번호 - 비밀번호는 최소 8자, 대문자 1자, 소문자 1자, 숫자 1자 이상이어야 합니다. 온라인 비밀번호를 비밀로 유지하는 것은 귀하의 책임입니다.
                                                
                                                <span style="font-size:18px;font-weight:600">비밀번호를 잊어버렸나요?</span>
                                                비밀번호를 검색하려면 "비밀번호를 잊어버렸습니까?"를 클릭하고 관련 세부 정보를 입력하십시오. 비밀번호는 이메일을 통해 재설정되고 보내집니다.
                                                
                                                <span style="font-size:18px;font-weight:600">인출하는 방법은 어떻게 되나요?</span>
                                                돈을 출금하려면 "출금" 섹션으로 이동하고 원하는 금액을 입력하십시오. 은행 계좌 이름이 Bezon 계정 이름과 일치하는지 확인하십시오.
                                                승인되면 귀하의 돈은 특정 처리 시간을 따라 지역 은행 송금을 통해 신속하게 귀하의 은행 계좌로 송금됩니다.
                                                암호화폐 출금을 원하는 경우 지갑 페이지를 방문하고 출금 옵션을 열고 지갑 주소와 출금 원하는 금액을 입력하십시오. 수수료를 주의하십시오. 확인한 후, 암호화폐는 귀하의 지갑으로 송금됩니다.
                                                
                                                <span style="font-size:18px;font-weight:600">내 개인 정보는 안전한가요?</span>
                                                Bezon은 귀하의 개인 정보를 제3자에게 공개하지 않습니다. 귀하의 개인 정보는 기밀이며 언제나 안전하게 보호될 것입니다.
                                                
                                                <span style="font-size:18px;font-weight:600">Bezon에서 "지갑"의 의미는 무엇인가요?</span>
                                                모든 예금은 메인 지갑에 들어가며, 이를 사용하여 게임에 베팅하거나 간단하게 인출하거나 베팅 거래를 자금화할 수 있습니다.
                                                
                                                <span style="font-size:18px;font-weight:600">가입하는 방법은 어떻게 되나요?</span>
                                                •	"가입"으로 이동하고 개인 정보를 입력하십시오.
                                                •	최소 예금은 기준으로 필요합니다. 처음에 은행 계좌에서 최소 $10을 입금해야 합니다.
                                                •	자금을 입금한 후 Bezon 계정의 "입금" 섹션으로 이동하여 알림을 보내십시오.
                                                •	입금한 금액은 "메인 지갑"으로 지급됩니다.
                                                •	"메인 지갑"에서 선택한 "제품 지갑"으로 자금 이체
                                                •	즐겁고 행운을 빕니다!
                                                
                                                <span style="font-size:18px;font-weight:600">어떻게 입금을 할 수 있나요?</span>
                                                Bezon 계정에 로그인하고 '입금'을 클릭하십시오. 선호하는 은행/결제 옵션을 선택하는 등 표시된 모든 단계를 따르십시오.
                                                
                                                <span style="font-size:18px;font-weight:600">입금에 필요한 최소 금액은 얼마인가요?</span>
                                                각 입금 거래에 필요한 최소 금액은 $10입니다.
                                                
                                                <span style="font-size:18px;font-weight:600">입금에 대한 거래 증빙을 제공해야 하나요?</span>
                                                입금이 제 시간에 이루어지지 않으면 가능한 한 다음 날 가공될 것입니다. 문의 사항이 있으면 상시로 도움을 드릴 수 있는 고객 지원 대표에게 문의하십시오.
                                                
                                                <span style="font-size:18px;font-weight:600">제3자 계정을 통해 입금할 수 있나요?</span>
                                                아니요, Bezon 계정과 은행 계좌의 등록된 이름은 일치해야 합니다.
                                                
                                                <span style="font-size:18px;font-weight:600">인출하는 방법은 어떻게 되나요?</span>
                                                Bezon 계정에 로그인하고 '지갑' 아래 '인출'을 클릭하십시오. 선호하는 은행 옵션을 선택하는 등 표시된 모든 단계를 따르십시오.
                                                
                                                <span style="font-size:18px;font-weight:600">인출에 필요한 최소 금액은 얼마인가요?</span>
                                                각 인출 거래에 필요한 최소 금액은 $10입니다.
                                                
                                                <span style="font-size:18px;font-weight:600">인출 처리에 얼마나 걸릴까요?</span>
                                                큰 금액의 인출은 처리하는 데 더 오랜 시간이 걸릴 수 있습니다. 문의 사항이 있으면 고객 지원 대표 중 아무에게나 문의하십시오.
                                                
                                                <span style="font-size:18px;font-weight:600">인출에 대한 수수료가 있나요?</span>
                                                아니요, 인출에 대한 수수료나 요금은 부과되지 않습니다.
                                                
                                                <span style="font-size:18px;font-weight:600">거래 세부 정보는 안전한가요?</span>
                                                네, 이러한 상황에서도 인출이 가능하지만 인출 금액은 "메인 지갑"에 있는 금액을 기반으로 합니다.
                                                
                                                <span style="font-size:18px;font-weight:600">배팅을 마치기 전에 인출할 수 있나요?</span>
                                                네, 이러한 상황에서도 인출이 가능하지만 인출 금액은 "메인 지갑"에 있는 금액을 기반으로 합니다.
                                                
                                                <span style="font-size:18px;font-weight:600">제3자 계정을 통해 인출할 수 있나요?</span>
                                                아니요, 모든 인출은 사용자의 Bezon 프로필에 등록된 은행 계좌를 통해 이루어져야 합니다. Bezon 계정과 은행 계좌의 등.                                                                                       
                                            `;
                                            break;
                                        }
                                        case ELocale.MYANMAR: {
                                            content = `
                                                <h3>အမြဲမေးလေ့ရှိသောမေးခွန်းများ</h3>

                                                <span style="font-size:18px;font-weight:600">ဘယ်သူကစားနိုင်မလဲ။</span>
                                                Bezon သုံးစွဲသူများသည် အနည်းဆုံး အသက် 18 နှစ်နှင့် အထက် ဖြစ်ရမည် ဖြစ်ပြီး ချမှတ်ထားသော စည်းကမ်းသတ်မှတ်ချက်များကို လိုက်နာရန် သဘောတူသည်။

                                                <span style="font-size:18px;font-weight:600">Bezon နဲ့ အကောင့်ဘယ်လိုဖွင့်ရမလဲ။</span>
                                                Bezon ဝဘ်ဆိုဒ်၏ ပင်မစာမျက်နှာရှိ "အကောင့်ဖွင့်ခြင်း" သို့သွား၍ "မှတ်ပုံတင်ခြင်း" စာမျက်နှာသို့ ပို့ဆောင်ပေးမည်ဖြစ်ပါသည်။
                                                အောက်ပါအကွက်များကို ဖြည့်ပါ။
                                                • အီးမေးလ်လိပ်စာ - အရေးကြီးသောအကောင့်စီမံခန့်ခွဲမှုသတိပေးချက်၊ ထုတ်ကုန်ကြေငြာချက်နှင့် ပရိုမိုးရှင်းအချက်အလက်များအကြောင်း သင့်အား သတိပေးရန်။ သင်တစ်ဦးတည်းသာ ဝင်ရောက်နိုင်သော တရားဝင်အီးမေးလ်လိပ်စာတစ်ခု ပေးထားကြောင်း သေချာပါစေ။
                                                • အသုံးပြုသူအမည် - သင့်အကောင့်သို့ လော့ဂ်အင်ဝင်သောအခါတွင် သင်၏ထူးခြားသော အမှတ်အသား
                                                • စကားဝှက် - စကားဝှက်သည် အနည်းဆုံး အက္ခရာ 8 လုံး၊ စာလုံးကြီး 1 လုံး၊ စာလုံးသေး 1 လုံး၊ နံပါတ် 1 လုံး ဖြစ်ရပါမည်။ သင်၏အွန်လိုင်းစကားဝှက်ကို လျှို့ဝှက်ထားရန် သင့်တွင် တာဝန်ရှိပါသည်။

                                                <span style="font-size:18px;font-weight:600">စကားဝှက်ကို မေ့နေပါသလား။</span>
                                                စကားဝှက်ကိုရယူရန်၊ သင်သည် "စကားဝှက်မေ့သွားသည်" ကိုနှိပ်ပြီး အထူးအသေးစိတ်အချက်များအလိုက် ဖြည့်စွက်နိုင်ပါသည်။ သင့်စကားဝှက်ကို ပြန်လည်သတ်မှတ်ပြီး အီးမေးလ်မှတစ်ဆင့် ပေးပို့မည်ဖြစ်သည်။

                                                <span style="font-size:18px;font-weight:600">ဘယ်လိုရုပ်သိမ်းရမလဲ။</span>
                                                ငွေထုတ်ယူရန် "ငွေထုတ်ခြင်း" ကဏ္ဍကိုသွားပြီး သင်လိုချင်သောပမာဏကို ရိုက်ထည့်ပါ။ သင့်ဘဏ်အကောင့်အမည်သည် သင်၏ Bezon အကောင့်အမည်နှင့် ကိုက်ညီကြောင်း သေချာပါစေ။
                                                အတည်ပြုပြီးသည်နှင့်၊ သတ်မှတ်ထားသော လုပ်ဆောင်ချိန်တစ်ခုပြီးနောက်၊ သင့်ငွေများကို ဒေသတွင်းဘဏ်ငွေလွှဲမှုမှတစ်ဆင့် သင့်ဘဏ်အကောင့်သို့ လျင်မြန်စွာ ပေးပို့မည်ဖြစ်ပါသည်။
                                                cryptocurrency ထုတ်ယူမှုအတွက်၊ Wallet စာမျက်နှာသို့သွားရောက်ပါ၊ ငွေထုတ်ခြင်းရွေးချယ်မှုကိုဖွင့်ပါ၊ သင့်ပိုက်ဆံအိတ်လိပ်စာနှင့် သင်ထုတ်ယူလိုသောပမာဏကို ရိုက်ထည့်ပါ။ မည်သည့်အခကြေးငွေကိုမဆိုသတိထားပါ။ အတည်ပြုပြီးနောက်၊ သင်၏ cryptocurrency ကို သင့်ပိုက်ဆံအိတ်သို့ ပို့ပါမည်။

                                                <span style="font-size:18px;font-weight:600">ကျွန်ုပ်၏ကိုယ်ရေးကိုယ်တာအချက်အလက်များ လုံခြုံပါသလား။</span>
                                                Bezon သည် သင်၏ကိုယ်ရေးကိုယ်တာအချက်အလက်များကို မည်သည့်ပြင်ပအဖွဲ့အစည်းကိုမျှ ထုတ်ဖော်မည်မဟုတ်ပါ။ သင့်ကိုယ်ရေးကိုယ်တာအသေးစိတ်အချက်အလက်များကို လျှို့ဝှက်ထားပြီး ကျွန်ုပ်တို့သည် အချိန်တိုင်းလုံခြုံကြောင်း သေချာစေမည်ဖြစ်သည်။

                                                <span style="font-size:18px;font-weight:600">Bezon ရှိ Wallets ၏အဓိပ္ပါယ်ကဘာလဲ ?</span>
                                                လောင်းကြေးငွေအားလုံးသည် ဂိမ်းများပေါ်တွင် လောင်းကစားရန် အသုံးပြုနိုင်ပြီး လောင်းကြေးငွေလွှဲပြောင်းမှုများအတွက် ထုတ်ကုန်ပိုက်ဆံအိတ်သို့ ရိုးရှင်းစွာ ထုတ်ယူရန် သို့မဟုတ် လွှဲပြောင်းနိုင်သည်။

                                                <span style="font-size:18px;font-weight:600">ဘယ်လို Join ရမလဲ။</span>
                                                • "အကောင့်ဖွင့်ပါ" သို့သွား၍ သင်၏ကိုယ်ရေးကိုယ်တာအချက်အလက်များကို လျော်ညီစွာဖြည့်စွက်ပါ။
                                                • အခြေခံစာရင်းအဖြစ် အနည်းဆုံး အပ်ငွေများ လိုအပ်ပါသည်။ အနည်းဆုံး $10 ပမာဏကို သင့်ဘဏ်အကောင့်မှ ကျွန်ုပ်တို့၏ကုမ္ပဏီဘဏ်အကောင့်သို့ ကနဦးပေးသွင်းရပါမည်။
                                                • ရန်ပုံငွေအပ်နှံပြီးနောက်၊ သင်၏ Bezon အကောင့်၏ "အပ်ငွေ" ကဏ္ဍသို့သွားပြီး ကျွန်ုပ်တို့ထံ သတိပေးချက်တစ်စောင်ပေးပို့ပါ။
                                                • အပ်ငွေပမာဏကို သင်၏ "ပင်မပိုက်ဆံအိတ်" သို့ ပေးချေပါမည်။
                                                • သင်၏ "ပင်မပိုက်ဆံအိတ်" မှ ရွေးချယ်ထားသော "ထုတ်ကုန်ပိုက်ဆံအိတ်" သို့ ရန်ပုံငွေလွှဲပြောင်းပါ
                                                • သင့်ဂိမ်းများကို ပျော်ရွှင်စွာ ကစားပြီး ကံကောင်းပါစေ။

                                                <span style="font-size:18px;font-weight:600">အပ်ငွေဘယ်လိုသွင်းရမလဲ။</span>
                                                သင်၏ Bezon အကောင့်သို့ဝင်ရောက်ပြီး 'Deposit' ကိုနှိပ်ပါ။ သင်နှစ်သက်သော ဘဏ်လုပ်ငန်း/ငွေပေးချေမှုရွေးချယ်မှုကို ရွေးချယ်ခြင်းအပါအဝင် ပြထားသည့်အဆင့်အားလုံးကို လိုက်နာပါ။

                                                <span style="font-size:18px;font-weight:600">အပ်ငွေအတွက် အနိမ့်ဆုံးပမာဏက ဘယ်လောက်လဲ။</span>
                                                အပ်ငွေလွှဲပြောင်းမှုတစ်ခုစီအတွက် အနည်းဆုံးလိုအပ်သောပမာဏမှာ $10 ဖြစ်သည်။
                                                
                                                <span style="font-size:18px;font-weight:600">ကျွန်ုပ်၏အပ်ငွေကို အချိန်မီမဆောင်ရွက်နိုင်ပါက မည်သို့ဆောင်ရွက်မည်နည်း။</span>
                                                အချိန်မီမရရှိသော အပ်ငွေများကို နောက်နေ့တွင် အမြန်ဆုံး ဆောင်ရွက်ပေးပါမည်။ သင့်တွင် စုံစမ်းမေးမြန်းမှုများရှိပါက၊ သင့်အား ကူညီပေးရန် နာရီပတ်လုံးရရှိနိုင်သော ကျွန်ုပ်တို့၏ဖောက်သည်ကူညီရေးကိုယ်စားလှယ်ထံမှ ရှင်းလင်းချက်ရယူပါ။

                                                <span style="font-size:18px;font-weight:600">ကျွန်ုပ်သည် ပြင်ပအဖွဲ့အစည်းအကောင့်တစ်ခုမှတစ်ဆင့် ငွေသွင်းနိုင်ပါသလား။</span>
                                                မဟုတ်ပါ၊ Bezon အကောင့်နှင့် ဘဏ်အကောင့်နှစ်ခုလုံးရှိ မှတ်ပုံတင်ထားသော အမည်များသည် တူညီရပါမည်။

                                                <span style="font-size:18px;font-weight:600">ငွေထုတ်နည်း</span>
                                                သင်၏ Bezon အကောင့်သို့ဝင်ရောက်ပြီး 'Wallet' အောက်ရှိ 'ငွေထုတ်ခြင်း' ကိုနှိပ်ပါ။ သင်နှစ်သက်သော ဘဏ်လုပ်ငန်းရွေးချယ်မှုနှင့် cryptocurrency ကိုရွေးချယ်ခြင်းအပါအဝင် ပြထားသည့်အဆင့်အားလုံးကို လိုက်နာပါ။

                                                <span style="font-size:18px;font-weight:600">ငွေထုတ်ခြင်းအတွက် အနိမ့်ဆုံးပမာဏက ဘယ်လိုလဲ။</span>
                                                ထုတ်ယူမှုတစ်ခုစီအတွက် လိုအပ်သော အနည်းဆုံးပမာဏမှာ $10 ဖြစ်သည်။

                                                <span style="font-size:18px;font-weight:600">ကျွန်ုပ်၏ ငွေထုတ်ခြင်းကို လုပ်ဆောင်ရန် အချိန်မည်မျှကြာမည်နည်း။</span>
                                                ကြီးမားသော ထုတ်ယူမှုများကို လုပ်ဆောင်ရန် အချိန်ပိုကြာနိုင်သည်။ သင့်တွင် စုံစမ်းမေးမြန်းမှုများ ရှိပါက ကျွန်ုပ်တို့၏ ဖောက်သည် ပံ့ပိုးကူညီရေး ကိုယ်စားလှယ် များထံမှ ရှင်းလင်းချက် ရယူပါ။

                                                <span style="font-size:18px;font-weight:600">ကျွန်ုပ်၏ ငွေပေးငွေယူအသေးစိတ်အချက်အလက်များ</span>
                                                ဟုတ်ကဲ့၊ ထိုသို့သောအခြေအနေမျိုးတွင် ငွေထုတ်ခြင်းကို ပြုလုပ်နိုင်သော်လည်း ငွေထုတ်သည့်ပမာဏသည် Main Wallet ရှိ ပမာဏပေါ်တွင် အခြေခံမည်ဖြစ်သည်။

                                                <span style="font-size:18px;font-weight:600">လောင်းကြေးမပြီးမီ ငွေထုတ်နိုင်ပါသလား။</span>
                                                ဟုတ်ကဲ့၊ ထိုသို့သောအခြေအနေမျိုးတွင် ငွေထုတ်ခြင်းကို ပြုလုပ်နိုင်သော်လည်း ငွေထုတ်သည့်ပမာဏသည် Main Wallet ရှိ ပမာဏပေါ်တွင် အခြေခံမည်ဖြစ်သည်။

                                                <span style="font-size:18px;font-weight:600">ပြင်ပအဖွဲ့အစည်းအကောင့်ဖြင့် ငွေထုတ်နိုင်ပါသလား။</span>
                                                မဟုတ်ပါ၊ ပြုလုပ်ထားသော ငွေထုတ်များအားလုံးသည် သုံးစွဲသူ၏ Bezon ပရိုဖိုင်တွင် စာရင်းသွင်းထားသော ဘဏ်အကောင့်မှတဆင့် ဖြစ်ရပါမည်။ Bezon အကောင့်နှင့် ဘဏ်အကောင့်နှစ်ခုလုံးရှိ မှတ်ပုံတင်ထားသော အမည်များသည် တူညီရပါမည်။
                                            `;
                                            break;
                                        }
                                        default: {
                                            content =`
                                                <h3>FAQ</h3>

                                                <span style="font-size:18px;font-weight:600">Who can play?</span>
                                                Bezon Customers must be at least 18 years old and above and agree to abide by the terms and conditions imposed.

                                                <span style="font-size:18px;font-weight:600">How to open an account with Bezon?</span>
                                                Go to "SIGN UP" at the home page of Bezon website and you will be brought to the "Registration" page.
                                                Please fill in the following fields :
                                                •	Email address - To alert you of any important account management notice, product announcement and promotion information. Please ensure that you provide a valid email address that is only accessible by you.
                                                •	Username - Your unique identifier when logging into your account
                                                •	Password - Password must be minimum 8 characters, 1 upper case, 1 lower case, 1 number. You are responsible to keep your online password confidential.
                                                
                                                <span style="font-size:18px;font-weight:600">Forget password?</span>
                                                To retrieve password, you can click on "Forgot Password" and fill in particular details accordingly. Your password will be reset and send via email.
                                                
                                                <span style="font-size:18px;font-weight:600">How to withdraw?</span>
                                                To withdraw money, go to the "Withdrawal" section and enter the amount you want. Make sure your bank account name matches your Bezon account name.
                                                Once approved, your money will be sent to your bank account quickly through a local bank transfer, following a specific processing time.
                                                For cryptocurrency withdrawals, visit the Wallet page, open the withdrawal option, enter your wallet address and the amount you want to withdraw. Be aware of any fees. After confirming, your cryptocurrency will be sent to your wallet.
                                                
                                                <span style="font-size:18px;font-weight:600">Is my personal information secure?</span>
                                                Bezon will not disclose your personal information to any third party. Your personal details are confidential and we will ensure that there are secured all the time.
                                                
                                                <span style="font-size:18px;font-weight:600">What is the meaning of Wallets in Bezon?</span>
                                                All deposit go in your Main wallet, which can be used to bet on games, simply withdraw or transfer to Product Wallet to fund betting transactions.
                                                
                                                <span style="font-size:18px;font-weight:600">How to Join?</span>
                                                •	Go to "SIGN UP" and fill in your personal information accordingly.
                                                •	Minimum deposits are required as a baseline. The smallest amount of $10 must initially deposit from your banking account to our Company's bank account.
                                                •	After the fund being deposited, go to "Deposit" section of your Bezon account and send a notice to us.
                                                •	The amount deposited will be paid out to your "Main Wallet".
                                                •	Transfer fund from your "Main Wallet" to selected "Product Wallet"
                                                •	Have fun and good luck playing your games !
                                                
                                                <span style="font-size:18px;font-weight:600">How to I make a deposit?</span>
                                                Login to your Bezon account and click on ‘Deposit’. Follow all the steps shown, including selecting your preferred banking/payment option. 
                                                
                                                <span style="font-size:18px;font-weight:600">What is the minimum amount required for a deposit?</span>
                                                The minimum amount required for each deposit transaction is $10.

                                                <span style="font-size:18px;font-weight:600">What if my deposit is not made on time?</span>
                                                Any deposits that are not made on time will be processed as soon as possible the next day. If you have any enquiries, kindly seek clarification from any of our customer support representatives who are available round the clock to assist you.
                                                
                                                <span style="font-size:18px;font-weight:600">Can I make a deposit through a third party account?</span>
                                                No, the registered names on both the Bezon account and bank account must match.
                                                
                                                <span style="font-size:18px;font-weight:600">How to Withdrawal</span>
                                                Login to your Bezon account and click on ‘Withdrawal’ under ‘Wallet’. Follow all the steps shown, including selecting your preferred banking option and cryptocurrency. 
                                                
                                                <span style="font-size:18px;font-weight:600">How is the minimum amount required for a Withdrawal?</span>
                                                The minimum amount required for each withdrawal transaction is $10.
                                                
                                                <span style="font-size:18px;font-weight:600">How long will it take to process my Withdrawal?</span>
                                                Large withdrawals may take longer to be processed. If you have any enquiries, kindly seek clarification from any of our customer support representatives.
                                                
                                                <span style="font-size:18px;font-weight:600">Are my transaction details secure?</span>
                                                Yes, a withdrawal can be made under such circumstances but the withdrawal amount will be based on the amount in the Main Wallet.
                                                
                                                <span style="font-size:18px;font-weight:600">Can I make a withdrawal before I finish wagering?</span>
                                                Yes, a withdrawal can be made under such circumstances but the withdrawal amount will be based on the amount in the Main Wallet.
                                                
                                                <span style="font-size:18px;font-weight:600">Can I make a withdrawal through a third party account?</span>
                                                No, all withdrawals made must be through the bank account registered in the user’s Bezon profile. The registered names on both the Bezon account and bank account must match.                                            
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