
// Dropdown menu with blur overlay
const dropdownItems = document.querySelectorAll('.nav-item.has-dropdown');
const dropdownOverlay = document.querySelector('.dropdown-overlay');
const body = document.body;

dropdownItems.forEach(item => {
    const dropdown = item.querySelector('.dropdown-menu');

    item.addEventListener('mouseenter', function() {
        // Show overlay with blur
        dropdownOverlay.style.opacity = '1';
        dropdownOverlay.style.visibility = 'visible';

        // Prevent scrolling when dropdown is open (optional)
        // body.style.overflow = 'hidden';
    });

    item.addEventListener('mouseleave', function() {
        // Check if mouse is not over the dropdown menu
        setTimeout(() => {
            if (!item.matches(':hover') && !dropdown.matches(':hover')) {
                dropdownOverlay.style.opacity = '0';
                dropdownOverlay.style.visibility = 'hidden';
                // body.style.overflow = 'auto';
            }
        }, 50);
    });

    if (dropdown) {
        dropdown.addEventListener('mouseleave', function() {
            setTimeout(() => {
                if (!item.matches(':hover')) {
                    dropdownOverlay.style.opacity = '0';
                    dropdownOverlay.style.visibility = 'hidden';
                    // body.style.overflow = 'auto';
                }
            }, 50);
        });
    }
});

// Close dropdown when clicking on overlay
dropdownOverlay.addEventListener('click', function() {
    this.style.opacity = '0';
    this.style.visibility = 'hidden';
    // body.style.overflow = 'auto';
});

// Carousel functionality
class Carousel {
    constructor(carouselId) {
        this.carousel = document.getElementById(carouselId);
        this.items = this.carousel.querySelectorAll('.product-card');
        this.currentIndex = 0;
        this.itemWidth = this.items[0].offsetWidth + 40; // item width + gap

        this.init();
    }

    init() {
        const prevBtn = document.querySelector(`[data-carousel="${this.carousel.id.replace('-carousel', '')}"].prev`);
        const nextBtn = document.querySelector(`[data-carousel="${this.carousel.id.replace('-carousel', '')}"].next`);

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prev());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.next());
        }

        // Update button states
        this.updateButtons();
    }

    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.scroll();
        }
    }

    next() {
        const visibleItems = window.innerWidth >= 1068 ? 3 : window.innerWidth >= 768 ? 2 : 1;
        if (this.currentIndex < this.items.length - visibleItems) {
            this.currentIndex++;
            this.scroll();
        }
    }

    scroll() {
        const scrollAmount = this.currentIndex * this.itemWidth;
        this.carousel.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
        this.updateButtons();
    }

    updateButtons() {
        const prevBtn = document.querySelector(`[data-carousel="${this.carousel.id.replace('-carousel', '')}"].prev`);
        const nextBtn = document.querySelector(`[data-carousel="${this.carousel.id.replace('-carousel', '')}"].next`);
        const visibleItems = window.innerWidth >= 1068 ? 3 : window.innerWidth >= 768 ? 2 : 1;

        if (prevBtn) {
            prevBtn.style.opacity = this.currentIndex === 0 ? '0.3' : '1';
            prevBtn.style.cursor = this.currentIndex === 0 ? 'default' : 'pointer';
        }

        if (nextBtn) {
            const maxIndex = Math.max(0, this.items.length - visibleItems);
            nextBtn.style.opacity = this.currentIndex >= maxIndex ? '0.3' : '1';
            nextBtn.style.cursor = this.currentIndex >= maxIndex ? 'default' : 'pointer';
        }
    }
}

// Initialize carousels
const ipadCarousel = new Carousel('ipad-carousel');
const iphoneCarousel = new Carousel('iphone-carousel');

// Category icons interaction
const categoryIcons = document.querySelectorAll('.category-icon');
categoryIcons.forEach(icon => {
    icon.addEventListener('click', function() {
        categoryIcons.forEach(i => i.classList.remove('active'));
        this.classList.add('active');
    });
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add scroll effect to navigation
let lastScrollTop = 0;
const nav = document.querySelector('.nav-global');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
        nav.style.transform = 'translateY(-44px)';
    } else {
        nav.style.transform = 'translateY(0)';
    }

    lastScrollTop = scrollTop;
});

// Add transition to nav
nav.style.transition = 'transform 0.3s ease';

// Handle window resize for carousel
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        ipadCarousel.itemWidth = ipadCarousel.items[0].offsetWidth + 40;
        iphoneCarousel.itemWidth = iphoneCarousel.items[0].offsetWidth + 40;
        ipadCarousel.currentIndex = 0;
        iphoneCarousel.currentIndex = 0;
        ipadCarousel.scroll();
        iphoneCarousel.scroll();
    }, 250);
});

// Product card hover effect
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
        this.style.transition = 'transform 0.3s ease';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Seller card hover effect
const sellerCards = document.querySelectorAll('.seller-card');
sellerCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
        this.style.transition = 'transform 0.3s ease';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Add fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections
const sections = document.querySelectorAll('.products-section, .sellers-section, .location-section');
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});
