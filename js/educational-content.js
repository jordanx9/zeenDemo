/**
 * Educational content for buyer readiness
 */
const educationalContent = {
    creditScore: {
        title: "Understanding Credit Scores",
        content: `Your credit score is a crucial factor in getting approved for a mortgage and determining your interest rate. It's a number between 300 and 850, with higher scores indicating better creditworthiness.
        - Excellent: 750+
        - Good: 700-749
        - Fair: 650-699
        - Poor: Below 650`
    },
    mortgagePreApproval: {
        title: "Mortgage Pre-approval Basics",
        content: `Getting pre-approved for a mortgage gives you a clear idea of how much home you can afford and shows sellers you're a serious buyer. To get pre-approved, you'll typically need:
        - Proof of income (W-2 statements, recent pay stubs)
        - Proof of assets (bank statements, investment account statements)
        - Good credit score (typically 620 or higher)
        - Employment verification
        - Other documentation (driver's license, Social Security number)`
    },
    downPayment: {
        title: "Importance of Down Payments",
        content: `A down payment is the upfront amount you pay when purchasing a home. The typical down payment is 20% of the home's purchase price, but there are options for lower down payments:
        - 20% down: Avoids private mortgage insurance (PMI)
        - 3-19% down: Conventional loans with PMI
        - 3.5% down: FHA loans
        - 0% down: VA loans (for eligible veterans) or USDA loans (for eligible rural properties)`
    },
    closingCosts: {
        title: "Overview of Closing Costs",
        content: `Closing costs are fees associated with finalizing your mortgage, typically ranging from 2% to 5% of the loan amount. These may include:
        - Appraisal fees
        - Title insurance
        - Attorney fees
        - Origination fees
        - Property taxes
        - Homeowners insurance`
    }
};

/**
 * Load educational content into the DOM
 */
function loadEducationalContent() {
    const contentContainer = document.getElementById('educationalContent');
    if (!contentContainer) return;

    for (const [key, value] of Object.entries(educationalContent)) {
        const section = document.createElement('div');
        section.className = 'education-item';
        section.innerHTML = `
            <h3>${value.title}</h3>
            <p>${value.content}</p>
        `;
        contentContainer.appendChild(section);
    }
}

/**
 * Get specific educational content
 * @param {string} topic - The topic to retrieve content for
 * @returns {Object|null} The educational content object or null if not found
 */
function getEducationalContent() {
    return educationalContent;
}

export { loadEducationalContent, getEducationalContent };