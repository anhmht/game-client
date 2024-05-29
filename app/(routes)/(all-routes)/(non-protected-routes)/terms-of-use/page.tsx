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
                                        <h2>{translate("TERMS OF USE")}</h2>
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
                                                        {translate("Terms Of Use")}
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
                                                <h3>ĐIỀU KHOẢN SỬ DỤNG</h3>

                                                <span style="font-size:18px;font-weight:600">1. CHUNG</span>
                                                1.1 Trước khi sử dụng trang web của chúng tôi, vui lòng đọc kỹ Điều Khoản và Điều Kiện này. Bằng cách đăng ký Tài Khoản Người Chơi với trang web, bạn xác nhận sự đồng ý của mình với các Điều Khoản và Điều Kiện này.
                                                1.2 Những Điều Khoản và Điều Kiện này (T&C) áp dụng cho việc sử dụng Bezon ("Sòng bạc") thông qua các nền tảng internet, di động hoặc khác liên quan bởi bạn ("Bạn" hoặc "Người Chơi").
                                                1.3 Những T&C này tạo thành một thỏa thuận ràng buộc giữa Bạn và Sòng bạc.
                                                1.4 Bằng cách sử dụng và/hoặc thăm bất kỳ phần nào của trang web Bezon; hoặc bằng cách mở một tài khoản trên trang web, bạn đồng ý bị ràng buộc bởi: Điều Khoản và Điều Kiện; Chính Sách Bảo Mật; Trò chơi có trách nhiệm, Câu hỏi thường gặp và Bất kỳ quy tắc nào của trò chơi.
                                                1.5 Những T&C này có hiệu lực ngay sau khi bạn tích vào nút "Tôi chấp nhận Điều Khoản và Điều Kiện và Chính Sách Bảo Mật". Bằng cách làm như vậy, bạn đồng ý bị ràng buộc bởi những T&C này và chấp nhận chúng.
                                                1.6 Trang web Bezon ("Sòng bạc", "Trang web", "Công ty", "Chúng tôi", "Chúng tôi", "Chúng tôi") thuộc sở hữu và vận hành của Bezon.
                                                
                                                <span style="font-size:18px;font-weight:600">2. AI CÓ THỂ CHƠI</span>
                                                2.1 Sòng bạc chỉ chấp nhận người chơi trưởng thành (độ tuổi tối thiểu là 18).
                                                2.2 Công ty có quyền yêu cầu bằng chứng về độ tuổi từ người chơi và giới hạn quyền truy cập vào Trang web hoặc tạm ngừng Tài Khoản Người chơi của những người chơi không đáp ứng yêu cầu này.
                                                2.3 Chơi ở những nơi mở và công cộng là nghiêm cấm.
                                                
                                                <span style="font-size:18px;font-weight:600">3. QUY TẮC TRÒ CHƠI</span>
                                                3.1 Bằng cách chấp nhận các Điều Khoản và Điều Kiện này, Bạn xác nhận rằng Bạn biết và hiểu quy tắc của các trò chơi được cung cấp trên Trang web. Việc bạn tự quyết định để làm quen với tỷ lệ thanh toán lý thuyết của mỗi trò chơi.
                                                
                                                <span style="font-size:18px;font-weight:600">4. SỬ DỤNG TÀI KHOẢN NGƯỜI CHƠI</span>
                                                4.1 TRÁCH NHIỆM CỦA NGƯỜI CHƠI
                                                4.1.1 Người chơi hoàn toàn hiểu rõ các điều khoản chứa trong Thỏa Thuận này và có nghĩa vụ tuân thủ chúng.
                                                4.1.2 Người chơi đảm bảo rằng họ đã đủ 18 tuổi hoặc hơn.
                                                4.1.3 Người chơi thừa nhận rằng các thông tin của họ trong tài khoản cá nhân của Sòng bạc là chính xác.
                                                4.1.4 Người chơi thừa nhận rằng họ chỉ có một tài khoản thành viên hoạt động với Sòng bạc.
                                                4.1.5 Người chơi có nghĩa vụ không tiết lộ chi tiết đăng nhập của tài khoản thành viên cho bên thứ ba và không cho phép bên thứ ba đặt cược tại Sòng bạc thông qua tài khoản thành viên của họ.
                                                4.1.6 Người chơi xác nhận rằng họ không phải là:
                                                (a) Các quan chức công cộng, bao gồm các quan chức được bầu cử và được bổ nhiệm và nhân viên, cố thời hay tạm thời, có nhận lương hoặc không có lương, bất kể số tiền;
                                                (b) Người dưới 18 tuổi hoặc học sinh của bất kỳ trường học, trường cao đẳng hoặc đại học nào tại Philippines.
                                                (c) Nhà điều hành và nhân viên trang web cá cược.
                                                (d) Người chơi chưa đăng ký.
                                                (e) Các cá nhân bị cấm.
                                                (f) Vợ, chồng, con cái, cha mẹ của các quan chức và người được đề cập tại các điểm (a), (b), và (d) ở trên.
                                                
                                                4.1.7 Người chơi thừa nhận rằng họ không sử dụng tiền của bên thứ ba để nạp tiền vào tài khoản Sòng bạc. Việc sử dụng bất kỳ tài khoản ngân hàng chung hoặc thẻ tín dụng/thẻ ghi nợ chung được sử dụng bởi hai hoặc nhiều người không được phép nhằm mục đích nạp tiền vào tài khoản Sòng bạc.
                                                
                                                <span style="font-size:18px;font-weight:600">5. ĐĂNG KÝ VÀ MỞ TÀI KHOẢN THÀNH VIÊN CỦA BẠN</span>
                                                5.1 Mỗi người chơi được phép tạo chỉ một (1) tài khoản cá nhân. Việc tạo nhiều Tài Khoản Người Chơi bởi một người chơi duy nhất có thể dẫn đến việc chấm dứt tất cả các tài khoản như vậy và hủy bỏ tất cả các khoản thanh toán cho người chơi, theo quyết định duy nhất của Sòng bạc. Người chơi không được cung cấp quyền truy cập vào Tài Khoản Người Chơi của họ hoặc cho phép bất kỳ bên thứ ba nào, bao gồm nhưng không giới hạn đối với trẻ em, sử dụng Trang web.
                                                5.2 Sòng bạc có quyền từ chối đăng ký một tài khoản thành viên.
                                                
                                                <span style="font-size:18px;font-weight:600">6. TÀI KHOẢN KHÔNG HOẠT ĐỘNG</span>
                                                6.1 Một tài khoản không hoạt động (đóng) là một Tài Khoản Người Chơi mà người chơi không đăng nhập hoặc đăng xuất trong vòng mười hai (12) tháng liên tiếp.
                                                
                                                <span style="font-size:18px;font-weight:600">7. KHIẾU NẠI</span>
                                                7.1 Bạn có quyền liên hệ với đội hỗ trợ khách hàng của chúng tôi thông qua dịch vụ LiveChat có sẵn 24/7 hoặc gửi email đến cs@bezon.bet theo hướng dẫn được tìm thấy trên Trang web để gửi chúng tôi bất kỳ khiếu nại nào về dịch vụ của chúng tôi.
                                                7.2 Nếu Bạn gặp vấn đề, Bạn phải mô tả nó càng chi tiết càng tốt để giúp tăng tốc quá trình giải quyết.
                                                7.3 Trong trường hợp có một cuộc tranh chấp, Bạn đồng ý rằng kết quả được lưu trữ trên máy chủ là bằng chứng cuối cùng và không thể bị tranh cãi.
                                                7.4 Trong trường hợp có bất kỳ tranh chấp nào, Bạn đồng ý rằng nhật ký và hồ sơ máy chủ sẽ là cơ quan cuối cùng trong việc xác định kết quả của bất kỳ khiếu nại nào. Bạn đồng ý rằng trong trường hợp khó xảy ra một sự không đồng ý giữa kết quả xuất hiện trên màn hình của Bạn và máy chủ trò chơi, kết quả được lưu trữ trên máy chủ trò chơi sẽ được ưu tiên, và Bạn thừa nhận và đồng ý rằng hồ sơ của chúng tôi sẽ là cơ quan cuối cùng trong việc xác định các điều kiện và tình hình tham gia của Bạn trong hoạt động cá cược trực tuyến liên quan và kết quả của hoạt động này.
                                                
                                                <span style="font-size:18px;font-weight:600">8. TẠM NGỪNG / HỦY TÀI KHOẢN NGƯỜI CHƠI</span>
                                                8.1 Bất kỳ vi phạm nào trong các điều khoản sử dụng ở trên có thể dẫn đến tạm ngừng/hủy bỏ tài khoản của người chơi, theo quyết định duy nhất của Sòng bạc.
                                                
                                                <span style="font-size:18px;font-weight:600">9. GỬI TIỀN</span>
                                                9.1 Tiền gửi ban đầu - Tiền gửi ban đầu của người chơi phải từ $10 trở lên.
                                                
                                                <span style="font-size:18px;font-weight:600">10. RÚT TIỀN</span>
                                                10.1 Tài khoản của người chơi sẽ tự động bị trừ khi yêu cầu rút tiền được gửi. Việc yêu cầu rút tiền qua giao dịch trực tiếp hoặc kiểm tra số tiền đã được ghi có trên tài khoản của mình cho các khoản chuyển tiền ngân hàng hoặc rút tiền qua ví điện tử là trách nhiệm của người chơi.                                            
                                            `;
                                            break;
                                        }
                                        case ELocale.KOREAN: {
                                            content = `
                                                <h3>이용약관</h3>

                                                <span style="font-size:18px;font-weight:600">1. 일반</span>
                                                1.1 본 웹사이트를 이용하기 전에 이용약관을 주의 깊게 읽어주세요. 웹사이트에 플레이어 계정을 등록함으로써 이용약관에 동의한 것으로 간주됩니다.
                                                1.2 이 이용약관(T&C)은 "당신" 또는 "플레이어"로 지칭되는 당신에 의해 "Bezon"("카지노")을 인터넷, 모바일 또는 다른 관련 플랫폼을 통해 사용하는 경우에 적용됩니다.
                                                1.3 이 T&C는 당신과 카지노 간의 구속력 있는 계약을 형성합니다.
                                                1.4 웹사이트 Bezon의 어떤 섹션을 사용하거나 방문하거나 웹사이트에 계정을 개설함으로써, 당신은 다음에 바인딩되는 데 동의합니다: 이용약관, 개인정보 보호 정책, 책임 있는 게임, FAQ 및 모든 게임 규칙.
                                                1.5 이 T&C는 "이용약관 및 개인정보 보호 정책을 수락합니다" 버튼을 체크하는 즉시 효력을 발휘합니다. 이로 인해 당신은 이 T&C에 바인딩되며 수락합니다.
                                                1.6 웹사이트 www.Bezon("카지노", "웹사이트", "회사", "우리")는 Bezon에 의해 소유되고 운영됩니다.
                                                
                                                <span style="font-size:18px;font-weight:600">2. 누가 플레이할 수 있나요?</span>
                                                2.1 카지노는 엄격히 성인 플레이어(최소 연령 18세)를 받습니다.
                                                2.2 회사는 플레이어로부터 연령 증명을 요청하고 이 요건을 충족하지 못하는 플레이어의 웹사이트 접근을 제한하거나 플레이어 계정을 정지할 권리를 보유합니다.
                                                2.3 공개적인 장소에서 플레이하는 것은 엄격히 금지됩니다.
                                                
                                                <span style="font-size:18px;font-weight:600">3. 게임 규칙</span>
                                                3.1 이용약관을 수락함으로써 당신은 웹사이트에서 제공되는 게임의 규칙을 알고 이해한다는 것을 확인합니다. 각 게임의 이론적인 배당률에 익숙해지는 것은 당신의 재량에 따라 결정됩니다.
                                                
                                                <span style="font-size:18px;font-weight:600">4. 플레이어 계정 사용</span>
                                                4.1 플레이어 책임
                                                4.1.1 플레이어는 본 계약에 포함된 조항을 완전히 이해하고 준수할 의무가 있습니다.
                                                4.1.2 플레이어는 18세 이상임을 보장합니다.
                                                4.1.3 플레이어는 카지노의 개인 계정에 있는 개인 정보가 정확함을 인정합니다.
                                                4.1.4 플레이어는 카지노와 활성화된 회원 계정이 하나만 있다는 것을 인정합니다.
                                                4.1.5 플레이어는 회원 계정의 로그인 정보를 제3자에게 공개하지 않으며 제3자가 회원 계정을 통해 카지노에서 도박하도록 허용하지 않아야 합니다.
                                                4.1.6 플레이어는 다음과 같은 사항이 아님을 확인합니다:
                                                (a) 공무원, 선출 및 임명 공무원 및 직원으로서, 경력 또는 비경력 서비스, 보수 여부와 상관없이, 상기 기재된 공무원 및 직원 중 어떠한 것이든지;
                                                (b) 18세 미만 또는 필리핀의 어떠한 학교, 대학 또는 대학교 학생;
                                                (c) 게임 사이트 운영자 및 직원;
                                                (d) 등록되지 않은 플레이어;
                                                (e) 제재된 개인;
                                                (f) 상기 (a), (b), 및 (d)의 항목에 언급된 공무원과 개인들의 배우자, 사실상의 파트너, 자녀, 부모.
                                                4.1.7 플레이어는 타인의 자금을 사용하여 카지노 계정을 보충하지 않는다는 것을 인정합니다. 두 명 이상의 개인이 공유하는 공동 은행 계좌 또는 공동 신용/직불 카드를 사용하여 카지노 계정을 보충하는 것은 허용되지 않습니다.
                                                
                                                <span style="font-size:18px;font-weight:600">5. 회원 가입 및 회원 계정 개설</span>
                                                5.1 각 플레이어는 개인 계정을 하나만 생성할 수 있습니다. 하나의 플레이어가 여러 개의 플레이어 계정을 생성하는 경우, 카지노의 단독 재량으로 모든 해당 계정의 종료와 해당 플레이어에게 지급된 모든 지급금의 취소로 이어질 수 있습니다. 플레이어는 자신의 회원 계정에 대한 액세스를 제공하거나 미성년자를 포함한 제3자에게 웹사이트 사용을 허용해서는 안됩니다.
                                                5.2 카지노는 회원 계정 등록을 거부할 권리를 보유합니다.
                                                
                                                <span style="font-size:18px;font-weight:600">6. 비활성 계정</span>
                                                6.1 비활성(휴면) 계정은 플레이어가 연속 12개월 동안 로그인하거나 로그아웃하지 않은 플레이어 계정입니다.
                                                
                                                <span style="font-size:18px;font-weight:600">7. 불만사항</span>
                                                7.1 당신은 우리의 서비스에 관한 어떠한 불만사항도 알려주기 위해 웹사이트에서 찾을 수 있는 지침에 따라 이용 가능한 24/7 라이브챗을 통해 고객 지원 팀에 연락하거나 cs@bezon.bet으로 이메일을 보낼 자유가 있습니다.
                                                7.2 문제가 발생한 경우, 가능한 한 자세히 설명하여 해결 속도를 높여야 합니다.
                                                7.3 분쟁이 발생한 경우, 당신은 서버에 저장된 결과가 최종 증거로서 도전할 수 없다는 점에 동의합니다.
                                                7.4 어떠한 분쟁의 경우, 당신은 서버 로그와 기록이 해당 클레임 결과를 결정하는 최종 권한으로 작용할 것에 동의합니다. 당신은 화면에 표시되는 결과와 게임 서버에 기록된 결과 사이에 분쟁이 발생할 경우, 게임 서버에 기록된 결과가 우세하며 당신은 당사의 기록이 관련 온라인 게임 활동에 참여한 조건과 상황 및 이 참여 결과를 결정하는 최종 권한으로 인정하고 동의합니다.
                                                
                                                <span style="font-size:18px;font-weight:600">8. 플레이어 계정의 중지/취소</span>
                                                8.1 위의 이용약관을 위반하는 경우, 카지노의 단독 재량으로 플레이어 계정의 중지/취소가 가능합니다.
                                                
                                                <span style="font-size:18px;font-weight:600">9. 입금</span>
                                                9.1 초기 입금 - 플레이어의 초기 입금은 최소 $10 이어야 합니다.
                                                
                                                <span style="font-size:18px;font-weight:600">10. 출금</span>
                                                10.1 플레이어 계정은 출금 요청을 제출하면 자동으로 차감됩니다. 플레이어는 대면 결제를 위해 출금을 청구하거나 은행 이체나 전자지갑 출금에 대한 자신의 계정으로 출금 금액이 완전히 입금되었는지 모니터링하는 것이 플레이어의 책임입니다.                                            
                                            `;
                                            break;
                                        }
                                        case ELocale.MYANMAR: {
                                            content = `
                                                <h3>သတ်မှတ်ချက်များ</h3>

                                                <span style="font-size:18px;font-weight:600">1. အထွေထွေ</span>
                                                1.1 ကျွန်ုပ်တို့၏ဝဘ်ဆိုဒ်ကို အသုံးမပြုမီ ဤစည်းမျဥ်းစည်းကမ်းများကို ဂရုတစိုက်ဖတ်ပါ။ ဝဘ်ဆိုက်တွင် ကစားသမားအကောင့်တစ်ခု မှတ်ပုံတင်ခြင်းဖြင့် သင်သည် စည်းမျဥ်းစည်းကမ်းများနှင့် သဘောတူချက်ကို အတည်ပြုပါသည်။
                                                1.2 ဤစည်းမျဥ်းစည်းကမ်းများ (T&C) သည် Bezon ("ကာစီနို") ကို သင် ("သင်" သို့မဟုတ် "ကစားသမား") မှဆက်စပ်သောအင်တာနက်၊ မိုဘိုင်း သို့မဟုတ် အခြားပလပ်ဖောင်းများဖွင့်ခြင်းမှတဆင့် သက်ဆိုင်ပါသည်။
                                                1.3 ဤ T&C သည် သင်နှင့် ကာစီနိုကြားတွင် စည်းနှောင်ထားသော သဘောတူညီချက်တစ်ခုဖြစ်သည်။
                                                1.4 Bezon ဝဘ်ဆိုဒ်၏ မည်သည့်ကဏ္ဍကိုမဆို အသုံးပြုခြင်းနှင့်/သို့မဟုတ် ဝင်ရောက်ခြင်းဖြင့်၊ သို့မဟုတ် ဝဘ်ဆိုက်ပေါ်တွင် အကောင့်တစ်ခုဖွင့်ခြင်းဖြင့်၊ သင်သည် စည်းမျဥ်းစည်းကမ်းများ လိုက်နာရန် သဘောတူပါသည်။ ကိုယ်ရေးအချက်အလက်မူဝါဒ; ဂိမ်းကစားခြင်း၊ မကြာခဏမေးလေ့ရှိသောမေးခွန်းများနှင့် မည်သည့်ဂိမ်းစည်းမျဉ်းများ။
                                                1.5 ဤ T&C သည် "ကျွန်ုပ်သည် စည်းမျဥ်းစည်းကမ်းများနှင့် ကိုယ်ရေးကိုယ်တာမူဝါဒကို လက်ခံပါသည်" ခလုတ်ကို အမှန်ခြစ်ပြီးသည်နှင့် ဤ T&C သည် အသက်ဝင်ပါသည်။ ထိုသို့ပြုလုပ်ခြင်းဖြင့် သင်သည် ဤ T&C ဖြင့် ချည်နှောင်ရန် သဘောတူပြီး ၎င်းတို့ကို လက်ခံပါသည်။
                                                1.6 Bezon ဝဘ်ဆိုဒ် ("Casino", "Website", "Company", "We", "Us", "Our") ကို Bezon မှ ပိုင်ဆိုင်ပြီး လည်ပတ်ပါသည်။

                                                <span style="font-size:18px;font-weight:600">2. ဘယ်သူကစားနိုင်မလဲ။</span>
                                                2.1 ကာစီနိုသည် တင်းကြပ်စွာ အရွယ်ရောက်ပြီးသူ ကစားသမားများကို လက်ခံသည် (အနည်းဆုံး အသက် 18 နှစ်)။
                                                2.2 ကုမ္ပဏီသည် ကစားသမားထံမှ အသက် အထောက်အထားကို တောင်းခံရန်နှင့် ဝဘ်ဆိုဒ်သို့ ဝင်ရောက်ခွင့်ကို ကန့်သတ်ရန် သို့မဟုတ် ဤလိုအပ်ချက်နှင့် မကိုက်ညီသော ကစားသမားများအတွက် ကစားသမားအကောင့်ကို ဆိုင်းငံ့ထားပိုင်ခွင့်ရှိသည်။
                                                2.3 ပွင့်လင်းမြင်သာသောနေရာများတွင် ကစားခြင်းကို တင်းကြပ်စွာတားမြစ်ထားသည်။
                                                
                                                <span style="font-size:18px;font-weight:600">3. ဂိမ်းစည်းမျဉ်းများ</span>
                                                3.1 ဤစည်းမျဥ်းစည်းကမ်းများကို လက်ခံခြင်းဖြင့်၊ သင်သည် ဝဘ်ဆိုက်ပေါ်တွင် ကမ်းလှမ်းထားသော ဂိမ်းများ၏ စည်းမျဉ်းများကို သိရှိနားလည်ကြောင်း အတည်ပြုပါသည်။ ဂိမ်းတစ်ခုစီ၏ သီအိုရီအရ ပေးချေမှုရာခိုင်နှုန်းနှင့် သင့်ကိုယ်သင် ရင်းနှီးအောင်ပြုလုပ်ရန် သင့်ဆုံးဖြတ်ချက်အတိုင်းဖြစ်သည်။
                                                
                                                <span style="font-size:18px;font-weight:600">4. ကစားသမားအကောင့်အသုံးပြုမှု</span>
                                                4.1 ကစားသမားများ၏ တာဝန်
                                                4.1.1 ကစားသမားသည် ဤသဘောတူညီချက်တွင်ပါရှိသော ပြဋ္ဌာန်းချက်များကို အပြည့်အဝနားလည်ပြီး ၎င်းတို့ကို လိုက်နာရန် တာဝန်ရှိသည်။
                                                4.1.2 ကစားသမားသည် ၎င်းတို့၏ အသက် 18 နှစ် သို့မဟုတ် ထို့ထက်ကြီးကြောင်း သေချာစေပါသည်။
                                                4.1.3 ကစားသမားသည် ကာစီနို၏ ကိုယ်ရေးကိုယ်တာအကောင့်ရှိ ၎င်းတို့၏အသေးစိတ်အချက်အလက်များ မှန်ကန်ကြောင်း အသိအမှတ်ပြုပါသည်။
                                                4.1.4 ကစားသမားသည် ကာစီနိုတွင် အသုံးပြုနေသော အဖွဲ့ဝင်အကောင့်တစ်ခုသာရှိကြောင်း အသိအမှတ်ပြုပါသည်။
                                                4.1.5 ကစားသမားသည် အဖွဲ့ဝင်အကောင့်၏ အကောင့်ဝင်ခြင်းအသေးစိတ်အချက်အလက်များကို တတိယပါတီများသို့ မထုတ်ဖော်ရန်နှင့် တတိယပါတီများအား ၎င်းတို့၏အဖွဲ့ဝင်အကောင့်မှတစ်ဆင့် ကာစီနိုတွင် လောင်းကစားခွင့်မပြုရန် တာဝန်ရှိသည်။
                                                4.1.6 ကစားသမားများသည် ၎င်းတို့မဟုတ်ကြောင်း အတည်ပြုသည်-
                                                (က) ရွေးချယ်ခန့်အပ်ထားသော အရာရှိများနှင့် ဝန်ထမ်းများ၊ အမြဲတမ်း သို့မဟုတ် ယာယီ၊ အသက်မွေးဝမ်းကြောင်း သို့မဟုတ် အသက်မွေးဝမ်းကြောင်းမဟုတ်သော၊ ပမာဏမခွဲခြားဘဲ လျော်ကြေးငွေကို လက်ခံခြင်းရှိ၊ မရှိ၊
                                                (ခ) ဖိလစ်ပိုင်ရှိ ကျောင်း၊ ကောလိပ် သို့မဟုတ် တက္ကသိုလ်တစ်ခုခုမှ အသက် 18 နှစ်အောက် ကျောင်းသား၊
                                                (ဂ) ဂိမ်းဆော့သည့်ဆိုဒ် အော်ပရေတာများနှင့် ဝန်ထမ်းများ
                                                (ဃ) မှတ်ပုံတင်မထားသည့် ကစားသမားများ
                                                (င) တားမြစ်ထားသော ပုဂ္ဂိုလ်များ
                                                (စ) အိမ်ထောင်ဖက်၊ သမရိုးကျလုပ်ဖော်ကိုင်ဖက်၊ သားသမီးများ၊ အထက်ဖော်ပြပါ အရာများ (က)၊ (ခ) နှင့် (ဃ) တို့တွင် ဖော်ပြထားသော အရာထမ်းများ၏ မိဘများနှင့် ပုဂ္ဂိုလ်များ၊
                                                4.1.7 ကစားသမားများသည် ကာစီနိုအကောင့်ကို ဖြည့်စွက်ရန်အတွက် ပြင်ပအဖွဲ့အစည်းများ၏ ရန်ပုံငွေများကို အသုံးမပြုကြောင်း အသိအမှတ်ပြုပါသည်။ ကာစီနိုအကောင့်ကို ဖြည့်သွင်းရန် ရည်ရွယ်ချက်ဖြင့် နှစ်ယောက် သို့မဟုတ် နှစ်ယောက်ထက်ပိုသော တစ်ဦးချင်းမျှဝေသည့် ပူးတွဲဘဏ်အကောင့်များ သို့မဟုတ် အကြွေး/ဒက်ဘစ်ကတ်များကို အသုံးပြုခြင်းကို ခွင့်မပြုပါ။

                                                <span style="font-size:18px;font-weight:600">5.သင်၏အဖွဲ့ဝင်အကောင့်ကိုမှတ်ပုံတင်ခြင်းနှင့်ဖွင့်ခြင်း။</span>
                                                5.1 ကစားသမားတစ်ဦးစီသည် (1) ကိုယ်ရေးကိုယ်တာအကောင့်တစ်ခုသာ ဖန်တီးခွင့်ရှိသည်။ ကစားသမားတစ်ဦးတည်းမှ များပြားသော ကစားသမားအကောင့်များကို ဖန်တီးခြင်းသည် ကာစီနို၏တစ်ခုတည်းသောဆုံးဖြတ်ချက်ဖြင့် အဆိုပါအကောင့်အားလုံးကို ရပ်စဲရန်နှင့် ကစားသမားအား ပေးချေမှုအားလုံးကို ပယ်ဖျက်ခြင်းဆီသို့ ဦးတည်နိုင်သည်။ ကစားသမားသည် ၎င်းတို့၏ ကစားသမားအကောင့်သို့ ဝင်ရောက်ခွင့် မပေးဘဲ သို့မဟုတ် အရွယ်မရောက်သေးသူများ အပါအဝင် အခြားပြင်ပအဖွဲ့အစည်းအား ဝဘ်ဆိုဒ်ကို အသုံးပြုခွင့်မပြုစေရ။
                                                5.2 ကာစီနိုသည် အသင်းဝင်အကောင့်ကို မှတ်ပုံတင်ရန် ငြင်းဆိုပိုင်ခွင့်ကို လက်ဝယ်ရှိသည်။
                                                
                                                <span style="font-size:18px;font-weight:600">6. လှုပ်ရှားမှုမရှိသောအကောင့်များ</span>
                                                6.1 လှုပ်ရှားမှုမရှိသော (မရပ်မနား) အကောင့်သည် ကစားသမားတစ်ဦးသည် ဆယ်နှစ် (၁၂) လဆက်တိုက် အကောင့်ဝင်ခြင်း သို့မဟုတ် အကောင့်မှ ထွက်ခြင်းမပြုသည့် ကစားသမားအကောင့်တစ်ခုဖြစ်သည်။

                                                <span style="font-size:18px;font-weight:600">7. တိုင်ကြားမှုများ</span>
                                                7.1 ကျွန်ုပ်တို့၏ဝန်ဆောင်မှုများနှင့်ပတ်သက်သော တိုင်ကြားချက်များကို ပေးဆောင်ရန် ဝဘ်ဆိုက်ပေါ်တွင်တွေ့ရှိရသော ညွှန်ကြားချက်များနှင့်အညီ ကျွန်ုပ်တို့၏ Customer Support အဖွဲ့အား 24/7 LiveChat သို့မဟုတ် cs@bezon.bet သို့ အီးမေးလ်ပေးပို့နိုင်ပါသည်။
                                                7.2 သင့်တွင် ပြဿနာရှိပါက၊ ၎င်း၏ဖြေရှင်းချက်များကို အရှိန်မြှင့်ရန် အတတ်နိုင်ဆုံး အသေးစိတ်ဖော်ပြရန် လိုအပ်သည်။
                                                7.3 အငြင်းပွားမှုတစ်ခုဖြစ်ပွားသောအခါ၊ ဆာဗာတွင်သိမ်းဆည်းထားသောရလဒ်များသည် နောက်ဆုံးသက်သေဖြစ်ပြီး စိန်ခေါ်၍မရနိုင်ကြောင်း သင်သဘောတူပါသည်။
                                                7.4 အငြင်းပွားမှုတစ်စုံတစ်ရာဖြစ်ပွားပါက ဆာဗာမှတ်တမ်းများနှင့် မှတ်တမ်းများသည် တောင်းဆိုမှု၏ရလဒ်ကို ဆုံးဖြတ်ရာတွင် နောက်ဆုံးအာဏာပိုင်အဖြစ် လုပ်ဆောင်ရမည်ဟု သင်သဘောတူပါသည်။ သင့်ဖန်သားပြင်နှင့် ဂိမ်းဆာဗာတွင် ထွက်ပေါ်လာသည့်ရလဒ်အကြား သဘောထားကွဲလွဲမှုဖြစ်နိုင်ချေရှိသော ဖြစ်ရပ်မျိုးတွင်၊ ဂိမ်းဆာဗာတွင် လော့ဂ်လုပ်ထားသည့်ရလဒ်သည် အောင်မြင်မည်ဖြစ်ပြီး ကျွန်ုပ်တို့၏မှတ်တမ်းများကို ဆုံးဖြတ်ရာတွင် နောက်ဆုံးအခွင့်အာဏာဖြစ်ကြောင်း သင်အသိအမှတ်ပြုပြီး သဘောတူလက်ခံပါသည်။ သက်ဆိုင်ရာအွန်လိုင်းဂိမ်းလှုပ်ရှားမှုတွင် သင်၏ပါဝင်မှုစည်းမျဉ်းများနှင့် အခြေအနေများနှင့် ဤပါဝင်မှု၏ရလဒ်များ။

                                                <span style="font-size:18px;font-weight:600">8. ကစားသမား၏အကောင့်ကို ဆိုင်းငံ့ခြင်း/ ပယ်ဖျက်ခြင်း။</span>
                                                8.1 အထက်ဖော်ပြပါ အသုံးပြုမှုစည်းမျဉ်းများတွင် ချိုးဖောက်မှုတစ်ခုခုသည် ကာစီနို၏တစ်ခုတည်းသောဆုံးဖြတ်ချက်ဖြင့် ကစားသမား၏အကောင့်ကို ဆိုင်းငံ့ခြင်း/ဖျက်သိမ်းခြင်းဆီသို့ ဦးတည်သွားစေနိုင်သည်။

                                                <span style="font-size:18px;font-weight:600">9. အပ်ငွေများ</span>
                                                9.1 ကနဦးအပ်ငွေ – ကစားသမားများ၏ ကနဦးအပ်ငွေသည် အနည်းဆုံး $10 ဖြစ်ရမည်။

                                                <span style="font-size:18px;font-weight:600">10. ငွေထုတ်ခြင်း</span>
                                                10.1 ငွေသားထုတ်ရန် တောင်းဆိုချက်ကို တင်ပြသောအခါ ကစားသမား၏အကောင့်ကို အလိုအလျောက် ငွေထုတ်ပါမည်။ ကောင်တာမှ ငွေပေးချေမှုများအတွက် ၎င်း၏ ထုတ်ယူမှုကို တောင်းဆိုရန် သို့မဟုတ် ၎င်း၏ ငွေထုတ်ပမာဏသည် ဘဏ်ငွေလွှဲမှုများ သို့မဟုတ် e-wallet ငွေသားအထွက်များအတွက် ၎င်း၏အကောင့်သို့ လုံးလုံးအကြွေးဖြစ်ကြောင်း စောင့်ကြည့်ရန် ကစားသမား၏ တာဝန်ဖြစ်သည်။
                                            `;
                                            break;
                                        }
                                        default: {
                                            content =`
                                                <h3>TERMS OF USE</h3>

                                                <span style="font-size:18px;font-weight:600">1. GENERAL</span>
                                                1.1 Before using our website, please read these Terms and Conditions carefully. By registering a Player Account with the website You confirm Your consent with the Terms and Conditions.
                                                1.2 These Terms and Conditions (T&C) apply to the usage of Bezon (“Casino”) through related enabling internet, mobile or other platforms by You (“You” or “Player”).
                                                1.3 These T&C constitute a binding agreement between You and the Casino.
                                                1.4 By using and/or visiting any section of the website Bezon; or by opening an account on the website, You agree to be bound by: Terms and Conditions; Privacy Policy; Responsible Gaming, FAQ, and Any game rules.
                                                1.5 These T&C come into force as soon as You tick the “I accept the Terms and Conditions and Privacy Policy” button. By doing so You agree to be bound by these T&C and accept them.
                                                1.6 The website Bezon ("Casino", "Website", “Company”, "We", "Us", "Our") is owned and operated by Bezon.
                                                
                                                <span style="font-size:18px;font-weight:600">2. WHO CAN PLAY</span>
                                                2.1 The Casino accepts strictly adult players (the minimum age is 18).
                                                2.2 The Company reserves the right to ask for the proof of age from the player and limit access to the Website or suspend the Player Account to those players who fail to meet this requirement. 
                                                2.3 Playing in open and public places is strictly prohibited.
                                                
                                                <span style="font-size:18px;font-weight:600">3. GAME RULES</span>
                                                3.1 By accepting these Terms and Conditions, You confirm that You know and understand the rules of the games offered on the Website. It is at Your discretion to familiarise Yourself with the theoretical payout percentage of each game. 
                                                
                                                <span style="font-size:18px;font-weight:600">4. USE OF PLAYER ACCOUNT</span>
                                                4.1 PLAYER RESPONSIBILITY
                                                4.1.1 Player fully understands the provisions contained in this Agreement and is obliged to comply with them.
                                                4.1.2 Player ensures that their age is 18 or older.
                                                4.1.3 Player acknowledges that their details in the personal account of the Casino are correct.
                                                4.1.4 Player acknowledges that they have only one active member account with the Casino.
                                                4.1.5 Player is obliged not to disclose the login details of a member account to third parties and not to allow the third parties to gamble at the Casino through their member account.
                                                4.1.6 Players confirm that they are not:
                                                (a) Public officials, which includes elective and appointive officials and employees, permanent or temporary, whether in the career or non-career service, whether or not they receive compensation, regardless of amount; 
                                                (b) Persons under 18 years of age or students of any school, college or university in the Philippines. 
                                                (c) Gaming site Operators and employees 
                                                (d) Unregistered players 
                                                (e) Banned individuals 
                                                (f) Spouse, common-law partner, children, parents of officials and persons mentioned in items (a), (b), and (d) above. 
                                                4.1.7 Players acknowledge that they do not use the funds of third parties to replenish the Casino account. Usage of any joint bank accounts or joint credit/debit cards shared by two or more individuals are not allowed in the aim to replenish the Casino account.
                                                
                                                
                                                <span style="font-size:18px;font-weight:600">5．REGISTRATION AND OPENING OF YOUR MEMBER ACCOUNT</span>
                                                5.1 Each player is allowed to create only one (1) personal account. Creating multiple Player Accounts by a single player can lead, at the sole discretion of the Casino, to termination of all such accounts and cancellation of all payouts to the player. The player shall not provide access to their Player Account or allow using the Website to any third party including but not limited to minors.
                                                5.2 Casino reserves the right to refuse to register a member account.
                                                
                                                <span style="font-size:18px;font-weight:600">6. INACTIVE ACCOUNTS</span>
                                                6.1 An inactive (dormant) account is a Player Account which a player has not logged into or logged out of for twelve (12) consecutive months.
                                                
                                                <span style="font-size:18px;font-weight:600">7. COMPLAINTS</span>
                                                7.1 You are free to contact our Customer Support team via LiveChat available 24/7 or email cs@bezon.bet according to the instructions found on the Website to give us any complaints regarding our services.
                                                7.2 If You have a problem, You have to describe it in detail as much as possible to speed up its resolution.
                                                7.3 In the event of a dispute, You agree that the results stored on the server are the final proof and cannot be challenged.
                                                7.4 In the event of any dispute, You agree that the server logs and records shall act as the final authority in determining the outcome of any claim. You agree that in the unlikely event of a disagreement between the result that appears on Your screen and the game server, the result that was logged on the game server will prevail, and You acknowledge and agree that our records will be the final authority in determining the terms and circumstances of Your participation in the relevant online gaming activity and the results of this participation.

                                                <span style="font-size:18px;font-weight:600">8.  SUSPENSION / CANCELLATION OF PLAYER’S ACCOUNT</span>
                                                8.1 Any violation in the above terms of use may lead to the suspension/cancellation of a player’s account, at the sole discretion of the Casino.

                                                <span style="font-size:18px;font-weight:600">9. DEPOSITS</span>
                                                9.1 Initial Deposit – Initial deposit of players must be $10 minimum. 

                                                <span style="font-size:18px;font-weight:600">10. WITHDRAWALS</span>
                                                10.1 The player's account will automatically be debited upon submission of a cash out request. It is the player's responsibility to claim his withdrawal for over-the-counter payments or monitor that his withdrawal amount has been completely credit to his account for bank transfers or e-wallet cash outs.                                            
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