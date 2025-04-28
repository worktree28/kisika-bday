import React from 'react';
import './App.css';
import './BirthdayStyles.css';
import PortraitModeOverlay from './PortraitModeOverlay';
import RotatingImages from './RotatingImages';
import CountdownTimer from './CountdownTimer';
import PartyDetails from './PartyDetails';

function App() {
  return (
    <>
      <PortraitModeOverlay />
      <RotatingImages />

      <div className='birthday-title-container'>
        <h1 className='birthday-title'>Congratulations on Being Invited</h1>
        <h2 className='birthday-subtitle'>Sharvs & Apala's Birthday Party!</h2>
      </div>

      <CountdownTimer />

      <PartyDetails />

      <p className='end'>
        We can't wait to celebrate with you! 🎉 
      </p>

      <p className='read-the-docs'>
        made with ❤️ by <a href="https://github.com/worktree28" >💻</a>
        </p>
    </>
  );
}


export default App;
