import { useEffect, useState } from 'react';
import throttle from 'lodash/throttle';

export default function useMobile(): boolean {
  const [mobile, setMobile] = useState(() =>
    window.matchMedia('(max-width: 768px)').matches ? true : false
  );

  useEffect(() => {
    const throttledEventListener = throttle(() => {
      if (window.innerWidth <= 768) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    }, 200);
    window.addEventListener('resize', throttledEventListener);
    return () => window.removeEventListener('resize', throttledEventListener);
  }, []);

  return mobile;
}
