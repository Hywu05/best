// ========================================
// CONTENT ANALYZER - SCAM DETECTION
// ========================================

// Suspicious keywords and patterns
const SUSPICIOUS_PATTERNS = {
    // Vietnamese scam keywords
    vietnamese: {
        urgent: [
            'khẩn cấp', 'gấp', 'ngay lập tức', 'trong vòng 24h', 'cuối ngày',
            'hết hạn', 'sắp hết', 'cuối cùng', 'cơ hội cuối'
        ],
        money: [
            'trúng thưởng', 'nhận tiền', 'chuyển khoản', 'rút tiền', 'nhận quà',
            'giải thưởng', 'tiền thưởng', 'quà tặng', 'hoàn tiền', 'bồi thường'
        ],
        account: [
            'khóa tài khoản', 'xác minh tài khoản', 'cập nhật thông tin',
            'bảo mật tài khoản', 'kiểm tra tài khoản', 'xác thực tài khoản'
        ],
        personal: [
            'CMND', 'CCCD', 'căn cước', 'hộ chiếu', 'thẻ ngân hàng',
            'mật khẩu', 'OTP', 'mã xác thực', 'thông tin cá nhân'
        ],
        threats: [
            'sẽ bị khóa', 'sẽ bị phạt', 'sẽ bị tịch thu', 'sẽ bị đình chỉ',
            'sẽ bị chặn', 'sẽ bị xóa', 'sẽ bị hủy'
        ],
        free: [
            'miễn phí', '0 đồng', 'không mất tiền', 'hoàn toàn miễn phí',
            'tặng không', 'cho không', 'không tốn tiền'
        ]
    },
    
    // English scam keywords
    english: {
        urgent: [
            'urgent', 'immediate', 'within 24 hours', 'last chance', 'expires today',
            'final notice', 'deadline', 'limited time', 'act now'
        ],
        money: [
            'you won', 'claim your prize', 'transfer money', 'withdraw funds',
            'receive payment', 'cash reward', 'lottery winner', 'inheritance'
        ],
        account: [
            'account suspended', 'verify account', 'update information',
            'security check', 'account locked', 'confirm details'
        ],
        personal: [
            'SSN', 'social security', 'credit card', 'bank account',
            'password', 'PIN', 'verification code', 'personal information'
        ],
        threats: [
            'will be suspended', 'will be fined', 'will be seized',
            'will be blocked', 'will be deleted', 'will be cancelled'
        ],
        free: [
            'free', 'no cost', 'no charge', 'completely free',
            'gift', 'no payment required', 'zero cost'
        ]
    }
};

// Suspicious patterns and regex
const CONTENT_PATTERNS = {
    // Email patterns
    email: {
        // Suspicious email subjects
        subjects: [
            /(?:urgent|khẩn cấp|gấp|immediate)/i,
            /(?:account|tài khoản).*(?:suspended|locked|khóa|đình chỉ)/i,
            /(?:verify|xác minh).*(?:account|tài khoản)/i,
            /(?:security|bảo mật).*(?:check|kiểm tra)/i,
            /(?:prize|thưởng|won|trúng)/i,
            /(?:inheritance|thừa kế|legacy)/i,
            /(?:lottery|xổ số|winner|người thắng)/i
        ],
        
        // Suspicious email content
        content: [
            /(?:click|nhấp).*(?:here|đây)/i,
            /(?:verify|xác minh).*(?:now|ngay)/i,
            /(?:confirm|xác nhận).*(?:details|thông tin)/i,
            /(?:update|cập nhật).*(?:information|thông tin)/i,
            /(?:login|đăng nhập).*(?:immediately|ngay lập tức)/i,
            /(?:password|mật khẩu).*(?:expired|hết hạn)/i,
            /(?:account|tài khoản).*(?:compromised|bị xâm phạm)/i
        ]
    },
    
    // SMS/Text patterns
    sms: {
        // Suspicious SMS content
        content: [
            /(?:won|trúng).*(?:prize|thưởng)/i,
            /(?:claim|nhận).*(?:reward|phần thưởng)/i,
            /(?:urgent|khẩn cấp).*(?:action|hành động)/i,
            /(?:account|tài khoản).*(?:locked|khóa)/i,
            /(?:verify|xác minh).*(?:now|ngay)/i,
            /(?:click|nhấp).*(?:link|liên kết)/i,
            /(?:free|miễn phí).*(?:gift|quà)/i
        ]
    },
    
    // Phone call patterns
    phone: {
        // Suspicious call scripts
        scripts: [
            /(?:microsoft|windows).*(?:support|hỗ trợ)/i,
            /(?:irs|tax).*(?:refund|hoàn thuế)/i,
            /(?:social security|an sinh xã hội)/i,
            /(?:car warranty|bảo hành xe)/i,
            /(?:student loan|vay sinh viên)/i,
            /(?:credit card|thẻ tín dụng).*(?:fraud|gian lận)/i,
            /(?:bank|ngân hàng).*(?:security|bảo mật)/i
        ]
    }
};

