import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import AdminApp from './admin/AdminApp.jsx';
import { useHashPath } from './router.js';
import './index.css';
import './shop/shop.css';

function Root() {
  const path = useHashPath();
  return path.startsWith('/admin') ? <AdminApp path={path} /> : <App />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
