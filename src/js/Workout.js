const Marionette = require("backbone.marionette");

let WorkoutView = Marionette.ItemView.extend({
    template: require("../templates/workout-tpl.ejs"),
    tagName: "table",
    className: "table"
});

module.exports = WorkoutView;