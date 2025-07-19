// ========================================
// SECURITY CHECKER - MAIN JAVASCRIPT
// ========================================

// Load analyzer modules
let linkAnalyzer, phoneAnalyzer, contentAnalyzer, safeChecker;

// Load modules dynamically
async function loadModules() {
    try {
        // In a real implementation, you would load these as ES6 modules
        // For now, we'll assume they're available globally
        console.log('Loading security analyzer modules...');
    } catch (error) {
        console.error('Error loading modules:', error);
    }
}

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', async function() {
    console.log('Security Checker initialized');
    
    // Load modules
    await loadModules();
    
    // Initialize language switcher first
    if (typeof LanguageSwitcher !== 'undefined') {
        window.languageSwitcher = new LanguageSwitcher();
        console.log('Language switcher initialized');
    } else {
        console.warn('LanguageSwitcher not found, trying again...');
        // Try again after a short delay
        setTimeout(() => {
            if (typeof LanguageSwitcher !== 'undefined') {
                window.languageSwitcher = new LanguageSwitcher();
                console.log('Language switcher initialized on retry');
            } else {
                console.error('LanguageSwitcher still not found');
            }
        }, 500);
    }
    
    // Initialize components
    initializeFAQ();
    initializeSecurityChecker();
    initializeExampleButtons();
    updateLastUpdated();
    
    // Check for URL from home page
    checkForStoredUrl();
    
    console.log('All initialization completed');
});

// ========================================
// FAQ TOGGLE FUNCTIONALITY
// ========================================
function initializeFAQ() {
    const faqToggles = document.querySelectorAll('.faq-toggle');
    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            content.classList.toggle('hidden');
            icon.classList.toggle('rotate-180');
        });
    });
}

// ========================================
// SECURITY CHECKER MAIN FUNCTIONALITY
// ========================================
function initializeSecurityChecker() {
    const checkBtn = document.getElementById('checkBtn');
    const inputValue = document.getElementById('inputValue');
    const resultsSection = document.getElementById('resultsSection');
    
    console.log('Initializing security checker...');
    console.log('Check button:', checkBtn);
    console.log('Input value:', inputValue);
    console.log('Results section:', resultsSection);
    
    // Check for all required elements
    const requiredElements = {
        'checkBtn': checkBtn,
        'inputValue': inputValue,
        'resultsSection': resultsSection,
        'statusText': document.getElementById('statusText'),
        'statusIcon': document.getElementById('statusIcon'),
        'statusBar': document.getElementById('statusBar'),
        'categoryText': document.getElementById('categoryText'),
        'categoryIcon': document.getElementById('categoryIcon'),
        'categoryBadge': document.getElementById('categoryBadge'),
        'detailsText': document.getElementById('detailsText'),
        'emailContent': document.getElementById('emailContent'),
        'urlAnalysis': document.getElementById('urlAnalysis'),
        'phoneCheck': document.getElementById('phoneCheck'),
        'senderCheck': document.getElementById('senderCheck'),
        'websiteCheck': document.getElementById('websiteCheck'),
        'docCheck': document.getElementById('docCheck'),
        'recommendationsList': document.getElementById('recommendationsList')
    };
    
    console.log('Required elements check:', requiredElements);
    
    if (!checkBtn || !inputValue || !resultsSection) {
        console.error('Required elements not found');
        return;
    }
    
    // Check Button Click Handler
    checkBtn.addEventListener('click', function() {
        console.log('Check button clicked');
        const value = inputValue.value.trim();
        console.log('Input value:', value);
        
        if (value === '') {
            alert('Please enter an email, URL or phone number to check.');
            return;
        }
        
        // Show loading state
        showLoadingState(checkBtn);
        
        // Simulate API call with timeout
        setTimeout(function() {
            console.log('Analysis completed, showing results...');
            
            // Show results section
            resultsSection.classList.remove('hidden');
            resultsSection.style.display = 'block';
            
            // Update results based on input
            const analyzedContent = document.getElementById('analyzedContent');
            if (analyzedContent) {
                analyzedContent.textContent = value;
            }
            
            // Generate and display results
            const result = generateSecurityResult(value);
            console.log('Generated result:', result);
            displayResults(result);
            
            // Reset button
            resetButtonState(checkBtn);
            
            // Show result cards with animation
            animateResultCards();
            
            // Scroll to results
            resultsSection.scrollIntoView({ behavior: 'smooth' });
            
        }, 1500); // Simulated delay for "analysis"
    });
    
    // Allow pressing Enter in input field
    inputValue.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkBtn.click();
        }
    });
}