// Suspicious promises and offers
const SUSPICIOUS_OFFERS = {
    // Too good to be true offers
    unrealistic: [
        'trúng thưởng 1 tỷ đồng',
        'nhận tiền miễn phí',
        'học phí 0 đồng',
        'chuyển khoản nhanh',
        'kiếm tiền dễ dàng',
        'làm giàu nhanh chóng',
        'thu nhập khủng',
        'lợi nhuận cao',
        'đầu tư an toàn 100%',
        'không rủi ro'
    ],
    
    // Pressure tactics
    pressure: [
        'chỉ còn 1 suất',
        'hết hạn hôm nay',
        'cơ hội cuối cùng',
        'không bỏ lỡ',
        'đăng ký ngay',
        'không chờ đợi',
        'quyết định ngay',
        'không suy nghĩ'
    ],
    
    // Emotional manipulation
    emotional: [
        'đừng để người khác nhận',
        'bạn sẽ hối tiếc',
        'không ai cho không',
        'cơ hội hiếm có',
        'chỉ dành cho bạn',
        'đặc biệt cho bạn',
        'ưu đãi độc quyền'
    ]
};

/**
 * Analyze free-form content for scam detection
 * @param {string} content - Content to analyze
 * @param {string} type - Content type ('email', 'sms', 'phone', 'general')
 * @returns {object} Analysis results
 */
function analyzeContent(content) {
    const results = {
        isSafe: true,
        riskLevel: 'low',
        warnings: [],
        score: 100,
        details: {
            suspiciousKeywords: [],
            suspiciousPatterns: [],
            suspiciousOffers: [],
            language: 'unknown',
            wordCount: 0,
            hasUrgency: false,
            hasMoneyPromises: false,
            hasPersonalInfo: false,
            hasThreats: false
        }
    };

    try {
        // Normalize content
        const normalizedContent = content.toLowerCase().trim();
        results.details.wordCount = normalizedContent.split(/\s+/).length;

        // Detect language
        const language = detectLanguage(normalizedContent);
        results.details.language = language;

        // Analyze based on language
        const patterns = language === 'vietnamese' ? SUSPICIOUS_PATTERNS.vietnamese : SUSPICIOUS_PATTERNS.english;

        // Check for urgent language
        if (hasUrgency(normalizedContent, patterns.urgent)) {
            results.details.hasUrgency = true;
            results.warnings.push('Content uses urgent language');
            results.score -= 15;
        }

        // Check for money promises
        if (hasMoneyPromises(normalizedContent, patterns.money)) {
            results.details.hasMoneyPromises = true;
            results.warnings.push('Content promises money or prizes');
            results.score -= 25;
        }

        // Check for personal information requests
        if (hasPersonalInfo(normalizedContent, patterns.personal)) {
            results.details.hasPersonalInfo = true;
            results.warnings.push('Content requests personal information');
            results.score -= 20;
        }

        // Check for threats
        if (hasThreats(normalizedContent, patterns.threats)) {
            results.details.hasThreats = true;
            results.warnings.push('Content contains threats');
            results.score -= 30;
        }

        // Check for suspicious offers
        const suspiciousOffers = findSuspiciousOffers(normalizedContent);
        if (suspiciousOffers.length > 0) {
            results.details.suspiciousOffers = suspiciousOffers;
            results.warnings.push('Content contains suspicious offers');
            results.score -= 20;
        }

        // Check for suspicious patterns
        const suspiciousPatterns = findSuspiciousPatterns(normalizedContent);
        if (suspiciousPatterns.length > 0) {
            results.details.suspiciousPatterns = suspiciousPatterns;
            results.warnings.push('Content contains suspicious patterns');
            results.score -= 15;
        }

        // Determine risk level
        if (results.score >= 80) {
            results.riskLevel = 'low';
        } else if (results.score >= 60) {
            results.riskLevel = 'medium';
        } else if (results.score >= 40) {
            results.riskLevel = 'high';
        } else {
            results.riskLevel = 'critical';
        }

        results.isSafe = results.score >= 60;

    } catch (error) {
        results.warnings.push('Error analyzing content');
        results.score = 0;
        results.isSafe = false;
        results.riskLevel = 'critical';
    }

    return results;
}

