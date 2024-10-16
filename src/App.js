import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './firebaseConfig'; // Make sure the path is correct
import { onAuthStateChanged } from 'firebase/auth'; // Import onAuthStateChanged
import SignUp from './components/SignUp';
import Login from './components/Login';
import RazorpayPayment from './components/Razorpayment';
import SendEmail from './components/SendEmail';
const App = () => {

  return (
    <Router>
      <div>
        
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/payment" element={<RazorpayPayment/>} />
          <Route path="email" element={<SendEmail/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
