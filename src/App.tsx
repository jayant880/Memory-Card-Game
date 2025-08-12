import { useCallback, useEffect, useMemo, useState } from "react"
import { type CardType, type Player } from "./types/types"
import PlayerCard from './components/PlayerCard';
import GameEngine from "./service/gameEngine";
import Card from "./components/Card";

const App = () => {
  const gameEngine = useMemo(() => new GameEngine(), []);

  const [players] = useState<[Player, Player]>(() => [
    { id: crypto.randomUUID(), name: 'Player 1', score: 0 },
    { id: crypto.randomUUID(), name: 'Player 2', score: 0 }
  ]);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);

  const [board, setBoard] = useState<CardType[]>(() => gameEngine.shuffleBoard());
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<Player | null>(null);

  const currentPlayer = players[currentPlayerIndex];
  const isProcessing = flippedCards.length === 2;

  const handleCardClick = useCallback((cardId: string) => {
    if (isProcessing || gameOver) return;
    setBoard(prevBoard => prevBoard.map(card => card.id === cardId ? { ...card, isFlipped: true } : card));
    setFlippedCards(prev => [...prev, cardId]);
  }, [isProcessing, gameOver]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCardId, secondCardId] = flippedCards;
      const firstCard = board.find(card => card.id === firstCardId);
      const secondCard = board.find(card => card.id === secondCardId);

      if (!firstCard || !secondCard) return;

      const isMatch = firstCard.value === secondCard.value;

      const timer = setTimeout(() => {
        setBoard(prevBoard => prevBoard.map(card => {
          if (card.id === firstCardId || card.id === secondCardId) {
            return {
              ...card,
              isFlipped: isMatch,
              isMatched: isMatch
            };
          }
          return card;
        })
        );
        if (isMatch) {
          if (currentPlayerIndex === 0) setPlayer1Score(prev => prev + 1);
          else setPlayer2Score(prev => prev + 1);
        } else setCurrentPlayerIndex(prev => prev === 0 ? 1 : 0);

        setFlippedCards([]);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [flippedCards, board, currentPlayerIndex]);

  useEffect(() => {
    const matchedCount = board.filter(card => card.isMatched).length;

    if (matchedCount === board.length && matchedCount > 0) {
      setGameOver(true);
      const finalWinner = player1Score > player2Score
        ? { ...players[0], score: player1Score }
        : player1Score < player2Score
          ? { ...players[1], score: player2Score }
          : null;
      setWinner(finalWinner);
    }
  }, [board, player1Score, player2Score, players]);


  const handleReset = useCallback(() => {
    setBoard(gameEngine.shuffleBoard());
    setPlayer1Score(0);
    setPlayer2Score(0);
    setCurrentPlayerIndex(0);
    setFlippedCards([]);
    setGameOver(false);
    setWinner(null);
  }, [gameEngine]);

  const handleShuffle = useCallback(() => {
    handleReset();
  }, [handleReset]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Memory Card Game</h1>

        {winner && (
          <div className="text-center mb-4">
            <p className="text-2xl font-bold text-green 600">
              {winner.name} Wins
            </p>
          </div>
        )}

        {gameOver && !winner && (
          <div className="text-center mb-4">
            <p className="text-2xl font-bold text-blue-600">
              It's a Tie!
            </p>
          </div>
        )}

        <div className="flex justify-between mb-6">
          <PlayerCard
            player={{ ...players[0], score: player1Score }}
            active={currentPlayerIndex === 0 && !gameOver}
          />
          <PlayerCard
            player={{ ...players[1], score: player2Score }}
            active={currentPlayerIndex === 1 && !gameOver}
          />
        </div>

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={handleShuffle}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition-colors"
          >
            New Game
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Reset Scores
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2 max-w-2xl mx-auto">
          {board.map(card => (
            <Card
              key={card.id}
              card={card}
              onCardClick={handleCardClick}
              disabled={isProcessing || gameOver}
            />
          ))}
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            {gameOver
              ? 'Game Over'
              : isProcessing
                ? 'Processing...'
                : `${currentPlayer.name}'s Turn`}
          </p>
        </div>

      </div>
    </div>
  )
}

export default App