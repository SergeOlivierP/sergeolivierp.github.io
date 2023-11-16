document.getElementById('startButton').addEventListener('click', startRace);

let position = 0;
let racing = false;

function startRace() {
    position = 0;
    updatePosition();
    racing = true;
}

function updatePosition() {
    document.getElementById('player').style.left = position + '%';
}

document.addEventListener('keydown', function(event) {
    if (racing && event.code === 'Space') {
        position += 1;
        updatePosition();
        if (position >= 90) { // Adjust as per the size of the car and the finish line
            alert('You won!');
            racing = false;
        }
    }
});
