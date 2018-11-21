var MOUSE_LEFT = 1,
    MOUSE_RIGHT = 3;

canvas.addEventListener('mousedown', function(e) {
    var x = e.clientX - canvas.offsetLeft,
        y = e.clientY - canvas.offsetTop;

    var modelCoordinates = viewToModel(x,y);

    switch(e.which) {
        case MOUSE_LEFT: 
            openBlock(modelCoordinates.x, modelCoordinates.y);
            break;
        case MOUSE_RIGHT:
            flagBlock(modelCoordinates.x, modelCoordinates.y);
    }

    render();
    return false;
});

canvas.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
}, false);

// listen to difficulty level button click
document.getElementById('easy').addEventListener('click', function(e) {
    e.preventDefault();
    setDifficulty('easy');
})

document.getElementById('medium').addEventListener('click', function(e) {
    e.preventDefault();
    setDifficulty('medium');
})

document.getElementById('hard').addEventListener('click', function(e) {
    e.preventDefault();
    setDifficulty('hard');
})