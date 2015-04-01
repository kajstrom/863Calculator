var WorkoutModel = require("./WorkoutModel.js");
var WorkoutsLayout = require("./WorkoutsLayout.js");
var MaxModel = require("./MaxModel.js");
var MaxForm = require("./MaxForm.js");

var Layout = Marionette.LayoutView.extend({
    template: "#calculator-tpl",
    regions: {
        form: ".form-container",
        workouts: ".workouts-container"
    },

    onRender: function () {
        var maxModel = new MaxModel(),
            maxForm = new MaxForm({
                model: maxModel
            });
        this.form.show(maxForm);

        this.listenTo(maxForm, "calculate", function (model) {
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

            this.workouts.show(workoutsLayout);
        });
    }
});

module.exports = Layout;