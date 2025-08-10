export interface Player {
  id: string;
  name: string;
  score: number;
  currentSelectedPair: CardPair | null;
}

export interface IGameBoard {
  players: Player[];
  Board: number[];
  shuffleBoard(): void;
}

export interface CardPair {
  pair: Card[];
}

export interface Card {
  cardId: number;
  src: string;
}
