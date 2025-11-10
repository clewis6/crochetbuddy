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
    
    // Detect what type of item is being requested
    const isAmigurumi = /monkey|bunny|bear|cat|dog|animal|creature|character|octopus|elephant|frog|turtle/i.test(request);
    const isBlanket = /blanket|afghan|throw/i.test(request);
    const isClothing = /cardigan|sweater|scarf|hat|shawl|poncho/i.test(request);
    
    if (isAmigurumi) {
        return generateAmigurumiPattern(request);
    } else if (isBlanket) {
        return generateBlanketPattern(request);
    } else if (isClothing) {
        return generateClothingPattern(request);
    } else {
        return generateGenericPattern(request);
    }
}

function generateAmigurumiPattern(request) {
    return {
        title: `Complete Amigurumi Pattern: ${capitalize(request)}`,
        content: `
            <h3>Materials Needed</h3>
            <ul>
                <li>Worsted weight yarn in main color (brown/tan) - 100g</li>
                <li>Small amounts of contrasting colors (white, black, pink)</li>
                <li>4.0mm (G/6) crochet hook</li>
                <li>Yarn needle for sewing and embroidery</li>
                <li>Safety eyes 10-12mm (or black yarn for embroidered eyes)</li>
                <li>Polyester fiberfill stuffing</li>
                <li>Stitch markers</li>
                <li>Scissors</li>
            </ul>
            
            <h3>Pattern Details</h3>
            <p><strong>Skill Level:</strong> Beginner to Intermediate</p>
            <p><strong>Finished Size:</strong> Approximately 8-10 inches tall</p>
            <p><strong>Gauge:</strong> Not critical for amigurumi, but keep tension tight</p>
            
            <h3>Abbreviations</h3>
            <ul>
                <li><strong>ch</strong> - chain</li>
                <li><strong>sc</strong> - single crochet</li>
                <li><strong>inc</strong> - increase (2 sc in one stitch)</li>
                <li><strong>dec</strong> - decrease (sc two stitches together)</li>
                <li><strong>st(s)</strong> - stitch(es)</li>
                <li><strong>rnd</strong> - round</li>
                <li><strong>sl st</strong> - slip stitch</li>
            </ul>
            
            <h3>Head (Make 1)</h3>
            <p><em>Start with main color</em></p>
            <ol>
                <li><strong>Rnd 1:</strong> Magic ring, 6 sc in ring [6]</li>
                <li><strong>Rnd 2:</strong> Inc in each st around [12]</li>
                <li><strong>Rnd 3:</strong> (Sc, inc) x 6 [18]</li>
                <li><strong>Rnd 4:</strong> (2 sc, inc) x 6 [24]</li>
                <li><strong>Rnd 5:</strong> (3 sc, inc) x 6 [30]</li>
                <li><strong>Rnd 6:</strong> (4 sc, inc) x 6 [36]</li>
                <li><strong>Rnd 7-12:</strong> Sc in each st around [36] (6 rounds)</li>
                <li><strong>Rnd 13:</strong> (4 sc, dec) x 6 [30]</li>
                <li><strong>Rnd 14:</strong> (3 sc, dec) x 6 [24]</li>
                <li>Insert safety eyes between rounds 9-10, about 6-7 stitches apart</li>
                <li><strong>Rnd 15:</strong> (2 sc, dec) x 6 [18]</li>
                <li>Stuff head firmly</li>
                <li><strong>Rnd 16:</strong> (Sc, dec) x 6 [12]</li>
                <li><strong>Rnd 17:</strong> Dec around [6]</li>
                <li>Fasten off, leaving long tail. Close opening with yarn needle.</li>
            </ol>
            
            <h3>Body (Make 1)</h3>
            <ol>
                <li><strong>Rnd 1:</strong> Magic ring, 6 sc in ring [6]</li>
                <li><strong>Rnd 2:</strong> Inc in each st around [12]</li>
                <li><strong>Rnd 3:</strong> (Sc, inc) x 6 [18]</li>
                <li><strong>Rnd 4:</strong> (2 sc, inc) x 6 [24]</li>
                <li><strong>Rnd 5:</strong> (3 sc, inc) x 6 [30]</li>
                <li><strong>Rnd 6-11:</strong> Sc in each st around [30] (6 rounds)</li>
                <li><strong>Rnd 12:</strong> (3 sc, dec) x 6 [24]</li>
                <li><strong>Rnd 13-14:</strong> Sc in each st around [24] (2 rounds)</li>
                <li><strong>Rnd 15:</strong> (2 sc, dec) x 6 [18]</li>
                <li>Stuff body firmly</li>
                <li><strong>Rnd 16:</strong> Sc in each st around [18]</li>
                <li>Fasten off, leaving long tail for sewing to head</li>
            </ol>
            
            <h3>Arms (Make 2)</h3>
            <ol>
                <li><strong>Rnd 1:</strong> Magic ring, 6 sc in ring [6]</li>
                <li><strong>Rnd 2:</strong> (Sc, inc) x 3 [9]</li>
                <li><strong>Rnd 3-12:</strong> Sc in each st around [9] (10 rounds)</li>
                <li>Stuff lightly (only bottom half)</li>
                <li>Flatten opening and sc across (4-5 sc)</li>
                <li>Fasten off, leaving long tail for sewing</li>
            </ol>
            
            <h3>Legs (Make 2)</h3>
            <ol>
                <li><strong>Rnd 1:</strong> Magic ring, 6 sc in ring [6]</li>
                <li><strong>Rnd 2:</strong> Inc in each st around [12]</li>
                <li><strong>Rnd 3-4:</strong> Sc in each st around [12] (2 rounds)</li>
                <li><strong>Rnd 5:</strong> (2 sc, dec) x 3 [9]</li>
                <li><strong>Rnd 6-11:</strong> Sc in each st around [9] (6 rounds)</li>
                <li>Stuff firmly</li>
                <li>Flatten opening and sc across (4-5 sc)</li>
                <li>Fasten off, leaving long tail for sewing</li>
            </ol>
            
            <h3>Ears (Make 2)</h3>
            <ol>
                <li><strong>Rnd 1:</strong> Magic ring, 6 sc in ring [6]</li>
                <li><strong>Rnd 2:</strong> Inc in each st around [12]</li>
                <li><strong>Rnd 3:</strong> (Sc, inc) x 6 [18]</li>
                <li><strong>Rnd 4:</strong> Sc in each st around [18]</li>
                <li>Flatten and fasten off, leaving long tail for sewing</li>
            </ol>
            
            <h3>Tail (Optional)</h3>
            <ol>
                <li><strong>Rnd 1:</strong> Magic ring, 5 sc in ring [5]</li>
                <li><strong>Rnd 2-8:</strong> Sc in each st around [5] (7 rounds)</li>
                <li>Do not stuff</li>
                <li>Fasten off, leaving long tail for sewing</li>
            </ol>
            
            <h3>Muzzle/Snout (Make 1)</h3>
            <p><em>Use contrasting color (cream/tan)</em></p>
            <ol>
                <li><strong>Rnd 1:</strong> Magic ring, 6 sc in ring [6]</li>
                <li><strong>Rnd 2:</strong> Inc in each st around [12]</li>
                <li><strong>Rnd 3:</strong> (Sc, inc) x 6 [18]</li>
                <li><strong>Rnd 4:</strong> Sc in each st around [18]</li>
                <li>Stuff lightly</li>
                <li>Fasten off, leaving long tail for sewing</li>
            </ol>
            
            <h3>Assembly Instructions</h3>
            <ol>
                <li><strong>Attach Head to Body:</strong> Position head on top of body and sew securely all around using whip stitch</li>
                <li><strong>Attach Muzzle:</strong> Position muzzle on lower front of face (between eyes) and sew around edges</li>
                <li><strong>Attach Ears:</strong> Sew ears to top sides of head, slightly angled outward</li>
                <li><strong>Attach Arms:</strong> Sew arms to sides of body at shoulder level (round 2-3 of body)</li>
                <li><strong>Attach Legs:</strong> Sew legs to bottom front of body so figure can sit</li>
                <li><strong>Attach Tail:</strong> Sew tail to back of body at bottom</li>
                <li><strong>Embroider Details:</strong>
                    <ul>
                        <li>Use black yarn to embroider nose on muzzle (small triangle or oval)</li>
                        <li>Embroider mouth line below nose with backstitch</li>
                        <li>Add eyebrow stitches above eyes if desired</li>
                        <li>Embroider paw pads on hands and feet with pink yarn (optional)</li>
                    </ul>
                </li>
                <li><strong>Final Touches:</strong> Weave in all ends securely. Brush out any fuzzy areas.</li>
            </ol>
            
            <h3>Tips for Success</h3>
            <ul>
                <li>✨ Keep your tension TIGHT - stuffing should not show through stitches</li>
                <li>✨ Use stitch markers to track beginning of rounds</li>
                <li>✨ Count stitches at end of each round to avoid mistakes</li>
                <li>✨ Stuff as you go - it's easier than trying to stuff at the end</li>
                <li>✨ Don't overstuff limbs - they should be poseable</li>
                <li>✨ Use safety eyes BEFORE closing up the head</li>
                <li>✨ Position limbs before sewing - pin them in place first</li>
                <li>✨ Weave ends through stuffing for extra security</li>
            </ul>
            
            <h3>Customization Ideas</h3>
            <ul>
                <li>🎨 Use different colors for unique variations</li>
                <li>🎀 Add a bow tie or ribbon around neck</li>
                <li>👕 Crochet a tiny vest or outfit</li>
                <li>🌟 Add stripes or color changes to limbs</li>
                <li>💝 Make it bigger or smaller by changing hook size</li>
            </ul>
            
            <p><em><strong>Note:</strong> This is a mock AI-generated pattern for demonstration. For real AI-generated patterns, connect to OpenAI API (see API_SETUP.md)</em></p>
        `
    };
}

