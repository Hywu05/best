// EML File Analyzer for Security Checker
class EMLAnalyzer {
    constructor() {
        this.fileInput = null;
        this.browseBtn = null;
        this.analyzeBtn = null;
        this.fileInfo = null;
        this.fileName = null;
        this.fileSize = null;
        this.currentFile = null;
    }
    
    init() {
        this.fileInput = document.getElementById('emlFileInput');
        this.browseBtn = document.getElementById('browseFileBtn');
        this.analyzeBtn = document.getElementById('analyzeFileBtn');
        this.fileInfo = document.getElementById('fileInfo');
        this.fileName = document.getElementById('fileName');
        this.fileSize = document.getElementById('fileSize');
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Browse button click
        if (this.browseBtn) {
            this.browseBtn.addEventListener('click', () => {
                this.fileInput.click();
            });
        }
        
        // File input change
        if (this.fileInput) {
            this.fileInput.addEventListener('change', (e) => {
                this.handleFileSelect(e.target.files[0]);
            });
        }
        
        // Analyze button click
        if (this.analyzeBtn) {
            this.analyzeBtn.addEventListener('click', () => {
                this.analyzeEMLFile();
            });
        }
        
        // Drag and drop functionality
        this.setupDragAndDrop();
    }
    
    setupDragAndDrop() {
        const dropZone = document.querySelector('#fileInputSection .border-dashed');
        
        if (dropZone) {
            dropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropZone.classList.add('border-blue-400', 'bg-blue-50');
            });
            
            dropZone.addEventListener('dragleave', (e) => {
                e.preventDefault();
                dropZone.classList.remove('border-blue-400', 'bg-blue-50');
            });
            
            dropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropZone.classList.remove('border-blue-400', 'bg-blue-50');
                
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    this.handleFileSelect(files[0]);
                }
            });
        }
    }
    
    handleFileSelect(file) {
        if (!file) return;
        
        // Check if it's a .eml file
        if (!file.name.toLowerCase().endsWith('.eml')) {
            alert('Please select a .eml file');
            return;
        }
        
        // Check file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            alert('File size must be less than 10MB');
            return;
        }
        
        this.currentFile = file;
        
        // Update UI
        this.fileName.textContent = file.name;
        this.fileSize.textContent = this.formatFileSize(file.size);
        this.fileInfo.classList.remove('hidden');
        this.analyzeBtn.classList.remove('hidden');
        
        console.log('File selected:', file.name, 'Size:', this.formatFileSize(file.size));
    }
    
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    async analyzeEMLFile() {
        if (!this.currentFile) return;
        
        console.log('Starting EML analysis...');
        
        // Show loading state
        this.analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-3"></i> Analyzing...';
        this.analyzeBtn.disabled = true;
        
        try {
            const content = await this.readFileContent(this.currentFile);
            const analysis = this.parseEMLContent(content);
            
            console.log('EML Analysis result:', analysis);
            
            // Show results
            this.displayEMLAnalysisResults(analysis);
            
        } catch (error) {
            console.error('Error analyzing EML file:', error);
            alert('Error analyzing file. Please try again.');
        } finally {
            // Reset button
            this.analyzeBtn.innerHTML = '<i class="fas fa-shield-alt mr-3"></i> Analyze .eml File';
            this.analyzeBtn.disabled = false;
        }
    }
    
    readFileContent(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(e);
            reader.readAsText(file);
        });
    }
    
    parseEMLContent(content) {
        const analysis = {
            from: '',
            to: '',
            subject: '',
            date: '',
            urls: [],
            suspiciousPatterns: [],
            riskLevel: 'low',
            recommendations: []
        };
        
        // Parse headers
        const lines = content.split('\n');
        let inBody = false;
        let bodyContent = '';
        
        for (let line of lines) {
            line = line.trim();
            
            if (!inBody) {
                // Parse headers
                if (line.toLowerCase().startsWith('from:')) {
                    analysis.from = line.substring(5).trim();
                } else if (line.toLowerCase().startsWith('to:')) {
                    analysis.to = line.substring(3).trim();
                } else if (line.toLowerCase().startsWith('subject:')) {
                    analysis.subject = line.substring(8).trim();
                } else if (line.toLowerCase().startsWith('date:')) {
                    analysis.date = line.substring(5).trim();
                } else if (line === '') {
                    inBody = true; // Empty line marks start of body
                }
            } else {
                bodyContent += line + '\n';
            }
        }
        
        // Extract URLs from body
        const urlRegex = /https?:\/\/[^\s"<>]+/gi;
        const urls = bodyContent.match(urlRegex);
        if (urls) {
            analysis.urls = urls;
        }
        
        // Check for suspicious patterns
        const suspiciousKeywords = [
            'urgent', 'account suspended', 'verify', 'password', 'bank', 'paypal', 'amazon',
            'microsoft', 'apple', 'security', 'login', 'confirm', 'update', 'limited time',
            'free', 'winner', 'prize', 'lottery', 'inheritance', 'urgent action required'
        ];
        
        const lowerContent = bodyContent.toLowerCase();
        for (const keyword of suspiciousKeywords) {
            if (lowerContent.includes(keyword)) {
                analysis.suspiciousPatterns.push(keyword);
            }
        }
        
        // Determine risk level
        if (analysis.suspiciousPatterns.length > 5 || analysis.urls.length > 3) {
            analysis.riskLevel = 'high';
        } else if (analysis.suspiciousPatterns.length > 2 || analysis.urls.length > 1) {
            analysis.riskLevel = 'medium';
        }
        
        // Generate recommendations
        if (analysis.riskLevel === 'high') {
            analysis.recommendations = [
                'This email shows multiple suspicious characteristics',
                'Do not click on any links in this email',
                'Do not provide any personal information',
                'Report this email to your IT department'
            ];
        } else if (analysis.riskLevel === 'medium') {
            analysis.recommendations = [
                'This email shows some suspicious patterns',
                'Verify the sender before taking any action',
                'Be cautious with any links or attachments'
            ];
        } else {
            analysis.recommendations = [
                'This email appears to be safe',
                'Always verify the sender before responding',
                'Keep your antivirus software updated'
            ];
        }
        
        return analysis;
    }
    
    displayEMLAnalysisResults(analysis) {
        // Show results section
        const resultsSection = document.getElementById('resultsSection');
        if (resultsSection) {
            resultsSection.classList.remove('hidden');
            resultsSection.style.display = 'block';
        }
        
        // Update analyzed content
        const analyzedContent = document.getElementById('analyzedContent');
        if (analyzedContent) {
            analyzedContent.textContent = this.currentFile.name;
        }
        
        // Create EML-specific result
        const result = {
            status: analysis.riskLevel === 'high' ? 'Dangerous' : analysis.riskLevel === 'medium' ? 'Suspicious' : 'Safe',
            statusColor: analysis.riskLevel === 'high' ? 'red' : analysis.riskLevel === 'medium' ? 'yellow' : 'green',
            statusIcon: analysis.riskLevel === 'high' ? 'fa-skull-crossbones' : analysis.riskLevel === 'medium' ? 'fa-exclamation-triangle' : 'fa-check-circle',
            category: analysis.riskLevel === 'high' ? 'Critical' : analysis.riskLevel === 'medium' ? 'Suspicious' : 'Safe',
            details: `EML Analysis: ${analysis.suspiciousPatterns.length} suspicious patterns found, ${analysis.urls.length} URLs detected`,
            recommendations: analysis.recommendations,
            analysisResults: {
                emailContent: `From: ${analysis.from}`,
                urlAnalysis: `Found ${analysis.urls.length} URLs in email content`,
                phoneCheck: 'Phone analysis not applicable for EML files',
                senderCheck: `Sender: ${analysis.from}`,
                websiteCheck: `URLs: ${analysis.urls.join(', ')}`,
                docCheck: 'Document analysis completed'
            },
            riskLevel: analysis.riskLevel === 'high' ? 25 : analysis.riskLevel === 'medium' ? 50 : 100
        };
        
        // Display results using existing function
        if (typeof displayResults === 'function') {
            displayResults(result);
        }
        
        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize EML Analyzer when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.emlAnalyzer = new EMLAnalyzer();
    window.emlAnalyzer.init();
}); 