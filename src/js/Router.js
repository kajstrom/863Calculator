var Marionette = require("backbone.marionette");
var Layout = require("./Layout.js");
var MaxModel = require("./model/MaxModel.js");

var Router = Marionette.AppRouter.extend({
    routes: {
        "": "emptyForm",
        "squat/:squat/bench/:bench/ohp/:ohp/deadlift/:deadlift": "filledForm"
    },

    initialize(options) {
        this.container = options.container;
    },

    emptyForm () {
        this.container.show(
            new Layout({
                model: new MaxModel()
            })
        );
    },

    filledForm (squat, bench, ohp, deadlift) {
        var maxModel = new MaxModel({
            squat: squat,
            bench: bench,
            ohp: ohp,
            deadlift: deadlift
        });
        var layout = new Layout({
            model: maxModel
        });

        this.container.show(
            layout
        )
    }
});

module.exports = Router;