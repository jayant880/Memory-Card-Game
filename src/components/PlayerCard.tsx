import type { Player } from "../types/types"

interface PlayerCardProps {
    player: Player;
    active: boolean;
}
const PlayerCard = ({ player, active }: PlayerCardProps) => {
    return (
        <div className={`
      flex border max-w-xs gap-5 justify-between p-4 m-2 rounded-lg transition-colors duration-200
      ${active ? 'bg-green-300 border-green-400' : 'bg-gray-100 border-gray-300'}
    `}>
            <div className="font-semibold">{player.name}</div>
            <div className="font-bold">{player.score}</div>
        </div>
    );
};

export default PlayerCard;