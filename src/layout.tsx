import { Toaster } from "sonner";
import { Outlet } from "react-router-dom";
import Cart from "@/components/Cart";
import { useState } from "react";
import { Header } from "./components/Header";

export function Layout() {
  const [showCart, setShowCart] = useState(false);

  return (
    <main className="h-[100svh] flex flex-col justify-between">
      <div className="flex flex-col items-center">
        <Header {...{ showCart, setShowCart }} />

        {/* {children} */}
        <div className="flex flex-col h-full w-full items-center mt-14">
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
