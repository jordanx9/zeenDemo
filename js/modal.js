// Function to initialize all modal-related event listeners
export function initializeModalListeners() {
    // Select all cards that trigger modals
    const cards = document.querySelectorAll('.card');
    // Select all close buttons within modals
    const closeButtons = document.querySelectorAll('.modal .close');

    // Add click event listeners to each card
    cards.forEach((card, index) => {
        card.addEventListener('click', () => openModal(`modal${index + 1}`));
    });

    // Add click event listeners to each close button
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Find the parent modal of this close button
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });

    // Add a global click event listener to close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target);
        }
    });
}

// Function to open a specific modal
export function openModal(modalId) {
    // Find the modal element by its ID
    const modal = document.getElementById(modalId);
    // Make the modal visible
    modal.style.display = 'block';
    // Prevent scrolling on the body while modal is open
    document.body.style.overflow = 'hidden';
}

// Function to close a given modal
export function closeModal(modal) {
    // Hide the modal
    modal.style.display = 'none';
    // Re-enable scrolling on the body
    document.body.style.overflow = '';
}

// Function to show the next modal in a sequence
export function showNextModal(currentModalId, nextModalId) {
    // Close the current modal
    const currentModal = document.getElementById(currentModalId);
    closeModal(currentModal);
    
    // Open the next modal after a short delay
    setTimeout(() => {
        openModal(nextModalId);
    }, 300); // 300ms delay to allow for closing animation
}

// Function to update modal content dynamically
export function updateModalContent(modalId, content) {
    const modal = document.getElementById(modalId);
    if (modal) {
        const contentContainer = modal.querySelector('.modal-content');
        if (contentContainer) {
            contentContainer.innerHTML = content;
        } else {
            console.error(`Content container not found in modal ${modalId}`);
        }
    } else {
        console.error(`Modal with id ${modalId} not found`);
    }
}

// Function to check if a modal is currently open
export function isModalOpen(modalId) {
    const modal = document.getElementById(modalId);
    return modal && modal.style.display === 'block';
}

// Function to add a new button to a modal
export function addModalButton(modalId, buttonText, onClick) {
    const modal = document.getElementById(modalId);
    if (modal) {
        const button = document.createElement('button');
        button.textContent = buttonText;
        button.addEventListener('click', onClick);
        modal.querySelector('.modal-content').appendChild(button);
    } else {
        console.error(`Modal with id ${modalId} not found`);
    }
}

// Initialize modal listeners when the script is imported
initializeModalListeners();