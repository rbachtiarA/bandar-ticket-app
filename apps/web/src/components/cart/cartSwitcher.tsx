import { ICart } from "@/type/cart";
import { ITicketType } from "@/type/ticket";
import { useMemo, useState } from "react";
import CartCard from "./cartCard";

export default function CartSwitcher({
  cart,
  ticket,
  userId,
  userPoints,
  handleRemoveCart,
  handleTransaction, // accepts usePoints
}: {
  cart: ICart[];
  ticket: ITicketType[];
  userId: number;
  userPoints: number;
  handleRemoveCart: any;
  handleTransaction: any;
  usePoints: boolean;
}) {
  const [usePoints, setUsePoints] = useState(false);

  const sumCart = useMemo(() => {
    return cart.reduce((prev, curr) => prev + curr.totalPrice, 0);
  }, [cart]);

  const IDR = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'IDR',
  });

  const discountedPrice = useMemo(() => {
    if (usePoints && userPoints > 0) {
      return sumCart - userPoints > 0 ? sumCart - userPoints : 0;
    }
    return sumCart;
  }, [sumCart, usePoints, userPoints]);

  return (
    <div>
      <div className="hidden md:grid grid-cols-5 [&_h1]:text-center [&_h1]:font-semibold py-2 border-b-2">
        <h1>Name</h1>
        <h1>Ticket Price</h1>
        <h1>Quantity</h1>
        <h1>Total Price</h1>
      </div>

      {cart.length === 0 && (
        <p className="text-red-500 p-2 border-y-2">
          Cart is empty please choose ticket from ticket tab
        </p>
      )}

      {cart.length !== 0 && (
        <div className="flex flex-col gap-4 mt-4">
          {cart.map((cart, idx) => (
            <CartCard
              key={idx}
              ticket={ticket}
              cart={cart}
              handleRemoveCart={handleRemoveCart}
            />
          ))}

          <div className="w-full grid md:grid-cols-5 text-center">
            <h1 className="md:col-start-3 md:col-end-4 font-bold">All total price :{' '}</h1>
            <h1>{IDR.format(sumCart)}</h1>
          </div>

          {/* Checkbox to use points */}
          <div className="w-full text-center">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={usePoints}
                onChange={(e) => setUsePoints(e.target.checked)}
              />
              <span className="ml-2">
                Use {userPoints} points to reduce the total price
              </span>
            </label>
          </div>

          {/* If points are applied, show the discounted price */}
          {usePoints && userPoints > 0 && (
            <div className="w-full grid md:grid-cols-5 text-center">
              <h1 className="md:col-start-3 md:col-end-4 font-bold">
                Discounted Total :{' '}
              </h1>
              <h1>{IDR.format(discountedPrice)}</h1>
            </div>
          )}

          <div className="flex justify-center">
            <button
              onClick={() => handleTransaction(userId, cart, usePoints)} // Passing usePoints here
              className="btn-primary-ry"
            >
              Transaksi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
