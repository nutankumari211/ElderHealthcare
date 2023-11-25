import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './Components/LandingPage'; 
import Navbar from './Components/Navbar';
import Signup from './Components/Signup';
import Login from './Components/Login';
import MedicineReminderApp from './Components/MedicineReminderApp';
import About from './Components/About';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import { auth } from './firebase';

const App = () => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    auth.signOut().then(() => {
      setUser(null);
    });
  };

  return (
    <Router>
      <div>
        <Navbar user={user} onSignOut={handleSignOut} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {user ? (
            <>
              <Route path="/about" element={<About />} />
              <Route path="/about/aboutus" element={<About />} />
              <Route path="/about/contactus" element={<Contact />} />
              <Route path="/about/medicine-reminder" element={<MedicineReminderApp />} />
              <Route path="/dashboard" element={<Navigate to="/medicine-reminder" />} />
              <Route path="/medicine-reminder" element={<MedicineReminderApp />} />
              {/* Redirect to the medicine reminder if no match */}
              <Route path="/*" element={<Navigate to="/medicine-reminder" />} />
            </>
          ) : (
            <>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              {/* Redirect to landing page if no match */}
              <Route path="/*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
