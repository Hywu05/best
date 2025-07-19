// ========================================
// SAFE CHECKER - MAIN INTEGRATION MODULE
// ========================================

// Import all analyzer modules
// Note: In a real implementation, you would use proper module imports
// For now, we'll assume these functions are available globally

/**
 * Main security checker that analyzes any input type
 * @param {string} input - Input to analyze (email, URL, phone, content)
 * @returns {object} Comprehensive analysis results
 */
function checkSafety(input) {
    const results = {
        input: input,
        type: detectInputType(input),
        timestamp: new Date().toISOString(),
        overallRisk: 'low',
        overallScore: 100,
        isSafe: true,
        analysis: {},
        recommendations: [],
        warnings: []
    };

    try {
        // Analyze based on input type
        switch (results.type) {
            case 'url':
                results.analysis = analyzeLink(input);
                break;
            case 'phone':
                results.analysis = analyzePhoneNumber(input);
                break;
            case 'email':
                results.analysis = analyzeEmail(input);
                break;
            case 'content':
                results.analysis = analyzeContent(input);
                break;
            case 'bank_account':
                results.analysis = analyzeBankAccount(input);
                break;
            default:
                results.analysis = analyzeContent(input);
        }

        // Calculate overall risk and score
        calculateOverallRisk(results);

        // Generate unified recommendations
        results.recommendations = generateUnifiedRecommendations(results);

    } catch (error) {
        results.warnings.push('Error during analysis: ' + error.message);
        results.overallRisk = 'critical';
        results.overallScore = 0;
        results.isSafe = false;
    }

    return results;
}

/**
 * Detect the type of input
 * @param {string} input - Input to analyze
 * @returns {string} Input type
 */
function detectInputType(input) {
    const cleanInput = input.trim().toLowerCase();

    // Check for URLs
    if (cleanInput.includes('http') || cleanInput.includes('www') || 
        (cleanInput.includes('.') && !/\d/.test(cleanInput))) {
        return 'url';
    }

    // Check for email addresses
    if (cleanInput.includes('@') && cleanInput.includes('.')) {
        return 'email';
    }

    // Check for phone numbers
    if (/^[\d\s\-\+\(\)\.]+$/.test(cleanInput) && cleanInput.length >= 10) {
        return 'phone';
    }

    // Check for bank account numbers (12-16 digits)
    if (/^\d{12,16}$/.test(cleanInput.replace(/\s/g, ''))) {
        return 'bank_account';
    }

    // Default to content analysis
    return 'content';
}

/**
 * Analyze email (combines link and content analysis)
 * @param {string} email - Email address or content
 * @returns {object} Email analysis results
 */
