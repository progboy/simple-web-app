function fetchProducts() {
    fetch('/api/dashboard').then(response => response.json()).then(data => {
        const dashboardDataDiv = document.getElementById('dashboard-data');
        dashboardDataDiv.innerHTML = '';
        if (data.length > 0) {
          const table = document.createElement('table');
          const headerRow = document.createElement('tr');

          //table headers
          Object.keys(data[0]).forEach(key => {
            const headerCell = document.createElement('th');
            headerCell.textContent = key[0].toUpperCase()+key.slice(1,key.length);
            headerRow.appendChild(headerCell);
          });
          table.appendChild(headerRow);

          //table content
          data.forEach(row => {
            const rowElement = document.createElement('tr');
            Object.values(row).forEach(value => {
              const cell = document.createElement('td');
              cell.textContent = value;
              rowElement.appendChild(cell);
            });
            table.appendChild(rowElement);
          });
          dashboardDataDiv.appendChild(table);
        } else {
          dashboardDataDiv.textContent = 'No data available';
        }
      }).catch((error) => {
        console.error('Error fetching dashboard data:', error);
      });
}

document.getElementById('create-product-button').addEventListener('click', () => {
    let name = document.getElementById('product-name').value;
    let amount = document.getElementById('product-amount').value;
    if(amount===""){
      amount = 0;
    }
    if(amount < 0){
      window.alert("amount should be 0 or more than 0");
      return;
    }
    fetch('/api/product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, amount })
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
      document.getElementById('product-name').value = "";
      document.getElementById('product-amount').value = "";
      fetchProducts();
    });
  });

document.getElementById('update-product-button').addEventListener('click', () => {
  let pname = document.getElementById('update-product-id').value;
  let amount = document.getElementById('update-product-amount').value;
  if(amount < 0){
    window.alert("amount should be 0 or more than 0");
    return;
  }
  fetch('/api/product', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pname, amount })}).then(response => response.json()).then(data => {
      alert(data.message);
      document.getElementById('update-product-id').value = "";
      document.getElementById('update-product-amount').value = "";
      fetchProducts();
    }).catch((err) =>{
      console.error(err);
    });
  });

  document.getElementById('delete-product-button').addEventListener('click', () => {
    let pname = document.getElementById('delete-product-id').value;
    fetch('/api/product', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ pname })
    }).then(response => response.json()).then(data => {
      window.alert(data.message);
      document.getElementById('delete-product-id').value = '';
      fetchProducts();
    }).catch((err)=>console.error(err));
  });

document.getElementById("dbtable").addEventListener('click',fetchProducts);
fetchProducts();