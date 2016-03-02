var WorkoutModel = require("../src/js/model/WorkoutModel.js");

describe("WorkoutModel", () => {
    it("calculation should result in values matching percentages", () => {
        let aWorkOutModel = new WorkoutModel({
            set1_reps: 8,
            set1_percentage: 80,
            set2_reps: 8,
            set2_percentage: 90,
            set3_reps: 8,
            set3_percentage: 100,
            calculationMax: 100
        });

        expect(aWorkOutModel.get("set1_weight")).toBe(80);
        expect(aWorkOutModel.get("set2_weight")).toBe(90);
        expect(aWorkOutModel.get("set3_weight")).toBe(100);
    });
});