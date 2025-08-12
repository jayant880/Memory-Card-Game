import type { CardProps } from "../types/types";

const Card = ({ card, onCardClick, disabled }: CardProps) => {
    const handleClick = () => {
        if (!disabled && !card.isFlipped && !card.isMatched) {
            onCardClick(card.id);
        }
    }

    return (
        <div className={`flex border m-2 rounded min-h-40 justify-center
            items-center cursor-pointer transition-all duration-100 hover:shadow-md
            ${card.isMatched ? 'bg-green-100 border-green-400' : " bg-white hover:bg-gray-50"}
            ${disabled && !card.isMatched ? 'cursor-not-allowed opacity-50' : ''}
            `}
            onClick={handleClick}
        >
            <p className={`text-6xl font-bold transition-opacity duration-200 ${card.isFlipped || card.isMatched ? 'opacity-100' : 'opacity-0'
                }`}>
                {card.isFlipped || card.isMatched ? card.value : ')*('}
            </p>
        </div>
    )
}

export default Card