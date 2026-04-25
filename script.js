document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Set Current Year in Footer ---
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // --- 2. Mobile Menu Toggle ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // --- 3. Sticky Navbar & Back to Top Button ---
    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            backToTopBtn.classList.add('show');
        } else {
            navbar.classList.remove('scrolled');
            backToTopBtn.classList.remove('show');
        }
        
        // Active link switching based on scroll position
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- 4. Scroll Animations (Intersection Observer) ---
    const scrollElements = document.querySelectorAll('.scroll-anim');

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
    };

    const displayScrollElement = (element) => {
        element.classList.add('is-visible');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.15)) {
                displayScrollElement(el);
            }
        });
    };

    // Initial check
    handleScrollAnimation();
    window.addEventListener('scroll', handleScrollAnimation);

    // --- 5. Lightbox for Gallery ---
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');

    galleryItems.forEach(item => {
        item.parentElement.addEventListener('click', () => {
            lightbox.style.display = "block";
            lightboxImg.src = item.src;
            lightboxCaption.innerHTML = item.nextElementSibling.querySelector('span').innerHTML;
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    closeLightbox.addEventListener('click', () => {
        lightbox.style.display = "none";
        document.body.style.overflow = 'auto'; // Restore scrolling
    });

    // Close lightbox on click outside image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
            document.body.style.overflow = 'auto';
        }
    });

    // --- 6. Stats Counter Animation ---
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // ms
            const increment = target / (duration / 16); // 60fps
            
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target + (target > 100 ? '+' : '');
                }
            };
            
            updateCounter();
        });
    };

    // Trigger counters when Stats section is in view
    const statsSection = document.querySelector('.stats');
    const statsObserver = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting && !hasCounted) {
            animateCounters();
            hasCounted = true;
        }
    }, { threshold: 0.5 });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // --- 7. Testimonial Slider ---
    let slideIndex = 0;
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const sliderContainer = document.getElementById('testimonialSlider');
    
    // Make dots functional globally
    window.currentSlide = function(n) {
        showSlides(slideIndex = n);
        resetAutoSlide();
    }

    function showSlides(n) {
        if (!sliderContainer) return;
        
        // Handle bounds
        if (n >= slides.length) slideIndex = 0;
        if (n < 0) slideIndex = slides.length - 1;
        
        // Update slider position
        sliderContainer.style.transform = `translateX(-${slideIndex * 100}%)`;
        
        // Update dots
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[slideIndex]) {
            dots[slideIndex].classList.add('active');
        }
    }

    // Auto slide
    let autoSlideInterval = setInterval(() => {
        slideIndex++;
        showSlides(slideIndex);
    }, 5000);

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => {
            slideIndex++;
            showSlides(slideIndex);
        }, 5000);
    }

    // --- 8. Contact Form Validation ---
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;
            
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const packageSel = document.getElementById('package');
            const message = document.getElementById('message');
            
            // Basic validation
            if (name.value.trim() === '') {
                document.getElementById('nameError').innerText = 'Name is required';
                isValid = false;
            } else {
                document.getElementById('nameError').innerText = '';
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                document.getElementById('emailError').innerText = 'Please enter a valid email';
                isValid = false;
            } else {
                document.getElementById('emailError').innerText = '';
            }
            
            const phoneRegex = /^\d{10}$/; // Basic 10 digit check
            if (!phoneRegex.test(phone.value.replace(/[\s-]/g, ''))) {
                document.getElementById('phoneError').innerText = 'Please enter a valid 10-digit phone number';
                isValid = false;
            } else {
                document.getElementById('phoneError').innerText = '';
            }
            
            if (message.value.trim() === '') {
                document.getElementById('messageError').innerText = 'Message is required';
                isValid = false;
            } else {
                document.getElementById('messageError').innerText = '';
            }
            
            if (isValid) {
                // Simulate form submission
                const btn = contactForm.querySelector('button');
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                btn.disabled = true;
                
                setTimeout(() => {
                    btn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
                    btn.style.backgroundColor = '#10B981'; // Success Green
                    contactForm.reset();
                    
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.style.backgroundColor = '';
                        btn.disabled = false;
                    }, 3000);
                }, 1500);
            }
        });
    }

    // --- 9. Package Modal Logic ---
    const packageData = {
        package1: {
            title: "Premium Group Experience (30 Pax)",
            duration: "4 Nights / 5 Days",
            groupSize: "30 Persons",
            totalPrice: "₹4,92,000",
            perPerson: "(₹16,400 per person)",
            images: [
                "images/about_pahalgam_1776581424655.png",
                "images/gulmarg_snow_1776581444972.png",
                "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1623193231454-e0e64903df56?auto=format&fit=crop&w=800&q=80"
            ],
            features: [
                "15 Double Rooms in 4-Star Properties",
                "1 Meeting Hall for Party and Meeting",
                "Daily Breakfast and Dinner",
                "Warm Welcome at Airport",
                "Shikara Ride",
                "ABC: Aru Valley, Betab Valley, Chandanwadi",
                "Pickup and Drop",
                "Extensive Local Sightseeing"
            ]
        },
        package2: {
            title: "Intimate Group Escape (10 Pax)",
            duration: "4 Nights / 5 Days",
            groupSize: "10 Persons",
            totalPrice: "₹1,98,000",
            perPerson: "(₹19,800 per person)",
            images: [
                "images/gulmarg_snow_1776581444972.png",
                "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=800&q=80",
                "images/hero_kashmir_1776581409040.png",
                "images/about_pahalgam_1776581424655.png"
            ],
            features: [
                "5 Double Rooms in 4-Star Properties",
                "Daily Breakfast and Dinner",
                "Warm Welcome at Airport",
                "Shikara Ride",
                "ABC: Aru Valley, Betab Valley, Chandanwadi",
                "Pickup and Drop",
                "Extensive Local Sightseeing"
            ]
        }
    };

    const packageModal = document.getElementById('packageModal');
    const viewPackageBtns = document.querySelectorAll('.view-package-btn');
    const closePackageModal = document.querySelector('.close-modal');
    let currentModalSlideIndex = 0;
    let currentPackageImages = [];

    if(packageModal) {
        viewPackageBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const pkgId = btn.getAttribute('data-package');
                const pkg = packageData[pkgId];
                
                if(pkg) {
                    // Populate Details
                    document.getElementById('modalTitle').textContent = pkg.title;
                    document.getElementById('modalDuration').textContent = pkg.duration;
                    document.getElementById('modalGroupSize').textContent = pkg.groupSize;
                    document.getElementById('modalTotalPrice').textContent = pkg.totalPrice;
                    document.getElementById('modalPerPerson').textContent = pkg.perPerson;
                    
                    const featuresList = document.getElementById('modalFeatures');
                    featuresList.innerHTML = '';
                    pkg.features.forEach(feature => {
                        const li = document.createElement('li');
                        li.innerHTML = `<i class="fas fa-check-circle"></i> <span>${feature}</span>`;
                        featuresList.appendChild(li);
                    });

                    // Setup Images
                    currentPackageImages = pkg.images;
                    currentModalSlideIndex = 0;
                    document.getElementById('modalMainImg').src = currentPackageImages[0];
                    
                    const thumbnailsContainer = document.getElementById('modalThumbnails');
                    thumbnailsContainer.innerHTML = '';
                    currentPackageImages.forEach((src, idx) => {
                        const img = document.createElement('img');
                        img.src = src;
                        if(idx === 0) img.classList.add('active');
                        img.addEventListener('click', () => updateModalSlide(idx));
                        thumbnailsContainer.appendChild(img);
                    });

                    // Update package dropdown if applicable
                    const packageSelect = document.getElementById('package');
                    if(packageSelect) {
                        packageSelect.value = "custom"; // default to custom or map it if options match
                    }

                    // Show Modal
                    packageModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        // Close Modal
        closePackageModal.addEventListener('click', () => {
            packageModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        packageModal.addEventListener('click', (e) => {
            if (e.target === packageModal) {
                packageModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Slider Navigation
        document.querySelector('.modal-slider-container .prev-btn').addEventListener('click', () => {
            let nextIndex = currentModalSlideIndex - 1;
            if(nextIndex < 0) nextIndex = currentPackageImages.length - 1;
            updateModalSlide(nextIndex);
        });

        document.querySelector('.modal-slider-container .next-btn').addEventListener('click', () => {
            let nextIndex = currentModalSlideIndex + 1;
            if(nextIndex >= currentPackageImages.length) nextIndex = 0;
            updateModalSlide(nextIndex);
        });

        function updateModalSlide(index) {
            currentModalSlideIndex = index;
            document.getElementById('modalMainImg').src = currentPackageImages[index];
            
            const thumbnails = document.querySelectorAll('.modal-thumbnails img');
            thumbnails.forEach(t => t.classList.remove('active'));
            if(thumbnails[index]) thumbnails[index].classList.add('active');
        }
    }

    // --- 10. Booking Modal Logic ---
    const bookingModal = document.getElementById('bookingModal');
    const stickyBookBtn = document.getElementById('stickyBookBtn');
    const closeBookingModal = document.querySelector('.close-booking-modal');
    const quickBookForm = document.getElementById('quickBookForm');
    const quickBookSubmitBtn = document.getElementById('quickBookSubmitBtn');
    const bookSuccessMsg = document.getElementById('bookSuccessMsg');

    if (stickyBookBtn && bookingModal) {
        stickyBookBtn.addEventListener('click', () => {
            bookingModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        closeBookingModal.addEventListener('click', () => {
            bookingModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        bookingModal.addEventListener('click', (e) => {
            if (e.target === bookingModal) {
                bookingModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        quickBookForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent standard page reload

            // Basic Validation Check (HTML5 handles most of it due to 'required' attributes)
            const name = document.getElementById('bookName').value.trim();
            const phone = document.getElementById('bookPhone').value.trim();

            if (name === '' || phone === '') return;

            // Change button state to show loading
            const originalText = quickBookSubmitBtn.innerHTML;
            quickBookSubmitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            quickBookSubmitBtn.disabled = true;

            // Prepare form data
            const formData = new FormData(quickBookForm);

            // Send to FormSubmit
            fetch("https://formsubmit.co/ajax/WANIYAWAR91@gmail.com", {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                // Hide inputs and button, show success message
                quickBookForm.querySelectorAll('.form-group').forEach(el => el.style.display = 'none');
                quickBookSubmitBtn.style.display = 'none';
                bookSuccessMsg.style.display = 'block';

                // Automatically close modal after 3 seconds
                setTimeout(() => {
                    bookingModal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                    
                    // Reset form for next time
                    quickBookForm.reset();
                    quickBookForm.querySelectorAll('.form-group').forEach(el => el.style.display = 'block');
                    quickBookSubmitBtn.style.display = 'block';
                    quickBookSubmitBtn.innerHTML = originalText;
                    quickBookSubmitBtn.disabled = false;
                    bookSuccessMsg.style.display = 'none';
                }, 4000);
            })
            .catch(error => {
                console.error("Error:", error);
                quickBookSubmitBtn.innerHTML = "Error! Try Again.";
                setTimeout(() => {
                    quickBookSubmitBtn.innerHTML = originalText;
                    quickBookSubmitBtn.disabled = false;
                }, 3000);
            });
        });
    }
    // --- 11. Book Now Modal Logic ---
    const bookNowModal = document.getElementById('bookNowModal');
    const openBookNowModalBtn = document.getElementById('openBookNowModal');
    const closeBookNowModalBtn = document.getElementById('closeBookNowModal');
    const bookNowForm = document.getElementById('bookNowForm');
    const bnSuccessMsg = document.getElementById('bnSuccessMsg');

    if (bookNowModal && openBookNowModalBtn) {
        openBookNowModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            bookNowModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        closeBookNowModalBtn.addEventListener('click', () => {
            bookNowModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        bookNowModal.addEventListener('click', (e) => {
            if (e.target === bookNowModal) {
                bookNowModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        bookNowForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = bookNowForm.querySelector('button');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            btn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                bookNowForm.querySelectorAll('.form-group').forEach(el => el.style.display = 'none');
                btn.style.display = 'none';
                bnSuccessMsg.style.display = 'block';

                setTimeout(() => {
                    bookNowModal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                    
                    // Reset
                    bookNowForm.reset();
                    bookNowForm.querySelectorAll('.form-group').forEach(el => el.style.display = 'block');
                    btn.style.display = 'block';
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    bnSuccessMsg.style.display = 'none';
                }, 3000);
            }, 1500);
        });
    }
});
