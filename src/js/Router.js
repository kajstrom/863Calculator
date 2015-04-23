var Router = Marionette.AppRouter.extend({
    routes: {
        "squat/:squat/bench/:bench/ohp/:ohp/deadlift/:deadlift": "fillForm"
    },

    fillForm: function (squat, bench, ohp, deadlift) {
        console.log(squat, bench, ohp, deadlift);
    }
});

module.exports = Router;