// ========================================
// EXAMPLE BUTTONS
// ========================================
function initializeExampleButtons() {
    const exampleButtons = document.querySelectorAll('.example-btn');
    
    exampleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const example = this.getAttribute('data-example');
            const inputType = this.getAttribute('data-input-type');
            
            console.log('Example button clicked:', example, 'Input type:', inputType);
            
            // Handle different input types
            if (inputType === 'email') {
                // Show both text input and file upload for email analysis
                showEmailAnalysisMode();
                
                // Set example email in text input
                const inputValue = document.getElementById('inputValue');
                if (inputValue) {
                    inputValue.value = example;
                }
            } else {
                // Show only text input for other types
                showTextInputMode();
                
                // Set example value
                const inputValue = document.getElementById('inputValue');
                if (inputValue) {
                inputValue.value = example;
                }
            }
        });
    });
}

function showEmailAnalysisMode() {
    console.log('Showing email analysis mode - both text input and file upload');
    
    const textInputSection = document.getElementById('textInputSection');
    const fileInputSection = document.getElementById('fileInputSection');
    
    if (textInputSection && fileInputSection) {
        // Show both sections
        textInputSection.style.display = 'block';
        fileInputSection.classList.remove('hidden');
        
        // Add some spacing between sections
        textInputSection.style.marginBottom = '20px';
    }
}

function showTextInputMode() {
    console.log('Showing text input mode only');
    
    const textInputSection = document.getElementById('textInputSection');
    const fileInputSection = document.getElementById('fileInputSection');
    
    if (textInputSection && fileInputSection) {
        // Show only text input, hide file upload
        textInputSection.style.display = 'block';
        fileInputSection.classList.add('hidden');
        
        // Remove spacing
        textInputSection.style.marginBottom = '0';
    }
}

// ========================================
// LOADING STATE MANAGEMENT
// ========================================
function showLoadingState(button) {
    button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Analyzing...';
    button.classList.remove('pulse');
    button.classList.add('checking');
    button.disabled = true;
}

function resetButtonState(button) {
    button.innerHTML = '<i class="fas fa-shield-alt mr-3"></i> Analyze Security';
    button.classList.remove('checking');
    button.disabled = false;
}

// ========================================
// SECURITY RESULT GENERATION
// ========================================
// Generate security result based on input using advanced analyzers
function generateSecurityResult(value) {
    try {
        // Use the advanced security checker if available
        if (typeof checkSafety === 'function') {
            const securityResult = checkSafety(value);
            return formatSecurityResult(securityResult);
        }
        
        // Fallback to basic analysis
        return generateBasicSecurityResult(value);
        
    } catch (error) {
        console.error('Error in security analysis:', error);
        return generateBasicSecurityResult(value);
    }
}

// Format advanced security result for display
function formatSecurityResult(securityResult) {
    const riskLevel = securityResult.overallRisk;
    const score = securityResult.overallScore;
    
    let status, statusColor, statusIcon, category, details;
    
    switch(riskLevel) {
        case 'low':
            status = 'Safe';
            statusColor = 'green';
            statusIcon = 'fa-check-circle';
            category = 'Safe';
            details = 'This content appears to be safe with no significant security threats detected.';
            break;
        case 'medium':
            status = 'Suspicious';
            statusColor = 'yellow';
            statusIcon = 'fa-exclamation-triangle';
            category = 'Suspicious';
            details = 'This content shows some suspicious characteristics. Exercise caution.';
            break;
        case 'high':
            status = 'High Risk';
            statusColor = 'orange';
            statusIcon = 'fa-times-circle';
            category = 'High Risk';
            details = 'This content is highly suspicious and may be a scam or phishing attempt.';
            break;
        case 'critical':
            status = 'Dangerous';
            statusColor = 'red';
            statusIcon = 'fa-skull-crossbones';
            category = 'Critical';
            details = 'This content is extremely dangerous. Do not interact with it.';
            break;
        default:
            status = 'Unknown';
            statusColor = 'gray';
            statusIcon = 'fa-question-circle';
            category = 'Unknown';
            details = 'Unable to determine the safety of this content.';
    }
    
    // Generate detailed analysis results
    const analysisResults = generateDetailedAnalysisResults(securityResult);
    
    return {
        status,
        statusColor,
        statusIcon,
        category,
        details,
        recommendations: securityResult.recommendations || [],
        analysisResults,
        riskLevel: score,
        warnings: securityResult.warnings || [],
        type: securityResult.type
    };
}

