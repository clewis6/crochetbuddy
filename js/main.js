// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navList = document.querySelector('.nav-list');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav') && navList.classList.contains('active')) {
            navList.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Here you would integrate with your email service (Mailchimp, ConvertKit, etc.)
        alert(`Thanks for subscribing! We'll send patterns to ${email}`);
        newsletterForm.reset();
    });
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all blog cards and category cards
document.querySelectorAll('.blog-card, .category-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(card);
});

// Active navigation highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-list a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add loading animation for images
document.querySelectorAll('.blog-image img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease-in';
});

// Simulate ad loading (replace with actual ad network code)
document.querySelectorAll('.ad-zone').forEach(adZone => {
    // This is where you would load your actual ads
    // Example for Google AdSense:
    // <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    // (adsbygoogle = window.adsbygoogle || []).push({});
    
    adZone.style.minHeight = adZone.classList.contains('ad-sidebar') ? '250px' : '90px';
});

// Social share functionality (optional enhancement)
function shareOnSocial(platform, url, title) {
    const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
        pinterest: `https://pinterest.com/pin/create/button/?url=${url}&description=${title}`,
        whatsapp: `https://wa.me/?text=${title} ${url}`
    };
    
    if (shareUrls[platform]) {
        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
}

// AI Pattern Generator
const patternInput = document.getElementById('patternRequest');
const generateBtn = document.getElementById('generatePattern');
const patternOutput = document.getElementById('patternOutput');
const patternContent = document.getElementById('patternContent');
const patternTitle = document.getElementById('patternTitle');
const generateAnotherBtn = document.getElementById('generateAnother');
const copyPatternBtn = document.getElementById('copyPattern');
const savePatternBtn = document.getElementById('savePattern');

// Suggestion buttons
const suggestionBtns = document.querySelectorAll('.suggestion-btn');
suggestionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const prompt = btn.getAttribute('data-prompt');
        patternInput.value = prompt;
        generatePattern();
    });
});

// Category buttons
const categoryBtns = document.querySelectorAll('.category-btn');
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-category');
        patternInput.value = `Create a ${category} pattern`;
        patternInput.focus();
        patternInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
});

// Generate pattern
if (generateBtn) {
    generateBtn.addEventListener('click', generatePattern);
    
    patternInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            generatePattern();
        }
    });
}

async function generatePattern() {
    const request = patternInput.value.trim();
    
    if (!request) {
        alert('Please describe what you want to crochet! 🧶');
        return;
    }
    
    // Show loading state
    const btnText = generateBtn.querySelector('.btn-text');
    const btnLoading = generateBtn.querySelector('.btn-loading');
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    generateBtn.disabled = true;
    
    try {
        // Call OpenAI API or use a mock pattern for now
        const pattern = await generateCrochetPattern(request);
        
        // Display the pattern
        patternTitle.textContent = pattern.title;
        patternContent.innerHTML = pattern.content;
        
        // Show output section
        patternOutput.classList.add('active');
        patternOutput.style.display = 'block';
        
        // Scroll to output
        setTimeout(() => {
            patternOutput.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
        
    } catch (error) {
        alert('Oops! Something went wrong. Please try again! 😊');
        console.error('Pattern generation error:', error);
    } finally {
        // Reset button state
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        generateBtn.disabled = false;
    }
}

// Mock pattern generator (replace with actual API call)
async function generateCrochetPattern(request) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For now, return a mock pattern
    // TODO: Replace with actual OpenAI API call
    return {
        title: `Custom Pattern: ${capitalize(request)}`,
        content: `
            <h3>Materials Needed</h3>
            <ul>
                <li>Worsted weight yarn (main color) - 100g</li>
                <li>4.0mm (G/6) crochet hook</li>
                <li>Yarn needle for weaving ends</li>
                <li>Scissors</li>
                <li>Stitch markers</li>
                <li>Polyester fiberfill (if needed for stuffing)</li>
            </ul>
            
            <h3>Pattern Details</h3>
            <p><strong>Skill Level:</strong> Beginner to Intermediate</p>
            <p><strong>Finished Size:</strong> Approximately 6-8 inches</p>
            <p><strong>Gauge:</strong> 16 stitches x 18 rows = 4 inches in single crochet</p>
            
            <h3>Abbreviations</h3>
            <ul>
                <li><strong>ch</strong> - chain</li>
                <li><strong>sc</strong> - single crochet</li>
                <li><strong>inc</strong> - increase (2 sc in one stitch)</li>
                <li><strong>dec</strong> - decrease (sc two stitches together)</li>
                <li><strong>st(s)</strong> - stitch(es)</li>
                <li><strong>rnd</strong> - round</li>
            </ul>
            
            <h3>Instructions</h3>
            <h4>Starting</h4>
            <ol>
                <li><strong>Rnd 1:</strong> Magic ring, 6 sc in ring [6]</li>
                <li><strong>Rnd 2:</strong> Inc in each st around [12]</li>
                <li><strong>Rnd 3:</strong> (Sc, inc) x 6 [18]</li>
                <li><strong>Rnd 4:</strong> (2 sc, inc) x 6 [24]</li>
                <li><strong>Rnd 5:</strong> (3 sc, inc) x 6 [30]</li>
            </ol>
            
            <h4>Main Body</h4>
            <ol start="6">
                <li><strong>Rnd 6-10:</strong> Sc in each st around [30] (5 rounds)</li>
                <li><strong>Rnd 11:</strong> (3 sc, dec) x 6 [24]</li>
                <li><strong>Rnd 12:</strong> (2 sc, dec) x 6 [18]</li>
                <li>Stuff firmly with fiberfill</li>
                <li><strong>Rnd 13:</strong> (Sc, dec) x 6 [12]</li>
                <li><strong>Rnd 14:</strong> Dec around [6]</li>
                <li>Fasten off, weave in ends</li>
            </ol>
            
            <h3>Finishing Touches</h3>
            <p>Add any embellishments, eyes, or details as desired. Weave in all loose ends securely.</p>
            
            <h3>Tips for Success</h3>
            <ul>
                <li>✨ Keep your tension consistent throughout</li>
                <li>✨ Use stitch markers to track your rounds</li>
                <li>✨ Don't overstuff - it should be firm but not bulging</li>
                <li>✨ Count your stitches at the end of each round</li>
            </ul>
            
            <p><em>Note: This is an AI-generated pattern. Please test and adjust as needed for your specific project!</em></p>
        `
    };
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Generate another pattern
if (generateAnotherBtn) {
    generateAnotherBtn.addEventListener('click', () => {
        patternOutput.classList.remove('active');
        patternOutput.style.display = 'none';
        patternInput.value = '';
        patternInput.focus();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Copy pattern to clipboard
if (copyPatternBtn) {
    copyPatternBtn.addEventListener('click', async () => {
        const patternText = patternContent.innerText;
        try {
            await navigator.clipboard.writeText(patternText);
            copyPatternBtn.textContent = '✅ Copied!';
            setTimeout(() => {
                copyPatternBtn.textContent = '📋 Copy to Clipboard';
            }, 2000);
        } catch (err) {
            alert('Could not copy pattern. Please select and copy manually.');
        }
    });
}

// Save pattern as PDF (basic implementation)
if (savePatternBtn) {
    savePatternBtn.addEventListener('click', () => {
        window.print();
    });
}

// Console welcome message
console.log('%cWelcome to CrochetBuddy! 🧶', 'color: #e91e63; font-size: 24px; font-weight: bold;');
console.log('%cYour AI-powered crochet pattern generator', 'color: #764ba2; font-size: 14px;');