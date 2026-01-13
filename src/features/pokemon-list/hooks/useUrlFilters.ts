import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * Custom hook to sync filter state with URL query parameters
 */
export const useUrlFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize filter states from URL
  const [selectedTypes, setSelectedTypes] = useState<string[]>(() => {
    const types = searchParams.get('types');
    return types ? types.split(',') : [];
  });

  const [selectedGeneration, setSelectedGeneration] = useState<string>(() => {
    return searchParams.get('generation') || 'All';
  });

  const [sortBy, setSortBy] = useState<string>(() => {
    return searchParams.get('sort') || 'id-asc';
  });

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    if (selectedTypes.length > 0) {
      params.set('types', selectedTypes.join(','));
    }
    if (selectedGeneration !== 'All') {
      params.set('generation', selectedGeneration);
    }
    if (sortBy !== 'id-asc') {
      params.set('sort', sortBy);
    }

    setSearchParams(params, { replace: true });
  }, [selectedTypes, selectedGeneration, sortBy, setSearchParams]);

  return {
    selectedTypes,
    setSelectedTypes,
    selectedGeneration,
    setSelectedGeneration,
    sortBy,
    setSortBy,
  };
};

