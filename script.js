document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("fileInput");

    fileInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (e) {
            const jsonData = JSON.parse(e.target.result);
            displayGrids(jsonData[0]); // Display first item in JSON
        };
        reader.readAsText(file);
    });
});

function drawGrid(canvasId, gridData) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");

    const gridSize = gridData.length;
    const cellSize = 40; // Cell size in pixels

    canvas.width = gridData[0].length * cellSize;
    canvas.height = gridData.length * cellSize;

    const colors = ["#000000", "#0074D9", "#FF4136", "#2ECC40", "#FFDC00",
                    "#AAAAAA", "#F012BE", "#FF851B", "#7FDBFF", "#870C25"];

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridData[row].length; col++) {
            ctx.fillStyle = colors[gridData[row][col] % colors.length];
            ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
            ctx.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);
        }
    }
}

function displayGrids(task) {
    drawGrid("inputCanvas", task.input_grid);
    drawGrid("outputCanvas", task.output_grid);
}
