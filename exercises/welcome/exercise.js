const filecheck = require('workshopper-exercise/filecheck')
    , fs = require('fs')
    , path  = require('path');

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
        sub: new this.submissionModule()
    };

    if (impl.sub.ready !== true) {
        exercise.emit('fail', 'this.ready was not set to true.');
        pass = false;
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
