const clausesText = [
        "Les parties conviennent des termes et conditions suivants.",
        "Ce contrat sera régi par les lois de l'État du Québec",
        "Tout litige découlant de ce contrat sera résolu par arbitrage.",
        "La durée du contrat est de deux ans à compter de la date de signature.",
        "Les deux parties s'engagent à maintenir la confidentialité concernant les termes du contrat.",
        "Ce contrat prend effet à la date de signature par les deux parties.",
        "Les obligations des parties sous ce contrat seront nulles en cas de force majeure.",
        "Toute modification de ce contrat doit être effectuée par écrit et signée par les deux parties.",
        "Ce contrat peut être résilié par l'une ou l'autre des parties avec un préavis écrit de 30 jours.",
        "En cas de résiliation, les obligations qui, par leur nature, survivent à la résiliation, resteront en vigueur.",
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
