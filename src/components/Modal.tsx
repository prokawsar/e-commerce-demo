import { Icon } from "@iconify/react";
import { useEffect, useRef, useCallback } from "react";

interface ModalProps {
  children: React.ReactNode;
  onClickBackdrop?: () => void;
  onClose?: () => void;
}

export default function Modal({
  children,
  onClickBackdrop,
  onClose,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const backDropHandler = useCallback(
    (e: MouseEvent) => {
      if (!modalRef?.current?.contains(e.target as Node)) {
        return onClickBackdrop ? onClickBackdrop() : null;
      }
    },
    [onClickBackdrop]
  );

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("click", backDropHandler);
    });
    return () => {
      window.removeEventListener("click", backDropHandler);
    };
  }, [backDropHandler]);

  return (
    <div className="fixed flex items-center justify-center left-0 top-0 z-20 h-screen w-screen bg-[#00000080] ">
      <div
        className={`bg-white p-2 rounded relative flex flex-col w-3/4 lg:w-1/4`}
        ref={modalRef}
      >
        <button
          onClick={() => (onClose ? onClose() : "")}
          type="button"
          className={`absolute top-1 right-1 p-1 items-center justify-center rounded-full bg-slate-200 hover:bg-slate-400 hover:text-white`}
        >
          <Icon icon="mdi:multiply" />
        </button>

        {children}
      </div>
    </div>
  );
}
