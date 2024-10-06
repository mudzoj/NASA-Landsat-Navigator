import React, { useState } from "react";
import "./app.css";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore"; // Import necessary Firestore functions
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"; // Provider for localization
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [notificationDate, setNotificationDate] = useState(null); // Add state for the date picker
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
  
    try {
      // Add a new document to the "contacts" collection
      await addDoc(collection(db, "contacts"), {
        name: name,
        email: email,
        message: message,
        notificationDate: notificationDate ? notificationDate.format() : null, // Add the selected date to Firestore as a string
      });
      setLoader(false);
      alert("Your message has been submitted 👍");
  
      // Clear form fields
      setName("");
      setEmail("");
      setMessage("");
      setNotificationDate(null); // Clear the date picker
    } catch (error) {
      alert(error.message);
      setLoader(false);
    }
  };
  

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1>Contact Us 🤳</h1>
    
      <label>Name</label>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    
      <label>Email</label>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    
      <label>Message</label>
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
    
      {/* Date Picker for Notification Date */}
      <label>Choose Notification Date</label>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Notification Date"
          value={notificationDate}
          onChange={(newValue) => setNotificationDate(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    
      <button
        type="submit"
        style={{ background: loader ? "#ccc" : "rgb(2, 2, 110)" }}
        disabled={loader}
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
