const filecheck = require('workshopper-exercise/filecheck')
    , fs = require('fs')
    , path  = require('path')
    , _ = require('lodash')
    , sinon = require('sinon');

var exercise = require('workshopper-exercise')();

// checks that the submission file actually exists
exercise = filecheck(exercise);

// add setup.
exercise.addSetup(function (mode, callback) {
    this.solutionModule = require(getSolutionPath() + 'solution.js');
    this.submissionModule = require([process.cwd(), this.args[0]].join('/'));

    process.nextTick(callback);
});

// add a processor.
exercise.addProcessor(function (mode, callback) {
    var pass = true;
    var impl = {
        sub: new this.submissionModule(10),
        sol: new this.solutionModule(10)
    };

    var items = [10,2,1,6,3,4];
    var itemsClone = items.slice(0);

    sinon.spy(impl.sub, 'exchange');
    sinon.spy(impl.sol, 'exchange');

    impl.sub.sort(items);
    impl.sol.sort(itemsClone);

    for (var i = 0; i < impl.sol.exchange.callCount; i++) {
        var subArgs = impl.sub.exchange.getCall(i);
        var solArgs = impl.sol.exchange.getCall(i);
        if (!_.isEqual(solArgs.args, subArgs.args)) pass = false;
        exercise.emit(pass ? 'pass' : 'fail', 'exchange called to swap ' + items[solArgs.args[1]] + ' with ' + items[solArgs.args[2]]);
    }

    process.nextTick(function () {
        callback(null, pass)
    });
});

// Print out the suggested solution when the student passes. This is copied from
// workshopper-exercise/execute because the rest of execute is not relevant to
// the way this is tested.
exercise.getSolutionFiles = function (callback) {
    var solutionDir = getSolutionPath();

    fs.readdir(solutionDir, function (err, list) {
        if (err) {
            return callback(err);
        }

        list = list
            .filter(function (f) { return (/\.js$/).test(f) })
            .map(function (f) { return path.join(solutionDir, f)});

        callback(null, list);
    });
};

function getSolutionPath() {
    return path.join(exercise.dir, './solution/');
}

module.exports = exercise;
