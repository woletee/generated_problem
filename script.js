document.addEventListener("DOMContentLoaded", () => {
    fetchCategories();
});

function fetchCategories() {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            if (!data.categories || data.categories.length === 0) {
                console.error("No categories found!");
                return;
            }
            displayCategories(data.categories);
        })
        .catch(error => console.error("Error loading categories:", error));
}

function displayCategories(categories) {
    const container = document.getElementById("categoryContainer");
    container.innerHTML = ""; 

    categories.forEach(category => {
        const categoryButton = document.createElement("button");
        categoryButton.textContent = category.name;
        categoryButton.classList.add("category-button");
        categoryButton.addEventListener("click", () => fetchCategoryData(category.file));
        container.appendChild(categoryButton);
    });
}

function fetchCategoryData(categoryFile) {
    fetch(categoryFile)
        .then(response => response.json())
        .then(data => {
            if (!Array.isArray(data) || data.length === 0) {
                console.error("No valid data found in JSON!");
                return;
            }
            displayAllProblems(data);
        })
        .catch(error => console.error("Error loading JSON:", error));
}

function displayAllProblems(problems) {
    const container = document.getElementById("problemsContainer");
    container.innerHTML = ""; 

    const backButton = document.createElement("button");
    backButton.textContent = "← Back to Categories";
    backButton.classList.add("back-button");
    backButton.addEventListener("click", fetchCategories);
    container.appendChild(backButton);

    problems.forEach(problem => {
        const problemDiv = document.createElement("div");
        problemDiv.classList.add("problem-container");

        const conceptLabel = document.createElement("div");
        conceptLabel.classList.add("concept-label");
        conceptLabel.textContent = `Concept: ${problem.concept}`;
        problemDiv.appendChild(conceptLabel);

        const gridsDiv = document.createElement("div");
        gridsDiv.classList.add("grid-container");

        ["Input", "Output"].forEach(type => {
            const wrapper = document.createElement("div");
            wrapper.classList.add("grid-wrapper");
            wrapper.innerHTML = `<div class='grid-title'>${type} Grid</div>`;
            const grid = document.createElement("div");
            grid.classList.add("grid");
            wrapper.appendChild(grid);
            gridsDiv.appendChild(wrapper);
            drawGrid(grid, problem[`${type.toLowerCase()}_grid`]);
        });

        problemDiv.appendChild(gridsDiv);
        container.appendChild(problemDiv);
    });
}

function drawGrid(container, gridData) {
    container.innerHTML = "";
    container.style.display = "grid";
    container.style.gridTemplateRows = `repeat(${gridData.length}, 40px)`;
    container.style.gridTemplateColumns = `repeat(${gridData[0].length}, 40px)`;

    gridData.flat().forEach(value => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.style.backgroundColor = ["#000", "#0074D9", "#FF4136", "#2ECC40", "#FFDC00"][value % 5];
        container.appendChild(cell);
    });
}
