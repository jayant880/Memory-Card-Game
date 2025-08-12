export interface Player {
  id: string;
  name: string;
  score: number;
}

export interface CardType {
  id: string;
  value: number;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface CardProps {
  card: CardType;
  onCardClick: (cardId: string) => void;
  disabled: boolean;
}

export interface PlayerCardProps {
  player: Player;
  active: boolean;
}
