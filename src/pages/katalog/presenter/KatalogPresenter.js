import { KatalogModel } from "../model/KatalogModel";

export class KatalogPresenter {
  constructor() {
    this.model = new KatalogModel();
  }

  async initialize() {
    await Promise.all([
      this.model.fetchProdukList(),
      this.model.fetchKategoriList(),
    ]);
  }

  getProdukList() {
    return this.model.getProdukList();
  }

  getAtkList() {
    return this.model.getProdukList();
  }

  getKategoriList() {
    return this.model.getKategoriList();
  }

  getLoading() {
    return this.model.getLoading();
  }

  getError() {
    return this.model.getError();
  }

  getMeta() {
    return this.model.getMeta();
  }

  getFilters() {
    return this.model.getFilters();
  }

  getCurrentPage() {
    return this.model.getCurrentPage();
  }

  formatRupiah(angka) {
    return this.model.formatRupiah(angka);
  }

  async handleFilterOrSortChange(type, value) {
    this.model.setFilters({ [type]: value });
    this.model.setCurrentPage(1);
    await this.model.fetchProdukList();
  }

  async handlePageChange(page) {
    this.model.setCurrentPage(page);
    await this.model.fetchProdukList();
  }

  async resetAllFilters() {
    this.model.setFilters({
      search: "",
      kategori: "",
      sort: "latest",
      minPrice: "",
      maxPrice: "",
    });
    this.model.setCurrentPage(1);
    await this.model.fetchProdukList();
  }

  async handleAddToCart(produkId, jumlah = 1) {
    const result = await this.model.addToCart(produkId, jumlah);
    if (result.success) {
      window.dispatchEvent(new CustomEvent("cartUpdated"));
    }
    return result;
  }

  handleNavigateToDetail(navigate, produk) {
    navigate(`/produk/${produk?.slug || produk?.id}`);
  }

  getStatusBadgeColor(statusKetersediaan) {
    const isTersedia = statusKetersediaan?.toLowerCase() === "tersedia";
    return isTersedia
      ? "bg-emerald-500/15 text-emerald-700 ring-1 ring-inset ring-emerald-600/30"
      : "bg-rose-500/15 text-rose-700 ring-1 ring-inset ring-rose-600/30";
  }

  isProductAvailable(produk) {
    return produk?.status_ketersediaan?.toLowerCase() === "tersedia";
  }
}
