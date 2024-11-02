// import { useState, useEffect } from "react";
// import { toast } from "sonner";
import { Icon } from "@iconify/react";
import { useCartStore } from "@/store/index";

type Props = {
  showCart: boolean;
  data?: undefined;
  setShowCart: Function;
};

export default function Cart({ showCart, setShowCart }: Props) {
  const { items, increaseQuantity, decreaseQuantity, deleteItem } =
    useCartStore();

  return (
    showCart && (
      <div
        className={`fixed right-0 top-0 z-10 h-screen w-full border-l-[1.5px] border-gray-200 bg-gray-50 pt-8 transition-all sm:translate-x-0 md:w-96`}
        aria-label="sidebar"
      >
        <div className="relative flex flex-col h-full w-full overflow-y-auto px-3 pb-4">
          <div className="flex flex-row justify-between items-center">
            <h5
              id="drawer-left-label"
              className="mb-4 inline-flex items-center text-lg font-semibold text-gray-500"
            >
              Shopping Cart
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
            <div className="flex flex-col gap-3">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center gap-1 justify-between border-b border-gray-200 pb-2 mb-2"
                >
                  <span className="text-gray-500">{index + 1}</span>
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex flex-col px-1">
                    <span className="flex-1 text-gray-700 text-sm">
                      {item.title}
                    </span>
                    <span className="text-gray-700">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <button onClick={() => deleteItem(item.id)}>
                      <Icon
                        icon="iconamoon:trash"
                        width="20px"
                        className="text-red-400"
                      />
                    </button>
                    <div className="flex items-center">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="bg-slate-200 rounded-full p-1 active:hover:bg-slate-400 disabled:text-gray-400"
                        disabled={item.quantity <= 1}
                      >
                        <Icon icon="mdi:minus" />
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="bg-slate-200 rounded-full p-1 hover:bg-slate-400"
                      >
                        <Icon icon="mdi:plus" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="bg-yellow-400 hover:bg-yellow-500 rounded-md py-1">
              Checkout
            </button>
          </div>
        </div>
      </div>
    )
  );
}
