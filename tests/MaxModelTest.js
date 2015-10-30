var MaxModel = require("../src/js/MaxModel.js");

describe("MaxModel", () => {
    describe("notEmpty", () => {
       it("when values are empty returns false", () => {
           var maxModel = new MaxModel();

           expect(maxModel.notEmpty()).toBe(false);
        });

        it("when values are set returns true", () => {
            var maxModel = new MaxModel({
                squat: 100,
                bench: 100,
                ohp: 100,
                deadlift: 100
            });

            expect(maxModel.notEmpty()).toBe(true);
        });
    });
});