document.addEventListener('DOMContentLoaded', () => {
    const circle = document.getElementById('circle');
    const square = document.getElementById('square');
    const gameArea = document.getElementById('gameArea');

    / Function to check if circle is inside the square
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
