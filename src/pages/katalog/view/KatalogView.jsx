"use client";

import React, { useState, useEffect, Fragment } from "react";
import { KatalogPresenter } from "../presenter/KatalogPresenter";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  ArrowPathIcon,
  ChevronDownIcon,
  FunnelIcon,
  InboxIcon,
  ExclamationTriangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
  TagIcon,
  SparklesIcon,
  FireIcon,
  StarIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { ArrowsUpDownIcon, HeartIcon } from "@heroicons/react/24/outline";
import { cn } from "../../../lib/utils";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

const formatRupiah = (angka) => {
  const number = typeof angka === "string" ? parseInt(angka, 10) : angka;
  if (isNaN(number) || number === null || number === undefined) return "Rp -";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
};

function FilterChips({ filters, onRemoveFilter, onResetAll }) {
  const activeFilters = [];
  if (filters.search)
    activeFilters.push({ type: "search", label: `"${filters.search}"` });
  if (filters.kategori)
    activeFilters.push({ type: "kategori", label: filters.kategori });
  if (filters.sort && filters.sort !== "latest") {
    const sortLabels = {
      oldest: "Terlama",
      price_low: "Harga Terendah",
      price_high: "Harga Tertinggi",
      name_asc: "Nama A-Z",
      name_desc: "Nama Z-A",
    };
    activeFilters.push({ type: "sort", label: sortLabels[filters.sort] });
  }
  if (activeFilters.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <span className="text-xs font-medium text-slate-600">Filter Aktif:</span>
      {activeFilters.map((filter, idx) => (
        <span
          key={idx}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full border border-emerald-200"
        >
          <FunnelIcon className="w-3 h-3" />
          {filter.label}
          <button
            onClick={() => onRemoveFilter(filter.type)}
            className="ml-1 hover:bg-emerald-200 rounded-full p-0.5 transition-colors"
          >
            <XMarkIcon className="w-3 h-3" />
          </button>
        </span>
      ))}
      <button
        onClick={onResetAll}
        className="text-xs text-slate-500 hover:text-slate-700 font-medium underline"
      >
        Reset Semua
      </button>
    </div>
  );
}

