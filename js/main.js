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

// Pattern card buttons
const patternCardBtns = document.querySelectorAll('.generate-pattern-btn');
patternCardBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.pattern-card');
        const patternRequest = card.getAttribute('data-pattern');
        patternInput.value = patternRequest;
        generatePattern();
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
    const isPoncho = /poncho/i.test(request);
    const isAmigurumi = /monkey|bunny|bear|cat|dog|animal|creature|character|octopus|elephant|frog|turtle|bird|fox|lion|tiger|giraffe|penguin|owl|unicorn|dragon|dinosaur|mouse|rat|hamster|pig|cow|sheep|horse|zebra|koala|panda|sloth|raccoon|squirrel|bee|butterfly|ladybug|spider|fish|whale|dolphin|shark|snake|cactus|mushroom|flower|fruit|strawberry|avocado|lemon|apple|watermelon|pumpkin|ghost|monster|alien|robot/i.test(request);
    const isBlanket = /blanket|afghan|throw|bedspread|coverlet/i.test(request);
    const isClothing = /cardigan|sweater|scarf|hat|beanie|beret|shawl|vest|jacket|coat|mittens|gloves|socks|slippers|bolero|cape|cowl|headband|ear warmer|wrist warmer|leg warmer/i.test(request);
    const isBaby = /baby|infant|newborn|bib|bootie|bonnet|onesie|diaper cover|mobile|teether|rattle/i.test(request);
    const isAccessory = /bag|purse|tote|backpack|pouch|wallet|clutch|market bag|basket|coaster|placemat|potholder|dishcloth|washcloth|scrubby/i.test(request);
    const isHomeDecor = /pillow|cushion|rug|mat|wall hanging|garland|bunting|wreath|doily|table runner|tablecloth/i.test(request);
    const isToy = /toy|ball|blocks|teether|sensory/i.test(request) && !isAmigurumi;
    
    if (isPoncho) {
        return generatePonchoPattern(request);
    } else if (isAmigurumi) {
        return generateAmigurumiPattern(request);
    } else if (isBlanket) {
        return generateBlanketPattern(request);
    } else if (isClothing) {
        return generateClothingPattern(request);
    } else if (isBaby) {
        return generateBabyPattern(request);
    } else if (isAccessory) {
        return generateAccessoryPattern(request);
    } else if (isHomeDecor) {
        return generateHomeDecorPattern(request);
    } else if (isToy) {
        return generateToyPattern(request);
    } else {
        // For anything else, create a comprehensive pattern
        return generateUniversalPattern(request);
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
        `
    };
}

function generatePonchoPattern(request) {
    const hasHood = /hood/i.test(request);
    return {
        title: `${capitalize(request)} Pattern`,
        content: `
            <h3>Materials Needed</h3>
            <ul>
                <li>Bulky weight yarn (5) - approximately 1200-1500 yards</li>
                <li>6.5mm (K/10.5) crochet hook</li>
                <li>Yarn needle for sewing seams</li>
                <li>Stitch markers</li>
                <li>Measuring tape</li>
                <li>Scissors</li>
            </ul>
            
            <h3>Sizing</h3>
            <p><strong>One Size Fits Most</strong> - Oversized fit for S/M/L</p>
            <p><strong>Finished Measurements:</strong></p>
            <ul>
                <li>Length: 28 inches from shoulder to hem</li>
                <li>Width: 60 inches across (30 inches each side from center)</li>
                ${hasHood ? '<li>Hood depth: 12 inches</li>' : ''}
            </ul>
            
            <h3>Gauge</h3>
            <p>12 stitches x 14 rows = 4 inches in single crochet</p>
            <p><em>Gauge is important for proper fit!</em></p>
            
            <h3>Abbreviations</h3>
            <ul>
                <li><strong>ch</strong> - chain</li>
                <li><strong>sc</strong> - single crochet</li>
                <li><strong>hdc</strong> - half double crochet</li>
                <li><strong>dc</strong> - double crochet</li>
                <li><strong>inc</strong> - increase (2 stitches in one)</li>
                <li><strong>dec</strong> - decrease</li>
                <li><strong>st(s)</strong> - stitch(es)</li>
                <li><strong>sl st</strong> - slip stitch</li>
            </ul>
            
            <h3>Main Body (Front and Back Combined)</h3>
            <p><strong>Construction:</strong> This poncho is worked from the top down in one piece</p>
            
            <h4>Neck Opening</h4>
            <ol>
                <li><strong>Foundation:</strong> Ch 60 (or chain to measure 20 inches)</li>
                <li>Join with sl st to first ch to form ring, being careful not to twist</li>
                <li>Mark beginning of round</li>
            </ol>
            
            <h4>Body Expansion Rounds</h4>
            <ol>
                <li><strong>Rnd 1:</strong> Ch 2 (counts as first hdc), hdc in each ch around, join with sl st to top of ch-2 [60 hdc]</li>
                <li><strong>Rnd 2:</strong> Ch 2, hdc in same st, hdc in next 29 sts, 2 hdc in next st (corner), hdc in next 29 sts, 2 hdc in last st (corner), join [62 hdc]</li>
                <li><strong>Rnd 3:</strong> Ch 2, hdc in each st around, join [62 hdc]</li>
                <li><strong>Rnd 4:</strong> Ch 2, hdc in next 30 sts, 2 hdc in next st, hdc in next 30 sts, 2 hdc in next st, join [64 hdc]</li>
                <li><strong>Rnds 5-20:</strong> Continue in this manner, increasing 2 sts every other round at front and back "corners" until you have approximately 90 sts</li>
            </ol>
            
            <h4>Straight Body Section</h4>
            <ol start="21">
                <li><strong>Rnds 21-50:</strong> Ch 2, hdc in each st around, join [90 hdc per round]</li>
                <li>Continue working even (no increases) until poncho measures 28 inches from neck or desired length</li>
            </ol>
            
            <h4>Bottom Border</h4>
            <ol>
                <li><strong>Rnd 1:</strong> Ch 1, sc in each st around, join [90 sc]</li>
                <li><strong>Rnd 2:</strong> Ch 1, sc in each st around, join [90 sc]</li>
                <li><strong>Rnd 3:</strong> Ch 1, *sc in next 8 sts, 2 sc in next st*, repeat around, join [100 sc]</li>
                <li>Fasten off and weave in ends</li>
            </ol>
            
            ${hasHood ? `
            <h3>Hood Construction</h3>
            <p><strong>The hood is worked separately and sewn on</strong></p>
            
            <h4>Hood Base</h4>
            <ol>
                <li><strong>Foundation:</strong> Ch 37</li>
                <li><strong>Row 1:</strong> Hdc in 3rd ch from hook (skipped chs count as first hdc), hdc in each ch across, turn [36 hdc]</li>
                <li><strong>Row 2:</strong> Ch 2, hdc in each st across, turn [36 hdc]</li>
                <li><strong>Rows 3-35:</strong> Repeat Row 2 [36 hdc per row]</li>
                <li>Continue until hood piece measures approximately 12 inches from beginning</li>
                <li>Do not fasten off</li>
            </ol>
            
            <h4>Hood Seam</h4>
            <ol>
                <li>Fold hood piece in half lengthwise with right sides together</li>
                <li>Working through both layers, sl st or sc across top edge to seam hood closed</li>
                <li>Turn hood right side out</li>
            </ol>
            
            <h4>Hood Edging</h4>
            <ol>
                <li><strong>Rnd 1:</strong> With hood right side out, join yarn at center back bottom edge</li>
                <li>Work sc evenly all the way around hood opening (approximately 60-70 sc)</li>
                <li><strong>Rnd 2:</strong> Ch 1, sc in each st around, join</li>
                <li>Fasten off, leaving long tail for sewing</li>
            </ol>
            
            <h4>Attaching Hood to Poncho</h4>
            <ol>
                <li>Turn poncho inside out</li>
                <li>Pin hood to neck opening, matching center back of hood to center back of poncho</li>
                <li>Distribute hood evenly around neck opening</li>
                <li>Using yarn needle and matching yarn, whip stitch hood to neck opening all the way around</li>
                <li>Reinforce seam by stitching over it a second time</li>
                <li>Turn poncho right side out and check hood for proper fit</li>
            </ol>
            
            <h3>Hood Shaping Tips</h3>
            <ul>
                <li>✨ Make sure hood seam is at center back top for proper draping</li>
                <li>✨ Hood should sit comfortably without pulling or gaping</li>
                <li>✨ Try on as you attach to check fit before finishing seam</li>
                <li>✨ Add drawstring with chain stitch if desired</li>
            </ul>
            ` : ''}
            
            <h3>Optional: Front Pockets (Make 2)</h3>
            <ol>
                <li><strong>Foundation:</strong> Ch 21</li>
                <li><strong>Row 1:</strong> Sc in 2nd ch from hook and across, turn [20 sc]</li>
                <li><strong>Rows 2-15:</strong> Ch 1, sc in each st across, turn [20 sc]</li>
                <li>Fasten off, leaving long tail for sewing</li>
                <li>Position pockets on front of poncho about 8 inches down from neck and 6 inches in from each side edge</li>
                <li>Pin in place and sew around bottom and side edges, leaving top open</li>
            </ol>
            
            <h3>Finishing</h3>
            <ul>
                <li>Weave in all loose ends securely</li>
                <li>Steam block gently if needed (avoid direct heat on synthetic yarns)</li>
                <li>Try on and make any final adjustments</li>
            </ul>
            
            <h3>Styling Variations</h3>
            <ul>
                <li>🎨 <strong>Striped:</strong> Change colors every 4-6 rounds for bold stripes</li>
                <li>🌈 <strong>Ombre:</strong> Gradually shift from light to dark shades</li>
                <li>✨ <strong>Textured:</strong> Alternate rounds of hdc and dc for dimension</li>
                <li>🎀 <strong>Belted:</strong> Add belt loops and wear with a statement belt</li>
                <li>🧶 <strong>Fringed:</strong> Add long fringe around bottom hem</li>
            </ul>
            
            <h3>Fit Adjustments</h3>
            <ul>
                <li><strong>Shorter Length:</strong> Work fewer rounds in straight body section</li>
                <li><strong>Longer Length:</strong> Continue straight section to desired length</li>
                <li><strong>Larger Neck:</strong> Start with 70-80 chain instead of 60</li>
                <li><strong>Smaller Neck:</strong> Start with 50 chain</li>
                ${hasHood ? '<li><strong>Deeper Hood:</strong> Work 40-45 rows instead of 35</li>' : ''}
                ${hasHood ? '<li><strong>Cozier Hood:</strong> Add drawstring through round 2 of hood edge</li>' : ''}
            </ul>
            
            <h3>Care Instructions</h3>
            <ul>
                <li>🧼 Hand wash in cool water with mild detergent</li>
                <li>💧 Gently squeeze out excess water (do not wring)</li>
                <li>🌡️ Lay flat on towel to dry, reshaping as needed</li>
                <li>🔄 Store folded or hanging to maintain shape</li>
            </ul>
            
            <h3>Troubleshooting</h3>
            <ul>
                <li>📐 <strong>Poncho too snug:</strong> Increase starting chain or use larger hook</li>
                <li>🔄 <strong>Poncho too loose:</strong> Decrease starting chain or use smaller hook</li>
                <li>⚖️ <strong>Uneven hem:</strong> Block thoroughly and adjust final round</li>
                ${hasHood ? '<li>🎩 <strong>Hood too tight:</strong> Start hood with 40 chains instead of 37</li>' : ''}
                ${hasHood ? '<li>🎪 <strong>Hood too loose:</strong> Start with 34 chains and work to 10 inches</li>' : ''}
                ${hasHood ? '<li>🧵 <strong>Hood pulling:</strong> Check that it\'s centered and evenly distributed around neck</li>' : ''}
            </ul>
            
            <h3>Pro Tips</h3>
            <ul>
                <li>✨ Use stitch markers every 15-20 stitches to help count rows</li>
                <li>✨ Try on frequently as you work to check length and fit</li>
                <li>✨ Consider using a lighter weight yarn with smaller hook for a drapier poncho</li>
                <li>✨ A contrasting color for the border adds visual interest</li>
                ${hasHood ? '<li>✨ Make hood first to ensure you have enough yarn</li>' : ''}
                ${hasHood ? '<li>✨ Add a button or toggle to hood for closure at neck</li>' : ''}
                <li>✨ This pattern works great for color pooling yarns!</li>
            </ul>
            
            <p><strong>Enjoy your cozy new poncho! 🧶✨</strong></p>
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

function generateBabyPattern(request) {
    return {
        title: `${capitalize(request)} Pattern`,
        content: `
            <h3>Materials Needed</h3>
            <ul>
                <li>Baby-safe soft yarn (acrylic or cotton) - 200-300 yards</li>
                <li>4.0-5.0mm crochet hook</li>
                <li>Yarn needle</li>
                <li>Stitch markers</li>
                <li>Safety closures (no small parts for babies!)</li>
            </ul>
            
            <h3>Pattern Details</h3>
            <p><strong>Size:</strong> Newborn to 12 months (adjustable)</p>
            <p><strong>Skill Level:</strong> Easy to Intermediate</p>
            <p><strong>Special Notes:</strong> Use baby-safe materials only. Avoid buttons, beads, or small embellishments.</p>
            
            <h3>Main Piece Instructions</h3>
            <ol>
                <li><strong>Foundation:</strong> Ch 20 (adjust for size)</li>
                <li><strong>Row 1:</strong> Sc in 2nd ch from hook and across, turn [19]</li>
                <li><strong>Row 2-30:</strong> Ch 1, sc in each st across, turn</li>
                <li>Continue until piece measures desired length</li>
                <li>Fasten off</li>
            </ol>
            
            <h3>Border (Optional)</h3>
            <ol>
                <li><strong>Rnd 1:</strong> Work sc evenly around all edges</li>
                <li><strong>Rnd 2:</strong> Ch 1, sc in each st around</li>
                <li>Sl st to first sc, fasten off</li>
            </ol>
            
            <h3>Assembly</h3>
            <ul>
                <li>Weave in all ends securely</li>
                <li>Add any safe embellishments (embroidered details only)</li>
                <li>Wash and block if needed</li>
            </ul>
            
            <h3>Care Instructions</h3>
            <ul>
                <li>🧼 Machine wash gentle, cold water</li>
                <li>🌡️ Lay flat to dry</li>
                <li>✋ Inspect regularly for loose threads</li>
            </ul>
            
            <h3>Safety Tips</h3>
            <ul>
                <li>⚠️ Never use buttons, beads, or removable parts</li>
                <li>⚠️ Embroider faces instead of using safety eyes</li>
                <li>⚠️ Make sure all ends are woven in very securely</li>
                <li>⚠️ Test item before giving to baby</li>
            </ul>
        `
    };
}

function generateAccessoryPattern(request) {
    return {
        title: `${capitalize(request)} Pattern`,
        content: `
            <h3>Materials Needed</h3>
            <ul>
                <li>Worsted weight yarn - 200-400 yards (depending on size)</li>
                <li>5.0mm (H/8) crochet hook</li>
                <li>Yarn needle for weaving ends</li>
                <li>Stitch markers</li>
                <li>Lining fabric (optional, for bags)</li>
                <li>Zipper, snap, or button closure (if applicable)</li>
            </ul>
            
            <h3>Pattern Details</h3>
            <p><strong>Finished Size:</strong> Approximately 10" x 12" (adjust as desired)</p>
            <p><strong>Gauge:</strong> 16 stitches x 18 rows = 4 inches in sc</p>
            <p><strong>Skill Level:</strong> Intermediate</p>
            
            <h3>Main Body</h3>
            <ol>
                <li><strong>Foundation:</strong> Ch 41</li>
                <li><strong>Row 1:</strong> Sc in 2nd ch from hook and across, turn [40]</li>
                <li><strong>Row 2-40:</strong> Ch 1, sc in each st across, turn [40]</li>
                <li>Continue working in sc until piece reaches desired size</li>
            </ol>
            
            <h3>Handles/Straps (Make 2)</h3>
            <ol>
                <li>Ch 61 (or desired length)</li>
                <li><strong>Row 1:</strong> Sc in 2nd ch from hook and across [60]</li>
                <li><strong>Row 2-4:</strong> Ch 1, sc in each st across, turn [60]</li>
                <li>Fasten off, leaving long tail for sewing</li>
            </ol>
            
            <h3>Assembly</h3>
            <ol>
                <li>Fold main body in half (if making a bag/pouch)</li>
                <li>Sew side seams using whip stitch or sl st</li>
                <li>Attach handles/straps securely to top edges</li>
                <li>Add closure mechanism if desired</li>
                <li>Optional: Add lining for structure and durability</li>
            </ol>
            
            <h3>Finishing Touches</h3>
            <ul>
                <li>Weave in all ends</li>
                <li>Steam block for crisp edges</li>
                <li>Add decorative elements (buttons, appliques, etc.)</li>
            </ul>
            
            <h3>Customization Ideas</h3>
            <ul>
                <li>🎨 Add stripes or color blocking</li>
                <li>✨ Use textured stitches (bobbles, popcorn, shells)</li>
                <li>🌸 Add crochet flowers or appliques</li>
                <li>💫 Try different yarn weights for varied looks</li>
            </ul>
        `
    };
}

function generateHomeDecorPattern(request) {
    return {
        title: `${capitalize(request)} Pattern`,
        content: `
            <h3>Materials Needed</h3>
            <ul>
                <li>Worsted or bulky weight yarn - 300-600 yards</li>
                <li>5.5-6.0mm crochet hook</li>
                <li>Yarn needle for weaving ends</li>
                <li>Stitch markers</li>
                <li>Pillow form or stuffing (if applicable)</li>
            </ul>
            
            <h3>Pattern Details</h3>
            <p><strong>Finished Size:</strong> 16" x 16" (or customize to your needs)</p>
            <p><strong>Gauge:</strong> 14 stitches x 16 rows = 4 inches</p>
            <p><strong>Skill Level:</strong> Easy to Intermediate</p>
            
            <h3>Front Panel</h3>
            <ol>
                <li><strong>Foundation:</strong> Ch 57</li>
                <li><strong>Row 1:</strong> Sc in 2nd ch from hook and across, turn [56]</li>
                <li><strong>Row 2:</strong> Ch 1, sc in each st across, turn [56]</li>
                <li><strong>Repeat Row 2</strong> until piece measures 16" (or desired size)</li>
                <li>Fasten off</li>
            </ol>
            
            <h3>Back Panel</h3>
            <p>Work same as front panel</p>
            
            <h3>Assembly</h3>
            <ol>
                <li>Place front and back panels together, wrong sides facing</li>
                <li>Work sc around three sides, joining panels together</li>
                <li>Insert pillow form or stuffing</li>
                <li>Continue sc across fourth side to close</li>
                <li>Sl st to first sc, fasten off</li>
            </ol>
            
            <h3>Decorative Border (Optional)</h3>
            <ol>
                <li><strong>Rnd 1:</strong> Join yarn in any corner, work sc evenly around</li>
                <li><strong>Rnd 2:</strong> *Ch 3, skip 1 st, sc in next st; repeat from * around</li>
                <li>Or use shell stitch: *(5 dc) in same st, skip 2 sts, sc in next st*</li>
                <li>Fasten off and weave in ends</li>
            </ol>
            
            <h3>Pattern Variations</h3>
            <ul>
                <li>🌟 Use granny squares for a classic look</li>
                <li>🌊 Create ripple or chevron patterns</li>
                <li>🎯 Work in the round for circular designs</li>
                <li>🧩 Mix different stitch patterns for texture</li>
            </ul>
            
            <h3>Care Instructions</h3>
            <ul>
                <li>Spot clean or hand wash</li>
                <li>Lay flat to dry</li>
                <li>Steam block if needed</li>
            </ul>
        `
    };
}

function generateToyPattern(request) {
    return {
        title: `${capitalize(request)} Pattern`,
        content: `
            <h3>Materials Needed</h3>
            <ul>
                <li>Worsted weight yarn in various colors - 100-200g total</li>
                <li>4.0mm (G/6) crochet hook</li>
                <li>Polyester fiberfill stuffing</li>
                <li>Yarn needle</li>
                <li>Stitch markers</li>
                <li>Safety eyes or embroidery floss (for faces)</li>
            </ul>
            
            <h3>Safety First!</h3>
            <p><strong>⚠️ Important:</strong> For children under 3, embroider all features. No small parts!</p>
            
            <h3>Main Body/Ball</h3>
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
                <li>Stuff firmly</li>
                <li><strong>Rnd 15:</strong> (2 sc, dec) x 6 [18]</li>
                <li><strong>Rnd 16:</strong> (Sc, dec) x 6 [12]</li>
                <li><strong>Rnd 17:</strong> Dec around [6]</li>
                <li>Fasten off, close opening</li>
            </ol>
            
            <h3>Embellishments</h3>
            <ul>
                <li>Add stripes in different colors</li>
                <li>Embroider patterns or designs</li>
                <li>Attach crochet shapes (stars, flowers, etc.)</li>
                <li>Add texture with different stitches</li>
            </ul>
            
            <h3>Additional Pieces (if needed)</h3>
            <p>Create additional components like handles, tags, or attachments as desired</p>
            
            <h3>Safety Tips</h3>
            <ul>
                <li>✅ Use tight tension so stuffing doesn't come out</li>
                <li>✅ Securely weave in all ends</li>
                <li>✅ Test toy before giving to child</li>
                <li>✅ Wash in gentle cycle, air dry</li>
            </ul>
        `
    };
}

function generateUniversalPattern(request) {
    // This creates a comprehensive pattern for anything!
    return {
        title: `Complete ${capitalize(request)} Pattern`,
        content: `
            <h3>Materials Needed</h3>
            <ul>
                <li>Appropriate weight yarn for your project - 200-500 yards (adjust based on size)</li>
                <li>Recommended crochet hook: 4.0-5.5mm (size depends on yarn and desired fabric)</li>
                <li>Yarn needle for weaving ends and seaming</li>
                <li>Stitch markers to track your progress</li>
                <li>Scissors</li>
                <li>Stuffing, lining, or other notions as needed for your specific item</li>
            </ul>
            
            <h3>Pattern Details</h3>
            <p><strong>Skill Level:</strong> Intermediate</p>
            <p><strong>Gauge:</strong> 16 stitches x 18 rows = 4 inches in single crochet (adjust as needed)</p>
            <p><strong>Note:</strong> This is a flexible pattern - adjust measurements and techniques for your specific project.</p>
            
            <h3>Abbreviations Used</h3>
            <ul>
                <li><strong>ch</strong> - chain</li>
                <li><strong>sc</strong> - single crochet</li>
                <li><strong>hdc</strong> - half double crochet</li>
                <li><strong>dc</strong> - double crochet</li>
                <li><strong>inc</strong> - increase (2 stitches in one)</li>
                <li><strong>dec</strong> - decrease (combine 2 stitches into 1)</li>
                <li><strong>sl st</strong> - slip stitch</li>
                <li><strong>st(s)</strong> - stitch(es)</li>
                <li><strong>rnd</strong> - round</li>
            </ul>
            
            <h3>Part 1: Main Body/Foundation</h3>
            <h4>Option A: Working Flat (Rows)</h4>
            <ol>
                <li><strong>Foundation Row:</strong> Ch 41 (or desired width in multiples of pattern stitch)</li>
                <li><strong>Row 1:</strong> Sc in 2nd ch from hook and in each ch across, turn [40]</li>
                <li><strong>Row 2:</strong> Ch 1, sc in each st across, turn [40]</li>
                <li><strong>Rows 3-30:</strong> Repeat Row 2 until piece reaches desired length</li>
                <li>Fasten off, leaving long tail if seaming is needed</li>
            </ol>
            
            <h4>Option B: Working in the Round</h4>
            <ol>
                <li><strong>Rnd 1:</strong> Magic ring, 6 sc in ring [6]</li>
                <li><strong>Rnd 2:</strong> Inc in each st around [12]</li>
                <li><strong>Rnd 3:</strong> (Sc, inc) around [18]</li>
                <li><strong>Rnd 4:</strong> (2 sc, inc) around [24]</li>
                <li><strong>Rnd 5:</strong> (3 sc, inc) around [30]</li>
                <li>Continue increasing or work even rounds as needed for your shape</li>
                <li>For cylinders: Work even (no increases) for desired height</li>
                <li>For spheres: Work decreases mirror to increases</li>
            </ol>
            
            <h3>Part 2: Additional Components</h3>
            <p>If your project needs handles, straps, borders, or decorative elements:</p>
            
            <h4>Handles/Straps (Make as needed)</h4>
            <ol>
                <li>Ch desired length (test by measuring)</li>
                <li><strong>Row 1:</strong> Sc in 2nd ch from hook and across</li>
                <li><strong>Rows 2-4:</strong> Ch 1, sc in each st across, turn (for wider straps)</li>
                <li>Fasten off, leaving tail for attaching</li>
            </ol>
            
            <h4>Decorative Border</h4>
            <ol>
                <li>Join yarn to any edge</li>
                <li><strong>Rnd 1:</strong> Sc evenly around entire piece, working 3 sc in corners</li>
                <li><strong>Rnd 2:</strong> *Ch 2, skip 1 st, sc in next st* around (creates holes/spaces)</li>
                <li>Or try shell stitch: *5 dc in same st, skip 2, sc in next* around</li>
                <li>Fasten off</li>
            </ol>
            
            <h3>Part 3: Assembly</h3>
            <ol>
                <li><strong>Block pieces:</strong> Pin to measurements, spray with water, let dry</li>
                <li><strong>Seam pieces together:</strong> Use whip stitch or mattress stitch for invisible seams</li>
                <li><strong>Attach components:</strong> Sew on handles, straps, or decorative elements securely</li>
                <li><strong>Add stuffing/structure:</strong> If needed, stuff firmly but not overly tight</li>
                <li><strong>Finish edges:</strong> Work final border or edging if desired</li>
                <li><strong>Weave in ends:</strong> Secure all yarn tails by weaving through multiple stitches</li>
            </ol>
            
            <h3>Customization Options</h3>
            <ul>
                <li>🎨 <strong>Color Changes:</strong> Switch colors every few rows for stripes</li>
                <li>🌟 <strong>Stitch Patterns:</strong> Try alternating sc, hdc, dc for texture</li>
                <li>📐 <strong>Size Adjustment:</strong> Add/remove foundation chains in multiples of repeat</li>
                <li>✨ <strong>Embellishments:</strong> Add buttons, beads, embroidery, appliques</li>
                <li>🧩 <strong>Shape Variation:</strong> Increase/decrease more or less frequently to change shape</li>
            </ul>
            
            <h3>Advanced Techniques</h3>
            <h4>Texture Stitches</h4>
            <ul>
                <li><strong>Bobble Stitch:</strong> (Yarn over, insert hook, pull up loop, yo pull through 2) x 5 in same st, yo pull through all loops</li>
                <li><strong>Popcorn:</strong> 5 dc in same st, remove hook, insert in first dc, pick up dropped loop, pull through</li>
                <li><strong>Puff Stitch:</strong> (Yo, insert, pull up loop) x 3 in same st, yo pull through all loops</li>
            </ul>
            
            <h4>Shaping Techniques</h4>
            <ul>
                <li><strong>Gradual Increases:</strong> Add 6-12 stitches per round for smooth curves</li>
                <li><strong>Rapid Increases:</strong> Double stitch count for flaring</li>
                <li><strong>Decreases:</strong> Mirror your increases to create matching shapes</li>
            </ul>
            
            <h3>Finishing & Care</h3>
            <ul>
                <li>🧼 <strong>Washing:</strong> Hand wash in cool water with mild detergent, or machine wash gentle if using acrylic</li>
                <li>💨 <strong>Drying:</strong> Lay flat to dry on towel, reshape while damp</li>
                <li>🔥 <strong>Blocking:</strong> Pin to final measurements, steam or spray with water, let dry completely</li>
                <li>✂️ <strong>Maintenance:</strong> Trim any pilling, re-weave any loose ends that appear</li>
            </ul>
            
            <h3>Pro Tips for Success</h3>
            <ul>
                <li>✨ Always make a gauge swatch first - it saves headaches later!</li>
                <li>✨ Count your stitches at the end of each row/round</li>
                <li>✨ Use stitch markers liberally - they're your friends</li>
                <li>✨ Keep consistent tension throughout for even fabric</li>
                <li>✨ Read through the entire pattern before starting</li>
                <li>✨ Take photos of your progress for reference</li>
                <li>✨ Don't be afraid to adjust the pattern to fit your needs</li>
                <li>✨ Join online crochet communities for help and inspiration</li>
            </ul>
            
            <h3>Troubleshooting Common Issues</h3>
            <ul>
                <li>📏 <strong>Too small/large?</strong> Try a different hook size or adjust foundation chain</li>
                <li>🔄 <strong>Edges curling?</strong> Work a border or block more firmly</li>
                <li>📊 <strong>Uneven stitches?</strong> Check your tension and hook placement</li>
                <li>🧵 <strong>Running out of yarn?</strong> Join new yarn at the end of a row if possible</li>
                <li>❓ <strong>Lost your place?</strong> Use row counters or keep a tally on paper</li>
            </ul>
            
            <h3>Take It Further</h3>
            <p>Once you've mastered this pattern, try:</p>
            <ul>
                <li>Making it in different yarn weights for size variation</li>
                <li>Experimenting with color combinations</li>
                <li>Adding your own creative flourishes</li>
                <li>Designing matching accessories or complementary pieces</li>
                <li>Teaching someone else how to make it!</li>
            </ul>
            
            <p><strong>Happy Crocheting! 🧶✨</strong></p>
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

// Popular links functionality
const popularLinks = document.querySelectorAll('.popular-link');
popularLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const patternRequest = link.getAttribute('data-pattern');
        if (patternRequest) {
            e.preventDefault();
            patternInput.value = patternRequest;
            // Scroll to top and generate
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => {
                generatePattern();
            }, 500);
        }
    });
});

// Make logo clickable to go home
const logo = document.querySelector('.logo');
if (logo) {
    logo.style.cursor = 'pointer';
    logo.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Remove active class from all nav links
        navLinks.forEach(link => link.classList.remove('active'));
        // Add active to home
        const homeLink = document.querySelector('.nav-list a[href="#home"]');
        if (homeLink) homeLink.classList.add('active');
    });
}

// Console welcome message
console.log('%cWelcome to CrochetBuddy! 🧶', 'color: #e91e63; font-size: 24px; font-weight: bold;');
console.log('%cYour AI-powered crochet pattern generator', 'color: #764ba2; font-size: 14px;');
console.log('%c40+ Free Patterns Available!', 'color: #4caf50; font-size: 16px; font-weight: bold;');