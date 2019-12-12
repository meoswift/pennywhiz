let myChart = document.getElementById('myChart').getContext('2d');

    Chart.defaults.global.defaultFontFamily = 'Helvetica';
    Chart.defaults.global.defaultFontSize = 20;
    Chart.defaults.global.defaultFontColor = 'grey';
    //
    // var categoryLabels = [];
    // categoryLabels.push( ) //categories of users!!
    //
    // var expensesData = [];
    // var expensesColor = [];

    let expensesChart = new Chart(myChart, {
      type:'bar',
      data:{
        labels: ['C1','C2','C3','C4','C5'],
        datasets:[{
          label: 'Expenses',
          data: ['3320', '3590', '3390', '3480', '3200'],
          backgroundColor: ['#f1e0bb', '#f5d697', '#f4cc79', '#f7cc6e', '#f9bb37'],
          borderWidth:1,
          borderColor:'grey',
          hoverBorderWidth:3,
          hoverBorderColor:'black'
        }]
      },
      options:{
        title: {
          display: true,
          text: 'Recent Activity',
          fontSize: 30,
          padding: 30
        },
        legend: {
          position: 'right',
          display: false
        },
        layout: {
          padding: 20
        },
        tooltips: {
          enabled: true
        },
        //animation: true
      }
    });