function ProdukCard({ produk, presenter, navigate }) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [isLiked, setIsLiked] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const viewDetail = (e) => {
    if (
      e.target.closest(".add-to-cart-button") ||
      e.target.closest(".view-detail-button") ||
      e.target.closest(".like-button")
    )
      return;
    presenter.handleNavigateToDetail(navigate, produk);
  };

  const navigateToDetailFromButton = (e) => {
    e.stopPropagation();
    presenter.handleNavigateToDetail(navigate, produk);
  };

  const statusKetersediaan = produk?.status_ketersediaan?.toLowerCase();
  const isTersedia = presenter.isProductAvailable(produk);
  const statusBadgeColor = presenter.getStatusBadgeColor(
    produk?.status_ketersediaan
  );

  const namaProdukDisplay =
    produk?.nama_produk || produk?.nama || "Nama Produk Tidak Tersedia";
  const gambarUtama = produk?.gambar_utama_url || produk?.gambar_utama;
  const hargaProduk = produk?.harga;
  const kategoriNama =
    produk?.kategori?.nama_kategori || produk?.kategori?.nama;

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (isAddingToCart || !isTersedia) return;
    setIsAddingToCart(true);
    setFeedback({ type: "", message: "" });
    console.log("Mulai proses add to cart");

    const result = await presenter.handleAddToCart(produk.id, 1);
    console.log("Hasil addToCart:", result);

    if (result.success) {
      setFeedback({
        type: "success",
        message: `${namaProdukDisplay} ditambahkan!`,
      });
      setShowSuccessModal(true);
      console.log("setShowSuccessModal(true) dipanggil");
      setTimeout(() => {
        setShowSuccessModal(false);
        console.log("setShowSuccessModal(false) dipanggil (timeout)");
      }, 2000);
      setTimeout(() => setFeedback({ type: "", message: "" }), 2000);
    } else {
      setFeedback({ type: "error", message: result.error });
      setTimeout(() => setFeedback({ type: "", message: "" }), 2500);
    }

    setIsAddingToCart(false);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  // Tambahkan log render modal
  useEffect(() => {
    if (showSuccessModal) {
      console.log("Modal sukses sedang dirender!");
    }
  }, [showSuccessModal]);

  return (
    <div
      className="group bg-white rounded-3xl overflow-hidden transition-all duration-500 ease-out hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full relative shadow-lg border border-slate-100 hover:border-[#8CBCC7]"
      onClick={viewDetail}
    >
      {/* Modal sukses */}
      <Transition.Root show={showSuccessModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={setShowSuccessModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 backdrop-blur-md bg-opacity-30 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full text-center">
                <div className="flex flex-col items-center gap-2">
                  <ShoppingCartIcon className="w-10 h-10 text-[#598c96] mb-2" />
                  <h3 className="text-lg font-bold text-[#598c96] mb-1">
                    Berhasil Ditambahkan!
                  </h3>
                  <p className="text-sm text-slate-600">
                    {namaProdukDisplay} telah masuk ke keranjang.
                  </p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      {feedback.message && (
        <div
          className={cn(
            "absolute inset-x-0 top-0 z-30 p-3 text-center text-xs font-bold transition-all duration-300",
            feedback.type === "success"
              ? "bg-gradient-to-r from-[#598c96] to-[#8CBCC7] text-white"
              : "bg-gradient-to-r from-rose-500 to-rose-600 text-white"
          )}
        >
          {feedback.message}
        </div>
      )}

      <div className="relative overflow-hidden aspect-[4/3] cursor-pointer">
        <img
          src={
            gambarUtama
              ? gambarUtama
              : "https://placehold.co/450x338/e2e8f0/94a3b8?text=Gambar+Hewan"
          }
          alt={namaProdukDisplay}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/450x338/fecaca/991b1b?text=Error";
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="absolute top-4 left-4 z-10 flex flex-col space-y-2">
          {kategoriNama && (
            <span className="bg-[#598c96]/95 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg tracking-wide flex items-center">
              <TagIcon className="w-3 h-3 mr-1" /> {kategoriNama}
            </span>
          )}
          {statusKetersediaan && (
            <span
              className={cn(
                "text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg tracking-wide backdrop-blur-sm",
                statusBadgeColor
              )}
            >
              {statusKetersediaan.charAt(0).toUpperCase() +
                statusKetersediaan.slice(1)}
            </span>
          )}
        </div>

        <button
          onClick={handleLike}
          className="like-button absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 group/like"
        >
          <HeartIcon
            className={cn(
              "w-5 h-5 transition-all duration-200",
              isLiked
                ? "text-rose-500 fill-rose-500 scale-110"
                : "text-slate-600 group-hover/like:text-rose-500"
            )}
          />
        </button>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={handleAddToCart}
            disabled={!isTersedia || isAddingToCart}
            className="add-to-cart-button bg-[#598c96] hover:bg-[#8CBCC7] text-white font-bold py-3 px-6 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2 transform scale-90 group-hover:scale-100"
          >
            {isAddingToCart ? (
              <ArrowPathIcon className="w-5 h-5 animate-spin" />
            ) : (
              <ShoppingCartIcon className="w-5 h-5" />
            )}
            {isAddingToCart ? "Menambahkan..." : "Tambah ke Keranjang"}
          </button>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-slate-800 mb-3 line-clamp-2 leading-tight group-hover:text-[#598c96] transition-colors cursor-pointer">
          {namaProdukDisplay}
        </h3>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className="w-4 h-4 text-yellow-400 fill-current"
              />
            ))}
          </div>
          <span className="text-xs text-slate-500">(4.8)</span>
        </div>

        <p className="text-xl font-bold text-[#598c96] mb-6">
          {formatRupiah(hargaProduk)}
        </p>

        <div className="mt-auto grid grid-cols-2 gap-3">
          <button
            onClick={navigateToDetailFromButton}
            className="view-detail-button w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-4 rounded-2xl shadow-sm transition-all duration-200 flex items-center justify-center text-sm focus:outline-none focus:ring-2 focus:ring-[#598c96] focus:ring-offset-1"
            aria-label={`Lihat detail ${namaProdukDisplay}`}
          >
            <EyeIcon className="w-4 h-4 mr-2" /> Detail
          </button>
          <button
            onClick={handleAddToCart}
            disabled={!isTersedia || isAddingToCart}
            title={isTersedia ? "Beli Sekarang" : "Stok Habis"}
            className="add-to-cart-button w-full bg-gradient-to-r from-[#598c96] to-[#8CBCC7] hover:from-[#8CBCC7] hover:to-[#598c96] text-white font-semibold py-3 px-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 ease-in-out flex items-center justify-center text-sm focus:outline-none focus:ring-2 focus:ring-[#598c96] focus:ring-offset-2 disabled:bg-slate-400/70 disabled:text-slate-100 disabled:cursor-not-allowed disabled:hover:shadow-md disabled:hover:bg-slate-400/70 group/button"
          >
            {isAddingToCart ? (
              <ArrowPathIcon className="w-4 h-4 animate-spin" />
            ) : (
              <ShoppingCartIcon className="w-4 h-4 mr-2 transition-transform duration-200 group-hover/button:scale-110" />
            )}
            <span className="transition-all duration-200">
              {isAddingToCart ? "..." : isTersedia ? "Beli" : "Habis"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

function Pagination({ meta, onPageChange }) {
  if (!meta || !meta.links || meta.last_page <= 1) return null;

  const handlePageClick = (pageUrl) => {
    if (!pageUrl) return;
    try {
      const url = new URL(pageUrl);
      const page = url.searchParams.get("page");
      if (page) onPageChange(page);
    } catch (e) {
      const match = pageUrl.match(/[?&]page=(\d+)/);
      if (match && match[1]) onPageChange(match[1]);
      else console.error("Invalid URL for pagination:", pageUrl, e);
    }
  };

  return (
    <nav className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-200/70 bg-white/95 backdrop-blur-sm px-6 py-6 mt-10 rounded-3xl shadow-xl">
      <div className="text-sm text-slate-600 mb-4 sm:mb-0">
        Menampilkan{" "}
        <span className="font-bold text-slate-800">{meta.from || 0}</span> -{" "}
        <span className="font-bold text-slate-800">{meta.to || 0}</span> dari{" "}
        <span className="font-bold text-slate-800">{meta.total || 0}</span>{" "}
        hasil
      </div>
      <div className="isolate inline-flex -space-x-px rounded-2xl shadow-lg">
        {meta.links.map((link, index) => {
          let labelContent = link.label.replace(/&laquo;|&raquo;/g, "").trim();
          const isPrev =
            link.label.includes("Previous") || link.label.includes("&laquo;");
          const isNext =
            link.label.includes("Next") || link.label.includes("&raquo;");

          if (isPrev)
            labelContent = (
              <>
                <ChevronLeftIcon
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  aria-hidden="true"
                />
                <span className="sr-only">Sebelumnya</span>
              </>
            );
          if (isNext)
            labelContent = (
              <>
                <ChevronRightIcon
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  aria-hidden="true"
                />
                <span className="sr-only">Berikutnya</span>
              </>
            );

          if (link.label === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="relative inline-flex items-center justify-center px-4 py-3 text-sm font-semibold text-slate-600 ring-1 ring-inset ring-slate-300/70 cursor-default"
              >
                {labelContent}
              </span>
            );
          }

          return (
            <button
              key={index}
              onClick={() => handlePageClick(link.url)}
              disabled={!link.url || link.active}
              aria-current={link.active ? "page" : undefined}
              className={cn(
                "relative inline-flex items-center justify-center px-4 py-3 text-sm font-medium ring-1 ring-inset ring-slate-300/70 focus:z-20 focus:outline-none focus:ring-2 focus:ring-[#598c96] focus:ring-offset-0 transition-all duration-200 ease-in-out",
                link.active
                  ? "z-10 bg-gradient-to-r from-[#598c96] to-[#8CBCC7] text-white cursor-default ring-[#8CBCC7]/30"
                  : !link.url
                  ? "text-slate-400 cursor-not-allowed bg-slate-50/50"
                  : "text-slate-700 bg-white hover:bg-[#8CBCC7] hover:text-[#598c96]",
                index === 0 && "rounded-l-2xl",
                index === meta.links.length - 1 && "rounded-r-2xl",
                (isPrev || isNext) && "px-3 sm:px-4"
              )}
            >
              {labelContent}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

const SkeletonCard = () => (
  <div className="bg-white rounded-3xl border border-slate-200/70 overflow-hidden animate-pulse shadow-lg">
    <div className="aspect-[4/3] bg-gradient-to-br from-slate-200 to-slate-300"></div>
    <div className="p-6">
      <div className="h-5 w-4/5 bg-slate-200 rounded-lg mb-3"></div>
      <div className="flex items-center gap-2 mb-4">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-4 h-4 bg-slate-200 rounded"></div>
          ))}
        </div>
        <div className="w-8 h-3 bg-slate-200 rounded"></div>
      </div>
      <div className="h-6 w-2/5 bg-slate-200 rounded-lg mb-6"></div>
      <div className="grid grid-cols-2 gap-3 mt-3">
        <div className="h-12 w-full bg-slate-200 rounded-2xl"></div>
        <div className="h-12 w-full bg-slate-200 rounded-2xl"></div>
      </div>
    </div>
  </div>
);

function KatalogPage() {
  const [presenter] = useState(() => new KatalogPresenter());
  const [produkList, setProdukList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    kategori: "",
    sort: "latest",
    minPrice: "",
    maxPrice: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const initializeData = async () => {
      await presenter.initialize();
      setProdukList(presenter.getProdukList());
      setLoading(presenter.getLoading());
      setError(presenter.getError());
      setMeta(presenter.getMeta());
    };
    initializeData();
  }, [presenter]);

  const handleFilterOrSortChange = async (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
    await presenter.handleFilterOrSortChange(type, value);
    setProdukList(presenter.getProdukList());
    setMeta(presenter.getMeta());
    setLoading(presenter.getLoading());
    setError(presenter.getError());
  };

  const handlePageChange = async (page) => {
    await presenter.handlePageChange(page);
    setProdukList(presenter.getProdukList());
    setMeta(presenter.getMeta());
    setLoading(presenter.getLoading());
    setError(presenter.getError());
  };

  const resetAllFilters = async () => {
    setFilters({
      search: "",
      kategori: "",
      sort: "latest",
      minPrice: "",
      maxPrice: "",
    });
    await presenter.resetAllFilters();
    setProdukList(presenter.getProdukList());
    setMeta(presenter.getMeta());
    setLoading(presenter.getLoading());
    setError(presenter.getError());
  };

  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      <header style={{ padding: "2.5rem 0 1.5rem 0", textAlign: "center" }}>
        <h1
          style={{
            fontWeight: 800,
            fontSize: "2.2rem",
            color: "var(--atk-dark)",
            marginBottom: "0.5rem",
          }}
        >
          Katalog Hewan Peliharaan
        </h1>
        <p
          style={{
            color: "var(--atk-secondary)",
            fontSize: "1.1rem",
            maxWidth: 480,
            margin: "0 auto",
          }}
        >
          Temukan hewan peliharaan berkualitas untuk menemani hari-hari Anda.
        </p>
      </header>

      <div className="container mx-auto px-4 sm:px-5 lg:px-6 py-4 md:py-6">
        <div className="mb-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <input
            type="text"
            placeholder="Cari hewan, ras, atau kategori..."
            value={filters.search}
            onChange={(e) => handleFilterOrSortChange("search", e.target.value)}
            style={{
              border: "1px solid #eee",
              borderRadius: 12,
              padding: "0.75rem 1rem",
              fontSize: 15,
              width: "100%",
              maxWidth: 340,
              background: "#fafafa",
              color: "var(--atk-dark)",
            }}
          />
          <div className="flex gap-2 items-center">
            <select
              value={filters.sort}
              onChange={(e) => handleFilterOrSortChange("sort", e.target.value)}
              style={{
                border: "1px solid #eee",
                borderRadius: 10,
                padding: "0.5rem 1rem",
                fontSize: 15,
                background: "#fafafa",
                color: "var(--atk-dark)",
              }}
            >
              <option value="latest">Terbaru</option>
              <option value="oldest">Terlama</option>
              <option value="price_low">Harga Terendah</option>
              <option value="price_high">Harga Tertinggi</option>
              <option value="name_asc">Nama A-Z</option>
              <option value="name_desc">Nama Z-A</option>
            </select>
            <button
              onClick={resetAllFilters}
              style={{
                border: "1px solid var(--atk-primary)",
                background: "none",
                color: "var(--atk-primary)",
                borderRadius: 10,
                padding: "0.5rem 1.2rem",
                fontWeight: 500,
                fontSize: 15,
                cursor: "pointer",
              }}
            >
              Reset
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {loading
            ? Array.from({ length: meta?.per_page || 12 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : produkList.length > 0
            ? produkList.map((produk) => (
                <ProdukCard
                  key={produk.id}
                  produk={produk}
                  presenter={presenter}
                  navigate={navigate}
                />
              ))
            : !error && (
                <div
                  className="col-span-full text-center py-16"
                  style={{ color: "var(--atk-secondary)" }}
                >
                  <div
                    style={{ fontWeight: 700, fontSize: 20, marginBottom: 8 }}
                  >
                    Hewan Tidak Ditemukan
                  </div>
                  <div style={{ fontSize: 15, marginBottom: 18 }}>
                    Coba kata kunci lain atau reset filter.
                  </div>
                  <button
                    onClick={resetAllFilters}
                    style={{
                      border: "1px solid var(--atk-primary)",
                      background: "none",
                      color: "var(--atk-primary)",
                      borderRadius: 10,
                      padding: "0.5rem 1.2rem",
                      fontWeight: 500,
                      fontSize: 15,
                      cursor: "pointer",
                    }}
                  >
                    Reset Filter
                  </button>
                </div>
              )}
        </div>

        {!loading && meta && meta.last_page > 1 && (
          <nav className="flex justify-center mt-10">
            <div style={{ display: "flex", gap: 4 }}>
              {meta.links.map((link, idx) => {
                if (link.label === "...") {
                  return (
                    <span
                      key={idx}
                      style={{
                        padding: "0.5rem 0.9rem",
                        color: "#bbb",
                        fontSize: 15,
                      }}
                    >
                      ...
                    </span>
                  );
                }
                return (
                  <button
                    key={idx}
                    onClick={() =>
                      link.url &&
                      handlePageChange(
                        new URL(link.url).searchParams.get("page")
                      )
                    }
                    disabled={!link.url || link.active}
                    style={{
                      padding: "0.5rem 0.9rem",
                      border: "1px solid #eee",
                      background: link.active ? "var(--atk-primary)" : "#fff",
                      color: link.active ? "#fff" : "var(--atk-dark)",
                      borderRadius: 8,
                      fontWeight: link.active ? 700 : 500,
                      fontSize: 15,
                      cursor: link.url ? "pointer" : "not-allowed",
                      opacity: link.url ? 1 : 0.5,
                    }}
                  >
                    {link.label.replace(/&laquo;|&raquo;/g, "").trim()}
                  </button>
                );
              })}
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}

export default KatalogPage;
