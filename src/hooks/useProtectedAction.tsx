import { useAuthModalStore, useUserStore } from "@/store/index";

export const useProtectedAction = () => {
  const { userData } = useUserStore();
  const { openModal } = useAuthModalStore();

  const withAuth = <T extends any[]>(
    action: (...args: T) => void,
    ...params: T
  ) => {
    if (userData) {
      action(...params);
    } else {
      openModal(() => action(...params));
    }
  };

  return { withAuth };
};
