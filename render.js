var WIDTH = 600, HEIGHT = 600;
var BLOCK_WIDTH = WIDTH / COLS,
    BLOCK_HEIGHT = HEIGHT / ROWS;
var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');
var colors = [
    'blue', 'darkgreen', 'red', 'navyblue', 'darkred', 'cyan', 'purple', 'black'
];
var bombIcon = new Image();
bombIcon.src = 'logo.png';

var flagIcon = new Image();
flagIcon.src = 'crown.png';

function modelToView(x, y) {
    return {
        x: x * BLOCK_WIDTH,
        y: y * BLOCK_HEIGHT
    }
}

function viewToModel(x, y) {
    return {
        x: Math.floor(x / BLOCK_WIDTH),
        y: Math.floor(y / BLOCK_HEIGHT)
    }
}

// draw mine
function renderMine(x,y) {
    var viewCoordinates = modelToView(x, y);

    ctx.drawImage(bombIcon, viewCoordinates.x, viewCoordinates.y, BLOCK_WIDTH, BLOCK_HEIGHT)
}

// draw flag
function renderFlag(x,y) {
    var viewCoordinates = modelToView(x, y);

    ctx.drawImage(flagIcon, viewCoordinates.x, viewCoordinates.y, BLOCK_WIDTH, BLOCK_HEIGHT)
}

// draw number
function renderNumber(x,y) {
    var viewCoordinates = modelToView(x, y);

    ctx.fillStyle = colors[board[y][x] - 1];
    ctx.font = '20pt Verdana';
    var textSizeM = ctx.measureText('M'),
        textSizeNumber = ctx.measureText(board[y][x]);
    ctx.fillText(
        board[y][x], 
        viewCoordinates.x + Math.floor(BLOCK_WIDTH / 2) - textSizeNumber.width / 2, 
        viewCoordinates.y + Math.floor(BLOCK_HEIGHT / 2) + textSizeM.width / 2
    );  
}

// draw block
function renderBlock(x, y) {
    var viewCoordinates = modelToView(x, y);

    if (state[y][x] == STATE_OPENED) {
        ctx.fillStyle = '#fcf5f2';
    } else {
        ctx.fillStyle = '#f4dcd2';
    }

    ctx.strokeStyle = 'black';
    ctx.fillRect(viewCoordinates.x, viewCoordinates.y, BLOCK_WIDTH, BLOCK_HEIGHT);
    ctx.strokeRect(viewCoordinates.x, viewCoordinates.y, BLOCK_WIDTH, BLOCK_HEIGHT);

    if (state[y][x] == STATE_FLAGGED) {
        renderFlag(x,y);
    }

    if (state[y][x] == STATE_OPENED) {
        switch (board[y][x]) {
            case 0: 
                break;
            case BLOCK_MINE:
                renderMine(x,y);
                break;
            default:
                renderNumber(x,y); 
        }
    }
}

function render() {
    for(var y = 0; y < ROWS; y++) {
        for (var x = 0; x < COLS; x++) {
            renderBlock(x,y);
        }
    }
}