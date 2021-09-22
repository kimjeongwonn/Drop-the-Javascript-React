import { useEffect, useState } from 'react';
import throttle from 'lodash/throttle';

interface UseView {
  isMobile: boolean;
  viewWidth: number;
  viewHeight: number;
}

export default function useView(): UseView {
  const [isMobile, setIsMobile] = useState(() =>
    window.matchMedia('(max-width: 768px)').matches ? true : false
  );
  const [viewWidth, setViewWidth] = useState<number>();
  const [viewHeight, setViewHeight] = useState<number>();

  useEffect(() => {
    const throttledEventListener = throttle(() => {
      setViewWidth(window.innerWidth);
      setViewHeight(window.innerHeight);
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }, 200);
    window.addEventListener('resize', throttledEventListener);
    return () => window.removeEventListener('resize', throttledEventListener);
  }, []);

  return { isMobile, viewWidth, viewHeight };
}