/**
 * Detect language of content
 * @param {string} content - Normalized content
 * @returns {string} Language ('vietnamese', 'english', 'unknown')
 */
function detectLanguage(content) {
    const vietnameseWords = ['khẩn cấp', 'tài khoản', 'xác minh', 'bảo mật', 'thưởng', 'miễn phí'];
    const englishWords = ['urgent', 'account', 'verify', 'security', 'prize', 'free'];
    
    const vietnameseCount = vietnameseWords.filter(word => content.includes(word)).length;
    const englishCount = englishWords.filter(word => content.includes(word)).length;
    
    if (vietnameseCount > englishCount) {
        return 'vietnamese';
    } else if (englishCount > vietnameseCount) {
        return 'english';
    }
    
    return 'unknown';
}

/**
 * Check for urgent language
 * @param {string} content - Normalized content
 * @param {array} urgentWords - Array of urgent words
 * @returns {boolean} True if urgent language found
 */
function hasUrgency(content, urgentWords) {
    return urgentWords.some(word => content.includes(word));
}

/**
 * Check for money promises
 * @param {string} content - Normalized content
 * @param {array} moneyWords - Array of money-related words
 * @returns {boolean} True if money promises found
 */
function hasMoneyPromises(content, moneyWords) {
    return moneyWords.some(word => content.includes(word));
}

/**
 * Check for personal information requests
 * @param {string} content - Normalized content
 * @param {array} personalWords - Array of personal info words
 * @returns {boolean} True if personal info requests found
 */
function hasPersonalInfo(content, personalWords) {
    return personalWords.some(word => content.includes(word));
}

/**
 * Check for threats
 * @param {string} content - Normalized content
 * @param {array} threatWords - Array of threat words
 * @returns {boolean} True if threats found
 */
function hasThreats(content, threatWords) {
    return threatWords.some(word => content.includes(word));
}

/**
 * Find suspicious offers in content
 * @param {string} content - Normalized content
 * @returns {array} Array of suspicious offers found
 */
function findSuspiciousOffers(content) {
    const foundOffers = [];
    
    // Check unrealistic offers
    SUSPICIOUS_OFFERS.unrealistic.forEach(offer => {
        if (content.includes(offer.toLowerCase())) {
            foundOffers.push(offer);
        }
    });
    
    // Check pressure tactics
    SUSPICIOUS_OFFERS.pressure.forEach(offer => {
        if (content.includes(offer.toLowerCase())) {
            foundOffers.push(offer);
        }
    });
    
    // Check emotional manipulation
    SUSPICIOUS_OFFERS.emotional.forEach(offer => {
        if (content.includes(offer.toLowerCase())) {
            foundOffers.push(offer);
        }
    });
    
    return foundOffers;
}

