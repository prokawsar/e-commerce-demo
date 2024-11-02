import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

type HeaderProp = {
  showCart: boolean;
  setShowCart: (value: boolean) => void;
};
export const Header = ({ showCart, setShowCart }: HeaderProp) => {
  return (
    <div className="fixed top-0 bg-slate-50 w-full py-2">
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
  );
};
