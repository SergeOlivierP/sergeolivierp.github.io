document.addEventListener('DOMContentLoaded', (event) => {
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

        const clauses = clausesText.map((text, index) => {
        const clause = document.createElement('li');
        clause.setAttribute('draggable', true);
        clause.setAttribute('id', 'clause' + (index + 1));
        clause.classList.add('clause');
        clause.textContent = text;
        clause.addEventListener('dragstart', dragStart);
        clause.addEventListener('dragover', dragOver);
        clause.addEventListener('drop', drop);
        return clause;
    });

    // Randomize clauses
    clauses.sort(() => Math.random() - 0.5);

    // Add clauses to the DOM
    const clausesContainer = document.getElementById('clauses');
    clauses.forEach(clause => clausesContainer.appendChild(clause));
});

function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
}

function dragOver(event) {
    event.preventDefault();
    const target = event.target;
    const bounding = target.getBoundingClientRect();
    const offset = bounding.y + bounding.height / 2;
    if (event.clientY - offset > 0) {
        target.style['border-bottom'] = 'solid 4px blue';
        target.style['border-top'] = '';
    } else {
        target.style['border-top'] = 'solid 4px blue';
        target.style['border-bottom'] = '';
    }
}

function drop(event) {
    event.preventDefault();
    const draggedId = event.dataTransfer.getData('text/plain');
    const draggedElement = document.getElementById(draggedId);
    const targetElement = event.target;
    const targetBounding = targetElement.getBoundingClientRect();
    const targetOffset = targetBounding.y + targetBounding.height / 2;

    targetElement.style['border-bottom'] = '';
    targetElement.style['border-top'] = '';

    if (event.clientY - targetOffset > 0) {
        targetElement.after(draggedElement);
    } else {
        targetElement.before(draggedElement);
    }
}

function checkOrder() {
    const clauses = document.querySelectorAll('#clauses .clause');
    const correctOrder = clauses.every((clause, index) => {
        return clause.id === 'clause' + (index + 1);
    });

    let resultText = correctOrder ? "Contract is correctly ordered!" : "Contract is not in the right order, try again.";
    document.getElementById('result').innerText = resultText;
}
