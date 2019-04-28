var configCharts = {
    color: Chart.helpers.color,
    chartColors: window.chartColors,
    queues: function(data) {
        var _t = this, coordinates = [], backgroundColor = [], borderColor = [], labels = [];

        for(var key in data) {
            coordinates.push(data[key].count);
            backgroundColor.push(_t.color(data[key].color).alpha(0.5).rgbString());
            borderColor.push(data[key].color);
            labels.push(key + ' (' + data[key].consumers + '/' + data[key].count + ')');
        }

        return {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    data: coordinates,
                    fill: false,
                    backgroundColor: backgroundColor,
                    borderColor: borderColor,
                    borderWidth: 1
                },]
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            maxRotation: 0
                        }
                    }],
                    yAxes: [{ticks: {beginAtZero: true}}]
                }
            }
        };
    },
    statisticsMysqlQueues: function(data) {
        return this.queues(data);
    },
    statisticsRabbitQueues: function(data) {
        return this.queues(data);
    },
    statisticsErrors: function (data) {
        var _t = this;

        return {
            type: 'bar',
            data: {
                datasets: [{
                    label: 'Frontend',
                    backgroundColor: _t.color(_t.chartColors.red).alpha(0.5).rgbString(),
                    borderColor: _t.chartColors.red,
                    data: data.frontend,
                    type: 'line',
                    pointRadius: 0,
                    fill: false,
                    lineTension: 0,
                    borderWidth: 2
                }, {
                    label: 'Backend',
                    backgroundColor: _t.color(_t.chartColors.green).alpha(0.5).rgbString(),
                    borderColor: _t.chartColors.green,
                    data: data.backend,
                    type: 'line',
                    pointRadius: 0,
                    fill: false,
                    lineTension: 0,
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            parser: "HH:mm",
                            unit: 'hour',
                            unitStepSize: 1,
                            displayFormats: {
                                'minute': 'HH:mm',
                                'hour': 'HH:mm',
                            }
                        },
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Количество'
                        }
                    }]
                },
                tooltips: {
                    intersect: false,
                    mode: 'index',
                    callbacks: {
                        label: function(tooltipItem, myData) {
                            var label = myData.datasets[tooltipItem.datasetIndex].label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += parseInt(tooltipItem.value, 10);
                            return label;
                        }
                    }
                }
            }
        };
    }
};
