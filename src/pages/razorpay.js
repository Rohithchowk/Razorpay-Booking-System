import { Button } from '@mui/material';
import axios from 'axios';

const PaymentButton = () => {
  const chackoutHandler = async (amount) => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/order", { amount });

      const {
        data: { keyId },
      } = await axios.get("http://localhost:5000/api/getkey");

      const options = {
        key: keyId,
        amount: data.order.amount, 
        currency: "INR",
        name: "Rohith Chowki",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: data.order.id, 
        handler: function (response) {
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature);
        },
        prefill: {
          name: "Rohith Chowki",
          email: "rohith28chowki@gmail.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error in checkoutHandler", error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '6vh' }}>
      <Button  onClick={() => chackoutHandler(15000)} variant='contained' color='primary' 
    >
        Pay Now
      </Button>
    </div>
  );
};

export default PaymentButton;