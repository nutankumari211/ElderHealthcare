// MedicineReminderApp.js
import React, { useState, useEffect } from "react";
import { auth, firestore } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const MedicineReminderApp = () => {
  const [reminders, setReminders] = useState([]);
  const [newMedicine, setNewMedicine] = useState("");
  const [newTime, setNewTime] = useState("");
  const [editingReminder, setEditingReminder] = useState(null);

  useEffect(() => {
    const unsubscribe = firestore
      .collection("reminders")
      .where("userId", "==", auth.currentUser.uid)
      .onSnapshot((snapshot) => {
        const newReminders = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReminders(newReminders);
      });

    return () => unsubscribe();
  }, []);

  const addReminder = async () => {
    if (newMedicine.trim() === "" || newTime.trim() === "") {
      alert("Please enter both medicine name and reminder time.");
      
      return;
    }

    if (editingReminder) {
      // Update existing reminder
      await firestore.collection("reminders").doc(editingReminder.id).update({
        medicine: newMedicine,
        time: newTime,
      });
      setEditingReminder(null);
    } else {
      // Save new reminder to Firestore
      await firestore.collection("reminders").add({
        userId: auth.currentUser.uid,
        medicine: newMedicine,
        time: newTime,
      });
    }

    setNewMedicine("");
    setNewTime("");
    toast.success("Reminder added successfully!");
  };

  const editReminder = (reminder) => {
    setEditingReminder(reminder);
    setNewMedicine(reminder.medicine);
    setNewTime(reminder.time);
  };

  const deleteReminder = async (reminderId) => {
    await firestore.collection("reminders").doc(reminderId).delete();
    toast.error("Reminder deleted successfully!");
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const currentTime = `${now.getHours()}:${now.getMinutes()}`;

      reminders.forEach((reminder) => {
        if (reminder.time === currentTime) {
          playAlarm();
        }
      });
    }, 60000); // Check every minute

    return () => clearInterval(intervalId);
  }, [reminders]);

  const playAlarm = () => {
    const alarmSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3"); // Replace with your alarm sound path
    alarmSound.play();
  };

  return (
    <div className="medicine-reminder-app">
       
      <h1 className="app-title">Medicine Reminder App</h1>
      <div className="reminder-form">
        <label>
          Medicine:
          <input
            type="text"
            placeholder="Enter medicine name"
            value={newMedicine}
            onChange={(e) => setNewMedicine(e.target.value)}
          />
        </label>
        <label>
          Reminder Time:
          <input
            type="time"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
          />
        </label>
        <button className="add-button" onClick={addReminder}>
          {editingReminder ? "Update Reminder" : "Add Reminder"}
        </button>
      </div>
      <div className="reminder-list">
        <h2>Reminders:</h2>
        <ul>
          {reminders.map((reminder) => (
            <li key={reminder.id}>
              {reminder.medicine} - {reminder.time}
              <button className="edit-button" onClick={() => editReminder(reminder)}>Edit</button>
              <button className="delete-button" onClick={() => deleteReminder(reminder.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default MedicineReminderApp;
