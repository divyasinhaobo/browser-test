"use strict";
/*------------------------------------------------------------------------------
   About      : Performance measurement for multi-step tasks
   
   Created on : Thu Jul 27 2017
   Author     : Raghvendra Varma
   
   Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var date_1 = require("./date");
var sortBy_1 = __importDefault(require("lodash/sortBy"));
var CYCLE_STEP = '_cycle_';
var PerformanceMetrics = /** @class */ (function () {
    function PerformanceMetrics(taskName) {
        this.taskName = taskName;
        this.cycles = [];
        this.startTs = this.now();
    }
    PerformanceMetrics.prototype.startStep = function (stepName) {
        var now = this.now();
        if (!this.cycle || this.cycle.stepMap[stepName]) {
            if (this.cycle) {
                this.cycle.endTs = now;
                this.cycles.push(this.cycle);
            }
            this.cycle = new Cycle(this.cycles.length, now, stepName);
        }
        else {
            this.cycle.stepMap[stepName] = new Step(now);
        }
    };
    PerformanceMetrics.prototype.endStep = function (stepName) {
        var step = this.cycle.stepMap[stepName];
        if (!step) {
            console.error(stepName, 'ended without start for', this.taskName);
            return;
        }
        step.endTs = this.now();
    };
    PerformanceMetrics.prototype.finish = function () {
        var now = this.now(), output = {
            task: this.taskName,
            totalMs: now - this.startTs,
            cycleCount: this.cycles.length,
            cyclePerf: new ResultEntry(),
            stepPerf: {}
        };
        if (this.cycle) {
            this.cycle.endTs = now;
            this.cycles.push(this.cycle);
        }
        for (var index = 0; index < this.cycles.length; index++) {
            var cycle = this.cycles[index];
            output.cyclePerf = this.markEntry(cycle.endTs - cycle.startTs, index, output.cyclePerf);
            for (var stepName in cycle.stepMap) {
                var step = cycle.stepMap[stepName], perf = output.stepPerf[stepName];
                if (!step.endTs) {
                    console.error('You forgot to call endStep for ' + stepName + ' for cycle index:' + index);
                    continue;
                }
                output.stepPerf[stepName] = this.markEntry(step.endTs - step.startTs, index, perf);
            }
        }
        console.info('Result summary ', output);
        var marks = [];
        this.logEntry('all cycles', output.cyclePerf, marks);
        for (var stepName in output.stepPerf) {
            this.logEntry(stepName, output.stepPerf[stepName], marks);
        }
        marks = sortBy_1.default(marks, 'startTs');
        console.info('Highlighted cycles (having min/max cycle/step time) >>');
        for (var _i = 0, marks_1 = marks; _i < marks_1.length; _i++) {
            var mark = marks_1[_i];
            console.info(mark.toString());
        }
        console.info('all cycles to deep dive >>', this.cycles);
    };
    PerformanceMetrics.prototype.markEntry = function (ts, index, entry) {
        entry = entry || new ResultEntry();
        if (entry.min > ts) {
            entry.min = ts;
            entry.minIdx = index;
        }
        if (entry.count && entry.max < ts) {
            entry.max = ts;
            entry.maxIdx = index;
        }
        entry.total += ts;
        entry.count++;
        return entry;
    };
    PerformanceMetrics.prototype.now = function () {
        return performance ? performance.timing.navigationStart + performance.now() : Date.now();
    };
    PerformanceMetrics.prototype.logEntry = function (name, entry, insertInto) {
        console.info(name + ' performance >> ' + entry);
        if (entry.minIdx !== -1) {
            var cycle = this.cycles[entry.minIdx];
            if (insertInto.indexOf(cycle) === -1)
                insertInto.push(cycle);
        }
        if (entry.maxIdx !== -1) {
            var cycle = this.cycles[entry.maxIdx];
            if (insertInto.indexOf(cycle) === -1)
                insertInto.push(cycle);
        }
    };
    return PerformanceMetrics;
}());
exports.PerformanceMetrics = PerformanceMetrics;
var BaseTime = /** @class */ (function () {
    function BaseTime(startTs) {
        this.startTs = startTs;
    }
    return BaseTime;
}());
var Step = /** @class */ (function (_super) {
    __extends(Step, _super);
    function Step() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Step;
}(BaseTime));
var Cycle = /** @class */ (function (_super) {
    __extends(Cycle, _super);
    function Cycle(index, now, step) {
        var _a;
        var _this = _super.call(this, now) || this;
        _this.index = index;
        _this.stepMap = (_a = {}, _a[step] = new Step(now), _a);
        return _this;
    }
    Cycle.prototype.toString = function () {
        var ts = this.endTs - this.startTs;
        return "Cycle(" + this.index + ") @ " + date_1.format(this.startTs, '%hh%:%mm%:%ss% %ms%') + " timeTaken: " + ts.toFixed(3) + "ms";
    };
    return Cycle;
}(BaseTime));
var ResultEntry = /** @class */ (function () {
    function ResultEntry() {
        this.count = 0;
        this.min = Number.MAX_SAFE_INTEGER;
        this.max = -1;
        this.total = 0;
        this.minIdx = -1;
        this.maxIdx = -1;
    }
    ResultEntry.prototype.toString = function () {
        var average = this.count ? this.total / this.count : 0;
        return "minMs: " + this.min.toFixed(3) + " " + (this.max !== -1 ? 'maxMs: ' + this.max.toFixed(3) : '') + " avgMs: " + average.toFixed(3) + " count: " + this.count + " " + (this.minIdx !== -1 ? 'minIdx: ' + this.minIdx : '') + " " + (this.maxIdx !== -1 ? 'maxIdx: ' + this.maxIdx : '');
    };
    return ResultEntry;
}());
//# sourceMappingURL=performance-metrics.js.map