const choices = document.querySelectorAll(".choice");
const score = document.getElementById("score");
const result = document.getElementById("result");
const restart = document.getElementById("restart");
const modal = document.querySelector(".modal");
const scoreboard = {
  player: 0,
  computer: 0
};

// Play Game

function play(e) {
  restart.style.display = "inline-block";
  const playerChoice = e.target.id;
  const computerChoice = getComputerChoice();
  const winner = getWinner(playerChoice, computerChoice);
  showWinner(winner, computerChoice);
}

// Get computer's choice

function getComputerChoice() {
  const rand = Math.random();
  if (rand < 0.34) {
    return "kamień";
  } else if (rand <= 0.67) {
    return "papier";
  } else {
    return "nożyce";
  }
}

// Get game winner
function getWinner(p, c) {
  if (p === c) {
    return "draw";
  } else if (p === "rock") {
    if (c === "paper") {
      return "computer";
    } else {
      return "player";
    }
  } else if (p === "paper") {
    if (c === "scissors") {
      return "computer";
    } else {
      return "player";
    }
  } else if (p === "scissors") {
    if (c === "rock") {
      return "computer";
    } else {
      return "player";
    }
  }
}

function showWinner(winner, computerChoice) {
  if (winner === "player") {
    // increment player's score
    scoreboard.player++;
    // also show modal result
    result.innerHTML = `
      <i class="fas fa-times"></i>
      <h1 class="text-win">Wygrywasz!</h1>
      <i class="fas fa-hand-${computerChoice} fa-10x"></i>
      <p>Komputer wybrał <strong>${computerChoice.charAt(0).toUpperCase() +
        computerChoice.slice(1)}</strong></p>
    `;
  } else if (winner === "computer") {
    scoreboard.computer++;
    result.innerHTML = `
      <i class="fas fa-times"></i>
      <h1 class="text-lose">Przegrywasz!</h1>
      <i class="fas fa-hand-${computerChoice} fa-10x"></i>
      <p>Komputer wybrał <strong>${computerChoice.charAt(0).toUpperCase() +
        computerChoice.slice(1)}</strong></p>
      `;
  } else {
    result.innerHTML = `
      <i class="fas fa-times"></i>
      <h1 class="text-win">Remis!</h1>
      <i class="fas fa-hand-${computerChoice} fa-10x"></i>
      <p>Komputer wybrał <strong>${computerChoice.charAt(0).toUpperCase() +
        computerChoice.slice(1)}</strong></p>
      `;
  }
  // Show score
  score.innerHTML = `
  <p>Gracz: ${scoreboard.player} </p>
  <p>Komputer: ${scoreboard.computer} </p>`;

  modal.style.display = "block";
  modal.querySelector(".fa-times").addEventListener("click", () => {
    modal.style.display = "none";
  });
}

// Restart game
function restartGame() {
  scoreboard.player = 0;
  scoreboard.computer = 0;
  score.innerHTML = `
    <p>Player: 0</p>
    <p>Computer: 0</p>
  `;
  restart.style.display = "none";
}

//Clear modal
function clearModal(e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
}

// Event listeners
choices.forEach(choice => choice.addEventListener("click", play));
window.addEventListener("click", clearModal);
restart.addEventListener("click", restartGame);
