async function loadIntoTable(data, table) {
	const tableHead = table.querySelector("thead");
	const tableBody = table.querySelector("tbody");	
	const response = await fetch("https://api.npoint.io/38edf0c5f3eb9ac768bd");
	const { transactionTypes, transactions } = await response.json();

	// populate the rows
	for (const row of transactions) {
		const rowElement = document.createElement("tr");

		for (const [key, cellText] of Object.entries(row)) {
			const cellElement = document.createElement("td");
			
			console.log(key, cellText);
			var cellTypeContent = "something wrong"
			if (key == "type") {
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
			} else {
				cellTypeContent = cellText;
			}
			cellElement.innerHTML = cellTypeContent;
			rowElement.appendChild(cellElement);

		}

		tableBody.appendChild(rowElement);
	}
}

async function fetchData(url) {
	var response = await fetch("https://api.npoint.io/38edf0c5f3eb9ac768bd");
	var res = await response.json();
	 
	return res;

}

loadIntoTable("res", document.querySelector("table"));