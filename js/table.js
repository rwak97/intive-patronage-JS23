async function loadIntoTable(data, table) {
	const tableHead = table.querySelector("thead");
	const tableBody = table.querySelector("tbody");	
	const url = "https://api.npoint.io/38edf0c5f3eb9ac768bd";
	const { transactionTypes, transactions } = await fetchData(url);

	// populate the rows
	for (const row of transactions) {
		const rowElement = document.createElement("tr");

		const cellElement1 = document.createElement("td");
		const cellElement2 = document.createElement("td");
		const cellElement3 = document.createElement("td");
		const cellElement4 = document.createElement("td");
		const cellElement5 = document.createElement("td");
		
		var cellTypeContent = "something wrong"
		
		const cellText = row.type;

		if (cellText == 1) {
			cellTypeContent = "<img alt= 'icon1' width=30 height=30 src='pictures/anymoney.jpg' />";
		} else if (cellText == 2) {
			cellTypeContent = "<img alt= 'icon2' width=30 height=30 src='pictures/shopping.jpg' />";
		} else if (cellText == 3) {
			cellTypeContent = "<img alt= 'icon3' width=30 height=30 src='pictures/salary.jpg' />";
		} else if (cellText == 4) {
			cellTypeContent = "<img alt= 'icon4' width=30 height=30 src='pictures/spending.jpg' />";
		} else {
			cellTypeContent = cellText;
		}
		
		cellElement1.innerHTML = row.date;
		cellElement2.innerHTML = cellTypeContent;
		cellElement3.innerHTML = row.description;
		cellElement4.innerHTML = row.amount;
		cellElement5.innerHTML = row.balance;

		rowElement.appendChild(cellElement1);
		rowElement.appendChild(cellElement2);
		rowElement.appendChild(cellElement3);
		rowElement.appendChild(cellElement4);
		rowElement.appendChild(cellElement5);

		tableBody.appendChild(rowElement);
	}
}

async function fetchData(url) {
	var response = await fetch(url);
	var res = await response.json();

	return res;
}

loadIntoTable("res", document.querySelector("table"));