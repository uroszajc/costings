function calculatePricing() {
    // Get user inputs
    const numCores = parseInt(document.getElementById('numCores').value);
    const numHosts = parseInt(document.getElementById('numHosts').value);
    const openshiftSupport = document.getElementById('openshiftSupport').value;
    const vmwareProduct = document.getElementById('vmwareProduct').value;
    const duration = parseInt(document.getElementById('duration').value);

    // Define pricing per core per year for OpenShift OVE
    const openshiftPricing = {
        standard: 100, // Example price per core per year
        premium: 150   // Example price per core per year
    };

    // Define pricing per core per year for VMware products
    const vmwarePricing = {
        vvf: 200,       // Example price per core per year
        vcf: 250,       // Example price per core per year
        entPlus: 300    // Example price per core per year
    };

    // Calculate total pricing for OpenShift OVE
    const openshiftPrice = openshiftPricing[openshiftSupport] * numCores * numHosts * duration;

    // Calculate total pricing for VMware
    const vmwarePrice = vmwarePricing[vmwareProduct] * numCores * numHosts * duration;

    // Display the results
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h2>Pricing Comparison</h2>
        <p>OpenShift OVE (${openshiftSupport}): $${openshiftPrice}</p>
        <p>VMware (${vmwareProduct}): $${vmwarePrice}</p>
    `;
}
