// ========================================
// LINK ANALYZER - PHISHING DETECTION
// ========================================

// Dangerous domain extensions
const DANGEROUS_DOMAINS = {
    extensions: ['.tk', '.ml', '.ga', '.xyz', '.top', '.club', '.online', '.site', '.webcam', '.click'],
    shorteners: ['bit.ly', 'tinyurl.com', 'short.link', 'goo.gl', 't.co', 'is.gd', 'v.gd', 'ow.ly', 'su.pr', 'twurl.nl', 'snipurl.com', 'short.to', 'BudURL.com', 'ping.fm', 'tr.im', 'zip.net', 'snurl.com', 'adjix.com', 'redirx.com', 'digg.com', 'post.ly', 'Just.as', 'bkite.com', 'snipr.com', 'flic.kr', 'loopt.us', 'DwarfURL.com', 'ow.ly', 'htxt.it', 'twitthis.com', 'u.mavrev.com', 'plurk.com', 'ff.im', 'twurl.nl', 'ur1.ca', 'zz.gd', 'twurl.nl', 'snurl.com', 'adjix.com', 'redirx.com', 'digg.com', 'post.ly', 'Just.as', 'bkite.com', 'snipr.com', 'flic.kr', 'loopt.us', 'DwarfURL.com', 'ow.ly', 'htxt.it', 'twitthis.com', 'u.mavrev.com', 'plurk.com', 'ff.im', 'twurl.nl', 'ur1.ca', 'zz.gd']
};

// Spoofed brand domains
const SPOOFED_BRANDS = {
    google: ['goog1e.com', 'g00gle.com', 'googIe.com', 'goggle.com', 'gooogle.com', 'gogle.com'],
    facebook: ['faceb00k.info', 'faceboook.com', 'facebok.com', 'fasebook.com', 'faceboook.com'],
    paypal: ['paypa1.com', 'paypaI.com', 'paypa1.net', 'paypaI.net', 'paypa1.org'],
    microsoft: ['microsft.com', 'micros0ft.com', 'microsOft.com', 'microsoftt.com'],
    apple: ['app1e.com', 'appIe.com', 'app1e.net', 'appIe.net'],
    amazon: ['amaz0n.com', 'amazOn.com', 'amaz0n.net', 'amazOn.net'],
    netflix: ['netf1ix.com', 'netfIix.com', 'netf1ix.net', 'netfIix.net'],
    bank: ['bank0famerica.com', 'bank0famerica.net', 'wellsfarg0.com', 'wellsfargO.com'],
    vietnam: ['vietcombank-vn.com', 'vietcombank-vn.net', 'agribank-vn.com', 'agribank-vn.net', 'bidv-vn.com', 'bidv-vn.net']
};

// Suspicious URL patterns
const URL_PATTERNS = {
    // URL shortening services
    shorteners: /(bit\.ly|tinyurl\.com|short\.link|goo\.gl|t\.co|is\.gd|v\.gd|ow\.ly|su\.pr|twurl\.nl|snipurl\.com|short\.to|BudURL\.com|ping\.fm|tr\.im|zip\.net|snurl\.com|adjix\.com|redirx\.com|digg\.com|post\.ly|Just\.as|bkite\.com|snipr\.com|flic\.kr|loopt\.us|DwarfURL\.com|htxt\.it|twitthis\.com|u\.mavrev\.com|plurk\.com|ff\.im|ur1\.ca|zz\.gd)/i,
    
    // IP addresses in URLs (suspicious)
    ipAddress: /https?:\/\/(\d{1,3}\.){3}\d{1,3}/,
    
    // Multiple redirects
    redirects: /(redirect|go|goto|jump|skip|forward|move)/i,
    
    // Suspicious parameters
    suspiciousParams: /(login|signin|verify|confirm|update|secure|account|banking|payment|credit|debit|card|password|pin|ssn|social|security)/i,
    
    // Mixed content (http in https page)
    mixedContent: /https:\/\/.*http:\/\//i,
    
    // Suspicious file extensions
    suspiciousFiles: /\.(exe|scr|bat|cmd|com|pif|vbs|js|jar|msi|dmg|app|deb|rpm|apk)$/i
};

/**
 * Analyze link safety and detect phishing attempts
 * @param {string} url - The URL to analyze
 * @returns {object} Analysis results
 */
