// Language Switcher for Security Checker
class LanguageSwitcher {
    constructor() {
        this.currentLanguage = 'en';
        this.translations = {
            en: {
                // Header
                'nav.home': 'Home',
                'nav.businesses': 'For Businesses',
                'nav.about': 'About',
                'nav.contact': 'Contact',
                
                // Hero Section
                'hero.title': 'Check Email, Link or Phone Number Safety',
                'hero.subtitle': 'Protect yourself from phishing, scams, and malicious content with our real-time security analyzer',
                'hero.input.placeholder': 'Enter email, URL, phone number or suspicious content...',
                'hero.button': 'Analyze Security',
                'hero.file.title': 'Upload .eml File',
                'hero.file.desc': 'Drag and drop your .eml file here, or click to browse',
                'hero.file.browse': 'Browse Files',
                'hero.file.analyze': 'Analyze .eml File',
                'hero.examples.phishing': 'Phishing Email',
                'hero.examples.fake': 'Fake Website',
                'hero.examples.scam': 'Scam Call',
                'hero.examples.suspicious': 'Suspicious Text',
                'hero.security.note': 'All analyses are encrypted and processed securely',
                'hero.database.note': 'Database updated: Today 08:45 UTC',
                
                // How It Works
                'how.title': 'How Our Security Checker Works',
                'how.goals.title': 'Analysis Goals',
                'how.goals.table.area': 'Check Area',
                'how.goals.table.purpose': 'Purpose',
                'how.goals.email.content': 'Email Content',
                'how.goals.email.content.desc': 'Analyze for scam patterns in content, psychological triggers',
                'how.goals.email.links': 'Email Links',
                'how.goals.email.links.desc': 'Check for phishing, fake domains',
                'how.goals.sender': 'Sender',
                'how.goals.sender.desc': 'Verify impersonation, fake organization claims',
                'how.goals.attachments': 'Attachments',
                'how.goals.attachments.desc': 'Detect potential malicious code',
                'how.goals.phone': 'Phone/Account',
                'how.goals.phone.desc': 'Check against blacklists',
                'how.goals.website': 'Suspicious Website',
                'how.goals.website.desc': 'Evaluate safety & trustworthiness',
                'how.step1.title': 'Submit Content',
                'how.step1.desc': 'Enter any email address, URL link, or phone number you want to check for safety.',
                'how.step2.title': 'Real-time Analysis',
                'how.step2.desc': 'Our system checks against multiple security databases and analyzes patterns.',
                'how.step3.title': 'Get Results',
                'how.step3.desc': 'Receive detailed safety report with threat level and protection recommendations.',
                
                // Results Section
                'results.title': 'Safety Analysis Results',
                'results.analyzed': 'Analyzed Content',
                'results.threat.title': 'Threat Intelligence',
                'results.threat.db': 'Database Matches',
                'results.threat.db.desc': 'Known threat indicators',
                'results.threat.ai': 'AI Analysis',
                'results.threat.ai.desc': 'Confidence score',
                'results.threat.first': 'First Seen',
                'results.threat.first.desc': 'In our database',
                'results.status.title': 'Safety Status',
                'results.status.safe': 'Safe',
                'results.status.suspicious': 'Suspicious',
                'results.status.dangerous': 'Dangerous',
                'results.status.risk.low': 'Low Risk',
                'results.status.risk.high': 'High Risk',
                'results.category.title': 'Classification',
                'results.details.title': 'Detailed Analysis',
                'results.details.email': 'Email Content',
                'results.details.email.desc': 'Checking for suspicious keywords: "You won a prize", "Verify account", "Click to claim"...',
                'results.details.url': 'URL Analysis',
                'results.details.url.desc': 'Verifying domain authenticity, shortened URLs, blacklist status...',
                'results.details.phone': 'Phone Check',
                'results.details.phone.desc': 'Validating phone number prefix against known scam numbers...',
                'results.details.sender': 'Sender Verification',
                'results.details.sender.desc': 'Checking sender impersonation, SPF/DKIM records...',
                'results.details.website': 'Website Check',
                'results.details.website.desc': 'Analyzing domain age, HTTPS, design authenticity...',
                'results.details.document': 'Document Analysis',
                'results.details.document.desc': 'Scanning for malicious macros, hidden scripts...',
                'results.analysis.title': 'Analysis Details',
                'results.analysis.desc': 'This email address appears to be from a legitimate domain with no known security issues.',
                'results.analysis.safe': 'This content appears to be safe with no significant security threats detected.',
                'results.analysis.safe_simple': 'This content appears to be safe.',
                'results.analysis.suspicious': 'This content shows some suspicious characteristics.',
                'results.analysis.high_risk': 'This content is highly suspicious.',
                'results.analysis.dangerous': 'This content is extremely dangerous.',
                'results.analysis.email.basic': 'Basic email analysis completed',
                'results.analysis.url.basic': 'Basic URL analysis completed',
                'results.analysis.phone.basic': 'Basic phone analysis completed',
                'results.analysis.sender.basic': 'Basic sender verification completed',
                'results.analysis.website.basic': 'Basic website analysis completed',
                'results.analysis.document.basic': 'Basic document analysis completed',
                'results.analysis.email.patterns': 'Found suspicious patterns in email content',
                'results.analysis.domain': 'Domain analysis completed',
                'results.analysis.website.security': 'Checking website security and reputation',
                'results.analysis.phone.details': 'Phone number analysis completed',
                'results.tech.title': 'Advanced Technical Indicators',
                'results.tech.list.1': 'Email headers show signs of spoofing',
                'results.tech.list.2': 'Missing SPF/DKIM authentication',
                'results.tech.list.3': 'Domain registered recently (14 days ago)',
                'results.tech.list.4': 'IP address location mismatch with claimed origin',
                'results.tech.list.5': 'URL redirects through multiple suspicious domains',
                'results.recommendations.title': 'Recommendations',
                'results.recommendations.list.1': 'Always verify the sender\'s email address before responding.',
                'results.recommendations.list.2': 'Don\'t click on suspicious links in emails.',
                'results.recommendations.list.3': 'Enable two-factor authentication for important accounts.',
                'results.recommendations.verify': 'Always verify the sender before sharing sensitive information.',
                'results.recommendations.personal': 'Never share personal or financial information via email or text.',
                'results.recommendations.password': 'Use strong, unique passwords for all accounts.',
                'results.recommendations.report': 'Report any suspicious activity to authorities.',
                'results.recommendations.avoid': 'Avoid interacting with suspicious content.',
                'results.recommendations.change': 'Change passwords if you already interacted with suspicious content.',
                'results.recommendations.update': 'Keep your software and antivirus updated.',
                'results.recommendations.block': 'Block the source if possible.',
                'results.recommendations.dynamic.1': 'Always verify the sender before sharing sensitive information.',
                'results.recommendations.dynamic.2': 'Keep your software and antivirus updated.',
                'results.recommendations.dynamic.3': 'Use strong, unique passwords for important accounts.',
                'results.recommendations.dynamic.4': 'Do not provide personal or financial information.',
                'results.recommendations.dynamic.5': 'Verify the source through official channels.',
                'results.recommendations.dynamic.6': 'Report any suspicious activity.',
                'results.recommendations.dynamic.7': 'Avoid interacting with this content.',
                'results.recommendations.dynamic.8': 'Report to relevant authorities.',
                'results.recommendations.dynamic.9': 'Block the source if possible.',
                'results.recommendations.dynamic.10': 'Do not interact with this content.',
                'results.recommendations.dynamic.11': 'Report immediately to authorities.',
                'results.recommendations.dynamic.12': 'Change passwords if you already interacted.',
                'results.actions.share': 'Share Detailed Report',
                'results.actions.download': 'Download PDF',
                'results.actions.report': 'Report & Contribute',
                
                // Business Section
                'business.title': 'For Businesses',
                'business.subtitle': 'Automatically classify emails from your MySQL database in real-time into 4 categories: Safe, Suspicious, Spam, and Phishing.',
                'business.integration.title': 'Database Integration',
                'business.integration.desc': 'Connect your MySQL database and automatically classify emails with our simple API or scheduled scripts.',
                'business.dashboard.title': 'Dashboard & Analytics',
                'business.dashboard.desc': 'View statistics and trends of email classifications with our simple dashboard interface.',
                'business.button': 'Learn More About Business Solutions',
                
                // FAQ Section
                'faq.title': 'Frequently Asked Questions',
                'faq.how.title': 'How does the security checker work?',
                'faq.how.answer': 'Our system analyzes the input (email, URL, or phone number) against multiple databases of known threats, checks for suspicious patterns, and uses machine learning models to assess the risk level. The analysis includes domain reputation checks, content analysis, and comparison with known phishing patterns.',
                'faq.privacy.title': 'Do you store the information I check?',
                'faq.privacy.answer': 'No, we do not store the specific content you check. Our system performs real-time analysis and only retains anonymous metadata for improving our detection algorithms. Your privacy is important to us.',
                'faq.accuracy.title': 'How accurate are the results?',
                'faq.accuracy.answer': 'Our system has a high accuracy rate (over 95% based on our tests) for detecting known threats. However, new threats emerge constantly, so we recommend using our tool as one of several security measures. Always use your best judgment when dealing with suspicious content.',
                
                // Footer
                'footer.tagline': 'Protecting users from phishing, scams, and malicious content since 2025.',
                'footer.quick.title': 'Quick Links',
                'footer.quick.check': 'Check Safety',
                'footer.quick.api': 'API Documentation',
                'footer.resources.title': 'Resources',
                'footer.resources.blog': 'Blog',
                'footer.resources.tips': 'Security Tips',
                'footer.resources.examples': 'Phishing Examples',
                'footer.resources.report': 'Report a Threat',
                'footer.connect.title': 'Connect With Us',
                'footer.newsletter': 'Subscribe to our newsletter for security updates',
                'footer.newsletter.placeholder': 'Your email',
                'footer.copyright': '© 2025 Security Checker. All rights reserved.'
            },
            vi: {
                // Header
                'nav.home': 'Trang chủ',
                'nav.businesses': 'Cho doanh nghiệp',
                'nav.about': 'Giới thiệu',
                'nav.contact': 'Liên hệ',
                
                // Hero Section
                'hero.title': 'Kiểm tra an toàn Email, Liên kết hoặc Số điện thoại',
                'hero.subtitle': 'Bảo vệ bản thân khỏi lừa đảo, scam và nội dung độc hại với bộ phân tích bảo mật thời gian thực của chúng tôi',
                'hero.input.placeholder': 'Nhập email, liên kết URL, số điện thoại hoặc nội dung đáng ngờ...',
                'hero.button': 'Phân tích bảo mật',
                'hero.file.title': 'Tải lên file .eml',
                'hero.file.desc': 'Kéo và thả file .eml của bạn vào đây, hoặc nhấp để tìm kiếm',
                'hero.file.browse': 'Tìm kiếm file',
                'hero.file.analyze': 'Phân tích file .eml',
                'hero.examples.phishing': 'Email lừa đảo',
                'hero.examples.fake': 'Website giả mạo',
                'hero.examples.scam': 'Cuộc gọi lừa đảo',
                'hero.examples.suspicious': 'Tin nhắn đáng ngờ',
                'hero.security.note': 'Tất cả phân tích được mã hóa và xử lý an toàn',
                'hero.database.note': 'Cơ sở dữ liệu cập nhật: Hôm nay 08:45 UTC',
                
                // How It Works
                'how.title': 'Cách hoạt động của Bộ kiểm tra bảo mật',
                'how.goals.title': 'Mục tiêu phân tích',
                'how.goals.table.area': 'Khu vực kiểm tra',
                'how.goals.table.purpose': 'Mục đích',
                'how.goals.email.content': 'Nội dung Email',
                'how.goals.email.content.desc': 'Phân tích các mẫu lừa đảo trong nội dung, kích hoạt tâm lý',
                'how.goals.email.links': 'Liên kết Email',
                'how.goals.email.links.desc': 'Kiểm tra lừa đảo, tên miền giả mạo',
                'how.goals.sender': 'Người gửi',
                'how.goals.sender.desc': 'Xác minh giả mạo, tuyên bố tổ chức giả',
                'how.goals.attachments': 'Tệp đính kèm',
                'how.goals.attachments.desc': 'Phát hiện mã độc hại tiềm ẩn',
                'how.goals.phone': 'Điện thoại/Tài khoản',
                'how.goals.phone.desc': 'Kiểm tra danh sách đen',
                'how.goals.website': 'Website đáng ngờ',
                'how.goals.website.desc': 'Đánh giá tính an toàn và đáng tin cậy',
                'how.step1.title': 'Gửi nội dung',
                'how.step1.desc': 'Nhập bất kỳ địa chỉ email, liên kết URL hoặc số điện thoại bạn muốn kiểm tra an toàn.',
                'how.step2.title': 'Phân tích thời gian thực',
                'how.step2.desc': 'Hệ thống của chúng tôi kiểm tra nhiều cơ sở dữ liệu bảo mật và phân tích các mẫu.',
                'how.step3.title': 'Nhận kết quả',
                'how.step3.desc': 'Nhận báo cáo an toàn chi tiết với mức độ đe dọa và khuyến nghị bảo vệ.',
                
                // Results Section
                'results.title': 'Kết quả phân tích an toàn',
                'results.analyzed': 'Nội dung đã phân tích',
                'results.threat.title': 'Thông tin đe dọa',
                'results.threat.db': 'Khớp cơ sở dữ liệu',
                'results.threat.db.desc': 'Chỉ số đe dọa đã biết',
                'results.threat.ai': 'Phân tích AI',
                'results.threat.ai.desc': 'Điểm tin cậy',
                'results.threat.first': 'Lần đầu thấy',
                'results.threat.first.desc': 'Trong cơ sở dữ liệu của chúng tôi',
                'results.status.title': 'Trạng thái an toàn',
                'results.status.safe': 'An toàn',
                'results.status.suspicious': 'Đáng ngờ',
                'results.status.dangerous': 'Nguy hiểm',
                'results.status.risk.low': 'Rủi ro thấp',
                'results.status.risk.high': 'Rủi ro cao',
                'results.category.title': 'Phân loại',
                'results.details.title': 'Phân tích chi tiết',
                'results.details.email': 'Nội dung Email',
                'results.details.email.desc': 'Kiểm tra từ khóa đáng ngờ: "Bạn đã thắng giải", "Xác minh tài khoản", "Nhấp để nhận"...',
                'results.details.url': 'Phân tích URL',
                'results.details.url.desc': 'Xác minh tính xác thực tên miền, URL rút gọn, trạng thái danh sách đen...',
                'results.details.phone': 'Kiểm tra điện thoại',
                'results.details.phone.desc': 'Xác thực tiền tố số điện thoại với các số lừa đảo đã biết...',
                'results.details.sender': 'Xác minh người gửi',
                'results.details.sender.desc': 'Kiểm tra giả mạo người gửi, bản ghi SPF/DKIM...',
                'results.details.website': 'Kiểm tra website',
                'results.details.website.desc': 'Phân tích tuổi tên miền, HTTPS, tính xác thực thiết kế...',
                'results.details.document': 'Phân tích tài liệu',
                'results.details.document.desc': 'Quét macro độc hại, script ẩn...',
                'results.analysis.title': 'Chi tiết phân tích',
                'results.analysis.desc': 'Địa chỉ email này có vẻ đến từ tên miền hợp pháp không có vấn đề bảo mật đã biết.',
                'results.analysis.safe': 'Nội dung này có vẻ an toàn với không có vấn đề bảo mật đáng kể được phát hiện.',
                'results.analysis.safe_simple': 'Nội dung này có vẻ an toàn.',
                'results.analysis.suspicious': 'Nội dung này có vẻ có những đặc điểm đáng ngờ.',
                'results.analysis.high_risk': 'Nội dung này có vẻ rất đáng ngờ.',
                'results.analysis.dangerous': 'Nội dung này có vẻ rất nguy hiểm.',
                'results.analysis.email.basic': 'Phân tích email cơ bản hoàn tất',
                'results.analysis.url.basic': 'Phân tích URL cơ bản hoàn tất',
                'results.analysis.phone.basic': 'Phân tích điện thoại cơ bản hoàn tất',
                'results.analysis.sender.basic': 'Xác minh người gửi cơ bản hoàn tất',
                'results.analysis.website.basic': 'Phân tích website cơ bản hoàn tất',
                'results.analysis.document.basic': 'Phân tích tài liệu cơ bản hoàn tất',
                'results.analysis.email.patterns': 'Tìm thấy các mẫu đáng ngờ trong nội dung email',
                'results.analysis.domain': 'Phân tích tên miền hoàn tất',
                'results.analysis.website.security': 'Đang kiểm tra tính an toàn và uy tín của website',
                'results.analysis.phone.details': 'Phân tích số điện thoại hoàn tất',
                'results.tech.title': 'Chỉ số kỹ thuật nâng cao',
                'results.tech.list.1': 'Header email cho thấy dấu hiệu giả mạo',
                'results.tech.list.2': 'Thiếu xác thực SPF/DKIM',
                'results.tech.list.3': 'Tên miền đăng ký gần đây (14 ngày trước)',
                'results.tech.list.4': 'Vị trí IP không khớp với nguồn gốc tuyên bố',
                'results.tech.list.5': 'URL chuyển hướng qua nhiều tên miền đáng ngờ',
                'results.recommendations.title': 'Khuyến nghị',
                'results.recommendations.list.1': 'Luôn xác minh địa chỉ email người gửi trước khi trả lời.',
                'results.recommendations.list.2': 'Không nhấp vào các liên kết đáng ngờ trong email.',
                'results.recommendations.list.3': 'Bật xác thực hai yếu tố cho các tài khoản quan trọng.',
                'results.recommendations.verify': 'Luôn xác minh người gửi trước khi chia sẻ thông tin nhạy cảm.',
                'results.recommendations.personal': 'Không bao giờ chia sẻ thông tin cá nhân hoặc tài chính qua email hoặc tin nhắn.',
                'results.recommendations.password': 'Sử dụng mật khẩu mạnh, độc nhất cho tất cả tài khoản.',
                'results.recommendations.report': 'Báo cáo bất kỳ hoạt động đáng ngờ nào cho cơ quan chức năng.',
                'results.recommendations.avoid': 'Tránh tương tác với nội dung đáng ngờ.',
                'results.recommendations.change': 'Thay đổi mật khẩu nếu bạn đã tương tác với nội dung đáng ngờ.',
                'results.recommendations.update': 'Giữ phần mềm và phần mềm chống vi-rút được cập nhật.',
                'results.recommendations.block': 'Chặn nguồn nếu có thể.',
                'results.recommendations.dynamic.1': 'Luôn xác minh người gửi trước khi chia sẻ thông tin nhạy cảm.',
                'results.recommendations.dynamic.2': 'Giữ phần mềm và phần mềm chống vi-rút được cập nhật.',
                'results.recommendations.dynamic.3': 'Sử dụng mật khẩu mạnh, độc nhất cho các tài khoản quan trọng.',
                'results.recommendations.dynamic.4': 'Không cung cấp thông tin cá nhân hoặc tài chính.',
                'results.recommendations.dynamic.5': 'Xác minh nguồn thông qua các kênh chính thức.',
                'results.recommendations.dynamic.6': 'Báo cáo bất kỳ hoạt động đáng ngờ nào.',
                'results.recommendations.dynamic.7': 'Tránh tương tác với nội dung này.',
                'results.recommendations.dynamic.8': 'Báo cáo cho cơ quan chức năng liên quan.',
                'results.recommendations.dynamic.9': 'Chặn nguồn nếu có thể.',
                'results.recommendations.dynamic.10': 'Không tương tác với nội dung này.',
                'results.recommendations.dynamic.11': 'Báo cáo ngay lập tức cho cơ quan chức năng.',
                'results.recommendations.dynamic.12': 'Thay đổi mật khẩu nếu bạn đã tương tác.',
                'results.actions.share': 'Chia sẻ báo cáo chi tiết',
                'results.actions.download': 'Tải xuống PDF',
                'results.actions.report': 'Báo cáo & Đóng góp',
                
                // Business Section
                'business.title': 'Cho doanh nghiệp',
                'business.subtitle': 'Tự động phân loại email từ cơ sở dữ liệu MySQL của bạn theo thời gian thực thành 4 danh mục: An toàn, Đáng ngờ, Spam và Lừa đảo.',
                'business.integration.title': 'Tích hợp cơ sở dữ liệu',
                'business.integration.desc': 'Kết nối cơ sở dữ liệu MySQL và tự động phân loại email với API đơn giản hoặc script theo lịch trình.',
                'business.dashboard.title': 'Bảng điều khiển & Phân tích',
                'business.dashboard.desc': 'Xem thống kê và xu hướng phân loại email với giao diện bảng điều khiển đơn giản.',
                'business.button': 'Tìm hiểu thêm về giải pháp doanh nghiệp',
                
                // FAQ Section
                'faq.title': 'Câu hỏi thường gặp',
                'faq.how.title': 'Bộ kiểm tra bảo mật hoạt động như thế nào?',
                'faq.how.answer': 'Hệ thống của chúng tôi phân tích đầu vào (email, URL hoặc số điện thoại) với nhiều cơ sở dữ liệu về các mối đe dọa đã biết, kiểm tra các mẫu đáng ngờ và sử dụng mô hình học máy để đánh giá mức độ rủi ro. Phân tích bao gồm kiểm tra uy tín tên miền, phân tích nội dung và so sánh với các mẫu lừa đảo đã biết.',
                'faq.privacy.title': 'Bạn có lưu trữ thông tin tôi kiểm tra không?',
                'faq.privacy.answer': 'Không, chúng tôi không lưu trữ nội dung cụ thể bạn kiểm tra. Hệ thống của chúng tôi thực hiện phân tích thời gian thực và chỉ giữ lại metadata ẩn danh để cải thiện thuật toán phát hiện. Quyền riêng tư của bạn rất quan trọng đối với chúng tôi.',
                'faq.accuracy.title': 'Kết quả chính xác đến mức nào?',
                'faq.accuracy.answer': 'Hệ thống của chúng tôi có tỷ lệ chính xác cao (hơn 95% dựa trên các bài kiểm tra) để phát hiện các mối đe dọa đã biết. Tuy nhiên, các mối đe dọa mới liên tục xuất hiện, vì vậy chúng tôi khuyên bạn nên sử dụng công cụ này như một trong nhiều biện pháp bảo mật. Luôn sử dụng phán đoán tốt nhất của bạn khi xử lý nội dung đáng ngờ.',
                
                // Footer
                'footer.tagline': 'Bảo vệ người dùng khỏi lừa đảo, scam và nội dung độc hại từ năm 2025.',
                'footer.quick.title': 'Liên kết nhanh',
                'footer.quick.check': 'Kiểm tra an toàn',
                'footer.quick.api': 'Tài liệu API',
                'footer.resources.title': 'Tài nguyên',
                'footer.resources.blog': 'Blog',
                'footer.resources.tips': 'Mẹo bảo mật',
                'footer.resources.examples': 'Ví dụ lừa đảo',
                'footer.resources.report': 'Báo cáo mối đe dọa',
                'footer.connect.title': 'Kết nối với chúng tôi',
                'footer.newsletter': 'Đăng ký nhận bản tin cập nhật bảo mật',
                'footer.newsletter.placeholder': 'Email của bạn',
                'footer.copyright': '© 2025 Security Checker. Tất cả quyền được bảo lưu.'
            }
        };
        
        console.log('LanguageSwitcher constructor called');
        
        // Initialize the language switcher
        this.init();
        
        console.log('LanguageSwitcher initialized');
    }
    
