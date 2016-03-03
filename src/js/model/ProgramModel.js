const
    Backbone = require("backbone"),
    WorkoutModel = require("./WorkoutModel.js");

var ProgramModel = Backbone.Model.extend({
    liftMax: 0,
    deloadMethod: 1,
    /**
     * @type {Number} The multiplier calculated off each set before the actual percentage calculation is done.
     */
    trainingMaxMultiplier: 0.9,
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
        this.deloadMethod = options.deloadMethod || this.deloadMethod;
        this.set("workouts", new Backbone.Collection());
        this.calculate();
    },

    calculate() {
        this.get("workouts").add([
            this._makeWorkout(1, "Week 1"),
            this._makeWorkout(2, "Week 2"),
            this._makeWorkout(3, "Week 3"),
            this._makeDeloadWorkout("Week 4, Deload")
        ]);
    },

    _trainingMax() {
        return this.liftMax * this.trainingMaxMultiplier;
    },

    _makeWorkout(number, name) {
        return new WorkoutModel({
            name: name,
            set1_reps: this.get("week" + number + "_set1_reps"),
            set1_percentage: this.get("week" + number + "_set1_percentage"),
            set2_reps: this.get("week" + number + "_set2_reps"),
            set2_percentage: this.get("week" + number + "_set2_percentage"),
            set3_reps: this.get("week" + number + "_set3_reps"),
            set3_percentage: this.get("week" + number + "_set3_percentage"),
            calculationMax: this._trainingMax()
        })
    },

    _makeDeloadWorkout(name) {
        switch (this.deloadMethod) {
            case 1:
                return new WorkoutModel({
                    name: name,
                    set1_reps: 8,
                    set1_percentage: 40,
                    set2_reps: 8,
                    set2_percentage: 50,
                    set3_reps: 8,
                    set3_percentage: 60,
                    calculationMax: this._trainingMax()
                });
            case 2:
                return new WorkoutModel({
                    name: name,
                    set1_reps: 6,
                    set1_percentage: this.get("week1_set1_percentage"),
                    set2_reps: 6,
                    set2_percentage: this.get("week1_set2_percentage"),
                    set3_reps: 6,
                    set3_percentage: this.get("week1_set3_percentage"),
                    calculationMax: this._trainingMax()
                });
                break;
        }
    }
});

module.exports = ProgramModel;