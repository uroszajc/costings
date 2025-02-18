function calculatePricing() {
    // Get user inputs
    const numCores = parseInt(document.getElementById('numCores').value);
    const numHosts = parseInt(document.getElementById('numHosts').value);
    const openshiftSupport = document.getElementById('openshiftSupport').value;
    const vmwareProduct = document.getElementById('vmwareProduct').value;
    const duration = parseInt(document.getElementById('duration').value);
    //Fix margin calculator for
    const margin: 10;

    // Define pricing per core per year for OpenShift OVE
    const openshiftPricing = {
        standard: 2500, // Example price per core per year
        premium: 3750   // Example price per core per year
    };

    // Define pricing per core per year for VMware products
    const vmwarePricing = {
        vvf: 250,       // Example price per core per year
        vcf: 512,       // Example price per core per year
        entPlus: 247   // Example price per core per year

    // Calculate total pricing for OpenShift OVE
    const openshiftPrice = openshiftPricing[openshiftSupport] * numHosts * duration;

    // Calculate total pricing for VMware
    const vmwarePrice = vmwarePricing[vmwareProduct] * numCores * duration;

    // Calculate the difference
    const difference = vmwarePrice - openshiftPrice;

    // Markup calculator: Sell Price = Buy Price / (1 - Margin Percentage / 100)
    // Calculate OpenShift sell price
    const openshiftSellPrice = openshiftPrice / (1 - margin / 100);

    // Calculate VMware sell price
    const vmwareSellPrice = vmwarePrice / (1 - margin / 100);

    // Display the results
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h2>Pricing Summary</h2>
        <p><strong>OpenShift Sell Price:</strong> $${openshiftSellPrice.toFixed(2)}</p>
        <p><strong>VMware Sell Price:</strong> $${vmwareSellPrice.toFixed(2)}</p>
        <p><strong>Buy Price Difference:</strong> $${difference.toFixed(2)}</p>
    `;
}