    let myChart = document.getElementById('myChart').getContext('2d');

    Chart.defaults.global.defaultFontFamily = 'Helvetica';
    Chart.defaults.global.defaultFontSize = 20;
    Chart.defaults.global.defaultFontColor = 'grey';

    var spentData = [];
    var remainData = [];
    var labelsCategory = [];

    spentData.push('3240');
    remainData.push('4000');
    labelsCategory.push('Household');

    var barChartData = {
			labels: labelsCategory,
			datasets: [{
				label: 'Spent',
				backgroundColor: '#bd1b1b',
				data: spentData
			}, {
				label: 'Remaining',
				backgroundColor: '#2a8cf2',
				data: remainData
			}]
		};

    let expensesChart = new Chart(myChart, {
      type:'bar',
      data: barChartData,
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
        scales: {
          xAxes: [{
            stacked: true,
          }],
          yAxes: [{
            stacked: true
          }]
        }
        //animation: true
      }
    });
