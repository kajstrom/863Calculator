var Marionette = require("backbone.marionette");

var WorkoutTable = Marionette.ItemView.extend({
    template: require("../templates/workouts-table-tpl.ejs"),
    tagName: "table",
    className: "table",

    serializeData() {
        let attrs = this.model.attributes;

        attrs.week1 = attrs.week1.toJSON();
        attrs.week2 = attrs.week2.toJSON();
        attrs.week3 = attrs.week3.toJSON();
        attrs.week4 = attrs.week4.toJSON();

        return attrs;
    }
});

module.exports = WorkoutTable;