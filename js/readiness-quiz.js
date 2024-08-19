import { openModal, closeModal } from './modal.js';
import { generateReadinessRoadmap } from './readiness-roadmap.js';
import { getEducationalContent } from './educational-content.js';

// Quiz questions
const quizQuestions = [
    {
        question: "What is your annual household income?",
        type: "number",
        id: "income",
        prefix: "$"
    },
    {
        question: "What is your current credit score?",
        type: "range",
        id: "creditScore",
        min: 300,
        max: 850
    },
    {
        question: "How much have you saved for a down payment?",
        type: "number",
        id: "savings",
        prefix: "$"
    },
    {
        question: "Are you familiar with the home buying process?",
        type: "radio",
        id: "buyingKnowledge",
        options: ["Not at all", "Somewhat", "Very familiar"]
    },
    {
        question: "How long do you plan to stay in your next home?",
        type: "radio",
        id: "stayDuration",
        options: ["1-3 years", "4-7 years", "8+ years"]
    }
];

/**
 * Initialize the readiness quiz
 */
function initializeReadinessQuiz() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', showEducationalContent);
    } else {
        showEducationalContent();
    }
}

function showEducationalContent() {
    const modalContent = document.querySelector('#modal1 .modal-content');
    modalContent.innerHTML = `
        <h2>Before We Begin</h2>
        <p>Here's some helpful information about home buying. Feel free to explore these topics:</p>
        <div id="educationalCards"></div>
        <button id="startQuiz" class="submit-button">I'm Ready to Start the Quiz</button>
    `;

    const educationalContent = getEducationalContent();
    const cardsContainer = document.getElementById('educationalCards');

    for (const [key, value] of Object.entries(educationalContent)) {
        const card = document.createElement('div');
        card.className = 'education-card';
        card.id = `${key}Card`;
        card.innerHTML = `
            <h3>${value.title}</h3>
            <p>${value.summary}</p>
        `;
        card.addEventListener('click', () => showDetailedContent(key, value));
        cardsContainer.appendChild(card);
    }

    document.getElementById('startQuiz').addEventListener('click', createQuiz);
}

function showDetailedContent(key, content) {
    const detailedContent = document.createElement('div');
    detailedContent.className = 'detailed-content';
    detailedContent.innerHTML = `
        <h3>${content.title}</h3>
        ${content.content}
        <button class="back-button">Back to Topics</button>
    `;

    const modalContent = document.querySelector('#modal1 .modal-content');
    modalContent.appendChild(detailedContent);

    detailedContent.querySelector('.back-button').addEventListener('click', () => {
        detailedContent.remove();
        const card = document.getElementById(`${key}Card`);
        if (card) {
            card.classList.add('viewed');
        }
    });
}

/**
 * Create the quiz structure in the DOM
 */
function createQuiz() {
    const modalContent = document.querySelector('#modal1 .modal-content');
    modalContent.innerHTML = `
        <h2>Stage 1: Buyer Readiness</h2>
        <form id="readinessQuiz"></form>
    `;

    const quizContainer = document.getElementById('readinessQuiz');

    quizQuestions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'form-group';
        questionDiv.innerHTML = `
            <label for="${q.id}">${q.question}</label>
            ${createInputElement(q, index)}
        `;
        quizContainer.appendChild(questionDiv);
    });

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.className = 'submit-button';
    submitButton.textContent = 'Submit';
    quizContainer.appendChild(submitButton);

    quizContainer.addEventListener('submit', handleQuizSubmission);

    // Add event listener for credit score range input
    const creditScoreInput = document.getElementById('creditScore');
    if (creditScoreInput) {
        const creditScoreOutput = creditScoreInput.nextElementSibling;
        creditScoreInput.addEventListener('input', function() {
            creditScoreOutput.value = this.value;
        });
    }
}

/**
 * Create an input element based on the question type
 * @param {Object} question - The question object
 * @param {number} index - The index of the question
 * @returns {string} HTML string for the input element
 */
function createInputElement(question, index) {
    switch(question.type) {
        case 'number':
            return `
                <div class="input-with-prefix">
                    <span class="prefix">${question.prefix || ''}</span>
                    <input type="number" id="${question.id}" name="${question.id}" required min="0">
                </div>
            `;
        case 'range':
            return `
                <div class="range-with-value">
                    <input type="range" id="${question.id}" name="${question.id}" 
                           min="${question.min}" max="${question.max}" value="${(question.min + question.max) / 2}" required>
                    <output for="${question.id}">${(question.min + question.max) / 2}</output>
                </div>
            `;
        case 'radio':
            return `
                <div class="radio-group">
                    ${question.options.map(option => `
                        <label>
                            <input type="radio" name="${question.id}" value="${option}" required>
                            ${option}
                        </label>
                    `).join('')}
                </div>
            `;
        default:
            return '';
    }
}

/**
 * Handle the quiz submission
 * @param {Event} e - The submit event
 */
function handleQuizSubmission(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const quizResults = {
        income: parseInt(formData.get('income')),
        creditScore: parseInt(formData.get('creditScore')),
        savings: parseInt(formData.get('savings')),
        buyingKnowledge: formData.get('buyingKnowledge'),
        stayDuration: formData.get('stayDuration')
    };
    
    const roadmap = generateReadinessRoadmap(quizResults);
    displayRoadmap(roadmap);
    
    closeModal(document.getElementById('modal1'));
    setTimeout(() => openModal('modal2'), 500);
}

/**
 * Display the generated roadmap
 * @param {Object} roadmap - The generated roadmap object
 */
function displayRoadmap(roadmap) {
    // Implementation for displaying the roadmap
    console.log('Roadmap:', roadmap);
    // This function would update the DOM to show the roadmap to the user
}

export { initializeReadinessQuiz };