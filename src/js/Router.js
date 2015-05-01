var Layout = require("./Layout.js");
var MaxModel = require("./MaxModel.js");

var Router = Marionette.AppRouter.extend({
    routes: {
        "": "emptyForm",
        "squat/:squat/bench/:bench/ohp/:ohp/deadlift/:deadlift": "filledForm"
    },

    initialize: function (options) {
        this.container = options.container
    },

    emptyForm: function () {

        this.container.show(
            new Layout({
                model: new MaxModel()
            })
        )
    },

    filledForm: function (squat, bench, ohp, deadlift) {
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