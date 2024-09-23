const alien = document.getElementById("alien");
const mountain = document.getElementById("mountain");
const timer = document.getElementById("timer");

const backgroundSound = document.getElementById("background-sound");
const jumpSound = document.getElementById("jump-sound");
const gameOverSound = document.getElementById("game-over-sound");

let timeInSec = 0;
let timerInterval;
let isJumping = false;

function startTime() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeInSec += 1;
    updateTimer();
  }, 10);
}

function updateTimer() {
  const dateObj = new Date(timeInSec * 10);
  const minutes = dateObj.getUTCMinutes().toString().padStart(2, "0");
  const seconds = dateObj.getSeconds().toString().padStart(2, "0");
  const miliSeconds = (dateObj.getMilliseconds() / 10).toString().padStart(2, "0");

  timer.textContent = `${minutes}:${seconds}:${miliSeconds}`;
}

function resetTime() {
  clearInterval(timerInterval);
  timeInSec = 0;
  timer.textContent = "00:00:00";
}

function jump() {
    if (!isJumping) {
      isJumping = true;
      alien.classList.add("game__jump");

      jumpSound.currentTime = 0;
      jumpSound.play();

      setTimeout(() => {
        alien.classList.remove("game__jump");
        isJumping = false;
      }, 600);
    }
}

document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      if (document.body.classList.contains("preload")) {
        document.body.classList.remove("preload");
        startTime();
        backgroundSound.play();

        mountain.style.visibility = 'hidden';

        setTimeout(() => {
          mountain.style.visibility = 'visible';
          mountain.style.animationPlayState = 'running';
        }, 2000);

        mountain.style.animationPlayState = 'paused';
      } else {
        jump();
      }
    }
});


const gameOverCheck = setInterval(() => {
    const topAlien = parseInt(window.getComputedStyle(alien).getPropertyValue("top"));
    const rightMountain = parseInt(window.getComputedStyle(mountain).getPropertyValue("right"));

    if (rightMountain > 505 && rightMountain < 540 && topAlien > -85) {
      const finalTime = timer.textContent;
      resetTime();

      gameOverSound.play();

      backgroundSound.pause();
      backgroundSound.currentTime = 0;

      alert(` 👽 Game Over \n ⌚ Timer: ${finalTime}`);
      document.body.classList.add("preload");

      mountain.style.visibility = 'hidden';
      mountain.style.animationPlayState = 'paused';
    }
}, 10);

