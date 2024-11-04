import { Icon } from "@iconify/react";

export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="max-w-2xl mx-auto mt-8 p-4">
      <div className="bg-red-50 border border-red-500 rounded-md flex items-center flex-col justify-center p-5">
        <Icon icon="mdi:multiply" className="text-red-700" width="30px" />
        <h2 className="text-lg py-2">Error</h2>
        <p className="text-center">
          {message.replace("Failed to fetch", "Checkout your network")}
        </p>
      </div>
    </div>
  );
}
