export default function CartFooter({ total }: { total: number }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="flex flex-row items-center justify-between text-lg">
        <p>Total price:</p>
        <p className="font-bold">${total.toFixed(2)}</p>
      </span>
      <button className="bg-yellow-400 hover:bg-yellow-500 transition-colors rounded-md py-1">
        Checkout
      </button>
    </div>
  );
}