function generateBlanketPattern(request) {
    return {
        title: `${capitalize(request)} Pattern`,
        content: `
            <h3>Materials Needed</h3>
            <ul>
                <li>Worsted weight yarn (approx. 800-1200 yards) in desired colors</li>
                <li>5.5mm (I/9) crochet hook</li>
                <li>Yarn needle for weaving ends</li>
                <li>Scissors</li>
            </ul>
            
            <h3>Pattern Details</h3>
            <p><strong>Finished Size:</strong> Approximately 36" x 40" (baby blanket size)</p>
            <p><strong>Gauge:</strong> 14 stitches x 16 rows = 4 inches in pattern</p>
            <p><strong>Skill Level:</strong> Easy</p>
            
            <h3>Pattern Instructions</h3>
            <p><strong>Foundation:</strong> Ch 127 (or any multiple of 4 + 3)</p>
            
            <h4>Row 1:</h4>
            <p>Sc in 2nd ch from hook and in each ch across, turn [126 sc]</p>
            
            <h4>Row 2-100:</h4>
            <p>Ch 1, sc in each st across, turn [126 sc]</p>
            <p><em>Continue until blanket reaches desired length</em></p>
            
            <h4>Border (Optional):</h4>
            <ol>
                <li><strong>Rnd 1:</strong> Work sc evenly around entire edge, working 3 sc in each corner</li>
                <li><strong>Rnd 2:</strong> Ch 1, sc in each st around, working 3 sc in each corner st</li>
                <li><strong>Rnd 3:</strong> Sl st in each st around for decorative edge</li>
            </ol>
            
            <p>Fasten off and weave in all ends.</p>
            
            <h3>Tips</h3>
            <ul>
                <li>✨ Keep tension consistent for even texture</li>
                <li>✨ Count stitches periodically to maintain width</li>
                <li>✨ Block finished blanket for professional look</li>
                <li>✨ Add stripes by changing colors every 4-6 rows</li>
            </ul>
        `
    };
}

