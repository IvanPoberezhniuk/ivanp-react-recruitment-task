import React from 'react';
import { useFeatureTour } from '../../hooks/useFeatureTour';
import { FeatureTourButton } from './FeatureTourButton';
import { FeatureList } from './FeatureList';

/**
 * Feature Tour component that shows on first visit
 * Displays a sticky button in bottom-left corner
 * Shows feature list when clicked
 */
export const FeatureTour: React.FC = () => {
  const { isOpen, hasSeenTour, toggleTour, closeTour } = useFeatureTour();

  return (
    <>
      <FeatureTourButton onClick={toggleTour} showBadge={!hasSeenTour} />
      <FeatureList isOpen={isOpen} onClose={closeTour} />
    </>
  );
};

