// Define the educational content for different topics
const educationalContent = {
    employed: {
        title: "Information for Employed Individuals",
        summary: "Learn about mortgage considerations for employed individuals",
        content: `
            <p>As an employed individual, here are some key points to consider:</p>
            <ul>
                <li>Stable income is viewed favorably by lenders</li>
                <li>You'll need to provide recent pay stubs and W-2 forms</li>
                <li>Length of employment at your current job may be a factor</li>
                <li>Lenders typically like to see at least two years of consistent employment</li>
            </ul>
        `
    },
    selfEmployed: {
        title: "Information for Self-Employed Individuals",
        summary: "Understand mortgage requirements for self-employed applicants",
        content: `
            <p>Self-employed individuals have some unique considerations:</p>
            <ul>
                <li>You may need to provide 2-3 years of tax returns</li>
                <li>Lenders will look at your average income over these years</li>
                <li>A stable or increasing income is viewed positively</li>
                <li>You might need to explain any significant fluctuations in income</li>
                <li>Additional documentation like profit and loss statements may be required</li>
            </ul>
        `
    },
    creditScore: {
        title: "Understanding Credit Scores",
        summary: "Learn how credit scores affect your mortgage application",
        content: `
            <p>Your credit score is a crucial factor in getting approved for a mortgage and determining your interest rate.</p>
            <ul>
                <li>Scores range from 300 to 850</li>
                <li>Higher scores indicate better creditworthiness</li>
                <li>Most lenders require a minimum score of 620 for conventional loans</li>
                <li>FHA loans may accept lower scores, sometimes as low as 580</li>
            </ul>
            <p>Credit score ranges:</p>
            <ul>
                <li><strong>Excellent:</strong> 750+</li>
                <li><strong>Good:</strong> 700-749</li>
                <li><strong>Fair:</strong> 650-699</li>
                <li><strong>Poor:</strong> Below 650</li>
            </ul>
        `
    },
    mortgagePreApproval: {
        title: "Mortgage Pre-approval Basics",
        summary: "Discover what you need for mortgage pre-approval",
        content: `
            <p>Getting pre-approved for a mortgage gives you a clear idea of how much home you can afford and shows sellers you're a serious buyer.</p>
            <p>To get pre-approved, you'll typically need:</p>
            <ul>
                <li><strong>Proof of income:</strong> W-2 statements, recent pay stubs</li>
                <li><strong>Proof of assets:</strong> Bank statements, investment account statements</li>
                <li><strong>Good credit score:</strong> Typically 620 or higher</li>
                <li><strong>Employment verification</strong></li>
                <li><strong>Other documentation:</strong> Driver's license, Social Security number</li>
            </ul>
        `
    },
    downPayment: {
        title: "Importance of Down Payments",
        summary: "Understand how down payments affect your home purchase",
        content: `
            <p>A down payment is the upfront amount you pay when purchasing a home. The typical down payment is 20% of the home's purchase price, but there are options for lower down payments:</p>
            <ul>
                <li><strong>20% down:</strong> Avoids private mortgage insurance (PMI)</li>
                <li><strong>3-19% down:</strong> Conventional loans with PMI</li>
                <li><strong>3.5% down:</strong> FHA loans</li>
                <li><strong>0% down:</strong> VA loans (for eligible veterans) or USDA loans (for eligible rural properties)</li>
            </ul>
            <p>Remember: Lower down payments often mean higher monthly mortgage payments and potentially higher interest rates.</p>
        `
    },
    closingCosts: {
        title: "Overview of Closing Costs",
        summary: "Learn about the additional costs when finalizing your mortgage",
        content: `
            <p>Closing costs are fees associated with finalizing your mortgage, typically ranging from 2% to 5% of the loan amount.</p>
            <p>Common closing costs include:</p>
            <ul>
                <li><strong>Appraisal fees:</strong> To determine the home's value</li>
                <li><strong>Title insurance:</strong> Protects against issues with the property's title</li>
                <li><strong>Attorney fees:</strong> For legal representation during closing</li>
                <li><strong>Origination fees:</strong> Charged by the lender for processing the loan</li>
                <li><strong>Property taxes:</strong> Often prepaid for a certain period</li>
                <li><strong>Homeowners insurance:</strong> Usually required by the lender</li>
            </ul>
            <p>Be sure to review your Loan Estimate and Closing Disclosure carefully to understand all costs involved.</p>
        `
    }
};

// Function to get relevant educational content based on employment status
export function getEducationalContent(employmentStatus) {
    let content = [];
    
    // Add employment-specific content
    if (employmentStatus === "Employed" || employmentStatus === "Both employed and self-employed") {
        content.push(educationalContent.employed);
    }
    if (employmentStatus === "Self-employed" || employmentStatus === "Both employed and self-employed") {
        content.push(educationalContent.selfEmployed);
    }
    
    // Add general content for all employment statuses
    content.push(educationalContent.creditScore);
    content.push(educationalContent.mortgagePreApproval);
    content.push(educationalContent.downPayment);
    content.push(educationalContent.closingCosts);
    
    return content;
}