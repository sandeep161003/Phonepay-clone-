document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
            // Change icon
            const icon = mobileMenuBtn.querySelector('ion-icon');
            if (mobileMenu.classList.contains('open')) {
                icon.setAttribute('name', 'close-outline');
            } else {
                icon.setAttribute('name', 'menu-outline');
            }
        });
    }

    // 2. View All Functionality (Expand/Collapse Grids)
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const gridId = btn.getAttribute('data-target');
            const grid = document.getElementById(gridId);
            
            if (!grid) return;
            
            // Find all hidden items inside the target grid
            const hiddenItems = grid.querySelectorAll('.service-item, .product-card');
            
            // We use a custom attribute 'data-expanded' on the btn to track state
            const isExpanded = btn.getAttribute('data-expanded') === 'true';
            
            if (isExpanded) {
                // Collapse
                hiddenItems.forEach(item => {
                    if (item.classList.contains('was-hidden')) {
                        item.classList.add('hidden-item');
                        item.classList.remove('was-hidden');
                        
                        // Retrigger animation
                        item.style.animation = 'none';
                    }
                });
                btn.textContent = gridId === 'store-grid' ? 'View Store' : 'View All';
                btn.setAttribute('data-expanded', 'false');
            } else {
                // Expand
                hiddenItems.forEach((item, index) => {
                    if (item.classList.contains('hidden-item')) {
                        item.classList.remove('hidden-item');
                        item.classList.add('was-hidden'); // Keep track so we can re-hide
                        
                        // Add nice subtle entrance animation dynamically
                        item.style.animation = `fadeInUp 0.4s ease forwards ${index * 0.05}s`;
                        item.style.opacity = '0';
                    }
                });
                btn.textContent = 'View Less';
                btn.setAttribute('data-expanded', 'true');
            }
        });
    });

    // 3. Subtle animated button clicks
    const allButtons = document.querySelectorAll('button:not(.toggle-btn)'); // Excluding toggle btn for better smooth height toggle
    allButtons.forEach(btn => {
        btn.addEventListener('mousedown', function(e) {
            this.style.transform = 'scale(0.95)';
        });
        btn.addEventListener('mouseup', function(e) {
            this.style.transform = '';
        });
        btn.addEventListener('mouseleave', function(e) {
            this.style.transform = '';
        });
    });

    // 4. Hero Slider Logic
    const sliderTrack = document.getElementById('sliderTrack');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const totalSlides = document.querySelectorAll('.slider-track .slide').length;
    let currentSlide = 0;
    let slideInterval;

    const updateSlider = (index) => {
        currentSlide = index;
        if(sliderTrack) {
            sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
        dots.forEach(d => d.classList.remove('active'));
        if(dots[currentSlide]) dots[currentSlide].classList.add('active');
    };

    const nextSlide = () => {
        updateSlider((currentSlide + 1) % totalSlides);
    };

    if (totalSlides > 1) {
        // Automatically transition images every 5 seconds
        slideInterval = setInterval(nextSlide, 5000); 
        
        // Allow dot clicks to jump to corresponding slide
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(slideInterval); // reset timer upon manual click
                updateSlider(index);
                slideInterval = setInterval(nextSlide, 5000);
            });
        });
    }
});
