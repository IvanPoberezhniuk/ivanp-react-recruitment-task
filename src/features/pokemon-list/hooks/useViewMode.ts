import { useState, useEffect } from 'react';

/**
 * Custom hook to persist view mode in localStorage
 */
export const useViewMode = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(() => {
    const savedViewMode = localStorage.getItem('pokemonViewMode');
    return savedViewMode === 'grid' || savedViewMode === 'list'
      ? savedViewMode
      : 'grid';
  });

  useEffect(() => {
    localStorage.setItem('pokemonViewMode', viewMode);
  }, [viewMode]);

  return {
    viewMode,
    setViewMode,
  };
};

