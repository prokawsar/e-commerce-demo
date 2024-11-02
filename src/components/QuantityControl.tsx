import { Icon } from "@iconify/react";

type QuantityControlsProp = {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

export default function QuantityControls({
  quantity,
  onIncrease,
  onDecrease,
}: QuantityControlsProp) {
  return (
    <div className="flex items-center">
      <button
        onClick={onDecrease}
        className="bg-slate-200 rounded-full p-1 hover:bg-slate-400 transition-colors disabled:bg-slate-100 disabled:text-gray-400"
        disabled={quantity <= 1}
      >
        <Icon icon="mdi:minus" />
      </button>
      <span className="mx-2">{quantity}</span>
      <button
        onClick={onIncrease}
        className="bg-slate-200 rounded-full p-1 hover:bg-slate-400 transition-colors"
      >
        <Icon icon="mdi:plus" />
      </button>
    </div>
  );
}
