var MemoryGame = /** @class */ (function () {
    function MemoryGame(cardValues) {
        this.cardValues = cardValues;
        this.cards = [];
        this.flippedCards = [];
        this.boardElement = document.getElementById('game-board');
        this.initializeGame();
    }
    // Initialize the game by creating and shuffling the cards
    MemoryGame.prototype.initializeGame = function () {
        this.createCards();
        this.shuffleCards();
        this.renderBoard();
    };
    // Create pairs of cards
    MemoryGame.prototype.createCards = function () {
        var _this = this;
        this.cards = [];
        this.cardValues.forEach(function (value, index) {
            _this.cards.push({ id: index * 2, value: value, isFlipped: false, isMatched: false }, { id: index * 2 + 1, value: value, isFlipped: false, isMatched: false });
        });
    };
    // Shuffle the cards using Fisher-Yates algorithm
    MemoryGame.prototype.shuffleCards = function () {
        var _a;
        for (var i = this.cards.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            _a = [this.cards[j], this.cards[i]], this.cards[i] = _a[0], this.cards[j] = _a[1];
        }
    };
    // Render the board with cards
    MemoryGame.prototype.renderBoard = function () {
        var _this = this;
        if (!this.boardElement)
            return;
        this.boardElement.innerHTML = '';
        this.cards.forEach(function (card) {
            var cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.id = card.id.toString();
            cardElement.textContent = card.isFlipped || card.isMatched ? card.value : '';
            if (card.isFlipped || card.isMatched)
                cardElement.classList.add('flipped');
            if (card.isMatched)
                cardElement.classList.add('matched');
            cardElement.addEventListener('click', function () { return _this.flipCard(card.id); });
            _this.boardElement.appendChild(cardElement);
        });
    };
    // Handle card flip logic
    MemoryGame.prototype.flipCard = function (cardId) {
        var _this = this;
        var card = this.cards.find(function (c) { return c.id === cardId; });
        if (!card || card.isFlipped || card.isMatched || this.flippedCards.length >= 2)
            return;
        card.isFlipped = true;
        this.flippedCards.push(card);
        this.renderBoard();
        if (this.flippedCards.length === 2) {
            setTimeout(function () { return _this.checkMatch(); }, 1000);
        }
    };
    // Check if flipped cards match
    MemoryGame.prototype.checkMatch = function () {
        var _a = this.flippedCards, card1 = _a[0], card2 = _a[1];
        if (card1.value === card2.value) {
            card1.isMatched = true;
            card2.isMatched = true;
        }
        else {
            card1.isFlipped = false;
            card2.isFlipped = false;
        }
        this.flippedCards = [];
        this.renderBoard();
    };
    return MemoryGame;
}());
// Start the game with some values
document.addEventListener('DOMContentLoaded', function () {
    var values = ['🍎', '🍌', '🍇', '🍓', '🥑', '🍍', '🍒', '🍋'];
    new MemoryGame(values);
});
