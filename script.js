const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const upload = document.getElementById('upload');
const bgColor = document.getElementById('bg-color');
const imgWidthInput = document.getElementById('img-width');
const imgHeightInput = document.getElementById('img-height');
const imgXInput = document.getElementById('img-x');
const imgYInput = document.getElementById('img-y');
const canvasWidthInput = document.getElementById('canvas-width');
const canvasHeightInput = document.getElementById('canvas-height');
const downloadBtn = document.getElementById('download');
let img = new Image();
let imgWidth = 400;
let imgHeight = 400;
let imgX = 200;
let imgY = 200;

// Set initial canvas dimensions
canvas.width = 800;
canvas.height = 800;

// Function to update the canvas
function updateCanvas() {
    // Resize the canvas based on user input
    canvas.width = parseInt(canvasWidthInput.value);
    canvas.height = parseInt(canvasHeightInput.value);

    // Set background color
    ctx.fillStyle = bgColor.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the uploaded image
    if (img.src) {
        ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight);
    }
}

// Handle image upload
upload.addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        img.src = e.target.result;
        img.onload = updateCanvas;
    };
    reader.readAsDataURL(file);
});

// Handle background color change
bgColor.addEventListener('input', updateCanvas);

// Handle image resizing and positioning with text inputs
imgWidthInput.addEventListener('input', function() {
    imgWidth = parseInt(this.value);
    updateCanvas();
});

imgHeightInput.addEventListener('input', function() {
    imgHeight = parseInt(this.value);
    updateCanvas();
});

imgXInput.addEventListener('input', function() {
    imgX = parseInt(this.value);
    updateCanvas();
});

imgYInput.addEventListener('input', function() {
    imgY = parseInt(this.value);
    updateCanvas();
});

// Handle canvas resizing with text inputs
canvasWidthInput.addEventListener('input', updateCanvas);
canvasHeightInput.addEventListener('input', updateCanvas);

// Download the image
downloadBtn.addEventListener('click', function() {
    const link = document.createElement('a');
    link.download = 'custom-image.png';
    link.href = canvas.toDataURL();
    link.click();
});
