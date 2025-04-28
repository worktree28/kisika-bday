import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate }) => {
  const TIME = new Date('2025-05-03T12:00:00.000Z');

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Function to calculate time left
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = TIME - now;
      console.log(difference);
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Cleanup
    return () => clearInterval(timer);
  }, []); // Empty dependency array since we're using a constant

  return (
    <div className='countdown-container'>
      <div className='countdown-title'>
        See you in:
        <div className='countdown-target-date'>
          Friday, May 3, 2025 at 5:30 PM IST
        </div>
      </div>
      <div className='countdown-timer'>
        <div className='countdown-segment'>
          <div className='countdown-number'>
            {String(timeLeft.days).padStart(2, '0')}
          </div>
          <div className='countdown-label'>Days</div>
        </div>
        <div className='countdown-segment'>
          <div className='countdown-number'>
            {String(timeLeft.hours).padStart(2, '0')}
          </div>
          <div className='countdown-label'>Hours</div>
        </div>
        <div className='countdown-segment'>
          <div className='countdown-number'>
            {String(timeLeft.minutes).padStart(2, '0')}
          </div>
          <div className='countdown-label'>Minutes</div>
        </div>
        <div className='countdown-segment'>
          <div className='countdown-number'>
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
          <div className='countdown-label'>Seconds</div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
