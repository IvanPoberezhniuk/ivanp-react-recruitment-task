import { useEffect } from 'react';

/**
 * Custom hook to set the document title (browser tab title)
 * @param title - The title to set for the page
 * @param suffix - Optional suffix to append (defaults to " | Pokédex")
 */
export const usePageTitle = (title: string, suffix: string = ' | Pokédex') => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title + suffix;

    // Cleanup: restore previous title when component unmounts
    return () => {
      document.title = previousTitle;
    };
  }, [title, suffix]);
};

