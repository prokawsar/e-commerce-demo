import { FormEvent } from "react";
import { User, useAuthModalStore, useUserStore } from "../store";
import Modal from "@/components/Modal";

export const AuthModal = () => {
  const { isOpen, pendingAction, closeModal } = useAuthModalStore();
  const { setUser } = useUserStore();

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    if (!password || !email) return;

    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    console.log(payload);

    //TODO: make api call and store user session

    const mockUser: User = {
      id: Math.random().toString(36).substring(2, 9),
      email: email as string,
    };
    setUser(mockUser);

    if (pendingAction) {
      pendingAction();
    }

    closeModal();
  };
  if (!isOpen) return;

  return (
    <Modal onClickBackdrop={() => closeModal()}>
      <form
        onSubmit={handleLogin}
        className="space-y-4 flex items-center flex-col w-full py-5 px-2"
      >
        <p>Login is required</p>
        <div className="flex flex-col gap-2 w-full">
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            className="w-full p-2 border border-yellow-300 rounded-md"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="******"
            className="w-full p-2 border border-yellow-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="my-4 bg-yellow-400 py-2 px-4 rounded-full hover:bg-yellow-500"
        >
          Login
        </button>
      </form>
    </Modal>
  );
};
