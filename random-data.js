function randomData(config, callback) {
    var _t = this, data = {};

    this.rand = function(min, max) {
        return Math.round( min - 0.5 + Math.random() * (max - min + 1));
    };

    this.getDataErrors = function () {
        var data = {
            backend: [],
            frontend: [],
        };
        var now = new Date(), i = 0;
        now.setHours(0, 0, 0, 0);

        while(i < 24) {
            now.setHours(i++);

            data.backend.push({
                t: now.valueOf(),
                y:  this.rand(0, 50),
            });
            data.frontend.push({
                t: now.valueOf(),
                y:  this.rand(0, 50),
            });
        }

        return data;
    };

    this.getDataQueues = function (data) {
        for (key in data) {
            data[key]['count'] = this.rand(0, 50);
            data[key]['consumers'] = this.rand(0, 3);
        }

        return data;
    };
    this.getDataQueuesMysql = function () {
        return this.getDataQueues({
            elasticsearch: {color: 'rgb(54, 162, 235)'},
            emarsysUpdate: {color: 'rgb(75, 192, 192)'},
            fz54: {color: 'rgb(201, 203, 207)'},
            menuFilters: {color: 'rgb(255, 159, 64)'},
            fz54Receipts: {color: 'rgb(159,22,255)'},
            queueJobs: {color: 'rgb(255, 99, 132)'},
            trigramms: {color: 'rgb(255, 205, 86)'},
            externalSites: {color: 'rgb(255, 55, 86)'},
        });
    };
    this.getDataQueuesRabbit = function () {
        return this.getDataQueues({
            push_orders: {color: 'rgb(54, 162, 235)'},
            adjust_events: {color: 'rgb(75, 192, 192)'},
            order_create: {color: 'rgb(201, 203, 207)'},
            personalization: {color: 'rgb(255, 159, 64)'},
            products_filters: {color: 'rgb(159,22,255)'},
            senders: {color: 'rgb(255, 99, 132)'},
            customers_fias: {color: 'rgb(255, 205, 86)'},
            customers_total: {color: 'rgb(255, 55, 86)'},
        });
    };

    switch (config.url) {
        case "error.php":
            data = _t.getDataErrors();
            break;
        case "queues-rabbit.php":
            data = _t.getDataQueuesRabbit();
            break;
        case "queues.php":
            data = _t.getDataQueuesMysql();
            break;
    }

    callback(data);
}
