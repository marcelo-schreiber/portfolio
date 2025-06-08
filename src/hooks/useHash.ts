import { useState, useEffect } from 'react';

export function useHash(hash: string) {
  const [isDebug, setIsDebug] = useState(false);

  useEffect(() => {
    setIsDebug(window.location.hash === `#${hash}`);

    const handleHashChange = () => {
      setIsDebug(window.location.hash === `#${hash}`);
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return isDebug;
} 