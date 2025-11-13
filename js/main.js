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
    
    // Detect what type of item is being requested (most specific patterns first)
    const isPoncho = /poncho/i.test(request);
    const isSweater = /sweater|pullover|jumper|turtleneck/i.test(request) && !/cardigan/.test(request);
    const isCardigan = /cardigan/i.test(request);
    const isScarf = /scarf|cowl/i.test(request);
    const isHat = /\b(hat|beanie|beret|cap|toque)\b/i.test(request);
    const isShawl = /shawl|wrap/i.test(request) && !/skirt/.test(request);
    const isSocks = /\bsocks?\b/i.test(request);
    const isMittens = /mittens?|gloves?/i.test(request);
    const isSlippers = /slippers?/i.test(request);
    const isBag = /\b(bag|tote|purse|pouch)\b/i.test(request);
    const isGrannySquare = /granny\s*square/i.test(request);
    const isAmigurumi = /amigurumi|monkey|bunny|bear|cat|dog|animal|creature|character|octopus|elephant|frog|turtle|bird|fox|lion|tiger|giraffe|penguin|owl|unicorn|dragon|dinosaur|mouse|rat|hamster|pig|cow|sheep|lamb|horse|zebra|koala|panda|sloth|raccoon|squirrel|bee|butterfly|ladybug|spider|fish|whale|dolphin|shark|narwhal|snake/i.test(request);
    const isBlanket = /blanket|afghan|throw(?!\s*pillow)|bedspread|coverlet|lovey/i.test(request);
    const isClothing = /vest|jacket|coat|bolero|cape|headband|ear\s*warmer|wrist\s*warmer|leg\s*warmer|tank|crop\s*top|skirt|dress/i.test(request);
    const isBaby = /baby|infant|newborn|bib|bootie|bonnet|onesie|diaper\s*cover|mobile|teether|rattle|pacifier|cocoon|bunting|playmat/i.test(request);
    const isAccessory = /basket|coaster|placemat|potholder|dishcloth|washcloth|scrubby/i.test(request);
    const isHomeDecor = /pillow|cushion|rug|mat|wall\s*hanging|garland|bunting|wreath|doily|table\s*runner|tablecloth|stocking|christmas|planter|plant\s*holder|pouf|ottoman|tieback|valance|lampshade|wine/i.test(request);
    const isToy = /toy|ball|blocks|sensory/i.test(request) && !isAmigurumi;
    
    if (isPoncho) {
        return generatePonchoPattern(request);
    } else if (isSweater) {
        return generateSweaterPattern(request);
    } else if (isCardigan) {
        return generateCardiganPattern(request);
    } else if (isScarf) {
        return generateScarfPattern(request);
    } else if (isHat) {
        return generateHatPattern(request);
    } else if (isShawl) {
        return generateShawlPattern(request);
    } else if (isSocks) {
        return generateSocksPattern(request);
    } else if (isMittens) {
        return generateMittensPattern(request);
    } else if (isSlippers) {
        return generateSlippersPattern(request);
    } else if (isBag) {
        return generateBagPattern(request);
    } else if (isGrannySquare) {
        return generateGrannySquarePattern(request);
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
    const itemName = request.replace(/amigurumi/gi, '').trim() || 'Character';
    const isMonkey = /monkey|chimp|ape|gorilla/i.test(request);
    const hasBanana = /banana/i.test(request);
    const isBunny = /bunny|rabbit/i.test(request);
    const isBear = /bear|teddy/i.test(request);
    const isCat = /cat|kitten|kitty/i.test(request);
    const isDog = /dog|puppy/i.test(request);
    
    // Character-specific customizations
    let characterNotes = '';
    let extraParts = '';
    
    if (isMonkey) {
        characterNotes = `
            <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 15px 0;">
                <h4 style="color: #856404; margin-top: 0;">🐵 Monkey-Specific Customizations:</h4>
                <ul style="color: #856404;">
                    <li><strong>Ears:</strong> Make them larger and rounder (use pattern below but work 1-2 extra rounds)</li>
                    <li><strong>Muzzle:</strong> Make it lighter colored (cream or tan) and slightly oval shaped</li>
                    <li><strong>Tail:</strong> Make tail LONGER - work 15-20 rounds instead of 10 for a proper monkey tail</li>
                    <li><strong>Arms & Legs:</strong> Keep them long and skinny - don't add extra increases</li>
                    <li><strong>Face Details:</strong> Position eyes wide apart, add large smile with embroidery</li>
                </ul>
            </div>`;
        
        if (hasBanana) {
            extraParts = `
            <h3>🍌 BANANA ACCESSORY (Make 1)</h3>
            <p><em>Use yellow yarn for banana, brown for stem</em></p>
            <ol>
                <li><strong>Rnd 1:</strong> With yellow, magic ring, 6 sc in ring [6]</li>
                <li><strong>Rnd 2:</strong> Inc in each st around [12]</li>
                <li><strong>Rnd 3:</strong> (Sc, inc) repeat 6 times [18]</li>
                <li><strong>Rnds 4-8:</strong> Sc in each st around [18] (5 rounds)</li>
                <li><strong>Rnd 9:</strong> (Sc, dec) repeat 6 times [12]</li>
                <li><strong>Rnd 10:</strong> Sc in each st around [12]</li>
                <li><strong>Rnds 11-14:</strong> Sc in each st around [12] (4 rounds)</li>
                <li>Stuff lightly - banana should be slightly curved</li>
                <li><strong>Rnd 15:</strong> Dec repeat 6 times [6]</li>
                <li>Change to brown yarn</li>
                <li><strong>Rnd 16:</strong> Sc in each st around [6]</li>
                <li><strong>Rnd 17:</strong> Dec repeat 3 times [3]</li>
                <li>Fasten off, close opening</li>
                <li><strong>Shape the banana:</strong> Gently bend into curved banana shape while still slightly damp (steam lightly)</li>
            </ol>
            
            <h4>Adding Brown "Spots" to Banana:</h4>
            <ul>
                <li>With brown yarn, embroider small dots randomly on banana</li>
                <li>Use French knots or small stitches</li>
                <li>Add 3-5 spots for realistic look</li>
            </ul>
            
            <h4>Attaching Banana to Monkey:</h4>
            <ul>
                <li><strong>Option 1:</strong> Sew banana into monkey's hand/arm permanently</li>
                <li><strong>Option 2:</strong> Leave removable - tuck between arm and body</li>
                <li><strong>Option 3:</strong> Add small snap or velcro to hand and banana for attachment</li>
            </ul>`;
        }
    } else if (isBunny) {
        characterNotes = `
            <div style="background: #d1ecf1; padding: 15px; border-radius: 8px; margin: 15px 0;">
                <h4 style="color: #0c5460; margin-top: 0;">🐰 Bunny-Specific Customizations:</h4>
                <ul style="color: #0c5460;">
                    <li><strong>Ears:</strong> Make them LONG - work ear pattern but double the length (work rounds 1-3 twice)</li>
                    <li><strong>Tail:</strong> Make a small fluffy pompom instead of the tube tail pattern</li>
                    <li><strong>Feet:</strong> Add pink embroidered paw pads</li>
                    <li><strong>Nose:</strong> Embroider a pink triangle nose</li>
                </ul>
            </div>`;
    } else if (isBear) {
        characterNotes = `
            <div style="background: #f8d7da; padding: 15px; border-radius: 8px; margin: 15px 0;">
                <h4 style="color: #721c24; margin-top: 0;">🧸 Teddy Bear Customizations:</h4>
                <ul style="color: #721c24;">
                    <li><strong>Ears:</strong> Make round ears, attach to top sides of head</li>
                    <li><strong>Muzzle:</strong> Use contrasting color (light brown/cream)</li>
                    <li><strong>Body:</strong> Make slightly rounder - work 2 extra rounds at widest point</li>
                    <li><strong>Optional:</strong> Add a bow tie around neck for classic teddy look</li>
                </ul>
            </div>`;
    }
    
    return {
        title: `Professional Amigurumi Pattern: ${capitalize(itemName)}`,
        content: `
            ${characterNotes}
            
            <h3>Materials Needed</h3>
            <ul>
                <li>Worsted weight yarn (4) in main color - 100-150g (approximately 200-300 yards)</li>
                <li>Small amounts (10-20g each) of contrasting colors for details${isMonkey && hasBanana ? ' - <strong>Including YELLOW for banana!</strong>' : ''}</li>
                <li>4.0mm (G/6) crochet hook (or size needed to obtain gauge)</li>
                <li>3.5mm (E/4) crochet hook for tighter areas (optional)</li>
                <li>Yarn needle with large eye for sewing and embroidery</li>
                <li>Safety eyes 10-12mm (or 6mm for smaller features)</li>
                <li>Premium polyester fiberfill stuffing (machine washable)</li>
                <li>Stitch markers (at least 4)</li>
                <li>Row counter (highly recommended)</li>
                <li>Scissors</li>
                <li>Pins for positioning before sewing</li>
            </ul>
            
            <h3>Pattern Specifications</h3>
            <p><strong>Skill Level:</strong> Intermediate (requires knowledge of basic stitches and working in rounds)</p>
            <p><strong>Finished Size:</strong> Approximately 9-11 inches tall (size varies based on tension and stuffing)</p>
            <p><strong>Gauge:</strong> 16 stitches x 16 rounds = 4 inches in single crochet (CRITICAL for size consistency)</p>
            <p><strong>Construction:</strong> Worked in continuous spiral rounds (do not join unless specified)</p>
            <p><strong>Estimated Time:</strong> 6-10 hours depending on experience</p>
            
            <h3>Abbreviations & Special Stitches</h3>
            <ul>
                <li><strong>ch</strong> - chain stitch</li>
                <li><strong>sc</strong> - single crochet</li>
                <li><strong>inc</strong> - increase (work 2 sc in same stitch)</li>
                <li><strong>dec</strong> - invisible decrease (insert hook in front loops of next 2 sts, yo, pull through both loops, yo, pull through 2 loops on hook)</li>
                <li><strong>st(s)</strong> - stitch(es)</li>
                <li><strong>rnd</strong> - round</li>
                <li><strong>sl st</strong> - slip stitch</li>
                <li><strong>BLO</strong> - back loop only</li>
                <li><strong>FLO</strong> - front loop only</li>
                <li><strong>[ ]</strong> - total stitch count for round</li>
            </ul>
            
            <h3>Important Notes Before Starting</h3>
            <ul>
                <li>⚠️ <strong>Tension is CRITICAL</strong> - Keep stitches tight so stuffing doesn't show through</li>
                <li>📍 Use a stitch marker to mark the beginning of each round</li>
                <li>🔢 Count your stitches at the end of EVERY round</li>
                <li>📝 Keep a tally of rounds completed (mistakes are easier to fix early)</li>
                <li>🧶 Don't cut yarn between color changes - carry it inside</li>
                <li>👁️ Position safety eyes BEFORE closing the head</li>
            </ul>
            
            <h3>HEAD (Make 1)</h3>
            <p><em>Use main color throughout</em></p>
            <ol>
                <li><strong>Rnd 1:</strong> Make a magic ring, 6 sc in ring. Do NOT join. Place marker. [6]</li>
                <li><strong>Rnd 2:</strong> Inc in each st around [12]</li>
                <li><strong>Rnd 3:</strong> (Sc, inc) repeat 6 times [18]</li>
                <li><strong>Rnd 4:</strong> (2 sc, inc) repeat 6 times [24]</li>
                <li><strong>Rnd 5:</strong> (3 sc, inc) repeat 6 times [30]</li>
                <li><strong>Rnd 6:</strong> (4 sc, inc) repeat 6 times [36]</li>
                <li><strong>Rnd 7:</strong> (5 sc, inc) repeat 6 times [42]</li>
                <li><strong>Rnds 8-14:</strong> Sc in each st around [42] (7 rounds total - creates proper head height)</li>
                <li><strong>Rnd 15:</strong> (5 sc, dec) repeat 6 times [36]</li>
                <li><strong>Rnd 16:</strong> (4 sc, dec) repeat 6 times [30]</li>
                <li>⏸️ <strong>STOP HERE:</strong> Insert safety eyes between rounds 11-12, spacing them 8-9 stitches apart</li>
                <li><strong>Rnd 17:</strong> (3 sc, dec) repeat 6 times [24]</li>
                <li>🧶 Begin stuffing head firmly but not overly tight</li>
                <li><strong>Rnd 18:</strong> (2 sc, dec) repeat 6 times [18]</li>
                <li>Continue stuffing, shaping head as you go</li>
                <li><strong>Rnd 19:</strong> (Sc, dec) repeat 6 times [12]</li>
                <li>Add final bits of stuffing</li>
                <li><strong>Rnd 20:</strong> Dec repeat 6 times [6]</li>
                <li>Fasten off, leaving 12" tail. Thread through remaining stitches, pull tight to close. Weave end inside.</li>
            </ol>
            
            <h3>BODY (Make 1)</h3>
            <p><em>Use main color</em></p>
            <ol>
                <li><strong>Rnd 1:</strong> Magic ring, 6 sc in ring [6]</li>
                <li><strong>Rnd 2:</strong> Inc in each st around [12]</li>
                <li><strong>Rnd 3:</strong> (Sc, inc) repeat 6 times [18]</li>
                <li><strong>Rnd 4:</strong> (2 sc, inc) repeat 6 times [24]</li>
                <li><strong>Rnd 5:</strong> (3 sc, inc) repeat 6 times [30]</li>
                <li><strong>Rnd 6:</strong> (4 sc, inc) repeat 6 times [36]</li>
                <li><strong>Rnds 7-13:</strong> Sc in each st around [36] (7 rounds - creates cylindrical body)</li>
                <li><strong>Rnd 14:</strong> (4 sc, dec) repeat 6 times [30]</li>
                <li><strong>Rnds 15-16:</strong> Sc in each st around [30] (2 rounds)</li>
                <li><strong>Rnd 17:</strong> (3 sc, dec) repeat 6 times [24]</li>
                <li><strong>Rnd 18:</strong> Sc in each st around [24]</li>
                <li><strong>Rnd 19:</strong> (2 sc, dec) repeat 6 times [18]</li>
                <li>🧶 Begin stuffing body firmly. Shape as you stuff for best results.</li>
                <li><strong>Rnd 20:</strong> Sc in each st around [18]</li>
                <li>Continue stuffing to desired firmness</li>
                <li>Fasten off, leaving 24" tail for sewing to head</li>
            </ol>
            
            <h3>ARMS (Make 2)</h3>
            <p><em>Optional: Use contrasting color for paws/hands</em></p>
            <ol>
                <li><strong>Rnd 1:</strong> Magic ring, 6 sc in ring [6]</li>
                <li><strong>Rnd 2:</strong> Inc in each st around [12]</li>
                <li><strong>Rnd 3:</strong> Sc in each st around [12]</li>
                <li><strong>Rnd 4:</strong> (Sc, dec) repeat 4 times [8]</li>
                <li>Change to main color if using contrasting color for hands</li>
                <li><strong>Rnds 5-16:</strong> Sc in each st around [8] (12 rounds - adjust for desired arm length)</li>
                <li>Stuff lower half of arm lightly (leave upper half unstuffed for poseable arms)</li>
                <li>Flatten opening and sc through both sides (4-5 sc across)</li>
                <li>Fasten off, leaving 18" tail for sewing</li>
            </ol>
            
            <h3>LEGS (Make 2)</h3>
            <p><em>Optional: Use contrasting color for feet</em></p>
            <ol>
                <li><strong>Rnd 1:</strong> Magic ring, 6 sc in ring [6]</li>
                <li><strong>Rnd 2:</strong> Inc in each st around [12]</li>
                <li><strong>Rnd 3:</strong> (Sc, inc) repeat 6 times [18]</li>
                <li><strong>Rnds 4-5:</strong> Sc in each st around [18] (2 rounds - creates foot)</li>
                <li><strong>Rnd 6:</strong> (Sc, dec) repeat 6 times [12]</li>
                <li><strong>Rnd 7:</strong> (2 sc, dec) repeat 3 times [9]</li>
                <li>Change to main color if using contrasting color for feet</li>
                <li><strong>Rnds 8-15:</strong> Sc in each st around [9] (8 rounds - adjust for leg length)</li>
                <li>Stuff leg firmly for stability</li>
                <li>Flatten opening and sc through both sides (4-5 sc across)</li>
                <li>Fasten off, leaving 18" tail for sewing</li>
            </ol>
            
            <h3>EARS (Make 2)</h3>
            <p><em>Style: Basic round ears (adjust for character-specific shapes)</em></p>
            <ol>
                <li><strong>Rnd 1:</strong> Magic ring, 6 sc in ring [6]</li>
                <li><strong>Rnd 2:</strong> Inc in each st around [12]</li>
                <li><strong>Rnd 3:</strong> (Sc, inc) repeat 6 times [18]</li>
                <li><strong>Rnd 4:</strong> Sc in each st around [18]</li>
                <li>Do NOT stuff ears</li>
                <li>Flatten and fasten off, leaving 12" tail for sewing</li>
            </ol>
            
            <h3>TAIL (Make 1)</h3>
            <ol>
                <li><strong>Rnd 1:</strong> Magic ring, 5 sc in ring [5]</li>
                <li><strong>Rnds 2-10:</strong> Sc in each st around [5] (9 rounds - adjust for desired length)</li>
                <li>Do NOT stuff (allows tail to be poseable)</li>
                <li>Fasten off, leaving 12" tail for sewing</li>
            </ol>
            
            <h3>MUZZLE/SNOUT (Make 1)</h3>
            <p><em>Use cream, tan, or white contrast color</em></p>
            <ol>
                <li><strong>Rnd 1:</strong> Magic ring, 6 sc in ring [6]</li>
                <li><strong>Rnd 2:</strong> Inc in each st around [12]</li>
                <li><strong>Rnd 3:</strong> (Sc, inc) repeat 6 times [18]</li>
                <li><strong>Rnd 4:</strong> Sc in BLO in each st around [18] (creates lip)</li>
                <li><strong>Rnd 5:</strong> Sc in each st around [18]</li>
                <li>Stuff lightly - should be plump but not hard</li>
                <li>Fasten off, leaving 15" tail for sewing</li>
            </ol>
            
            <h3>DETAILED ASSEMBLY INSTRUCTIONS</h3>
            
            <h4>Step 1: Attach Head to Body</h4>
            <ol>
                <li>Position head on top of body with eyes facing forward</li>
                <li>Pin in place and check alignment from all angles</li>
                <li>Using whip stitch, sew completely around where head meets body</li>
                <li>Go around 2-3 times for extra strength</li>
                <li>Weave end securely inside body</li>
            </ol>
            
            <h4>Step 2: Attach Muzzle/Snout</h4>
            <ol>
                <li>Position muzzle centered on lower face, between eyes</li>
                <li>Pin to test placement (try different positions!)</li>
                <li>Sew around edge using whip stitch</li>
                <li>Weave in end</li>
            </ol>
            
            <h4>Step 3: Attach Ears</h4>
            <ol>
                <li>Fold ears slightly at base for dimension</li>
                <li>Position on top sides of head (rounds 6-10)</li>
                <li>Angle slightly outward for realistic look</li>
                <li>Sew securely around base of each ear</li>
            </ol>
            
            <h4>Step 4: Attach Arms</h4>
            <ol>
                <li>Position arms at sides of body (rounds 2-4 of body)</li>
                <li>Pin and check that both are level</li>
                <li>Sew across flattened top of arm, then around sides</li>
                <li>Ensure arms can move/pose if desired</li>
            </ol>
            
            <h4>Step 5: Attach Legs</h4>
            <ol>
                <li>Position legs at bottom front of body for sitting pose</li>
                <li>Space evenly apart (about 4-5 stitches between)</li>
                <li>Sew securely so figure is stable when sitting</li>
            </ol>
            
            <h4>Step 6: Attach Tail</h4>
            <ol>
                <li>Position tail at center back of body, bottom third</li>
                <li>Sew in circular motion around base</li>
                <li>Reinforce with second round of stitching</li>
            </ol>
            
            <h4>Step 7: Embroider Facial Features</h4>
            <ol>
                <li><strong>Nose:</strong> Use black yarn to embroider small triangle or oval on muzzle</li>
                <li><strong>Mouth:</strong> Add backstitch line below nose, curve into smile</li>
                <li><strong>Eyebrows:</strong> Optional - stitch above eyes for expression</li>
                <li><strong>Cheeks:</strong> Optional - add pink french knots or circles</li>
                <li><strong>Details:</strong> Add paw pads, belly button, or character-specific features</li>
            </ol>
            
            <h3>PRO FINISHING TECHNIQUES</h3>
            <ul>
                <li>✨ Use a felting needle to smooth any fuzzy spots</li>
                <li>✨ Brush gently with a soft brush for furry texture (if using fuzzy yarn)</li>
                <li>✨ Steam lightly (test on swatch first!) to even out stitches</li>
                <li>✨ Add weight (poly pellets) to bottom for better sitting stability</li>
                <li>✨ Use dental floss to sew eyes for extra security (if making for baby)</li>
            </ul>
            
            <h3>TIPS FOR SUCCESS</h3>
            <ul>
                <li>✨ <strong>Tension Control:</strong> Your stitches should be tight enough that you can't see through them when held to light</li>
                <li>✨ <strong>Stuffing Technique:</strong> Add small amounts at a time, shaping as you go. Use stuffing stick or chopstick to reach corners</li>
                <li>✨ <strong>Color Changes:</strong> Change colors in last pull-through of previous stitch for cleanest transition</li>
                <li>✨ <strong>Magic Ring:</strong> Leave long tail and weave through ring several times for security</li>
                <li>✨ <strong>Counting Stitches:</strong> Use different colored stitch markers every 10 stitches for easy counting</li>
                <li>✨ <strong>Eye Placement:</strong> Standard is rounds 11-12, spaced 8-9 sts apart, but try pinning first!</li>
                <li>✨ <strong>Seaming:</strong> Always pin pieces before sewing. Take photos to remember placement!</li>
                <li>✨ <strong>Weaving Ends:</strong> Weave through 5-6 stitches, change direction, weave back through different path</li>
            </ul>
            
            <h3>CUSTOMIZATION IDEAS</h3>
            <ul>
                <li>🎨 <strong>Size Variations:</strong> Use sport weight + 3.5mm hook for mini (5-6"), or bulky + 6mm for jumbo (14-16")</li>
                <li>🎨 <strong>Stripes:</strong> Add stripes to body or limbs by changing colors every 2-3 rounds</li>
                <li>🎨 <strong>Accessories:</strong> Add bow tie, scarf, hat, or clothing</li>
                <li>🎨 <strong>Hair/Mane:</strong> Add yarn loops or fringe for hair</li>
                <li>🎨 <strong>Wings:</strong> Crochet flat wing shapes and attach to back</li>
                <li>🎨 <strong>Expressions:</strong> Change eye size/placement and mouth shape for different personalities</li>
            </ul>
            
            <h3>TROUBLESHOOTING</h3>
            <ul>
                <li>❓ <strong>Stuffing showing through?</strong> Your tension is too loose. Try smaller hook or tighter stitches.</li>
                <li>❓ <strong>Piece curling?</strong> You may be increasing too fast. Count carefully!</li>
                <li>❓ <strong>Piece ruffling?</strong> Too many increases. Check stitch count.</li>
                <li>❓ <strong>Head wobbling?</strong> Add more stuffing and reinforce neck seam.</li>
                <li>❓ <strong>Can't find beginning of round?</strong> Always use a stitch marker!</li>
                <li>❓ <strong>Eyes look wonky?</strong> Remove and reposition before securing. Test with pins first.</li>
                <li>❓ <strong>Lumpy stuffing?</strong> Use high-quality fiberfill and stuff in small amounts.</li>
            </ul>
            
            <h3>CARE INSTRUCTIONS</h3>
            <ul>
                <li>🧼 Hand wash in cool water with mild detergent</li>
                <li>💧 Gently squeeze out excess water (never wring!)</li>
                <li>�️ Lay flat on towel to dry, reshaping as needed</li>
                <li>☀️ Keep out of direct sunlight to prevent fading</li>
                <li>🧸 Store in cool, dry place when not displayed</li>
            </ul>
            
            <h3>SAFETY NOTES FOR BABIES/CHILDREN</h3>
            <ul>
                <li>⚠️ For babies under 3: EMBROIDER eyes instead of using safety eyes</li>
                <li>⚠️ Embroider all features - no buttons, beads, or removable parts</li>
                <li>⚠️ Use cotton yarn for easy washing and safety</li>
                <li>⚠️ Weave ends extra securely (5-6 passes through stitches)</li>
                <li>⚠️ Test all seams by pulling firmly before giving to child</li>
                <li>⚠️ Regularly inspect for wear and re-secure any loose parts</li>
            </ul>
            
            ${extraParts}
            
            <p><strong>🧶 Enjoy creating your adorable amigurumi${isMonkey && hasBanana ? ' monkey with banana' : ''}! With practice, you'll develop your own style and techniques. Don't be afraid to experiment! ✨</strong></p>
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

function generateSweaterPattern(request) {
    const size = request.match(/\b(xs|small|medium|large|xl|2xl|3xl)\b/i);
    const sizeGuide = size ? size[0].toUpperCase() : 'MEDIUM';
    
    return {
        title: `Professional ${capitalize(request)} Pattern - All Sizes`,
        content: `
            <h3>Materials Needed</h3>
            <ul>
                <li>Worsted weight yarn (4) - See yardage chart below</li>
                <li>5.0mm (H/8) crochet hook for main body</li>
                <li>4.5mm (G/7) crochet hook for ribbing</li>
                <li>High-quality yarn needle for seaming</li>
                <li>4-6 removable stitch markers</li>
                <li>Measuring tape (60" minimum)</li>
                <li>Scissors</li>
                <li>Blocking mat and pins (recommended)</li>
            </ul>
            
            <h3>Yarn Requirements by Size</h3>
            <table border="1" cellpadding="5">
                <tr>
                    <th>Size</th>
                    <th>Yards Needed</th>
                    <th>Grams (approx)</th>
                    <th>Skeins (200yd each)</th>
                </tr>
                <tr><td>XS</td><td>1100-1250 yds</td><td>500-550g</td><td>6 skeins</td></tr>
                <tr><td>S</td><td>1250-1400 yds</td><td>550-630g</td><td>7 skeins</td></tr>
                <tr><td>M</td><td>1400-1600 yds</td><td>630-720g</td><td>8 skeins</td></tr>
                <tr><td>L</td><td>1600-1800 yds</td><td>720-810g</td><td>9 skeins</td></tr>
                <tr><td>XL</td><td>1800-2000 yds</td><td>810-900g</td><td>10 skeins</td></tr>
                <tr><td>2XL</td><td>2000-2200 yds</td><td>900-990g</td><td>11 skeins</td></tr>
            </table>
            
            <h3>Finished Measurements</h3>
            <table border="1" cellpadding="5">
                <tr>
                    <th>Size</th>
                    <th>Bust</th>
                    <th>Length</th>
                    <th>Sleeve Length</th>
                    <th>Shoulder Width</th>
                </tr>
                <tr><td>XS</td><td>32"</td><td>22"</td><td>17"</td><td>14"</td></tr>
                <tr><td>S</td><td>36"</td><td>23"</td><td>17.5"</td><td>15"</td></tr>
                <tr><td>M</td><td>40"</td><td>24"</td><td>18"</td><td>16"</td></tr>
                <tr><td>L</td><td>44"</td><td>25"</td><td>18.5"</td><td>17"</td></tr>
                <tr><td>XL</td><td>48"</td><td>26"</td><td>19"</td><td>18"</td></tr>
                <tr><td>2XL</td><td>52"</td><td>27"</td><td>19.5"</td><td>19"</td></tr>
            </table>
            
            <h3>Pattern Specifications</h3>
            <p><strong>Skill Level:</strong> Intermediate (requires basic construction knowledge)</p>
            <p><strong>Recommended Ease:</strong> 2-4 inches positive ease for comfortable fit</p>
            <p><strong>Estimated Time:</strong> 25-40 hours depending on size and experience</p>
            <p><strong>Construction Method:</strong> Bottom-up, seamed pieces</p>
            
            <h3>CRITICAL: Gauge Information</h3>
            <p><strong>Gauge with 5.0mm hook:</strong> 16 stitches x 18 rows = 4 inches in half double crochet</p>
            <p>⚠️ <strong>GAUGE IS ESSENTIAL!</strong> Your sweater will not fit correctly if gauge is off.</p>
            
            <h4>How to Check Gauge:</h4>
            <ol>
                <li>Chain 24 with 5.0mm hook</li>
                <li>Work in half double crochet for 24 rows</li>
                <li>Block swatch lightly with steam</li>
                <li>Measure center 4" square - should have exactly 16 sts x 18 rows</li>
                <li><strong>Too many stitches?</strong> Use larger hook (5.5mm)</li>
                <li><strong>Too few stitches?</strong> Use smaller hook (4.5mm)</li>
                <li>Make new swatch and recheck until gauge matches</li>
            </ol>
            
            <h3>Abbreviations & Stitches</h3>
            <ul>
                <li><strong>ch</strong> - chain stitch</li>
                <li><strong>sc</strong> - single crochet</li>
                <li><strong>hdc</strong> - half double crochet</li>
                <li><strong>dc</strong> - double crochet</li>
                <li><strong>hdc2tog</strong> - half double crochet 2 together (decrease)</li>
                <li><strong>st(s)</strong> - stitch(es)</li>
                <li><strong>RS</strong> - right side</li>
                <li><strong>WS</strong> - wrong side</li>
                <li><strong>BLO</strong> - back loop only</li>
                <li><strong>FLO</strong> - front loop only</li>
                <li><strong>FPsc</strong> - front post single crochet</li>
                <li><strong>BPsc</strong> - back post single crochet</li>
                <li><strong>[ ]</strong> - stitch count</li>
                <li><strong>( )</strong> - instructions to repeat</li>
            </ul>
            
            <h3>BACK PANEL</h3>
            
            <h4>Foundation & Ribbing:</h4>
            <p><em>With 4.5mm hook</em></p>
            <ol>
                <li><strong>Foundation Chain:</strong> Ch 65 (73, 81, 89, 97, 105)</li>
                <li><strong>Row 1 (WS):</strong> Sc in 2nd ch from hook, sc in each ch across, turn [64, 72, 80, 88, 96, 104 sc]</li>
                <li><strong>Row 2:</strong> Ch 1, sc in BLO in each st across, turn [64, 72, 80, 88, 96, 104]</li>
                <li><strong>Rows 3-8:</strong> Repeat Row 2 (creates 2" of ribbing)</li>
                <li>Switch to 5.0mm hook</li>
            </ol>
            
            <h4>Body Section:</h4>
            <ol start="9">
                <li><strong>Row 9 (RS):</strong> Ch 2 (counts as first hdc here and throughout), hdc in each st across, turn [64, 72, 80, 88, 96, 104 hdc]</li>
                <li><strong>Row 10:</strong> Ch 2, hdc in each st across, turn</li>
                <li><strong>Rows 11-70:</strong> Repeat Row 10 until piece measures 14 (14.5, 15, 15.5, 16, 16.5)" from bottom of ribbing, or desired length to underarm</li>
                <li>⏸️ <strong>Measure as you go!</strong> Try on periodically to check length</li>
            </ol>
            
            <h4>Armhole Shaping:</h4>
            <ol start="71">
                <li><strong>Row 71:</strong> Sl st across first 4 (5, 6, 7, 8, 9) sts, ch 2, hdc across until 4 (5, 6, 7, 8, 9) sts remain, turn, leave remaining sts unworked [56, 62, 68, 74, 80, 86 hdc]</li>
                <li><strong>Row 72:</strong> Ch 2, hdc2tog, hdc across to last 2 sts, hdc2tog, turn [54, 60, 66, 72, 78, 84]</li>
                <li><strong>Rows 73-74:</strong> Repeat Row 72 [50, 56, 62, 68, 74, 80 hdc after Row 74]</li>
                <li><strong>Rows 75-102:</strong> Ch 2, hdc in each st across, turn (work even for 7-8" or until armhole measures 8 (8.5, 9, 9.5, 10, 10.5)")</li>
            </ol>
            
            <h4>Shoulder Shaping:</h4>
            <ol start="103">
                <li><strong>Row 103:</strong> Sl st across first 6 (7, 8, 9, 10, 11) sts, ch 2, hdc across until 6 (7, 8, 9, 10, 11) sts remain, turn [38, 42, 46, 50, 54, 58]</li>
                <li><strong>Row 104:</strong> Sl st across first 6 (7, 8, 9, 10, 11) sts, ch 2, hdc across until 6 (7, 8, 9, 10, 11) sts remain [26, 28, 30, 32, 34, 36]</li>
                <li>Fasten off. This creates the back neck opening.</li>
            </ol>
            
            <h3>FRONT PANEL</h3>
            <p>Work same as back through Row 95 (before shoulder shaping begins)</p>
            
            <h4>Neck Shaping - Left Side:</h4>
            <ol start="96">
                <li><strong>Row 96:</strong> Ch 2, hdc in next 16 (18, 20, 22, 24, 26) sts only, turn (leave remaining sts unworked) [17, 19, 21, 23, 25, 27 hdc including ch-2]</li>
                <li><strong>Row 97:</strong> Ch 2, hdc2tog, hdc across, turn [16, 18, 20, 22, 24, 26]</li>
                <li><strong>Row 98:</strong> Ch 2, hdc across to last 2 sts, hdc2tog, turn [15, 17, 19, 21, 23, 25]</li>
                <li><strong>Rows 99-102:</strong> Alternate Rows 97-98 (decrease at neck edge every row) [12, 14, 16, 18, 20, 22 after Row 102]</li>
                <li>Continue even if needed until front matches back length to shoulder</li>
            </ol>
            
            <h4>Shoulder Shaping - Left Side:</h4>
            <ol start="103">
                <li><strong>Row 103:</strong> Sl st across first 6 (7, 8, 9, 10, 11) sts (armhole edge), ch 2, hdc across, turn [6, 7, 8, 9, 10, 11]</li>
                <li><strong>Row 104:</strong> Ch 2, hdc across</li>
                <li>Fasten off</li>
            </ol>
            
            <h4>Neck Shaping - Right Side:</h4>
            <ol>
                <li>With RS facing, skip center 16 (18, 20, 22, 24, 26) sts for neck opening</li>
                <li>Join yarn to next st, ch 2, hdc across, turn [17, 19, 21, 23, 25, 27]</li>
                <li>Work to match left side, reversing all shaping</li>
            </ol>
            
            <h3>SLEEVES (Make 2 identical)</h3>
            
            <h4>Cuff Ribbing:</h4>
            <p><em>With 4.5mm hook</em></p>
            <ol>
                <li><strong>Foundation:</strong> Ch 33 (35, 37, 39, 41, 43)</li>
                <li><strong>Row 1:</strong> Sc in 2nd ch from hook, sc in each ch across, turn [32, 34, 36, 38, 40, 42 sc]</li>
                <li><strong>Row 2:</strong> Ch 1, sc in BLO in each st across, turn</li>
                <li><strong>Rows 3-10:</strong> Repeat Row 2 (creates 2.5" ribbed cuff)</li>
                <li>Switch to 5.0mm hook</li>
            </ol>
            
            <h4>Sleeve Body:</h4>
            <ol start="11">
                <li><strong>Row 11 (RS):</strong> Ch 2, hdc in each st across, turn [32, 34, 36, 38, 40, 42 hdc]</li>
                <li><strong>Row 12:</strong> Ch 2, hdc in each st across, turn</li>
                <li><strong>Rows 13-17:</strong> Repeat Row 12 (work 5 rows even)</li>
                <li><strong>Row 18 (Increase Row):</strong> Ch 2, 2 hdc in first st, hdc across to last st, 2 hdc in last st, turn [34, 36, 38, 40, 42, 44]</li>
                <li><strong>Rows 19-23:</strong> Ch 2, hdc in each st across, turn (work 5 rows even)</li>
                <li><strong>Row 24 (Increase Row):</strong> Ch 2, 2 hdc in first st, hdc across to last st, 2 hdc in last st, turn [36, 38, 40, 42, 44, 46]</li>
                <li><strong>Continue</strong> working 5 rows even, then 1 increase row (as established) until you have 50 (54, 58, 62, 66, 70) sts</li>
                <li>Work even until sleeve measures 17 (17.5, 18, 18.5, 19, 19.5)" from bottom of cuff, or desired length to underarm</li>
            </ol>
            
            <h4>Sleeve Cap Shaping:</h4>
            <ol>
                <li><strong>Next Row:</strong> Sl st across first 4 (5, 6, 7, 8, 9) sts, ch 2, hdc across until 4 (5, 6, 7, 8, 9) sts remain, turn [42, 44, 46, 48, 50, 52]</li>
                <li><strong>Next Row:</strong> Ch 2, hdc2tog, hdc across to last 2 sts, hdc2tog, turn [40, 42, 44, 46, 48, 50]</li>
                <li><strong>Repeat decrease row</strong> every row 10 (11, 12, 13, 14, 15) more times [20, 20, 20, 20, 20, 20]</li>
                <li>Fasten off, leaving 24" tail for seaming</li>
            </ol>
            
            <h3>PROFESSIONAL ASSEMBLY INSTRUCTIONS</h3>
            
            <h4>Step 1: Block All Pieces</h4>
            <ol>
                <li>Lay pieces flat on blocking mat</li>
                <li>Pin to schematic measurements</li>
                <li>Lightly steam or mist with water</li>
                <li>Allow to dry completely (24 hours minimum)</li>
                <li>⚠️ <strong>Do NOT skip blocking!</strong> It makes seaming infinitely easier</li>
            </ol>
            
            <h4>Step 2: Seam Shoulders</h4>
            <ol>
                <li>Place front and back pieces with right sides together</li>
                <li>Match shoulder edges stitch by stitch</li>
                <li>Using mattress stitch or invisible seaming method, join shoulders</li>
                <li>Weave in ends as you go</li>
            </ol>
            
            <h4>Step 3: Set in Sleeves</h4>
            <ol>
                <li>Find center top of sleeve cap, mark with pin</li>
                <li>Match center of sleeve to shoulder seam</li>
                <li>Pin sleeve in place, easing any fullness evenly</li>
                <li>Seam from underarm up one side, across top, down other side</li>
                <li>Check that sleeve hangs smoothly before securing</li>
                <li>Repeat for second sleeve</li>
            </ol>
            
            <h4>Step 4: Side and Sleeve Seams</h4>
            <ol>
                <li>Start at bottom hem, seam up side of body</li>
                <li>Continue seam down sleeve in one continuous line</li>
                <li>Match ribbing carefully for clean finish</li>
                <li>Repeat for other side</li>
            </ol>
            
            <h3>NECKLINE FINISHING</h3>
            <p><em>With 4.5mm hook and RS facing</em></p>
            <ol>
                <li><strong>Rnd 1:</strong> Join yarn at left shoulder seam, ch 1, work sc evenly around entire neck opening (approximately 70-80 sc), join with sl st to first sc</li>
                <li><strong>Rnd 2:</strong> Ch 1, sc in BLO in each st around, join</li>
                <li><strong>Rnds 3-5:</strong> Repeat Rnd 2 (creates 1" ribbed neckline)</li>
                <li>Fasten off and weave in end</li>
            </ol>
            
            <h3>TROUBLESHOOTING GUIDE</h3>
            <ul>
                <li>❓ <strong>Sleeves too tight?</strong> Increase cuff foundation chain by 2-4 sts and add extra increases</li>
                <li>❓ <strong>Body too short?</strong> Add 4-5 rows for each additional inch needed</li>
                <li>❓ <strong>Neck too loose?</strong> Work neckline edging with smaller hook (4.0mm)</li>
                <li>❓ <strong>Seams puckering?</strong> Your seaming tension is too tight - use a looser whip stitch</li>
                <li>❓ <strong>Armholes gaping?</strong> Decrease more aggressively at underarm (6-8 sts instead of 4)</li>
                <li>❓ <strong>Sleeves twisting?</strong> Mark right side of sleeve before seaming to avoid rotation</li>
                <li>❓ <strong>Uneven stitch height?</strong> Your tension may be inconsistent - practice gauge swatch more</li>
            </ul>
            
            <h3>PROFESSIONAL TIPS</h3>
            <ul>
                <li>✨ <strong>Yarn Joins:</strong> Join new balls at side seams or underarms for invisible transitions</li>
                <li>✨ <strong>Weaving Ends:</strong> Leave 6" tails minimum. Weave through 5-6 stitches in different directions</li>
                <li>✨ <strong>Try-On:</strong> Try on before final assembly to check fit and make adjustments</li>
                <li>✨ <strong>Washing:</strong> Hand wash in cool water, reshape while damp, lay flat to dry</li>
                <li>✨ <strong>Storage:</strong> Fold rather than hang to prevent stretching at shoulders</li>
                <li>✨ <strong>Modifications:</strong> Add pockets by seaming small squares to front panels before assembly</li>
            </ul>
            
            <h3>CUSTOMIZATION IDEAS</h3>
            <ul>
                <li>🎨 <strong>Stripes:</strong> Change colors every 6-8 rows for bold horizontal stripes</li>
                <li>🎨 <strong>Colorblock:</strong> Use different colors for sleeves and body</li>
                <li>🎨 <strong>Texture:</strong> Substitute main stitch with moss stitch or v-stitch</li>
                <li>🎨 <strong>Oversized Fit:</strong> Make 1-2 sizes larger and add 4-6" to length</li>
                <li>🎨 <strong>Cropped Version:</strong> Reduce body length by 3-4" for trendy crop</li>
            </ul>
            
            <p><strong>🧶 Congratulations on completing your handmade sweater! You've created a timeless wardrobe piece that will last for years. Wear it with pride! ✨</strong></p>
        `
    };
}

function generateCardiganPattern(request) {
    const hasButtons = /button/i.test(request);
    const isOpenFront = /open|waterfall/i.test(request);
    
    return {
        title: `Professional ${capitalize(request)} Pattern - Complete Guide`,
        content: `
            <h3>Materials Needed</h3>
            <ul>
                <li>Worsted weight yarn (4) - See yardage chart below</li>
                <li>5.5mm (I/9) crochet hook for main body</li>
                <li>5.0mm (H/8) crochet hook for edging (optional)</li>
                <li>${hasButtons ? '5-7 buttons (3/4" to 1" diameter)' : 'No buttons needed for open-front style'}</li>
                <li>High-quality yarn needle for seaming</li>
                <li>Stitch markers (8-10 recommended)</li>
                <li>Measuring tape</li>
                <li>Pins for blocking</li>
                <li>Row counter</li>
            </ul>
            
            <h3>Yarn Requirements by Size</h3>
            <table border="1" cellpadding="5">
                <tr>
                    <th>Size</th>
                    <th>Yards Needed</th>
                    <th>Approximate Weight</th>
                </tr>
                <tr><td>S/M</td><td>1400-1600 yds</td><td>700-800g</td></tr>
                <tr><td>L/XL</td><td>1800-2000 yds</td><td>900-1000g</td></tr>
                <tr><td>2X/3X</td><td>2100-2400 yds</td><td>1050-1200g</td></tr>
            </table>
            
            <h3>Finished Measurements</h3>
            <table border="1" cellpadding="5">
                <tr>
                    <th>Size</th>
                    <th>Bust (Closed)</th>
                    <th>Length</th>
                    <th>Sleeve Length</th>
                </tr>
                <tr><td>S/M</td><td>40"</td><td>24"</td><td>17"</td></tr>
                <tr><td>L/XL</td><td>48"</td><td>26"</td><td>17.5"</td></tr>
                <tr><td>2X/3X</td><td>56"</td><td>28"</td><td>18"</td></tr>
            </table>
            
            <h3>Pattern Specifications</h3>
            <p><strong>Skill Level:</strong> Intermediate to Advanced</p>
            <p><strong>Recommended Ease:</strong> 4-6 inches positive ease for comfortable layering</p>
            <p><strong>Estimated Time:</strong> 30-50 hours</p>
            <p><strong>Construction:</strong> Top-down raglan in one piece (minimal seaming!)</p>
            
            <h3>Gauge - CRITICAL</h3>
            <p><strong>With 5.5mm hook:</strong> 14 stitches x 16 rows = 4 inches in half double crochet</p>
            
            <h4>Gauge Swatch Instructions:</h4>
            <ol>
                <li>Chain 22 stitches</li>
                <li>Work in hdc for 20 rows</li>
                <li>Block lightly with steam</li>
                <li>Measure center 4" square (should be exactly 14 sts x 16 rows)</li>
                <li><strong>Too many stitches?</strong> Use 6.0mm hook</li>
                <li><strong>Too few stitches?</strong> Use 5.0mm hook</li>
                <li>Recheck gauge after hook adjustment</li>
            </ol>
            
            <h3>Abbreviations</h3>
            <ul>
                <li><strong>ch</strong> - chain</li>
                <li><strong>sc</strong> - single crochet</li>
                <li><strong>hdc</strong> - half double crochet</li>
                <li><strong>hdc2tog</strong> - half double crochet 2 together</li>
                <li><strong>st(s)</strong> - stitch(es)</li>
                <li><strong>RS</strong> - right side</li>
                <li><strong>WS</strong> - wrong side</li>
                <li><strong>BLO</strong> - back loop only</li>
                <li><strong>PM</strong> - place marker</li>
                <li><strong>[ ]</strong> - stitch count</li>
            </ul>
            
            <h3>YOKE - TOP DOWN RAGLAN CONSTRUCTION</h3>
            
            <h4>Starting Chain:</h4>
            <p><em>This forms the neck edge - Size S/M (L/XL, 2X/3X)</em></p>
            <ol>
                <li><strong>Foundation:</strong> Ch 50 (58, 66)</li>
                <li>Do NOT join - work back and forth in rows</li>
            </ol>
            
            <h4>Setting Up Raglan Lines:</h4>
            <p><em>We'll create 4 raglan increase lines: one at each shoulder</em></p>
            <ol>
                <li><strong>Row 1 (WS):</strong> Hdc in 3rd ch from hook, hdc in next 6 (8, 10) chs <strong>[Right Front = 7, 9, 11 hdc]</strong>, PM in next st, 2 hdc in marked st <strong>[Raglan 1]</strong>, hdc in next 8 (10, 12) chs <strong>[Right Sleeve = 9, 11, 13 hdc]</strong>, PM in next st, 2 hdc in marked st <strong>[Raglan 2]</strong>, hdc in next 14 (18, 22) chs <strong>[Back = 15, 19, 23 hdc]</strong>, PM in next st, 2 hdc in marked st <strong>[Raglan 3]</strong>, hdc in next 8 (10, 12) chs <strong>[Left Sleeve = 9, 11, 13 hdc]</strong>, PM in next st, 2 hdc in marked st <strong>[Raglan 4]</strong>, hdc in last 7 (9, 11) chs <strong>[Left Front = 7, 9, 11 hdc]</strong>, turn [52, 60, 68 hdc + 4 raglan increases]</li>
            </ol>
            
            <h4>Raglan Increase Rows:</h4>
            <ol start="2">
                <li><strong>Row 2 (RS):</strong> Ch 2 (counts as first hdc), hdc in each st across to first marked st, 2 hdc in marked st, *hdc in each st to next marked st, 2 hdc in marked st*, repeat from * 3 more times, hdc in remaining sts, turn [56, 64, 72 hdc - increased 4 sts]</li>
                <li><strong>Rows 3-20:</strong> Repeat Row 2 (increase 4 sts every row at the 4 raglan lines) [128, 136, 144 hdc after Row 20]</li>
                <li>Continue raglan increases until yoke measures 7 (8, 9)" from beginning neck edge OR when sleeve section has approximately 45 (50, 55) stitches</li>
                <li>⏸️ <strong>Try-On Checkpoint:</strong> Carefully try on to check shoulder drop and sleeve width</li>
            </ol>
            
            <h3>DIVIDE FOR BODY AND SLEEVES</h3>
            
            <h4>Separation Row:</h4>
            <ol>
                <li><strong>Next Row:</strong> Ch 2, hdc across RIGHT FRONT stitches to first raglan marker (remove marker), ch 4 <strong>[underarm chain]</strong>, skip all RIGHT SLEEVE stitches to next raglan marker (remove marker), hdc across all BACK stitches to next raglan marker (remove marker), ch 4 <strong>[underarm chain]</strong>, skip all LEFT SLEEVE stitches to final raglan marker (remove marker), hdc across LEFT FRONT stitches, turn</li>
                <li>You should now have: Right Front + ch-4 + Back + ch-4 + Left Front</li>
                <li>Count total sts (approximately 110-140 depending on size)</li>
            </ol>
            
            <h3>BODY SECTION</h3>
            
            <h4>Main Body:</h4>
            <ol>
                <li><strong>Row 1:</strong> Ch 2, hdc in each st and ch across, turn</li>
                <li><strong>Rows 2-60:</strong> Ch 2, hdc in each st across, turn</li>
                <li>Continue working even until body measures 14 (15, 16)" from underarm, or 3" shorter than desired finished length</li>
                <li>⏸️ <strong>Length Check:</strong> Try on to verify length before edging</li>
            </ol>
            
            <h4>Bottom Ribbing Edge:</h4>
            <ol>
                <li><strong>Row 1:</strong> Ch 1, sc in BLO in each st across, turn</li>
                <li><strong>Rows 2-6:</strong> Repeat Row 1 (creates 1.5" ribbed edge)</li>
                <li>Fasten off and weave in end</li>
            </ol>
            
            <h3>SLEEVES (Work both separately)</h3>
            
            <h4>Rejoining Yarn:</h4>
            <ol>
                <li>With RS facing, join yarn at center of underarm (in one of the 4 ch from separation row)</li>
                <li>PM to mark beginning of round</li>
            </ol>
            
            <h4>Sleeve Body - Worked in Rounds:</h4>
            <ol start="2">
                <li><strong>Rnd 1:</strong> Ch 2, work 2 hdc in same underarm ch, hdc in next 2 underarm chs, hdc in each sleeve st around, hdc in remaining underarm ch, join to top of ch-2 [approximately 48-54 hdc]</li>
                <li><strong>Rnds 2-9:</strong> Ch 2, hdc in each st around, join (work 8 rounds even)</li>
                <li><strong>Rnd 10 (Decrease Rnd):</strong> Ch 2, hdc2tog, hdc around to last 2 sts, hdc2tog, join [46-52 hdc]</li>
                <li><strong>Rnds 11-19:</strong> Ch 2, hdc in each st around, join (work 9 rounds even)</li>
                <li><strong>Rnd 20 (Decrease Rnd):</strong> Ch 2, hdc2tog, hdc around to last 2 sts, hdc2tog, join [44-50 hdc]</li>
                <li>Continue working 9 rounds even, then 1 decrease round until sleeve measures 16 (16.5, 17)" from underarm OR 2" shorter than desired length</li>
            </ol>
            
            <h4>Cuff Ribbing:</h4>
            <ol>
                <li><strong>Rnd 1:</strong> Ch 1, sc in BLO in each st around, join [approximately 40-46 sc]</li>
                <li><strong>Rnds 2-8:</strong> Repeat Rnd 1 (creates 2" ribbed cuff)</li>
                <li>Fasten off and weave in ends</li>
                <li>Repeat entire sleeve process for second sleeve</li>
            </ol>
            
            <h3>FRONT BANDS & FINISHING</h3>
            
            <h4>Right Front Band (Buttonhole Band):</h4>
            <p><em>With RS facing and 5.0mm hook (or same hook)</em></p>
            <ol>
                <li>Join yarn at bottom right front corner</li>
                <li><strong>Row 1:</strong> Ch 1, work sc evenly up entire right front edge to neck, turn (approximately 85-95 sc)</li>
                <li><strong>Row 2:</strong> Ch 1, sc in each st across, turn</li>
                <li>${hasButtons ? `<strong>Row 3 (Buttonhole Row):</strong> Ch 1, sc in first 3-4 sts, *ch 2, skip 2 sts (buttonhole made), sc in next 15-18 sts*, repeat from * 4-6 more times for total of 5-7 buttonholes evenly spaced, sc in remaining sts, turn` : `<strong>Row 3:</strong> Ch 1, sc in each st across, turn`}</li>
                <li>${hasButtons ? `<strong>Row 4:</strong> Ch 1, sc in each st and ch-2 space across (work 2 sc in each ch-2 space), turn` : `<strong>Row 4:</strong> Ch 1, sc in each st across, turn`}</li>
                <li><strong>Row 5:</strong> Ch 1, sc in each st across</li>
                <li>Fasten off</li>
            </ol>
            
            <h4>Left Front Band (Button Band):</h4>
            <ol>
                <li>Join yarn at neck edge of left front with RS facing</li>
                <li><strong>Row 1:</strong> Ch 1, work sc evenly down entire left front edge, turn (match right band stitch count)</li>
                <li><strong>Rows 2-5:</strong> Ch 1, sc in each st across, turn</li>
                <li>Fasten off</li>
            </ol>
            
            <h4>Neck Edging:</h4>
            <ol>
                <li>With RS facing, join yarn at top of right front band</li>
                <li><strong>Row 1:</strong> Ch 1, work sc evenly across back neck edge, turn (approximately 40-50 sc)</li>
                <li><strong>Rows 2-3:</strong> Ch 1, sc in each st across, turn</li>
                <li>Fasten off and weave in end</li>
            </ol>
            
            <h3>FINAL ASSEMBLY</h3>
            <ol>
                <li>Weave in all remaining ends (use duplicate stitch method for security)</li>
                <li>Block cardigan to measurements (pin out and steam or wet block)</li>
                <li>${hasButtons ? 'Mark button placement opposite buttonholes using pins' : 'No buttons needed for this open-front style'}</li>
                <li>${hasButtons ? 'Sew buttons securely with matching thread (reinforce with yarn)' : ''}</li>
                <li>Steam seams lightly if needed</li>
            </ol>
            
            <h3>TROUBLESHOOTING</h3>
            <ul>
                <li>❓ <strong>Raglan lines not straight?</strong> Make sure you're increasing in the exact same marked stitch each row</li>
                <li>❓ <strong>Sleeves too tight?</strong> Continue raglan increases for 2-4 more rows before separating</li>
                <li>❓ <strong>Body flaring out?</strong> Your gauge may be loose - try smaller hook for body section</li>
                <li>❓ <strong>Neck too loose/tight?</strong> Adjust starting chain by 4-6 stitches</li>
                <li>❓ <strong>Buttonholes too big?</strong> Ch 1 and skip 1 st instead of ch 2, skip 2 sts</li>
                <li>❓ <strong>Front bands curling?</strong> Work bands with hook one size smaller</li>
                <li>❓ <strong>Sleeves twisting?</strong> Mark RS before starting sleeve rounds</li>
            </ul>
            
            <h3>PROFESSIONAL TIPS</h3>
            <ul>
                <li>✨ <strong>Even Edges:</strong> For front bands, aim for 3 sc for every 4 rows of hdc</li>
                <li>✨ <strong>Button Spacing:</strong> Place first button 1" from bottom, last 1" from neck, space others evenly</li>
                <li>✨ <strong>Blocking:</strong> Block BEFORE adding buttons - fabric may grow 1-2"</li>
                <li>✨ <strong>Seamless Look:</strong> Weave underarm chains carefully to avoid holes</li>
                <li>✨ <strong>Drape Test:</strong> Hang overnight before final blocking to let fabric settle</li>
                <li>✨ <strong>Reinforcement:</strong> Add extra stitching at underarm points for durability</li>
            </ul>
            
            <h3>CUSTOMIZATION IDEAS</h3>
            <ul>
                <li>🎨 <strong>Pockets:</strong> Add patch pockets to front panels (make 6x6" squares and sew on)</li>
                <li>🎨 <strong>Colorblock:</strong> Change colors at yoke/body separation line</li>
                <li>🎨 <strong>Stripe Pattern:</strong> Work stripes in body section only</li>
                <li>🎨 <strong>Longer Length:</strong> Add 4-6" to body for duster-style cardigan</li>
                <li>🎨 <strong>3/4 Sleeves:</strong> Stop sleeves at 12-13" for bracelet length</li>
                <li>🎨 <strong>Shawl Collar:</strong> Continue neck edging for 4-6" for fold-over collar</li>
                <li>🎨 <strong>Belt:</strong> Crochet a chain 60" long, weave through stitches at waist</li>
            </ul>
            
            <h3>CARE INSTRUCTIONS</h3>
            <ul>
                <li>🧼 Hand wash in cool water with wool wash</li>
                <li>💧 Gently squeeze out water (never wring or twist)</li>
                <li>🌡️ Roll in towel to remove excess moisture</li>
                <li>📏 Lay flat on blocking mat, reshape to measurements</li>
                <li>⏰ Air dry completely (24-48 hours)</li>
                <li>🧴 Store folded, not hanging (prevents shoulder stretching)</li>
            </ul>
            
            <p><strong>🧶 Congratulations! You've created a beautiful, professional cardigan that you'll treasure for years. The top-down raglan construction makes this incredibly customizable - don't hesitate to adjust as you go! ✨</strong></p>
        `
    };
}

function generateScarfPattern(request) {
    return {
        title: `Complete ${capitalize(request)} Pattern`,
        content: `
            <h3>Materials Needed</h3>
            <ul>
                <li>Worsted weight yarn (4) - 400-600 yards</li>
                <li>5.5mm (I/9) crochet hook</li>
                <li>Yarn needle</li>
                <li>Scissors</li>
            </ul>
            
            <h3>Finished Size</h3>
            <p><strong>Dimensions:</strong> 8" wide x 60" long (adjustable)</p>
            
            <h3>Gauge</h3>
            <p>14 stitches x 16 rows = 4 inches in pattern</p>
            
            <h3>Pattern Instructions</h3>
            
            <h4>Foundation:</h4>
            <p>Ch 29 (or any odd number for desired width)</p>
            
            <h4>Row 1:</h4>
            <p>Sc in 2nd ch from hook, *ch 1, skip 1 ch, sc in next ch*, repeat across, turn [28 sts]</p>
            
            <h4>Row 2:</h4>
            <p>Ch 1, sc in first sc, *ch 1, skip ch-1 space, sc in next sc*, repeat across, turn</p>
            
            <h4>Rows 3-240:</h4>
            <p>Repeat Row 2 until scarf measures 60" or desired length</p>
            
            <h4>Border (Optional):</h4>
            <ol>
                <li>Work sc evenly around all edges</li>
                <li>Add fringe to ends if desired (cut 10" lengths, fold in half, pull through edge)</li>
            </ol>
            
            <p>Fasten off and weave in ends.</p>
            
            <h3>Infinity Scarf Variation</h3>
            <p>Work to 50" length, twist once, join ends with sl st to create infinity loop</p>
            
            <h3>Pattern Variations</h3>
            <ul>
                <li>🌈 <strong>Striped:</strong> Change colors every 10-15 rows</li>
                <li>✨ <strong>Textured:</strong> Alternate rows of hdc and dc</li>
                <li>🎨 <strong>Ombre:</strong> Use gradient yarn for color shift</li>
            </ul>
            
            <p><strong>Stay cozy! 🧣</strong></p>
        `
    };
}

function generateHatPattern(request) {
    return {
        title: `Complete ${capitalize(request)} Pattern`,
        content: `
            <h3>Materials Needed</h3>
            <ul>
                <li>Worsted weight yarn (4) - 200 yards</li>
                <li>5.5mm (I/9) crochet hook</li>
                <li>Yarn needle</li>
                <li>Stitch marker</li>
            </ul>
            
            <h3>Sizing</h3>
            <p>Pattern written for: Child (Teen/Adult S, Adult M/L)</p>
            <p><strong>Circumference:</strong> 18 (20, 22)"</p>
            
            <h3>Gauge</h3>
            <p>14 stitches x 16 rounds = 4 inches in hdc</p>
            
            <h3>Crown</h3>
            <ol>
                <li><strong>Rnd 1:</strong> Magic ring, ch 2, 10 hdc in ring, join [10]</li>
                <li><strong>Rnd 2:</strong> Ch 2, 2 hdc in each st around, join [20]</li>
                <li><strong>Rnd 3:</strong> Ch 2, *hdc, 2 hdc in next st*, repeat around, join [30]</li>
                <li><strong>Rnd 4:</strong> Ch 2, *hdc in next 2 sts, 2 hdc in next st*, repeat around, join [40]</li>
                <li><strong>Rnd 5:</strong> Ch 2, *hdc in next 3 sts, 2 hdc in next st*, repeat around, join [50]</li>
                <li>For Adult sizes: Continue increasing until you have 60 (70) sts</li>
            </ol>
            
            <h3>Sides</h3>
            <ol>
                <li><strong>Rnds 6-20:</strong> Ch 2, hdc in each st around, join</li>
                <li>Work even until hat measures 7 (8, 9)" from top or desired length</li>
            </ol>
            
            <h3>Brim</h3>
            <ol>
                <li><strong>Rnd 21:</strong> Ch 1, sc in BLO in each st around, join</li>
                <li><strong>Rnds 22-24:</strong> Ch 1, sc in each st around, join</li>
                <li>Fasten off</li>
            </ol>
            
            <h3>Optional Pom Pom</h3>
            <ol>
                <li>Wrap yarn around 4 fingers 60 times</li>
                <li>Tie tightly in center</li>
                <li>Cut loops and trim to shape</li>
                <li>Attach to top of hat</li>
            </ol>
            
            <h3>Variations</h3>
            <ul>
                <li>🎀 <strong>Slouchy:</strong> Add 10 more stitches and 2" length</li>
                <li>🌟 <strong>Textured:</strong> Work in FPdc/BPdc for ribbing</li>
                <li>🎨 <strong>Striped:</strong> Change colors every 3 rounds</li>
            </ul>
            
            <p><strong>Stay warm! 🧢</strong></p>
        `
    };
}

function generateShawlPattern(request) {
    return {
        title: `Complete ${capitalize(request)} Pattern`,
        content: `
            <h3>Materials Needed</h3>
            <ul>
                <li>Fingering or Sport weight yarn - 600-800 yards</li>
                <li>4.0mm (G/6) crochet hook</li>
                <li>Yarn needle</li>
                <li>Stitch markers</li>
                <li>Blocking pins</li>
            </ul>
            
            <h3>Finished Size</h3>
            <p><strong>Wingspan:</strong> 60" across x 30" deep</p>
            
            <h3>Gauge</h3>
            <p>18 stitches x 10 rows = 4 inches in pattern (after blocking)</p>
            
            <h3>Triangle Shawl Pattern</h3>
            
            <h4>Foundation:</h4>
            <p>Ch 4, sl st to first ch to form ring</p>
            
            <h4>Row 1:</h4>
            <p>Ch 3 (counts as dc), 2 dc in ring, ch 2, 3 dc in ring, turn</p>
            
            <h4>Row 2:</h4>
            <p>Ch 3, 2 dc in first st, ch 1, (3 dc, ch 2, 3 dc) in ch-2 space (center), ch 1, 3 dc in top of ch-3, turn</p>
            
            <h4>Row 3:</h4>
            <p>Ch 3, 2 dc in first st, *ch 1, 3 dc in ch-1 space*, repeat across to center, ch 1, (3 dc, ch 2, 3 dc) in ch-2 space, *ch 1, 3 dc in ch-1 space*, repeat to end, ch 1, 3 dc in top of ch-3, turn</p>
            
            <h4>Rows 4-60:</h4>
            <p>Repeat Row 3 until shawl measures 30" deep or desired size</p>
            
            <h4>Border:</h4>
            <ol>
                <li><strong>Rnd 1:</strong> Ch 1, work sc evenly around all edges, working 5 sc in point</li>
                <li><strong>Rnd 2:</strong> *Ch 3, skip 1 st, sl st in next st*, repeat around</li>
            </ol>
            
            <p>Fasten off</p>
            
            <h3>Blocking</h3>
            <ol>
                <li>Soak shawl in lukewarm water for 20 minutes</li>
                <li>Gently squeeze out water (don't wring)</li>
                <li>Pin to measurements on blocking mats</li>
                <li>Let dry completely (24-48 hours)</li>
            </ol>
            
            <h3>Wearing Options</h3>
            <ul>
                <li>🎀 Point at back, drape over shoulders</li>
                <li>🌟 Point at front, wrap around</li>
                <li>✨ Fold in half, wear as large scarf</li>
            </ul>
            
            <p><strong>Elegant and warm! 🧣</strong></p>
        `
    };
}

function generateSocksPattern(request) {
    return {
        title: `Complete ${capitalize(request)} Pattern`,
        content: `
            <h3>Materials Needed</h3>
            <ul>
                <li>Fingering weight sock yarn - 400 yards</li>
                <li>3.5mm (E/4) crochet hook</li>
                <li>Yarn needle</li>
                <li>Stitch marker</li>
            </ul>
            
            <h3>Sizing</h3>
            <p>Women's S/M (M/L, Men's L/XL)</p>
            <p><strong>Foot length:</strong> 8 (9, 10)"</p>
            
            <h3>Gauge</h3>
            <p>22 stitches x 24 rounds = 4 inches in sc</p>
            
            <h3>Cuff (Worked Top-Down)</h3>
            <ol>
                <li>Ch 48 (52, 56), join with sl st</li>
                <li><strong>Rnds 1-10:</strong> *FPsc, BPsc*, repeat around for ribbing</li>
            </ol>
            
            <h3>Leg</h3>
            <ol>
                <li><strong>Rnds 11-25:</strong> Sc in each st around [48, 52, 56 sts]</li>
            </ol>
            
            <h3>Heel Flap</h3>
            <ol>
                <li>Work back and forth on half the stitches (24, 26, 28 sts)</li>
                <li><strong>Rows 1-20:</strong> Ch 1, sc across, turn</li>
            </ol>
            
            <h3>Heel Turn</h3>
            <ol>
                <li><strong>Row 1:</strong> Sc in 14 (15, 16) sts, sc2tog, sc, turn</li>
                <li><strong>Row 2:</strong> Sc in 5 sts, sc2tog, sc, turn</li>
                <li><strong>Rows 3-8:</strong> Sc to 1 st before gap, sc2tog (closing gap), sc, turn</li>
            </ol>
            
            <h3>Foot</h3>
            <ol>
                <li>Work in rounds, picking up stitches along heel flap</li>
                <li>Continue until foot measures 6 (7, 8)" from back of heel</li>
            </ol>
            
            <h3>Toe Shaping</h3>
            <ol>
                <li><strong>Rnd 1:</strong> *Sc 6, sc2tog*, repeat around</li>
                <li><strong>Rnd 2:</strong> Sc around</li>
                <li><strong>Rnd 3:</strong> *Sc 5, sc2tog*, repeat around</li>
                <li>Continue decreasing every other round until 16 sts remain</li>
                <li>Cut yarn, thread through remaining sts, pull tight</li>
            </ol>
            
            <p>Weave in ends. Make second sock to match!</p>
            
            <p><strong>Cozy toes! 🧦</strong></p>
        `
    };
}

function generateMittensPattern(request) {
    return {
        title: `Complete ${capitalize(request)} Pattern`,
        content: `
            <h3>Materials Needed</h3>
            <ul>
                <li>Worsted weight yarn (4) - 200 yards</li>
                <li>5.0mm (H/8) crochet hook</li>
                <li>Yarn needle</li>
                <li>Stitch marker</li>
            </ul>
            
            <h3>Sizing</h3>
            <p>Child (Women's S/M, Women's L/Men's M, Men's L/XL)</p>
            
            <h3>Gauge</h3>
            <p>16 stitches x 18 rounds = 4 inches in hdc</p>
            
            <h3>Cuff</h3>
            <ol>
                <li>Ch 28 (32, 36, 40), join with sl st</li>
                <li><strong>Rnds 1-8:</strong> *FPhdc, BPhdc*, repeat around for ribbing</li>
            </ol>
            
            <h3>Hand</h3>
            <ol>
                <li><strong>Rnds 9-15:</strong> Hdc in each st around [28, 32, 36, 40 sts]</li>
            </ol>
            
            <h3>Thumb Gusset</h3>
            <ol>
                <li><strong>Rnd 16:</strong> Hdc 14 (16, 18, 20), 2 hdc in next st, hdc 1, 2 hdc in next st, hdc to end</li>
                <li><strong>Rnd 17:</strong> Hdc around</li>
                <li><strong>Rnd 18:</strong> Hdc 14 (16, 18, 20), 2 hdc in next st, hdc 3, 2 hdc in next st, hdc to end</li>
                <li>Continue increasing 2 sts in thumb gusset every other round until thumb has 12 (14, 16, 18) sts</li>
            </ol>
            
            <h3>Thumb Opening</h3>
            <ol>
                <li><strong>Next Rnd:</strong> Hdc 14 (16, 18, 20), ch 2, skip thumb sts, hdc to end</li>
                <li><strong>Rnds 22-30:</strong> Hdc around [28, 32, 36, 40 sts]</li>
            </ol>
            
            <h3>Top Shaping</h3>
            <ol>
                <li><strong>Rnd 31:</strong> *Hdc 5, hdc2tog*, repeat around</li>
                <li><strong>Rnd 32:</strong> Hdc around</li>
                <li><strong>Rnd 33:</strong> *Hdc 4, hdc2tog*, repeat around</li>
                <li>Continue decreasing until 8 sts remain</li>
                <li>Cut yarn, pull through remaining sts</li>
            </ol>
            
            <h3>Thumb</h3>
            <ol>
                <li>Join yarn at thumb opening</li>
                <li>Work 12 (14, 16, 18) hdc around, picking up 2 sts from ch-2 space</li>
                <li>Work even for 8 (10, 12, 14) rounds</li>
                <li>Decrease each round until 6 sts remain</li>
                <li>Close top same as hand</li>
            </ol>
            
            <p>Make second mitten to match!</p>
            
            <p><strong>Warm hands! 🧤</strong></p>
        `
    };
}

function generateSlippersPattern(request) {
    return {
        title: `Complete ${capitalize(request)} Pattern`,
        content: `
            <h3>Materials Needed</h3>
            <ul>
                <li>Bulky weight yarn (5) - 200-300 yards</li>
                <li>6.5mm (K/10.5) crochet hook</li>
                <li>Yarn needle</li>
                <li>Non-slip fabric paint or purchased sole grips</li>
            </ul>
            
            <h3>Sizing</h3>
            <p>Women's 5-6 (7-8, 9-10) / Men's (8-9, 10-11)</p>
            
            <h3>Gauge</h3>
            <p>12 stitches x 14 rounds = 4 inches in sc</p>
            
            <h3>Sole</h3>
            <ol>
                <li>Ch 12 (14, 16)</li>
                <li><strong>Rnd 1:</strong> Sc in 2nd ch from hook, sc in next 10 (12, 14) ch, 5 sc in last ch, working on opposite side of ch, sc in next 10 (12, 14) ch, 4 sc in same st as first sc, join</li>
                <li><strong>Rnd 2:</strong> Ch 1, sc in first st, 2 sc in next st, sc 10 (12, 14), 2 sc in next 5 sts, sc 10 (12, 14), 2 sc in next 4 sts, join</li>
                <li><strong>Rnd 3:</strong> Ch 1, sc in each st around, join [40, 46, 52 sts]</li>
            </ol>
            
            <h3>Sides</h3>
            <ol>
                <li><strong>Rnds 4-8:</strong> Ch 1, working in BLO, sc in each st around, join</li>
            </ol>
            
            <h3>Toe Shaping</h3>
            <ol>
                <li><strong>Rnd 9:</strong> Ch 1, sc 18 (21, 24), [sc2tog] 4 times, sc to end, join</li>
                <li><strong>Rnd 10:</strong> Ch 1, sc 18 (21, 24), [sc2tog] 2 times, sc to end, join</li>
                <li><strong>Rnd 11:</strong> Ch 1, sc around, join</li>
            </ol>
            
            <h3>Ankle Cuff</h3>
            <ol>
                <li><strong>Rnds 12-16:</strong> Ch 1, sc around, join</li>
                <li>For folded cuff: Work 4 more rounds and fold over</li>
                <li>Fasten off</li>
            </ol>
            
            <h3>Finishing</h3>
            <ul>
                <li>Weave in all ends</li>
                <li>Apply non-slip dots to bottom of sole</li>
                <li>Optional: Add pom poms or decorative stitching</li>
            </ul>
            
            <p>Make second slipper to match!</p>
            
            <p><strong>Cozy feet! 🥿</strong></p>
        `
    };
}

function generateBagPattern(request) {
    return {
        title: `Complete ${capitalize(request)} Pattern`,
        content: `
            <h3>Materials Needed</h3>
            <ul>
                <li>Worsted weight cotton yarn - 400-600 yards</li>
                <li>5.5mm (I/9) crochet hook</li>
                <li>Yarn needle</li>
                <li>Optional: Fabric for lining, magnetic snap</li>
            </ul>
            
            <h3>Finished Size</h3>
            <p><strong>Dimensions:</strong> 12" wide x 14" tall x 4" deep</p>
            
            <h3>Gauge</h3>
            <p>14 stitches x 16 rounds = 4 inches in sc</p>
            
            <h3>Base</h3>
            <ol>
                <li>Ch 25</li>
                <li><strong>Rnd 1:</strong> Sc in 2nd ch from hook, sc 23, 3 sc in last ch, working on opposite side, sc 23, 2 sc in first ch, join [52 sts]</li>
                <li><strong>Rnd 2:</strong> Ch 1, 2 sc in first st, sc 23, 2 sc in next 3 sts, sc 23, 2 sc in next 2 sts, join [58 sts]</li>
                <li><strong>Rnd 3:</strong> Ch 1, sc in each st around, join [58 sts]</li>
            </ol>
            
            <h3>Sides</h3>
            <ol>
                <li><strong>Rnds 4-30:</strong> Ch 1, sc in BLO in each st around, join</li>
                <li>Continue until bag measures 14" tall</li>
            </ol>
            
            <h3>Top Border</h3>
            <ol>
                <li><strong>Rnd 31:</strong> Ch 1, sc in each st around, join</li>
                <li><strong>Rnd 32:</strong> Ch 1, *sc in next 3 sts, ch 2, skip 2 sts* (for eyelet row), repeat around, join</li>
                <li><strong>Rnd 33:</strong> Ch 1, sc in each st and 2 sc in each ch-2 space around, join</li>
            </ol>
            
            <h3>Handles (Make 2)</h3>
            <ol>
                <li>Ch 50 (or desired length)</li>
                <li><strong>Row 1:</strong> Sc in 2nd ch from hook and across, turn [49 sc]</li>
                <li><strong>Rows 2-4:</strong> Ch 1, sc in each st across, turn</li>
                <li>Fasten off, leaving long tail for sewing</li>
            </ol>
            
            <h3>Assembly</h3>
            <ol>
                <li>Sew handles to inside of bag, spacing evenly</li>
                <li>Reinforce handle attachment with extra stitching</li>
                <li>Optional: Sew in fabric lining and add magnetic snap closure</li>
                <li>Weave in all ends</li>
            </ol>
            
            <h3>Variations</h3>
            <ul>
                <li>🌟 <strong>Market Mesh:</strong> Use ch-1, skip 1 pattern for breathable mesh</li>
                <li>🎨 <strong>Striped:</strong> Change colors every 5 rounds</li>
                <li>✨ <strong>With Pockets:</strong> Add exterior pockets before finishing</li>
            </ul>
            
            <p><strong>Perfect for shopping or beach! 👜</strong></p>
        `
    };
}

function generateGrannySquarePattern(request) {
    return {
        title: `Complete ${capitalize(request)} Pattern`,
        content: `
            <h3>Materials Needed</h3>
            <ul>
                <li>Worsted weight yarn in desired colors</li>
                <li>5.0mm (H/8) crochet hook</li>
                <li>Yarn needle</li>
            </ul>
            
            <h3>Finished Size</h3>
            <p>Each square: 6" x 6" (adjustable)</p>
            
            <h3>Gauge</h3>
            <p>Gauge is flexible for granny squares</p>
            
            <h3>Traditional Granny Square</h3>
            
            <h4>Round 1 (Center):</h4>
            <ol>
                <li>With first color, ch 4, sl st to first ch to form ring</li>
                <li>Ch 3 (counts as dc), 2 dc in ring, ch 2</li>
                <li>*3 dc in ring, ch 2*, repeat 2 more times</li>
                <li>Join with sl st to top of ch-3 [4 groups of 3-dc with 4 corners]</li>
            </ol>
            
            <h4>Round 2:</h4>
            <ol>
                <li>Sl st to first ch-2 space (corner)</li>
                <li>Ch 3, (2 dc, ch 2, 3 dc) in same space (corner made)</li>
                <li>*Ch 1, (3 dc, ch 2, 3 dc) in next corner space*, repeat around</li>
                <li>Ch 1, join with sl st to top of ch-3</li>
                <li>Optional: Change color</li>
            </ol>
            
            <h4>Round 3:</h4>
            <ol>
                <li>Sl st to first corner space</li>
                <li>Ch 3, (2 dc, ch 2, 3 dc) in corner</li>
                <li>*Ch 1, 3 dc in next ch-1 space, ch 1, (3 dc, ch 2, 3 dc) in corner*, repeat around</li>
                <li>Ch 1, 3 dc in last ch-1 space, ch 1, join</li>
            </ol>
            
            <h4>Round 4:</h4>
            <ol>
                <li>Continue pattern: work (3 dc, ch 2, 3 dc) in each corner</li>
                <li>Work 3 dc in each ch-1 space along sides</li>
                <li>Ch 1 between each 3-dc group</li>
                <li>Add more rounds for larger squares</li>
            </ol>
            
            <h3>Joining Granny Squares</h3>
            
            <h4>Method 1 - Whip Stitch:</h4>
            <ol>
                <li>Place squares wrong sides together</li>
                <li>Whip stitch through back loops only</li>
                <li>Creates a decorative ridge on right side</li>
            </ol>
            
            <h4>Method 2 - Slip Stitch Join:</h4>
            <ol>
                <li>Hold squares right sides together</li>
                <li>Sl st through both loops of both squares</li>
                <li>Creates flat, invisible seam</li>
            </ol>
            
            <h4>Method 3 - Join-As-You-Go:</h4>
            <ol>
                <li>On last round of second square, join to first square</li>
                <li>Instead of ch-2 at corner, ch 1, sl st into corresponding corner of first square, ch 1</li>
                <li>Continue joining along edge as you crochet</li>
            </ol>
            
            <h3>Project Ideas Using Granny Squares</h3>
            <ul>
                <li>🛏️ <strong>Blankets:</strong> Make 30-50 squares and join</li>
                <li>👜 <strong>Bags:</strong> Join 8-10 squares for tote</li>
                <li>🧥 <strong>Cardigans:</strong> Join for panels, add sleeves</li>
                <li>🧣 <strong>Scarves:</strong> Join 3-4 squares lengthwise</li>
                <li>🛋️ <strong>Pillows:</strong> Join 2 squares, stuff, seam</li>
                <li>🧸 <strong>Patchwork:</strong> Cover anything with squares!</li>
            </ul>
            
            <h3>Color Combinations</h3>
            <ul>
                <li>🌈 <strong>Rainbow:</strong> Each square different color</li>
                <li>🎨 <strong>Ombre:</strong> Gradient from light to dark</li>
                <li>⬜ <strong>Two-tone:</strong> Alternate colors each round</li>
                <li>🌟 <strong>Scrappy:</strong> Use all leftover yarn</li>
            </ul>
            
            <h3>Tips for Perfect Squares</h3>
            <ul>
                <li>✨ Keep tension consistent</li>
                <li>✨ Count stitches in each round</li>
                <li>✨ Block squares before joining</li>
                <li>✨ Start and end yarns in same corner</li>
                <li>✨ Use same weight yarn for all squares</li>
            </ul>
            
            <p><strong>Endless possibilities with granny squares! 🌈</strong></p>
        `
    };
}

function generateBlanketPattern(request) {
    return {
        title: `Complete ${capitalize(request)} Pattern`,
        content: `
            <h3>Materials Needed</h3>
            <ul>
                <li>Worsted weight yarn (4) - approximately 800-1200 yards for baby blanket, 1500-2000 yards for throw</li>
                <li>5.5mm (I/9) crochet hook (or size needed for gauge)</li>
                <li>Yarn needle for weaving ends</li>
                <li>Stitch markers (optional)</li>
                <li>Measuring tape</li>
                <li>Scissors</li>
            </ul>
            
            <h3>Pattern Details</h3>
            <p><strong>Finished Sizes:</strong></p>
            <ul>
                <li>Baby Blanket: 36" x 40" (foundation chain 127)</li>
                <li>Lap Throw: 40" x 50" (foundation chain 141)</li>
                <li>Afghan: 50" x 60" (foundation chain 176)</li>
            </ul>
            <p><strong>Gauge:</strong> 14 stitches x 16 rows = 4 inches in single crochet</p>
            <p><strong>Skill Level:</strong> Beginner</p>
            
            <h3>Abbreviations</h3>
            <ul>
                <li><strong>ch</strong> - chain</li>
                <li><strong>sc</strong> - single crochet</li>
                <li><strong>hdc</strong> - half double crochet</li>
                <li><strong>dc</strong> - double crochet</li>
                <li><strong>st(s)</strong> - stitch(es)</li>
                <li><strong>sl st</strong> - slip stitch</li>
            </ul>
            
            <h3>Main Blanket Body</h3>
            
            <h4>Foundation Row:</h4>
            <ol>
                <li>Ch 127 for baby blanket (141 for lap throw, 176 for afghan)</li>
                <li>Or chain to desired width in multiples of 2 + 1</li>
            </ol>
            
            <h4>Row 1 (Right Side):</h4>
            <p>Sc in 2nd ch from hook and in each ch across, turn [126 sc for baby blanket]</p>
            
            <h4>Row 2:</h4>
            <p>Ch 1 (does not count as st), sc in each st across, turn [126 sc]</p>
            
            <h4>Rows 3-140 (or to desired length):</h4>
            <p>Repeat Row 2 until blanket measures approximately 38-39 inches (or 2 inches less than desired final length)</p>
            <p><em>Count your stitches every 10 rows to ensure you're maintaining the correct width</em></p>
            
            <h3>Border (Highly Recommended)</h3>
            <p>Do not fasten off after last row. Continue working around entire blanket:</p>
            
            <h4>Round 1:</h4>
            <ol>
                <li>Ch 1, work 3 sc in corner st (to turn corner)</li>
                <li>Work sc evenly down side edge (approximately 3 sc for every 4 rows)</li>
                <li>Work 3 sc in next corner</li>
                <li>Sc in each st across bottom edge</li>
                <li>Work 3 sc in next corner</li>
                <li>Work sc evenly up other side edge</li>
                <li>Work 3 sc in last corner</li>
                <li>Sc in each remaining st across top, join with sl st to first sc</li>
            </ol>
            
            <h4>Round 2:</h4>
            <p>Ch 1, sc in each st around, working 3 sc in each corner middle st, join with sl st to first sc</p>
            
            <h4>Round 3:</h4>
            <p>Ch 1, sc in each st around, working 3 sc in each corner middle st, join with sl st to first sc</p>
            
            <h4>Round 4 (Optional Decorative Edge):</h4>
            <p><strong>Option A - Shell Edge:</strong> *Skip 2 sts, 5 dc in next st, skip 2 sts, sl st in next st*, repeat around</p>
            <p><strong>Option B - Picot Edge:</strong> *Sc in next 3 sts, ch 3, sl st in first ch (picot made)*, repeat around</p>
            <p><strong>Option C - Simple Edge:</strong> Sl st in each st around for a neat finish</p>
            
            <p>Fasten off and weave in all ends securely.</p>
            
            <h3>Stitch Pattern Variations</h3>
            
            <h4>Textured Pattern (Instead of Plain SC):</h4>
            <p><strong>Row 1:</strong> Sc in 2nd ch from hook and across, turn</p>
            <p><strong>Row 2:</strong> Ch 2 (counts as hdc), hdc in each st across, turn</p>
            <p><strong>Row 3:</strong> Ch 1, sc in each st across, turn</p>
            <p>Repeat Rows 2-3 for textured look</p>
            
            <h4>Granny Stripe Pattern:</h4>
            <p><strong>Foundation:</strong> Ch in multiples of 3 + 2</p>
            <p><strong>Row 1:</strong> Dc in 4th ch from hook, dc in next ch, *ch 1, skip 1 ch, dc in next 3 ch*, repeat across</p>
            <p><strong>Row 2:</strong> Ch 3, turn, 2 dc in first ch-1 space, *ch 1, 3 dc in next ch-1 space*, repeat across</p>
            <p>Repeat Row 2 for pattern</p>
            
            <h4>V-Stitch Pattern:</h4>
            <p><strong>Foundation:</strong> Ch in multiples of 3 + 1</p>
            <p><strong>Row 1:</strong> (Dc, ch 1, dc) in 5th ch from hook (V-st made), *skip 2 ch, V-st in next ch*, repeat across</p>
            <p><strong>Row 2:</strong> Ch 3, turn, V-st in each ch-1 space across</p>
            <p>Repeat Row 2 for pattern</p>
            
            <h3>Color Pattern Ideas</h3>
            <ul>
                <li>🌈 <strong>Simple Stripes:</strong> Change colors every 4-6 rows</li>
                <li>🎨 <strong>Gradient:</strong> Use colors from light to dark or vice versa</li>
                <li>⬜ <strong>Checkerboard:</strong> Alternate 2 colors every 10 rows and 10 stitches</li>
                <li>🌟 <strong>Random Stripes:</strong> Use scrap yarn in random width stripes</li>
                <li>💙 <strong>Ombre:</strong> Gradually transition through shades of one color</li>
            </ul>
            
            <h3>Size Adjustments</h3>
            <ul>
                <li><strong>Wider Blanket:</strong> Add more chains in multiples of 2 to foundation</li>
                <li><strong>Narrower Blanket:</strong> Chain fewer stitches (subtract in multiples of 2)</li>
                <li><strong>Longer Blanket:</strong> Work more rows until desired length</li>
                <li><strong>Shorter Blanket:</strong> Work fewer rows</li>
            </ul>
            
            <h3>Yarn Requirements by Size</h3>
            <ul>
                <li><strong>Baby (36x40"):</strong> 800-1200 yards</li>
                <li><strong>Lap (40x50"):</strong> 1500-1800 yards</li>
                <li><strong>Afghan (50x60"):</strong> 2000-2400 yards</li>
                <li><strong>Twin (60x80"):</strong> 3000-3500 yards</li>
            </ul>
            
            <h3>Pro Tips for Success</h3>
            <ul>
                <li>✨ <strong>Keep tension consistent</strong> - This is crucial for even texture</li>
                <li>✨ <strong>Count stitches regularly</strong> - Check every 10 rows to catch mistakes early</li>
                <li>✨ <strong>Use stitch markers</strong> - Mark every 20-25 stitches for easy counting</li>
                <li>✨ <strong>Join new yarn at row ends</strong> - This hides the join better</li>
                <li>✨ <strong>Weave ends as you go</strong> - Don't save them all for the end!</li>
                <li>✨ <strong>Block when finished</strong> - Pin to size, spray with water, let dry flat</li>
                <li>✨ <strong>Work in good light</strong> - Prevents eye strain and mistakes</li>
                <li>✨ <strong>Take breaks</strong> - Your hands and shoulders will thank you</li>
            </ul>
            
            <h3>Finishing & Care</h3>
            
            <h4>Blocking Your Blanket:</h4>
            <ol>
                <li>Pin blanket to blocking mats or carpet to desired dimensions</li>
                <li>Make sure corners are square (use measuring tape to check)</li>
                <li>Spray evenly with water or use steam (check yarn label first!)</li>
                <li>Let dry completely before unpinning (24-48 hours)</li>
            </ol>
            
            <h4>Weaving in Ends:</h4>
            <ol>
                <li>Thread yarn tail through needle</li>
                <li>Weave through several stitches on wrong side</li>
                <li>Change direction and weave back through different stitches</li>
                <li>Pull gently to tension, then trim close to work</li>
            </ol>
            
            <h4>Washing Instructions:</h4>
            <ul>
                <li>🧼 Check yarn label for specific care instructions</li>
                <li>💧 Most acrylic: Machine wash cold, tumble dry low</li>
                <li>🐑 Wool or natural fibers: Hand wash cold, lay flat to dry</li>
                <li>🌊 First wash: Wash separately in case of color bleeding</li>
                <li>📏 Reshape while damp to maintain size</li>
            </ul>
            
            <h3>Troubleshooting Common Issues</h3>
            <ul>
                <li>📐 <strong>Blanket getting wider:</strong> You're likely adding stitches. Count carefully!</li>
                <li>📉 <strong>Blanket getting narrower:</strong> You're missing stitches at row ends</li>
                <li>🌊 <strong>Edges wavy:</strong> Tension is too loose, try smaller hook</li>
                <li>📏 <strong>Edges curling:</strong> Tension too tight, try larger hook or add border</li>
                <li>🎯 <strong>Rows uneven:</strong> Place marker in first stitch to identify row start</li>
                <li>🧵 <strong>Running out of yarn:</strong> Join new ball at end of row for neater join</li>
            </ul>
            
            <h3>Make It Special</h3>
            <ul>
                <li>🏷️ Add a handmade tag with care instructions</li>
                <li>🎁 Gift wrap in coordinating tissue paper and ribbon</li>
                <li>📸 Take progress photos to document your work</li>
                <li>💝 Personalize with recipient's favorite colors</li>
                <li>✍️ Include a note card about the pattern and yarn used</li>
            </ul>
            
            <p><strong>Happy Crocheting! Your blanket will be treasured for years! 🧶✨</strong></p>
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
console.log('%c80+ Free Patterns Available!', 'color: #4caf50; font-size: 16px; font-weight: bold;');

// Premium Features

// Scroll to top button
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Add ripple effect to buttons
document.querySelectorAll('.btn-primary, .category-btn, .generate-pattern-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple-effect');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Parallax effect for hero section (subtle movement only)
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < 500) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ============================================
// ADVANCED FEATURES - Making it Even Better!
// ============================================

// 1. FAVORITES SYSTEM - Save patterns to localStorage
class PatternFavorites {
    constructor() {
        this.storageKey = 'crochetBuddyFavorites';
        this.favorites = this.load();
        this.init();
    }
    
    load() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            return [];
        }
    }
    
    save() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.favorites));
        } catch (e) {
            console.error('Could not save favorites:', e);
        }
    }
    
    add(patternName) {
        if (!this.favorites.includes(patternName)) {
            this.favorites.push(patternName);
            this.save();
            this.updateUI();
            this.showNotification(`❤️ Added "${patternName}" to favorites!`);
        }
    }
    
    remove(patternName) {
        this.favorites = this.favorites.filter(f => f !== patternName);
        this.save();
        this.updateUI();
        this.showNotification(`Removed "${patternName}" from favorites`);
    }
    
    toggle(patternName) {
        if (this.favorites.includes(patternName)) {
            this.remove(patternName);
        } else {
            this.add(patternName);
        }
    }
    
    isFavorite(patternName) {
        return this.favorites.includes(patternName);
    }
    
    init() {
        // Add favorite button to pattern output
        const patternOutput = document.getElementById('pattern-output');
        if (patternOutput) {
            const observer = new MutationObserver(() => {
                this.addFavoriteButton();
            });
            observer.observe(patternOutput, { childList: true, subtree: true });
        }
        
        // Create favorites dropdown
        this.createFavoritesDropdown();
    }
    
    addFavoriteButton() {
        const patternTitle = document.querySelector('#pattern-output h2');
        if (patternTitle && !document.getElementById('favorite-btn')) {
            const patternName = patternTitle.textContent;
            const isFav = this.isFavorite(patternName);
            
            const favBtn = document.createElement('button');
            favBtn.id = 'favorite-btn';
            favBtn.className = 'favorite-btn';
            favBtn.innerHTML = isFav ? '❤️ Saved' : '🤍 Save';
            favBtn.style.cssText = `
                margin-left: 15px;
                padding: 8px 16px;
                background: ${isFav ? '#ff6b9d' : '#fff'};
                color: ${isFav ? '#fff' : '#333'};
                border: 2px solid #ff6b9d;
                border-radius: 25px;
                cursor: pointer;
                font-size: 14px;
                font-weight: 600;
                transition: all 0.3s ease;
            `;
            
            favBtn.addEventListener('click', () => {
                this.toggle(patternName);
                favBtn.innerHTML = this.isFavorite(patternName) ? '❤️ Saved' : '🤍 Save';
                favBtn.style.background = this.isFavorite(patternName) ? '#ff6b9d' : '#fff';
                favBtn.style.color = this.isFavorite(patternName) ? '#fff' : '#333';
            });
            
            patternTitle.style.display = 'flex';
            patternTitle.style.alignItems = 'center';
            patternTitle.appendChild(favBtn);
        }
    }
    
    createFavoritesDropdown() {
        const header = document.querySelector('header .container');
        if (!header) return;
        
        const favoritesDiv = document.createElement('div');
        favoritesDiv.className = 'favorites-dropdown';
        favoritesDiv.style.cssText = `
            position: relative;
            display: inline-block;
            margin-left: 20px;
        `;
        
        const favBtn = document.createElement('button');
        favBtn.innerHTML = '❤️ My Patterns';
        favBtn.className = 'btn-favorites';
        favBtn.style.cssText = `
            background: linear-gradient(135deg, #ff6b9d 0%, #ff8fab 100%);
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 600;
            font-size: 14px;
            box-shadow: 0 4px 15px rgba(255, 107, 157, 0.3);
            transition: all 0.3s ease;
        `;
        
        const dropdown = document.createElement('div');
        dropdown.className = 'favorites-list';
        dropdown.style.cssText = `
            position: absolute;
            top: 45px;
            right: 0;
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 30px rgba(0,0,0,0.15);
            min-width: 250px;
            max-width: 350px;
            max-height: 400px;
            overflow-y: auto;
            z-index: 1000;
            display: none;
            padding: 10px;
        `;
        
        favBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
            this.updateUI();
        });
        
        document.addEventListener('click', () => {
            dropdown.style.display = 'none';
        });
        
        favoritesDiv.appendChild(favBtn);
        favoritesDiv.appendChild(dropdown);
        
        const nav = header.querySelector('nav');
        if (nav) {
            nav.appendChild(favoritesDiv);
        }
        
        this.dropdownElement = dropdown;
        this.updateUI();
    }
    
    updateUI() {
        if (!this.dropdownElement) return;
        
        if (this.favorites.length === 0) {
            this.dropdownElement.innerHTML = `
                <div style="padding: 20px; text-align: center; color: #999;">
                    <p>No saved patterns yet!</p>
                    <p style="font-size: 12px; margin-top: 10px;">Click 🤍 Save on any pattern to add it here.</p>
                </div>
            `;
        } else {
            this.dropdownElement.innerHTML = this.favorites.map(fav => `
                <div style="padding: 10px; border-bottom: 1px solid #f0f0f0; display: flex; justify-content: space-between; align-items: center;">
                    <span style="cursor: pointer; flex: 1; color: #333;" class="fav-item" data-pattern="${fav}">${fav}</span>
                    <button class="remove-fav" data-pattern="${fav}" style="background: #ff4757; color: white; border: none; border-radius: 50%; width: 24px; height: 24px; cursor: pointer; font-size: 16px; line-height: 1;">×</button>
                </div>
            `).join('');
            
            // Add click handlers
            this.dropdownElement.querySelectorAll('.fav-item').forEach(item => {
                item.addEventListener('click', () => {
                    const patternName = item.dataset.pattern;
                    document.getElementById('pattern-input').value = patternName;
                    generatePattern();
                    this.dropdownElement.style.display = 'none';
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
            });
            
            this.dropdownElement.querySelectorAll('.remove-fav').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.remove(btn.dataset.pattern);
                });
            });
        }
    }
    
    showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px 25px;
            border-radius: 12px;
            box-shadow: 0 8px 30px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            font-weight: 600;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2500);
    }
}

// 2. DARK MODE TOGGLE
class DarkMode {
    constructor() {
        this.isDark = localStorage.getItem('darkMode') === 'true';
        this.init();
    }
    
    init() {
        this.createToggle();
        if (this.isDark) {
            this.enable();
        }
    }
    
    createToggle() {
        const toggle = document.createElement('button');
        toggle.id = 'dark-mode-toggle';
        toggle.innerHTML = this.isDark ? '☀️' : '🌙';
        toggle.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
            z-index: 1000;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        toggle.addEventListener('click', () => {
            this.toggle();
        });
        
        document.body.appendChild(toggle);
        this.toggleBtn = toggle;
    }
    
    enable() {
        document.body.classList.add('dark-mode');
        this.isDark = true;
        localStorage.setItem('darkMode', 'true');
        if (this.toggleBtn) this.toggleBtn.innerHTML = '☀️';
    }
    
    disable() {
        document.body.classList.remove('dark-mode');
        this.isDark = false;
        localStorage.setItem('darkMode', 'false');
        if (this.toggleBtn) this.toggleBtn.innerHTML = '🌙';
    }
    
    toggle() {
        if (this.isDark) {
            this.disable();
        } else {
            this.enable();
        }
    }
}

// 3. PATTERN SEARCH & FILTER
class PatternSearch {
    constructor() {
        this.init();
    }
    
    init() {
        const categorySection = document.querySelector('.pattern-categories');
        if (!categorySection) return;
        
        const searchBar = document.createElement('div');
        searchBar.innerHTML = `
            <div style="max-width: 600px; margin: 20px auto 30px;">
                <input 
                    type="text" 
                    id="pattern-search" 
                    placeholder="🔍 Search patterns... (e.g., 'sweater', 'baby', 'amigurumi')"
                    style="width: 100%; padding: 15px 20px; border: 2px solid #e0e0e0; border-radius: 30px; font-size: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); transition: all 0.3s ease;"
                />
            </div>
        `;
        
        categorySection.insertBefore(searchBar, categorySection.querySelector('h2').nextSibling);
        
        const searchInput = document.getElementById('pattern-search');
        searchInput.addEventListener('input', (e) => {
            this.filterPatterns(e.target.value);
        });
        
        searchInput.addEventListener('focus', function() {
            this.style.borderColor = '#667eea';
            this.style.boxShadow = '0 4px 20px rgba(102, 126, 234, 0.2)';
        });
        
        searchInput.addEventListener('blur', function() {
            this.style.borderColor = '#e0e0e0';
            this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)';
        });
    }
    
    filterPatterns(query) {
        const cards = document.querySelectorAll('.pattern-card');
        const categories = document.querySelectorAll('.pattern-category');
        const searchLower = query.toLowerCase().trim();
        
        if (searchLower === '') {
            cards.forEach(card => card.style.display = 'block');
            categories.forEach(cat => cat.style.display = 'block');
            return;
        }
        
        let hasVisibleCards = false;
        
        categories.forEach(category => {
            const categoryCards = category.querySelectorAll('.pattern-card');
            let categoryHasVisible = false;
            
            categoryCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchLower) || description.includes(searchLower)) {
                    card.style.display = 'block';
                    categoryHasVisible = true;
                    hasVisibleCards = true;
                } else {
                    card.style.display = 'none';
                }
            });
            
            category.style.display = categoryHasVisible ? 'block' : 'none';
        });
        
        // Show "no results" message
        let noResults = document.getElementById('no-search-results');
        if (!hasVisibleCards) {
            if (!noResults) {
                noResults = document.createElement('div');
                noResults.id = 'no-search-results';
                noResults.style.cssText = 'text-align: center; padding: 40px; color: #999;';
                noResults.innerHTML = `
                    <h3>No patterns found for "${query}"</h3>
                    <p>Try a different search term or browse all categories below.</p>
                `;
                document.querySelector('.pattern-categories').appendChild(noResults);
            }
        } else if (noResults) {
            noResults.remove();
        }
    }
}

