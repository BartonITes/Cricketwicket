const output = document.getElementById("output");
const userInput = document.getElementById("userInput");
const gameButton = document.getElementById("gameButton");

let phase = "tossChoice";
let tossChoice, computerChoice, choice;
let isBatting, wicket, runs, runs2;
let gameOver = false;
let i = 1;  // keep track of ongoing phase

// Initialize or reset game
function initializeGame() {
    wicket = 0;
    runs = 0;
    runs2 = 0;
    tossChoice = null;
    computerChoice = null;
    choice = null;
    isBatting = false;
    phase = "tossChoice";
    gameOver = false;
    gameButton.disabled = false;
    output.innerHTML = "";
    addToOutput("Welcome! Enter 1 for odd or 2 for even for the toss.");
}

// Add text to the output box
function addToOutput(text) {
    const paragraph = document.createElement("p");
    paragraph.innerText = text;
    output.appendChild(paragraph);
    output.scrollTop = output.scrollHeight;
}

// Main game logic
function gameHandler() {
    if (gameOver) return; // Prevent further input after game is over

    const input = parseInt(userInput.value);
    userInput.value = "";

    switch (phase) {
        case "tossChoice":
            if (input === 1 || input === 2) {
                tossChoice = input;
                computerChoice = tossChoice === 1 ? 2 : 1;
                phase = "toss";
                addToOutput("Choose a number between 1 and 5 for the toss.");
            } else {
                addToOutput("Invalid choice! Enter 1 for odd or 2 for even.");
            }
            break;

        case "toss":
            if (input >= 1 && input <= 5) {
                const toss = Math.floor(Math.random() * 5) + 1;
                const outcome = toss + input;
                addToOutput(`You chose ${input}, computer chose ${toss}. Total is ${outcome}.`);

                if ((outcome % 2 === 0 && tossChoice === 2) || (outcome % 2 !== 0 && tossChoice === 1)) {
                    phase = "batBowlChoice";
                    addToOutput("You won the toss! Enter 1 to bat or 2 to bowl.");
                } else {
                    phase = "batBowlChoice";
                    addToOutput("Computer won the toss! Enter 1 to bat or 2 to bowl.");
                }
            } else {
                addToOutput("Invalid toss number! Enter a number between 1 and 5.");
            }
            break;

        case "batBowlChoice":
            if (input === 1 || input === 2) {
                choice = input;
                isBatting = (choice === 1);
                phase = "play";
                addToOutput(`You chose to ${isBatting ? 'bat' : 'bowl'} first. Enter a number between 0 and 6.`);
            } else {
                addToOutput("Invalid choice! Enter 1 to bat or 2 to bowl.");
            }
            break;

        case "play":
            if (input >= 0 && input <= 6) {
                const computerPlay = Math.floor(Math.random() * 7);

                if (isBatting) {
                    // Batting phase
                    if (input === computerPlay) {
                        wicket++;
                        addToOutput("Lost a wicket!");
                    } else {
                        runs += input;
                        addToOutput(`You scored ${input}. Total runs: ${runs}`);
                    }

                    if (wicket === 2) {
                        phase = "defend";
                        addToOutput(`All out! You scored ${runs}. Now it's time to defend.`);
                    }
                } else {
                    // Bowling phase
                    if (input === computerPlay) {
                        wicket++;
                        addToOutput("Gained a wicket!");
                    } else {
                        runs2 += computerPlay;
                        addToOutput(`Computer scored ${computerPlay}. Total: ${runs2}`);
                    }

                    if (wicket === 2 || runs2 >= runs) {
                        const result = runs2 >= runs ? "Computer chased the score!" : "You defended the score!";
                        addToOutput(result);
                        gameOver = true;
                        gameButton.disabled = true;
                    }
                }
            } else {
                addToOutput("Invalid input! Enter a number between 0 and 6.");
            }
            break;

        case "defend":
            // Defending phase after initial batting
            if (input >= 0 && input <= 6) {
                const computerPlay = Math.floor(Math.random() * 7);

                // Check if the user lost a wicket
                if (input === computerPlay) {
                    wicket++;
                    addToOutput("Lost a wicket!");
                } else {
                    runs += input;  // Add runs for the user
                    addToOutput(`You scored ${input}. Total runs: ${runs}`);
                }

                // Check if user lost two wickets or can't defend
                if (wicket === 2) {
                    addToOutput(`You lost two wickets and lost by ${runs2 - runs} runs.`);
                    gameOver = true;
                    gameButton.disabled = true;
                }

                if (runs2 === runs) {
                    addToOutput("You tied the game!");
                    gameOver = true;
                    gameButton.disabled = true;
                }

                if (runs2 > runs) {
                    addToOutput(`You lost the game by ${runs2 - runs} runs.`);
                    gameOver = true;
                    gameButton.disabled = true;
                }
            } else {
                addToOutput("Invalid input! Enter a number between 0 and 6.");
            }
            break;
    }
}

// Initialize game on load
initializeGame();
