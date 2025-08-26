// ========== Typing effect ==========
document.addEventListener("DOMContentLoaded", () => {
  const textEl = document.getElementById("typed-text");
  const words = ["a Data Analyst", "a Learner", "a Problem Solver"];
  let wordIndex = 0,
      charIndex = 0,
      isDeleting = false;

  function typeEffect() {
    const current = words[wordIndex];
    // Get substring based on deleting/typing
    const visible = current.substring(0, charIndex);
    textEl.textContent = visible;

    if (!isDeleting && charIndex < current.length) {
      charIndex++;
      setTimeout(typeEffect, 100); // typing speed
    } else if (!isDeleting && charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1200); // pause at full word
    } else if (isDeleting && charIndex > 0) {
      charIndex--;
      setTimeout(typeEffect, 60); // deleting speed
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(typeEffect, 300); // short pause before next word
    }
  }

  typeEffect();
});

// ========== Theme toggle ==========
const themeToggle = document.getElementById("theme-toggle");
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  document.body.classList.add("light");
  themeToggle.innerHTML = "☀️";
} else {
  document.body.classList.remove("light");
  themeToggle.innerHTML = "🌙";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  themeToggle.innerHTML = isLight ? "☀️" : "🌙";
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

// ========== Update footer year ==========
const yearSpan = document.getElementById("year");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// ========== Wave Animation ==========
const paths = document.querySelectorAll(".hero-waves path");
const width = 1440, height = 320;

const waves = [
  { amplitude: 25, wavelength: 600, speed: 0.008, phase: 0 },
  { amplitude: 35, wavelength: 800, speed: 0.006, phase: Math.PI / 2 },
  { amplitude: 20, wavelength: 1000, speed: 0.010, phase: Math.PI }
];

function generatePath({ amplitude, wavelength, phase }) {
  let d = `M0 ${height / 2}`;
  for (let x = 0; x <= width; x += 20) {
    const y = height / 2 + amplitude * Math.sin((x / wavelength) * 2 * Math.PI + phase);
    d += ` L${x} ${y}`;
  }
  return d;
}

// Animate waves continuously
function animateWaves() {
  waves.forEach((wave, i) => {
    wave.phase += wave.speed;
    paths[i].setAttribute("d", generatePath(wave));
    paths[i].setAttribute("stroke", `hsl(${(wave.phase * 50) % 360}, 80%, 60%)`);
  });
  requestAnimationFrame(animateWaves);
}
animateWaves();// ===== Smooth Interactive Ripple Waves =====
const hero = document.querySelector(".hero"); // track cursor over entire hero section
let mouseX = -1000, mouseY = -1000;

hero.addEventListener("mousemove", (e) => {
  const rect = hero.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
  mouseY = e.clientY - rect.top;
});

hero.addEventListener("mouseleave", () => {
  mouseX = -1000;
  mouseY = -1000;
});

function animateInteractiveWaves() {
  paths.forEach((path, i) => {
    const wave = waves[i];
    wave.phase += wave.speed;

    let d = `M0 ${height / 2}`;

    for (let x = 0; x <= width; x += 20) {
      // Base sine wave
      let y = height / 2 + wave.amplitude * Math.sin((x / wave.wavelength) * 2 * Math.PI + wave.phase);

      // Smooth ripple effect near cursor
      if (mouseX > 0) {
        const dist = Math.abs(x - mouseX);
        const radius = 200; // influence radius
        if (dist < radius) {
          const influence = Math.cos((dist / radius) * Math.PI) * 8; // subtle rise/fall
          y -= influence;
        }
      }

      d += ` L${x} ${y}`;
    }

    path.setAttribute("d", d);
    path.setAttribute("stroke", `hsl(${(wave.phase * 50) % 360}, 80%, 60%)`);
  });

  requestAnimationFrame(animateInteractiveWaves);
}

animateInteractiveWaves();