// 4. SHARE PATTERN FEATURE
function addShareButton() {
    const patternTitle = document.querySelector('#pattern-output h2');
    if (patternTitle && !document.getElementById('share-btn')) {
        const shareBtn = document.createElement('button');
        shareBtn.id = 'share-btn';
        shareBtn.innerHTML = '🔗 Share';
        shareBtn.style.cssText = `
            margin-left: 10px;
            padding: 8px 16px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
            transition: all 0.3s ease;
        `;
        
        shareBtn.addEventListener('click', async () => {
            const patternName = patternTitle.textContent.replace('❤️ Saved', '').replace('🤍 Save', '').replace('🔗 Share', '').trim();
            const url = `${window.location.origin}${window.location.pathname}?pattern=${encodeURIComponent(patternName)}`;
            
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: patternName,
                        text: `Check out this ${patternName} on Crochet Buddy!`,
                        url: url
                    });
                } catch (err) {
                    if (err.name !== 'AbortError') {
                        copyToClipboard(url);
                    }
                }
            } else {
                copyToClipboard(url);
            }
        });
        
        patternTitle.appendChild(shareBtn);
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('🔗 Link copied to clipboard!');
    }).catch(() => {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showNotification('🔗 Link copied to clipboard!');
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 12px;
        box-shadow: 0 8px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2500);
}