/**
 * Find suspicious patterns in content
 * @param {string} content - Normalized content
 * @returns {array} Array of suspicious patterns found
 */
function findSuspiciousPatterns(content) {
    const foundPatterns = [];
    
    // Check email patterns
    CONTENT_PATTERNS.email.subjects.forEach(pattern => {
        if (pattern.test(content)) {
            foundPatterns.push('Suspicious email subject pattern');
        }
    });
    
    CONTENT_PATTERNS.email.content.forEach(pattern => {
        if (pattern.test(content)) {
            foundPatterns.push('Suspicious email content pattern');
        }
    });
    
    // Check SMS patterns
    CONTENT_PATTERNS.sms.content.forEach(pattern => {
        if (pattern.test(content)) {
            foundPatterns.push('Suspicious SMS pattern');
        }
    });
    
    // Check phone patterns
    CONTENT_PATTERNS.phone.scripts.forEach(pattern => {
        if (pattern.test(content)) {
            foundPatterns.push('Suspicious phone call script');
        }
    });
    
    return foundPatterns;
}

/**
 * Get detailed content analysis report
 * @param {string} content - Content to analyze
 * @returns {object} Detailed analysis report
 */
function getDetailedContentReport(content) {
    const analysis = analyzeContent(content);
    
    return {
        ...analysis,
        recommendations: generateContentRecommendations(analysis),
        technicalDetails: {
            originalContent: content,
            normalizedContent: content.toLowerCase().trim(),
            characterCount: content.length,
            wordCount: analysis.details.wordCount,
            language: analysis.details.language
        }
    };
}

/**
 * Generate content recommendations
 * @param {object} analysis - Analysis results
 * @returns {array} Array of recommendations
 */
function generateContentRecommendations(analysis) {
    const recommendations = [];

    if (analysis.details.hasUrgency) {
        recommendations.push('Content uses urgent language - be cautious');
        recommendations.push('Legitimate organizations rarely use extreme urgency');
        recommendations.push('Take time to verify the source');
    }

    if (analysis.details.hasMoneyPromises) {
        recommendations.push('Content promises money or prizes - likely a scam');
        recommendations.push('If it sounds too good to be true, it probably is');
        recommendations.push('Do not provide personal or financial information');
    }

    if (analysis.details.hasPersonalInfo) {
        recommendations.push('Content requests personal information - be very cautious');
        recommendations.push('Verify the source through official channels');
        recommendations.push('Never share sensitive information via email or text');
    }

    if (analysis.details.hasThreats) {
        recommendations.push('Content contains threats - this is a red flag');
        recommendations.push('Legitimate organizations do not threaten customers');
        recommendations.push('Do not respond to threatening messages');
    }

    if (analysis.details.suspiciousOffers.length > 0) {
        recommendations.push('Content contains suspicious offers');
        recommendations.push('Be wary of unrealistic promises');
        recommendations.push('Research the company or organization');
    }

    if (analysis.details.suspiciousPatterns.length > 0) {
        recommendations.push('Content contains suspicious patterns');
        recommendations.push('This may be a phishing attempt');
        recommendations.push('Contact the organization directly to verify');
    }

    if (analysis.riskLevel === 'critical') {
        recommendations.push('HIGH RISK: This content is highly suspicious');
        recommendations.push('Do not interact with this content');
        recommendations.push('Report this to relevant authorities');
    }

    return recommendations;
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        analyzeContent,
        getDetailedContentReport,
        detectLanguage,
        hasUrgency,
        hasMoneyPromises,
        hasPersonalInfo,
        hasThreats,
        findSuspiciousOffers,
        findSuspiciousPatterns,
        generateContentRecommendations
    };
} 