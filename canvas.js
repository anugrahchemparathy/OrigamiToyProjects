const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth; //Math.min(window.innerWidth,window.innerHeight);
canvas.height = window.innerHeight;

window.addEventListener('resize', function () {
    canvas.width = Math.min(window.innerWidth,window.innerHeight);
    canvas.height = canvas.width;
});

let mouse = {X: 150, Y: 150};
let left_padding = canvas.width * 0.05;
let top_padding = canvas.width * 0.05;
let edge_length = canvas.width * 0.4;
let interior_padding = edge_length * 0.02;


/*
================================================================================
Canvas Animation
================================================================================
*/

function animate() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.strokeRect(left_padding, top_padding, edge_length, edge_length);


    const line1 = new mouseLine(left_padding, top_padding);
    const line2 = new mouseLine(left_padding + edge_length, top_padding);
    const line3 = new mouseLine(left_padding, top_padding+edge_length);
    const folds = [line1,line2,line3];

    let polygon1Points = [new Point(left_padding,top_padding),new Point(left_padding+edge_length,top_padding), new Point(mouse.X,mouse.Y)];
    let polygon2Points = [new Point(left_padding,top_padding), new Point(left_padding,top_padding+edge_length), new Point(mouse.X,mouse.Y)]
    
    const polygons = [new Polygon(polygon1Points), new Polygon(polygon2Points,'white')];



    //Begin flat folding computations
    // let mouse_point = [(mouse.x - left_padding)*100/edge_length, (mouse.y - top_padding)*100/edge_length];
    // let new_point = directionAngle(mouse_point);
    // const foldLine = new mouseLine(left_padding + new_point[0]*edge_length/100,top_padding + new_point[1]*edge_length/100);
    // folds.push(foldLine);



    for (const fold of folds){
        fold.draw();
    }
    for (const polygon of polygons){
        polygon.draw();
    }

};

/*
================================================================================
Mousedown tools
================================================================================
*/


function getCursorPosition (canvas, event) {
    const cRect = canvas. getBoundingClientRect();

    let tempX = Math.round(event.clientX - cRect.left); // Subtract the 'left' of the canvas 
    let tempY = Math.round(event.clientY - cRect.top); // from the X/Y positions to make 
    
    if (tempX < left_padding+interior_padding) return;
    else if (tempX > left_padding+edge_length-interior_padding) return;

    if (tempY < top_padding+interior_padding) return;
    else if (tempY > top_padding+edge_length-interior_padding) return;

    mouse.X = tempX;
    mouse.Y = tempY; 
    console.log("X: "+event.clientX+", Y: "+event.clientY);
}

// canvas.addEventListener('mousedown', function(e) {
//     getCursorPosition(canvas, e);
//     animate();
// })

canvas.addEventListener("mousemove", function(e) { 
    getCursorPosition(canvas, e);
    animate();
});