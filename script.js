fetch("data.json")
    .then(response => response.json())
    .then(data => {
        if (!Array.isArray(data) || data.length === 0) {
            console.error("No valid data found in JSON!");
            return;
        }
        displayAllProblems(data);
    })
    .catch(error => console.error("Error loading JSON:", error));

function displayAllProblems(problems) {
    const container = document.getElementById("problemsContainer");
    container.innerHTML = ""; // Clear previous content

    problems.forEach((problem, index) => {
        // Create a container for each problem set
        const problemDiv = document.createElement("div");
        problemDiv.classList.add("problem-container");

        // Create the concept label
        const conceptLabel = document.createElement("div");
        conceptLabel.classList.add("concept-label");
        conceptLabel.textContent = `Concept: ${problem.concept}`;
        problemDiv.appendChild(conceptLabel);

        // Create a div for the grids
        const gridsDiv = document.createElement("div");
        gridsDiv.classList.add("grid-container");

        // Input Grid
        const inputWrapper = document.createElement("div");
        inputWrapper.classList.add("grid-wrapper");
        inputWrapper.innerHTML = "<div class='grid-title'>Input Grid</div>";
        const inputGrid = document.createElement("div");
        inputGrid.classList.add("grid");
        inputWrapper.appendChild(inputGrid);
        gridsDiv.appendChild(inputWrapper);

        // Output Grid
        const outputWrapper = document.createElement("div");
        outputWrapper.classList.add("grid-wrapper");
        outputWrapper.innerHTML = "<div class='grid-title'>Output Grid</div>";
        const outputGrid = document.createElement("div");
        outputGrid.classList.add("grid");
        outputWrapper.appendChild(outputGrid);
        gridsDiv.appendChild(outputWrapper);

        // Append both grids to the problem container
        problemDiv.appendChild(gridsDiv);
        container.appendChild(problemDiv);

        // Draw the grids
        drawGrid(inputGrid, problem.input_grid);
        drawGrid(outputGrid, problem.output_grid);
    });
}

function drawGrid(container, gridData) {
    if (!gridData || gridData.length === 0) {
        console.error("Grid data is missing or empty!", gridData);
        return;
    }

    container.innerHTML = ""; // Clear previous grid
    const rows = gridData.length;
    const cols = gridData[0].length;

    container.style.display = "grid";
    container.style.gridTemplateRows = `repeat(${rows}, 40px)`;
    container.style.gridTemplateColumns = `repeat(${cols}, 40px)`;

    const colors = ["#000000", "#0074D9", "#FF4136", "#2ECC40", "#FFDC00",
                    "#AAAAAA", "#F012BE", "#FF851B", "#7FDBFF", "#870C25"];

    gridData.forEach(row => {
        row.forEach(cellValue => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.style.backgroundColor = colors[cellValue % colors.length];
            container.appendChild(cell);
        });
    });
}
