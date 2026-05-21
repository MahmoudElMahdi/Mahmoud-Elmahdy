// ===== Floating Particles =====
const analyticsIcons = [
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="14" width="4" height="7" rx="0.5" fill="currentColor" opacity="0.5"/><rect x="9" y="10" width="4" height="11" rx="0.5" fill="currentColor" opacity="0.65"/><rect x="15" y="6" width="4" height="15" rx="0.5" fill="currentColor" opacity="0.8"/></svg>',
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 17 9 11 14 14 21 7"/><circle cx="3" cy="17" r="1.5" fill="currentColor"/><circle cx="9" cy="11" r="1.5" fill="currentColor"/><circle cx="14" cy="14" r="1.5" fill="currentColor"/><circle cx="21" cy="7" r="1.5" fill="currentColor"/></svg>',
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 3v9l6.5 6.5" stroke="currentColor" stroke-linecap="round"/><path d="M12 3a9 9 0 0 1 9 9H12V3z" fill="currentColor" opacity="0.55"/></svg>',
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l5-5 4 3 9-9"/><path d="M17 6h4v4" stroke="currentColor"/></svg>'
];
for (let i = 0; i < 25; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.innerHTML = analyticsIcons[Math.floor(Math.random() * analyticsIcons.length)];
    const size = 14 + Math.floor(Math.random() * 10);
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.animationDelay = Math.random() * 50 + 's';
    particle.style.animationDuration = (42 + Math.random() * 28) + 's';
    particle.style.opacity = (0.22 + Math.random() * 0.2).toString();
    document.body.appendChild(particle);
}

// ===== Theme Toggle =====
function toggleTheme() {
    const body = document.body;
    const themeSvg = document.getElementById('theme-svg');
    const currentTheme = body.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        body.removeAttribute('data-theme');
        // Sun icon
        themeSvg.innerHTML = '<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>';
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        // Moon icon
        themeSvg.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/>';
        localStorage.setItem('theme', 'dark');
    }
}

// Set correct icon on load
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    const themeSvg = document.getElementById('theme-svg');
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        if (themeSvg) {
            themeSvg.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/>';
        }
    } else {
        if (themeSvg) {
            themeSvg.innerHTML = '<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>';
        }
    }
});

// ===== Scroll to Top Button =====
const scrollTopBtn = document.getElementById('scrollTopBtn');
if (scrollTopBtn) {
    window.onscroll = function() {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            scrollTopBtn.style.display = "flex";
        } else {
            scrollTopBtn.style.display = "none";
        }
    };

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    });
}

// ===== Mobile Accordion or Desktop Gallery click =====
function handleProjectClick(card, event, projectId) {
    if (window.innerWidth <= 768) {
        if (event.target.closest('.project-thumb') || 
            event.target.closest('.thumb-more') || 
            event.target.closest('.project-link')) {
            return; // Let the original event handle it
        }
        
        event.preventDefault();
        event.stopPropagation();
        
        // Close other cards
        document.querySelectorAll('.project-card.is-expanded').forEach(otherCard => {
            if (otherCard !== card) {
                otherCard.classList.remove('is-expanded');
            }
        });
        
        // Toggle current card
        card.classList.toggle('is-expanded');
    } else {
        // On desktop, clicking the card opens the gallery
        openGallery(projectId);
    }
}

// ===== Navbar Open/Close =====
const menuIcon = document.getElementById('menuIcon');
const navLinks = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');
if (menuIcon && navLinks && navOverlay) {
    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        if (navLinks.classList.contains('active')) {
            navOverlay.classList.add('active');
        } else {
            navOverlay.classList.remove('active');
        }
    });
    // Close nav when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navOverlay.classList.remove('active');
        });
    });
    // Close nav on resize if desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            navLinks.classList.remove('active');
            navOverlay.classList.remove('active');
        }
    });
    // Close nav when clicking outside nav (on overlay)
    navOverlay.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            navOverlay.classList.remove('active');
        }
    });
}

// ===== Enhanced Smooth Scrolling =====
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

// ===== Enhanced Navigation Background on Scroll =====
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// ===== Image Gallery Modal Functions =====
let currentImageIndex = 0;
let currentImages = [];

function openGallery(projectId) {
    const projectCard = document.querySelector(`[data-project="${projectId}"]`);
    if (!projectCard) return;
    const imagesData = projectCard.getAttribute('data-images');
    currentImages = imagesData.split(',');
    currentImageIndex = 0;
    
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    
    modalImage.src = currentImages[currentImageIndex];
    updateCounter();
    updateThumbnails();
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeGallery() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % currentImages.length;
    document.getElementById('modalImage').src = currentImages[currentImageIndex];
    updateCounter();
    updateThumbnails();
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
    document.getElementById('modalImage').src = currentImages[currentImageIndex];
    updateCounter();
    updateThumbnails();
}

function goToImage(index) {
    currentImageIndex = index;
    document.getElementById('modalImage').src = currentImages[currentImageIndex];
    updateCounter();
    updateThumbnails();
}

