document.addEventListener('DOMContentLoaded', () => {
    // 1. Custom Cursor Tracking (Desktop Only)
    const cursor = document.querySelector('.custom-cursor');
    const cursorBlur = document.querySelector('.custom-cursor-blur');

    if (window.innerWidth >= 1024) {
        document.addEventListener('mousemove', (e) => {
            if (cursor && cursorBlur) {
                cursor.style.left = `${e.clientX}px`;
                cursor.style.top = `${e.clientY}px`;
                
                // Slight delay/lag effect on the background blur for fluid feel
                cursorBlur.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
            }
        });

        // Hover scale effects on interactive elements
        const clickables = document.querySelectorAll('a, button, .view-cert-link, .filter-btn, input, textarea');
        clickables.forEach(item => {
            item.addEventListener('mouseenter', () => {
                if (cursor) {
                    cursor.style.transform = 'translate(-50%, -50%) scale(2)';
                    cursor.style.backgroundColor = 'var(--accent)';
                }
            });
            item.addEventListener('mouseleave', () => {
                if (cursor) {
                    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                    cursor.style.backgroundColor = 'var(--accent-secondary)';
                }
            });
        });
    } else {
        // Hide custom cursor elements on mobile
        if (cursor) cursor.style.display = 'none';
        if (cursorBlur) cursorBlur.style.display = 'none';
    }

    // 2. Initialize Particles.js (Space Cyber Network theme)
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 70, density: { enable: true, value_area: 800 } },
                color: { value: ["#8b5cf6", "#06b6d4", "#ffffff"] },
                shape: { type: "circle" },
                opacity: { value: 0.25, random: true, anim: { enable: true, speed: 0.8, opacity_min: 0.1, sync: false } },
                size: { value: 2.5, random: true, anim: { enable: true, speed: 2, size_min: 0.5, sync: false } },
                line_linked: { enable: true, distance: 130, color: "#8b5cf6", opacity: 0.08, width: 1 },
                move: { enable: true, speed: 1.2, direction: "none", random: true, straight: false, out_mode: "out", bounce: false }
            },
            interactivity: {
                detect_on: "canvas",
                events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" }, resize: true },
                modes: { grab: { distance: 150, line_linked: { opacity: 0.35 } }, push: { particles_nb: 3 } }
            },
            retina_detect: true
        });
    }

    // 3. Header Scrolled Styling Toggle
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 4. Mobile Navigation Menu Toggle
    const menuIcon = document.querySelector('.menu-icon');
    const navbar = document.querySelector('.navbar');

    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', () => {
            navbar.classList.toggle('active');
            const icon = menuIcon.querySelector('i');
            if (navbar.classList.contains('active')) {
                icon.classList.remove('bx-menu');
                icon.classList.add('bx-x');
            } else {
                icon.classList.remove('bx-x');
                icon.classList.add('bx-menu');
            }
        });

        // Close menu on link click
        const navLinks = document.querySelectorAll('.navbar a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                const icon = menuIcon.querySelector('i');
                icon.classList.remove('bx-x');
                icon.classList.add('bx-menu');
            });
        });
    }

    // 5. GSAP ScrollTriggers & Micro-Animations
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Hero Content Reveal Timeline
        const heroTimeline = gsap.timeline();
        heroTimeline.from('.hero-greeting', { y: 20, opacity: 0, duration: 0.5, delay: 0.1 })
                    .from('.hero-name', { y: 20, opacity: 0, duration: 0.5 }, "-=0.3")
                    .from('.hero-role', { y: 20, opacity: 0, duration: 0.5 }, "-=0.3")
                    .from('.hero-desc', { y: 20, opacity: 0, duration: 0.5 }, "-=0.3")
                    .from('.hero-actions', { y: 20, opacity: 0, duration: 0.5 }, "-=0.3")
                    .from('.hero-socials', { y: 15, opacity: 0, duration: 0.5 }, "-=0.2")
                    .from('.hero-image', { scale: 0.85, opacity: 0, duration: 0.7, ease: "back.out(1.4)" }, "-=0.7");

        // General Section Scroll Reveals (Headers + Cards)
        const revealElements = document.querySelectorAll('.section-heading, .glass-container, .timeline-item');
        revealElements.forEach(element => {
            gsap.from(element, {
                scrollTrigger: {
                    trigger: element,
                    start: "top 88%",
                    toggleActions: "play none none reverse"
                },
                y: 35,
                opacity: 0,
                duration: 0.75,
                ease: "power2.out"
            });
        });

        // Skill Bars Progress Animation
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            gsap.to(bar, {
                scrollTrigger: {
                    trigger: '.skills-grid',
                    start: "top 82%"
                },
                width: bar.getAttribute('data-width'),
                duration: 1.4,
                ease: "power3.out"
            });
        });

        // Active link highlighting on scroll
        const navLinks = document.querySelectorAll('.navbar .nav-link');
        const sections = document.querySelectorAll('section');
        
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= (sectionTop - 180)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (current && href.includes(current)) {
                    link.classList.add('active');
                }
            });
        });
    }

    // 6. 3D Tilt Effect on Cards (Project Cards)
    const tiltCards = document.querySelectorAll('.hover-tilt');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Adjust divisor to modify maximum angle tilt
            const tiltX = (y - centerY) / 25;
            const tiltY = (centerX - x) / 25;
            
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    });

    // 7. Projects Showcase Category Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active states
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hidden');
                    
                    // Trigger dynamic micro scale-in using GSAP if present
                    if (typeof gsap !== 'undefined') {
                        gsap.fromTo(card, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: "power2.out" });
                    }
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // 8. Interactive Certificate modal Viewer Logic
    const certModal = document.getElementById('certModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalCertTitle = document.getElementById('modalCertTitle');
    const modalCertImg = document.getElementById('modalCertImg');
    const modalCertMsg = document.getElementById('modalCertMsg');
    const viewCertButtons = document.querySelectorAll('.view-cert-link');

    const openCertModal = (certSrc, titleName, isPending) => {
        if (!certModal) return;
        
        modalCertTitle.textContent = titleName;
        
        if (isPending) {
            modalCertImg.style.display = 'none';
            modalCertMsg.style.display = 'block';
            modalCertMsg.innerHTML = `
                <i class='bx bx-time-five' style='font-size: 4rem; color: var(--accent-secondary); margin-bottom: 1.5rem; display: block;'></i>
                <strong>Verification Milestone Pending</strong>
                <p style='font-size: 0.95rem; color: var(--text-secondary); margin-top: 0.5rem;'>
                    Smart India Hackathon (SIH) 2025 participation evaluation is currently processing. 
                    The credential review file will be cataloged shortly.
                </p>
            `;
        } else {
            modalCertMsg.style.display = 'none';
            modalCertImg.style.display = 'block';
            modalCertImg.src = certSrc;
            modalCertImg.alt = titleName;
        }
        
        certModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock background scroll
    };

    const closeCertModal = () => {
        if (!certModal) return;
        certModal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore background scroll
        setTimeout(() => {
            if (modalCertImg) modalCertImg.src = '';
        }, 300);
    };

    viewCertButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const certSrc = btn.getAttribute('data-cert');
            
            // Traverse parent details to find certificate naming
            let titleText = 'Credential Document';
            const certItemParent = btn.closest('.cert-item');
            const milestoneItemParent = btn.closest('.milestone-item');
            
            if (certItemParent) {
                titleText = certItemParent.querySelector('.cert-details span').textContent;
            } else if (milestoneItemParent) {
                titleText = milestoneItemParent.querySelector('.milestone-info strong').textContent;
            }

            const isPending = btn.classList.contains('coming-soon-cert') || certSrc === 'sih-coming';
            openCertModal(certSrc, titleText, isPending);
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeCertModal);
    }

    if (certModal) {
        const backdrop = certModal.querySelector('.modal-backdrop');
        if (backdrop) backdrop.addEventListener('click', closeCertModal);
        
        // Escape key exit
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && certModal.classList.contains('active')) {
                closeCertModal();
            }
        });
    }

    // 9. Contact Form LocalStorage Logging & Feedback
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('formName').value;
            const email = document.getElementById('formEmail').value;
            const subject = document.getElementById('formSubject').value;
            const message = document.getElementById('formMessage').value;

            // Simple visual response mock
            const submitBtn = contactForm.querySelector('.form-submit-btn');
            const originalBtnText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> Transmitting Signal...";

            // Log submission in localStorage as a cataloged inquiry
            const inquiry = {
                name,
                email,
                subject,
                message,
                timestamp: new Date().toISOString()
            };
            
            let currentInquiries = JSON.parse(localStorage.getItem('portfolio_inquiries') || '[]');
            currentInquiries.push(inquiry);
            localStorage.setItem('portfolio_inquiries', JSON.stringify(currentInquiries));

            // Visual delay representation
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                
                if (formFeedback) {
                    formFeedback.classList.remove('error');
                    formFeedback.classList.add('active', 'success');
                    formFeedback.innerHTML = "<i class='bx bx-check-double'></i> Connection Established! Message Stored Securely.";
                    
                    // Reset form
                    contactForm.reset();

                    // Mute display feedback alert after 5s
                    setTimeout(() => {
                        formFeedback.classList.remove('active', 'success');
                        formFeedback.innerHTML = '';
                    }, 5000);
                }
            }, 1200);
        });
    }
});
