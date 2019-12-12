let myChart = document.getElementById('myChart').getContext('2d');

    Chart.defaults.global.defaultFontFamily = 'Helvetica';
    Chart.defaults.global.defaultFontSize = 20;
    Chart.defaults.global.defaultFontColor = 'grey';
    //
    //var categoryLabels = [];
    // categoryLabels.push( ) //categories of users!!
    //
    // var expensesData = [];
    // var expensesColor = [];

    var spentData = [];
    //var remainData = [];
    var labelsCategory = [];

    for (i = 0; i < budgetList.length(); i++){
        spentData.push('budgetList[i].budget');
        labelsCategory.push('budgetList[i].name');
    }

    let expensesChart = new Chart(myChart, {
      type:'pie',
      data:{
        labels: labelsCategory,
        datasets:[{
          label: 'Expenses',
          data: spentData,
          //backgroundColor: ['#f1e0bb', '#f5d697', '#f4cc79', '#f7cc6e', '#f9bb37'],
          borderWidth:1,
          borderColor:'grey',
          hoverBorderWidth:3,
          hoverBorderColor:'black'
        }]
      },
      options:{
        title: {
          display: false,
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

    function addData(chart, label, data) {
      chart.data.labels.push(label);
      chart.data.datasets.forEach((dataset) => {
          dataset.data.push(data);
        });
      chart.update();
    }

    function removeData(chart) {
      chart.data.labels.pop();
      chart.data.datasets.forEach((dataset) => {
          dataset.data.pop();
        });
      chart.update();
    }
