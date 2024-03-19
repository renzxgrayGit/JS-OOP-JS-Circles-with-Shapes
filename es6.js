// Event listener for document click
document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", handleClick);
});

// Function to generate a random number between min and max
const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Function to handle mouse click event
const handleClick = (event) => {
    const radius = getRandomNumber(10, 200);
    const shape = selectedShape === 'circle' ? createCircle : 
                selectedShape === 'square' ? createSquare :
                selectedShape === 'star' ? createStar : null;
    if (shape) {
        const element = shape(event.clientX, event.clientY, radius);
        animateShape(element, radius);
    }
};

// Function to create a circle element
const createCircle = (x, y, radius) => {
    const circle = document.createElement("div");
    circle.classList.add("circle");
    circle.style.left = `${x - radius / 2}px`;
    circle.style.top = `${y - radius / 2}px`;
    circle.style.width = `${radius}px`;
    circle.style.height = `${radius}px`;
    circle.style.backgroundColor = selectedColor;
    document.body.appendChild(circle);
    return circle;
};

// Function to create a square element
const createSquare = (x, y, side) => {
    const square = document.createElement("div");
    square.classList.add("square");
    square.style.left = `${x - side / 2}px`; // Correct: sets left position centered at click
    square.style.top = `${y}px`;
    square.style.width = `${side}px`;
    square.style.height = `${side}px`;
    square.style.backgroundColor = selectedColor;
    document.body.appendChild(square);
    return square;
};

// Function to create a star element (for demonstration, you can implement your own)
/* const createStar = (x, y, size) => {
    alert("Creating star is not implemented. Add your own implementation.");
    return null;
}; */

// Function to animate the shape
const animateShape = (shape, initialSize) => {
    let currentSize = initialSize;
    const shrinkInterval = setInterval(() => {
        currentSize -= 1;
        shape.style.width = `${currentSize}px`;
        shape.style.height = `${currentSize}px`;
        shape.style.left = `${parseFloat(shape.style.left) + 0.5}px`;
        shape.style.top = `${parseFloat(shape.style.top) + 0.5}px`;
        if (currentSize <= 0) {
            clearInterval(shrinkInterval);
            shape.parentNode.removeChild(shape);
        }
    }, 30);
};  

// Function to select shape
let selectedShape = 'circle'; // Default shape
const selectShape = (shape) => {
    selectedShape = shape;
    resetShapeChoices();
    highlightSelectedShape(shape);
};

// Function to reset shape choices border
const resetShapeChoices = () => {
    const shapeChoices = document.getElementsByClassName("shapeChoice");
    for (let i = 0; i < shapeChoices.length; i++) {
        shapeChoices[i].style.border = "1px solid black";
    }
};

// Function to highlight selected shape
const highlightSelectedShape = (shape) => {
    const shapeChoice = document.getElementById(shape);
    if (shapeChoice) {
        shapeChoice.style.border = "3px solid black";
    }
};

// Function to reset the screen
const reset = () => {
    removeAllShapes();
    selectColor('#CCE8CC');
    selectShape('circle');
};

// Function to remove all shapes from the screen
const removeAllShapes = () => {
    const shapes = document.querySelectorAll(".circle, .square, .star");
    shapes.forEach(shape => shape.parentNode.removeChild(shape));
};

// Remaining functions (getRandomNumber, selectColor, resetColorChoices) remain the same

// Default color
let selectedColor = "#CCE8CC";

// Function to select color
const selectColor = (color) => {
    selectedColor = color;
    resetColorChoices();
    highlightSelectedColor(color);
};

// Function to reset color choices border
const resetColorChoices = () => {
    const colorChoices = document.getElementsByClassName("colorChoice");
    for (let i = 0; i < colorChoices.length; i++) {
        colorChoices[i].style.border = "1px solid black";
    }
};

// Function to highlight selected color
const highlightSelectedColor = (color) => {
    const colorChoice = document.getElementById(color);
    if (colorChoice) {
        colorChoice.style.border = "3px solid black";
    }
};
