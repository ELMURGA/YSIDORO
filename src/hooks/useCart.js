import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'isidoro_cart';

function readInitialCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Carrito de compra: misma forma de datos y misma persistencia en
// localStorage que la maqueta original, ahora como hook de React.
export function useCart() {
  const [cart, setCart] = useState(readInitialCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prev, { product, quantity }];
    });
  }, []);

  const addManyToCart = useCallback((entries) => {
    setCart((prev) => {
      let next = [...prev];
      entries.forEach(({ product, quantity = 1 }) => {
        const idx = next.findIndex((item) => item.product.id === product.id);
        if (idx >= 0) {
          next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
        } else {
          next = [...next, { product, quantity }];
        }
      });
      return next;
    });
  }, []);

  const updateQty = useCallback((productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const removeItem = useCallback((productId) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return {
    cart,
    addToCart,
    addManyToCart,
    updateQty,
    removeItem,
    clearCart,
    totalItems,
    totalPrice,
  };
}
