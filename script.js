const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-again');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['pineapple', 'television', 'elevator', 'telephone', 'application'];

let selectedWord = words[Math.floor(Math.random() * words.length)]; 

const correctLetters = ['e'];
const wrongLetters = [];

//show the hidden word, split into separate letters, 
//mapping through to check for correct letters
//displaying them
//joining them back together again to make the string
function displayWord() {
    wordEl.innerHTML = `
        ${selectedWord
        .split('')
        .map(letter => `<span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
            </span>
            `).join('')
        }`;
        const innerword = wordEl.innerText.replace(/\n/g, '');
        
        if(innerword === selectedWord) {
            finalMessage.innerText = 'Congratulations! You won!';
            popup.style.display = 'flex';
        }



}

displayWord();