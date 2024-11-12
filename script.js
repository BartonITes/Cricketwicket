const output = document.getElementById("output");
const userInput = document.getElementById("userInput");
const gameButton = document.getElementById("gameButton");

let phase = "tossChoice"; // Track game phase
let tossChoice, computerChoice, choice;
let isBatting, wicket, runs, runs2; 

// Initialize or reset game state
function initializeGame() {
    wicket = 0;
    runs = 0;
    runs2 = 0;
    tossChoice = null;
    computerChoice = null;
    choice = null;
    isBatting = false;
    phase = "tossChoice";
    output.innerHTML = "";
    addToOutput("Welcome! Choose 1 for odd or 2 for even to proceed with the toss.");
}

// Add text to the output box
function addToOutput(text) {
    const paragraph = document.createElement("p");
    paragraph.innerText = text;
    output.appendChild(paragraph);
    output.scrollTop = output.scrollHeight;
}

// Main game handler
function gameHandler() {
    const input = parseInt(userInput.value);
    userInput.value = "";

    switch (phase) {
        case "tossChoice":
            if (input === 1 || input === 2) {
                tossChoice = input;
                computerChoice = tossChoice === 1 ? 2 : 1;
                phase = "toss";
                addToOutput(`You chose ${tossChoice === 1 ? 'odd' : 'even'} for the toss.`);
                addToOutput("Enter a toss number between 1 and 5.");
            } else {
                addToOutput("Invalid input! Please enter 1 for odd or 2 for even.");
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
                    addToOutput("Computer won the toss! You choose 1 to bat or 2 to bowl.");
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
                addToOutput(`You chose to ${isBatting ? 'bat' : 'bowl'} first.`);
                addToOutput(isBatting ? "Enter your run (0-6):" : "Enter your bowl (0-6):");
            } else {
                addToOutput("Invalid choice! Enter 1 to bat or 2 to bowl.");
            }
            break;

        case "play":
            if (input >= 0 && input <= 6) {
                const computerPlay = Math.floor(Math.random() * 7);

                if (isBatting) {
                    // Player is batting
                    if (input === computerPlay) {
                        wicket++;
                        addToOutput(`You lost a wicket! Wickets: ${wicket}`);
                    } else {
                        runs += input;
                        addToOutput(`Scored ${input} runs. Total runs: ${runs}`);
                    }

                    if (wicket === 2) {
                        phase = "defend";
                        wicket = 0;
                        addToOutput(`You lost two wickets for ${runs} runs. Now, it's time to bowl.`);
                    }
                } else {
                    // Player is bowling
                    if (input === computerPlay) {
                        wicket++;
                        addToOutput(`Gained a wicket! Wickets: ${wicket}`);
                    } else {
                        runs2 += computerPlay;
                        addToOutput(`Computer scored ${computerPlay} runs. Total computer score: ${runs2}`);
                    }

                    if (wicket === 2 || runs2 >= runs) {
                        const result = runs2 >= runs ? `Computer chased your score! You lost by ${runs2 - runs} runs.` : `You defended successfully! You won by ${runs - runs2} runs.`;
                        addToOutput(result);
                        gameButton.disabled = true;
                        addToOutput("Game over.");
                    }
                }
            } else {
                addToOutput("Invalid input! Enter a number between 0 and 6.");
            }
            break;

        case "defend":
            // Second innings, player bowling, defending the score
            if (input >= 0 && input <= 6) {
                const computerPlay = Math.floor(Math.random() * 7);

                if (input === computerPlay) {
                    wicket++;
                    addToOutput(`Gained a wicket! Wickets: ${wicket}`);
                } else {
                    runs2 += computerPlay;
                    addToOutput(`Computer scored ${computerPlay} runs. Total computer score: ${runs2}`);
                }

                if (wicket === 2 || runs2 >= runs) {
                    const result = runs2 >= runs ? `Computer chased your score! You lost by ${runs2 - runs} runs.` : `You defended the score! You won by ${runs - runs2} runs.`;
                    addToOutput(result);
                    gameButton.disabled = true;
                    addToOutput("Game over.");
                }
            } else {
                addToOutput("Invalid input! Enter a number between 0 and 6.");
            }
            break;
    }
}

// Initialize the game when the page loads
initializeGame();
                        
