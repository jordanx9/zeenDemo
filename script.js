// Wait for the DOM to be fully loaded before executing any JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Select all necessary DOM elements
    const modals = document.querySelectorAll('.modal');
    const cards = document.querySelectorAll('.card');
    const closeButtons = document.querySelectorAll('.close');
    const ctaButton = document.querySelector('.cta-button');

    // Smooth scroll functionality for the CTA button
    ctaButton.addEventListener('click', function(e) {
        e.preventDefault();
        const stagesSection = document.getElementById('stages');
        stagesSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Add hover effects to cards
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

    // Modal functionality
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }

    function closeModal(modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }

    // Add click event listeners to cards to open corresponding modals
    cards.forEach((card, index) => {
        card.addEventListener('click', () => openModal(`modal${index + 1}`));
    });

    // Add click event listeners to close buttons to close modals
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        modals.forEach(modal => {
            if (event.target == modal) {
                closeModal(modal);
            }
        });
    });

    // Form submission handler for the concierge form (Stage 1)
    document.getElementById('conciergeForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const income = document.getElementById('income').value;
        const creditScore = document.getElementById('creditScore').value;
        
        if (income > 50000 && creditScore > 700) {
            showNotification("Congratulations! You've been pre-approved. Let's move to the property search stage.", 'success');
            closeModal(document.getElementById('modal1'));
            setTimeout(() => openModal('modal2'), 500);
        } else {
            showNotification("Based on the information provided, we've prepared a personalized readiness plan for you. An advisor will contact you shortly.", 'info');
        }
    });

    // Form submission handler for the property search form (Stage 2)
    // document.getElementById('searchForm').addEventListener('submit', function(e) {
    //     e.preventDefault();
    //     showNotification("Searching for properties... In a real application, this would display matching properties.", 'info');
    // });

    // Click event handler for the complete purchase button (Stage 3)
    document.getElementById('completePurchase').addEventListener('click', function() {
        const checkboxes = document.querySelectorAll('#closeSteps input[type="checkbox"]');
        const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);

        if (allChecked) {
            showNotification("Congratulations! You've completed all the necessary steps. Your home purchase is now complete!", 'success');
        } else {
            showNotification("Please complete all the required steps before finalizing your purchase.", 'warning');
        }
    });

    // Notification system
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }

    // Extension Dashboard Functionality (Stage 2)
    const viewPropertyBtn = document.querySelector('.view-property');
    const editPreferencesBtn = document.querySelector('.edit-preferences');

    // Simulating viewing a property from the alert
    viewPropertyBtn.addEventListener('click', function() {
        alert('This would open the property details on the original listing site.');
    });

    // Simulating editing preferences
    editPreferencesBtn.addEventListener('click', function() {
        const newPreferences = prompt('Enter new preferences (e.g., "Price: $300,000 - $600,000, Bedrooms: 2+"):');
        if (newPreferences) {
            alert('Preferences updated: ' + newPreferences);
            // In a real application, this would update the displayed preferences
        }
    });

    // Simulate new property alerts
    setInterval(function() {
        const alertBox = document.querySelector('.alert-box');
        alertBox.style.display = 'none';
        setTimeout(function() {
            alertBox.style.display = 'block';
            alertBox.style.animation = 'fadeIn 0.5s';
        }, 2000);
    }, 10000);

    // Add hover effects to property cards in the extension dashboard
    const propertyCards = document.querySelectorAll('.property-card');
    propertyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });

        // Simulating clicking on a property card
        card.addEventListener('click', function() {
            const propertyName = this.querySelector('h4').textContent;
            alert(`You clicked on ${propertyName}. In a real application, this would show more details or open the listing.`);
        });
    });

    // Accessibility: Add keyboard navigation for modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('show')) {
                    closeModal(modal);
                }
            });
        }
    });

    // Performance optimization: Debounce function for resize events
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

    // Responsive design: Adjust layout on window resize
    const handleResize = debounce(function() {
        // Add any necessary responsive adjustments here
        console.log('Window resized');
    });

    window.addEventListener('resize', handleResize);

    // Initialize any necessary startup functions
    function init() {
        console.log('Application initialized');
        // Add any other initialization code here
    }

    init();
});