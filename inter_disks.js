(function() {
    var canvas = document.getElementById('c');
    var context = canvas.getContext('2d');

    var centers = [];
    
    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    function fillLittleCircle(context, x, y, color) {
        var radius = 5
        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI, false);
        context.fillStyle = color;
        console.dir(context.fill());
    }

    function strokeBigCircle(context, x, y, color) {
        var radius = 70;
        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI, false);
        context.lineWidth = 5;
        context.strokeStyle = color;
        context.stroke();
    }

    function addCircle(context, x, y) {
        strokeBigCircle(context, x, y, '#003300');
        fillLittleCircle(context, x, y, 'green');
    }

    canvas.addEventListener('click', function(evt) {
        var p = getMousePos(canvas, evt);
        console.log('click at (' + p.x + ',' + p.y + ')');
        // if we have clicked on a circle center
        if(false) {
            // grab the circle
        } else {
            addCircle(context, p.x, p.y);
            centers.push(p);
        }
    });

    //////////////////////////////////////////////////////////////////////
    function isLeftTurn(p1, p2, p3) {
        var x1 = p2.x - p1.x;
        var x2 = p3.x - p1.x;
        var y1 = p2.y - p1.y;
        var y2 = p3.y - p1.y;
        return 0 > (x1 * y2 - x2 * y1);
    }

    function convexHull(points) {
        points.sort(function(a,b) {
            return b.x - a.x;
        });
        var chPoints = [];
        halfHull(points, true).forEach(function(pt) {
            chPoints.push(pt);
        });
        halfHull(points, false).reverse().forEach(function(pt) {
            chPoints.push(pt);
        });
        for(var i = 1; i < chPoints.length; ++i) {
            var pt1 = chPoints[i-1];
            var pt2 = chPoints[i];
            if(i == 2) {
                fillLittleCircle(context, pt1.x, pt1.y, 'blue');
            }
            fillLittleCircle(context, pt2.x, pt2.y, 'blue');

            context.beginPath();
            context.moveTo(pt1.x, pt1.y);
            context.lineTo(pt2.x, pt2.y);
            context.lineWidth = 1;
            context.stroke();
        }
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

    document.getElementById('ch').addEventListener('click', function(evt) {
        console.log('Drawing convex hull');
        convexHull(centers);
    });
})();
