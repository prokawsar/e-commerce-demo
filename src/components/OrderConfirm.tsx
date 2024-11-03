import { Icon } from "@iconify/react";

export default function OrderConfirm() {
  return (
    <div className="max-w-2xl mx-auto mt-8 p-4">
      <div className="bg-green-50 border border-green-500 rounded-md flex items-center flex-col justify-center p-5">
        <Icon icon="mdi:check-circle" className="text-green-700" width="30px" />
        <h2 className="text-lg py-2">Order Confirmed!</h2>
        <p className="text-center">
          Thank you for your order. We'll send you a confirmation email shortly.
        </p>
      </div>
    </div>
  );
}
