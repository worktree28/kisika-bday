import { useState, useEffect } from 'react';
import './PortraitModeOverlay.css';

const PortraitModeOverlay = () => {
  const [isPortrait, setIsPortrait] = useState(
    window.innerHeight > window.innerWidth
  );
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Function to check if device is in portrait mode
    const checkOrientation = () => {
      const portrait = window.innerHeight > window.innerWidth;
      setIsPortrait(portrait);

      // Lock/unlock scrolling based on orientation and dismissed state
      if (portrait && !dismissed) {
        document.body.classList.add('no-scroll');
      } else {
        document.body.classList.remove('no-scroll');
      }
    };

    // Check orientation on mount
    checkOrientation();

    // Add event listener for orientation changes
    window.addEventListener('resize', checkOrientation);

    // Clean up event listeners
    return () => {
      window.removeEventListener('resize', checkOrientation);
      document.body.classList.remove('no-scroll');
    };
  }, [dismissed]);

  const handleDismiss = () => {
    setDismissed(true);
  };

  // Don't show overlay if not in portrait mode or if user dismissed it
  if (!isPortrait || dismissed) return null;

  return (
    <div className='portrait-overlay'>
      <button className='close-button' onClick={handleDismiss}>
        ✕
      </button>
      <div className='portrait-content'>
        <h2>Rotate for Best View</h2>
        <div className='video-container'>
          <video autoPlay loop muted playsInline>
            <source
              src='https://cdn.pixabay.com/video/2024/11/09/240570_large.mp4'
              type='video/mp4'
            />
            Your browser does not support the video tag.
          </video>
        </div>
        <p>This experience looks better in landscape</p>
        <button className='continue-button' onClick={handleDismiss}>
          Continue anyway
        </button>
      </div>
    </div>
  );
};

export default PortraitModeOverlay;
