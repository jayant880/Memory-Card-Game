import type { CardType } from "../types/types";

class GameEngine {
  private readonly cardValues = [1, 2, 3, 4, 5, 6, 7, 8];

  shuffleBoard(): CardType[] {
    const cards: CardType[] = [];

    this.cardValues.forEach((value) => {
      cards.push(
        {
          id: crypto.randomUUID(),
          value,
          isFlipped: false,
          isMatched: false,
        },
        {
          id: crypto.randomUUID(),
          value,
          isFlipped: false,
          isMatched: false,
        }
      );
    });

    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  }
}

export default GameEngine;
