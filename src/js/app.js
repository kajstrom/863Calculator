var Calculator = new Marionette.Application({
    initialize: function () {

    }
});

Calculator.Layout = require("./Layout.js");


Calculator.on("start", function () {
    this.rootLayout = new Marionette.LayoutView({
        el: "body",
        regions: {
            calculator: "#calculator"
        }
    });

    this.rootLayout.calculator.show(
        new Calculator.Layout()
    )
});

$(document).ready(function () {
    Calculator.start();
});
