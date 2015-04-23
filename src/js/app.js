var Calculator = new Marionette.Application();

Calculator.Layout = require("./Layout.js");
var Router = require("./Router.js");

Calculator.on("start", function () {
    this.rootLayout = new Marionette.LayoutView({
        el: "body",
        regions: {
            calculator: "#calculator"
        }
    });

    var router = new Router();

    Backbone.history.start();

    this.rootLayout.calculator.show(
        new Calculator.Layout()
    )
});

$(document).ready(function () {
    Calculator.start();
});
