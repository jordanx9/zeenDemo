import { initializeModalListeners } from './modal.js';
import { initializeReadinessQuiz } from './readiness-quiz.js';
import { initializeProgressTracker } from './progress-tracker.js';
import { loadEducationalContent } from './educational-content.js';

function initializeApp() {
    initializeModalListeners();
    initializeSmoothScroll();
    initializeCardHoverEffects();
    initializeReadinessQuiz();
    initializeProgressTracker();
    loadEducationalContent();
    initializeResponsiveDesign();
}

// Ensure all initializations happen after DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

function initializeSmoothScroll() {
    const ctaButton = document.querySelector('.cta-button');
    ctaButton.addEventListener('click', function(e) {
        e.preventDefault();
        const stagesSection = document.getElementById('stages');
        stagesSection.scrollIntoView({ behavior: 'smooth' });
    });
}

function initializeCardHoverEffects() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });
    });
}

function initializeResponsiveDesign() {
    const handleResize = debounce(function() {
        console.log('Window resized');
        // Add any necessary responsive adjustments here
    });

    window.addEventListener('resize', handleResize);
}

function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}