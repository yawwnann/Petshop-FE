import apiClient from "../../../api/apiClient";

export class DetailItemModel {
  constructor() {
    this.itemDetail = null;
    this.loading = true;
    this.error = null;
    this.quantity = 1;
    this.relatedItemList = [];
    this.relatedLoading = false;
    this.relatedError = null;
    this.isAddingToCart = false;
    this.addToCartStatus = null;
  }

  setItemDetail(itemDetail) {
    this.itemDetail = itemDetail;
  }

  setLoading(loading) {
    this.loading = loading;
  }

  setError(error) {
    this.error = error;
  }

  setQuantity(quantity) {
    this.quantity = quantity;
  }

  setRelatedItemList(relatedItemList) {
    this.relatedItemList = relatedItemList;
  }

  setRelatedLoading(relatedLoading) {
    this.relatedLoading = relatedLoading;
  }

  setRelatedError(relatedError) {
    this.relatedError = relatedError;
  }

  setIsAddingToCart(isAddingToCart) {
    this.isAddingToCart = isAddingToCart;
  }

  setAddToCartStatus(addToCartStatus) {
    this.addToCartStatus = addToCartStatus;
  }

  getItemDetail() {
    return this.itemDetail;
  }

  getLoading() {
    return this.loading;
  }

  getError() {
    return this.error;
  }

  getQuantity() {
    return this.quantity;
  }

  getRelatedItemList() {
    return this.relatedItemList;
  }

  getRelatedLoading() {
    return this.relatedLoading;
  }

  getRelatedError() {
    return this.relatedError;
  }

  getIsAddingToCart() {
    return this.isAddingToCart;
  }

  getAddToCartStatus() {
    return this.addToCartStatus;
  }

  formatRupiah(angka) {
    if (angka === null || angka === undefined) return "Rp -";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(angka);
  }

  async fetchDetailItem(slug) {
    this.loading = true;
    this.error = null;
    this.itemDetail = null;
    this.relatedItemList = [];

    try {
      const response = await apiClient.get(`/produks/${slug}`);
      if (response.data && response.data.data) {
        this.itemDetail = response.data.data;
        this.quantity = 1;
      } else {
        this.error = "Data Item tidak ditemukan atau format tidak sesuai.";
      }
    } catch (err) {
      console.error(`Gagal memuat detail Item (slug: ${slug}):`, err);
      if (err.response && err.response.status === 404) {
        this.error = "Item yang Anda cari tidak ditemukan.";
      } else {
        this.error = "Terjadi kesalahan saat memuat detail Item.";
      }
    } finally {
      this.loading = false;
    }
  }

  async fetchRelatedItem(categorySlug, currentItemId) {
    this.relatedLoading = true;
    this.relatedError = null;

    try {
      const response = await apiClient.get(
        `/produks?kategori=${categorySlug}&per_page=4`
      );
      const relatedItem = response.data.data || [];
      this.relatedItemList = relatedItem.filter(
        (item) => item.id !== currentItemId
      );
    } catch (err) {
      console.error("Gagal memuat Item terkait:", err);
      this.relatedError = "Gagal memuat produk terkait";
      this.relatedItemList = [];
    } finally {
      this.relatedLoading = false;
    }
  }

  async addToCart(itemId, quantity) {
    this.isAddingToCart = true;
    this.addToCartStatus = null;

    try {
      await apiClient.post("/keranjang", { item_id: itemId, quantity });
      this.addToCartStatus = {
        type: "success",
        message: "Berhasil ditambahkan ke keranjang!",
      };
      window.dispatchEvent(new CustomEvent("cartUpdated"));
      return { success: true };
    } catch (err) {
      console.error("Gagal menambah ke keranjang:", err);
      let errorMessage = "Gagal menambahkan ke keranjang";

      if (err.response) {
        if (err.response.status === 401 || err.response.status === 403) {
          errorMessage = "Silakan login terlebih dahulu";
        } else if (err.response.data?.message) {
          errorMessage = err.response.data.message;
        }
      }

      this.addToCartStatus = { type: "error", message: errorMessage };
      return { success: false, error: errorMessage };
    } finally {
      this.isAddingToCart = false;
    }
  }

  getStatusBadgeColor(statusKetersediaan) {
    return statusKetersediaan?.toLowerCase() === "tersedia"
      ? "bg-emerald-100 text-emerald-800"
      : "bg-rose-100 text-rose-800";
  }

  isProductAvailable() {
    return this.itemDetail?.status_ketersediaan?.toLowerCase() === "tersedia";
  }
}
