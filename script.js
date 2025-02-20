let data = [];
let currentIndex = 0;

// Load JSON data
fetch("data.json")
    .then(response => response.json())
    .then(jsonData => {
        data = jsonData;
        showGrid();
    })
    .catch(error => console.error("Error loading JSON:", error));

// Function to update grids
function showGrid() {
    if (data.length === 0) return;
    
    const inputGrid = data[currentIndex].input_grid;
    const outputGrid = data[currentIndex].output_grid;
    const concept = data[currentIndex].concept;
    
    document.getElementById("concept").innerText = `Concept: ${concept}`;
    
    renderGrid(inputGrid, "inputGrid");
    renderGrid(outputGrid, "outputGrid");
}

// Function to create grid elements
function renderGrid(gridData, elementId) {
    const gridElement = document.getElementById(elementId);
    gridElement.innerHTML = "";
    gridElement.style.gridTemplateColumns = `repeat(${gridData[0].length}, 30px)`;

    gridData.forEach(row => {
        row.forEach(cell => {
            const cellDiv = document.createElement("div");
            cellDiv.className = "cell";
            cellDiv.style.backgroundColor = getColor(cell);
            cellDiv.innerText = cell;
            gridElement.appendChild(cellDiv);
        });
    });
}

// Function to cycle grids
function nextGrid() {
    currentIndex = (currentIndex + 1) % data.length;
    showGrid();
}
function prevGrid() {
    currentIndex = (currentIndex - 1 + data.length) % data.length;
    showGrid();
}

// Function to map numbers to colors
function getColor(num) {
    const colors = ["#000000", "#0074D9", "#FF4136", "#2ECC40", "#FFDC00",
                    "#AAAAAA", "#F012BE", "#FF851B", "#7FDBFF", "#870C25"];
    return colors[num] || "#FFFFFF";
}
