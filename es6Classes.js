class Shape {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }

    animate() {
        let currentSize = this.size;
        const shrinkInterval = setInterval(() => {
            currentSize -= 1;
            if (this.shape) { // Check if shape is initialized
                this.shape.style.width = `${currentSize}px`;
                this.shape.style.height = `${currentSize}px`;
                this.shape.style.left = `${parseFloat(this.shape.style.left) + 0.5}px`;
                this.shape.style.top = `${parseFloat(this.shape.style.top) + 0.5}px`;
            } 
            if (currentSize <= 0) {
                clearInterval(shrinkInterval);
                this.shape.parentNode.removeChild(this.shape);
            }
        }, 30);
    }
}

class Circle extends Shape {
    constructor(x, y, radius) {
        super(x, y, radius);
        this.create();
    }

    create() {
        this.shape = document.createElement("div");
        this.shape.classList.add("circle");
        this.shape.style.left = `${this.x - this.size / 2}px`;
        this.shape.style.top = `${this.y - this.size / 2}px`;
        this.shape.style.width = `${this.size}px`;
        this.shape.style.height = `${this.size}px`;
        this.shape.style.backgroundColor = selectedColor;
        document.body.appendChild(this.shape);
    }
}

class Square extends Shape {
    constructor(x, y, side) {
        super(x, y, side);
        this.create();
    }

    create() {
        this.shape = document.createElement("div");
        this.shape.classList.add("square");
        this.shape.style.left = `${this.x - this.size / 2}px`;
        this.shape.style.top = `${this.y}px`;
        this.shape.style.width = `${this.size}px`;
        this.shape.style.height = `${this.size}px`;
        this.shape.style.backgroundColor = selectedColor;
        document.body.appendChild(this.shape);
    }
}

// Add the rest of the classes (Star) if needed...

document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", handleClick);
});

const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const handleClick = (event) => {
    const radius = getRandomNumber(10, 200);
    const shape = selectedShape === 'circle' ? new Circle(event.clientX, event.clientY, radius) :
                  selectedShape === 'square' ? new Square(event.clientX, event.clientY, radius) :
                  selectedShape === 'star' ? createStar(event.clientX, event.clientY, radius) : null;
    if (shape) {
        shape.animate();
    }
};

let selectedShape = 'circle'; // Default shape

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

const selectShape = (shape) => {
    selectedShape = shape;
    resetShapeChoices();
    highlightSelectedShape(shape);
};

let selectedColor = "#CCE8CC";

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

const selectColor = (color) => {
    selectedColor = color;
    resetColorChoices();
    highlightSelectedColor(color);
};

