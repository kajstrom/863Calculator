var MaxForm = require("../src/js/MaxForm.js");

describe("MaxForm", () => {
    describe("calculate", () => {
        var TestModel = Backbone.Model.extend();

        it("when called triggers 'calculate' event", () => {
           var triggered = false;

            var testModel = new TestModel({
                squat: 0,
                bench: 0,
                ohp: 0,
                deadlift: 0
            });

           var maxForm = new MaxForm({
              model: testModel
           });

            maxForm.on("calculate", () => {
                triggered = true;
            });

            maxForm.render();
            maxForm.calculate();

            expect(triggered).toBe(true);
        });

        it("reads max reps from correct fields", () => {
            var testModel = new TestModel({
                squat: 0,
                bench: 0,
                ohp: 0,
                deadlift: 0
            });

            var maxForm = new MaxForm({
                model: testModel
            });

            maxForm.render();

            var $el = maxForm.$el;

            $el.find("#squat1RM").val(100);
            $el.find("#bench1RM").val(200);
            $el.find("#ohp1RM").val(300);
            $el.find("#deadlift1RM").val(400);

            maxForm.calculate();

            expect(testModel.get("squat")).toBe("100");
            expect(testModel.get("bench")).toBe("200");
            expect(testModel.get("ohp")).toBe("300");
            expect(testModel.get("deadlift")).toBe("400");
        });
    })
});