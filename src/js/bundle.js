/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Calculator = new Marionette.Application({
	    initialize: function () {

	    }
	});

	Calculator.Layout = __webpack_require__(1);


	Calculator.on("start", function () {
	    this.rootLayout = new Marionette.LayoutView({
	        el: "body",
	        regions: {
	            calculator: "#calculator"
	        }
	    });

	    this.rootLayout.calculator.show(
	        new Calculator.Layout()
	    )
	});

	$(document).ready(function () {
	    Calculator.start();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var WorkoutModel = __webpack_require__(2);
	var WorkoutsLayout = __webpack_require__(3);
	var MaxModel = __webpack_require__(4);
	var MaxForm = __webpack_require__(5);

	var Layout = Marionette.LayoutView.extend({
	    template: __webpack_require__(9),
	    regions: {
	        form: ".form-container",
	        workouts: ".workouts-container"
	    },

	    onRender: function () {
	        var maxModel = new MaxModel(),
	            maxForm = new MaxForm({
	                model: maxModel
	            });
	        this.form.show(maxForm);

	        this.listenTo(maxForm, "calculate", function (model) {
	            var squatModel = new WorkoutModel(null, {max: model.get("squat")}),
	                benchModel = new WorkoutModel(null, {max: model.get("bench")}),
	                ohpModel = new WorkoutModel(null, {max: model.get("ohp")}),
	                deadliftModel = new WorkoutModel(null, {max: model.get("deadlift")});

	            var workoutsLayout = new WorkoutsLayout({
	                squatModel: squatModel,
	                benchModel: benchModel,
	                ohpModel: ohpModel,
	                deadliftModel: deadliftModel
	            });

	            this.workouts.show(workoutsLayout);
	        });
	    }
	});

	module.exports = Layout;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var WorkoutModel = Backbone.Model.extend({
	    liftMax: 0,
	    defaults: {
	        week1_set1_reps: 8,
	        week1_set1_weight: 0,
	        week1_set1_percentage: 65,
	        week1_set2_reps: 8,
	        week1_set2_weight: 0,
	        week1_set2_percentage: 75,
	        week1_set3_reps: 8,
	        week1_set3_weight: 0,
	        week1_set3_percentage: 80,
	        week2_set1_reps: 6,
	        week2_set1_weight: 0,
	        week2_set1_percentage: 70,
	        week2_set2_reps: 6,
	        week2_set2_weight: 0,
	        week2_set2_percentage: 80,
	        week2_set3_reps: 6,
	        week2_set3_weight: 0,
	        week2_set3_percentage: 85,
	        week3_set1_reps: 8,
	        week3_set1_weight: 0,
	        week3_set1_percentage: 75,
	        week3_set2_reps: 6,
	        week3_set2_weight: 0,
	        week3_set2_percentage: 85,
	        week3_set3_reps: 3,
	        week3_set3_weight: 0,
	        week3_set3_percentage: 90,
	        week4_set1_reps: 8,
	        week4_set1_weight: 0,
	        week4_set1_percentage: 40,
	        week4_set2_reps: 8,
	        week4_set2_weight: 0,
	        week4_set2_percentage: 50,
	        week4_set3_reps: 8,
	        week4_set3_weight: 0,
	        week4_set3_percentage: 60
	    },

	    initialize: function (data, options) {
	        this.liftMax = options.max;
	        this.calculate();
	    },

	    calculate: function () {
	        var calculationMax = this.liftMax * 0.9,
	            setPercentageKey = "",
	            setWeightKey = "";

	        for(var week = 1;week <= 4;week++) {
	            for(var setNo = 1;setNo <= 3;setNo++) {
	                setPercentageKey = "week" + week + "_set" + setNo + "_percentage";
	                setWeightKey = "week" + week + "_set" + setNo + "_weight";

	                this.set(setWeightKey, this.calculateSet(calculationMax, this.get(setPercentageKey)));
	            }
	        }
	    },

	    /**
	     * Calculate a set's weight to be used.
	     * @param {Number} calculationMax
	     * @param {Number} percentage
	     */
	    calculateSet: function (calculationMax, percentage) {
	        var percentageAsDecimal = percentage / 100,
	            minWeightStep = 2.5;

	        //Calculate the set weight.
	        var setWeight = calculationMax * percentageAsDecimal;

	        //Since the available plates usually go at 1.25 kg min, we must round to the nearest 2.5 kg.
	        var modulus = setWeight % minWeightStep;
	        var plates = setWeight / minWeightStep;
	        plates = Math.floor(plates);

	        modulus = Math.round(modulus);
	        plates += modulus;

	        return plates * minWeightStep;
	    }
	});

	module.exports = WorkoutModel;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var WorkoutTable = __webpack_require__(7);

	var WorkoutsLayout = Marionette.LayoutView.extend({
	    template: __webpack_require__(8),
	    className: "row",
	    regions: {
	        squat: ".squat-container",
	        bench: ".bench-container",
	        ohp: ".ohp-container",
	        deadlift: ".deadlift-container"
	    },

	    initialize: function (options) {
	        this.squatModel = options.squatModel;
	        this.benchModel = options.benchModel;
	        this.ohpModel = options.ohpModel;
	        this.deadliftModel = options.deadliftModel;
	    },

	    onRender: function () {
	        this.squat.show(
	            new WorkoutTable({
	                model: this.squatModel
	            })
	        );
	        this.bench.show(
	            new WorkoutTable({
	                model: this.benchModel
	            })
	        );
	        this.ohp.show(
	            new WorkoutTable({
	                model: this.ohpModel
	            })
	        );
	        this.deadlift.show(
	            new WorkoutTable({
	                model: this.deadliftModel
	            })
	        );
	    }
	});

	module.exports = WorkoutsLayout;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var MaxModel = Backbone.Model.extend({
	    defaults: {
	        squat: 0,
	        bench: 0,
	        ohp: 0,
	        deadlift: 0
	    }
	});

	module.exports = MaxModel;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var MaxForm = Marionette.ItemView.extend({
	    template: "#maxform-tpl",
	    tagName: "form",
	    events: {
	        "click .js-calculate": "calculate"
	    },
	    ui: {
	        bench: "#bench1RM",
	        squat: "#squat1RM",
	        ohp: "#ohp1RM",
	        deadlift: "#deadlift1RM"
	    },

	    calculate: function () {
	        this.model.set({
	            bench: this.ui.bench.val(),
	            squat: this.ui.squat.val(),
	            ohp: this.ui.ohp.val(),
	            deadlift: this.ui.deadlift.val()
	        });

	        this.trigger("calculate", this.model);
	    }
	});

	module.exports = MaxForm;

/***/ },
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var WorkoutTable = Marionette.ItemView.extend({
	    template: "#workouts-table-tpl",
	    tagName: "table",
	    className: "table"
	});

	module.exports = WorkoutTable;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function (obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<div class="col-xs-12 col-md-3">\r\n    <h3>Squat</h3>\r\n    <div class="squat-container"></div>\r\n</div>\r\n<div class="col-xs-12 col-md-3">\r\n    <h3>Bench press</h3>\r\n    <div class="bench-container"></div>\r\n</div>\r\n<div class="col-xs-12 col-md-3">\r\n    <h3>OHP</h3>\r\n    <div class="ohp-container"></div>\r\n</div>\r\n<div class="col-xs-12 col-md-3">\r\n    <h3>Deadlift</h3>\r\n    <div class="deadlift-container"></div>\r\n</div>';

	}
	return __p
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function (obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<div class="form-container"></div>\r\n<div class="workouts-container"></div>';

	}
	return __p
	}

/***/ }
/******/ ]);