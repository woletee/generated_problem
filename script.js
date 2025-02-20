let problems = [];
let currentIndex = 0;

// Load JSON dynamically
fetch("data.json")
    .then(response => response.json())
    .then(data => {
        problems = data;
        displayGrid(problems[currentIndex]);
    })
    .catch(error => console.error("Error loading JSON:", error));

function drawGrid(containerId, gridData) {
    const container = document.getElementById(containerId);
    container.innerHTML = ""; // Clear previous grid
    const rows = gridData.length;
    const cols = gridData[0].length;
    
    container.style.gridTemplateRows = `repeat(${rows}, 40px)`;
    container.style.gridTemplateColumns = `repeat(${cols}, 40px)`;

    const colors = ["#000000", "#0074D9", "#FF4136", "#2ECC40", "#FFDC00",
                    "#AAAAAA", "#F012BE", "#FF851B", "#7FDBFF", "#870C25"];

    gridData.forEach(row => {
        row.forEach(cellValue => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.style.backgroundColor = colors[cellValue % colors.length];
            cell.textContent = cellValue; // Show number
            container.appendChild(cell);
        });
    });
}

function displayGrid(problem) {
    document.getElementById("concept").textContent = `Concept: ${problem.concept}`;
    drawGrid("inputGrid", problem.input_grid);
    drawGrid("outputGrid", problem.output_grid);
}

function prevGrid() {
    if (currentIndex > 0) {
        currentIndex--;
        displayGrid(problems[currentIndex]);
    }
}

function nextGrid() {
    if (currentIndex < problems.length - 1) {
        currentIndex++;
        displayGrid(problems[currentIndex]);
    }
}
