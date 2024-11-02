import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useUserStore } from "../store";
import { useState } from "react";
import { useProtectedAction } from "@/hooks/useProtectedAction";

type HeaderProp = {
  showCart: boolean;
  setShowCart: (value: boolean) => void;
};

export default function Header({ showCart, setShowCart }: HeaderProp) {
  const { userData, setUser } = useUserStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const { withAuth } = useProtectedAction();
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    setUser(null);
    console.log("User logged out");
  };
  return (
    <div className="fixed z-10 top-0 bg-slate-50 w-full py-2">
      <nav className="max-w-7xl px-5 lg:px-3 mx-auto w-full gap-2 flex items-center h-10">
        <Link to="/">
          <Icon icon="noto:shopping-bags" width="30px" />
        </Link>
        <div className="w-full flex justify-end gap-3 text-gray-500">
          <button
            className="hover:text-black rounded-full border border-yellow-500 p-2"
            onClick={() => withAuth(setShowCart, !showCart)}
          >
            <Icon icon="mdi:cart" className="" width="20px" />
          </button>
          {userData && (
            <div className="relative">
              <button
                className="rounded-full border border-yellow-500 p-2"
                onClick={toggleMenu}
              >
                <Icon icon="mdi:account" className="" width="20px" />
              </button>
              {menuOpen && (
                <div className="absolute right-0 bg-white border border-gray-300 rounded shadow-lg">
                  <button className="w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
