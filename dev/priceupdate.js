// Default pricing for OpenShift and VMware
const defaultOpenshiftPricing = {
    standard: 2180,
    premium: 3270
};

const defaultVmwarePricing = {
    vvf: 219.67,
    vcf: 250,
    entPlus: 242.97
};

// Function to load current prices from localStorage or use defaults
function loadPricing() {
    const openshiftPricing = JSON.parse(localStorage.getItem("openshiftPricing")) || defaultOpenshiftPricing;
    const vmwarePricing = JSON.parse(localStorage.getItem("vmwarePricing")) || defaultVmwarePricing;

    // Populate the form fields with the loaded pricing
    document.getElementById("openshiftStandard").value = openshiftPricing.standard;
    document.getElementById("openshiftPremium").value = openshiftPricing.premium;
    document.getElementById("vmwareVVF").value = vmwarePricing.vvf;
    document.getElementById("vmwareVCF").value = vmwarePricing.vcf;
    document.getElementById("vmwareEntPlus").value = vmwarePricing.entPlus;
}

// Function to save updated prices to localStorage
function savePricing() {
    const openshiftPricing = {
        standard: parseFloat(document.getElementById("openshiftStandard").value),
        premium: parseFloat(document.getElementById("openshiftPremium").value)
    };

    const vmwarePricing = {
        vvf: parseFloat(document.getElementById("vmwareVVF").value),
        vcf: parseFloat(document.getElementById("vmwareVCF").value),
        entPlus: parseFloat(document.getElementById("vmwareEntPlus").value)
    };

    // Save to localStorage
    localStorage.setItem("openshiftPricing", JSON.stringify(openshiftPricing));
    localStorage.setItem("vmwarePricing", JSON.stringify(vmwarePricing));

    // Display success message
    document.getElementById("statusMessage").textContent = "Prices updated successfully!";
    document.getElementById("statusMessage").style.color = "green";
}

// Event listener for the save button
document.getElementById("savePrices").addEventListener("click", savePricing);

// Load the pricing data when the page loads
window.onload = loadPricing;
