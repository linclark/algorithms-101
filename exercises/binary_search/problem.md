## Task

Implement a function that performs a binary search. The function will take two arguments: the array to search through and the element we are looking for.

The function will return a number: the index of the element if we find it and -1 if the element is not in the array.

## Watch

Binary search is explained in the Order-of-Growth Classifications video
- https://class.coursera.org/algs4partI-005/lecture/14

## Boilerplate

```
function binarySearch(arr, searchElement) {

  var minIndex = 0;
  var maxIndex = arr.length - 1;
  var currentIndex;
  var currentElement;

  while (minIndex <= maxIndex) {
  	// SOLUTION GOES HERE
  }

  return -1;
}
```

{cyan}──────────────────────────────────────────────────────────────────────{/cyan}

 __»__ To print these instructions again, run: `{appname} print`
 __»__ To compile and test your solution, run: `{appname} verify quickfind.js`
 __»__ For help run: `{appname} help`