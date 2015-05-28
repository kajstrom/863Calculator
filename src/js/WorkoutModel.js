var Backbone = require("backbone");

var WorkoutModel = Backbone.Model.extend({
    liftMax: 0,
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
        var calculationMax = this.liftMax * 0.9,
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
            minWeightStep = 2.5;

        //Calculate the set weight.
        var setWeight = calculationMax * percentageAsDecimal;

        //Since the available plates usually go at 1.25 kg min, we must round to the nearest 2.5 kg.
        var modulus = setWeight % minWeightStep;
        var plates = setWeight / minWeightStep;
        plates = Math.floor(plates);

        modulus = Math.round(modulus);
        plates += modulus;

        return plates * minWeightStep;
    }
});

module.exports = WorkoutModel;