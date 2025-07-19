// ========================================
// PHONE ANALYZER - SCAM DETECTION
// ========================================

// Vietnamese mobile prefixes
const VIETNAM_MOBILE_PREFIXES = {
    viettel: ['032', '033', '034', '035', '036', '037', '038', '039', '086', '096', '097', '098'],
    vinaphone: ['081', '082', '083', '084', '085', '088', '091', '094'],
    mobifone: ['070', '076', '077', '078', '079', '089', '090', '093'],
    vietnamobile: ['052', '056', '058', '092'],
    gmobile: ['059', '099'],
    itelecom: ['087']
};

// International country codes (suspicious ones)
const SUSPICIOUS_COUNTRY_CODES = {
    nigeria: ['+234'],
    ghana: ['+233'],
    kenya: ['+254'],
    southAfrica: ['+27'],
    india: ['+91'],
    pakistan: ['+92'],
    bangladesh: ['+880'],
    thailand: ['+66'],
    cambodia: ['+855'],
    laos: ['+856'],
    myanmar: ['+95']
};

// Known scam number patterns
const SCAM_PATTERNS = {
    // Vietnamese scam numbers (example patterns)
    vietnamScams: [
        '0123456789', '0987654321', '0000000000', '1111111111',
        '01234567890', '09876543210'
    ],
    
    // International scam patterns
    internationalScams: [
        '+234', '+233', '+254', '+91', '+92', '+880' // Common scam countries
    ],
    
    // Premium rate numbers
    premiumRate: [
        '1900', '1800', '1901', '1902', '1903', '1904', '1905'
    ]
};

// Bank account patterns for Vietnamese banks
const BANK_ACCOUNT_PATTERNS = {
    vietcombank: {
        pattern: /^(\d{2})(\d{2})(\d{2})(\d{9})$/,
        prefix: ['970436', '970436', '970436'],
        name: 'Vietcombank'
    },
    agribank: {
        pattern: /^(\d{2})(\d{2})(\d{2})(\d{9})$/,
        prefix: ['970403', '970403', '970403'],
        name: 'Agribank'
    },
    bidv: {
        pattern: /^(\d{2})(\d{2})(\d{2})(\d{9})$/,
        prefix: ['970418', '970418', '970418'],
        name: 'BIDV'
    },
    techcombank: {
        pattern: /^(\d{2})(\d{2})(\d{2})(\d{9})$/,
        prefix: ['970407', '970407', '970407'],
        name: 'Techcombank'
    },
    sacombank: {
        pattern: /^(\d{2})(\d{2})(\d{2})(\d{9})$/,
        prefix: ['970403', '970403', '970403'],
        name: 'Sacombank'
    }
};

/**
 * Analyze phone number for scam detection
 * @param {string} phoneNumber - Phone number to analyze
 * @returns {object} Analysis results
 */
