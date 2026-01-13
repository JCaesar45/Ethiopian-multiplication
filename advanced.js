// Matrix background effect
const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
const matrixArray = matrix.split("");

const fontSize = 10;
const columns = canvas.width / fontSize;

const drops = [];
for (let x = 0; x < columns; x++) {
  drops[x] = 1;
}

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ff41";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(drawMatrix, 35);

// Ethiopian multiplication functions
function halve(n) {
  return Math.floor(n / 2);
}

function double(n) {
  return n * 2;
}

function isEven(n) {
  return n % 2 === 0;
}

function eth_mult(a, b) {
  let result = 0;
  let left = a;
  let right = b;
  const steps = [];

  while (left >= 1) {
    steps.push({
      left: left,
      right: right,
      isEven: isEven(left),
      added: !isEven(left)
    });

    if (!isEven(left)) {
      result += right;
    }
    left = halve(left);
    right = double(right);
  }

  return { result, steps };
}

// Create particle effect
function createParticle(x, y) {
  const particle = document.createElement("div");
  particle.className = "particle";
  particle.style.left = x + "px";
  particle.style.top = y + "px";
  particle.style.width = "4px";
  particle.style.height = "4px";
  particle.style.background = "#00ff41";
  particle.style.borderRadius = "50%";
  particle.style.boxShadow = "0 0 10px #00ff41";
  document.body.appendChild(particle);

  setTimeout(() => particle.remove(), 3000);
}

// Display calculation steps
function displaySteps(steps) {
  const container = document.getElementById("stepsContainer");
  container.innerHTML = "";

  steps.forEach((step, index) => {
    setTimeout(() => {
      const stepDiv = document.createElement("div");
      stepDiv.className = `step ${step.isEven ? "even" : ""}`;
      stepDiv.innerHTML = `
                        <span class="step-number">${index + 1}.</span>
                        <span>${step.left} × ${step.right}</span>
                        <span>${step.added ? "✓" : "✗"}</span>
                    `;
      container.appendChild(stepDiv);

      // Create particles
      const rect = stepDiv.getBoundingClientRect();
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          createParticle(
            rect.left + Math.random() * rect.width,
            rect.top + Math.random() * rect.height
          );
        }, i * 50);
      }
    }, index * 200);
  });
}

// Calculate button handler
document.getElementById("calculateBtn").addEventListener("click", function () {
  const num1 = parseInt(document.getElementById("num1").value);
  const num2 = parseInt(document.getElementById("num2").value);

  if (isNaN(num1) || isNaN(num2) || num1 < 1 || num2 < 1) {
    alert("Please enter valid positive integers");
    return;
  }

  const { result, steps } = eth_mult(num1, num2);

  // Animate button
  this.style.transform = "scale(0.95)";
  setTimeout(() => {
    this.style.transform = "scale(1)";
  }, 100);

  // Display result with animation
  const resultDisplay = document.getElementById("resultDisplay");
  const resultText = document.getElementById("resultText");
  resultText.textContent = `Result: ${result}`;
  resultDisplay.classList.add("show");

  // Display steps
  displaySteps(steps);

  // Create celebration particles
  const rect = resultDisplay.getBoundingClientRect();
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      createParticle(
        rect.left + Math.random() * rect.width,
        rect.top + Math.random() * rect.height
      );
    }, i * 30);
  }
});

// Tab switching
document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const lang = this.dataset.lang;

    // Update active buttons
    document
      .querySelectorAll(".tab-btn")
      .forEach((b) => b.classList.remove("active"));
    this.classList.add("active");

    // Update active content
    document.querySelectorAll(".tab-content").forEach((content) => {
      content.classList.remove("active");
    });
    document.getElementById(`${lang}-tab`).classList.add("active");
  });
});

// Input animations
document.querySelectorAll('input[type="number"]').forEach((input) => {
  input.addEventListener("focus", function () {
    this.style.transform = "scale(1.05)";
  });

  input.addEventListener("blur", function () {
    this.style.transform = "scale(1)";
  });
});

// Window resize handler
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Initial calculation
document.getElementById("calculateBtn").click();
