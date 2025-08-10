import { useState } from "react"
import type { Player } from "./types/types"
import GameBoard from "./service/gameBoard";

const App = () => {

  const [player1, setPlayer1] = useState<Player>({ id: crypto.randomUUID(), name: 'Player1', score: 0, currentSelectedPair: null });
  const [player2, setPlayer2] = useState<Player>({ id: crypto.randomUUID(), name: 'Player2', score: 0, currentSelectedPair: null });

  const gameBoard = new GameBoard(player1, player2);
  return (
    <div>App</div>
  )
}

export default App