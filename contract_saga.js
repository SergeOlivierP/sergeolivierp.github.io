const clausesText = [
    "Les parties énoncent leur accord sur les termes et conditions ci-après.",
    "Ce contrat est régi par les lois de l'État du Québec et prend effet dès sa signature par les deux parties.",
    "La durée du présent contrat est fixée à deux ans à compter de la date de signature.",
    "Les deux parties s'engagent à préserver la confidentialité des informations contenues dans ce contrat.",
    "En cas de litige, les parties conviennent d'un règlement par arbitrage.",
    "Ce contrat peut être résilié par l'une ou l'autre partie moyennant un préavis écrit de 30 jours."
];

document.addEventListener('DOMContentLoaded', () => {
    // Shuffle the clausesText array
    const shuffledClausesText = clausesText
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

    const clausesContainer = document.getElementById('clauses');
    shuffledClausesText.forEach((text, index) => {
        const clause = document.createElement('li');
        clause.setAttribute('id', 'clause' + (index + 1));
        clause.classList.add('clause');
        clause.innerHTML = `
            <button class="move-button" onclick="moveDown(this)">↓</button>
            <span class="clause-text">${text}</span>
            <button class="move-button" onclick="moveUp(this)">↑</button>
        `;
        clausesContainer.appendChild(clause);
    });
});



function moveUp(button) {
    const clause = button.parentNode;
    const previousClause = clause.previousElementSibling;
    if (previousClause) {
        clause.parentNode.insertBefore(clause, previousClause);
    }
}

function moveDown(button) {
    const clause = button.parentNode;
    const nextClause = clause.nextElementSibling;
    if (nextClause) {
        clause.parentNode.insertBefore(nextClause.nextSibling, clause);
    }
}

function checkOrder() {
    const clauses = document.querySelectorAll('#clauses .clause .clause-text');
    let isCorrectOrder = true;

    for (let i = 0; i < clauses.length; i++) {
        if (clauses[i].textContent.trim() !== clausesText[i].trim()) {
            isCorrectOrder = false;
            break;
        }
    }

    const resultElement = document.getElementById('contractCheckResult');
    if (isCorrectOrder) {
        resultElement.innerText = "Bravo! Ce contrat est correct.";
        resultElement.style.color = "green";
    } else {
        resultElement.innerText = "Ce n'est pas un contrat valide, réessaie!";
        resultElement.style.color = "red";
    }
}
