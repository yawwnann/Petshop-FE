// src/app/katalog/presenter/KatalogPresenter.js
import apiClient from "../../../api/apiClient"; // Sesuaikan jalur jika diperlukan

export class KatalogPresenter {
  constructor() {
    this.model = {
      produkList: [],
      originalProdukList: [], // Simpan daftar produk asli
      kategoriList: [],
      loading: false,
      error: null,
      meta: null,
      filters: {
        search: "",
        kategori: "",
        sort: "", // Removed default sort
        minPrice: "",
        maxPrice: "",
      },
      currentPage: 1,
    };
  }

  // Metode internal untuk memperbarui state model dan memberi tahu komponen
  _updateModel(updates) {
    this.model = { ...this.model, ...updates };

  }

  // --- Getter untuk mengambil data dari Model ---
  getProdukList() {
    return this.model.produkList;
  }

  getKategoriList() {
    return this.model.kategoriList;
  }

  getLoading() {
    return this.model.loading;
  }

  getError() {
    return this.model.error;
  }

  getMeta() {
    return this.model.meta;
  }

  getFilters() {
    return this.model.filters;
  }

  getCurrentPage() {
    return this.model.currentPage;
  }

  // --- Setter untuk mengubah state Model (internal, sering dipanggil oleh handleXyz) ---
  setLoading(isLoading) {
    this._updateModel({ loading: isLoading });
  }

  setError(errorMessage) {
    this._updateModel({ error: errorMessage });
  }

  setFilters(newFilters) {
    this._updateModel({ filters: { ...this.model.filters, ...newFilters } });
  }

  setCurrentPage(page) {
    this._updateModel({ currentPage: page });
  }

  // --- Business Logic / Data Fetching ---

