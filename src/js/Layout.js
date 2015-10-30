var Backbone = require("backbone");
var Marionette = require("backbone.marionette");
var WorkoutModel = require("./WorkoutModel.js");
var WorkoutsLayout = require("./WorkoutsLayout.js");
var MaxForm = require("./MaxForm.js");

var Layout = Marionette.LayoutView.extend({
    template: require("../templates/calculator-tpl.ejs"),
    regions: {
        form: ".form-container",
        workouts: ".workouts-container"
    },

    onRender() {
        var maxForm = new MaxForm({
                model: this.model
            });
        this.form.show(maxForm);

        if (this.model.notEmpty()) {
            this.showWorkouts(this.model);
        }

        this.listenTo(maxForm, "calculate", (model) => {
            this.showWorkouts(model);
        });
    },

    /**
     * Generate and show workouts.
     * @param {Backbone.Model} model Max lifts model used for calculating the workouts.
     */
    showWorkouts(model) {
        var squatModel = new WorkoutModel(null, {max: model.get("squat")}),
            benchModel = new WorkoutModel(null, {max: model.get("bench")}),
            ohpModel = new WorkoutModel(null, {max: model.get("ohp")}),
            deadliftModel = new WorkoutModel(null, {max: model.get("deadlift")});

        var workoutsLayout = new WorkoutsLayout({
            squatModel: squatModel,
            benchModel: benchModel,
            ohpModel: ohpModel,
            deadliftModel: deadliftModel
        });

        Backbone.history.navigate(
            "squat/" + model.get("squat")
            + "/bench/" + model.get("bench")
            + "/ohp/" + model.get("ohp")
            + "/deadlift/" + model.get("deadlift")
        );
        this.workouts.show(workoutsLayout);
    }
});

module.exports = Layout;