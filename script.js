function addTask(column) {
    let taskText = prompt("Enter the task:");
    if (taskText) {
        let task = document.createElement("div");
        task.className = "task";
        task.textContent = taskText;
        task.draggable = true;
        task.addEventListener('dragstart', dragStart);
        document.getElementById(column + "Tasks").appendChild(task);
    }
}

function dragStart(e) {
    e.dataTransfer.setData("text/plain", e.target.id);
    e.dropEffect = "move";
}

document.querySelectorAll('.tasks').forEach(column => {
    column.addEventListener('dragover', dragOver);
    column.addEventListener('drop', drop);
});

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    const task = document.getElementById(data);
    if (task && e.target.className === "tasks") {
        e.target.appendChild(task);
    }
}
