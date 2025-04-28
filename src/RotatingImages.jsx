import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './RotatingImages.css';
import imageB from './assets/imagenobga.png';
import imageA from './assets/imagenobgs.png';

const RotatingImages = () => {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [leftImageAngle, setLeftImageAngle] = useState(0);
  const [rightImageAngle, setRightImageAngle] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverTimer, setHoverTimer] = useState(null);

  // Set to true to see debug information
  const DEBUG_MODE = false;

  // Handle mouse movement
  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    setIsHovering(true);

    // Clear any existing timer
    if (hoverTimer) {
      clearTimeout(hoverTimer);
    }

    // Set a new timer to reset to rotation after 2 seconds of no movement
    const timer = setTimeout(() => {
      setIsHovering(false);
    }, 2000);

    setHoverTimer(timer);
  };

  useEffect(() => {
    setMounted(true);

    // Add mouse move listener
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      setMounted(false);
      window.removeEventListener('mousemove', handleMouseMove);
      if (hoverTimer) {
        clearTimeout(hoverTimer);
      }
    };
  }, [hoverTimer, handleMouseMove]);

  // Calculate angles based on mouse position
  useEffect(() => {
    if (!isHovering) return;

    // Get window dimensions
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Calculate angles for both images
    // For left image (bottom left corner)
    // Use a more accurate position for the left image (adjust based on your image size)
    const leftImagePos = { x: 90, y: windowHeight - 90 }; // Approximate center of the image
    const leftDx = mousePosition.x - leftImagePos.x;
    const leftDy = mousePosition.y - leftImagePos.y;
    // Calculate angle in degrees and adjust to make x-axis point at mouse
    // The +90 adjustment is to align the image's x-axis with the angle
    const leftAngle = Math.atan2(leftDy, leftDx) * (180 / Math.PI) + 30;

    // For right image (bottom right corner)
    const rightImagePos = { x: windowWidth - 90, y: windowHeight - 90 }; // Approximate center of the image
    const rightDx = mousePosition.x - rightImagePos.x;
    const rightDy = mousePosition.y - rightImagePos.y;
    // Same adjustment for the right image
    const rightAngle = Math.atan2(rightDy, rightDx) * (180 / Math.PI) + 150;

    setLeftImageAngle(leftAngle);
    setRightImageAngle(rightAngle);
  }, [mousePosition, isHovering]);

  // Create custom CSS classes for the current rotation angles
  useEffect(() => {
    if (!mounted) return;

    // Create a style element if it doesn't exist
    let styleElement = document.getElementById('rotating-images-style');
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = 'rotating-images-style';
      document.head.appendChild(styleElement);
    }

    // Update the style with the current angles
    if (isHovering) {
      styleElement.innerHTML = `
        .rotating-image-left .rotating-image {
          animation: none !important;
          transform: rotate(${leftImageAngle}deg) !important;
        }
        .rotating-image-right .rotating-image {
          animation: none !important;
          transform: rotate(${rightImageAngle}deg) !important;
        }
      `;
    } else {
      styleElement.innerHTML = '';
    }

    // Clean up
    return () => {
      if (styleElement && styleElement.parentNode) {
        styleElement.innerHTML = '';
      }
    };
  }, [mounted, isHovering, leftImageAngle, rightImageAngle]);

  // Only render once the component is mounted (client-side)
  if (!mounted) return null;

  return createPortal(
    <>
      <div className='rotating-image-container rotating-image-left'>
        <img
          src={imageA}
          alt='Rotating decoration'
          className='rotating-image'
        />
        {DEBUG_MODE && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100px',
              height: '2px',
              background: 'red',
              transformOrigin: 'left center',
              transform: `rotate(${leftImageAngle}deg)`,
            }}
          ></div>
        )}
      </div>
      <div className='rotating-image-container rotating-image-right'>
        <img
          src={imageB}
          alt='Rotating decoration'
          className='rotating-image'
        />
        {DEBUG_MODE && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100px',
              height: '2px',
              background: 'green',
              transformOrigin: 'left center',
              transform: `rotate(${rightImageAngle}deg)`,
            }}
          ></div>
        )}
      </div>
    </>,
    document.body
  );
};

export default RotatingImages;
