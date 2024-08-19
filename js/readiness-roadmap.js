import { getEducationalContent } from './educational-content.js';

/**
 * Generate a personalized readiness roadmap based on quiz results
 * @param {Object} quizResults - The results from the readiness quiz
 * @returns {Object} A personalized roadmap object
 */
function generateReadinessRoadmap(quizResults) {
    let roadmap = {
        financialSteps: [],
        educationalSteps: [],
        timeline: ''
    };

    // Analyze income
    if (quizResults.income < 50000) {
        roadmap.financialSteps.push("Work on increasing your income through career advancement or additional sources of income.");
        roadmap.educationalSteps.push(getEducationalContent('mortgagePreApproval'));
    }

    // Analyze credit score
    if (quizResults.creditScore < 620) {
        roadmap.financialSteps.push("Focus on improving your credit score. Pay all bills on time and reduce credit card balances.");
        roadmap.educationalSteps.push(getEducationalContent('creditScore'));
    }

    // Analyze savings
    if (quizResults.savings < quizResults.income * 0.2) {
        roadmap.financialSteps.push("Increase your savings for a down payment. Aim for 20% of your target home price.");
        roadmap.educationalSteps.push(getEducationalContent('downPayment'));
    }

    // Analyze buying knowledge
    if (quizResults.buyingKnowledge === "Not at all") {
        roadmap.educationalSteps.push("Attend first-time homebuyer workshops or courses to understand the buying process.");
        roadmap.educationalSteps.push(getEducationalContent('closingCosts'));
    }

    // Set timeline
    roadmap.timeline = determineTimeline(roadmap.financialSteps.length, quizResults.creditScore);

    return roadmap;
}

/**
 * Determine the timeline for buyer readiness
 * @param {number} stepsCount - The number of financial steps needed
 * @param {number} creditScore - The user's credit score
 * @returns {string} The estimated timeline
 */
function determineTimeline(stepsCount, creditScore) {
    if (stepsCount > 2 || creditScore < 580) {
        return "Long-term (1-2 years)";
    } else if (stepsCount > 0 || creditScore < 620) {
        return "Medium-term (6-12 months)";
    } else {
        return "Short-term (1-6 months)";
    }
}

/**
 * Display the generated roadmap to the user
 * @param {Object} roadmap - The generated readiness roadmap
 */
function displayRoadmap(roadmap) {
    const roadmapContainer = document.getElementById('personalizedRoadmap');
    if (!roadmapContainer) return;

    let roadmapHTML = `
        <h2>Your Personalized Readiness Roadmap</h2>
        <p><strong>Estimated Timeline:</strong> ${roadmap.timeline}</p>
        <h3>Financial Steps:</h3>
        <ul>
            ${roadmap.financialSteps.map(step => `<li>${step}</li>`).join('')}
        </ul>
        <h3>Educational Steps:</h3>
        <ul>
            ${roadmap.educationalSteps.map(step => `
                <li>
                    <h4>${step.title}</h4>
                    <p>${step.content}</p>
                </li>
            `).join('')}
        </ul>
    `;

    roadmapContainer.innerHTML = roadmapHTML;
}

export { generateReadinessRoadmap, displayRoadmap };