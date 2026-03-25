document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
            const icon = mobileMenuBtn.querySelector('ion-icon');
            if (mobileMenu.classList.contains('open')) {
                icon.setAttribute('name', 'close-outline');
            } else {
                icon.setAttribute('name', 'menu-outline');
            }
        });
    }

    const toggleBtns = document.querySelectorAll('.toggle-btn');
    
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const gridId = btn.getAttribute('data-target');
            const grid = document.getElementById(gridId);
            
            if (!grid) return;
            
            const hiddenItems = grid.querySelectorAll('.service-item, .product-card');
            
            const isExpanded = btn.getAttribute('data-expanded') === 'true';
            
            if (isExpanded) {
                hiddenItems.forEach(item => {
                    if (item.classList.contains('was-hidden')) {
                        item.classList.add('hidden-item');
                        item.classList.remove('was-hidden');
                        
                        item.style.animation = 'none';
                    }
                });
                btn.textContent = gridId === 'store-grid' ? 'View Store' : 'View All';
                btn.setAttribute('data-expanded', 'false');
            } else {
                hiddenItems.forEach((item, index) => {
                    if (item.classList.contains('hidden-item')) {
                        item.classList.remove('hidden-item');
                        item.classList.add('was-hidden');
                        
                        item.style.animation = `fadeInUp 0.4s ease forwards ${index * 0.05}s`;
                        item.style.opacity = '0';
                    }
                });
                btn.textContent = 'View Less';
                btn.setAttribute('data-expanded', 'true');
            }
        });
    });

    const allButtons = document.querySelectorAll('button:not(.toggle-btn)');
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
        slideInterval = setInterval(nextSlide, 5000); 
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(slideInterval);
                updateSlider(index);
                slideInterval = setInterval(nextSlide, 5000);
            });
        });
    }
});