function analyzeLink(url) {
    const results = {
        isSafe: true,
        riskLevel: 'low',
        warnings: [],
        score: 100,
        details: {
            domain: extractDomain(url),
            isShortened: false,
            isSpoofed: false,
            hasSuspiciousPatterns: false,
            hasDangerousExtension: false,
            hasSuspiciousParams: false
        }
    };

    try {
        // Normalize URL
        const normalizedUrl = normalizeUrl(url);
        
        // Check for dangerous domain extensions
        if (hasDangerousExtension(normalizedUrl)) {
            results.details.hasDangerousExtension = true;
            results.warnings.push('Domain uses suspicious extension');
            results.score -= 30;
        }

        // Check for URL shorteners
        if (isUrlShortener(normalizedUrl)) {
            results.details.isShortened = true;
            results.warnings.push('URL is shortened - cannot verify destination');
            results.score -= 25;
        }

        // Check for spoofed brands
        const spoofedBrand = checkSpoofedBrand(normalizedUrl);
        if (spoofedBrand) {
            results.details.isSpoofed = true;
            results.warnings.push(`Domain may be spoofing ${spoofedBrand}`);
            results.score -= 40;
        }

        // Check for suspicious patterns
        if (hasSuspiciousPatterns(normalizedUrl)) {
            results.details.hasSuspiciousPatterns = true;
            results.warnings.push('URL contains suspicious patterns');
            results.score -= 20;
        }

        // Check for suspicious parameters
        if (hasSuspiciousParams(normalizedUrl)) {
            results.details.hasSuspiciousParams = true;
            results.warnings.push('URL contains suspicious parameters');
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
        results.warnings.push('Error analyzing URL');
        results.score = 0;
        results.isSafe = false;
        results.riskLevel = 'critical';
    }

    return results;
}

/**
 * Normalize URL for analysis
 * @param {string} url - Raw URL
 * @returns {string} Normalized URL
 */
function normalizeUrl(url) {
    // Add protocol if missing
    if (!url.match(/^https?:\/\//)) {
        url = 'http://' + url;
    }
    
    // Remove fragments and query parameters for domain analysis
    const urlObj = new URL(url);
    return urlObj.hostname.toLowerCase();
}

/**
 * Extract domain from URL
 * @param {string} url - URL to extract domain from
 * @returns {string} Domain name
 */
function extractDomain(url) {
    try {
        const normalizedUrl = normalizeUrl(url);
        return normalizedUrl;
    } catch (error) {
        return url;
    }
}

/**
 * Check if URL uses dangerous domain extension
 * @param {string} url - Normalized URL
 * @returns {boolean} True if dangerous extension
 */
function hasDangerousExtension(url) {
    return DANGEROUS_DOMAINS.extensions.some(ext => url.endsWith(ext));
}

/**
 * Check if URL is a shortener
 * @param {string} url - Normalized URL
 * @returns {boolean} True if URL shortener
 */
function isUrlShortener(url) {
    return DANGEROUS_DOMAINS.shorteners.some(shortener => url.includes(shortener));
}

/**
 * Check for spoofed brand domains
 * @param {string} url - Normalized URL
 * @returns {string|null} Brand name if spoofed, null otherwise
 */
function checkSpoofedBrand(url) {
    for (const [brand, domains] of Object.entries(SPOOFED_BRANDS)) {
        if (domains.some(domain => url.includes(domain))) {
            return brand;
        }
    }
    return null;
}

/**
 * Check for suspicious URL patterns
 * @param {string} url - URL to check
 * @returns {boolean} True if suspicious patterns found
 */
function hasSuspiciousPatterns(url) {
    return URL_PATTERNS.ipAddress.test(url) ||
           URL_PATTERNS.redirects.test(url) ||
           URL_PATTERNS.mixedContent.test(url) ||
           URL_PATTERNS.suspiciousFiles.test(url);
}

/**
 * Check for suspicious parameters in URL
 * @param {string} url - URL to check
 * @returns {boolean} True if suspicious parameters found
 */
function hasSuspiciousParams(url) {
    return URL_PATTERNS.suspiciousParams.test(url);
}

/**
 * Get detailed analysis report for a URL
 * @param {string} url - URL to analyze
 * @returns {object} Detailed analysis report
 */
function getDetailedLinkReport(url) {
    const analysis = analyzeLink(url);
    
    return {
        ...analysis,
        recommendations: generateLinkRecommendations(analysis),
        technicalDetails: {
            domain: analysis.details.domain,
            protocol: url.startsWith('https') ? 'HTTPS' : 'HTTP',
            hasSSL: url.startsWith('https'),
            domainAge: 'Unknown', // Would require WHOIS API
            registrar: 'Unknown', // Would require WHOIS API
            country: 'Unknown'    // Would require WHOIS API
        }
    };
}

/**
 * Generate recommendations based on analysis
 * @param {object} analysis - Analysis results
 * @returns {array} Array of recommendations
 */
function generateLinkRecommendations(analysis) {
    const recommendations = [];

    if (analysis.details.isShortened) {
        recommendations.push('Avoid clicking shortened URLs without verifying the destination');
        recommendations.push('Use URL expander services to see the real destination');
    }

    if (analysis.details.isSpoofed) {
        recommendations.push('This domain may be impersonating a legitimate brand');
        recommendations.push('Verify the official website address');
        recommendations.push('Do not enter personal information');
    }

    if (analysis.details.hasDangerousExtension) {
        recommendations.push('Domain uses suspicious extension - proceed with caution');
        recommendations.push('Verify the website through official channels');
    }

    if (analysis.details.hasSuspiciousPatterns) {
        recommendations.push('URL contains suspicious patterns');
        recommendations.push('Avoid downloading files from this URL');
    }

    if (analysis.details.hasSuspiciousParams) {
        recommendations.push('URL contains suspicious parameters');
        recommendations.push('Do not enter sensitive information');
    }

    if (analysis.riskLevel === 'critical') {
        recommendations.push('HIGH RISK: Do not visit this URL');
        recommendations.push('Report this URL to security authorities');
    }

    return recommendations;
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        analyzeLink,
        getDetailedLinkReport,
        normalizeUrl,
        extractDomain,
        hasDangerousExtension,
        isUrlShortener,
        checkSpoofedBrand,
        hasSuspiciousPatterns,
        hasSuspiciousParams,
        generateLinkRecommendations
    };
} 