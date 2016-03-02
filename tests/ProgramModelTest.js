var ProgramModel = require("../src/js/model/ProgramModel.js");

describe('ProgramModel', function(){
    describe('calculate', function(){
        it('should calculate sets properly from integers', function(){
            var model = new ProgramModel(null, {
                max: 100
            });

            expect(model.get("week1").get("set1_weight")).toBe(57.5);
            expect(model.get("week1").get("set2_weight")).toBe(67.5);
            expect(model.get("week1").get("set3_weight")).toBe(72.5);

            expect(model.get("week2").get("set1_weight")).toBe(62.5);
            expect(model.get("week2").get("set2_weight")).toBe(72.5);
            expect(model.get("week2").get("set3_weight")).toBe(77.5);

            expect(model.get("week3").get("set1_weight")).toBe(67.5);
            expect(model.get("week3").get("set2_weight")).toBe(77.5);
            expect(model.get("week3").get("set3_weight")).toBe(80);

            expect(model.get("week4").get("set1_weight")).toBe(35);
            expect(model.get("week4").get("set2_weight")).toBe(45);
            expect(model.get("week4").get("set3_weight")).toBe(55);
        });

        it('should calculate sets properly from decimal numbers', function () {
            var model = new ProgramModel(null, {
                max: 132.5
            });

            expect(model.get("week1").get("set1_weight")).toBe(77.5);
            expect(model.get("week1").get("set2_weight")).toBe(90);
            expect(model.get("week1").get("set3_weight")).toBe(95);

            expect(model.get("week2").get("set1_weight")).toBe(82.5);
            expect(model.get("week2").get("set2_weight")).toBe(95);
            expect(model.get("week2").get("set3_weight")).toBe(102.5);

            expect(model.get("week3").get("set1_weight")).toBe(90);
            expect(model.get("week3").get("set2_weight")).toBe(102.5);
            expect(model.get("week3").get("set3_weight")).toBe(107.5);

            expect(model.get("week4").get("set1_weight")).toBe(47.5);
            expect(model.get("week4").get("set2_weight")).toBe(60);
            expect(model.get("week4").get("set3_weight")).toBe(72.5);

        })
    })
});