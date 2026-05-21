// ===== Floating Particles =====
        // Floating analytics icons (bar, line, pie, trend)
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

// ===== EmailJS Integration =====
    // EmailJS setup: Replace YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, YOUR_USER_ID with your EmailJS credentials
    (function(){
        // Check if EmailJS is loaded
        if (typeof emailjs === 'undefined') {
            console.error('EmailJS library not loaded!');
            return;
        }
        
        emailjs.init('SVARfjrC_7xdnVfX4');
        console.log('EmailJS initialized with User ID:', 'SVARfjrC_7xdnVfX4');
    })();
    
    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) {
            console.error('Contact form not found!');
            return;
        }
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted, attempting to send email...');
            console.log('Service ID:', 'service_iqhx457');
            console.log('Template ID:', 'template_2e6e7mq');
            
            // Get form data
            const formData = new FormData(this);
            const templateParams = {
                from_name: formData.get('from_name'),
                from_email: formData.get('from_email'),
                message: formData.get('message')
            };
            
            console.log('Template parameters:', templateParams);
            
            // Use send method instead of sendForm for better control
            emailjs.send('service_iqhx457', 'template_2e6e7mq', templateParams)
                .then(function(response) {
                    console.log('EmailJS Success:', response);
                    document.getElementById('formStatus').textContent = 'Message sent successfully!';
                    document.getElementById('formStatus').style.color = 'green';
                    document.getElementById('contactForm').reset();
                }, function(error) {
                    console.error('EmailJS Error:', error);
                    console.error('Error details:', {
                        status: error.status,
                        text: error.text,
                        response: error.response
                    });
                    
                    let errorMessage = 'Failed to send message. Please try again.';
                    
                    // Handle specific error types
                    if (error.status === 422) {
                        errorMessage = 'Template validation error. Please check your EmailJS template variables.';
                        console.error('422 Error: This usually means template variables don\'t match form fields');
                    } else if (error.status === 400) {
                        errorMessage = 'Bad request. Please check your EmailJS configuration.';
                    } else if (error.status === 401) {
                        errorMessage = 'Authentication error. Please check your EmailJS User ID.';
                    }
                    
                    document.getElementById('formStatus').textContent = errorMessage;
                    document.getElementById('formStatus').style.color = 'red';
                });
        });
    });

