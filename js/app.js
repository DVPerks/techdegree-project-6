const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const scoreboard = document.getElementById('scoreboard');
const start = document.querySelector('.btn__reset');
var missed = 0;
const phrases = ['secret password', 'no place like home', 'shake the disease', 'bring your own books', 'we are number one'];

// Starts a new game
start.addEventListener('click', () => {
    const phraseString = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseString);

    let overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
});

// Onscreen keyboard event listener, also checks for game over
qwerty.addEventListener('click', (e) => {
    // only allow for clicking on unselected buttons
    if (e.target.tagName === 'BUTTON' && !e.target.classList.contains('chosen')) {

        // check if letter is in phrase
        if (checkLetter(e.target.textContent) === null) {

            //check for number of tries and then make change remaining heart
            const tries = scoreboard.querySelectorAll('.tries')
            if (tries[tries.length - (missed + 1)]) {
                const heartImg = tries[tries.length - (missed + 1)].querySelector('img');
                if (heartImg) {
                    heartImg.src = 'images/lostHeart.png';
                }
            }
            missed++;
        } 
        e.target.classList.add('chosen');
        checkWin()
    }
});

// Selects a random phrase for the current game
function getRandomPhraseAsArray(arr){
    const rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
}

function addPhraseToDisplay(str) {
    const ul = phrase.querySelector('ul');
    
    // Create the first word wrapper
    let currentWordWrapper = document.createElement('span');
    currentWordWrapper.className = 'word-wrap';

    for (let i = 0; i < str.length; i++) {
        const char = document.createElement('li');
        char.textContent = str[i];

        if (str[i] === ' ') {
            // 1. If it hits a space, append the finished word wrapper to the ul
            if (currentWordWrapper.children.length > 0) {
                ul.appendChild(currentWordWrapper);
            }
            
            // 2. Setup the space element normally and append it to the ul
            char.className = 'space';
            ul.appendChild(char);
            
            // 3. Reset and create a fresh wrapper for the next word
            currentWordWrapper = document.createElement('span');
            currentWordWrapper.className = 'word-wrap';
        } else {
            // If it's a letter, group it inside the current word wrapper instead of the ul directly
            char.className = 'letter';
            currentWordWrapper.appendChild(char);
        }
    }

    // Append the last word container after the loop finishes
    if (currentWordWrapper.children.length > 0) {
        ul.appendChild(currentWordWrapper);
    }
}


function checkLetter(letter) {
    var phraseLetters = document.querySelectorAll('#phrase li');
    var match = null;

    // if letter is correct display on screen and set match to letter
    for (let i = 0; i < phraseLetters.length; i++) {
        if (letter.toLowerCase() === phraseLetters[i].textContent.toLowerCase()) {
            phraseLetters[i].classList.add('show');
            match = phraseLetters[i].textContent;
        }
    }
    // returns null if incorrect
    return match;
}


//check if the game is won or lost
function checkWin() {
    const letters = document.querySelectorAll('.letter');
    const shown = document.querySelectorAll('.show');
    const overlay = document.getElementById('overlay');
    const head = overlay.querySelector('h2');

    //Determine if the game is over
    const isWin = letters.length > 0 && letters.length === shown.length;
    const isLose = missed > 4;

    if (isWin || isLose) {
        resetGame();
        
        //Use a ternary operator to dynamically set text and class name
        head.textContent = isWin ? 'You Won!' : 'You lost.';
        overlay.classList.add(isWin ? 'win' : 'lose');
        
        overlay.style.display = 'flex';
    }
}

function resetGame() {
    overlay.classList.remove('lose', 'win');
    start.textContent = "Play Again";
    missed = 0;

    document.querySelector('#phrase ul').innerHTML = '';

    document.querySelectorAll('.chosen').forEach(btn => btn.classList.remove('chosen'));

    document.querySelectorAll('.tries img').forEach(img => img.src = 'images/liveHeart.png');
}