const
    Marionette = require("backbone.marionette"),
    WorkoutView = require("./workout.js");

let ProgramTable = Marionette.CollectionView.extend({
    tagName: "div",
    childView: WorkoutView
});

module.exports = ProgramTable;