function updateCounter() {
    const counter = document.getElementById('imageCounter');
    if (counter) {
        counter.textContent = `${currentImageIndex + 1} / ${currentImages.length}`;
    }
}

function updateThumbnails() {
    const thumbnailsContainer = document.getElementById('thumbnails');
    if (thumbnailsContainer) {
        thumbnailsContainer.innerHTML = '';
        currentImages.forEach((image, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = image;
            thumbnail.className = `thumbnail ${index === currentImageIndex ? 'active' : ''}`;
            thumbnail.onclick = () => goToImage(index);
            thumbnailsContainer.appendChild(thumbnail);
        });
    }
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    const modal = document.getElementById('imageModal');
    if (modal && modal.style.display === 'flex') {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') closeGallery();
    }
});

// ===== Project Filtering Functionality =====
document.addEventListener('DOMContentLoaded', function() {
    const techFilterButtons = document.querySelectorAll('.filter-btn-tech');
    const allCards = document.querySelectorAll('.project-card');
    const projectCards = document.querySelectorAll('.project-card:not(.confidential-card)');
    const confidentialCards = document.querySelectorAll('.confidential-card');
    let activeTechFilter = 'all';

    // ===== Card Setup: Thumbnails & Link Wrapping =====
    allCards.forEach(card => {
        const content = card.querySelector('.project-content');
        if (!content) return;

        const linksDiv = content.querySelector('.project-links');

        // Create card-bottom wrapper for thumbnails + buttons
        const cardBottom = document.createElement('div');
        cardBottom.className = 'card-bottom';

        // Build thumbnail gallery from data-images
        const imagesData = card.getAttribute('data-images');
        if (imagesData) {
            const images = imagesData.split(',').filter(s => s.trim());
            if (images.length > 0) {
                const thumbContainer = document.createElement('div');
                thumbContainer.className = 'project-thumbnails';
                const maxShow = 4;
                const showImages = images.slice(0, maxShow);
                
                showImages.forEach((imgSrc, idx) => {
                    const thumb = document.createElement('img');
                    thumb.className = 'project-thumb';
                    thumb.src = imgSrc.trim();
                    thumb.alt = `Preview ${idx + 1}`;
                    thumb.onclick = (e) => {
                        e.stopPropagation();
                        openGallery(card.getAttribute('data-project'));
                        goToImage(idx);
                    };
                    thumbContainer.appendChild(thumb);
                });

                if (images.length > maxShow) {
                    const moreBtn = document.createElement('div');
                    moreBtn.className = 'thumb-more';
                    moreBtn.textContent = `+${images.length - maxShow}`;
                    moreBtn.onclick = (e) => {
                        e.stopPropagation();
                        openGallery(card.getAttribute('data-project'));
                    };
                    thumbContainer.appendChild(moreBtn);
                }

                cardBottom.appendChild(thumbContainer);
            }
        }

        // Move links into card-bottom and handle empty links
        if (linksDiv) {
            const links = linksDiv.querySelectorAll('a');
            if (links.length === 0) {
                linksDiv.style.display = 'none';
            }
            cardBottom.appendChild(linksDiv);
        }

        content.appendChild(cardBottom);
    });

    // ===== Filtering =====
    function applyProjectFilters() {
        projectCards.forEach(card => {
            const cardTech = (card.getAttribute('data-tech') || '').toLowerCase();
            const techMatch = activeTechFilter === 'all' || cardTech.includes(activeTechFilter);
            if (techMatch) {
                card.style.display = 'flex';
                card.classList.remove('hidden');
            } else {
                card.style.display = 'none';
                card.classList.add('hidden');
            }
        });

        confidentialCards.forEach(card => {
            const cardTech = (card.getAttribute('data-tech') || '').toLowerCase();
            const techMatch = activeTechFilter === 'all' || cardTech === activeTechFilter;
            if (techMatch) {
                card.style.display = 'flex';
                card.classList.remove('hidden');
            } else {
                card.style.display = 'none';
                card.classList.add('hidden');
            }
        });
    }

    techFilterButtons.forEach(button => {
        button.addEventListener('click', function() {
            activeTechFilter = (this.getAttribute('data-filter') || 'all').toLowerCase();
            techFilterButtons.forEach(btn => btn.classList.toggle('active', btn === this));
            applyProjectFilters();
        });
    });

    // Filter based on URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const skill = urlParams.get('skill');
    if (skill) {
        activeTechFilter = skill.toLowerCase();
        techFilterButtons.forEach(btn => {
            btn.classList.toggle('active', (btn.getAttribute('data-filter') || '').toLowerCase() === activeTechFilter);
        });
    }
    applyProjectFilters();

    // Add click event to modal background to close when clicking outside content
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeGallery();
            }
        });
    }

    // Intersection Observer for fade-in animations
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => {
        fadeObserver.observe(el);
    });
});
