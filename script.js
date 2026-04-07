document.getElementById('licForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get input values
    const policyType = document.getElementById('policyName').value;
    const age = parseInt(document.getElementById('age').value);
    const term = parseInt(document.getElementById('term').value);
    const sa = parseInt(document.getElementById('sumAssured').value);

    // Validation
    if(sa < 100000) {
        alert("Minimum Sum Assured is ₹1,00,000");
        return;
    }

    // BASE ESTIMATE LOGIC (Universal Approximation)
    // Roughly 40-50 Rs per 1000 SA depending on age and term.
    let baseRate = 45; // Default

    if (policyType === 'term') {
        baseRate = 8; // Term plans are cheaper
    } else if (policyType === 'moneyback') {
        baseRate = 55; // Money back is expensive
    }

    // Age penalty (older = slightly higher premium)
    let agePenalty = (age > 35) ? (age - 35) * 1.2 : 0;
    
    // Final Base Premium (Without GST)
    let estimatedBasePremium = ((sa / 1000) * (baseRate + agePenalty));

    // GST Calculation (First Year = 4.5%, Subsequent = 2.25%)
    // Term plans usually have 18% GST, but for universal LIC estimate we'll use standard 4.5% unless logic refined
    let gstRate = (policyType === 'term') ? 0.18 : 0.045;
    
    let firstYearGst = estimatedBasePremium * gstRate;
    let totalFirstYear = estimatedBasePremium + firstYearGst;

    // Formatting currency
    const formatCurr = (num) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num);

    // Display Results
    document.getElementById('resYearly').innerText = formatCurr(estimatedBasePremium);
    document.getElementById('resGst').innerText = formatCurr(firstYearGst);
    document.getElementById('resTotal').innerText = formatCurr(totalFirstYear);

    // Show Results Area
    document.getElementById('resultsArea').style.display = 'block';
});
