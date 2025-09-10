import { Star } from 'lucide-react';
import type { FC } from 'react';

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
}

const StarRating: FC<StarRatingProps> = ({ rating, onRatingChange, readonly = false }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-6 h-6 ${readonly ? '' : 'cursor-pointer'} ${
            star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
          }`}
          onClick={readonly ? undefined : () => onRatingChange?.(star)}
        />
      ))}
    </div>
  );
};

export default StarRating;
