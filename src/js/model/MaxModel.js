var Backbone = require("backbone");

var MaxModel = Backbone.Model.extend({
    defaults: {
        squat: 0,
        bench: 0,
        ohp: 0,
        deadlift: 0,
        deloadMethod: 1
    },

    notEmpty() {
        if (this.get("squat") > 0 ||
            this.get("bench") > 0 ||
            this.get("ohp") > 0 ||
            this.get("deadlift") > 0)  {
            return true;
        }

        return false;
    }
});

module.exports = MaxModel;