// Function to create stars
function createStars() {
  const stars = document.createElement('div');
  stars.className = 'stars';
  document.body.appendChild(stars);

  // Star colors for a more realistic night sky
  const starColors = [
    'rgba(255, 255, 255, 0.8)',  // White
    'rgba(255, 255, 255, 0.9)',  // Bright white
    'rgba(173, 216, 230, 0.8)',  // Light blue
    'rgba(255, 223, 170, 0.8)',  // Light yellow
    'rgba(255, 192, 203, 0.7)'   // Light pink
  ];

  // Create multiple stars with random positions, sizes, and colors
  for (let i = 0; i < 500; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;

    // Random size (smaller stars are more common)
    const size = Math.random() < 0.8 ?
      Math.random() * 1.5 + 0.5 : // 80% chance of small star (0.5px - 2px)
      Math.random() * 2 + 2;      // 20% chance of larger star (2px - 4px)

    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    // Random color
    star.style.backgroundColor = starColors[Math.floor(Math.random() * starColors.length)];

    // Random twinkle properties
    star.style.animationDuration = `${Math.random() * 4 + 2}s`; // Random twinkle duration
    star.style.animationDelay = `${Math.random() * 5}s`; // Random delay

    // Add a subtle box shadow for glow effect on larger stars
    if (size > 2) {
      const color = star.style.backgroundColor;
      star.style.boxShadow = `0 0 ${size}px ${color}`;
    }

    stars.appendChild(star);
  }
}

// Improved throttle function with frame skipping for better performance
function throttle(callback, limit) {
  let waiting = false;
  let frameCount = 0;
  const FRAME_SKIP = 2; // Skip frames to further reduce processing

  return function () {
    if (!waiting) {
      // Only execute on every nth frame for even better performance
      if (frameCount % FRAME_SKIP === 0) {
        callback.apply(this, arguments);
      }

      frameCount = (frameCount + 1) % 1000; // Prevent overflow
      waiting = true;

      window.requestAnimationFrame(() => {
        waiting = false;
      });
    }
  };
}

// Cache DOM elements and values to avoid repeated lookups
let cachedDocumentHeight;
let starsElement;

// Function to handle scroll-based background transition
function handleScroll() {
  // Use requestAnimationFrame for smoother animations
  window.requestAnimationFrame(() => {
    const scrollPosition = window.scrollY;

    // Only recalculate document height when needed (it rarely changes)
    if (!cachedDocumentHeight) {
      cachedDocumentHeight = document.body.scrollHeight - window.innerHeight;
    }

    // Calculate scroll percentage with a smoother curve using easing function
    let scrollPercentage = Math.min(scrollPosition / cachedDocumentHeight, 1);

    // Apply easing function (ease-in-out cubic)
    scrollPercentage = scrollPercentage < 0.5 ?
      4 * scrollPercentage * scrollPercentage * scrollPercentage :
      1 - Math.pow(-2 * scrollPercentage + 2, 3) / 2;

    // Use stepped values instead of continuous values to reduce DOM renders
    // Define the number of steps for each effect
    const STEPS = 10; // Using 10 steps (0, 0.1, 0.2, ..., 1.0)
    const WINDOW_STEPS = 5; // Fewer steps for window lights

    // Calculate stepped values (rounded to nearest step)
    const overlayOpacityRaw = Math.max(1 - scrollPercentage * 1.2, 0);
    const starsOpacityRaw = Math.min(scrollPercentage * 1.8, 1);
    const starsTintRaw = Math.max(1 - scrollPercentage * 2, 0);
    const windowLightIntensityRaw = Math.min(scrollPercentage * 2, 1);

    // Convert to stepped values
    const overlayOpacity = Math.round(overlayOpacityRaw * STEPS) / STEPS;
    const starsOpacity = Math.round(starsOpacityRaw * STEPS) / STEPS;
    const starsTint = Math.round(starsTintRaw * STEPS) / STEPS;
    const windowLightIntensity = Math.round(windowLightIntensityRaw * WINDOW_STEPS) / WINDOW_STEPS;

    // Store current values to check if they've changed
    const currentValues = {
      overlayOpacity: document.body.style.getPropertyValue('--overlay-opacity') || '1',
      starsOpacity: document.documentElement.style.getPropertyValue('--stars-opacity') || '0',
      starsTint: document.documentElement.style.getPropertyValue('--stars-tint') || '1',
      windowLight: document.documentElement.style.getPropertyValue('--window-light') || '0'
    };

    // Only update DOM if values have changed
    const rootStyle = document.documentElement.style;
    if (currentValues.overlayOpacity !== String(overlayOpacity)) {
      document.body.style.setProperty('--overlay-opacity', overlayOpacity);
    }
    if (currentValues.starsOpacity !== String(starsOpacity)) {
      rootStyle.setProperty('--stars-opacity', starsOpacity);
    }
    if (currentValues.starsTint !== String(starsTint)) {
      rootStyle.setProperty('--stars-tint', starsTint);
    }
    if (currentValues.windowLight !== String(windowLightIntensity)) {
      rootStyle.setProperty('--window-light', windowLightIntensity);
    }

    // Cache the stars element to avoid repeated DOM queries
    if (!starsElement) {
      starsElement = document.querySelector('.stars');
    }

    // Apply parallax effect only if the element exists and using stepped values
    if (starsElement) {
      // Use fewer steps for transform to reduce repaints
      const TRANSFORM_STEPS = 5; // Fewer steps for transform (0, 5, 10, 15, 20px)
      const parallaxAmount = Math.round((scrollPercentage * 20) / TRANSFORM_STEPS) * TRANSFORM_STEPS;

      // Only update if the transform value has changed
      const currentTransform = starsElement.style.transform;
      const newTransform = `translateY(${-parallaxAmount}px)`;

      if (!currentTransform || !currentTransform.includes(`${-parallaxAmount}px`)) {
        starsElement.style.transform = newTransform;
      }
    }
  });
}

