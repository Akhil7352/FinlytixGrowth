// Complete scroll effect for FinlytixGrowth
document.addEventListener('DOMContentLoaded', function() {
    
    // Get all navbar elements
    const navbar = document.querySelector('.navbar');
    const logoText = document.querySelector('.nav-logo h2'); // "Finlytix"
    const logoReach = document.querySelector('.nav-logo span'); // "Growth"
    const navLinks = document.querySelectorAll('.nav-links > li > a:not(.nav-cta)');
    const ctaButton = document.querySelector('.nav-cta');
    const hamburgerIcon = document.querySelector('.hamburger i');
    
    // Function to update navbar colors based on scroll
    function updateNavbarColors() {
        if (window.scrollY > 50) {
            // WHEN SCROLLED - White navbar
            navbar.style.backgroundColor = '#ffffff';
            navbar.style.borderBottomColor = '#0066ff';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
            
            // "Finlytix" becomes BLACK
            logoText.style.color = '#000000';
            
            // "Growth" becomes RED
            if (logoReach) {
                logoReach.style.color = '#ff3333';
            }
            
            // All navigation links become BLACK
            navLinks.forEach(link => {
                link.style.color = '#000000';
            });
            
            // Hamburger icon becomes BLACK
            if (hamburgerIcon) {
                hamburgerIcon.style.color = '#000000';
            }
            
        } else {
            // AT TOP - Black navbar
            navbar.style.backgroundColor = '#000000';
            navbar.style.borderBottomColor = '#0066ff';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.3)';
            
            // "Finlytix" becomes WHITE
            logoText.style.color = '#ffffff';
            
            // "Growth" stays RED
            if (logoReach) {
                logoReach.style.color = '#ff3333';
            }
            
            // All navigation links become WHITE
            navLinks.forEach(link => {
                link.style.color = '#ffffff';
            });
            
            // Hamburger icon becomes WHITE
            if (hamburgerIcon) {
                hamburgerIcon.style.color = '#ffffff';
            }
        }
    }
    
    // CTA button hover effects (keep consistent)
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'transparent';
            this.style.color = '#0066ff';
        });
        
        ctaButton.addEventListener('mouseleave', function() {
            if (window.scrollY > 50) {
                this.style.backgroundColor = '#0066ff';
                this.style.color = '#ffffff';
            } else {
                this.style.backgroundColor = '#0066ff';
                this.style.color = '#ffffff';
            }
        });
    }
    
    // Listen for scroll events
    window.addEventListener('scroll', updateNavbarColors);
    
    // Handle mobile menu
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            
            if (mobileMenu.classList.contains('active')) {
                if (window.scrollY > 50) {
                    mobileMenu.style.backgroundColor = '#ffffff';
                    document.querySelectorAll('.nav-links.active a').forEach(link => {
                        if (!link.classList.contains('nav-cta')) {
                            link.style.color = '#000000';
                        }
                    });
                } else {
                    mobileMenu.style.backgroundColor = '#000000';
                    document.querySelectorAll('.nav-links.active a').forEach(link => {
                        if (!link.classList.contains('nav-cta')) {
                            link.style.color = '#ffffff';
                        }
                    });
                }
            }
        });
    }
    
    // Initial call
    updateNavbarColors();
});