document.addEventListener('DOMContentLoaded', () => {
    const circle = document.getElementById('circle');
    const square = document.getElementById('square');
    const gameArea = document.getElementById('gameArea');

    // Function to check if circle is inside the square
    function isInsideSquare(circle, square) {
        const circleRect = circle.getBoundingClientRect();
        const squareRect = square.getBoundingClientRect();

        return (
            circleRect.top >= squareRect.top &&
            circleRect.left >= squareRect.left &&
            circleRect.right <= squareRect.right &&
            circleRect.bottom <= squareRect.bottom
        );
    }

    // Function to keep the circle within the game area
    function keepCircleInBounds(circle, gameArea, pageX, pageY, shiftX, shiftY) {
        const gameAreaRect = gameArea.getBoundingClientRect();

        let newLeft = pageX - shiftX - gameAreaRect.left;
        let newTop = pageY - shiftY - gameAreaRect.top;

        // Restrict movement within the game area
        newLeft = Math.max(0, newLeft);
        newLeft = Math.min(gameAreaRect.width - circle.offsetWidth, newLeft);
        newTop = Math.max(0, newTop);
        newTop = Math.min(gameAreaRect.height - circle.offsetHeight, newTop);

        circle.style.left = newLeft + 'px';
        circle.style.top = newTop + 'px';
    }

    // Function to move the circle to a random position
    function moveToRandomPosition(circle, gameArea) {
        const gameAreaRect = gameArea.getBoundingClientRect();
        const maxTop = gameAreaRect.height - circle.offsetHeight;
        const maxLeft = gameAreaRect.width - circle.offsetWidth;

        const randomTop = Math.random() * maxTop;
        const randomLeft = Math.random() * maxLeft;

        circle.style.top = `${randomTop}px`;
        circle.style.left = `${randomLeft}px`;
    }

    // Drag and drop functionality
    circle.onmousedown = function(event) {
        let shiftX = event.clientX - circle.getBoundingClientRect().left;
        let shiftY = event.clientY - circle.getBoundingClientRect().top;

        function moveAt(pageX, pageY) {
            keepCircleInBounds(circle, gameArea, pageX, pageY, shiftX, shiftY);
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        document.addEventListener('mousemove', onMouseMove);

        circle.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            circle.onmouseup = null;

            if (isInsideSquare(circle, square)) {
                moveToRandomPosition(circle, gameArea);
            }
        };

        circle.ondragstart = function() {
            return false;
        };
    };

    moveToRandomPosition(circle, gameArea);
});
