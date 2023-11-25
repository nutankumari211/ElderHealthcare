// LandingPage.js
import React, { useState, useEffect } from 'react';


const LandingPage = () => {
  const [randomQuote, setRandomQuote] = useState('');

  useEffect(() => {
    const quotes = [
      "Invest in your health, it's the best investment you can make.",
      "Your body hears everything your mind says. Stay positive.",
      "Take care of your body. It's the only place you have to live.",
    ];

    // Function to set a random quote
    const setRandomQuoteInterval = () => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setRandomQuote(quotes[randomIndex]);
    };

    // Set the initial quote
    setRandomQuoteInterval();

    // Update the quote every 10 seconds
    const intervalId = setInterval(setRandomQuoteInterval, 5000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []); // Run this effect only once on component mount

  return (
    <div className="landing-page">
      <div className="background-image"></div>
      <div className="content-container">
        <h1 className="app-name">Welcome To Medo App</h1>
        <p className="slogan">Your Health, Your Priority</p>
        <div className="quote-container">
          <p className="health-quote">"{randomQuote}"</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
