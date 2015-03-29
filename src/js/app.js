var Calculator = new Marionette.Application({
    initialize: function () {

    }
});

Calculator.Layout = Marionette.LayoutView.extend({
    template: "#calculator-tpl",
    regions: {
        form: ".form-container",
        workouts: ".workouts-container"
    },

    onRender: function () {
        var maxModel = new Calculator.MaxModel(),
            maxForm = new Calculator.MaxForm({
                model: maxModel
            });
        this.form.show(maxForm);

        this.listenTo(maxForm, "calculate", function (model) {
            var squatModel = new Calculator.WorkoutModel(null, {max: model.get("squat")}),
                benchModel = new Calculator.WorkoutModel(null, {max: model.get("bench")}),
                ohpModel = new Calculator.WorkoutModel(null, {max: model.get("ohp")}),
                deadliftModel = new Calculator.WorkoutModel(null, {max: model.get("deadlift")});

            var workoutsLayout = new Calculator.WorkoutsLayout({
                squatModel: squatModel,
                benchModel: benchModel,
                ohpModel: ohpModel,
                deadliftModel: deadliftModel
            });

            this.workouts.show(workoutsLayout);
        });
    }
});

Calculator.MaxForm = Marionette.ItemView.extend({
    template: "#maxform-tpl",
    tagName: "form",
    events: {
        "click .js-calculate": "calculate"
    },
    ui: {
        bench: "#bench1RM",
        squat: "#squat1RM",
        ohp: "#ohp1RM",
        deadlift: "#deadlift1RM"
    },

    calculate: function () {
        this.model.set({
            bench: this.ui.bench.val(),
            squat: this.ui.squat.val(),
            ohp: this.ui.ohp.val(),
            deadlift: this.ui.deadlift.val()
        });

        this.trigger("calculate", this.model);
    }
});

Calculator.WorkoutTable = Marionette.ItemView.extend({
    template: "#workouts-table-tpl",
    tagName: "table",
    className: "table"
});

Calculator.EmptyWorkoutTable = Calculator.WorkoutTable.extend({
    template: "#workout-empty-tpl"
});

Calculator.WorkoutsLayout = Marionette.LayoutView.extend({
    template: "#workouts-layout-tpl",
    className: "row",
    regions: {
        squat: ".squat-container",
        bench: ".bench-container",
        ohp: ".ohp-container",
        deadlift: ".deadlift-container"
    },

    initialize: function (options) {
        this.squatModel = options.squatModel;
        this.benchModel = options.benchModel;
        this.ohpModel = options.ohpModel;
        this.deadliftModel = options.deadliftModel;
    },

    onRender: function () {
        this.squat.show(
            new Calculator.WorkoutTable({
                model: this.squatModel
            })
        );
        this.bench.show(
            new Calculator.WorkoutTable({
                model: this.benchModel
            })
        );
        this.ohp.show(
            new Calculator.WorkoutTable({
                model: this.ohpModel
            })
        );
        this.deadlift.show(
            new Calculator.WorkoutTable({
                model: this.deadliftModel
            })
        );
    }
});

Calculator.MaxModel = Backbone.Model.extend({
    defaults: {
        squat: 0,
        bench: 0,
        ohp: 0,
        deadlift: 0
    }
});

Calculator.WorkoutModel = Backbone.Model.extend({
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


Calculator.on("start", function () {
    this.rootLayout = new Marionette.LayoutView({
        el: "body",
        regions: {
            calculator: "#calculator"
        }
    });

    console.log("Running");
    this.rootLayout.calculator.show(
        new Calculator.Layout()
    )
});

$(document).ready(function () {
    Calculator.start();
});
