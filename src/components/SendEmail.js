import { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig'; // Import Firebase config
import emailjs from 'emailjs-com';

const SendEmail = () => {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
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

  const handleSendEmail = () => {
    if (!userEmail) {
      alert("No user logged in!");
      return;
    }

    const templateParams = {
      to_email: userEmail, // User's email
      subject: "Your Subject Here",
      message: "This is a test message sent to you!",
    };

    emailjs.send('service_jqajw2l', 'template_od7gyfk', templateParams, 'lmjzjf2u4E96BI8-H')
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
      <h1>Send Email</h1>
      <button onClick={handleSendEmail}>Send Email to Me</button>
    </div>
  );
};

export default SendEmail;
