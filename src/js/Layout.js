var Backbone = require("backbone");
var Marionette = require("backbone.marionette");
var ProgramModel = require("./model/ProgramModel.js");
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
        let deloadMethod = model.get("deloadMethod");

        var squatModel = new ProgramModel(null, {max: model.get("squat"), deloadMethod}),
            benchModel = new ProgramModel(null, {max: model.get("bench"), deloadMethod}),
            ohpModel = new ProgramModel(null, {max: model.get("ohp"), deloadMethod}),
            deadliftModel = new ProgramModel(null, {max: model.get("deadlift"), deloadMethod});

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
            + "/deloadMethod/" + deloadMethod
        );
        this.workouts.show(workoutsLayout);
    }
});

module.exports = Layout;