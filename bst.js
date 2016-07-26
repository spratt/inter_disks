"use strict";
function assert(condition, message) {
    if (!condition) {
        message = message || "Assertion failed";
        if (typeof Error !== "undefined") {
            throw new Error(message);
        }
        throw message; // Fallback
    }
}

var AVL = function(cmp) {
    this.root = null;
    if(this.cmp === undefined) {
        this.cmp = function(a,b) {
            return a - b;
        }
    } else {
        this.cmp = cmp;
    }
};
AVL.prototype.print = function() { console.log(this.nodeToString()); };
AVL.prototype.nodeToString = function(node) {
    if(node === undefined) node = this.root;
    if(node === null) return '';
    return '' + node.val + '(' +
        this.nodeToString(node.left) + ',' +
        this.nodeToString(node.right) + ')';
};
AVL.prototype.find = function(x) {
    var prev = null,
        node = this.root;
    while(node !== null) {
        var diff = this.cmp(node.val, x);
        prev = node;
        if(diff === 0) {
            return node;
        } else if(diff < 0) {
            // node.val < x.val
            node = node.right;
        } else {
            // x.val < node.val
            node = node.left;
        }
    }
    return prev;
};
AVL.prototype.insert = function(x) {
    var node = {
        val: x,
        left: null,
        right: null,
        parent: null,
        size: 1
    };
    if(this.root === null) {
        this.root = node;
        return;
    }
    var parent = this.find(x, true);
    node.parent = parent;
    var diff = this.cmp(parent.val, x);
    if(diff === 0) {
        // parent.val === x.val === parent.val
        node.left = parent.left;
        parent.left = node;
    } else if(diff < 0) {
        // parent.val < x.val
        parent.right = node;
    } else {
        // x.val < parent.val
        parent.left = node;
    }
    this.fixSizesFrom(node);
    this.rebalance(node);
};
AVL.prototype.resizeNode = function(node) {
    var leftSize = 0, rightSize = 0;
    if(node.left !== null) leftSize = node.left.size;
    if(node.right !== null) rightSize = node.right.size;
    node.size = 1 + Math.max(leftSize, rightSize);
};
AVL.prototype.fixSizesFrom = function(node) {
    while(node !== null) {
        this.resizeNode(node);
        node = node.parent;
    }
};
AVL.prototype.rebalance = function(node) {
    var avl = this;
    function fixParent(node, p) {
        if(p === avl.root) {
            avl.root = node;
            return;
        }
        if(p.parent.left === p) {
            p.parent.left = node;
        } else {
            p.parent.right = node;
        }
    }
    //      (p)                   (node)
    //      / \                   /    \
    //   (T1) (node)    =>      (p)    (T3)
    //        /    \            / \
    //     (T2)    (T3)      (T1) (T2)
    function rotateLeft(node) {
        var p = node.parent;
        fixParent(node, p);
        node.parent = p.parent;
        p.parent = node;
        p.right = node.left;
        node.left = p;
        AVL.prototype.resizeNode(p);
        AVL.prototype.resizeNode(node);
    }
    //         (p)              (node)
    //         / \              /    \
    //    (node) (T3)   =>   (T1)    (p)
    //    /    \                     / \
    // (T1)    (T2)               (T2) (T3)
    function rotateRight(node) {
        var p = node.parent;
        fixParent(node, p);
        node.parent = p.parent;
        p.parent = node;
        p.left = node.right;
        node.right = p;
        AVL.prototype.resizeNode(p);
        AVL.prototype.resizeNode(node);
    }
    while(node !== null) {
        var leftSize = 0, rightSize = 0;
        if(node.left !== null) leftSize = node.left.size;
        if(node.right !== null) rightSize = node.right.size;
        if(leftSize > rightSize + 1) {
            // left big
            var llSize = 0, lrSize = 0;
            if(node.left.left !== null) llSize = node.left.left.size;
            if(node.left.right !== null) lrSize = node.left.right.size;
            if(lrSize > llSize) {
                rotateLeft(node.left.right);
            }
            rotateRight(node.left);
        } else if(rightSize > leftSize + 1) {
            // right big
            var rlSize = 0, rrSize = 0;
            if(node.right.left !== null) llSize = node.right.left.size;
            if(node.right.right !== null) lrSize = node.right.right.size;
            if(rlSize > rrSize) {
                rotateRight(node.right.left);
            }
            rotateLeft(node.right);
        }
        // rebalance parent
        node = node.parent;
    }
};
function test_AVL() {
    var a = new AVL();
    for(var i = 0; i < 10; ++i)
        a.insert(i);
    a.print();
}
