// Modal functionality

// Store references to all modal elements
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.close');

/**
 * Initialize event listeners for modal functionality
 */
function initializeModalListeners() {
    // Add click event listeners to open modals
    document.querySelectorAll('.card').forEach((card, index) => {
        card.addEventListener('click', () => openModal(`modal${index + 1}`));
    });

    // Add click event listeners to close modals
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

    // Add keyboard accessibility for closing modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('show')) {
                    closeModal(modal);
                }
            });
        }
    });
}

/**
 * Open a specific modal
 * @param {string} modalId - The ID of the modal to open
 */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

/**
 * Close a specific modal
 * @param {HTMLElement} modal - The modal element to close
 */
function closeModal(modal) {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}



// Export functions for use in other files
export { initializeModalListeners, openModal, closeModal };