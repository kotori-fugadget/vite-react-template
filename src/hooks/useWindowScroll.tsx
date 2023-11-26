import { useState, useEffect } from 'react';

export const useWindowScroll = (): [number, React.Dispatch<React.SetStateAction<number>>] => {
  const [wy, setWy] = useState<number>(0);

  useEffect(() => {
    const scrollEvent = () => {
      setWy(window.pageYOffset);
    };

    window.addEventListener('scroll', scrollEvent);

    return () => {
      window.removeEventListener('scroll', scrollEvent);
    };
  }, []);

  return [wy, setWy];
};