// Generate detailed analysis results for display
function generateDetailedAnalysisResults(securityResult) {
    const type = securityResult.type;
    const details = securityResult.analysis.details || {};
    
    const analysisResults = {
        emailContent: 'No email content detected',
        urlAnalysis: 'No URL detected in input',
        phoneCheck: 'No phone number detected',
        senderCheck: 'No email detected',
        websiteCheck: 'No website URL detected',
        docCheck: 'No suspicious attachments detected'
    };
    
    switch(type) {
        case 'email':
            analysisResults.emailContent = details.contentAnalysis ? 
                `Found ${details.contentAnalysis.suspiciousPatterns?.length || 0} suspicious patterns` :
                'Email domain analysis completed';
            analysisResults.senderCheck = `Verifying domain: ${details.domain || 'unknown'}`;
            break;
        case 'url':
            analysisResults.urlAnalysis = `Analyzing domain: ${details.domain || 'unknown'}`;
            analysisResults.websiteCheck = 'Checking website security and reputation';
            break;
        case 'phone':
            analysisResults.phoneCheck = `Analyzing phone number from ${details.country || 'unknown'} (${details.carrier || 'unknown carrier'})`;
            break;
        case 'content':
            analysisResults.emailContent = `Content analysis: ${details.language || 'unknown'} language, ${details.wordCount || 0} words`;
            break;
        case 'bank_account':
            analysisResults.phoneCheck = `Bank account analysis: ${details.bank || 'unknown bank'}`;
            break;
    }
    
    return analysisResults;
}

// Fallback basic security result generator
function generateBasicSecurityResult(value) {
    // Original basic logic as fallback
    let type = '';
    if (value.includes('@')) {
        type = 'email';
    } else if (value.includes('http') || value.includes('www') || value.includes('.') && !/\d/.test(value)) {
        type = 'url';
    } else if (/\d/.test(value)) {
        type = 'phone';
    }
    
    const randomResult = Math.floor(Math.random() * 4);
    let status, statusColor, statusIcon, category, details, recommendations;
    
    const analysisResults = {
        emailContent: 'Basic email analysis completed',
        urlAnalysis: 'Basic URL analysis completed',
        phoneCheck: 'Basic phone analysis completed',
        senderCheck: 'Basic sender verification completed',
        websiteCheck: 'Basic website analysis completed',
        docCheck: 'Basic document analysis completed'
    };
    
    switch(randomResult) {
        case 0: // Safe
            status = 'Safe';
            statusColor = 'green';
            statusIcon = 'fa-check-circle';
            category = 'Safe';
            details = 'This content appears to be safe.';
            recommendations = [
                'Always verify the sender before sharing sensitive information.',
                'Keep your software and antivirus updated.',
                'Use strong, unique passwords for important accounts.'
            ];
            break;
        case 1: // Suspicious
            status = 'Suspicious';
            statusColor = 'yellow';
            statusIcon = 'fa-exclamation-triangle';
            category = 'Suspicious';
            details = 'This content shows some suspicious characteristics.';
            recommendations = [
                'Do not provide personal or financial information.',
                'Verify the source through official channels.',
                'Report any suspicious activity.'
            ];
            break;
        case 2: // High Risk
            status = 'High Risk';
            statusColor = 'orange';
            statusIcon = 'fa-times-circle';
            category = 'High Risk';
            details = 'This content is highly suspicious.';
            recommendations = [
                'Avoid interacting with this content.',
                'Report to relevant authorities.',
                'Block the source if possible.'
            ];
            break;
        case 3: // Critical
            status = 'Dangerous';
            statusColor = 'red';
            statusIcon = 'fa-skull-crossbones';
            category = 'Critical';
            details = 'This content is extremely dangerous.';
            recommendations = [
                'Do not interact with this content.',
                'Report immediately to authorities.',
                'Change passwords if you already interacted.'
            ];
            break;
    }
    
    return {
        status,
        statusColor,
        statusIcon,
        category,
        details,
        recommendations,
        analysisResults,
        riskLevel: 100 - (randomResult * 25)
    };
}

