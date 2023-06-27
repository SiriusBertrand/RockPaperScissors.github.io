// Global variables for keeping track of scores and rounds
let playerScore = 0;
let computerScore = 0;
let currentRound = 0;
const totalRounds = 3;

// Function to update the scoreboard
function updateScoreboard() {
  const playerScoreElement = document.querySelector(".player-score");
  const computerScoreElement = document.querySelector(".computer-score");
  playerScoreElement.textContent = `Player: ${playerScore}`;
  computerScoreElement.textContent = `Computer: ${computerScore}`;
}

// Function to display the round result message
function displayRoundResultMessage(roundResult) {
  const roundResultElement = document.getElementById("round-result");
  roundResultElement.textContent = roundResult;
}

// Function to display the end game message and the "Play Again?" button
function displayEndGameMessage(message) {
  const endGameContainer = document.getElementById("end-game");
  const playAgainButton = document.createElement("button");
  playAgainButton.textContent = "Play Again?";
  playAgainButton.addEventListener("click", resetGame);

  endGameContainer.innerHTML = "";
  endGameContainer.appendChild(document.createTextNode(message));
  endGameContainer.appendChild(document.createElement("br"));
  endGameContainer.appendChild(playAgainButton);
}

// Function to check the winner of the round
function checkRoundWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return "It's a tie!";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    playerScore++;
    return "Player wins!";
  } else {
    computerScore++;
    return "Computer wins!";
  }
}

// Function to handle player's choice and initiate the game logic
function playGame(playerChoice) {
  // Get the player's and computer's choice elements
  const playerChoiceElement = document.getElementById("player-choice");
  const computerChoiceElement = document.getElementById("computer-choice");

  // Update the choice elements with the chosen icons
  playerChoiceElement.innerHTML = `<i class="fas fa-hand-${playerChoice}"></i>`;
  const computerChoice = getRandomChoice();
  computerChoiceElement.innerHTML = `<i class="fas fa-hand-${computerChoice}"></i>`;

  if (currentRound === 0) {
    // First round, display round result message
    const roundResult = checkRoundWinner(playerChoice, computerChoice);
    displayRoundResultMessage(roundResult);
    currentRound++;
  } else {
    // Subsequent rounds, check if game should end
    const roundResult = checkRoundWinner(playerChoice, computerChoice);
    if (roundResult !== "It's a tie!") {
      displayRoundResultMessage(roundResult);
    }

    if (playerScore === 1 && computerScore === 1) {
      // Game tied, next win takes all
      displayRoundResultMessage("Looks like it's a tie, next win takes all");
    } else if (playerScore === 2) {
      // Player wins 2 out of 3 games
      displayEndGameMessage("Congratulations! You won 2 out of 3 games!");
    } else if (computerScore === 2) {
      // Computer wins 2 out of 3 games
      displayEndGameMessage(
        "Oh no! Computer won 2 out of 3 games! Better luck next time!"
      );
    } else {
      currentRound++;
      if (currentRound <= totalRounds) {
        // Display round result message
        displayRoundResultMessage(
          roundResult === "It's a tie!"
            ? roundResult
            : `Round ${currentRound} goes to ${roundResult}`
        );
      }
    }
  }

  // Update the scoreboard
  updateScoreboard();
}

// Function to reset the game
function resetGame() {
  playerScore = 0;
  computerScore = 0;
  currentRound = 0;

  // Reset choices and round result on the screen
  const playerChoiceElement = document.getElementById("player-choice");
  const computerChoiceElement = document.getElementById("computer-choice");
  const roundResultElement = document.getElementById("round-result");
  playerChoiceElement.textContent = "";
  computerChoiceElement.textContent = "";
  roundResultElement.textContent = "";

  // Reset the scoreboard
  updateScoreboard();

  // Clear the end game message and "Play Again?" button
  const endGameContainer = document.getElementById("end-game");
  endGameContainer.innerHTML = "";
}

// Helper function to generate a random choice for the computer
function getRandomChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}
