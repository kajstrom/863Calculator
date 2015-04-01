var MaxForm = Marionette.ItemView.extend({
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

module.exports = MaxForm;