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
        this.form.show(
            new Calculator.MaxForm()
        );
    }
});

Calculator.MaxForm = Marionette.ItemView.extend({
    template: "#maxform-tpl",
    tagName: "form",
    events: {
        "click .js-calculate": "calculate"
    },

    calculate: function () {
        console.log("calculate");
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