function analyzeEmail(email) {
    const results = {
        isSafe: true,
        riskLevel: 'low',
        warnings: [],
        score: 100,
        details: {
            domain: '',
            isSpoofed: false,
            hasSuspiciousPatterns: false,
            contentAnalysis: null
        }
    };

    try {
        // Extract domain from email
        const domain = email.split('@')[1];
        results.details.domain = domain;

        // Analyze domain (link analysis)
        const domainAnalysis = analyzeLink(domain);
        
        // Analyze email content if it's not just an address
        let contentAnalysis = null;
        if (email.length > 50) { // Likely contains content
            contentAnalysis = analyzeContent(email);
            results.details.contentAnalysis = contentAnalysis;
        }

        // Combine scores and warnings
        results.score = Math.min(domainAnalysis.score, contentAnalysis ? contentAnalysis.score : 100);
        results.warnings = [...domainAnalysis.warnings];
        if (contentAnalysis) {
            results.warnings.push(...contentAnalysis.warnings);
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
        results.warnings.push('Error analyzing email');
        results.score = 0;
        results.isSafe = false;
        results.riskLevel = 'critical';
    }

    return results;
}

/**
 * Calculate overall risk level and score
 * @param {object} results - Analysis results
 */
function calculateOverallRisk(results) {
    const analysis = results.analysis;
    
    // Use the analysis score as base
    results.overallScore = analysis.score || 100;
    
    // Determine overall risk level
    if (results.overallScore >= 80) {
        results.overallRisk = 'low';
    } else if (results.overallScore >= 60) {
        results.overallRisk = 'medium';
    } else if (results.overallScore >= 40) {
        results.overallRisk = 'high';
    } else {
        results.overallRisk = 'critical';
    }

    results.isSafe = results.overallScore >= 60;
}

/**
 * Generate unified recommendations based on analysis
 * @param {object} results - Analysis results
 * @returns {array} Array of recommendations
 */
function generateUnifiedRecommendations(results) {
    const recommendations = [];
    const analysis = results.analysis;

    // Add type-specific recommendations
    if (analysis.recommendations) {
        recommendations.push(...analysis.recommendations);
    }

    // Add general recommendations based on risk level
    switch (results.overallRisk) {
        case 'low':
            recommendations.push('This appears to be safe');
            recommendations.push('Continue with normal caution');
            break;
        case 'medium':
            recommendations.push('Exercise caution with this content');
            recommendations.push('Verify through official channels');
            recommendations.push('Do not provide sensitive information');
            break;
        case 'high':
            recommendations.push('This is highly suspicious');
            recommendations.push('Do not interact with this content');
            recommendations.push('Report to relevant authorities');
            break;
        case 'critical':
            recommendations.push('CRITICAL RISK: Do not proceed');
            recommendations.push('This is likely a scam or phishing attempt');
            recommendations.push('Block and report immediately');
            recommendations.push('Contact authorities if you already interacted');
            break;
    }

    // Add general security tips
    recommendations.push('Always verify sources through official channels');
    recommendations.push('Never share personal or financial information via email or text');
    recommendations.push('Use strong, unique passwords for all accounts');
    recommendations.push('Enable two-factor authentication where possible');

    return recommendations;
}

/**
 * Get detailed security report
 * @param {string} input - Input to analyze
 * @returns {object} Detailed security report
 */
function getDetailedSecurityReport(input) {
    const analysis = checkSafety(input);
    
    return {
        ...analysis,
        technicalDetails: {
            inputType: analysis.type,
            inputLength: input.length,
            analysisTimestamp: analysis.timestamp,
            processingTime: Date.now() - new Date(analysis.timestamp).getTime()
        },
        riskBreakdown: {
            overall: analysis.overallRisk,
            score: analysis.overallScore,
            type: analysis.analysis.riskLevel || 'unknown',
            details: analysis.analysis.details || {}
        }
    };
}

/**
 * Batch analyze multiple inputs
 * @param {array} inputs - Array of inputs to analyze
 * @returns {array} Array of analysis results
 */
function batchAnalyze(inputs) {
    return inputs.map(input => checkSafety(input));
}

/**
 * Get risk level color for UI
 * @param {string} riskLevel - Risk level
 * @returns {string} Color class
 */
function getRiskLevelColor(riskLevel) {
    switch (riskLevel) {
        case 'low':
            return 'green';
        case 'medium':
            return 'yellow';
        case 'high':
            return 'orange';
        case 'critical':
            return 'red';
        default:
            return 'gray';
    }
}

/**
 * Get risk level icon for UI
 * @param {string} riskLevel - Risk level
 * @returns {string} FontAwesome icon class
 */
function getRiskLevelIcon(riskLevel) {
    switch (riskLevel) {
        case 'low':
            return 'fa-check-circle';
        case 'medium':
            return 'fa-exclamation-triangle';
        case 'high':
            return 'fa-times-circle';
        case 'critical':
            return 'fa-skull-crossbones';
        default:
            return 'fa-question-circle';
    }
}

/**
 * Format analysis results for display
 * @param {object} results - Analysis results
 * @returns {object} Formatted results for UI
 */
function formatResultsForDisplay(results) {
    return {
        input: results.input,
        type: results.type,
        riskLevel: results.overallRisk,
        riskColor: getRiskLevelColor(results.overallRisk),
        riskIcon: getRiskLevelIcon(results.overallRisk),
        score: results.overallScore,
        isSafe: results.isSafe,
        warnings: results.warnings,
        recommendations: results.recommendations,
        details: results.analysis.details || {},
        timestamp: results.timestamp
    };
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        checkSafety,
        getDetailedSecurityReport,
        batchAnalyze,
        detectInputType,
        analyzeEmail,
        calculateOverallRisk,
        generateUnifiedRecommendations,
        getRiskLevelColor,
        getRiskLevelIcon,
        formatResultsForDisplay
    };
} 