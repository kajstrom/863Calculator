var WorkoutTable = Marionette.ItemView.extend({
    template: "#workouts-table-tpl",
    tagName: "table",
    className: "table"
});

module.exports = WorkoutTable;