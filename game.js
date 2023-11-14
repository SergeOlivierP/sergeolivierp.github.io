document.addEventListener('DOMContentLoaded', () => {
    const circle = document.getElementById('circle');
    const square = document.getElementById('square');
    const gameArea = document.getElementById('gameArea');

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

        newLeft = Math.max(0, newLeft);
        newLeft = Math.min(gameAreaRect.width - circle.offsetWidth, newLeft);
        newTop = Math.max(0, newTop);
        newTop = Math.min(gameAreaRect.height - circle.offsetHeight, newTop);

        circle.style.left = newLeft + 'px';
        circle.style.top = newTop + 'px';
    }

    function moveToRandomPosition(circle, gameArea, square) {
        const gameAreaRect = gameArea.getBoundingClientRect();
        const squareRect = square.getBoundingClientRect();

        let randomTop, randomLeft;

        do {
            randomTop = Math.random() * (gameAreaRect.height - circle.offsetHeight);
            randomLeft = Math.random() * (gameAreaRect.width - circle.offsetWidth);
        } while (
            randomTop >= squareRect.top - gameAreaRect.top &&
            randomTop <= squareRect.bottom - gameAreaRect.top - circle.offsetHeight &&
            randomLeft >= squareRect.left - gameAreaRect.left &&
            randomLeft <= squareRect.right - gameAreaRect.left - circle.offsetWidth
        );

        circle.style.top = `${randomTop}px`;
        circle.style.left = `${randomLeft}px`;
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
                moveToRandomPosition(circle, gameArea, square);
            }
        };

        circle.ondragstart = function() {
            return false;
        };
    };

    moveToRandomPosition(circle, gameArea, square);
});
