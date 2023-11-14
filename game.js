const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const largeSquareSize = 400;
const smallSquareSize = 100;
const circleRadius = 10;

let circleX, circleY;

function drawSquares() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Define colors
    const sandColor = '#c2b280'; // Sand-like color
    const lightGreen = '#90ee90'; // Light green color, not too vivid

    // Draw large square (light green)
    ctx.fillStyle = lightGreen;
    ctx.fillRect(
        (canvas.width - largeSquareSize) / 2,
        (canvas.height - largeSquareSize) / 2,
        largeSquareSize,
        largeSquareSize
    );

    // Draw border for large square
    ctx.strokeRect(
        (canvas.width - largeSquareSize) / 2,
        (canvas.height - largeSquareSize) / 2,
        largeSquareSize,
        largeSquareSize
    );

    // Draw small square (sand color)
    ctx.fillStyle = sandColor;
    ctx.fillRect(
        (canvas.width - smallSquareSize) / 2,
        (canvas.height - smallSquareSize) / 2,
        smallSquareSize,
        smallSquareSize
    );

    // Draw border for small square
    ctx.strokeRect(
        (canvas.width - smallSquareSize) / 2,
        (canvas.height - smallSquareSize) / 2,
        smallSquareSize,
        smallSquareSize
    );
}

function placeCircle() {
    do {
        circleX = Math.random() * (largeSquareSize - circleRadius * 2) + circleRadius + (canvas.width - largeSquareSize) / 2;
        circleY = Math.random() * (largeSquareSize - circleRadius * 2) + circleRadius + (canvas.height - largeSquareSize) / 2;
    } while (isInsideSmallSquare(circleX, circleY));

    drawCircle();
}

function drawCircle() {
    ctx.beginPath();
    ctx.arc(circleX, circleY, circleRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();
}

function isInsideSmallSquare(x, y) {
    const smallSquareLeft = (canvas.width - smallSquareSize) / 2;
    const smallSquareTop = (canvas.height - smallSquareSize) / 2;

    return x > smallSquareLeft && x < smallSquareLeft + smallSquareSize &&
           y > smallSquareTop && y < smallSquareTop + smallSquareSize;
}

canvas.addEventListener('mousedown', function(e) {
    if (ctx.isPointInPath(circleX, circleY)) {
        canvas.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }
});

function onMouseMove(e) {
    circleX = e.clientX - canvas.getBoundingClientRect().left;
    circleY = e.clientY - canvas.getBoundingClientRect().top;
    drawSquares();
    drawCircle();
}

function onMouseUp(e) {
    canvas.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (isInsideSmallSquare(circleX, circleY)) {
        drawSquares(); // Clear and redraw squares
        placeCircle(); // Place a new circle
    } else {
        drawSquares(); // Clear and redraw squares
        drawCircle();  // Redraw the circle at its current position
    }
}

drawSquares();
placeCircle();
