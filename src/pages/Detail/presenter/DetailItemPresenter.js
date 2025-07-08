import { DetailItemModel } from "../model/DetailItemModel";

export class DetailItemPresenter {
  constructor() {
    this.model = new DetailItemModel();
  }

  async initialize(slug) {
    await this.model.fetchDetailItem(slug);

    // Fetch related Item if we have category info
    const itemDetail = this.model.getItemDetail();
    if (itemDetail?.kategori?.slug && itemDetail?.id) {
      await this.model.fetchRelatedItem(
        itemDetail.kategori.slug,
        itemDetail.id
      );
    }
  }

  getItemDetail() {
    return this.model.getItemDetail();
  }

  getLoading() {
    return this.model.getLoading();
  }

  getError() {
    return this.model.getError();
  }

  getQuantity() {
    return this.model.getQuantity();
  }

  getRelatedItemList() {
    return this.model.getRelatedItemList();
  }

  getRelatedLoading() {
    return this.model.getRelatedLoading();
  }

  getRelatedError() {
    return this.model.getRelatedError();
  }

  getIsAddingToCart() {
    return this.model.getIsAddingToCart();
  }

  getAddToCartStatus() {
    return this.model.getAddToCartStatus();
  }

  formatRupiah(angka) {
    return this.model.formatRupiah(angka);
  }

  handleQuantityChange(amount) {
    const currentQuantity = this.model.getQuantity();
    const newQuantity = Math.max(1, currentQuantity + amount);
    this.model.setQuantity(newQuantity);
  }

  async handleAddToCart() {
    const itemDetail = this.model.getItemDetail();
    const quantity = this.model.getQuantity();

    if (!itemDetail || !this.model.isProductAvailable()) {
      return { success: false, error: "Produk tidak tersedia" };
    }

    return await this.model.addToCart(itemDetail.id, quantity);
  }

  handleNavigateToDetail(navigate, item) {
    navigate(`/anjr/${item?.slug || item?.id}`);
  }

  getStatusBadgeColor(statusKetersediaan) {
    return this.model.getStatusBadgeColor(statusKetersediaan);
  }

  isProductAvailable() {
    return this.model.isProductAvailable();
  }

  getButtonContent() {
    const isAddingToCart = this.model.getIsAddingToCart();
    const isAvailable = this.model.isProductAvailable();

    if (isAddingToCart) {
      return { text: "Menambahkan...", disabled: true };
    }

    if (!isAvailable) {
      return { text: "Stok Habis", disabled: true };
    }

    return { text: "Tambah ke Keranjang", disabled: false };
  }
}
