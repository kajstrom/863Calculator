const Backbone = require("backbone");

let WorkoutModel = Backbone.Model.extend({
    initialize() {
        this.calculate();
    },

    calculate() {
        this.set({
            "set1_weight": this._calculateFromPercentage(this.get("set1_percentage"), this.get("calculationMax")),
            "set2_weight": this._calculateFromPercentage(this.get("set2_percentage"), this.get("calculationMax")),
            "set3_weight": this._calculateFromPercentage(this.get("set3_percentage"), this.get("calculationMax"))
        });
    },

    _calculateFromPercentage(percentage, calculationMax) {
        var percentageAsDecimal = percentage / 100,
            minWeightStep = 2.5,
            setWeight = calculationMax * percentageAsDecimal;

        return Math.round(setWeight / minWeightStep) * minWeightStep;
    }
});

module.exports = WorkoutModel;