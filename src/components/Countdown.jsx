import { useEffect, useState } from "react";

const Countdown = ({ time, setShowPaymentModal }) => {
  const [timeLeft, setTimeLeft] = useState(time);

  useEffect(() => {
    if (timeLeft === 0) {
      setShowPaymentModal(false);
      return;
    };

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <div className="text-center text-gray-500">
      QR code will expire in {timeLeft} seconds
    </div>
  );
};

export default Countdown;
