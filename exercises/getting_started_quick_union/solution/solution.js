function QuickFind(count) {
    this.ids = new Array(count);

    // initialize the array so that all items have themselves as the root
    for(var i = 0; i < count; i++) {
        this.ids[i] = i;
    }
}

QuickFind.prototype.union = function(p, q) {
    var pid = this.ids[p];
    var qid = this.ids[q];

    // if p is already connected to q, do nothing
    if (pid === qid) {
        return;
    } else {
        for(var i = 0; i < this.ids.length; i++) {
            if (this.ids[i] === pid) {
                this.ids[i] = qid;
            }
        }
    }
};

QuickFind.prototype.find = function(p) {
    return this.ids[p];
};

QuickFind.prototype.connected = function(p, q) {
    return this.find(p) === this.find(q);
};

module.exports = QuickFind;
