import { useEffect, useState } from 'react';
const get = () => location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
export function useRoute() {
  const [r, setR] = useState(get);
  useEffect(() => {
    const f = () => { setR(get()); window.scrollTo(0, 0); };
    addEventListener('hashchange', f);
    return () => removeEventListener('hashchange', f);
  }, []);
  return r;
}
