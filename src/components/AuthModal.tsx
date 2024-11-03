import { FormEvent, useEffect, useState } from "react";
import { User, useAuthModalStore, useUserStore } from "../store";
import Modal from "@/components/Modal";
import { useMutation } from "@apollo/client";
import { LOGIN } from "@/graphql/queries";
import { Icon } from "@iconify/react";

export const AuthModal = () => {
  const [signUpForm, setSignupForm] = useState(false);
  const { isOpen, pendingAction, closeModal } = useAuthModalStore();
  const { setUser } = useUserStore();
  const [login, { error, loading, reset }] = useMutation(LOGIN);

  const handleFormAction = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    if (!password || !email) return;

    // const payload = {
    //   email: formData.get("email"),
    //   password: formData.get("password"),
    // };

    // Fake api doesn't support signup
    if (signUpForm) return;

    const { data } = await login({ variables: { email, password } });

    const user: User = {
      id: Math.random().toString(36).substring(2, 9),
      email: email as string,
      access_token: data.login.access_token,
    };

    setUser(user);

    if (pendingAction) {
      pendingAction();
    }
    closeModal();
    reset();
  };

  useEffect(() => {
    return () => {
      setSignupForm(false);
      reset();
    };
  }, [isOpen]);

  if (!isOpen) return;

  return (
    <Modal onClose={() => closeModal()}>
      <form
        onSubmit={handleFormAction}
        className="space-y-4 flex items-center flex-col w-full py-5 px-2"
      >
        <p>{signUpForm ? "Create Account" : "Login is required"}</p>
        <p className="text-red-500 my-2">{error ? error.message : ""}</p>
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
          className="my-4 flex items-center gap-1 bg-yellow-400 py-2 px-4 rounded-full hover:bg-yellow-500"
        >
          {loading ? (
            <Icon icon="ei:spinner" className="animate-spin" width="20px" />
          ) : (
            ""
          )}
          {signUpForm ? "Signup" : "Login"}
        </button>
        {signUpForm && (
          <p className="text-center">
            Already have account?{" "}
            <button onClick={() => setSignupForm(false)}>Login here</button>
          </p>
        )}

        {!signUpForm && (
          <p className="text-center">
            Don't have any account?{" "}
            <button onClick={() => setSignupForm(true)}>Signup here</button>
          </p>
        )}
      </form>
    </Modal>
  );
};
