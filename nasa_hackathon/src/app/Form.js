import React, { useState } from "react";
import "./app.css";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { TextField } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [notificationTime, setNotificationTime] = useState(dayjs()); // Set initial value to ensure proper formatting
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
        notificationTime: notificationTime ? notificationTime.format('HH:mm:ss') : null, // Save time as string in HH:mm:ss format
      });
      setLoader(false);
      alert("Your message has been submitted 👍");
      
      // Clear form fields
      setName("");
      setEmail("");
      setMessage("");
      setNotificationTime(dayjs()); // Reset the time picker to the current time
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
    
      {/* Time Picker for Notification Time */}
      <label>Choose Notification Time</label>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          label="Notification Time"
          value={notificationTime}
          onChange={(newValue) => setNotificationTime(newValue)}
          ampm={false} // Use 24-hour format to properly show seconds
          views={['hours', 'minutes', 'seconds']} // Specify the views to include seconds
          inputFormat="HH:mm:ss" // Specify the format to display seconds
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{
                "& .MuiInputBase-root": {
                  color: "white", // Change text color to white
                },
                "& .MuiInputLabel-root": {
                  color: "white", // Change label color to white
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white", // Change outline color to white
                },
                "& .MuiSvgIcon-root": {
                  color: "white", // Change icon color to white
                }
              }}
            />
          )}
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
