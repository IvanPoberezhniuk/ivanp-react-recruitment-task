import { useState, useEffect } from 'react';

const FEATURE_TOUR_KEY = 'hasSeenFeatureTour';

/**
 * Custom hook to manage feature tour visibility
 * Shows on first visit, can be toggled manually
 */
export const useFeatureTour = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSeenTour, setHasSeenTour] = useState(true);

  useEffect(() => {
    const seen = localStorage.getItem(FEATURE_TOUR_KEY);
    if (!seen) {
      setHasSeenTour(false);
      setIsOpen(true);
    }
  }, []);

  const toggleTour = () => {
    setIsOpen((prev) => !prev);
  };

  const closeTour = () => {
    setIsOpen(false);
    if (!hasSeenTour) {
      localStorage.setItem(FEATURE_TOUR_KEY, 'true');
      setHasSeenTour(true);
    }
  };

  return {
    isOpen,
    hasSeenTour,
    toggleTour,
    closeTour,
  };
};

