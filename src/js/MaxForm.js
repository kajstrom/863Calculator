var Marionette = require("backbone.marionette");

var MaxForm = Marionette.ItemView.extend({
    template: require("../templates/maxform-tpl.ejs"),
    tagName: "form",
    events: {
        "click .js-calculate": "calculate"
    },
    ui: {
        bench: "#bench1RM",
        squat: "#squat1RM",
        ohp: "#ohp1RM",
        deadlift: "#deadlift1RM",
        deloadMethod: "#deloadMethod"
    },

    onRender() {
        this.ui.deloadMethod.val(this.model.get("deloadMethod"));
    },

    calculate() {
        this.model.set({
            bench: this.ui.bench.val(),
            squat: this.ui.squat.val(),
            ohp: this.ui.ohp.val(),
            deadlift: this.ui.deadlift.val(),
            deloadMethod: parseInt(this.ui.deloadMethod.val(), 10)
        });

        this.trigger("calculate", this.model);
    }
});

module.exports = MaxForm;