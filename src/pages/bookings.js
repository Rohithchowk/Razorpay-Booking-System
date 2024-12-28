import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import { Modal, Box, TextField, Button } from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import 'react-calendar/dist/Calendar.css';

const Home = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    nationality: '+91',
    amountPaid: 2000,
  });

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/booked-dates')
      .then((response) => setBookedDates(response.data))
      .catch((error) => console.error('Error fetching booked dates:', error));
  }, []);

  const handleDateClick = (date) => {
    if (!bookedDates.includes(date.toISOString().split('T')[0])) {
      
      setSelectedDate(date);
      setOpenModal(true);
    }
  };

  const handleConfirmBooking = async () => {
    if (
      !userDetails.name ||
      !userDetails.email ||
      !userDetails.phone ||
      !selectedDate
    ) {
      alert('Please fill all the mandatory fields.');
      return;
    }

    try {
      const { data: orderData } = await axios.post(
        'http://localhost:5000/api/order',
        { amount: userDetails.amountPaid }
      );

      const { data: keyData } = await axios.get(
        'http://localhost:5000/api/getkey'
      );

      const options = {
        key: keyData.keyId,
        amount: orderData.order.amount,
        currency: 'INR',
        name: 'Rohith Chowki',
        description: 'Payment for booking',
        order_id: orderData.order.id,
        handler: async function (response) {
          try {
            const paymentData = {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              userDetails,
              date: selectedDate.toISOString().split('T')[0],
            };

            const saveResponse = await axios.post(
              'http://localhost:5000/api/payment',
              paymentData
            );

            if (saveResponse.status === 200) {
              alert('Payment successful and booking confirmed!');
              setBookedDates((prevDates) => [
                ...prevDates,
                selectedDate.toISOString().split('T')[0],
              ]);
              setOpenModal(false);
            } else {
              alert('Error saving booking details.');
            }
          } catch (error) {
            console.error('Error saving payment and booking details:', error);
            alert('Payment successful but booking failed.');
          }
        },
        prefill: {
          name: userDetails.name,
          email: userDetails.email,
          contact: userDetails.phone,
        },
        notes: {
          address: 'Booking Service Address',
        },
        theme: {
          color: '#F37254',
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error('Error initiating Razorpay payment:', error);
      alert('Error initiating payment. Please try again later.');
    }
  };

  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '50px auto', 
      textAlign: 'center', 
      borderRadius: '10px',
      padding: '20px',
      background: 'rgba(255, 255, 255, 0.9)',
      boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.2)',
      animation: 'fadeIn 1.2s ease-in-out' 
    }}>
      <style>
        {`
          body {
            font-family: 'Poppins', sans-serif;
            background: linear-gradient(to right, #ff7e5f, #feb47b);
            margin: 0;
            padding: 0;
            color: #333;
          }

          h1 {
            font-size: 2.5rem;
            font-weight: bold;
            color: #ffffff;
            text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
          }

          .react-calendar {
            width: 100%;
            border: none;
            border-radius: 10px;
            overflow: hidden;
            background: white;
            box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
          }

          .react-calendar__tile {
            height: 50px;
            font-size: 1rem;
            color: #333;
            border-radius: 8px;
            transition: all 0.3s ease-in-out;
          }

          .react-calendar__tile:hover {
            background: #ff7e5f;
            color: white;
            transform: scale(1.1);
          }

          .react-calendar__tile--active {
            background: #feb47b !important;
            color: white !important;
            transform: scale(1.1);
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
      <h1>Booking Calendar</h1>
      <Calendar
        onClickDay={handleDateClick}
        tileDisabled={({ date }) =>
          bookedDates.includes(date.toISOString().split('T')[0])
        }
      />
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2>Booking Details</h2>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={userDetails.name}
            onChange={(e) =>
              setUserDetails({ ...userDetails, name: e.target.value })
            }
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={userDetails.email}
            onChange={(e) =>
              setUserDetails({ ...userDetails, email: e.target.value })
            }
          />
          
          <div style={{ margin: '10px 0' }}>
            <PhoneInput
              country={'in'}
              value={userDetails.phone}
              onChange={(phone, country) =>
                setUserDetails({
                  ...userDetails,
                  phone,
                  nationality: '+' + country.dialCode,
                })
              }
              inputStyle={{
                width: '85%',
                padding: '15px',
                fontSize: '16px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                height: '50px',
                marginLeft: '50px',
              }}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleConfirmBooking}
            style={{ marginTop: '15px' }}
          >
            Pay and Confirm Booking
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Home;