// ============================================
// INITIALIZE ALL ADVANCED FEATURES
// ============================================

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAdvancedFeatures);
} else {
    // DOM is already loaded
    initializeAdvancedFeatures();
}

function initializeAdvancedFeatures() {
    console.log('🚀 Initializing Crochet Buddy advanced features...');
    
    // Initialize favorites system
    const patternFavorites = new PatternFavorites();
    
    // Initialize dark mode
    const darkMode = new DarkMode();
    
    // Initialize pattern search
    const patternSearch = new PatternSearch();
    
    // Add share button when pattern is generated
    const patternOutputObserver = new MutationObserver(() => {
        addShareButton();
    });
    
    const patternOutputElement = document.getElementById('pattern-output');
    if (patternOutputElement) {
        patternOutputObserver.observe(patternOutputElement, { childList: true, subtree: true });
    }
    
    // Check for shared pattern in URL
    const urlParams = new URLSearchParams(window.location.search);
    const sharedPattern = urlParams.get('pattern');
    if (sharedPattern) {
        const patternInput = document.getElementById('pattern-input');
        if (patternInput) {
            patternInput.value = decodeURIComponent(sharedPattern);
            setTimeout(() => {
                generatePattern();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 500);
        }
    }
    
    console.log('✅ Advanced features initialized successfully!');
}