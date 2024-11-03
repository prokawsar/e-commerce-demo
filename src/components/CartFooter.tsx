import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/store/index";

export default function CartFooter({
  total,
  setShowCart,
}: {
  total: number;
  setShowCart: (value: boolean) => void;
}) {
  const { items } = useCartStore();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-2">
      <span className="flex flex-row items-center justify-between text-lg">
        <p>Total price:</p>
        <p className="font-bold">${total.toFixed(2)}</p>
      </span>

      <button
        onClick={() => {
          if (items.length) {
            setShowCart(false);
            navigate("/checkout");
          }
        }}
        disabled={items.length == 0}
        className="bg-yellow-400 justify-center flex hover:bg-yellow-500 transition-colors rounded-md py-1 disabled:bg-yellow-200 disabled:text-gray-500"
      >
        Checkout
      </button>
    </div>
  );
}
