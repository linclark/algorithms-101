#!/usr/bin/env node

const workshopper = require('workshopper'),
      path        = require('path')

function fpath (f) {
    return path.join(__dirname, f)
}

workshopper({
    name        : 'algorithms-101',
    title       : 'Algorithms 101',
    subtitle    : 'Basic algorithms for the JS dev',
    appDir      : __dirname,
    menuItems   : [],
    exerciseDir : fpath('./exercises/'),
    footerFile  : false
})
