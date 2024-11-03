import { Icon } from "@iconify/react";
import { useCartStore } from "@/store/index";
import CartItem from "@/components/CartItem";
import CartFooter from "@/components/CartFooter";

type Props = {
  showCart: boolean;
  data?: undefined;
  setShowCart: (value: boolean) => void;
};

export default function Cart({ showCart, setShowCart }: Props) {
  const { items, increaseQuantity, decreaseQuantity, deleteItem } =
    useCartStore();

  const calculateTotalAmount = () =>
    items.reduce(
      (total, item) => total + Number(item.price) * item.quantity,
      0
    );

  return (
    showCart && (
      <div
        className={`fixed right-0 top-0 z-10 h-screen w-full border-l-[1.5px] border-gray-200 bg-gray-50 transition-all sm:translate-x-0 md:w-96`}
        aria-label="sidebar"
      >
        <div className="relative flex flex-col h-full w-full px-3 pb-4">
          <div className="flex flex-row justify-between items-center py-4">
            <h5 className="mb-4 inline-flex items-center text-lg font-semibold text-gray-500">
              Cart
            </h5>
            <button
              onClick={() => setShowCart(!showCart)}
              type="button"
              className={`flex p-1 items-center justify-center rounded-full bg-slate-200 hover:bg-slate-400 hover:text-white`}
            >
              <Icon icon="mdi:multiply" />
            </button>
          </div>

          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col gap-3 overflow-x-auto max-h-[85%]">
              {items.map((item, index) => (
                <CartItem
                  key={item.id}
                  index={index}
                  item={item}
                  onDecrease={decreaseQuantity}
                  onIncrease={increaseQuantity}
                  onDelete={deleteItem}
                />
              ))}
            </div>

            <CartFooter
              setShowCart={setShowCart}
              total={calculateTotalAmount()}
            />
          </div>
        </div>
      </div>
    )
  );
}
