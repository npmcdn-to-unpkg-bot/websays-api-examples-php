"use strict";

(function (window, $, WordCloud) {
    function WordcloudRenderer() {
        this.xMin = 0;
        this.xMax = 0;
        this.fontMin = 10;
        this.fontMax = 80;
        this.colorIndex = 0;
        this.cloudColors = ['#eb3400', '#586b00', '#273a00', '#f77c00', '#7c7c1f', '#f8db24', '#f6c828',
            '#630005', '#6c0013', '#676500'];
    }

    WordcloudRenderer.prototype.render = function (dataList, element, fontMin, fontMax) {
        var _this = this,
            cloudList = [];

        this.fontMin = fontMin || 10;
        this.fontMax = fontMax || 80;

        if (!_.isEmpty(dataList)) {
            this.xMax = Number(dataList[0].value) || 0;
            this.xMin = Number(dataList[dataList.length - 1].value) || 0;

            // From {label: "pepito", value: 345}
            // To => ["pepito", 345]
            cloudList = _.map(dataList, function (item) {
                return [item.label, Number(item.value)];
            });
        }

        setTimeout(function () {
            //this.$cloud.height(300);

            WordCloud(element[0], {
                list: cloudList,
                weightFactor: function (weight) {
                    return _this._cloudWeightFactor(weight);
                },
                minRotation: 0,
                maxRotation: 0,
                fontFamily: '"Helvetica", "Arial", "sans-serif"',
                color: function (/*word, weight, fontSize, distance, theta*/) {
                    return _this._colorHandle();
                }
            });
        }, 33); // 33ms
    };

    /**
     *
     * @param weight Frequency
     * @returns Integer
     */
    WordcloudRenderer.prototype._cloudWeightFactor = function (weight) {
        var xPart;

        //return (weight * 125) / this.xMax;
        //return Math.log(weight) * 125 / Math.log(this.xMax);

        // this.fontMin, this.fontMax

        if (this.xMax === this.xMin) {
            xPart = 1;
        } else {
            xPart = (weight - this.xMin) / (this.xMax - this.xMin);
        }

        return xPart * (this.fontMax - this.fontMin) + this.fontMin;
    };

    WordcloudRenderer.prototype._colorHandle = function () {
        var color;

        if (this.colorIndex >= this.cloudColors.length) {
            this.colorIndex = 0;
        }

        color = this.cloudColors[this.colorIndex];

        this.colorIndex++;

        return color;
    };

    window.WordcloudRenderer = WordcloudRenderer;
})(window, jQuery, WordCloud);
