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
    var ccItemChartList = [];

    function CorporateChannelsChart () {
        this.chart = undefined;
        this.defaultSeriesType = 'spline';

        this.lut = {};

        this.config = {
            chart: {
                renderTo: null,
                height: 160,
                defaultSeriesType: this.defaultSeriesType,
                marginRight: 20 // To show complete date
            },
            title: {
                text: null
            },
            xAxis: {
                type: 'datetime',
                title: {
                    text: null
                }
            },
            yAxis: {
                min: null,
                title: {
                    text: null
                },
                stackLabels: {
                    enabled: false
                }
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
                areaspline: {
                    stacking: 'normal'
                }
            },
            legend: {
                borderWidth: 0
            },
            series: []
        };

        this.data = {};
    }

    CorporateChannelsChart.prototype._fixData = function (serieList) {
        var _this = this;

        return _.map(serieList, function (serie, i) {
            return {
                type: _this.defaultSeriesType,
                // color: _this._getColor(serie.name, i),
                name: serie.name,
                data: serie.data
            }
        });
    };

    CorporateChannelsChart.prototype.setData = function (data) {
        var newSeries;

        this.data = $.extend({}, this.config);
        
        this.data.chart.renderTo = $('#corporate-channel-' + data.account.profile_id + '-' + data.account.type + '-' + data.account.type_id + ' figure.corporate-channels-highcharts-chart')[0];

        newSeries = this._fixData($.extend({}, data.chart.series));

        if (_.isEmpty(newSeries)) {
            return;
        }

        // Add serie
        this.data.series = newSeries;
    };

    CorporateChannelsChart.prototype.createChart = function () {
        this.chart = new Highcharts.Chart(this.data);
    };

    EXAMPLE_DATA.forEach(function (ccItem) {
        var ccItemChart = new CorporateChannelsChart();
        ccItemChart.setData(ccItem);
        ccItemChart.createChart();

        ccItemChartList.push(ccItemChart);
    });
})(jQuery, Highcharts, EXAMPLE_DATA);
