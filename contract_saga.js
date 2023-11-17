document.addEventListener('DOMContentLoaded', () => {
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
        return clause;
    });

    // Randomize clauses
    clauses.sort(() => Math.random() - 0.5);

    // Add clauses to the DOM
    const clausesContainer = document.getElementById('clauses');
    clauses.forEach(clause => clausesContainer.appendChild(clause));

    // Enable reordering within the list
    clausesContainer.addEventListener('dragover', (event) => {
        event.preventDefault();
        const afterElement = getDragAfterElement(clausesContainer, event.clientY);
        const draggable = document.querySelector('.dragging');
        if (afterElement == null) {
            clausesContainer.appendChild(draggable);
        } else {
            clausesContainer.insertBefore(draggable, afterElement);
        }
    });
});

function dragStart(event) {
    event.target.classList.add('dragging');
    setTimeout(() => event.target.classList.remove('dragging'), 0);
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.clause:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function checkOrder() {
    const clauses = document.querySelectorAll('#clauses .clause');
    const correctOrder = Array.from(clauses).every((clause, index) => {
        return clause.id === 'clause' + (index + 1);
    });

    document.getElementById('result').innerText = correctOrder ? "Contract is correctly ordered!" : "Contract is not in the right order, try again.";
}
