// Define each floating box and assign random starting positions and velocities
const boxes = [
  {
    el: document.getElementById("box1"),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.5, // slow velocity
    vy: (Math.random() - 0.5) * 0.5
  },
  {
    el: document.getElementById("box2"),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5
  },
  {
    el: document.getElementById("box3"),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5
  }
];

// Get the central container's rectangle for collision detection
const centerBox = document.getElementById("centerBox");

function updatePositions() {
  const centerRect = centerBox.getBoundingClientRect();

  boxes.forEach(box => {
    const boxEl = box.el;
    const boxRect = boxEl.getBoundingClientRect();

    // Update positions
    box.x += box.vx;
    box.y += box.vy;

    // Check collision with viewport edges
    if (box.x < 0 || box.x + boxRect.width > window.innerWidth) {
      box.vx *= -1;
    }
    if (box.y < 0 || box.y + boxRect.height > window.innerHeight) {
      box.vy *= -1;
    }

    // Check collision with the central container
    if (
      boxRect.right > centerRect.left &&
      boxRect.left < centerRect.right &&
      boxRect.bottom > centerRect.top &&
      boxRect.top < centerRect.bottom
    ) {
      // Reverse both velocities on collision
      box.vx *= -1;
      box.vy *= -1;
    }

    // Apply the updated position
    boxEl.style.left = box.x + "px";
    boxEl.style.top = box.y + "px";
  });

  requestAnimationFrame(updatePositions);
}

// Set initial positions for boxes
boxes.forEach(box => {
  box.el.style.left = box.x + "px";
  box.el.style.top = box.y + "px";
});

// Start the animation loop
requestAnimationFrame(updatePositions);

// Optional: Update positions if the window is resized
window.addEventListener("resize", () => {
  boxes.forEach(box => {
    // Ensure boxes are within the viewport bounds after a resize
    box.x = Math.min(box.x, window.innerWidth - box.el.offsetWidth);
    box.y = Math.min(box.y, window.innerHeight - box.el.offsetHeight);
  });
});