function analyzePhoneNumber(phoneNumber) {
    const results = {
        isSafe: true,
        riskLevel: 'low',
        warnings: [],
        score: 100,
        details: {
            country: 'Unknown',
            carrier: 'Unknown',
            isInternational: false,
            isSuspiciousCountry: false,
            isKnownScam: false,
            isPremiumRate: false,
            isValidFormat: false
        }
    };

    try {
        // Clean phone number
        const cleanNumber = cleanPhoneNumber(phoneNumber);
        
        // Check if it's a valid phone number
        if (!isValidPhoneNumber(cleanNumber)) {
            results.warnings.push('Invalid phone number format');
            results.score -= 50;
            return results;
        }

        results.details.isValidFormat = true;

        // Check if international
        if (isInternationalNumber(cleanNumber)) {
            results.details.isInternational = true;
            results.details.country = detectCountry(cleanNumber);
            
            // Check for suspicious countries
            if (isSuspiciousCountry(cleanNumber)) {
                results.details.isSuspiciousCountry = true;
                results.warnings.push(`Number from suspicious country: ${results.details.country}`);
                results.score -= 40;
            }
        } else {
            // Vietnamese number analysis
            results.details.country = 'Vietnam';
            results.details.carrier = detectVietnameseCarrier(cleanNumber);
            
            // Check for known scam patterns
            if (isKnownScamNumber(cleanNumber)) {
                results.details.isKnownScam = true;
                results.warnings.push('Number matches known scam patterns');
                results.score -= 60;
            }
        }

        // Check for premium rate numbers
        if (isPremiumRateNumber(cleanNumber)) {
            results.details.isPremiumRate = true;
            results.warnings.push('Premium rate number detected');
            results.score -= 30;
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
        results.warnings.push('Error analyzing phone number');
        results.score = 0;
        results.isSafe = false;
        results.riskLevel = 'critical';
    }

    return results;
}

/**
 * Analyze bank account number
 * @param {string} accountNumber - Bank account number to analyze
 * @returns {object} Analysis results
 */
function analyzeBankAccount(accountNumber) {
    const results = {
        isSafe: true,
        riskLevel: 'low',
        warnings: [],
        score: 100,
        details: {
            bank: 'Unknown',
            isValidFormat: false,
            isKnownPattern: false,
            accountType: 'Unknown'
        }
    };

    try {
        // Clean account number
        const cleanAccount = cleanAccountNumber(accountNumber);
        
        // Check if valid format
        if (!isValidAccountNumber(cleanAccount)) {
            results.warnings.push('Invalid account number format');
            results.score -= 50;
            return results;
        }

        results.details.isValidFormat = true;

        // Detect bank
        const bankInfo = detectBank(cleanAccount);
        if (bankInfo) {
            results.details.bank = bankInfo.name;
            results.details.isKnownPattern = true;
            results.details.accountType = 'Standard';
        } else {
            results.warnings.push('Unknown bank pattern');
            results.score -= 20;
        }

        // Check for suspicious patterns
        if (hasSuspiciousAccountPattern(cleanAccount)) {
            results.warnings.push('Suspicious account number pattern');
            results.score -= 30;
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
        results.warnings.push('Error analyzing account number');
        results.score = 0;
        results.isSafe = false;
        results.riskLevel = 'critical';
    }

    return results;
}

/**
 * Clean phone number by removing non-digits and spaces
 * @param {string} phoneNumber - Raw phone number
 * @returns {string} Cleaned phone number
 */
function cleanPhoneNumber(phoneNumber) {
    return phoneNumber.replace(/[\s\-\(\)\.]/g, '');
}

/**
 * Clean account number
 * @param {string} accountNumber - Raw account number
 * @returns {string} Cleaned account number
 */
function cleanAccountNumber(accountNumber) {
    return accountNumber.replace(/[\s\-]/g, '');
}

/**
 * Check if phone number is valid
 * @param {string} phoneNumber - Clean phone number
 * @returns {boolean} True if valid
 */
function isValidPhoneNumber(phoneNumber) {
    // Vietnamese numbers: 10-11 digits
    // International: +country code + number
    const vietnamesePattern = /^(0|\+84)?[0-9]{9,10}$/;
    const internationalPattern = /^\+[0-9]{1,4}[0-9]{6,15}$/;
    
    return vietnamesePattern.test(phoneNumber) || internationalPattern.test(phoneNumber);
}

/**
 * Check if account number is valid
 * @param {string} accountNumber - Clean account number
 * @returns {boolean} True if valid
 */
function isValidAccountNumber(accountNumber) {
    // Vietnamese bank accounts: 12-16 digits
    return /^[0-9]{12,16}$/.test(accountNumber);
}

/**
 * Check if number is international
 * @param {string} phoneNumber - Clean phone number
 * @returns {boolean} True if international
 */
function isInternationalNumber(phoneNumber) {
    return phoneNumber.startsWith('+');
}

/**
 * Detect country from international number
 * @param {string} phoneNumber - International phone number
 * @returns {string} Country name
 */
function detectCountry(phoneNumber) {
    for (const [country, codes] of Object.entries(SUSPICIOUS_COUNTRY_CODES)) {
        if (codes.some(code => phoneNumber.startsWith(code))) {
            return country;
        }
    }
    return 'Unknown';
}

/**
 * Check if number is from suspicious country
 * @param {string} phoneNumber - International phone number
 * @returns {boolean} True if suspicious country
 */
function isSuspiciousCountry(phoneNumber) {
    return Object.values(SUSPICIOUS_COUNTRY_CODES).flat().some(code => 
        phoneNumber.startsWith(code)
    );
}

/**
 * Detect Vietnamese mobile carrier
 * @param {string} phoneNumber - Vietnamese phone number
 * @returns {string} Carrier name
 */
function detectVietnameseCarrier(phoneNumber) {
    // Remove country code if present
    const number = phoneNumber.replace(/^(\+84|84)/, '0');
    
    for (const [carrier, prefixes] of Object.entries(VIETNAM_MOBILE_PREFIXES)) {
        if (prefixes.some(prefix => number.startsWith(prefix))) {
            return carrier;
        }
    }
    return 'Unknown';
}

/**
 * Check if number is known scam
 * @param {string} phoneNumber - Clean phone number
 * @returns {boolean} True if known scam
 */
function isKnownScamNumber(phoneNumber) {
    return SCAM_PATTERNS.vietnamScams.includes(phoneNumber) ||
           SCAM_PATTERNS.internationalScams.some(pattern => 
               phoneNumber.startsWith(pattern)
           );
}

/**
 * Check if number is premium rate
 * @param {string} phoneNumber - Clean phone number
 * @returns {boolean} True if premium rate
 */
function isPremiumRateNumber(phoneNumber) {
    return SCAM_PATTERNS.premiumRate.some(prefix => 
        phoneNumber.startsWith(prefix)
    );
}

/**
 * Detect bank from account number
 * @param {string} accountNumber - Clean account number
 * @returns {object|null} Bank info or null
 */
function detectBank(accountNumber) {
    for (const [bankCode, bankInfo] of Object.entries(BANK_ACCOUNT_PATTERNS)) {
        if (bankInfo.pattern.test(accountNumber)) {
            return bankInfo;
        }
    }
    return null;
}

/**
 * Check for suspicious account patterns
 * @param {string} accountNumber - Clean account number
 * @returns {boolean} True if suspicious
 */
function hasSuspiciousAccountPattern(accountNumber) {
    // Check for repeated digits
    if (/(\d)\1{5,}/.test(accountNumber)) {
        return true;
    }
    
    // Check for sequential digits
    if (/(012345|123456|234567|345678|456789|987654|876543|765432|654321)/.test(accountNumber)) {
        return true;
    }
    
    return false;
}

/**
 * Get detailed phone analysis report
 * @param {string} phoneNumber - Phone number to analyze
 * @returns {object} Detailed analysis report
 */
function getDetailedPhoneReport(phoneNumber) {
    const analysis = analyzePhoneNumber(phoneNumber);
    
    return {
        ...analysis,
        recommendations: generatePhoneRecommendations(analysis),
        technicalDetails: {
            originalNumber: phoneNumber,
            cleanNumber: cleanPhoneNumber(phoneNumber),
            length: cleanPhoneNumber(phoneNumber).length,
            countryCode: analysis.details.isInternational ? 
                cleanPhoneNumber(phoneNumber).match(/^\+(\d+)/)?.[1] : null
        }
    };
}

/**
 * Generate phone recommendations
 * @param {object} analysis - Analysis results
 * @returns {array} Array of recommendations
 */
function generatePhoneRecommendations(analysis) {
    const recommendations = [];

    if (analysis.details.isSuspiciousCountry) {
        recommendations.push('Number is from a country known for scams');
        recommendations.push('Be extremely cautious with calls from this number');
        recommendations.push('Do not provide personal or financial information');
    }

    if (analysis.details.isKnownScam) {
        recommendations.push('This number matches known scam patterns');
        recommendations.push('Do not answer calls from this number');
        recommendations.push('Block this number immediately');
    }

    if (analysis.details.isPremiumRate) {
        recommendations.push('This is a premium rate number');
        recommendations.push('Calls to this number may be expensive');
        recommendations.push('Verify the caller before calling back');
    }

    if (analysis.details.isInternational) {
        recommendations.push('International number detected');
        recommendations.push('Verify the caller through official channels');
        recommendations.push('Be cautious with unknown international calls');
    }

    if (analysis.riskLevel === 'critical') {
        recommendations.push('HIGH RISK: Do not interact with this number');
        recommendations.push('Report this number to authorities');
        recommendations.push('Block the number immediately');
    }

    return recommendations;
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        analyzePhoneNumber,
        analyzeBankAccount,
        getDetailedPhoneReport,
        cleanPhoneNumber,
        cleanAccountNumber,
        isValidPhoneNumber,
        isValidAccountNumber,
        isInternationalNumber,
        detectCountry,
        isSuspiciousCountry,
        detectVietnameseCarrier,
        isKnownScamNumber,
        isPremiumRateNumber,
        detectBank,
        hasSuspiciousAccountPattern,
        generatePhoneRecommendations
    };
} 