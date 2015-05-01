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

	var Calculator = new Marionette.Application();
	var Router = __webpack_require__(2);

	Calculator.on("start", function () {
	    this.rootLayout = new Marionette.LayoutView({
	        el: "body",
	        regions: {
	            calculator: "#calculator"
	        }
	    });

	    var router = new Router({
	        container: this.rootLayout.calculator
	    });

	    Backbone.history.start();
	});

	$(document).ready(function () {
	    Calculator.start();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var WorkoutModel = __webpack_require__(3);
	var WorkoutsLayout = __webpack_require__(4);
	var MaxForm = __webpack_require__(6);

	var Layout = Marionette.LayoutView.extend({
	    template: __webpack_require__(7),
	    regions: {
	        form: ".form-container",
	        workouts: ".workouts-container"
	    },

	    onRender: function () {
	        var maxForm = new MaxForm({
	                model: this.model
	            });
	        this.form.show(maxForm);

	        if (this.model.notEmpty()) {
	            this.showWorkouts(this.model);
	        }

	        this.listenTo(maxForm, "calculate", function (model) {
	            this.showWorkouts(model);
	        });
	    },

	    /**
	     * Generate and show workouts.
	     * @param {Backbone.Model} model Max lifts model used for calculating the workouts.
	     */
	    showWorkouts: function (model) {
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

	        Backbone.history.navigate(
	            "squat/" + model.get("squat")
	            + "/bench/" + model.get("bench")
	            + "/ohp/" + model.get("ohp")
	            + "/deadlift/" + model.get("deadlift")
	        );
	        this.workouts.show(workoutsLayout);
	    }
	});

	module.exports = Layout;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Layout = __webpack_require__(1);
	var MaxModel = __webpack_require__(5);

	var Router = Marionette.AppRouter.extend({
	    routes: {
	        "": "emptyForm",
	        "squat/:squat/bench/:bench/ohp/:ohp/deadlift/:deadlift": "filledForm"
	    },

	    initialize: function (options) {
	        this.container = options.container
	    },

	    emptyForm: function () {

	        this.container.show(
	            new Layout({
	                model: new MaxModel()
	            })
	        )
	    },

	    filledForm: function (squat, bench, ohp, deadlift) {
	        var maxModel = new MaxModel({
	            squat: squat,
	            bench: bench,
	            ohp: ohp,
	            deadlift: deadlift
	        });
	        var layout = new Layout({
	            model: maxModel
	        });

	        this.container.show(
	            layout
	        )
	    }
	});

	module.exports = Router;

/***/ },
/* 3 */
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var WorkoutTable = __webpack_require__(8);

	var WorkoutsLayout = Marionette.LayoutView.extend({
	    template: __webpack_require__(9),
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var MaxModel = Backbone.Model.extend({
	    defaults: {
	        squat: 0,
	        bench: 0,
	        ohp: 0,
	        deadlift: 0
	    },

	    notEmpty: function () {
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

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var MaxForm = Marionette.ItemView.extend({
	    template: __webpack_require__(10),
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function (obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<div class="form-container"></div>\r\n<div class="workouts-container"></div>';

	}
	return __p
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var WorkoutTable = Marionette.ItemView.extend({
	    template: __webpack_require__(11),
	    tagName: "table",
	    className: "table"
	});

	module.exports = WorkoutTable;

/***/ },
/* 9 */
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function (obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<div class="form-group">\r\n    <label for="squat1RM">Squat, 1RM</label>\r\n    <input type="number" id="squat1RM" class="form-control" value="' +
	((__t = ( squat )) == null ? '' : __t) +
	'">\r\n</div>\r\n<div class="form-group">\r\n    <label for="bench1RM">Bench, 1RM</label>\r\n    <input id="bench1RM" class="form-control" type="number" value="' +
	((__t = ( bench )) == null ? '' : __t) +
	'">\r\n</div>\r\n<div class="form-group">\r\n    <label for="ohp1RM">Overhead Press, 1RM</label>\r\n    <input id="ohp1RM" class="form-control" type="number" value="' +
	((__t = ( ohp )) == null ? '' : __t) +
	'">\r\n</div>\r\n<div class="form-group">\r\n    <label for="deadlift1RM">Deadlift, 1RM</label>\r\n    <input id="deadlift1RM" class="form-control" type="number" value="' +
	((__t = ( deadlift )) == null ? '' : __t) +
	'">\r\n</div>\r\n<div class="form-group">\r\n    <button class="btn btn-primary js-calculate" type="button">\r\n        Calculate\r\n    </button>\r\n    <button class="btn btn-default" type="reset">\r\n        Clear\r\n    </button>\r\n</div>';

	}
	return __p
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function (obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<thead>\r\n<th class="active">Week 1</th>\r\n</thead>\r\n<tbody>\r\n<tr>\r\n    <td>' +
	((__t = ( week1_set1_reps )) == null ? '' : __t) +
	' @ ' +
	((__t = ( week1_set1_weight )) == null ? '' : __t) +
	' kg</td>\r\n</tr>\r\n<tr>\r\n    <td>' +
	((__t = ( week1_set2_reps )) == null ? '' : __t) +
	' @ ' +
	((__t = ( week1_set2_weight )) == null ? '' : __t) +
	' kg</td>\r\n</tr>\r\n<tr>\r\n    <td>' +
	((__t = ( week1_set1_reps )) == null ? '' : __t) +
	'+ @ ' +
	((__t = ( week1_set3_weight )) == null ? '' : __t) +
	' kg</td>\r\n</tr>\r\n</tbody>\r\n<thead>\r\n<th class="active">Week 2</th>\r\n</thead>\r\n<tbody>\r\n<tr>\r\n    <td>' +
	((__t = ( week2_set1_reps )) == null ? '' : __t) +
	' @ ' +
	((__t = ( week2_set1_weight )) == null ? '' : __t) +
	' kg</td>\r\n</tr>\r\n<tr>\r\n    <td>' +
	((__t = ( week2_set2_reps )) == null ? '' : __t) +
	' @ ' +
	((__t = ( week2_set2_weight )) == null ? '' : __t) +
	' kg</td>\r\n</tr>\r\n<tr>\r\n    <td>' +
	((__t = ( week2_set3_reps )) == null ? '' : __t) +
	'+ @ ' +
	((__t = ( week2_set3_weight )) == null ? '' : __t) +
	' kg</td>\r\n</tr>\r\n</tbody>\r\n<thead>\r\n<th class="active">Week 3</th>\r\n</thead>\r\n<tbody>\r\n<tr>\r\n    <td>' +
	((__t = ( week3_set1_reps )) == null ? '' : __t) +
	' @ ' +
	((__t = ( week3_set1_weight )) == null ? '' : __t) +
	' kg</td>\r\n</tr>\r\n<tr>\r\n    <td>' +
	((__t = ( week3_set2_reps )) == null ? '' : __t) +
	' @ ' +
	((__t = ( week3_set2_weight )) == null ? '' : __t) +
	' kg</td>\r\n</tr>\r\n<tr>\r\n    <td>' +
	((__t = ( week3_set3_reps )) == null ? '' : __t) +
	'+ @ ' +
	((__t = ( week3_set3_weight )) == null ? '' : __t) +
	' kg</td>\r\n</tr>\r\n</tbody>\r\n<th class="active">Week 4, Deload</th>\r\n<tbody>\r\n<tr>\r\n    <td>' +
	((__t = ( week4_set1_reps )) == null ? '' : __t) +
	' @ ' +
	((__t = ( week4_set1_weight )) == null ? '' : __t) +
	' kg</td>\r\n</tr>\r\n<tr>\r\n    <td>' +
	((__t = ( week4_set2_reps )) == null ? '' : __t) +
	' @ ' +
	((__t = ( week4_set2_weight )) == null ? '' : __t) +
	' kg</td>\r\n</tr>\r\n<tr>\r\n    <td>' +
	((__t = ( week4_set3_reps )) == null ? '' : __t) +
	' @ ' +
	((__t = ( week4_set3_weight )) == null ? '' : __t) +
	' kg</td>\r\n</tr>\r\n</tbody>';

	}
	return __p
	}

/***/ }
/******/ ]);