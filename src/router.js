import { useEffect, useState } from 'react';

// Router mínimo basado en hash (#/admin/pedidos). Sin dependencias.
const read = () => window.location.hash.replace(/^#/, '') || '/';

export function useHashPath() {
  const [path, setPath] = useState(read);
  useEffect(() => {
    const onChange = () => setPath(read());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return path;
}

export function navigate(path) {
  window.location.hash = path;
  window.scrollTo(0, 0);
}
