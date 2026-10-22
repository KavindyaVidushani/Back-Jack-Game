let player = {
    name: "Player",
    chips: 150
}

let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";

let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let playerEl = document.getElementById("player-el");

playerEl.textContent = player.name + ": $" + player.chips;

function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1;
    return randomNumber;
}

function getCardValue(cardNumber) {
    if (cardNumber === 1) {
        return 11; // Ace
    } else if (cardNumber > 10) {
        return 10; // Jack, Queen, King
    } else {
        return cardNumber; // 2 through 10
    }
}

function startGame() {
    isAlive = true;
    hasBlackJack = false;
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    cards = [firstCard, secondCard];
    sum = getCardValue(firstCard) + getCardValue(secondCard);
    renderGame();
}

function renderGame() {
    cardsEl.innerHTML = "";
    
    for (let i = 0; i < cards.length; i++) {
        let img = document.createElement("img");
        img.src = "Images/" + cards[i] + ".png";
        img.className = "card-img";
        
        // Fallback if image fails to load
        img.onerror = function() {
            let fallbackText = document.createElement("span");
            fallbackText.textContent = "[" + cards[i] + "]";
            fallbackText.style.color = "white";
            fallbackText.style.fontSize = "1.5rem";
            cardsEl.replaceChild(fallbackText, img);
        };

        cardsEl.appendChild(img);
    }

    sumEl.textContent = "Sum: " + sum;

    if (sum <= 20) {
        message = "Do you want to draw a new card? 🃏";
    } else if (sum === 21) {
        message = "Wohoo! You've got Blackjack! 🥳";
        hasBlackJack = true;
    } else {
        message = "You're out of the game! 😭";
        isAlive = false;
    }
    
    messageEl.textContent = message;
}

function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard();
        sum += getCardValue(card);
        cards.push(card);
        renderGame();
    }
}