  async initialize() {
    this.setLoading(true);
    this.setError(null);
    try {
      // Reset filters to default on initialize
      this.resetAllFilters(false); // Do not re-fetch immediately
      this.setCurrentPage(1);

      const [produkResponse, kategoriResponse] = await Promise.all([
        this._fetchProdukListInternal(this.model.filters, 1), // Fetch initial products for page 1
        this._fetchKategoriListInternal(),
      ]);

      // Update model with fetched data
      this._updateModel({
        produkList: produkResponse.data.data || [],
        originalProdukList: produkResponse.data.data || [], // Simpan daftar asli
        meta: produkResponse.data.meta || null,
        kategoriList: kategoriResponse.data.data || [],
      });
      return { success: true };
    } catch (error) {
      console.error("Error in initialize:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Gagal menginisialisasi data.";
      this.setError(errorMessage);
      this._updateModel({ produkList: [], kategoriList: [], meta: null });
      return { success: false, error: errorMessage };
    } finally {
      this.setLoading(false);
    }
  }

  async _fetchProdukListInternal(filters, page) {
    const params = {};
    if (page) params.page = page;

    // Saat pencarian aktif, hanya kirim query pencarian untuk menghindari error server
    if (filters.search) {
      params.q = filters.search;
    } else {
      // Jika tidak mencari, kirim filter lain seperti biasa
      if (filters.kategori) params.kategori_slug = filters.kategori;
      if (filters.sort) params.sort = filters.sort;
      if (filters.minPrice) params.minPrice = filters.minPrice;
      if (filters.maxPrice) params.maxPrice = filters.maxPrice;
    }

    const response = await apiClient.get("/produks", { params });
    return response; // Mengembalikan seluruh response
  }

  async _fetchKategoriListInternal() {
    const response = await apiClient.get("/kategori");
    return response; // Mengembalikan seluruh response
  }

  async handleFilterOrSortChange(type, value) {
    const newFilters = { ...this.model.filters, [type]: value };
    this.setFilters(newFilters);
    this.setCurrentPage(1);

    // Logika Pencarian di Sisi Klien (Frontend)
    if (type === 'search') {
      this.setLoading(true);
      const searchTerm = value.toLowerCase();
      const filteredProduk = this.model.originalProdukList.filter(produk => 
        produk.nama_produk.toLowerCase().includes(searchTerm)
      );
      this._updateModel({ produkList: filteredProduk });
      this.setLoading(false);
      return { success: true };
    }

    // Logika untuk filter lain (kategori, sort, dll) tetap menggunakan API
    this.setLoading(true);
    this.setError(null);
    try {
      const response = await this._fetchProdukListInternal(newFilters, 1);
      this._updateModel({
        produkList: response.data.data || [],
        originalProdukList: response.data.data || [], // Update juga daftar asli
        meta: response.data.meta || null,
      });
      return { success: true };
    } catch (error) {
      console.error("Error in handleFilterOrSortChange:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Operasi filter/sort gagal.";
      this.setError(errorMessage);
      this._updateModel({ produkList: [], meta: null });
      return { success: false, error: errorMessage };
    } finally {
      this.setLoading(false);
    }
  }

  async handlePageChange(page) {
    this.setLoading(true);
    this.setError(null);
    this.setCurrentPage(page); // Update current page in model

    try {
      const response = await this._fetchProdukListInternal(
        this.model.filters,
        page
      );
      this._updateModel({
        produkList: response.data.data || [],
        meta: response.data.meta || null,
      });
      return { success: true };
    } catch (error) {
      console.error("Error in handlePageChange:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Gagal mengubah halaman.";
      this.setError(errorMessage);
      this._updateModel({ produkList: [], meta: null });
      return { success: false, error: errorMessage };
    } finally {
      this.setLoading(false);
    }
  }

  async resetAllFilters(fetchData = true) {
    const defaultFilters = {
      search: "",
      kategori: "",
      sort: "", // latest, oldest, price_low, price_high, name_asc, name_desce: "",
    };
    this.setFilters(defaultFilters); // Update filters in the model
    this.setCurrentPage(1); // Reset page to 1

    if (fetchData) {
      this.setLoading(true);
      this.setError(null);
      try {
        const response = await this._fetchProdukListInternal(defaultFilters, 1);
        this._updateModel({
          produkList: response.data.data || [],
          meta: response.data.meta || null,
        });
        return { success: true };
      } catch (error) {
        console.error("Error in resetAllFilters:", error);
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Gagal mereset filter.";
        this.setError(errorMessage);
        this._updateModel({ produkList: [], meta: null });
        return { success: false, error: errorMessage };
      } finally {
        this.setLoading(false);
      }
    }
    return { success: true };
  }

  async addToCart(produkId, jumlah = 1) {
    this.setLoading(true);
    try {
      // Simulate API call for adding to cart
      // const response = await apiClient.post('/cart/add', { produkId, jumlah });
      // Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay

      // Dispatch event for cart update (e.g., for header cart icon)
      window.dispatchEvent(
        new CustomEvent("cartUpdated", { detail: { produkId, jumlah } })
      );
      return {
        success: true,
        message: "Produk berhasil ditambahkan ke keranjang!",
      };
    } catch (error) {
      console.error("Error adding to cart:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Gagal menambahkan produk ke keranjang.";
      this.setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      this.setLoading(false);
    }
  }

  formatRupiah(angka) {
    const number = typeof angka === "string" ? parseInt(angka, 10) : angka;
    if (isNaN(number) || number === null || number === undefined) return "Rp -";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  }

  isProductAvailable(produk) {
    return produk?.status_ketersediaan?.toLowerCase() === "tersedia";
  }

  getStatusBadgeColor(statusKetersediaan) {
    const isTersedia = statusKetersediaan?.toLowerCase() === "tersedia";
    return isTersedia
      ? "bg-emerald-500/15 text-emerald-700 ring-1 ring-inset ring-emerald-600/30"
      : "bg-rose-500/15 text-rose-700 ring-1 ring-inset ring-rose-600/30";
  }
}
