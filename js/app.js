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

    newGameBtn.style.display = 'none';
    hitBtn.style.display = 'inline';
    stayBtn.style.display = 'inline';

    gameStarted = true;
    gameOver = false;
    playerWon = false;

    deck = createDeck();
    shuffleDeck(deck);

    playerCards = [ getNextCard(), getNextCard() ];
    dealerCards = [ getNextCard(), getNextCard() ];
    showStatus();
});

// listen to the hit btn
hitBtn.addEventListener('click', () => {
    playerCards.push(getNextCard());
    checkForEndofGame();
    showStatus();
});
// listen to the stay btn
stayBtn.addEventListener('click', () => {
    gameOver = true;
    checkForEndofGame();
    showStatus();
});

// fn create deck
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

// fn shuffle
function shuffleDeck(deck) {
    for(let i = 0; i < deck.length; i++) {
        // math.trunc truncate the decimal value from math.random
        let swapIdx = Math.trunc(Math.random() * deck.length);
        let tmp = deck[swapIdx];
        deck[swapIdx] = deck[i];
        deck[i] = tmp;
    }
}

// fn get cards
function getCardString(card) {
    return card.value + ' of ' + card.suit;
}

// fn get next card
function getNextCard() {
    return deck.shift();
}


// fn updates score
function updateScores() {
    dealerScore = getScore(dealerCards);
    playerScore = getScore(playerCards);
}

// fn cards value
function getCardNumbericValue(card) {
    switch(card.value) {
        case 'Ace':
            return 1;
        case 'Two':
            return 2;
        case 'Three':
            return 3;
        case 'Four':
            return 4;
        case 'Five':
            return 5;
        case 'Six':
            return 6;
        case 'Seven':
            return 7;
        case 'Eight':
            return 8;
        case 'Nine':
            return 9;
        default:
            return 10;
    }
}

// fn get score
function getScore(cardArray) {
    let score = 0;
    let hasAce = false;
    for (let i = 0; i < cardArray.length; i++) {
        let card = cardArray[i];
        score += getCardNumbericValue(card);
        if(card.value === 'Ace') {
            hasAce = 'True';
        }
        
    }
    if(hasAce && score + 10 <= 21) {
        return score + 10;
    }
    return score;
}

// fn check if game end
function checkForEndofGame() {
    updateScores();

    if(gameOver) {
        // let dealer take  a cards
        while(dealerScore < playerScore && playerScore <= 21 && dealerScore <= 21 ) {
            dealerCards.push(getNextCard());
            updateScores();
        }
    }
    if(playerScore > 21) {
        playerWon = false;
        gameOver = true;
    }else if(dealerScore > 21) {
        playerWon = true;
        gameOver = true;
    }else if (gameOver) {
        if(playerScore > dealerScore) {
            playerWon = true;
        }else {
            playerWon = false;
        }
    }
}

// fn display status
function showStatus() {
    if(!gameStarted) {
        textArea.innerText = 'Welcome to Blackjack';
        return;
    }
    let dealerCardString = '';
    for(let i=0; i<dealerCards.length; i++){
        dealerCardString += getCardString(dealerCards[i]) + '\n';
    }
    let playerCardString = '';
    for(let i=0; i<playerCards.length; i++){
        playerCardString += getCardString(playerCards[i]) + '\n';
    }

    updateScores();

    textArea.innerText = `Dealer has:\n\n ${dealerCardString}\n (Score: ${dealerScore}) \n\n
    Player has:\n\n ${playerCardString}\n (Score: ${playerScore}) \n\n`

    if(gameOver) {
        if(playerWon) {
            textArea.innerText += ' You Win!'
        }else {
            textArea.innerText += 'Dealer Win!'
        }
        newGameBtn.style.display = 'inline';
        hitBtn.style.display = 'none';
        stayBtn.style.display = 'none';
    }
}
showStatus();



