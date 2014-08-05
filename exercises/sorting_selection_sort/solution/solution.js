function SelectionSort() { }

SelectionSort.prototype.sort = function(items) {
    var n = items.length;
    for (var i = 0; i < n; i++) {
        for (var j = i+1; j < n; j++) {
            var min = i;

            if (items[j] < items[min]) {
                min = j;
                this.exchange(items, i, min);
            }
        }
    }
};

SelectionSort.prototype.exchange = function(items, firstIndex, secondIndex) {
    var temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
};

module.exports = SelectionSort;
