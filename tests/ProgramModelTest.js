var ProgramModel = require("../src/js/model/ProgramModel.js");

describe('ProgramModel', function(){
    describe('calculate', function(){
        it('should calculate sets properly from integers', function(){
            var model = new ProgramModel(null, {
                max: 100
            });

            let workouts = model.get("workouts");

            let week1 = workouts.at(0);
            expect(week1.get("set1_weight")).toBe(57.5);
            expect(week1.get("set2_weight")).toBe(67.5);
            expect(week1.get("set3_weight")).toBe(72.5);


            let week2 = workouts.at(1);
            expect(week2.get("set1_weight")).toBe(62.5);
            expect(week2.get("set2_weight")).toBe(72.5);
            expect(week2.get("set3_weight")).toBe(77.5);

            let week3 = workouts.at(2);
            expect(week3.get("set1_weight")).toBe(67.5);
            expect(week3.get("set2_weight")).toBe(77.5);
            expect(week3.get("set3_weight")).toBe(80);

            let week4 = workouts.at(3);
            expect(week4.get("set1_weight")).toBe(35);
            expect(week4.get("set2_weight")).toBe(45);
            expect(week4.get("set3_weight")).toBe(55);
        });

        it('should calculate sets properly from decimal numbers', function () {
            var model = new ProgramModel(null, {
                max: 132.5
            });

            let workouts = model.get("workouts");

            let week1 = workouts.at(0);
            expect(week1.get("set1_weight")).toBe(77.5);
            expect(week1.get("set2_weight")).toBe(90);
            expect(week1.get("set3_weight")).toBe(95);

            let week2 = workouts.at(1);
            expect(week2.get("set1_weight")).toBe(82.5);
            expect(week2.get("set2_weight")).toBe(95);
            expect(week2.get("set3_weight")).toBe(102.5);

            let week3 = workouts.at(2);
            expect(week3.get("set1_weight")).toBe(90);
            expect(week3.get("set2_weight")).toBe(102.5);
            expect(week3.get("set3_weight")).toBe(107.5);

            let week4 = workouts.at(3);
            expect(week4.get("set1_weight")).toBe(47.5);
            expect(week4.get("set2_weight")).toBe(60);
            expect(week4.get("set3_weight")).toBe(72.5);

        })
    })
});