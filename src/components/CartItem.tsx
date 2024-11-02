import { Product } from "@/graphql/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import QuantityControls from "./QuantityControl";

interface CartItemProps {
  item: Product;
  index: number;
  onDelete: (id: string) => void;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
}

export default function CartItem({
  item,
  index,
  onDelete,
  onIncrease,
  onDecrease,
}: CartItemProps) {
  const calculateItemTotal = () =>
    (item.quantity * Number(item.price)).toFixed(2);

  return (
    <div className="flex items-start gap-1 justify-between border-b border-gray-200 pb-2 mb-2">
      <span className="text-gray-500">{index + 1}</span>
      <img
        src={item.images[0]}
        alt={item.title}
        className="w-16 h-16 object-cover rounded"
      />
      <div className="flex flex-col px-1">
        <span className="flex-1 text-gray-700 text-sm">{item.title}</span>
        <span className="text-gray-700">
          ${Number(item.price).toFixed(2)} X {item.quantity} = $
          {calculateItemTotal()}
        </span>
      </div>

      <div className="flex flex-col items-end gap-3">
        <button
          onClick={() => onDelete(item.id)}
          className="hover:text-red-600 transition-colors"
        >
          <Icon icon="iconamoon:trash" width="20px" className="text-red-400" />
        </button>
        <QuantityControls
          quantity={item.quantity}
          onIncrease={() => onIncrease(item.id)}
          onDecrease={() => onDecrease(item.id)}
        />
      </div>
    </div>
  );
}
