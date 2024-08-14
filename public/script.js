function processCSV() {
    const path = 'Table_Input.csv';
    fetch(path)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(text => {
            const rows = text.split('\n').slice(1); // Skip header row
            const data = rows.map(row => {
                const [index, value] = row.split(',');
                return { index, value: parseInt(value, 10) };
            });

            const values = {};
            data.forEach(row => {
                values[row.index] = row.value;
            });

            const table1 = document.querySelector('#table1 tbody');
            data.forEach(row => {
                const tr = document.createElement('tr');
                const tdIndex = document.createElement('td');
                tdIndex.textContent = row.index;
                const tdValue = document.createElement('td');
                tdValue.textContent = row.value;
                tr.appendChild(tdIndex);
                tr.appendChild(tdValue);
                table1.appendChild(tr);
            });

            const table2Value = [
                { category: 'Alpha', value: (values['A5'] || 0) + (values['A20'] || 0) },
                { category: 'Beta', value: (values['A15'] || 0) / (values['A7'] || 1) },
                { category: 'Charlie', value: (values['A13'] || 0) * (values['A12'] || 0) }
            ];

            const table2 = document.querySelector('#table2 tbody');
            table2Value.forEach(row => {
                const tr = document.createElement('tr');
                const tdCategory = document.createElement('td');
                tdCategory.textContent = row.category;
                const tdValue = document.createElement('td');
                tdValue.textContent = row.value.toFixed(2); // Round to 2 decimal places
                tr.appendChild(tdCategory);
                tr.appendChild(tdValue);
                table2.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Error getting CSV: ', error);
        });
}

document.addEventListener('DOMContentLoaded', processCSV);