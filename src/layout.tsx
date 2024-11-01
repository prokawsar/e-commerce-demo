import { Toaster } from "sonner";
import { Link, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <main className="h-[100svh] flex flex-col justify-between">
      <div className="flex flex-col items-center">
        <nav className="bg-gray-100 mx-auto w-full gap-2 flex flex-col h-10">
          <div></div>
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
    </main>
  );
}
