// Home Page JavaScript for Security Checker
document.addEventListener('DOMContentLoaded', function() {
    console.log('Home page loaded');
    
    // Initialize elements
    const websiteUrlInput = document.getElementById('websiteUrl');
    const checkWebsiteBtn = document.getElementById('checkWebsiteBtn');
    const quickResult = document.getElementById('quickResult');
    const quickStatusIcon = document.getElementById('quickStatusIcon');
    const quickStatusText = document.getElementById('quickStatusText');
    const quickDescription = document.getElementById('quickDescription');
    const detailedAnalysisBtn = document.getElementById('detailedAnalysisBtn');
    
    // Add event listeners
    if (checkWebsiteBtn) {
        checkWebsiteBtn.addEventListener('click', performQuickCheck);
    }
    
    if (detailedAnalysisBtn) {
        detailedAnalysisBtn.addEventListener('click', goToDetailedAnalysis);
    }
    
    // Allow Enter key to trigger check
    if (websiteUrlInput) {
        websiteUrlInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performQuickCheck();
            }
        });
    }
    
    // Quick check function
    function performQuickCheck() {
        const url = websiteUrlInput.value.trim();
        
        if (!url) {
            showError('Vui lòng nhập URL website cần kiểm tra');
            return;
        }
        
        if (!isValidUrl(url)) {
            showError('URL không hợp lệ. Vui lòng nhập URL đúng định dạng (ví dụ: https://example.com)');
            return;
        }
        
        // Show loading state
        showLoadingState();
        
        // Simulate API call with timeout
        setTimeout(() => {
            const result = performQuickSecurityCheck(url);
            showQuickResult(result);
        }, 2000);
    }
    
    // URL validation
    function isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }
    
    // Quick security check logic
    function performQuickSecurityCheck(url) {
        // This is a simplified check - in real implementation, this would call an API
        const domain = new URL(url).hostname.toLowerCase();
        
        // Simulate different results based on domain patterns
        if (domain.includes('google.com') || domain.includes('facebook.com') || domain.includes('microsoft.com')) {
            return {
                status: 'safe',
                statusText: 'An toàn',
                description: 'Website này được xác nhận là an toàn và đáng tin cậy.',
                icon: 'fas fa-check-circle',
                color: 'text-green-400'
            };
        } else if (domain.includes('fake') || domain.includes('scam') || domain.includes('phishing')) {
            return {
                status: 'dangerous',
                statusText: 'Nguy hiểm',
                description: 'Website này có dấu hiệu lừa đảo và không an toàn.',
                icon: 'fas fa-exclamation-triangle',
                color: 'text-red-400'
            };
        } else if (domain.includes('suspicious') || domain.includes('unknown')) {
            return {
                status: 'suspicious',
                statusText: 'Đáng ngờ',
                description: 'Website này có một số đặc điểm đáng ngờ, cần kiểm tra thêm.',
                icon: 'fas fa-question-circle',
                color: 'text-yellow-400'
            };
        } else {
            // Random result for demo purposes
            const random = Math.random();
            if (random > 0.7) {
                return {
                    status: 'safe',
                    statusText: 'An toàn',
                    description: 'Website này có vẻ an toàn dựa trên kiểm tra cơ bản.',
                    icon: 'fas fa-check-circle',
                    color: 'text-green-400'
                };
            } else if (random > 0.4) {
                return {
                    status: 'suspicious',
                    statusText: 'Đáng ngờ',
                    description: 'Website này có một số đặc điểm cần kiểm tra thêm.',
                    icon: 'fas fa-question-circle',
                    color: 'text-yellow-400'
                };
            } else {
                return {
                    status: 'dangerous',
                    statusText: 'Nguy hiểm',
                    description: 'Website này có dấu hiệu không an toàn.',
                    icon: 'fas fa-exclamation-triangle',
                    color: 'text-red-400'
                };
            }
        }
    }
    
    // Show loading state
    function showLoadingState() {
        checkWebsiteBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-3"></i>Đang kiểm tra...';
        checkWebsiteBtn.disabled = true;
        quickResult.classList.add('hidden');
    }
    
    // Show quick result
    function showQuickResult(result) {
        // Reset button
        checkWebsiteBtn.innerHTML = '<i class="fas fa-search mr-3"></i>Kiểm tra nhanh';
        checkWebsiteBtn.disabled = false;
        
        // Update result display
        quickStatusIcon.className = `${result.icon} mr-2 ${result.color}`;
        quickStatusText.textContent = result.statusText;
        quickStatusText.className = `font-medium ${result.color}`;
        quickDescription.textContent = result.description;
        
        // Show result
        quickResult.classList.remove('hidden');
        
        // Scroll to result
        quickResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        console.log('Quick check result:', result);
    }
    
    // Show error message
    function showError(message) {
        // Create temporary error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'bg-red-500 text-white px-4 py-3 rounded-lg mb-4 text-center';
        errorDiv.textContent = message;
        
        // Insert before the form
        const form = document.querySelector('.max-w-2xl');
        form.parentNode.insertBefore(errorDiv, form);
        
        // Remove after 3 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }
    
    // Go to detailed analysis page
    function goToDetailedAnalysis() {
        const url = websiteUrlInput.value.trim();
        
        // Store the URL in localStorage for the detailed analysis page
        localStorage.setItem('analysisUrl', url);
        
        // Navigate to detailed analysis page
        window.location.href = 'index.html';
    }
    
    // Add some animations
    function addAnimations() {
        // Animate features on scroll
        const features = document.querySelectorAll('.grid > div');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        });
        
        features.forEach(feature => {
            feature.style.opacity = '0';
            feature.style.transform = 'translateY(20px)';
            feature.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(feature);
        });
    }
    
    // Initialize animations
    addAnimations();
    
    console.log('Home page initialization completed');
}); 