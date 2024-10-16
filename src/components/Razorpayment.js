import React, { useEffect, useState } from 'react';
import emailjs from 'emailjs-com';
import { auth } from '../firebaseConfig'; // Import Firebase config

const RazorpayPayment = () => {
    const [amount, setAmount] = useState(50); // Set default amount to 50
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        // Check user authentication to get user email
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUserEmail(user.email); // Set user email when logged in
                console.log("User logged in:", user.email);
            } else {
                console.log("No user logged in.");
            }
        });

        // Cleanup the listener on unmount
        return () => unsubscribe();
    }, []);

    const razorpayApiKey = process.env.REACT_APP_RAZORPAY_API_KEY;
    const EmailKey1 = process.env.REACT_APP_RAZORPAY_EMAILKEY1;
    const EmailKey2 = process.env.REACT_APP_RAZORPAY_EMAILKEY2;
    const EmailKey3 = process.env.REACT_APP_RAZORPAY_EMAILKEY3;

    const handlePayment = () => {
        if (!amount) {
            alert("Amount is not defined!");
            return;
        }

        const options = {
            key: razorpayApiKey,
            amount: (parseFloat(amount) * 100).toString(), // Razorpay requires amount in paise
            currency: "INR",
            name: "UrbanDepot",
            description: "Test Transaction",
            handler: function (response) {
                alert(`Payment ID: ${response.razorpay_payment_id}`);
                // Call the sendEmail function after successful payment
                sendEmail(response.razorpay_payment_id);
            },
            prefill: {
                name: "Shruti Kadam",
                email: userEmail, // Use the logged-in user's email
                contact: "9321530038"
            },
            theme: {
                color: "#F37254"
            }
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    const sendEmail = (paymentId) => {
        if (!userEmail) {
            alert("No user logged in!");
            return;
        }

        const templateParams = {
            to_email: userEmail, // User's email
            subject: "Payment Confirmation",
            message: `Your payment of ₹${amount} was successful! Payment ID: ${paymentId}`,
        };

        emailjs.send(EmailKey1, EmailKey2, templateParams, EmailKey3)
            .then((response) => {
                console.log('Email sent successfully:', response);
                alert("Email sent successfully!");
            })
            .catch((error) => {
                console.error('Failed to send email:', error);
                alert("Failed to send email.");
            });
    };

    return (
        <div>
            <h2>Pay with Razorpay</h2>
            <button onClick={handlePayment}>Pay Now</button>
        </div>
    );
};

export default RazorpayPayment;
