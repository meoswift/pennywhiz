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

		spentData.push('2000');
		remainData.push('3000');
		labelsCategory.push('Shopping');

		spentData.push('1980');
		remainData.push('500');
		labelsCategory.push('Food');
 

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

    let myChart = new Chart(myChart, {
      type:'bar',
      data: barChartData,
      options:{
        title: {
          display: true,
          text: 'Budget Overview',
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
          enabled: true,
          mode: 'index',
          intersect: false
        },
        responsive: true,
        scales: {
          xAxes: [{
            stacked: true,
          }],
          yAxes: [{
            stacked: true
          }]
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
