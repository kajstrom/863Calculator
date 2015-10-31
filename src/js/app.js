var $ = require("jquery");
var Backbone = require("backbone");
var Marionette = require("backbone.marionette");
var Calculator = new Marionette.Application();
var Router = require("./Router.js");

Calculator.on("start", function () {
    Calculator.rootLayout = new Marionette.LayoutView({
        el: "body",
        regions: {
            calculator: "#calculator"
        }
    });

    var router = new Router({
        container: this.rootLayout.calculator
    });

    Backbone.history.start();
});

$(document).ready(() => {
    Calculator.start();
});
