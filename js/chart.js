getData();
async function getData() {
   const response = await fetch('https://api.npoint.io/38edf0c5f3eb9ac768bd');
   const data = await response.json();
   console.log(data);
   length = data.transactions.length;
   console.log(length);
  
   const transactionsByDate = data.transactions.reduce((acc, value) => {
      if (!acc[value.date]){
         acc[value.date] = [];
      }

      acc[value.date].push(value);

      return acc;
   }, []);

   const transactionsByType = data.transactions.reduce((acc2, value) => {
      if (!acc2[value.type]){
         acc2[value.type] = [];
      }

      acc2[value.type].push(value);

      return acc2;
   }, []);

   console.log(transactionsByDate);
   console.log(transactionsByType);

   let chartData = [];
    for (const [key, value] of Object.entries(transactionsByDate)){
      chartData.push({date:key, balance: value.reduce((acc, val) =>acc + val.amount , 0)});
   }
   chartData.sort(function(a,b){
      return new Date(a.date) - new Date(b.date); 
   });
   console.log(chartData);

   const labels = chartData.map(element => element.date);
   const values = chartData.map(element => element.balance);

   new Chart(document.getElementById("bar-chart"), {
      type: 'bar',
      data: {
         labels: labels,
         datasets: [
            {
               label: "Bilans operacji z danego dnia",
               backgroundColor: ["#3a90cd"],
               data: values
            }
         ]
      },
      options: {
      legend: { display: false },
      title: {
         display: true,
         text: 'Saldo konta'
         }
      }
   });

   const transacationTypes = data.transacationTypes;

   xValues = [];
   yValues = [];

   var incomeTypes = [];
   var expenseTypes = [];
   Object.entries(transacationTypes).forEach(([key, value]) => {
      if (value.toLowerCase().includes('wydatki')){
         expenseTypes.push(key);
      }
      if (value.toLowerCase().includes('wpływy')){
         incomeTypes.push(key);
      }
   });

   var incomeTransactions = 0;
   var expenseTransactions = 0;
   data.transactions.reduce((acc, val) => {
      if(incomeTypes.includes(val.type.toString())){
         incomeTransactions++;
      }
      if(expenseTypes.includes(val.type.toString())){
         expenseTransactions++;
      }
   },{})

      xValues.push('Wpływy', 'Wydatki');
      yValues.push(incomeTransactions, expenseTransactions);


   var barColors = [
      "#b91d47",
      "#00aba9",
      "#2b5797",
      "#e8c3b9",
   ];
   
   new Chart(document.getElementById("pie-chart"), {
      type: "pie",
      data: {
        labels: Array.from(xValues),
        datasets: [{
          backgroundColor: barColors,
          data: Array.from(yValues)
        }]
      },
      options: {
        title: {
          display: true,
          text: "Procentowy podział transakcji"
         }
      }
   });

}