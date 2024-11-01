import { Toaster } from "sonner";
import { Link, Outlet } from "react-router-dom";
import { Icon } from "@iconify/react";
import Cart from "./components/Cart";
import { useState } from "react";

export function Layout() {
  const [showCart, setShowCart] = useState(false);

  return (
    <main className="h-[100svh] flex flex-col justify-between">
      <div className="flex flex-col items-center">
        <nav className="max-w-7xl px-4 lg:px-0 mx-auto w-full gap-2 flex items-center h-10">
          <Link to="/">
            <Icon icon="noto:shopping-bags" width="30px" />
          </Link>
          <div className="w-full flex justify-end gap-3 text-gray-500">
            <button
              className="hover:text-black"
              onClick={() => setShowCart(!showCart)}
            >
              <Icon icon="mdi:cart" className="" width="20px" />
            </button>
            <Icon icon="mdi:account" className="" width="20px" />
          </div>
        </nav>
        {/* {children} */}
        <Outlet />
      </div>
      <Toaster
        toastOptions={{
          className: "py-2.5 mb-7",
          closeButton: true,
        }}
        position="bottom-center"
        richColors
      />

      <Cart showCart={showCart} setShowCart={setShowCart} />
    </main>
  );
}
