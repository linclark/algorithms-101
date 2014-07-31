## Task

Implement QuickFind. Remember, when connecting two components the first one passed in becomes part of the second one.

## Watch

- https://class.coursera.org/algs4partI-005/lecture/5
- https://class.coursera.org/algs4partI-005/lecture/6

## Boilerplate

```js
function QuickFind(count) {
    this.ids = new Array(count);

    // INITIALIZATION GOES HERE
}

QuickFind.prototype.union = function(p, q) {
    // UNION GOES HERE
};

QuickFind.prototype.find = function(p) {
    // FIND GOES HERE
};

QuickFind.prototype.connected = function(p, q) {
    // CONNECTED GOES HERE
};

module.exports = QuickFind;
```
{cyan}──────────────────────────────────────────────────────────────────────{/cyan}

 __»__ To print these instructions again, run: `{appname} print`
 __»__ To compile and test your solution, run: `{appname} verify quickfind.js`
 __»__ For help run: `{appname} help`