const filecheck = require('workshopper-exercise/filecheck')
    , fs = require('fs')
    , path  = require('path')
    , _ = require('lodash');

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
    var edges = [
        [9,3],
        [0,7],
        [6,5],
        [1,7],
        [4,5],
        [9,1]
    ];

    // check initialization
    if (!_.isEqual(impl.sub.ids, impl.sol.ids)) {
        exercise.emit('fail', 'The ids array should be initialized to ' + impl.sol.ids + ', was ' + impl.sub.ids + ' instead.');
        pass = false;
    }

    // check each union
    for(var i=0; i<edges.length; i++) {
        impl.sub.union(edges[i][0], edges[i][1]);
        impl.sol.union(edges[i][0], edges[i][1]);
        if (!_.isEqual(impl.sub.ids, impl.sol.ids)) pass = false;
        exercise.emit(pass ? 'pass' : 'fail', 'The union ' + edges[i] + ' results in the ids array ' + impl.sol.ids + '.');
    }

    // check find
    impl.sub.ids = impl.sol.ids;
    if (impl.sub.find(5) !== 5) pass = false;
    exercise.emit(pass ? 'pass' : 'fail', '5 is found in the connected component 5.');
    if (impl.sub.find(9) !== 7) pass = false;
    exercise.emit(pass ? 'pass' : 'fail', '9 is found in the connected component 7.');

    // check connected
    if (!impl.sub.connected(9, 7)) pass = false;
    exercise.emit(pass ? 'pass' : 'fail', '9 is connected to its root, 7.');
    if (!impl.sub.connected(9, 3)) pass = false;
    exercise.emit(pass ? 'pass' : 'fail', '9 is connected to 3.');
    if (impl.sub.connected(9, 2)) pass = false;
    exercise.emit(pass ? 'pass' : 'fail', '9 is not connected to 2.');

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
