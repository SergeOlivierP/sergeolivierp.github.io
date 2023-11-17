function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));
}

function checkOrder() {
    const contract = document.getElementById("contractTemplate");
    let clauses = contract.getElementsByTagName("p");
    let correctOrder = true;
    for (let i = 0; i < clauses.length; i++) {
        if (parseInt(clauses[i].id.replace('clause', '')) !== i + 1) {
            correctOrder = false;
            break;
        }
    }
    let resultText = correctOrder ? "Contract is correctly ordered!" : "Contract is not in the right order, try again.";
    document.getElementById("result").innerText = resultText;
}
