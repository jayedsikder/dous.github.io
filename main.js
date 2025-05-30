'use strict';

document.addEventListener('DOMContentLoaded', function() {
    // Scroll-Reveal Animations using IntersectionObserver
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    if (revealElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Optional: Unobserve after revealing to save resources if animation is one-time
                    // observer.unobserve(entry.target); 
                } else {
                    // Optional: Remove 'is-visible' if elements should re-animate when scrolled out and back in
                    // entry.target.classList.remove('is-visible');
                }
            });
        }, { threshold: 0.1 }); // Trigger when 10% of the element is visible

        revealElements.forEach(element => {
            observer.observe(element);
        });
    }
});