// ===== Theme, Nav, Analytics & Portfolio Logic =====
        // Dark mode functionality
        function toggleTheme() {
            const body = document.body;
            const themeSvgs = document.querySelectorAll('.theme-svg-icon');
            const currentTheme = body.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                body.removeAttribute('data-theme');
                // Sun icon
                themeSvgs.forEach(svg => svg.innerHTML = '<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>');
                localStorage.setItem('theme', 'light');
                trackEvent('theme_toggle', 'preference', 'light', 1);
            } else {
                body.setAttribute('data-theme', 'dark');
                // Moon icon
                themeSvgs.forEach(svg => svg.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/>');
                localStorage.setItem('theme', 'dark');
                trackEvent('theme_toggle', 'preference', 'dark', 1);
            }
        }
        
        // Set correct icon on load
        document.addEventListener('DOMContentLoaded', function() {
            const savedTheme = localStorage.getItem('theme');
            const themeSvgs = document.querySelectorAll('.theme-svg-icon');
            if (savedTheme === 'dark') {
                document.body.setAttribute('data-theme', 'dark');
                themeSvgs.forEach(svg => svg.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/>');
            } else {
                themeSvgs.forEach(svg => svg.innerHTML = '<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>');
            }
        });
        
        // Nav open/close logic for all screens
        const menuIcon = document.getElementById('menuIcon');
        const navLinks = document.getElementById('navLinks');
        const navOverlay = document.getElementById('navOverlay');
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
            // Only close if click is outside the nav
            if (!navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                navOverlay.classList.remove('active');
            }
        });
        
        // Enhanced smooth scrolling
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
        
        // Enhanced navigation background on scroll
        const navbar = document.querySelector('nav');
        window.addEventListener('scroll', () => {
            if (!navbar) return;
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, { passive: true });
        
        // Enhanced Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -80px 0px'
        };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Add glow effect to timeline items
                    if (entry.target.classList.contains('timeline-content')) {
                        entry.target.classList.add('glow');
                    }
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
        
        // Enhanced active nav link highlighting (Optimized)
        const sections = document.querySelectorAll('section[id]');
        const navLinkElements = document.querySelectorAll('.nav-links a:not(.theme-toggle)');
        
        // Cache section positions to avoid layout thrashing on scroll
        let sectionData = [];
        function updateSectionData() {
            sectionData = Array.from(sections).map(section => ({
                id: section.getAttribute('id'),
                top: section.offsetTop - 200,
                bottom: section.offsetTop + section.clientHeight - 200
            }));
        }
        
        // Update on load and resize
        window.addEventListener('load', updateSectionData);
        window.addEventListener('resize', updateSectionData);
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            let current = '';
            
            for (let i = 0; i < sectionData.length; i++) {
                if (currentScrollY >= sectionData[i].top) {
                    current = sectionData[i].id;
                }
            }
            
            navLinkElements.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
        }, { passive: true });
        
        // Add pulse animation to CTA button
        setInterval(() => {
            const ctaButton = document.querySelector('.cta-button');
            ctaButton.classList.add('pulse');
            setTimeout(() => {
                ctaButton.classList.remove('pulse');
            }, 2000);
        }, 5000);
        
        // Image Gallery Modal Functions
        let currentImageIndex = 0;
        let currentImages = [];
        
        function openGallery(projectId) {
            const projectCard = document.querySelector(`[data-project="${projectId}"]`);
            const imagesData = projectCard.getAttribute('data-images');
            currentImages = imagesData.split(',');
            currentImageIndex = 0;
            const modal = document.getElementById('imageModal');
            const modalImage = document.getElementById('modalImage');
            const imageCounter = document.getElementById('imageCounter');
            modalImage.src = currentImages[currentImageIndex];
            
            // Restore visibility of gallery controls
            imageCounter.style.display = 'block';
            document.querySelector('.thumbnails-container').style.display = 'block';
            document.querySelectorAll('.nav-btn').forEach(btn => btn.style.display = 'flex');

            updateCounter();
            updateThumbnails();
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Track gallery open event
            trackEvent('gallery_open', 'engagement', projectId, 1);
        }
        
        function openSingleImage(src) {
            currentImages = [src];
            currentImageIndex = 0;
            const modal = document.getElementById('imageModal');
            document.getElementById('modalImage').src = src;
            
            // Hide gallery controls
            document.getElementById('imageCounter').style.display = 'none';
            document.querySelector('.thumbnails-container').style.display = 'none';
            document.querySelectorAll('.nav-btn').forEach(btn => btn.style.display = 'none');
            
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
        
        function closeGallery() {
            const modal = document.getElementById('imageModal');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
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
            counter.textContent = `${currentImageIndex + 1} / ${currentImages.length}`;
        }
        
        function updateThumbnails() {
            const thumbnailsContainer = document.getElementById('thumbnails');
            thumbnailsContainer.innerHTML = '';
            currentImages.forEach((image, index) => {
                const thumbnail = document.createElement('img');
                thumbnail.src = image;
                thumbnail.className = `thumbnail ${index === currentImageIndex ? 'active' : ''}`;
                thumbnail.onclick = () => goToImage(index);
                thumbnailsContainer.appendChild(thumbnail);
            });
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            const modal = document.getElementById('imageModal');
            if (modal.style.display === 'flex') {
                if (e.key === 'ArrowRight') nextImage();
                if (e.key === 'ArrowLeft') prevImage();
                if (e.key === 'Escape') closeGallery();
            }
        });

        // Scroll to top button functionality
        const scrollTopBtn = document.getElementById('scrollTopBtn');

        window.onscroll = function() {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                scrollTopBtn.style.display = "flex";
            } else {
                scrollTopBtn.style.display = "none";
            }
        };

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({top: 0, behavior: 'smooth'});
            trackEvent('scroll_to_top', 'navigation', 'scroll_top_button', 1);
        });
        
        // Track external link clicks
        document.querySelectorAll('a[href^="http"], a[target="_blank"]').forEach(link => {
            link.addEventListener('click', function(e) {
                const url = this.getAttribute('href');
                if (url && (url.startsWith('http') || this.getAttribute('target') === '_blank')) {
                    trackEvent('external_link_click', 'outbound', url, 1);
                }
            });
        });
        
        // Track project link clicks (GitHub, Reports, etc.)
        document.querySelectorAll('.project-link').forEach(link => {
            link.addEventListener('click', function(e) {
                const url = this.getAttribute('href');
                const projectCard = this.closest('.project-card');
                const projectName = projectCard ? projectCard.querySelector('h3')?.textContent || 'Unknown' : 'Unknown';
                trackEvent('project_link_click', 'project', `${projectName} - ${url}`, 1);
            });
        });
        
        // Track profile card clicks
        document.querySelectorAll('.profile-card').forEach(card => {
            card.addEventListener('click', function(e) {
                const profileName = this.querySelector('.profile-name')?.textContent || 'Unknown';
                trackEvent('profile_card_click', 'social', profileName, 1);
            });
        });
        
        function downloadResumePDF(e) {
            if (e) e.preventDefault();
            if (typeof trackEvent === 'function') {
                trackEvent('resume_download', 'download', 'pdf', 1);
            }
            const popup = window.open('resume.html?download=pdf', '_blank');
            if (popup) {
                popup.addEventListener('load', function onLoad() {
                    popup.removeEventListener('load', onLoad);
                    try { popup.print(); } catch (err) { /* print blocked */ }
                });
            } else {
                window.location.href = 'resume.html?download=pdf';
            }
        }

        // Track resume download/view
        document.querySelectorAll('.resume-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                trackEvent('resume_view', 'download', 'resume', 1);
            });
        });
        
        // Track section views (when user scrolls to a section)
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                    const sectionId = entry.target.id || entry.target.className;
                    trackEvent('section_view', 'engagement', sectionId, 1);
                    // Unobserve after first view to avoid duplicate events
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        // Observe all main sections
        document.querySelectorAll('section[id]').forEach(section => {
            sectionObserver.observe(section);
        });

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
        
        // ===== Card Setup: Thumbnails, Reorder, Button Handling =====
        document.querySelectorAll('.project-card').forEach(card => {
            const content = card.querySelector('.project-content');
            if (!content) return;

            const h3 = content.querySelector('h3');
            const techDiv = content.querySelector('.project-tech');
            const p = content.querySelector('p');
            const caseStudy = content.querySelector('.project-case-study');
            const impactBadge = content.querySelector('.project-impact-badge');
            const linksDiv = content.querySelector('.project-links');

            // Reorder: h3 -> tech-tags -> case study / description
            if (h3 && techDiv) {
                content.insertBefore(h3, content.firstChild);
                h3.after(techDiv);
                if (impactBadge) techDiv.after(impactBadge);
                if (caseStudy) (impactBadge || techDiv).after(caseStudy);
                else if (p) techDiv.after(p);
            }

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

        // ===== Review Card Setup: Thumbnails (now handled in HTML) =====
        
        function toggleCourseCard(card) {
            if (window.innerWidth <= 768) {
                // Close other expanded cards in the same parent section
                const parent = card.closest('section') || card.parentElement;
                parent.querySelectorAll('.is-expanded').forEach(otherCard => {
                    if (otherCard !== card) {
                        otherCard.classList.remove('is-expanded');
                    }
                });
                card.classList.toggle('is-expanded');
            }
        }

        function handleProjectClick(card, event, projectId) {
            if (window.innerWidth <= 768) {
                // On mobile, only toggle if the click is on the header or the card itself (not links)
                if (!event.target.closest('.project-link') && !event.target.closest('.project-image')) {
                    // Close other expanded project cards
                    document.querySelectorAll('.project-card.is-expanded').forEach(otherCard => {
                        if (otherCard !== card) {
                            otherCard.classList.remove('is-expanded');
                        }
                    });
                    card.classList.toggle('is-expanded');
                }
            } else {
                openGallery(projectId);
            }
        }
