Points = (function() {
    //////////////////////////////////////////////////////////////////////
    // Convex Hull
    
    function isLeftTurn(p1, p2, p3) {
        var x1 = p2.x - p1.x;
        var x2 = p3.x - p1.x;
        var y1 = p2.y - p1.y;
        var y2 = p3.y - p1.y;
        return 0 > (x1 * y2 - x2 * y1);
    }
    function halfHull(points, left) {
        if(points.length < 3) {
            return points;
        }
        var stack = [];
        for(var i = 0; i < points.length; ++i) {
            var p = points[i];
            while(stack.length > 1 &&
                  isLeftTurn(stack[stack.length-2],
                             stack[stack.length-1], p) == left) {
                stack.pop();
            }
            stack.push(p);
        }
        return stack;
    }
    function convexHull(points) {
        console.log('computing convex hull');
        var chPoints = [];
        halfHull(points, true).forEach(function(pt) {
            chPoints.push(pt);
        });
        halfHull(points, false).reverse().forEach(function(pt) {
            chPoints.push(pt);
        });
        return chPoints;
    }

    //////////////////////////////////////////////////////////////////////
    // Voronoi
    function voronoi(points) {
        var t = new AVL();
        var output = [];
        // TODO
        return output;
    }

    return {convexHull:convexHull, voronoi:voronoi};
})();
