import { Icon } from "@iconify/react";

export default function Loader() {
  return (
    <div className="z-10 flex h-full w-full items-center justify-center ">
      <Icon icon="ei:spinner-3" width="44px" className="animate-spin" />
    </div>
  );
}