    init() {
        this.setupEventListeners();
        this.loadSavedLanguage();
    }
    
    setupEventListeners() {
        console.log('Setting up event listeners...');
        
        // Desktop language toggle button
        const languageToggle = document.getElementById('languageToggle');
        const languageDropdown = document.getElementById('languageDropdown');
        
        console.log('Desktop elements:', {
            languageToggle: languageToggle,
            languageDropdown: languageDropdown
        });
        
        if (languageToggle) {
            languageToggle.addEventListener('click', (e) => {
                console.log('Desktop language toggle clicked');
                e.preventDefault();
                e.stopPropagation();
                
                // Toggle dropdown visibility
                const isHidden = languageDropdown.classList.contains('hidden');
                console.log('Dropdown hidden:', isHidden);
                
                if (isHidden) {
                    languageDropdown.classList.remove('hidden');
                    languageDropdown.style.display = 'block';
                    languageDropdown.style.visibility = 'visible';
                    languageDropdown.style.opacity = '1';
                } else {
                    languageDropdown.classList.add('hidden');
                    languageDropdown.style.display = 'none';
                }
                
                console.log('Dropdown classes after toggle:', languageDropdown.className);
                console.log('Dropdown style display:', languageDropdown.style.display);
            });
        } else {
            console.error('Desktop language toggle not found');
        }
        
        // Mobile language toggle button
        const mobileLanguageToggle = document.getElementById('mobileLanguageToggle');
        const mobileLanguageDropdown = document.getElementById('mobileLanguageDropdown');
        
        console.log('Mobile elements:', {
            mobileLanguageToggle: mobileLanguageToggle,
            mobileLanguageDropdown: mobileLanguageDropdown
        });
        
        if (mobileLanguageToggle) {
            mobileLanguageToggle.addEventListener('click', (e) => {
                console.log('Mobile language toggle clicked');
                e.preventDefault();
                e.stopPropagation();
                
                // Toggle dropdown visibility
                const isHidden = mobileLanguageDropdown.classList.contains('hidden');
                console.log('Mobile dropdown hidden:', isHidden);
                
                if (isHidden) {
                    mobileLanguageDropdown.classList.remove('hidden');
                    mobileLanguageDropdown.style.display = 'block';
                    mobileLanguageDropdown.style.visibility = 'visible';
                    mobileLanguageDropdown.style.opacity = '1';
                } else {
                    mobileLanguageDropdown.classList.add('hidden');
                    mobileLanguageDropdown.style.display = 'none';
                }
                
                console.log('Mobile dropdown classes after toggle:', mobileLanguageDropdown.className);
                console.log('Mobile dropdown style display:', mobileLanguageDropdown.style.display);
            });
        } else {
            console.error('Mobile language toggle not found');
        }
        
        // Language options (both desktop and mobile)
        const languageOptions = document.querySelectorAll('.language-option');
        console.log('Language options found:', languageOptions.length);
        
        languageOptions.forEach((option, index) => {
            option.addEventListener('click', (e) => {
                console.log('Language option clicked:', option.getAttribute('data-lang'));
                e.preventDefault();
                e.stopPropagation();
                const lang = option.getAttribute('data-lang');
                this.switchLanguage(lang);
                
                // Hide both dropdowns
                if (languageDropdown) {
                    languageDropdown.classList.add('hidden');
                    languageDropdown.style.display = 'none';
                }
                if (mobileLanguageDropdown) {
                    mobileLanguageDropdown.classList.add('hidden');
                    mobileLanguageDropdown.style.display = 'none';
                }
            });
        });
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            // Check if click is outside language toggles and dropdowns
            const isClickInsideLanguageToggle = languageToggle && languageToggle.contains(e.target);
            const isClickInsideMobileLanguageToggle = mobileLanguageToggle && mobileLanguageToggle.contains(e.target);
            const isClickInsideLanguageDropdown = languageDropdown && languageDropdown.contains(e.target);
            const isClickInsideMobileLanguageDropdown = mobileLanguageDropdown && mobileLanguageDropdown.contains(e.target);
            
            if (!isClickInsideLanguageToggle && !isClickInsideMobileLanguageToggle && 
                !isClickInsideLanguageDropdown && !isClickInsideMobileLanguageDropdown) {
                
                console.log('Click outside dropdowns, closing...');
                if (languageDropdown) {
                    languageDropdown.classList.add('hidden');
                    languageDropdown.style.display = 'none';
                }
                if (mobileLanguageDropdown) {
                    mobileLanguageDropdown.classList.add('hidden');
                    mobileLanguageDropdown.style.display = 'none';
                }
            }
        });
        
        console.log('Event listeners setup completed');
    }
    
    loadSavedLanguage() {
        const savedLang = localStorage.getItem('preferred-language');
        if (savedLang && this.translations[savedLang]) {
            this.switchLanguage(savedLang);
        }
    }
    
    switchLanguage(lang) {
        if (!this.translations[lang]) return;
        
        // Add loading state
        const languageToggles = [document.getElementById('languageToggle'), document.getElementById('mobileLanguageToggle')];
        languageToggles.forEach(toggle => {
            if (toggle) {
                toggle.style.opacity = '0.7';
                toggle.style.pointerEvents = 'none';
            }
        });
        
        this.currentLanguage = lang;
        localStorage.setItem('preferred-language', lang);
        
        // Update current language display (desktop and mobile)
        const currentLanguageSpan = document.getElementById('currentLanguage');
        const mobileCurrentLanguageSpan = document.getElementById('mobileCurrentLanguage');
        
        if (currentLanguageSpan) {
            currentLanguageSpan.textContent = lang.toUpperCase();
        }
        if (mobileCurrentLanguageSpan) {
            mobileCurrentLanguageSpan.textContent = lang.toUpperCase();
        }
        
        // Update active state in dropdown
        const languageOptions = document.querySelectorAll('.language-option');
        languageOptions.forEach(option => {
            option.classList.remove('active');
            if (option.getAttribute('data-lang') === lang) {
                option.classList.add('active');
            }
        });
        
        // Update all translatable elements
        this.updatePageContent();
        
        // Update the last updated time with current language
        if (typeof updateLastUpdated === 'function') {
            updateLastUpdated();
        }
        
        // Remove loading state after a short delay
        setTimeout(() => {
            languageToggles.forEach(toggle => {
                if (toggle) {
                    toggle.style.opacity = '1';
                    toggle.style.pointerEvents = 'auto';
                }
            });
        }, 300);
    }
    
    updatePageContent() {
        const lang = this.currentLanguage;
        const t = this.translations[lang];
        
        // Update navigation
        this.updateElement('nav.home', t['nav.home']);
        this.updateElement('nav.businesses', t['nav.businesses']);
        this.updateElement('nav.about', t['nav.about']);
        this.updateElement('nav.contact', t['nav.contact']);
        
        // Update hero section
        this.updateElement('hero.title', t['hero.title']);
        this.updateElement('hero.subtitle', t['hero.subtitle']);
        this.updateElement('hero.input.placeholder', t['hero.input.placeholder']);
        this.updateElement('hero.button', t['hero.button']);
        this.updateElement('hero.file.title', t['hero.file.title']);
        this.updateElement('hero.file.desc', t['hero.file.desc']);
        this.updateElement('hero.file.browse', t['hero.file.browse']);
        this.updateElement('hero.file.analyze', t['hero.file.analyze']);
        this.updateElement('hero.examples.phishing', t['hero.examples.phishing']);
        this.updateElement('hero.examples.fake', t['hero.examples.fake']);
        this.updateElement('hero.examples.scam', t['hero.examples.scam']);
        this.updateElement('hero.examples.suspicious', t['hero.examples.suspicious']);
        this.updateElement('hero.security.note', t['hero.security.note']);
        this.updateElement('hero.database.note', t['hero.database.note']);
        
        // Update the last updated time with current language
        if (typeof updateLastUpdated === 'function') {
            updateLastUpdated();
        }
        
        // Update how it works section
        this.updateElement('how.title', t['how.title']);
        this.updateElement('how.goals.title', t['how.goals.title']);
        this.updateElement('how.goals.table.area', t['how.goals.table.area']);
        this.updateElement('how.goals.table.purpose', t['how.goals.table.purpose']);
        this.updateElement('how.goals.email.content', t['how.goals.email.content']);
        this.updateElement('how.goals.email.content.desc', t['how.goals.email.content.desc']);
        this.updateElement('how.goals.email.links', t['how.goals.email.links']);
        this.updateElement('how.goals.email.links.desc', t['how.goals.email.links.desc']);
        this.updateElement('how.goals.sender', t['how.goals.sender']);
        this.updateElement('how.goals.sender.desc', t['how.goals.sender.desc']);
        this.updateElement('how.goals.attachments', t['how.goals.attachments']);
        this.updateElement('how.goals.attachments.desc', t['how.goals.attachments.desc']);
        this.updateElement('how.goals.phone', t['how.goals.phone']);
        this.updateElement('how.goals.phone.desc', t['how.goals.phone.desc']);
        this.updateElement('how.goals.website', t['how.goals.website']);
        this.updateElement('how.goals.website.desc', t['how.goals.website.desc']);
        this.updateElement('how.step1.title', t['how.step1.title']);
        this.updateElement('how.step1.desc', t['how.step1.desc']);
        this.updateElement('how.step2.title', t['how.step2.title']);
        this.updateElement('how.step2.desc', t['how.step2.desc']);
        this.updateElement('how.step3.title', t['how.step3.title']);
        this.updateElement('how.step3.desc', t['how.step3.desc']);
        
        // Update results section
        this.updateElement('results.title', t['results.title']);
        this.updateElement('results.analyzed', t['results.analyzed']);
        this.updateElement('results.threat.title', t['results.threat.title']);
        this.updateElement('results.threat.db', t['results.threat.db']);
        this.updateElement('results.threat.db.desc', t['results.threat.db.desc']);
        this.updateElement('results.threat.ai', t['results.threat.ai']);
        this.updateElement('results.threat.ai.desc', t['results.threat.ai.desc']);
        this.updateElement('results.threat.first', t['results.threat.first']);
        this.updateElement('results.threat.first.desc', t['results.threat.first.desc']);
        this.updateElement('results.status.title', t['results.status.title']);
        this.updateElement('results.status.safe', t['results.status.safe']);
        this.updateElement('results.status.suspicious', t['results.status.suspicious']);
        this.updateElement('results.status.dangerous', t['results.status.dangerous']);
        this.updateElement('results.status.risk.low', t['results.status.risk.low']);
        this.updateElement('results.status.risk.high', t['results.status.risk.high']);
        this.updateElement('results.category.title', t['results.category.title']);
        this.updateElement('results.details.title', t['results.details.title']);
        this.updateElement('results.details.email', t['results.details.email']);
        this.updateElement('results.details.email.desc', t['results.details.email.desc']);
        this.updateElement('results.details.url', t['results.details.url']);
        this.updateElement('results.details.url.desc', t['results.details.url.desc']);
        this.updateElement('results.details.phone', t['results.details.phone']);
        this.updateElement('results.details.phone.desc', t['results.details.phone.desc']);
        this.updateElement('results.details.sender', t['results.details.sender']);
        this.updateElement('results.details.sender.desc', t['results.details.sender.desc']);
        this.updateElement('results.details.website', t['results.details.website']);
        this.updateElement('results.details.website.desc', t['results.details.website.desc']);
        this.updateElement('results.details.document', t['results.details.document']);
        this.updateElement('results.details.document.desc', t['results.details.document.desc']);
        this.updateElement('results.analysis.title', t['results.analysis.title']);
        this.updateElement('results.analysis.desc', t['results.analysis.desc']);
        this.updateElement('results.analysis.safe', t['results.analysis.safe']);
        this.updateElement('results.analysis.safe_simple', t['results.analysis.safe_simple']);
        this.updateElement('results.analysis.suspicious', t['results.analysis.suspicious']);
        this.updateElement('results.analysis.high_risk', t['results.analysis.high_risk']);
        this.updateElement('results.analysis.dangerous', t['results.analysis.dangerous']);
        this.updateElement('results.analysis.email.basic', t['results.analysis.email.basic']);
        this.updateElement('results.analysis.url.basic', t['results.analysis.url.basic']);
        this.updateElement('results.analysis.phone.basic', t['results.analysis.phone.basic']);
        this.updateElement('results.analysis.sender.basic', t['results.analysis.sender.basic']);
        this.updateElement('results.analysis.website.basic', t['results.analysis.website.basic']);
        this.updateElement('results.analysis.document.basic', t['results.analysis.document.basic']);
        this.updateElement('results.analysis.email.patterns', t['results.analysis.email.patterns']);
        this.updateElement('results.analysis.domain', t['results.analysis.domain']);
        this.updateElement('results.analysis.website.security', t['results.analysis.website.security']);
        this.updateElement('results.analysis.phone.details', t['results.analysis.phone.details']);
        this.updateElement('results.tech.title', t['results.tech.title']);
        this.updateElement('results.tech.list.1', t['results.tech.list.1']);
        this.updateElement('results.tech.list.2', t['results.tech.list.2']);
        this.updateElement('results.tech.list.3', t['results.tech.list.3']);
        this.updateElement('results.tech.list.4', t['results.tech.list.4']);
        this.updateElement('results.tech.list.5', t['results.tech.list.5']);
        this.updateElement('results.recommendations.title', t['results.recommendations.title']);
        this.updateElement('results.recommendations.list.1', t['results.recommendations.list.1']);
        this.updateElement('results.recommendations.list.2', t['results.recommendations.list.2']);
        this.updateElement('results.recommendations.list.3', t['results.recommendations.list.3']);
        this.updateElement('results.recommendations.verify', t['results.recommendations.verify']);
        this.updateElement('results.recommendations.personal', t['results.recommendations.personal']);
        this.updateElement('results.recommendations.password', t['results.recommendations.password']);
        this.updateElement('results.recommendations.report', t['results.recommendations.report']);
        this.updateElement('results.recommendations.avoid', t['results.recommendations.avoid']);
        this.updateElement('results.recommendations.change', t['results.recommendations.change']);
        this.updateElement('results.recommendations.update', t['results.recommendations.update']);
        this.updateElement('results.recommendations.block', t['results.recommendations.block']);
        this.updateElement('results.recommendations.dynamic.1', t['results.recommendations.dynamic.1']);
        this.updateElement('results.recommendations.dynamic.2', t['results.recommendations.dynamic.2']);
        this.updateElement('results.recommendations.dynamic.3', t['results.recommendations.dynamic.3']);
        this.updateElement('results.recommendations.dynamic.4', t['results.recommendations.dynamic.4']);
        this.updateElement('results.recommendations.dynamic.5', t['results.recommendations.dynamic.5']);
        this.updateElement('results.recommendations.dynamic.6', t['results.recommendations.dynamic.6']);
        this.updateElement('results.recommendations.dynamic.7', t['results.recommendations.dynamic.7']);
        this.updateElement('results.recommendations.dynamic.8', t['results.recommendations.dynamic.8']);
        this.updateElement('results.recommendations.dynamic.9', t['results.recommendations.dynamic.9']);
        this.updateElement('results.recommendations.dynamic.10', t['results.recommendations.dynamic.10']);
        this.updateElement('results.recommendations.dynamic.11', t['results.recommendations.dynamic.11']);
        this.updateElement('results.recommendations.dynamic.12', t['results.recommendations.dynamic.12']);
        this.updateElement('results.actions.share', t['results.actions.share']);
        this.updateElement('results.actions.download', t['results.actions.download']);
        this.updateElement('results.actions.report', t['results.actions.report']);
        
        // Update business section
        this.updateElement('business.title', t['business.title']);
        this.updateElement('business.subtitle', t['business.subtitle']);
        this.updateElement('business.integration.title', t['business.integration.title']);
        this.updateElement('business.integration.desc', t['business.integration.desc']);
        this.updateElement('business.dashboard.title', t['business.dashboard.title']);
        this.updateElement('business.dashboard.desc', t['business.dashboard.desc']);
        this.updateElement('business.button', t['business.button']);
        
        // Update FAQ section
        this.updateElement('faq.title', t['faq.title']);
        this.updateElement('faq.how.title', t['faq.how.title']);
        this.updateElement('faq.how.answer', t['faq.how.answer']);
        this.updateElement('faq.privacy.title', t['faq.privacy.title']);
        this.updateElement('faq.privacy.answer', t['faq.privacy.answer']);
        this.updateElement('faq.accuracy.title', t['faq.accuracy.title']);
        this.updateElement('faq.accuracy.answer', t['faq.accuracy.answer']);
        
        // Update footer
        this.updateElement('footer.tagline', t['footer.tagline']);
        this.updateElement('footer.quick.title', t['footer.quick.title']);
        this.updateElement('footer.quick.check', t['footer.quick.check']);
        this.updateElement('footer.quick.api', t['footer.quick.api']);
        this.updateElement('footer.resources.title', t['footer.resources.title']);
        this.updateElement('footer.resources.blog', t['footer.resources.blog']);
        this.updateElement('footer.resources.tips', t['footer.resources.tips']);
        this.updateElement('footer.resources.examples', t['footer.resources.examples']);
        this.updateElement('footer.resources.report', t['footer.resources.report']);
        this.updateElement('footer.connect.title', t['footer.connect.title']);
        this.updateElement('footer.newsletter', t['footer.newsletter']);
        this.updateElement('footer.newsletter.placeholder', t['footer.newsletter.placeholder'], 'placeholder');
        this.updateElement('footer.copyright', t['footer.copyright']);
        
        // Update dynamic results if they exist
        this.updateDynamicResults();
    }
    
    updateDynamicResults() {
        const lang = this.currentLanguage;
        const t = this.translations[lang];
        
        // Update status text if it exists
        const statusText = document.getElementById('statusText');
        const categoryText = document.getElementById('categoryText');
        const categoryBadge = document.getElementById('categoryBadge');
        
        if (statusText && statusText.textContent === 'Safe') {
            statusText.textContent = t['results.status.safe'];
        } else if (statusText && statusText.textContent === 'Suspicious') {
            statusText.textContent = t['results.status.suspicious'];
        } else if (statusText && statusText.textContent === 'Dangerous') {
            statusText.textContent = t['results.status.dangerous'];
        }
        
        if (categoryText && categoryText.textContent === 'Safe') {
            categoryText.textContent = t['results.status.safe'];
        } else if (categoryText && categoryText.textContent === 'Suspicious') {
            categoryText.textContent = t['results.status.suspicious'];
        } else if (categoryText && categoryText.textContent === 'Dangerous') {
            categoryText.textContent = t['results.status.dangerous'];
        }
        
        if (categoryBadge && categoryBadge.textContent === 'Safe') {
            categoryBadge.textContent = t['results.status.safe'];
        } else if (categoryBadge && categoryBadge.textContent === 'Suspicious') {
            categoryBadge.textContent = t['results.status.suspicious'];
        } else if (categoryBadge && categoryBadge.textContent === 'Dangerous') {
            categoryBadge.textContent = t['results.status.dangerous'];
        }
        
        // Update recommendations if they exist
        this.updateRecommendations();
        
        // Update analysis details if they exist
        this.updateAnalysisDetails();
    }
    
    updateAnalysisDetails() {
        const detailsText = document.getElementById('detailsText');
        if (!detailsText) return;
        
        const lang = this.currentLanguage;
        const t = this.translations[lang];
        
        // Get original text if stored
        const originalText = detailsText.getAttribute('data-original') || detailsText.textContent;
        if (!detailsText.getAttribute('data-original')) {
            detailsText.setAttribute('data-original', originalText);
        }
        
        // Try to find translation for details
        const lowerText = originalText.toLowerCase();
        let translatedText = originalText;
        
        if (lowerText.includes('safe') && lowerText.includes('no significant')) {
            translatedText = t['results.analysis.safe'] || originalText;
        } else if (lowerText.includes('suspicious') && lowerText.includes('characteristics')) {
            translatedText = t['results.analysis.suspicious'] || originalText;
        } else if (lowerText.includes('highly suspicious')) {
            translatedText = t['results.analysis.high_risk'] || originalText;
        } else if (lowerText.includes('extremely dangerous')) {
            translatedText = t['results.analysis.dangerous'] || originalText;
        } else if (lowerText.includes('appears to be safe')) {
            translatedText = t['results.analysis.safe_simple'] || originalText;
        }
        
        detailsText.textContent = translatedText;
        
        // Update analysis results
        this.updateAnalysisResults();
    }
    
    updateAnalysisResults() {
        const lang = this.currentLanguage;
        const t = this.translations[lang];
        
        const updateElement = (elementId, originalText) => {
            const element = document.getElementById(elementId);
            if (!element) return;
            
            // Get original text if stored
            const storedOriginal = element.getAttribute('data-original') || originalText;
            if (!element.getAttribute('data-original')) {
                element.setAttribute('data-original', storedOriginal);
            }
            
            const lowerText = storedOriginal.toLowerCase();
            let translatedText = storedOriginal;
            
            if (lowerText.includes('basic email analysis')) {
                translatedText = t['results.analysis.email.basic'] || storedOriginal;
            } else if (lowerText.includes('basic url analysis')) {
                translatedText = t['results.analysis.url.basic'] || storedOriginal;
            } else if (lowerText.includes('basic phone analysis')) {
                translatedText = t['results.analysis.phone.basic'] || storedOriginal;
            } else if (lowerText.includes('basic sender verification')) {
                translatedText = t['results.analysis.sender.basic'] || storedOriginal;
            } else if (lowerText.includes('basic website analysis')) {
                translatedText = t['results.analysis.website.basic'] || storedOriginal;
            } else if (lowerText.includes('basic document analysis')) {
                translatedText = t['results.analysis.document.basic'] || storedOriginal;
            } else if (lowerText.includes('suspicious patterns')) {
                translatedText = t['results.analysis.email.patterns'] || storedOriginal;
            } else if (lowerText.includes('domain analysis')) {
                translatedText = t['results.analysis.domain'] || storedOriginal;
            } else if (lowerText.includes('website security')) {
                translatedText = t['results.analysis.website.security'] || storedOriginal;
            } else if (lowerText.includes('phone number from')) {
                translatedText = t['results.analysis.phone.details'] || storedOriginal;
            }
            
            element.textContent = translatedText;
        };
        
        // Update all analysis result elements
        const analysisElements = [
            'emailContent',
            'urlAnalysis', 
            'phoneCheck',
            'senderCheck',
            'websiteCheck',
            'docCheck'
        ];
        
        analysisElements.forEach(elementId => {
            const element = document.getElementById(elementId);
            if (element) {
                updateElement(elementId, element.textContent);
            }
        });
    }
    
    updateRecommendations() {
        const recommendationsList = document.getElementById('recommendationsList');
        if (!recommendationsList) return;
        
        const lang = this.currentLanguage;
        const t = this.translations[lang];
        
        // Get all recommendation items
        const items = recommendationsList.querySelectorAll('li');
        items.forEach((item, index) => {
            const originalText = item.getAttribute('data-original') || item.textContent;
            if (!item.getAttribute('data-original')) {
                item.setAttribute('data-original', originalText);
            }
            
            // Try to find translation
            const recKey = `results.recommendations.dynamic.${index + 1}`;
            if (t[recKey]) {
                item.textContent = t[recKey];
            } else {
                // Fallback to pattern matching
                const lowerText = originalText.toLowerCase();
                if (lowerText.includes('verify') || lowerText.includes('sender')) {
                    item.textContent = t['results.recommendations.verify'] || originalText;
                } else if (lowerText.includes('personal') || lowerText.includes('financial')) {
                    item.textContent = t['results.recommendations.personal'] || originalText;
                } else if (lowerText.includes('password') || lowerText.includes('authentication')) {
                    item.textContent = t['results.recommendations.password'] || originalText;
                } else if (lowerText.includes('report') || lowerText.includes('authorities')) {
                    item.textContent = t['results.recommendations.report'] || originalText;
                } else if (lowerText.includes('avoid') || lowerText.includes('interacting')) {
                    item.textContent = t['results.recommendations.avoid'] || originalText;
                } else if (lowerText.includes('change') || lowerText.includes('password')) {
                    item.textContent = t['results.recommendations.change'] || originalText;
                } else if (lowerText.includes('software') || lowerText.includes('antivirus')) {
                    item.textContent = t['results.recommendations.update'] || originalText;
                } else if (lowerText.includes('block') || lowerText.includes('source')) {
                    item.textContent = t['results.recommendations.block'] || originalText;
                }
            }
        });
    }
    
    // Public method to update results language
    updateResultsLanguage() {
        this.updateDynamicResults();
    }
    
    // Get current language
    getCurrentLanguage() {
        return this.currentLanguage;
    }
    
    // Get translation for a specific key
    getTranslation(key) {
        return this.translations[this.currentLanguage][key] || key;
    }
    
    updateElement(key, text, attribute = 'textContent') {
        const elements = document.querySelectorAll(`[data-translate="${key}"]`);
        elements.forEach(element => {
            if (attribute === 'textContent') {
                element.textContent = text;
            } else if (attribute === 'placeholder') {
                element.placeholder = text;
            }
        });
        
        // Special handling for input placeholder
        if (key === 'hero.input.placeholder') {
            const inputElement = document.getElementById('inputValue');
            if (inputElement) {
                inputElement.placeholder = text;
            }
        }
    }
}

// Initialize language switcher when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.languageSwitcher = new LanguageSwitcher();
});

// Global function to update results language (for other scripts to use)
window.updateResultsLanguage = function() {
    if (window.languageSwitcher) {
        window.languageSwitcher.updateResultsLanguage();
    }
};

// Global function to get translation
window.getTranslation = function(key) {
    if (window.languageSwitcher) {
        return window.languageSwitcher.getTranslation(key);
    }
    return key;
}; 