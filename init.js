var monitoring = {
    render: function(name) {
        var _t = this;
        var config = _t.charts[name];
        _t.getData(config, function (response) {
            if (null ===  config.object) {
                var ctx = document.getElementById(config.container).getContext('2d');
                ctx.canvas.width = 1000;
                ctx.canvas.height = 300;

                config.object = new Chart(ctx, configCharts[name](response));

                if (config.timeUpdate > 0) {
                    setInterval(function () {
                        _t.render(name);
                    }, config.timeUpdate);
                }
            } else {
                config.object.config.data = configCharts[name](response).data;
                config.object.update();
            }
        });
    },
    run: function() {
        var _t = this

        for (var name in _t.charts) {
            _t.render(name);
        }

        return _t;
    },
    charts: {
        statisticsMysqlQueues: {
            object: null,
            container: 'statistics-mysql-queues',
            url: 'queues.php',
            timeUpdate: 5000,
        },
        statisticsRabbitQueues: {
            object: null,
            container: 'statistics-rabbit-queues',
            url: 'queues-rabbit.php',
            timeUpdate: 10000,
        },
        statisticsErrors: {
            object: null,
            container: 'statistics-errors',
            url: 'error.php',
            timeUpdate: 3000,
        },
    },
    getData: function(config, callback) {
        randomData(config, callback);
        // jQuery
        //     .get(config.url)
        //     .done(function (response) {
        //         callback(response);
        //     })

    },
    init: function () {
        var _t = this;

        $(document).ready(function () {
            _t.run();
        });

        return _t;
    }
}.init();
