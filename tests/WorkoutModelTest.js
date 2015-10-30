var WorkoutModel = require("../src/js/WorkoutModel.js");

describe('WorkoutModel', function(){
    describe('calculate', function(){
        it('should calculate sets properly from integers', function(){
            var model = new WorkoutModel(null, {
                max: 100
            });

            expect(model.get("week1_set1_weight")).toBe(57.5);
            expect(model.get("week1_set2_weight")).toBe(67.5);
            expect(model.get("week1_set3_weight")).toBe(72.5);

            expect(model.get("week2_set1_weight")).toBe(62.5);
            expect(model.get("week2_set2_weight")).toBe(72.5);
            expect(model.get("week2_set3_weight")).toBe(77.5);

            expect(model.get("week3_set1_weight")).toBe(67.5);
            expect(model.get("week3_set2_weight")).toBe(77.5);
            expect(model.get("week3_set3_weight")).toBe(80);

            expect(model.get("week4_set1_weight")).toBe(35);
            expect(model.get("week4_set2_weight")).toBe(45);
            expect(model.get("week4_set3_weight")).toBe(55);
        });

        it('should calculate sets properly from decimal numbers', function () {
            var model = new WorkoutModel(null, {
                max: 132.5
            });

            expect(model.get("week1_set1_weight")).toBe(77.5);
            expect(model.get("week1_set2_weight")).toBe(90);
            expect(model.get("week1_set3_weight")).toBe(95);

            expect(model.get("week2_set1_weight")).toBe(82.5);
            expect(model.get("week2_set2_weight")).toBe(95);
            expect(model.get("week2_set3_weight")).toBe(102.5);

            expect(model.get("week3_set1_weight")).toBe(90);
            expect(model.get("week3_set2_weight")).toBe(102.5);
            expect(model.get("week3_set3_weight")).toBe(107.5);

            expect(model.get("week4_set1_weight")).toBe(47.5);
            expect(model.get("week4_set2_weight")).toBe(60);
            expect(model.get("week4_set3_weight")).toBe(72.5);

        })
    })
});