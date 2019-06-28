"use strict";

/**
 * Blackjack
 * by Ibrahim Ragab
 * Google Africa Certifications Scholarships 2019
 * ALC4
 */


// declare global varibales

// Dom variables
let textArea = document.getElementById('text-area'),
    newGameBtn = document.getElementById('new-game-button'),
    hitBtn = document.getElementById('hit-button'),
    stayBtn = document.getElementById('stay-button');

// Game variables
let gameStarted = false,
    gameOver = false,
    playerWon = false,
    dealerCards = [],
    playerCards = [],
    deck = [],
    dealerScore = 0,
    playerScore = 0;

// array hold suits & values
let suits = ['Heats', 'Clubs', 'Diamonds', 'Spades'],
    values = [
        'Ace', 'King', 'Queen', 'Jack', 'Two',
        'Three', 'Foure', 'Five', 'Six', 'Seven',
        'Eight', 'Nine', 'Ten'
    ];

// hide hit&stay btn from DOM
hitBtn.style.display = 'none';
stayBtn.style.display = 'none';


// listen to the click to init game
newGameBtn.addEventListener('click', () => {
    textArea.innerText = 'Game Started.. \n'
    newGameBtn.style.display = 'none';
    hitBtn.style.display = 'inline';
    stayBtn.style.display = 'inline';

    gameStarted = true;
    gameOver = false;
    playerWon = false;

    deck = createDeck();
    shuffleDeck(deck);
    console.log(deck);
    playerCards = [ getNextCard(), getNextCard() ];
    dealerCards = [ getNextCard(), getNextCard() ];
    showStatus();
});

function createDeck() {
    let deck = [];
    // looping throw suits & values to generate cards
    for(let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
        for(let valueIdx = 0; valueIdx < values.length; valueIdx++) {
            let card = {
                suit: suits[suitIdx],
                value: values[valueIdx]
            };
            deck.push(card)
        }
    }
    return deck;
}

function shuffleDeck(deck) {
    for(let i = 0; i < deck.length; i++) {
        // math.trunc truncate the decimal value from math.random
        let swapIdx = Math.trunc(Math.random() * deck.length);
        let tmp = deck[swapIdx];
        deck[swapIdx] = deck[i];
        deck[i] = tmp;
    }
}


function getCardString(card) {
    return card.value + ' of ' + card.suit;
}

function getNextCard() {
    return deck.shift();
}

function showStatus() {
    if(!gameStarted) {
        textArea.innerText = 'Welcome to Blackjack';
        return;
    }
    for (var i = 0; i < deck.length; i++) {
        textArea.innerText += '\n'+ getCardString(deck[i]);
    }
}
showStatus();



