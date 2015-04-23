var WorkoutTable = Marionette.ItemView.extend({
    template: require("../templates/workouts-table-tpl.ejs"),
    tagName: "table",
    className: "table"
});

module.exports = WorkoutTable;