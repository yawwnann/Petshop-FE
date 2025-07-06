import apiClient from "../../../api/apiClient";

export class CheckoutModel {
  constructor() {
    this.cartItems = [];
    this.userProfile = null;
    this.loading = true;
    this.error = null;
    this.submitting = false;
    this.submitError = null;
    this.orderData = {
      nama_pelanggan: "",
      alamat_pengiriman: "",
      nomor_whatsapp: "",
      catatan: "",
      metode_pembayaran: "transfer_bank",
    };
  }

  setCartItems(cartItems) {
    this.cartItems = cartItems;
  }

  setUserProfile(userProfile) {
    this.userProfile = userProfile;
  }

  setLoading(loading) {
    this.loading = loading;
  }

  setError(error) {
    this.error = error;
  }

  setSubmitting(submitting) {
    this.submitting = submitting;
  }

  setSubmitError(submitError) {
    this.submitError = submitError;
  }

  setOrderData(orderData) {
    this.orderData = { ...this.orderData, ...orderData };
  }

  getCartItems() {
    return this.cartItems;
  }

  getUserProfile() {
    return this.userProfile;
  }

  getLoading() {
    return this.loading;
  }

  getError() {
    return this.error;
  }

  getSubmitting() {
    return this.submitting;
  }

  getSubmitError() {
    return this.submitError;
  }

  getOrderData() {
    return this.orderData;
  }

  formatRupiah(angka) {
    if (!angka) return "Rp -";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(angka);
  }

  async fetchCartItems() {
    this.loading = true;
    this.error = null;

    try {
      const response = await apiClient.get("/keranjang");
      this.cartItems = response.data.data || [];
    } catch (error) {
      console.error("Error fetching cart items:", error);
      this.error = "Gagal memuat keranjang";
      this.cartItems = [];
    } finally {
      this.loading = false;
    }
  }

  async fetchUserProfile() {
    try {
      const response = await apiClient.get("/profile");
      this.userProfile = response.data.data || response.data;

      // Pre-fill order data with user profile
      if (this.userProfile) {
        this.orderData = {
          ...this.orderData,
          nama_pelanggan: this.userProfile.name || "",
          nomor_whatsapp: this.userProfile.phone || "",
        };
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      // Don't set error for profile fetch failure
    }
  }

  calculateSubtotal() {
    return this.cartItems.reduce((total, item) => {
      return total + (item.produk?.harga || 0) * item.quantity;
    }, 0);
  }

  calculateShippingCost() {
    // Simple shipping calculation - can be enhanced
    return 10000; // Fixed shipping cost
  }

  calculateTotal() {
    return this.calculateSubtotal() + this.calculateShippingCost();
  }

  getTotalItems() {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  validateOrderData() {
    const errors = {};

    if (!this.orderData.nama_pelanggan.trim()) {
      errors.nama_pelanggan = "Nama pelanggan wajib diisi";
    }

    if (!this.orderData.alamat_pengiriman.trim()) {
      errors.alamat_pengiriman = "Alamat pengiriman wajib diisi";
    }

    if (!this.orderData.nomor_whatsapp.trim()) {
      errors.nomor_whatsapp = "Nomor WhatsApp wajib diisi";
    }

    if (!this.orderData.metode_pembayaran) {
      errors.metode_pembayaran = "Metode pembayaran wajib dipilih";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }

  async submitOrder() {
    const validation = this.validateOrderData();
    if (!validation.isValid) {
      return { success: false, errors: validation.errors };
    }

    this.submitting = true;
    this.submitError = null;

    try {
      const orderPayload = {
        nama_pelanggan: this.orderData.nama_pelanggan,
        alamat_pengiriman: this.orderData.alamat_pengiriman,
        nomor_whatsapp: this.orderData.nomor_whatsapp,
        catatan: this.orderData.catatan || null,
        metode_pembayaran: this.orderData.metode_pembayaran || "transfer",
        items: this.cartItems.map((item) => ({
          produk_id: item.produk.id,
          quantity: item.quantity,
        })),
      };

      const response = await apiClient.post("/pesanan", orderPayload);

      // Clear cart after successful order
      await this.clearCart();

      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error submitting order:", error);
      this.submitError =
        error.response?.data?.message || "Gagal membuat pesanan";
      return { success: false, error: this.submitError };
    } finally {
      this.submitting = false;
    }
  }

  async clearCart() {
    try {
      // Clear all cart items
      for (const item of this.cartItems) {
        await apiClient.delete(`/keranjang/${item.id}`);
      }
      this.cartItems = [];
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  }
}
