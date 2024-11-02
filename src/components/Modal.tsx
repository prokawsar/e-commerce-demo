import { Icon } from "@iconify/react";
import { useEffect, useRef, useCallback } from "react";

interface ModalProps {
  children: React.ReactNode;
  onClickBackdrop: () => void;
}

export default function Modal({ children, onClickBackdrop }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const backDropHandler = useCallback(
    (e: MouseEvent) => {
      if (!modalRef?.current?.contains(e.target as Node)) {
        onClickBackdrop();
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
        className={`bg-white p-2 rounded relative flex flex-col w-1/4`}
        ref={modalRef}
      >
        <button
          className="absolute top-0 right-0 p-[3px] rounded-full w-fit z-10"
          onClick={() => onClickBackdrop()}
        >
          <Icon icon="majesticons:multiply" width="20px" />
        </button>

        {children}
      </div>
    </div>
  );
}
