import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import { useCartStore } from '../../stores/cartStore';

export default function MenuItemCard({ item }) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      quantity,
      imageUrl: item.imageUrl,
      isVeg: item.isVeg,
    });
    setQuantity(1);
  };

  const spiceIcons = '🌶️'.repeat(item.spiceLevel);

  return (
    <Card className="flex flex-col h-full">
      <div className="relative">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <span
            className={`px-2 py-1 rounded text-white text-xs font-semibold ${
              item.isVeg ? 'bg-veg' : 'bg-non-veg'
            }`}
          >
            {item.isVeg ? '🟢 VEG' : '🔴 NON-VEG'}
          </span>
          {item.tags.includes('Popular') && (
            <span className="px-2 py-1 rounded bg-secondary text-white text-xs font-semibold">
              Popular
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 mt-3">
        <h3 className="font-semibold text-lg">{item.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
        {item.spiceLevel > 0 && (
          <p className="text-xs mt-1">{spiceIcons}</p>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-xl font-bold">₹{item.price}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <Minus size={16} />
          </button>
          <span className="w-8 text-center font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <Button
        className="w-full mt-3"
        onClick={handleAddToCart}
        disabled={!item.available}
      >
        {item.available ? 'Add to Cart' : 'Not Available'}
      </Button>
    </Card>
  );
}
