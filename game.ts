interface Card {
    id: number;
    value: string;
    isFlipped: boolean;
    isMatched: boolean;
  }
  
  class MemoryGame {
    private cards: Card[] = [];
    private flippedCards: Card[] = [];
    private boardElement: HTMLElement | null;
  
    constructor(private cardValues: string[]) {
      this.boardElement = document.getElementById('game-board');
      this.initializeGame();
    }
  
    // Initialize the game by creating and shuffling the cards
    private initializeGame(): void {
      this.createCards();
      this.shuffleCards();
      this.renderBoard();
    }
  
    // Create pairs of cards
    private createCards(): void {
      this.cards = [];
      this.cardValues.forEach((value, index) => {
        this.cards.push(
          { id: index * 2, value, isFlipped: false, isMatched: false },
          { id: index * 2 + 1, value, isFlipped: false, isMatched: false }
        );
      });
    }
  
    // Shuffle the cards using Fisher-Yates algorithm
    private shuffleCards(): void {
      for (let i = this.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
      }
    }
  
    // Render the board with cards
    private renderBoard(): void {
      if (!this.boardElement) return;
      this.boardElement.innerHTML = '';
      this.cards.forEach((card) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.id = card.id.toString();
        cardElement.textContent = card.isFlipped || card.isMatched ? card.value : '';
        if (card.isFlipped || card.isMatched) cardElement.classList.add('flipped');
        if (card.isMatched) cardElement.classList.add('matched');
        cardElement.addEventListener('click', () => this.flipCard(card.id));
        this.boardElement.appendChild(cardElement);
      });
    }
  
    // Handle card flip logic
    private flipCard(cardId: number): void {
      const card = this.cards.find((c) => c.id === cardId);
      if (!card || card.isFlipped || card.isMatched || this.flippedCards.length >= 2) return;
  
      card.isFlipped = true;
      this.flippedCards.push(card);
      this.renderBoard();
  
      if (this.flippedCards.length === 2) {
        setTimeout(() => this.checkMatch(), 1000);
      }
    }
  
    // Check if flipped cards match
    private checkMatch(): void {
      const [card1, card2] = this.flippedCards;
      if (card1.value === card2.value) {
        card1.isMatched = true;
        card2.isMatched = true;
      } else {
        card1.isFlipped = false;
        card2.isFlipped = false;
      }
      this.flippedCards = [];
      this.renderBoard();
    }
  }
  
  // Start the game with some values
  document.addEventListener('DOMContentLoaded', () => {
    const values = ['🍎', '🍌', '🍇', '🍓', '🥑', '🍍', '🍒', '🍋'];
    new MemoryGame(values);
  });