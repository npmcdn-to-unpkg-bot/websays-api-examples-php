"use strict";

(function (Highcharts) {
    // Highcharts default options
    Highcharts.setOptions({
        chart: {
            reflow: true
            //shadow: false
            //style: {
            //    fontFamily: '"Play", "Helvetica Neue", Helvetica, Arial, sans-serif'
            //}
        },
        global: {
            useUTC: false
        },
        tooltip: {
            shared: true
        },
        title: {
            text: null
        },
        exporting: {
            enabled: false
        },
        plotOptions: {
            series: {
                marker: {
                    radius: 3,
                    symbol: 'circle'
                },
                shadow: false
            }
        },
        //credits: {
        //    enabled: false
        //},
        navigation: { // Export buttons
            buttonOptions: {
                enabled: false
            }
        },
        xAxis: {
            title: {
                text: false,
                margin: 0
            },
            dateTimeLabelFormats: {
                day: '%e %b',
                week: '%e %b'
            },
            gridLineWidth: 0
        },
        yAxis: {
            title: {
                text: false,
                margin: 0
            },
            gridLineWidth: 1,
            lineWidth: 1
        }
    });
})(Highcharts);

(function ($, Highcharts, EXAMPLE_DATA) {
    var polarityChart,
        sourcesChart,
        shareChart,
        hcColors;

    hcColors = ['#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE', '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92', '#993BA7', '#4EA73E', '#43A7A0', '#A7943D', '#A76A3B'];

    function fixTimestampsOnData (data) {
        var listCategories = data.xAxis.categories,
            i;

        function loopHandler (dataItem, index) {
            return [listCategories[index] * 1000, Number(dataItem)];
        }

        for (i = 0; i < data.series.length; i++) {
            data.series[i].data = _.map(data.series[i].data, loopHandler);
        }
    }

    function PolarityChart () {
        this.chart = undefined;
        this.defaultSeriesType = 'column';

        this.lut = {
            'unprocessed': '#D9D9D9',
            'neutral': '#F2D71A',
            'negative': '#D0111B',
            'positive': '#85A13D',
            'announcement': '#DB843D',
            'question': '#4572A7'
        };

        this.config = {
            chart: {
                renderTo: 'chart-evolution-polarity',
                defaultSeriesType: this.defaultSeriesType,
                marginTop: 70
            },
            title: {
                text: 'Polarity',
                align: 'left',
                margin: 20,
                x: 10,
                y: 30,
                style: {
                    color: '#A6A6A6',
                    fontFamily: '"Arial", "Helvetica", sans-serif',
                    fontSize: '24px',
                    fontWeight: 'bold'
                }
            },
            xAxis: {
                type: 'datetime',
                title: {
                    text: null
                },
                labels: {style: {'font-size': '7px'}}
            },
            yAxis: {
                min: 0,
                title: {
                    text: null
                },
                stackLabels: {
                    enabled: false
                },
                labels: {style: {'font-size': '9px'}}
            },
            plotOptions: {
                series: {
                    allowPointSelect: true,
                    marker: {
                        enabled: false
                    },
                    dataLabels: {
                    }
                },
                column: {
                    stacking: 'normal',
                    shadow: false,
                    groupPadding: 0
                },
                pie: {
                    center: [-100, 40],
                    size: 90,
                    shadow: false,
                    dataLabels: {
                        enabled: false,
                        useHTML: true
                    }
                },
                areaspline: {
                    stacking: 'normal'
                }
            },
            legend: {
                align: 'left',
                layout: 'vertical',
                borderWidth: 0,
                verticalAlign: 'top',
                y: 200,
                itemMarginBottom: 5, // HACK little charts...
                itemStyle: {
                    'font-size': '9px'
                }
            },
            series: []
        };

        this.data = {};
    }

    PolarityChart.prototype.setData = function (data) {
        var pieData = [],
            splineData = [],
            i,
            ii,
            sum,
            mid,
            x;

        this.data = $.extend({}, this.config);

        if (_.isEmpty(data) || _.isEmpty(data.series)) {
            return;
        }

        // HACK Put categories on data points
        fixTimestampsOnData(data);

        // Add each serie
        for (i = 0; i < data.series.length; i++) {
            data.series[i].type = this.defaultSeriesType;
            data.series[i].color = this.getColor(data.series[i], i);

            // Name
            /// NOTE We don't use the function setted above, because in the export will be the translated string
            data.series[i].name = this.getSerieName(data.series[i].name);

            // Add serie
            this.data.series.push(data.series[i]);

            // Sum data
            for (ii = 0, sum = 0; ii < data.series[i].data.length; sum += data.series[i].data[ii++][1]) {}

            if (sum) {
                pieData.push({
                    name: data.series[i].name,
                    y: sum,
                    color: data.series[i].color
                });
            }
        }

        // Calculate average
        for (i = 0, mid = 0; i < data.xAxis.categories.length; i++) {
            mid = 0;

            for (x = 0; x < data.series.length; mid += data.series[x++].data[i][1]) {}

            splineData.push(mid / 2);
        }

//             // Spline line with average
//             this.data.series.push({
//                 type: 'spline',
//                 name: WEBAPP.i18n.labels.reports.average,
//                 data: splineData,
//             }, false); // Boolean redraw

        // Pie chart with totals
        this.data.series.push({
            type: 'pie',
            name: '',
            data: pieData
        });
    };

    PolarityChart.prototype.getColor = function (serie, serieIndex) {
        var self = this,
            color,
            colors = hcColors,
            unusedColors;

        if (this.lut && this.lut.hasOwnProperty(serie.name)) {
            color = this.lut[serie.name];
        } else {
            unusedColors = _.reject(colors, function (color) {
                return _.include(_.values(self.lut), color);
            });

            color = unusedColors[serieIndex];
        }

        return color;
    };

    PolarityChart.prototype.getSerieName = function (name) {
        // TODO
        return name;
    };

    PolarityChart.prototype.createChart = function () {
        this.chart = new Highcharts.Chart(this.config);
    };

    function SourcesChart () {
        this.chart = undefined;
        this.defaultSeriesType = 'column';

        this.lut = {
            social: '#4f81bd',
            news: '#8dc7b8',
            blog: '#f26007',
            forum: '#ed9254',
            video: '#a7bd5b',
            other: '#7a7a7a'
        };

        this.config = {
            chart: {
                renderTo: 'chart-evolution-sources',
                defaultSeriesType: this.defaultSeriesType,
                marginTop: 70
            },
            title: {
                text: 'Sources',
                align: 'left',
                margin: 20,
                x: 10,
                y: 30,
                style: {
                    color: '#A6A6A6',
                    fontFamily: '"Arial", "Helvetica", sans-serif',
                    fontSize: '24px',
                    fontWeight: 'bold'
                }
            },
            xAxis: {
                type: 'datetime',
                title: {
                    text: null
                },
                labels: {style: {'font-size': '7px'}}
            },
            yAxis: {
                min: 0,
                title: {
                    text: null
                },
                stackLabels: {
                    enabled: false
                },
                labels: {style: {'font-size': '9px'}}
            },
            plotOptions: {
                series: {
                    allowPointSelect: true,
                    marker: {
                        enabled: false
                    },
                    dataLabels: {
                    }
                },
                column: {
                    stacking: 'normal',
                    shadow: false,
                    groupPadding: 0
                },
                pie: {
                    center: [-100, 40],
                    size: 90,
                    shadow: false,
                    dataLabels: {
                        enabled: false,
                        useHTML: true
                    }
                },
                areaspline: {
                    stacking: 'normal'
                }
            },
            legend: {
                align: 'left',
                layout: 'vertical',
                borderWidth: 0,
                verticalAlign: 'top',
                y: 200,
                itemMarginBottom: 5, // HACK little charts...
                itemStyle: {
                    'font-size': '9px'
                }
            },
            series: []
        };

        this.data = {};
    }

    SourcesChart.prototype.setData = function (data) {
        var pieData = [],
            splineData = [],
            i,
            ii,
            sum,
            mid,
            x;

        this.data = $.extend({}, this.config);

        if (_.isEmpty(data) || _.isEmpty(data.series)) {
            return;
        }

        // HACK Put categories on data points
        fixTimestampsOnData(data);

        // Add each serie
        for (i = 0; i < data.series.length; i++) {
            data.series[i].type = this.defaultSeriesType;
            data.series[i].color = this.getColor(data.series[i], i);

            // Name
            /// NOTE We don't use the function setted above, because in the export will be the translated string
            data.series[i].name = this.getSerieName(data.series[i].name);

            // Add serie
            this.data.series.push(data.series[i]);

            // Sum data
            for (ii = 0, sum = 0; ii < data.series[i].data.length; sum += data.series[i].data[ii++][1]) {}

            if (sum) {
                pieData.push({
                    name: data.series[i].name,
                    y: sum,
                    color: data.series[i].color
                });
            }
        }

        // Calculate average
        for (i = 0, mid = 0; i < data.xAxis.categories.length; i++) {
            mid = 0;

            for (x = 0; x < data.series.length; mid += data.series[x++].data[i][1]) {}

            splineData.push(mid / 2);
        }

//             // Spline line with average
//             this.data.series.push({
//                 type: 'spline',
//                 name: WEBAPP.i18n.labels.reports.average,
//                 data: splineData,
//             }, false); // Boolean redraw

        // Pie chart with totals
        this.data.series.push({
            type: 'pie',
            name: '',
            data: pieData
        });
    };

    SourcesChart.prototype.getColor = function (serie, serieIndex) {
        var self = this,
            color,
            colors = hcColors,
            unusedColors;

        if (this.lut && this.lut.hasOwnProperty(serie.name)) {
            color = this.lut[serie.name];
        } else {
            unusedColors = _.reject(colors, function (color) {
                return _.include(_.values(self.lut), color);
            });

            color = unusedColors[serieIndex];
        }

        return color;
    };

    SourcesChart.prototype.getSerieName = function (name) {
        // TODO Translations
        return name;
    };

    SourcesChart.prototype.createChart = function () {
        this.chart = new Highcharts.Chart(this.config);
    };

    function ShareChart () {
        this.chart = undefined;
        this.defaultSeriesType = 'spline';

        this.lut = {
            // '1034': 'brown',
            // '256': 'green'
        };

        this.config = {
            chart: {
                renderTo: 'chart-evolution-share',
                defaultSeriesType: this.defaultSeriesType,
                marginTop: 70
            },
            title: {
                text: 'Share of voice',
                align: 'left',
                margin: 20,
                x: 10,
                y: 30,
                style: {
                    color: '#A6A6A6',
                    fontFamily: '"Arial", "Helvetica", sans-serif',
                    fontSize: '24px',
                    fontWeight: 'bold'
                }
            },
            xAxis: {
                type: 'datetime',
                title: {
                    text: null
                },
                labels: {style: {'font-size': '7px'}}
            },
            yAxis: {
                min: 0,
                title: {
                    text: null
                },
                stackLabels: {
                    enabled: false
                },
                labels: {style: {'font-size': '9px'}}
            },
            plotOptions: {
                series: {
                    allowPointSelect: true,
                    marker: {
                        enabled: false
                    },
                    dataLabels: {
                    }
                },
                column: {
                    stacking: 'normal',
                    shadow: false,
                    groupPadding: 0
                },
                pie: {
                    center: [-100, 40],
                    size: 90,
                    shadow: false,
                    dataLabels: {
                        enabled: false,
                        useHTML: true
                    }
                },
                areaspline: {
                    stacking: 'normal'
                }
            },
            legend: {
                align: 'left',
                layout: 'vertical',
                borderWidth: 0,
                verticalAlign: 'top',
                y: 200,
                itemMarginBottom: 5, // HACK little charts...
                itemStyle: {
                    'font-size': '9px'
                }
            },
            series: []
        };

        this.data = {};
    }

    ShareChart.prototype.setData = function (data) {
        var pieData = [],
            splineData = [],
            i,
            ii,
            sum,
            mid,
            x;

        this.data = $.extend({}, this.config);

        if (_.isEmpty(data) || _.isEmpty(data.series)) {
            return;
        }

        // HACK Put categories on data points
        fixTimestampsOnData(data);

        // Add each serie
        for (i = 0; i < data.series.length; i++) {
            data.series[i].type = this.defaultSeriesType;
            data.series[i].color = this.getColor(data.series[i], i);

            // Name
            /// NOTE We don't use the function setted above, because in the export will be the translated string
            data.series[i].name = this.getSerieName(data.series[i].name);

            // Add serie
            this.data.series.push(data.series[i]);

            // Sum data
            for (ii = 0, sum = 0; ii < data.series[i].data.length; sum += data.series[i].data[ii++][1]) {}

            if (sum) {
                pieData.push({
                    name: data.series[i].name,
                    y: sum,
                    color: data.series[i].color
                });
            }
        }

        // Calculate average
        for (i = 0, mid = 0; i < data.xAxis.categories.length; i++) {
            mid = 0;

            for (x = 0; x < data.series.length; mid += data.series[x++].data[i][1]) {}

            splineData.push(mid / 2);
        }

//             // Spline line with average
//             this.data.series.push({
//                 type: 'spline',
//                 name: WEBAPP.i18n.labels.reports.average,
//                 data: splineData,
//             }, false); // Boolean redraw

        // Pie chart with totals
        this.data.series.push({
            type: 'pie',
            name: '',
            data: pieData
        });
    };

    ShareChart.prototype.getColor = function (serie, serieIndex) {
        var self = this,
            color,
            colors = hcColors,
            unusedColors;

        if (this.lut && this.lut.hasOwnProperty(serie.name)) {
            color = this.lut[serie.name];
        } else {
            unusedColors = _.reject(colors, function (color) {
                return _.include(_.values(self.lut), color);
            });

            color = unusedColors[serieIndex];
        }

        return color;
    };

    ShareChart.prototype.getSerieName = function (name) {
        // TODO Translations
        return 'Profile #' + name;
    };

    ShareChart.prototype.createChart = function () {
        this.chart = new Highcharts.Chart(this.config);
    };

    polarityChart = new PolarityChart();
    polarityChart.setData(EXAMPLE_DATA.polarity);
    polarityChart.createChart();

    sourcesChart = new SourcesChart();
    sourcesChart.setData(EXAMPLE_DATA.sources);
    sourcesChart.createChart();

    shareChart = new ShareChart();
    shareChart.setData(EXAMPLE_DATA.share);
    shareChart.createChart();
})(jQuery, Highcharts, EXAMPLE_DATA);