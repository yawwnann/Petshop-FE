import React, { createContext, useState, useContext, useEffect } from 'react';
import apiClient from '../api/apiClient';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/keranjang');
      setCartItems(response.data.data || []);
    } catch (err) {
      setError('Gagal memuat keranjang.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Hanya fetch jika ada token (user login)
    if (localStorage.getItem('token')) {
      fetchCartItems();
    }
  }, []);

  const addToCart = async (item, type = 'produk') => {
    setLoading(true);
    let payload = {};
    if (type === 'produk') {
        payload = { produk_id: item.id, jumlah: 1 };
    } else if (type === 'service') {
        // Asumsi backend menerima 'service_id' untuk layanan
        payload = { service_id: item.id, jumlah: 1 };
    }

    try {
      await apiClient.put('/keranjang', payload);
      await fetchCartItems(); // Refresh cart from server
      return { success: true, message: `${item.title || item.nama_produk} berhasil ditambahkan!` };
    } catch (err) {
      console.error('Error adding to cart:', err);
       const errorMessage = err.response?.data?.message || 'Gagal menambahkan item.';
       if (err.response?.status === 401) {
        return { success: false, message: 'Silakan login terlebih dahulu.' };
       }
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    cartItems,
    addToCart,
    fetchCartItems,
    loading,
    error,
    cartItemCount: cartItems.reduce((acc, item) => acc + item.quantity, 0),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
