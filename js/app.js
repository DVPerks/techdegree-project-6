const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const scoreboard = document.getElementById('scoreboard');
const start = document.querySelector('.btn__reset');
var missed = 0;
const phrases = ['secret password', 'no place like home', 'shake the disease', 'bring your own books', 'we are number one'];

start.addEventListener('click', () => {
    const resetButtons = document.querySelectorAll('.chosen');
    const resetLetters = document.querySelectorAll('#phrase ul li');
    const resetLives = document.querySelectorAll('.tries img')
    missed = 0;

    resetLetters.forEach(element => {
        element.remove();
    });

    resetButtons.forEach(element => {
        element.classList.remove('chosen');
    });

    resetLives.forEach(element => {
        element.src = 'images/liveHeart.png';
    });

    let overlay = document.getElementById('overlay');
    overlay.style.display = 'none';

    const phraseString = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseString);
});

qwerty.addEventListener('click', (e) => {
    
    if (e.target.tagName === 'BUTTON' && !e.target.classList.contains('chosen')) {
        if (checkLetter(e.target.textContent) === null) {
            
            const tries = scoreboard.querySelectorAll('.tries')

            if (tries[tries.length - (missed + 1)]) {
                const heartImg = tries[tries.length - (missed + 1)].querySelector('img');
                if (heartImg) {
                    heartImg.src = 'images/lostHeart.png';
                }
            }

            missed++;

            checkLose()
        } else {
            checkWin();
        }
       
        e.target.classList.add('chosen');
    }


});

function getRandomPhraseAsArray(arr){

    const rand = Math.floor(Math.random() * arr.length);
    
    return arr[rand];
}

function addPhraseToDisplay(str){

    const ul = phrase.querySelector('ul');

    for (let i = 0; i < str.length; i++) {

        const char = document.createElement('li');
        char.textContent = str[i];

        if (str[i] === ' ') {
            char.className = 'space';
        } else {
            char.className = 'letter';
        }

        ul.appendChild(char);
    }
}

function checkLetter(letter) {
    var phraseLetters = document.querySelectorAll('#phrase li');
    var match = null;
    for (let i = 0; i < phraseLetters.length; i++) {
        if (letter.toLowerCase() === phraseLetters[i].textContent.toLowerCase()) {
            phraseLetters[i].classList.add('show');
            match = phraseLetters[i].textContent;
        }
    }
    
    return match;

}


//check for win
function checkWin() {
    const letters = document.querySelectorAll('.letter');
    const shown = document.querySelectorAll('.show');

    if (letters.length > 0 && letters.length === shown.length) {
        let overlay = document.getElementById('overlay');
        let head = overlay.querySelector('h2');

        head.textContent = 'You Won!';
        overlay.classList.add('win');
        overlay.style.display = 'flex';
    }
}

function checkLose() {
    if (missed > 4) {
        let overlay = document.getElementById('overlay');
        let head = overlay.querySelector('h2');

        head.textContent = 'You lost.';
        overlay.classList.add('lose');
        overlay.style.display = 'flex';
    }
}
