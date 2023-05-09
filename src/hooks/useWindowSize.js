import { useEffect, useState } from 'react';
import { debounce } from 'lodash';

const useWindowSize = () => {
  const getSize = () => ({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    const handleResizeDebounced = debounce(() => setWindowSize(getSize()), 250);
    window.addEventListener('resize', handleResizeDebounced);

    return () => window.removeEventListener('resize', handleResizeDebounced);
  }, []);

  return windowSize;
};

export default useWindowSize;
