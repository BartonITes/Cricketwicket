const output = document.getElementById("output");
const userInput = document.getElementById("userInput");
const gameButton = document.getElementById("gameButton");

let tossChoice, choice, wicket = 0, runs = 0, runs2 = 0;
let isBatting = false;
let phase = "tossChoice";

function addToOutput(text) {
    const paragraph = document.createElement("p");
    paragraph.innerText = text;
    output.appendChild(paragraph);
    output.scrollTop = output.scrollHeight;
}

function gameHandler() {
    const input = parseInt(userInput.value);
    userInput.value = "";
    
    if (phase === "tossChoice") {
        tossChoice = input;
        addToOutput(`You chose ${tossChoice === 1 ? 'odd' : 'even'} for the toss.`);
        phase = "toss";
        addToOutput("Enter your toss number between 1 and 5.");
    } else if (phase === "toss") {
        const toss = Math.floor(Math.random() * 5) + 1;
        const outcome = toss + input;
        addToOutput(`Computer chose ${toss}. Total is ${outcome}.`);

        if ((outcome % 2 === 0 && tossChoice === 2) || (outcome % 2 !== 0 && tossChoice === 1)) {
            phase = "batBowlChoice";
            addToOutput("You won the toss! Enter 1 to bat or 2 to bowl.");
        } else {
            phase = "batBowlChoice";
            addToOutput("Computer won the toss! Choose 1 to bat or 2 to bowl.");
        }
    } else if (phase === "batBowlChoice") {
        choice = input;
        isBatting = (choice === 1);
        addToOutput(`You chose to ${isBatting ? 'bat' : 'bowl'}. Game starts!`);
        phase = "play";
        addToOutput(isBatting ? "Enter your run (0-6):" : "Enter your bowl (0-6):");
    } else if (phase === "play") {
        const computerPlay = Math.floor(Math.random() * 7);

        if (isBatting) {
            if (input === computerPlay) {
                wicket++;
                addToOutput(`You lost a wicket! Wickets: ${wicket}`);
            } else {
                runs += input;
                addToOutput(`Scored ${input} runs. Total runs: ${runs}`);
            }

            if (wicket === 2) {
                addToOutput(`You lost two wickets with a score of ${runs}. Your turn to bowl.`);
                wicket = 0;
                isBatting = false;
            }

        } else {
            if (input === computerPlay) {
                wicket++;
                addToOutput(`Gained a wicket! Wickets taken: ${wicket}`);
            } else {
                runs2 += input;
                addToOutput(`Computer scored ${input} runs. Total computer score: ${runs2}`);
            }

            if (wicket === 2 || runs2 >= runs) {
                const result = runs2 >= runs ? `Computer chased the score! You lost.` : `You defended the score! You won by ${runs - runs2} runs.`;
                addToOutput(result);
                gameButton.disabled = true;
                addToOutput("Game over.");
            }
        }
    }
}
