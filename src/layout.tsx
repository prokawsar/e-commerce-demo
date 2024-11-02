import { Toaster } from "sonner";
import { Link, Outlet } from "react-router-dom";
import { Icon } from "@iconify/react";
import Cart from "@/components/Cart";
import { useState } from "react";

export function Layout() {
  const [showCart, setShowCart] = useState(false);

  return (
    <main className="h-[100svh] flex flex-col justify-between">
      <div className="flex flex-col items-center">
        <div className="fixed top-0 bg-slate-50 w-full">
          <nav className="max-w-7xl px-5 lg:px-3 mx-auto w-full gap-2 flex items-center h-10">
            <Link to="/">
              <Icon icon="noto:shopping-bags" width="30px" />
            </Link>
            <div className="w-full flex justify-end gap-3 text-gray-500">
              <button
                className="hover:text-black rounded-full border border-yellow-500 p-2"
                onClick={() => setShowCart(!showCart)}
              >
                <Icon icon="mdi:cart" className="" width="20px" />
              </button>
              <button className="rounded-full border border-yellow-500 p-2">
                <Icon icon="mdi:account" className="" width="20px" />
              </button>
            </div>
          </nav>
        </div>

        {/* {children} */}
        <div className="flex flex-col h-full w-full items-center mt-10">
          <Outlet />
        </div>
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
