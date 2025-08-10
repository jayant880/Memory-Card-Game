import type { Player } from "../types/types";

class GameBoard {
  players: Player[] = [];
  Board = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
  matchingPairs: Record<number, number[]> = {};

  constructor(player1: Player, player2: Player) {
    this.players.push(player1);
    this.players.push(player2);
  }

  winnerChecker() {
    if (this.players[0].score === this.players[1].score) {
      return "Draw";
    } else if (this.players[0].score > this.players[1].score) {
      return this.players[0];
    } else {
      return this.players[1];
    }
  }

  shuffleBoard() {
    for (let i = this.Board.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.Board[i], this.Board[j]] = [this.Board[j], this.Board[i]];
    }
    this.matchingPairs = {};
    this.winningPairGenerator();
  }

  winningPairGenerator() {
    this.Board.forEach((value: number, index: number) => {
      if (!this.matchingPairs[value]) {
        this.matchingPairs[value] = [index];
      } else {
        this.matchingPairs[value].push(index);
      }
    });
  }

  pairChecker(playerCardPair: number[]) {
    return Object.values(this.matchingPairs).some((pair) => {
      return (
        JSON.stringify(playerCardPair.sort()) === JSON.stringify(pair.sort())
      );
    });
  }
}

export default GameBoard;
