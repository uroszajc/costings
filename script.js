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
        standard: 2180, // Example price per core per year
        premium: 3270   // Example price per core per year
    };

    // Define pricing per core per year for VMware products
    const vmwarePricing = {
        vvf: 219.67,       // Example price per core per year
        vcf: 250,       // Example price per core per year
        entPlus: 242.97   // Example price per core per year
    };

    // Calculate total pricing for OpenShift OVE
    const openshiftPrice = openshiftPricing[openshiftSupport] *  numHosts * duration;

    // Calculate total pricing for VMware
    const vmwarePrice = vmwarePricing[vmwareProduct] * numCores *  duration;

    //Calculate the difference
    const difference = vmwarePrice - openshiftPrice;

    //calulate margin
    const marginresult = (100-margin);

    //calculate Openshift margin
    Sell Price = Buy Price / (1 - Margin Percentage / 100)
    // const openshiftmargin = openshiftPrice/marginresult;
    const openshiftmargin = openshiftPrice / (1 - margin /100);

    //calculate VMware margin
    // const vmwaremargin = vmwarePrice/marginresult;
    const vmwaremargin = vmwarePrice / (1 - margin /100);    

    // Display the results
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h2>Pricing Comparison</h2>
        <p>OpenShift OVE (${openshiftSupport}): $${openshiftPrice}</p>
        <p>VMware (${vmwareProduct}): $${vmwarePrice}</p>
        <p>Price Difference: $${difference}</p>
        <p>Openshift margin: $${openshiftmargin}</p>
        <p>VWare Margin: $${vmwaremargin}</p>
    `;
}
