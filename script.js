// Wait for the DOM to be fully loaded before executing any JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Select all necessary DOM elements
    const modals = document.querySelectorAll('.modal');
    const cards = document.querySelectorAll('.card');
    const closeButtons = document.querySelectorAll('.close');
    const ctaButton = document.querySelector('.cta-button');

    // Elements for the concierge modal
    const employmentStatus = document.getElementById('employmentStatus');
    const employedFields = document.getElementById('employedFields');
    const selfEmployedFields = document.getElementById('selfEmployedFields');
    const documentList = document.getElementById('documentList');
    const conciergeForm = document.getElementById('conciergeForm');

    // Elements for the property details modal
    const propertyCards = document.querySelectorAll('.property-card');
    const propertyDetailsModal = document.getElementById('propertyDetailsModal');
    const propertyTitle = document.getElementById('propertyTitle');
    const propertyDetails = document.getElementById('propertyDetails');
    const costTable = document.getElementById('costTable');
    const totalCost = document.getElementById('totalCost');

    // Smooth scroll functionality for the CTA button
    ctaButton.addEventListener('click', function(e) {
        e.preventDefault();
        const stagesSection = document.getElementById('stages');
        stagesSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Add hover effects to main stage cards
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

    // Concierge modal functionality
    employmentStatus.addEventListener('change', function() {
        if (this.value === 'employed') {
            employedFields.style.display = 'block';
            selfEmployedFields.style.display = 'none';
        } else if (this.value === 'selfEmployed') {
            employedFields.style.display = 'none';
            selfEmployedFields.style.display = 'block';
        } else {
            employedFields.style.display = 'none';
            selfEmployedFields.style.display = 'none';
        }
        updateRequiredDocuments();
    });

    function updateRequiredDocuments() {
        const status = employmentStatus.value;
        documentList.innerHTML = '';
        
        const commonDocuments = [
            'Government-issued photo ID',
            'Social Security number',
            'Bank statements for the last 2 months',
            'W-2 forms for the last 2 years',
            'Federal tax returns for the last 2 years'
        ];

        const employedDocuments = [
            'Pay stubs for the last 30 days',
            'Employment verification letter'
        ];

        const selfEmployedDocuments = [
            'Profit and loss statement',
            'Business license',
            'Business tax returns for the last 2 years'
        ];

        let requiredDocs = commonDocuments;

        if (status === 'employed') {
            requiredDocs = requiredDocs.concat(employedDocuments);
        } else if (status === 'selfEmployed') {
            requiredDocs = requiredDocs.concat(selfEmployedDocuments);
        }

        requiredDocs.forEach(doc => {
            const li = document.createElement('li');
            li.textContent = doc;
            documentList.appendChild(li);
        });
    }

    conciergeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const annualIncome = formData.get('annualIncome');
        const creditScore = formData.get('creditScore');
        
        if (annualIncome > 50000 && creditScore > 620) {
            showNotification("Great news! Based on the information provided, you appear to be ready for the next steps in the home buying process. Let's move forward!", 'success');
            // Here you would typically send the form data to your server
            closeModal(document.getElementById('modal1'));
            setTimeout(() => openModal('modal2'), 500);
        } else {
            showNotification("Based on the information provided, we've prepared a personalized readiness plan to help you improve your home buying position. An advisor will contact you shortly with more details.", 'info');
        }
    });

    // Initialize the document list
    updateRequiredDocuments();

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

    // Mock data for properties
    const propertyData = {
        1: {
            title: "Cozy Downtown Condo",
            price: 350000,
            bedrooms: 2,
            bathrooms: 2,
            sqft: 1000,
            yearBuilt: 2015,
            address: "123 Main St, Downtown, City",
            description: "A beautiful condo in the heart of downtown, perfect for young professionals.",
            closingCosts: 10500,
            propertyTax: 3500,
            homeInsurance: 1200
        },
        2: {
            title: "Spacious Suburban House",
            price: 450000,
            bedrooms: 4,
            bathrooms: 3,
            sqft: 2200,
            yearBuilt: 2005,
            address: "456 Oak Lane, Suburbia, City",
            description: "A family-friendly home with a large backyard in a quiet neighborhood.",
            closingCosts: 13500,
            propertyTax: 4500,
            homeInsurance: 1500
        },
        3: {
            title: "Modern City Apartment",
            price: 320000,
            bedrooms: 2,
            bathrooms: 1,
            sqft: 850,
            yearBuilt: 2020,
            address: "789 High St, Cityville, City",
            description: "A sleek, modern apartment with amazing city views and top-notch amenities.",
            closingCosts: 9600,
            propertyTax: 3200,
            homeInsurance: 1100
        }
    };

    // Add click event listeners to property cards
    propertyCards.forEach(card => {
        card.addEventListener('click', function() {
            const propertyId = this.dataset.id;
            const property = propertyData[propertyId];
            
            if (property) {
                propertyTitle.textContent = property.title;
                propertyDetails.innerHTML = `
                    <p><strong>Price:</strong> $${property.price.toLocaleString()}</p>
                    <p><strong>Bedrooms:</strong> ${property.bedrooms}</p>
                    <p><strong>Bathrooms:</strong> ${property.bathrooms}</p>
                    <p><strong>Square Feet:</strong> ${property.sqft}</p>
                    <p><strong>Year Built:</strong> ${property.yearBuilt}</p>
                    <p><strong>Address:</strong> ${property.address}</p>
                    <p>${property.description}</p>
                `;
    
                // Clear previous cost table rows
                while (costTable.rows.length > 1) {
                    costTable.deleteRow(1);
                }
    
                // Add rows to cost table
                addCostRow("Property Price", property.price);
                addCostRow("Closing Costs", property.closingCosts);
                addCostRow("Property Tax (Annual)", property.propertyTax);
                addCostRow("Home Insurance (Annual)", property.homeInsurance);
    
                const totalCostValue = property.price + property.closingCosts + property.propertyTax + property.homeInsurance;
                totalCost.textContent = `Total Cost: $${totalCostValue.toLocaleString()}`;
    
                openModal('propertyDetailsModal');
            } else {
                console.error(`Property with id ${propertyId} not found`);
                alert("Sorry, the details for this property are not available.");
            }
        });

        // Add hover effects to property cards
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Helper function to add rows to the cost table
    function addCostRow(item, cost) {
        const row = costTable.insertRow(-1);
        const itemCell = row.insertCell(0);
        const costCell = row.insertCell(1);
        itemCell.textContent = item;
        costCell.textContent = `$${cost.toLocaleString()}`;
    }

    // Closing process functionality (Stage 3)
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