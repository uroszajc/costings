function calculatePricing() {
    // Get user inputs
    const numCores = parseInt(document.getElementById('numCores').value);
    const numHosts = parseInt(document.getElementById('numHosts').value);
    const openshiftSupport = document.getElementById('openshiftSupport').value;
    const vmwareProduct = document.getElementById('vmwareProduct').value;
    const duration = parseInt(document.getElementById('duration').value);
    const margin = parseInt(document.getElementById('margin').value);

    // Define pricing per core per year for OpenShift OVE
    const openshiftPricing = {
        standard: 2500, // Example price per core per year
        premium: 3750   // Example price per core per year
    };

    // Define pricing per core per year for VMware products
    const vmwarePricing = {
        vvf: 312,       // Example price per core per year
        vcf: 575,       // Example price per core per year
        entPlus: 247   // Example price per core per year
    };

    // Calculate total pricing for OpenShift OVE
    const openshiftPrice = openshiftPricing[openshiftSupport] *  numHosts * duration;

    // Calculate total pricing for VMware
    const vmwarePrice = vmwarePricing[vmwareProduct] * numCores *  duration;

    //Calculate the difference
    const difference = vmwarePrice - openshiftPrice;


 //MArkup calculator   Sell Price = Buy Price / (1 - Margin Percentage / 100)

    //calculate Openshift margin
    const openshiftmargin = openshiftPrice / (1 - margin /100);

    //calculate VMware margin
    const vmwaremargin = vmwarePrice / (1 - margin /100);    

    // Display the results
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h2>Pricing Comparison</h2>
        <p>OpenShift OVE (${openshiftSupport}): $${openshiftPrice}</p>
        <p>VMware (${vmwareProduct}): $${vmwarePrice}</p>
        <br>
        <p>Our Buy Price Difference: $${difference}</p>
        <br>
        <p>Openshift Sell Price: $${openshiftmargin.toFixed(2)}</p>
        <p>VMware Sell Price: $${vmwaremargin.toFixed(2)}</p>
    `;
}
