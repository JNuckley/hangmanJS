const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['pineapple', 'television', 'elevator', 'telephone', 'application'];

let selectedWord = words[Math.floor(Math.random() * words.length)]; 

const correctLetters = [];
const wrongLetters = [];

//show the hidden word, split into separate letters, 
//mapping through to check for correct letters
//displaying them
//joining them back together again to make the string
function displayWord() {
    wordEl.innerHTML = `
        ${selectedWord
        .split('')
        .map(letter => `
            <span class="letter">
                ${correctLetters.includes(letter) ? letter : ''}
            </span>
            `
            )
            .join('')
        }`;

        const innerWord = wordEl.innerText.replace(/\n/g, '');
        
        if(innerWord === selectedWord) {
            finalMessage.innerText = 'Congratulations! You won!';
            popup.style.display = 'flex';
        }
}

// update wrong letters
function updateWrongLettersEl() {
    //display wrong letters
    wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong<p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}`;

        // display hangman parts
        figureParts.forEach((part, index) => {
            const errors = wrongLetters.length;

            if(index < errors) {
                part.style.display = 'block';
            } else {
                part.style.display = 'none';
            }
        })
        //check if lost
     if(wrongLetters.length === figureParts.length) {
         finalMessage.innerText = 'Unfortunately you lost';
         popup.style.display = 'flex';
     }   
}

//show notification to say you've tried that letter before
function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// keydown letter press
window.addEventListener('keydown', e => {
    // console.log(e.keyCode);
    // keyCode will get the numerical code for the keys A - Z is 65 - 90
    // e.key will return the key pressed
    if(e.keyCode >= 65 & e.keyCode <= 90) {
        const letter = e.key;
        
        if(selectedWord.includes(letter)) {
            if(!correctLetters.includes(letter)) {
                correctLetters.push(letter);

                displayWord();
            } else {
                showNotification();
            }
        } else {
            if(!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);

                updateWrongLettersEl();
            } else {
                showNotification();
            }
            
        }
    }
});

// restart game and play again
playAgainBtn.addEventListener('click', () => {
    //empty the correct and wrong letter arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    //hide the body parts and remove the wrong letters from page
    updateWrongLettersEl()

    popup.style.display = 'none';
});

displayWord();