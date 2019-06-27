"use strict";

/**
 * Blackjack
 * by Ibrahim Ragab
 * Google Africa Certifications Scholarships 2019
 * ALC4
 */


// declare global varibales
let textArea = document.getElementById('text-area');
let newGameBtn = document.getElementById('new-game-button');
let hitBtn = document.getElementById('hit-button');
let stayBtn = document.getElementById('stay-button');

// hide hit&stay btn from DOM
hitBtn.style.display = 'none';
stayBtn.style.display = 'none';


// listen to the click to init game
newGameBtn.addEventListener('click', () => {
    textArea.innerText = 'Game Started..'
    newGameBtn.style.display = 'none';
    hitBtn.style.display = 'inline';
    stayBtn.style.display = 'inline';

});
