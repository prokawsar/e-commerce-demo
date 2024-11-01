// import { useState, useEffect } from "react";
// import { toast } from "sonner";
import { Icon } from "@iconify/react";

type Props = {
  showCart: boolean;
  data?: undefined;
  setShowCart: Function;
};

export default function Cart({ showCart, setShowCart }: Props) {
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
              className={`flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 p-1 hover:bg-slate-400 hover:text-white`}
            >
              <Icon icon="mdi:multiply" />
            </button>
          </div>

          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col gap-3">{/* Items */}</div>
            <button className="bg-orange-200 hover:bg-orange-300 rounded-md py-1">
              Checkout
            </button>
          </div>
        </div>
      </div>
    )
  );
}
