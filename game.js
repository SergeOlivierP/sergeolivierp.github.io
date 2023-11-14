document.addEventListener('DOMContentLoaded', () => {
    const circle = document.getElementById('circle');
    const square = document.getElementById('square');

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

        circle.style.position = 'absolute';
        circle.style.zIndex = 1000;
        document.body.append(circle);

        moveAt(event.pageX, event.pageY);

        function moveAt(pageX, pageY) {
            circle.style.left = pageX - shiftX + 'px';
            circle.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        document.addEventListener('mousemove', onMouseMove);

        circle.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            circle.onmouseup = null;

            if (isInsideSquare(circle, square)) {
                moveToRandomPosition(circle, document.getElementById('gameArea'));
            }
        };
    };

    circle.ondragstart = function() {
        return false;
    };

    moveToRandomPosition(circle, document.getElementById('gameArea'));
});
