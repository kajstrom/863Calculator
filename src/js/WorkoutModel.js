var Backbone = require("backbone");

var WorkoutModel = Backbone.Model.extend({
    liftMax: 0,
    /**
     * @type {Number} The multiplier calculated off each set before the actual percentage calculation is done.
     */
    initialMultiplier: 0.9,
    defaults: {
        week1_set1_reps: 8,
        week1_set1_weight: 0,
        week1_set1_percentage: 65,
        week1_set2_reps: 8,
        week1_set2_weight: 0,
        week1_set2_percentage: 75,
        week1_set3_reps: 8,
        week1_set3_weight: 0,
        week1_set3_percentage: 80,
        week2_set1_reps: 6,
        week2_set1_weight: 0,
        week2_set1_percentage: 70,
        week2_set2_reps: 6,
        week2_set2_weight: 0,
        week2_set2_percentage: 80,
        week2_set3_reps: 6,
        week2_set3_weight: 0,
        week2_set3_percentage: 85,
        week3_set1_reps: 8,
        week3_set1_weight: 0,
        week3_set1_percentage: 75,
        week3_set2_reps: 6,
        week3_set2_weight: 0,
        week3_set2_percentage: 85,
        week3_set3_reps: 3,
        week3_set3_weight: 0,
        week3_set3_percentage: 90,
        week4_set1_reps: 8,
        week4_set1_weight: 0,
        week4_set1_percentage: 40,
        week4_set2_reps: 8,
        week4_set2_weight: 0,
        week4_set2_percentage: 50,
        week4_set3_reps: 8,
        week4_set3_weight: 0,
        week4_set3_percentage: 60
    },

    initialize: function (data, options) {
        this.liftMax = options.max;
        this.calculate();
    },

    calculate: function () {
        var calculationMax = this.liftMax * this.initialMultiplier,
            setPercentageKey = "",
            setWeightKey = "";

        for(var week = 1;week <= 4;week++) {
            for(var setNo = 1;setNo <= 3;setNo++) {
                setPercentageKey = "week" + week + "_set" + setNo + "_percentage";
                setWeightKey = "week" + week + "_set" + setNo + "_weight";

                this.set(setWeightKey, this.calculateSet(calculationMax, this.get(setPercentageKey)));
            }
        }
    },

    /**
     * Calculate a set's weight to be used.
     * @param {Number} calculationMax
     * @param {Number} percentage
     */
    calculateSet: function (calculationMax, percentage) {
        var percentageAsDecimal = percentage / 100,
            minWeightStep = 2.5,
            setWeight = calculationMax * percentageAsDecimal;

        return Math.round(setWeight / minWeightStep) * minWeightStep;
    }
});

module.exports = WorkoutModel;