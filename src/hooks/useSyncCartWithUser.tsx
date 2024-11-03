import { useEffect } from "react";
import { useCartStore, useUserStore } from "@/store/index";

export const useSyncCartWithUser = () => {
  const { userData } = useUserStore();
  const { setUserId } = useCartStore();

  useEffect(() => {
    setUserId(userData?.id ?? null);
  }, [userData, setUserId]);
};