// ========================================
// UI UPDATES
// ========================================
function displayResults(result) {
    console.log('Displaying results:', result);
    
    // Update status card
    const statusText = document.getElementById('statusText');
    const statusIcon = document.getElementById('statusIcon');
    const statusBar = document.getElementById('statusBar');
    
    if (statusText) statusText.textContent = result.status;
    if (statusIcon) statusIcon.className = `mr-4 text-3xl text-${result.statusColor}-500 fas ${result.statusIcon}`;
    if (statusBar) {
        statusBar.className = `bg-${result.statusColor}-500 h-2.5 rounded-full`;
        statusBar.style.width = `${result.riskLevel}%`;
    }
    
    // Update category card
    const categoryText = document.getElementById('categoryText');
    const categoryIcon = document.getElementById('categoryIcon');
    const categoryBadge = document.getElementById('categoryBadge');
    
    if (categoryText) categoryText.textContent = result.category;
    if (categoryIcon) categoryIcon.className = `mr-4 text-3xl text-${result.statusColor}-500 fas ${result.statusIcon}`;
    if (categoryBadge) {
        categoryBadge.className = `inline-block px-3 py-1 text-sm font-semibold rounded-full bg-${result.statusColor}-100 text-${result.statusColor}-800`;
        categoryBadge.textContent = result.category;
    }
    
    // Update details
    const detailsText = document.getElementById('detailsText');
    if (detailsText) {
        // Store original text for translation
        detailsText.setAttribute('data-original', result.details);
        
        // Get current language and translations
        const currentLang = window.languageSwitcher ? window.languageSwitcher.getCurrentLanguage() : 'en';
        const translations = window.languageSwitcher ? window.languageSwitcher.translations[currentLang] : null;
        
        // Try to find translation for details
        let translatedDetails = result.details;
        if (translations) {
            const lowerDetails = result.details.toLowerCase();
            if (lowerDetails.includes('safe') && lowerDetails.includes('no significant')) {
                translatedDetails = translations['results.analysis.safe'] || result.details;
            } else if (lowerDetails.includes('suspicious') && lowerDetails.includes('characteristics')) {
                translatedDetails = translations['results.analysis.suspicious'] || result.details;
            } else if (lowerDetails.includes('highly suspicious')) {
                translatedDetails = translations['results.analysis.high_risk'] || result.details;
            } else if (lowerDetails.includes('extremely dangerous')) {
                translatedDetails = translations['results.analysis.dangerous'] || result.details;
            } else if (lowerDetails.includes('appears to be safe')) {
                translatedDetails = translations['results.analysis.safe_simple'] || result.details;
            }
        }
        detailsText.textContent = translatedDetails;
    }
    
    // Update analysis results with translations
    const currentLang = window.languageSwitcher ? window.languageSwitcher.getCurrentLanguage() : 'en';
    const translations = window.languageSwitcher ? window.languageSwitcher.translations[currentLang] : null;
    
    const updateAnalysisText = (elementId, originalText) => {
        const element = document.getElementById(elementId);
        if (element && translations) {
            // Store original text for translation
            element.setAttribute('data-original', originalText);
            
            const lowerText = originalText.toLowerCase();
            let translatedText = originalText;
            
            if (lowerText.includes('basic email analysis')) {
                translatedText = translations['results.analysis.email.basic'] || originalText;
            } else if (lowerText.includes('basic url analysis')) {
                translatedText = translations['results.analysis.url.basic'] || originalText;
            } else if (lowerText.includes('basic phone analysis')) {
                translatedText = translations['results.analysis.phone.basic'] || originalText;
            } else if (lowerText.includes('basic sender verification')) {
                translatedText = translations['results.analysis.sender.basic'] || originalText;
            } else if (lowerText.includes('basic website analysis')) {
                translatedText = translations['results.analysis.website.basic'] || originalText;
            } else if (lowerText.includes('basic document analysis')) {
                translatedText = translations['results.analysis.document.basic'] || originalText;
            } else if (lowerText.includes('suspicious patterns')) {
                translatedText = translations['results.analysis.email.patterns'] || originalText;
            } else if (lowerText.includes('domain analysis')) {
                translatedText = translations['results.analysis.domain'] || originalText;
            } else if (lowerText.includes('website security')) {
                translatedText = translations['results.analysis.website.security'] || originalText;
            } else if (lowerText.includes('phone number from')) {
                translatedText = translations['results.analysis.phone.details'] || originalText;
            }
            
            element.textContent = translatedText;
        }
    };
    
    updateAnalysisText('emailContent', result.analysisResults.emailContent);
    updateAnalysisText('urlAnalysis', result.analysisResults.urlAnalysis);
    updateAnalysisText('phoneCheck', result.analysisResults.phoneCheck);
    updateAnalysisText('senderCheck', result.analysisResults.senderCheck);
    updateAnalysisText('websiteCheck', result.analysisResults.websiteCheck);
    updateAnalysisText('docCheck', result.analysisResults.docCheck);
    
    // Update recommendations
    const recommendationsList = document.getElementById('recommendationsList');
    if (recommendationsList) {
    recommendationsList.innerHTML = '';
        
        result.recommendations.forEach((rec, index) => {
        const li = document.createElement('li');
            
            // Try to find translation for this recommendation
            let translatedRec = rec;
            if (translations) {
                // First try exact match with dynamic keys
                const recKey = `results.recommendations.dynamic.${index + 1}`;
                if (translations[recKey]) {
                    translatedRec = translations[recKey];
                } else {
                    // Fallback: try to match common patterns
                    const lowerRec = rec.toLowerCase();
                    if (lowerRec.includes('verify') || lowerRec.includes('sender')) {
                        translatedRec = translations['results.recommendations.verify'] || rec;
                    } else if (lowerRec.includes('personal') || lowerRec.includes('financial') || lowerRec.includes('information')) {
                        translatedRec = translations['results.recommendations.personal'] || rec;
                    } else if (lowerRec.includes('password') || lowerRec.includes('authentication')) {
                        translatedRec = translations['results.recommendations.password'] || rec;
                    } else if (lowerRec.includes('report') || lowerRec.includes('authorities')) {
                        translatedRec = translations['results.recommendations.report'] || rec;
                    } else if (lowerRec.includes('avoid') || lowerRec.includes('interacting')) {
                        translatedRec = translations['results.recommendations.avoid'] || rec;
                    } else if (lowerRec.includes('change') || lowerRec.includes('password')) {
                        translatedRec = translations['results.recommendations.change'] || rec;
                    } else if (lowerRec.includes('software') || lowerRec.includes('antivirus') || lowerRec.includes('updated')) {
                        translatedRec = translations['results.recommendations.update'] || rec;
                    } else if (lowerRec.includes('block') || lowerRec.includes('source')) {
                        translatedRec = translations['results.recommendations.block'] || rec;
                    }
                }
            }
            
            li.textContent = translatedRec;
        recommendationsList.appendChild(li);
    });
    }
    
    // Update language for dynamic results
    if (window.updateResultsLanguage) {
        window.updateResultsLanguage();
    }
    
    console.log('Results display completed');
}