// Function to create the gradient overlay
function createGradientOverlay() {
  const overlay = document.createElement('div');
  overlay.className = 'gradient-overlay';
  document.body.appendChild(overlay);
}

// Function to create cartoony buildings
function createBuildings() {
  const buildingsContainer = document.createElement('div');
  buildingsContainer.className = 'buildings-container';
  document.body.appendChild(buildingsContainer);

  // Create different buildings with windows
  const buildingCount = 9; // More buildings for a fuller skyline

  for (let i = 0; i < buildingCount; i++) {
    const building = document.createElement('div');
    building.className = 'building';

    // Randomize building properties
    const width = 8 + Math.random() * 10; // Width between 8-18%
    const height = 40 + Math.random() * 30; // Height between 40-70% (2x taller)
    const left = (i * (100 / buildingCount)) + (Math.random() * 3 - 1.5); // Distribute across width with slight randomness

    // Set building style
    building.style.width = `${width}%`;
    building.style.height = `${height}%`;
    building.style.left = `${left}%`;

    // Slightly randomize building color
    const hue = 220 + Math.random() * 30; // Blue-ish
    const saturation = 15 + Math.random() * 10;
    const lightness = 5 + Math.random() * 10;
    building.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

    // Add windows to the building - reduced by half
    const windowRows = Math.floor(height / 6); // Fewer rows for taller buildings
    const windowCols = Math.floor(width / 4); // Fewer window columns

    for (let row = 0; row < windowRows; row++) {
      for (let col = 0; col < windowCols; col++) {
        // Don't add windows to every possible position (random)
        if (Math.random() > 0.5) { // 50% chance of having a window - reduced from 70%
          const windowEl = document.createElement('div');
          windowEl.className = 'building-window';

          // Position the window
          windowEl.style.bottom = `${(row * (90 / windowRows)) + 2 + (Math.random() * 1.5)}%`; // Better distribution for taller buildings
          windowEl.style.left = `${(col * (100 / windowCols)) + 5 + (Math.random() * 5)}%`;

          // Randomize window size slightly
          const windowSize = 0.7 + Math.random() * 0.5; // Slightly smaller windows for taller buildings
          windowEl.style.width = `${windowSize}vw`;
          windowEl.style.height = `${windowSize * 1.3}vw`;

          building.appendChild(windowEl);
        }
      }
    }

    buildingsContainer.appendChild(building);
  }
}

// Initialize the background effect
export function initBackgroundEffect() {
  createStars();
  createGradientOverlay();
  createBuildings();

  // Set initial values
  document.body.style.setProperty('--overlay-opacity', 1);
  document.documentElement.style.setProperty('--stars-opacity', 0);
  document.documentElement.style.setProperty('--stars-tint', 1);
  document.documentElement.style.setProperty('--window-light', 0);

  // Add scroll event listener with throttling and passive flag for better performance
  const throttledScrollHandler = throttle(handleScroll, 32); // ~30fps is enough for smooth scrolling effects
  window.addEventListener('scroll', throttledScrollHandler, { passive: true });

  // Reset cached values when window is resized
  window.addEventListener('resize', () => {
    cachedDocumentHeight = null;
    // Call handleScroll to update values based on new dimensions
    throttledScrollHandler();
  }, { passive: true });

  // Call once to set initial state
  handleScroll();
}
