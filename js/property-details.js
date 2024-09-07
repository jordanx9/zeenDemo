// Function to initialize property details functionality
export function initializePropertyDetails() {
    // Add click event listeners to property cards
    const propertyCards = document.querySelectorAll('.property-card');
    propertyCards.forEach(card => {
        card.addEventListener('click', function(event) {
            // Prevent the event from bubbling up to parent elements
            event.preventDefault();
            event.stopPropagation();
            const propertyId = this.dataset.id;
            showPropertyDetails(propertyId);
        });
    });

    // Add close button functionality for the property details modal
    const closeButton = document.querySelector('#propertyDetailsModal .close');
    if (closeButton) {
        closeButton.addEventListener('click', closePropertyModal);
    }

    // Close the modal if clicking outside of it
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('propertyDetailsModal');
        if (event.target === modal) {
            closePropertyModal();
        }
    });
}

// Function to display property details
function showPropertyDetails(propertyId) {
    // Mock data for properties (in a real application, this would come from a server)
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

    const property = propertyData[propertyId];
    
    if (property) {
        const modal = document.getElementById('propertyDetailsModal');
        const title = document.getElementById('propertyTitle');
        const details = document.getElementById('propertyDetails');
        const costTable = document.getElementById('costTable');

        // Set the property title
        title.textContent = property.title;

        // Populate property details
        details.innerHTML = `
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
        addCostRow(costTable, "Property Price", property.price);
        addCostRow(costTable, "Closing Costs", property.closingCosts);
        addCostRow(costTable, "Property Tax (Annual)", property.propertyTax);
        addCostRow(costTable, "Home Insurance (Annual)", property.homeInsurance);

        // Calculate and display total cost
        const totalCost = property.price + property.closingCosts + property.propertyTax + property.homeInsurance;
        const totalCostElement = document.getElementById('totalCost');
        if (totalCostElement) {
            totalCostElement.textContent = `Total Cost: $${totalCost.toLocaleString()}`;
        }

        // Show the modal
        modal.style.display = 'block';
    } else {
        console.error(`Property with id ${propertyId} not found`);
    }
}

// Function to close the property details modal
function closePropertyModal() {
    const modal = document.getElementById('propertyDetailsModal');
    modal.style.display = 'none';
}

// Function to add a row to the cost table
function addCostRow(table, item, cost) {
    const row = table.insertRow(-1);
    const itemCell = row.insertCell(0);
    const costCell = row.insertCell(1);
    itemCell.textContent = item;
    costCell.textContent = `$${cost.toLocaleString()}`;
}