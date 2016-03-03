const
    Backbone = require("backbone"),
    WorkoutModel = require("./WorkoutModel.js");

var ProgramModel = Backbone.Model.extend({
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

    initialize(data, options) {
        this.liftMax = options.max;
        this.set("workouts", new Backbone.Collection());
        this.calculate();
    },

    calculate() {
        var calculationMax = this.liftMax * this.initialMultiplier;

        this.get("workouts").add([
            this._makeWorkout(1, calculationMax, "Week 1"),
            this._makeWorkout(2, calculationMax, "Week 2"),
            this._makeWorkout(3, calculationMax, "Week 3"),
            this._makeWorkout(4, calculationMax, "Week 4, Deload")
        ]);
    },

    _makeWorkout(number, calculationMax, name) {
        return new WorkoutModel({
            name: name,
            set1_reps: this.get("week" + number + "_set1_reps"),
            set1_percentage: this.get("week" + number + "_set1_percentage"),
            set2_reps: this.get("week" + number + "_set2_reps"),
            set2_percentage: this.get("week" + number + "_set2_percentage"),
            set3_reps: this.get("week" + number + "_set3_reps"),
            set3_percentage: this.get("week" + number + "_set3_percentage"),
            calculationMax: calculationMax
        })
    }
});

module.exports = ProgramModel;