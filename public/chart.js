    let myChart = document.getElementById('myChart').getContext('2d');

    Chart.defaults.global.defaultFontFamily = 'Nunito';
    Chart.defaults.global.defaultFontSize = 20;
    Chart.defaults.global.defaultFontColor = 'grey';

    var spentData = [];
    var remainData = [];
    var labelsCategory = [];

    //category.name needs to be distinct!
    //category.budget needs to be a total!!

  //   budgetList.forEach(category => {
  //     labelsCategory.push(category.name);
  //     spentData.push(category.budget);
  //     remainData.push(     );
  //   }
  //
  //   budgetList.forEach(category => {
  //   if (category.name != labelsCategory)
  //       index = labelsCategory.push(category.name)
  //   else (spent )
  // })

    spentData.push('2200');
    remainData.push('1000');
    labelsCategory.push('Household');

    spentData.push('200');
    remainData.push('700');
    labelsCategory.push('Shopping');

    var barChartData = {
			labels: labelsCategory,
			datasets: [{
				label: 'Spent',
				backgroundColor: '#f49898',
				data: spentData
			}, {
				label: 'Remaining',
				backgroundColor: '#95ddab',
				data: remainData
			}]
		};

    let expensesChart = new Chart(myChart, {
      type:'bar',
      data: barChartData,
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
        scales: {
          xAxes: [{
            stacked: true,
          }],
          yAxes: [{
            stacked: true
          }]
        },
        tooltips: {
          enabled: true,
          mode: 'single',
          callbacks: {
                  label: function(tooltipItem, data) {
                    var label = data.datasets[tooltipItem.datasetIndex].label;
                    var datasetLabel = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                    return label + ': $' + addCommas(datasetLabel) ;
                  }
                }
              }
            }
    });

    function addCommas(nStr)
    {
       nStr += '';
        x = nStr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }

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
