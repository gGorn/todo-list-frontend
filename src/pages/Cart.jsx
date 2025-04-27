import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import Card from "@/components/Card";
import Countdown from "@/components/Countdown";
import qrImage from "@/assets/qr-code.svg";

import ClearCartButton from "@/components/ClearCartButton";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.vote_average,
    0
  );

  const promotion = (totalPrice) => {
    const total = cartItems.length;
    if (total > 5) return totalPrice * 0.2;
    if (total > 3) return totalPrice * 0.1;
    return 0;
  };

  return (
    <div className="w-[80%] mx-auto p-6 flex gap-6">
      <div className="w-2/3 space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Cart</h2>
          <ClearCartButton />
        </div>
        <div className="grid  sm:grid-cols2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {cartItems.length === 0 ? (
            <p>Cart is empty.</p>
          ) : (
            cartItems.map((item) => <Card key={item.id} movie={item} />)
          )}
        </div>
      </div>

      <div className="w-1/3 p-6 bg-gray-100 rounded-lg space-y-4">
        <h2 className="text-xl font-bold">Summary</h2>
        <Separator />
        <div className="flex justify-between">
          <span>Total Items:</span>
          <span>{cartItems.length}</span>
        </div>
        <div className="flex justify-between">
          <span>Total:</span>
          <span>{totalPrice.toFixed(2)} บาท</span>
        </div>
        <div className="flex justify-between">
          <span>Promotion:</span>
          <span>{promotion(totalPrice).toFixed(2)} บาท</span>
        </div>
        <div className="flex justify-between font-semibold text-lg">
          <span>Total Price:</span>
          <span>{(totalPrice - promotion(totalPrice)).toFixed(2)} บาท</span>
        </div>
        <Button className="w-full" onClick={() => setShowPaymentModal(true)}>
          Pay Now
        </Button>
      </div>

      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Scan QR Code</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-gray-200 w-40 h-40 flex items-center justify-center">
              <img
                src={qrImage}
                alt="QR Code"
                className="w-32 h-32 object-cover"
              />
            </div>
            <Countdown
              time={showPaymentModal ? 60 : 0}
              setShowPaymentModal={setShowPaymentModal}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
