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

        this.workouts.show(
            new Calculator.WorkoutsLayout()
        )
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

Calculator.WorkoutTable = Marionette.ItemView.extend({
    template: "#workouts-table-tpl",
    tagName: "table",
    className: "table"
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

    onRender: function () {
        this.squat.show(
            new Calculator.WorkoutTable()
        );
        this.bench.show(
            new Calculator.WorkoutTable()
        );
        this.ohp.show(
            new Calculator.WorkoutTable()
        );
        this.deadlift.show(
            new Calculator.WorkoutTable()
        );
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
