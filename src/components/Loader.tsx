import { Icon } from "@iconify/react";

export default function Loader({ width = "44px" }: { width?: string }) {
  return (
    <div className="z-10 flex h-full w-full items-center justify-center ">
      <Icon icon="ei:spinner-3" width={width} className="animate-spin" />
    </div>
  );
}
