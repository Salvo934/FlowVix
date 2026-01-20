// Navigation scroll effect
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navProgress = document.getElementById('navProgress');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update scroll progress bar
    if (navProgress) {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        navProgress.style.width = scrolled + '%';
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link on scroll
const sections = document.querySelectorAll('.section, .hero');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
    
    // Handle home section
    if (window.scrollY < 100) {
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector('a[href="#home"]').classList.add('active');
    }
});

// Animated counter for stats
const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 20);
};

// Intersection Observer for stats animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target;
            const target = parseInt(statNumber.getAttribute('data-target'));
            animateCounter(statNumber, target);
            statsObserver.unobserve(statNumber);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => {
    statsObserver.observe(stat);
});

// Form submissions
const newSiteForm = document.getElementById('newSiteForm');
const consultingForm = document.getElementById('consultingForm');

// New Site Form
newSiteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = {
        name: document.getElementById('new-name').value,
        email: document.getElementById('new-email').value,
        subject: document.getElementById('new-subject').value,
        message: document.getElementById('new-message').value
    };
    
    // Here you would typically send the data to a server
    console.log('New Site Form submitted:', formData);
    
    // Show success message
    alert('Grazie per la tua richiesta! Ti contatteremo presto per discutere del tuo progetto.');
    
    // Reset form
    newSiteForm.reset();
});

// Consulting Form (for existing sites)
consultingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = {
        name: document.getElementById('consult-name').value,
        email: document.getElementById('consult-email').value,
        website: document.getElementById('consult-website').value,
        message: document.getElementById('consult-message').value
    };
    
    // Here you would typically send the data to a server
    console.log('Consulting Form submitted:', formData);
    
    // Show success message
    alert('Grazie! Analizzeremo il tuo sito e ti invieremo un\'analisi gratuita e dettagliata via email entro 48 ore.');
    
    // Reset form
    consultingForm.reset();
});

// Portfolio cards animation
const portfolioCards = document.querySelectorAll('.portfolio-card');

portfolioCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, index * 100);
});

// Animate footer links on scroll
const footerLinks = document.querySelectorAll('.footer-column ul li a');
const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            footerLinks.forEach((link, index) => {
                setTimeout(() => {
                    link.style.opacity = '1';
                    link.style.transform = 'translateY(0)';
                }, index * 30);
            });
            footerObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

const footer = document.querySelector('.footer');
if (footer) {
    footerLinks.forEach(link => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(10px)';
        link.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    });
    footerObserver.observe(footer);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroVisual && scrolled < window.innerHeight) {
        heroVisual.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroVisual.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// Add fade-in animation on scroll for sections
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(40px)';
    section.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    sectionObserver.observe(section);
});

// Smooth reveal animation for service cards
const serviceCards = document.querySelectorAll('.service-card');
const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }, index * 80);
            serviceObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });

serviceCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px) scale(0.95)';
    card.style.transition = 'opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    serviceObserver.observe(card);
});

// Animate value items in about section
const valueItems = document.querySelectorAll('.value-item');
const valueObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            valueObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

valueItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    valueObserver.observe(item);
});

// Animate about cards
const aboutCards = document.querySelectorAll('.about-card');
const aboutCardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 150);
            aboutCardObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

aboutCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    aboutCardObserver.observe(card);
});

// Enhanced button click effect
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Smooth scroll enhancement
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// WhatsApp Popup
const whatsappFloat = document.getElementById('whatsappFloat');
const whatsappPopup = document.getElementById('whatsappPopup');
const whatsappClose = document.getElementById('whatsappClose');

if (whatsappFloat && whatsappPopup && whatsappClose) {
    whatsappFloat.addEventListener('click', () => {
        whatsappPopup.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    whatsappClose.addEventListener('click', () => {
        whatsappPopup.classList.remove('active');
        document.body.style.overflow = '';
    });

    whatsappPopup.addEventListener('click', (e) => {
        if (e.target === whatsappPopup) {
            whatsappPopup.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && whatsappPopup.classList.contains('active')) {
            whatsappPopup.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}
