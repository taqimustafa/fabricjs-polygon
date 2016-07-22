prototypefabric.polygon = {
    drawPolygon : function() {
        polygonMode = true;
        pointArray = new Array();
        lineArray = new Array();
        activeLine;
    },
    addPoint : function(options) {
        var random = Math.floor(Math.random() * (max - min + 1)) + min;
        var id = new Date().getTime() + random;
        var circle = new fabric.Circle({
            radius: 5, 
            fill: '#ffffff', 
            stroke: '#333333',
            strokeWidth: 0.5,
            left: options.e.layerX, 
            top: options.e.layerY,
            selectable: false,
            hasBorders: false,
            hasControls: false,
            originX:'center',
            originY:'center',
            id:id
        });
        if(pointArray.length == 0){
            circle.set({
                fill:'red'
            })
        }
        var points = [options.e.layerX,options.e.layerY,options.e.layerX,options.e.layerY];
        line = new fabric.Line(points, {
            strokeWidth: 2,
            fill: '#999999',
            stroke: '#999999',
            class:'line',
            originX:'center',
            originY:'center',
            selectable: false,
            hasBorders: false,
            hasControls: false,
            evented: false
        });
        if(activeShape){
            var pos = canvas.getPointer(options.e);
            var points = activeShape.get("points");
            points.push({
                x: pos.x,
                y: pos.y
            });
            var polygon = new fabric.Polygon(points,{ 
                stroke:'#333333',
                strokeWidth:1,
                fill: '#cccccc', 
                opacity: 0.1,
                selectable: false,
                hasBorders: false,
                hasControls: false,
                evented: false
            });
            canvas.remove(activeShape);
            canvas.add(polygon);
            activeShape = polygon;
            canvas.renderAll();
        }
        else{
            var polyPoint = [{x:options.e.layerX,y:options.e.layerY}];
            var polygon = new fabric.Polygon(polyPoint,{ 
                stroke:'#333333',
                strokeWidth:1,
                fill: '#cccccc', 
                opacity: 0.1,
                selectable: false,
                hasBorders: false,
                hasControls: false,
                evented: false
            });
            activeShape = polygon;
            canvas.add(polygon);
        }
        activeLine = line;

        pointArray.push(circle);
        lineArray.push(line);

        canvas.add(circle);
        canvas.add(line);
        canvas.selection = false;
    },
    generatePolygon : function(pointArray){
        var points = new Array();
        $.each(pointArray,function(index,point){
            points.push({
                x:point.left,
                y:point.top
            });
            canvas.remove(point);
        });
        $.each(lineArray,function(index,line){
            canvas.remove(line);
        });
        canvas.remove(activeShape).remove(activeLine);
        var polygon = new fabric.Polygon(points,{ 
            stroke:'#333333',
            strokeWidth:0.5,
            fill: 'red', 
            opacity: 1,
            hasBorders: false,
            hasControls: false
        });
        canvas.add(polygon);
        
        activeLine = null;
        activeShape = null;
        polygonMode = false;
        canvas.selection = true;
    }
};