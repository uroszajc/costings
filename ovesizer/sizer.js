function addWorkload(button) {
  const row = button.parentElement;
  const clone = row.cloneNode(true);

  clone.querySelectorAll('input').forEach(input => input.value = '');
  clone.querySelector('.type').selectedIndex = 0;

  clone.querySelector('.icon-btn[onclick^="addWorkload"]').onclick = function () {
    addWorkload(this);
  };
  clone.querySelector('.icon-btn[onclick^="deleteWorkload"]').onclick = function () {
    deleteWorkload(this);
  };

  row.after(clone);
}

function deleteWorkload(button) {
  const row = button.parentElement;
  const container = document.getElementById('workloads');
  if (container.children.length > 1) {
    row.remove();
  }
}

function getOvercommitRatios(type) {
  switch (type) {
    case 'sql': return { cpu: 2, memory: 1.5 };
    case 'vdi': return { cpu: 6, memory: 2.5 };
    case 'oracle': return { cpu: 2, memory: 1.25 };
    case 'file': return { cpu: 5, memory: 2 };
    default: return { cpu: 4, memory: 2 };
  }
}

function calculateSizer() {
  const rows = document.querySelectorAll('#workloads .workload-row');
  const years = parseFloat(document.getElementById('years').value);
  const growthRate = parseFloat(document.getElementById('growth').value) / 100;
  const growthFactor = Math.pow(1 + growthRate, years);

  let totalPhysicalCPU = 0;
  let totalPhysicalMemory = 0;
  let totalStorage = 0;

  rows.forEach(row => {
    const type = row.querySelector('.type')?.value;
    const vcpu = parseFloat(row.querySelector('.vcpu')?.value || 0);
    const memory = parseFloat(row.querySelector('.memory')?.value || 0);
    const storage = parseFloat(row.querySelector('.storage')?.value || 0);

    const ratios = getOvercommitRatios(type);
    totalPhysicalCPU += (vcpu * growthFactor) / ratios.cpu;
    totalPhysicalMemory += (memory * growthFactor) / ratios.memory;
    totalStorage += storage * growthFactor;
  });

  const bufferFactor = 1.22;
  const nodeCPU = 192;
  const nodeMemory = 2048;

  const bufferedCPU = totalPhysicalCPU * bufferFactor;
  const bufferedMemory = totalPhysicalMemory * bufferFactor;

  const nodesByCPU = Math.ceil(bufferedCPU / nodeCPU);
  const nodesByMemory = Math.ceil(bufferedMemory / nodeMemory);
  let totalNodes = Math.max(nodesByCPU, nodesByMemory);
  if (totalNodes < 3) totalNodes = 3;

  document.getElementById('output').innerHTML = `
    <h2>Cluster Sizing Result</h2>
    <p><strong>Total Physical CPU Required:</strong> ${bufferedCPU.toFixed(2)} cores</p>
    <p><strong>Total Physical Memory Required:</strong> ${bufferedMemory.toFixed(2)} GiB</p>
    <p><strong>Total Storage Required:</strong> ${totalStorage.toFixed(2)} GiB</p>
    <p><strong>Estimated Node Count:</strong> ${totalNodes} nodes (192 cores / 2048GiB each)</p>
    <p><strong>Years Sized For:</strong> ${years} year(s) with ${growthRate * 100}% annual growth</p>
  `;
}