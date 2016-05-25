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
    var facetDateChart,
        facetPageSupertypeChart,
        facetLangDetectedChart,
        facetPhrasesChart,
        hcColors;

    hcColors = ['#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE', '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92', '#993BA7', '#4EA73E', '#43A7A0', '#A7943D', '#A76A3B'];

    function DateChart () {
        this.chart = undefined;
        this.defaultSeriesType = 'spline';

        this.lut = {};

        this.config = {
            chart: {
                renderTo: 'chart-facet-date',
                defaultSeriesType: this.defaultSeriesType,
                marginTop: 70
            },
            title: {
                text: 'Volume',
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
                }
            },
            legend: {
                enabled: false,
                borderWidth: 0
            },
            series: []
        };

        this.data = {};
    }
    
    DateChart.prototype._fixData = function (list) {
        var tmpData = [],
            prop;

        for (prop in list) {
            if (list.hasOwnProperty(prop) && !_.includes(['gap', 'start', 'end'], prop)) {
                tmpData.push([
                    new Date(prop).getTime(),
                    Number(list[prop])
                ]);
            }
        }

        return tmpData;
    };

    DateChart.prototype.setData = function (data) {
        this.data = $.extend({}, this.config);
        
        data = this._fixData($.extend({}, data));

        if (_.isEmpty(data)) {
            return;
        }

        // Add serie
        this.data.series.push({
            // name: 'Volume',
            data: data,
            color: '#4572A7'
        });
    };

    DateChart.prototype.createChart = function () {
        this.chart = new Highcharts.Chart(this.data);
    };

    function PageSuperTypeChart () {
        this.chart = undefined;
        this.defaultSeriesType = 'pie';

        this.lut = {
            social: '#4f81bd',
            news: '#8dc7b8',
            blog: '#f26007',
            forum: '#ed9254',
            video: '#a7bd5b',
            reviews: '#619E4A',
            other: '#7a7a7a'
        };

        this.config = {
            chart: {
                renderTo: 'chart-facet-page_supertype',
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
                type: 'linear',
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
                }
            },
            legend: {
                // enabled: false,
                borderWidth: 0
            },
            series: []
        };

        this.data = {};
    }

    PageSuperTypeChart.prototype._fixData = function (list) {
        var tmpData = [],
            _this = this;

        // Fix facet
        if (!_.isEmpty(list)) {
            tmpData = _.map(list, function (item, i) {
                return {
                    name: item.label,
                    y: item.value,
                    color: _this.getColor(item.label, i)
                };
            });
        }

        return tmpData;
    };

    PageSuperTypeChart.prototype.setData = function (data) {
        this.data = $.extend({}, this.config);

        data = this._fixData($.extend({}, data));

        if (_.isEmpty(data)) {
            return;
        }

        // Add serie
        this.data.series.push({
            // name: 'Sources',
            // color: '#4572A7',
            data: data
        });
    };

    PageSuperTypeChart.prototype.getColor = function (serie, serieIndex) {
        var self = this,
            color,
            colors = hcColors,
            unusedColors;

        if (this.lut && this.lut.hasOwnProperty(serie)) {
            color = this.lut[serie];
        } else {
            unusedColors = _.reject(colors, function (color) {
                return _.include(_.values(self.lut), color);
            });

            color = unusedColors[serieIndex];
        }

        return color;
    };

    PageSuperTypeChart.prototype.createChart = function () {
        this.chart = new Highcharts.Chart(this.data);
    };

    function LangDetectedChart () {
        this.chart = undefined;
        this.defaultSeriesType = 'pie';

        this.lut = {
            'afrikaans': '#CD5C5C',
            'albanian': '#ADFF2F',
            'alemannich': '#FFF8DC',
            'amharic': '#FFC0CB',
            'arabic': '#FFA07A',
            'armenian': '#FFF5EE',
            'asturian': '#FFD700',
            'basque': '#00FFFF',
            'belarus': '#E6E6FA',
            'belarusian': '#DCDCDC',
            'bosnian': '#F08080',
            'breton': '#FA8072',
            'bulgarian': '#E9967A',
            'catalan': '#FFA07A',
            'chinese': '#DC143C',
            'chuvash': '#B22222',
            'croatian': '#7FFF00',
            'czech': '#00FF00',
            'danish': '#32CD32',
            'dutch': '#98FB98',
            'english': '#8B4513',
            'esperanto': '#00FF7F',
            'estonian': '#3CB371',
            'faroese': '#228B22',
            'farsi': '#9ACD32',
            'finnish': '#556B2F',
            'french': '#66CDAA',
            'galician': '#8FBC8F',
            'german': '#20B2AA',
            'greek': '#008B8B',
            'hebrew': '#FFDEAD',
            'hindi': '#DEB887',
            'hungarian': '#BC8F8F',
            'icelandic': '#F4A460',
            'ido': '#DAA520',
            'indonesian': '#B8860B',
            'interlingua': '#CD853F',
            'irish': '#D2691E',
            'italian': '#00FA9A',
            'japanese': '#A0522D',
            'javanese': '#A52A2A',
            'korean': '#FF69B4',
            'kurdish': '#DB7093',
            'latin': '#FF8C00',
            'latvian': '#FFFF00',
            'limburgish': '#FFEFD5',
            'lituanian': '#FFE4B5',
            'low': '#FFDAB9',
            'luxembourgish': '#BDB76B',
            'macedonian': '#E0FFFF',
            'malay': '#AFEEEE',
            'marathi': '#7FFFD4',
            'min': '#40E0D0',
            'norwegian_bokmal': '#5F9EA0',
            'norwegian_nynorsk': '#4682B4',
            'occitan': '#B0C4DE',
            'ossetic': '#B0E0E6',
            'persian': '#ADD8E6',
            'polish': '#00BFFF',
            'portuguese': '#BA55D3',
            'romanian': '#6495ED',
            'russian': '#7B68EE',
            'scots': '#4169E1',
            'serbian': '#A9A9A9',
            'serbo': '#778899',
            'slovak': '#2F4F4F',
            'slovenian': '#FF00FF',
            'spanish': '#1E90FF',
            'swedish': '#9370DB',
            'tagalog': '#8A2BE2',
            'thai': '#8B008B',
            'tamil': '#4B0082',
            'tatar': '#483D8B',
            'turkish': '#7B68EE',
            'ukrainian': '#DC143C',
            'ukranian': '#DEB887',
            'vietnamese': '#DAA520',
            'walloon': '#CD853F',
            'welsh': '#D2691E',
            'western': '#8B4513',
            'yiddish': '#A0522D',
            'UNKNOWN': '#a6a6a6'
        };

        this.config = {
            chart: {
                renderTo: 'chart-facet-langDetected',
                defaultSeriesType: this.defaultSeriesType,
                marginTop: 70
            },
            title: {
                text: 'Languages',
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
                type: 'linear',
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
                }
            },
            legend: {
                // enabled: false,
                borderWidth: 0
            },
            series: []
        };

        this.data = {};
    }

    LangDetectedChart.prototype._fixData = function (list) {
        var tmpData = [],
            _this = this;

        // Fix facet
        if (!_.isEmpty(list)) {
            tmpData = _.map(list, function (item, i) {
                return {
                    name: item.label,
                    y: item.value,
                    color: _this.getColor(item.label, i)
                };
            });
        }

        return tmpData;
    };

    LangDetectedChart.prototype.setData = function (data) {
        this.data = $.extend({}, this.config);

        data = this._fixData($.extend({}, data));

        if (_.isEmpty(data)) {
            return;
        }

        // Add serie
        this.data.series.push({
            // name: 'Languages',
            // color: '#4572A7',
            data: data
        });
    };

    LangDetectedChart.prototype.getColor = function (serie, serieIndex) {
        var self = this,
            color,
            colors = hcColors,
            unusedColors;

        if (this.lut && this.lut.hasOwnProperty(serie)) {
            color = this.lut[serie];
        } else {
            unusedColors = _.reject(colors, function (color) {
                return _.include(_.values(self.lut), color);
            });

            color = unusedColors[serieIndex];
        }

        return color;
    };

    LangDetectedChart.prototype.createChart = function () {
        this.chart = new Highcharts.Chart(this.data);
    };

    function PhrasesChart () {
        this.fontMin = 8;
        this.fontMax = 60;
        this.chart = undefined;
        this.$element = $('#chart-facet-phrases');
        // this.$element = document.getElementById('chart-facet-phrases');
        // this.$element = 'chart-facet-phrases';
        this.data = {};
    }

    PhrasesChart.prototype.setData = function (data) {
        if (_.isEmpty(data)) {
            return;
        }

        this.data = $.extend([], data);
    };

    PhrasesChart.prototype.createChart = function () {
        this.chart = new WordcloudRenderer();

        this.chart.render(this.data, this.$element, this.fontMin, this.fontMax);
    };

    facetDateChart = new DateChart();
    facetDateChart.setData(EXAMPLE_DATA.facet_counts.facet_dates.date);
    facetDateChart.createChart();

    facetPageSupertypeChart = new PageSuperTypeChart();
    facetPageSupertypeChart.setData(EXAMPLE_DATA.facet_counts.facet_fields.page_supertype);
    facetPageSupertypeChart.createChart();

    facetLangDetectedChart = new LangDetectedChart();
    facetLangDetectedChart.setData(EXAMPLE_DATA.facet_counts.facet_fields.langDetected);
    facetLangDetectedChart.createChart();

    facetPhrasesChart = new PhrasesChart();
    facetPhrasesChart.setData(EXAMPLE_DATA.facet_counts.facet_fields.phrases);
    facetPhrasesChart.createChart();
})(jQuery, Highcharts, EXAMPLE_DATA);