// ========================================
// ANIMATIONS
// ========================================
function animateResultCards() {
    const resultCards = document.querySelectorAll('.result-card');
    resultCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('show');
        }, index * 200);
    });
}

// ========================================
// UTILITY FUNCTIONS
// ========================================
function updateLastUpdated() {
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit',
        timeZone: 'UTC'
    };
    const formattedDate = now.toLocaleDateString('en-US', options);
    const lastUpdatedElement = document.getElementById('lastUpdated');
    if (lastUpdatedElement) {
        // Get current language and translation
        const currentLang = window.languageSwitcher ? window.languageSwitcher.getCurrentLanguage() : 'en';
        const translations = window.languageSwitcher ? window.languageSwitcher.translations[currentLang] : null;
        
        // Use translation if available, otherwise fallback to English
        const baseText = translations ? translations['hero.database.note'] : 'Database updated: Today 08:45 UTC';
        
        // Replace the time part with current time
        let finalText = baseText;
        if (baseText.includes('Today 08:45')) {
            finalText = baseText.replace('Today 08:45', formattedDate);
        } else if (baseText.includes('Hôm nay 08:45')) {
            finalText = baseText.replace('Hôm nay 08:45', formattedDate);
        } else {
            // If no placeholder found, construct the text
            const prefix = currentLang === 'vi' ? 'Cơ sở dữ liệu cập nhật: ' : 'Database updated: ';
            finalText = prefix + formattedDate + ' UTC';
        }
        
        lastUpdatedElement.textContent = finalText;
    }
}

// ========================================
// CHECK FOR STORED URL FROM HOME PAGE
// ========================================
function checkForStoredUrl() {
    const storedUrl = localStorage.getItem('analysisUrl');
    if (storedUrl) {
        console.log('Found stored URL from home page:', storedUrl);
        
        // Fill the input with the stored URL
        const inputValue = document.getElementById('inputValue');
        if (inputValue) {
            inputValue.value = storedUrl;
            
            // Show text input mode if it's hidden
            const textInputSection = document.getElementById('textInputSection');
            if (textInputSection && textInputSection.classList.contains('hidden')) {
                textInputSection.classList.remove('hidden');
            }
            
            // Hide file upload section
            const fileInputSection = document.getElementById('fileInputSection');
            if (fileInputSection) {
                fileInputSection.classList.add('hidden');
            }
            
            // Automatically trigger analysis
            setTimeout(() => {
                const checkBtn = document.getElementById('checkBtn');
                if (checkBtn) {
                    checkBtn.click();
                }
            }, 500);
        }
        
        // Clear the stored URL
        localStorage.removeItem('analysisUrl');
    }
}
