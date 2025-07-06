import apiClient from "../../../api/apiClient";

export class KatalogModel {
  constructor() {
    this.produkList = [];
    this.kategoriList = [];
    this.loading = true;
    this.error = null;
    this.meta = null;
    this.filters = {
      search: "",
      kategori: "",
      sort: "latest",
      minPrice: "",
      maxPrice: "",
    };
    this.currentPage = 1;
    this.perPage = 12;
  }

  setProdukList(produkList) {
    this.produkList = produkList;
  }

  setKategoriList(kategoriList) {
    this.kategoriList = kategoriList;
  }

  setLoading(loading) {
    this.loading = loading;
  }

  setError(error) {
    this.error = error;
  }

  setMeta(meta) {
    this.meta = meta;
  }

  setFilters(filters) {
    this.filters = { ...this.filters, ...filters };
  }

  setCurrentPage(page) {
    this.currentPage = page;
  }

  getProdukList() {
    return this.produkList;
  }

  getKategoriList() {
    return this.kategoriList;
  }

  getLoading() {
    return this.loading;
  }

  getError() {
    return this.error;
  }

  getMeta() {
    return this.meta;
  }

  getFilters() {
    return this.filters;
  }

  getCurrentPage() {
    return this.currentPage;
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

  async fetchProdukList() {
    this.loading = true;
    this.error = null;

    try {
      const params = {
        page: this.currentPage,
        per_page: this.perPage,
      };
      if (this.filters.search) params.q = this.filters.search;
      if (this.filters.kategori) params.kategori_slug = this.filters.kategori;
      if (this.filters.sort) {
        if (this.filters.sort === "latest") {
          params.sort = "created_at";
          params.order = "desc";
        } else if (this.filters.sort === "oldest") {
          params.sort = "created_at";
          params.order = "asc";
        } else if (this.filters.sort === "price_low") {
          params.sort = "harga";
          params.order = "asc";
        } else if (this.filters.sort === "price_high") {
          params.sort = "harga";
          params.order = "desc";
        } else if (this.filters.sort === "name_asc") {
          params.sort = "nama_produk";
          params.order = "asc";
        } else if (this.filters.sort === "name_desc") {
          params.sort = "nama_produk";
          params.order = "desc";
        }
      }
      if (this.filters.minPrice) params.minPrice = this.filters.minPrice;
      if (this.filters.maxPrice) params.maxPrice = this.filters.maxPrice;

      const response = await apiClient.get(`/produks`, { params });
      this.produkList = response.data.data || [];
      this.meta = response.data.meta || null;
    } catch (error) {
      console.error("Error fetching produk list:", error);
      this.error = "Gagal memuat data produk";
      this.produkList = [];
    } finally {
      this.loading = false;
    }
  }

  async fetchKategoriList() {
    try {
      const response = await apiClient.get("/kategori");
      this.kategoriList = response.data.data || [];
    } catch (error) {
      console.error("Error fetching kategori list:", error);
      this.kategoriList = [];
    }
  }

  async addToCart(produkId, jumlah = 1) {
    try {
      await apiClient.put("/keranjang", { produk_id: produkId, jumlah });
      return { success: true };
    } catch (error) {
      console.error("Error adding to cart:", error);
      return {
        success: false,
        error:
          error.response?.data?.message || "Gagal menambahkan ke keranjang",
      };
    }
  }
}
