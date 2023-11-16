document.getElementById('startButton').addEventListener('click', startRace);

let position1 = 0;
let position2 = 0;
let racing = false;

function startRace() {
    position1 = 0;
    position2 = 0;
    updatePosition();
    racing = true;
}

function updatePosition() {
    document.getElementById('player').style.left = position1 + '%';
    document.getElementById('player2').style.left = position2 + '%';
}

document.addEventListener('keydown', function(event) {
    if (!racing) return;

    if (event.key === 'q') {
        position1 += 1;
        updatePosition();
        checkWin(position1, 'Player 1');
    } else if (event.key === 'p') {
        position2 += 1;
        updatePosition();
        checkWin(position2, 'Player 2');
    }
});

function checkWin(position, player) {
    if (position >= 90) { // Adjust based on track length
        alert(player + ' won!');
        racing = false;
    }
}
