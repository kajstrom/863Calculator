var assert = require("assert");
var WorkoutModel = require("../src/js/WorkoutModel.js");

describe('WorkoutModel', function(){
    describe('calculate', function(){
        it('should calculate sets properly from integers', function(){
            var model = new WorkoutModel(null, {
                max: 100
            });

            assert.equal(model.get("week1_set1_weight"), 57.5);
            assert.equal(model.get("week1_set2_weight"), 67.5);
            assert.equal(model.get("week1_set3_weight"), 72.5);

            assert.equal(model.get("week2_set1_weight"), 62.5);
            assert.equal(model.get("week2_set2_weight"), 72.5);
            assert.equal(model.get("week2_set3_weight"), 77.5);

            assert.equal(model.get("week3_set1_weight"), 67.5);
            assert.equal(model.get("week3_set2_weight"), 77.5);
            assert.equal(model.get("week3_set3_weight"), 80);

            assert.equal(model.get("week4_set1_weight"), 35);
            assert.equal(model.get("week4_set2_weight"), 45);
            assert.equal(model.get("week4_set3_weight"), 55);
        });

        it('should calculate sets properly from decimal numbers', function () {
            var model = new WorkoutModel(null, {
                max: 132.5
            });

            assert.equal(model.get("week1_set1_weight"), 77.5);
            assert.equal(model.get("week1_set2_weight"), 90);
            assert.equal(model.get("week1_set3_weight"), 95);

            assert.equal(model.get("week2_set1_weight"), 82.5);
            assert.equal(model.get("week2_set2_weight"), 95);
            assert.equal(model.get("week2_set3_weight"), 102.5);

            assert.equal(model.get("week3_set1_weight"), 90);
            assert.equal(model.get("week3_set2_weight"), 102.5);
            assert.equal(model.get("week3_set3_weight"), 107.5);

            assert.equal(model.get("week4_set1_weight"), 47.5);
            assert.equal(model.get("week4_set2_weight"), 60);
            assert.equal(model.get("week4_set3_weight"), 72.5);

        })
    })
});