function generateClothingPattern(request) {
    return {
        title: `${capitalize(request)} Pattern`,
        content: `
            <h3>Sizing</h3>
            <p>This pattern is written for Adult Small (Medium, Large, XL)</p>
            
            <h3>Materials Needed</h3>
            <ul>
                <li>Worsted weight yarn - 600(700, 800, 900) yards</li>
                <li>5.0mm (H/8) crochet hook</li>
                <li>Yarn needle</li>
                <li>Stitch markers</li>
                <li>Buttons (if applicable)</li>
            </ul>
            
            <h3>Gauge</h3>
            <p>16 stitches x 18 rows = 4 inches in pattern stitch</p>
            <p><em>Gauge is important! Adjust hook size if needed.</em></p>
            
            <h3>Pattern Instructions</h3>
            <h4>Back Panel:</h4>
            <ol>
                <li>Ch 65(73, 81, 89)</li>
                <li>Row 1: Sc in 2nd ch from hook and across, turn</li>
                <li>Rows 2-40: Ch 1, sc in each st across, turn</li>
                <li>Continue until piece measures 14(15, 16, 17)" from beginning</li>
            </ol>
            
            <h4>Front Panel(s):</h4>
            <p>Work same as back panel</p>
            
            <h4>Sleeves (Make 2):</h4>
            <ol>
                <li>Ch 45(49, 53, 57)</li>
                <li>Work in pattern for 17(18, 19, 20)" or desired length</li>
            </ol>
            
            <h4>Assembly:</h4>
            <ol>
                <li>Sew shoulder seams</li>
                <li>Attach sleeves to armholes</li>
                <li>Sew side seams and sleeve seams</li>
                <li>Add border or edging as desired</li>
            </ol>
            
            <h3>Finishing</h3>
            <p>Weave in all ends. Block to measurements. Add buttons or closures if needed.</p>
            
            <h3>Tips</h3>
            <ul>
                <li>✨ Try on as you go to check fit</li>
                <li>✨ Adjust length before finishing</li>
                <li>✨ Block pieces before seaming for easier assembly</li>
            </ul>
        `
    };
}

function generateGenericPattern(request) {
    return {
        title: `${capitalize(request)} Pattern`,
        content: `
            <h3>Materials Needed</h3>
            <ul>
                <li>Appropriate yarn weight for project</li>
                <li>Matching crochet hook</li>
                <li>Yarn needle</li>
                <li>Scissors</li>
                <li>Additional notions as needed</li>
            </ul>
            
            <h3>Pattern Instructions</h3>
            <p>Complete pattern instructions will be generated when connected to AI.</p>
            <p>This is a placeholder pattern. See API_SETUP.md to connect real AI pattern generation.</p>
            
            <h3>General Tips</h3>
            <ul>
                <li>✨ Always check your gauge</li>
                <li>✨ Read through entire pattern before starting</li>
                <li>✨ Keep tension consistent</li>
                <li>✨ Count your stitches regularly</li>
            </ul>
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