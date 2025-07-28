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
import { Dialog, Transition, Menu } from "@headlessui/react";
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
  // Removed unused feedback state to resolve compile error.
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

  const isTersedia = presenter.isProductAvailable(produk);

  const namaProdukDisplay =
    produk?.nama_produk || produk?.nama || "Nama Produk Tidak Tersedia";
  const gambarUtama = produk?.gambar_utama_url || produk?.gambar_utama;
  const hargaProduk = produk?.harga;

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (isAddingToCart || !isTersedia) return;
    setIsAddingToCart(true);
    // Removed feedback usage to resolve compile error.

    const result = await presenter.handleAddToCart(produk.id, 1);

    if (result.success) {
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 2000);
    } else {
      // Optionally handle error feedback with another method if needed.
    }

    setIsAddingToCart(false);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    if (showSuccessModal) {
      // Modal sukses sedang dirender
    }
  }, [showSuccessModal]);

  // STATUS KETERSEDIAAN DI ATAS GAMBAR
  return (
    <div
      className="group bg-white rounded-3xl overflow-hidden transition-all duration-500 ease-out hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full relative shadow-lg border border-slate-100 hover:border-[#8CBCC7]"
      onClick={viewDetail}
    >
      {/* Gambar Produk */}
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

        <div className="mt-auto ">
          {/* <button
            onClick={navigateToDetailFromButton}
            className="view-detail-button w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-4 rounded-2xl shadow-sm transition-all duration-200 flex items-center justify-center text-sm focus:outline-none focus:ring-2 focus:ring-[#598c96] focus:ring-offset-1"
            aria-label={`Lihat detail ${namaProdukDisplay}`}
          >
            <EyeIcon className="w-4 h-4 mr-2" /> Detail
          </button> */}
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
    <nav className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-200/70 bg-white/95 backdrop-blur-sm px-6 py-6 mt-14 rounded-3xl shadow-xl">
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

// Update the FilterDropdown component
const FilterDropdown = ({ filters, onFilterChange }) => {
  // Helper function to get button label based on current filter
  const getButtonLabel = () => {
    if (filters?.sort === "latest") return "Terbaru";
    if (filters?.sort === "oldest") return "Terlama";
    return "Urutan";
  };

  const handleReset = () => {
    onFilterChange("sort", "latest");
  };

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors duration-200 min-w-[140px]">
        <FunnelIcon className="w-5 h-5 text-slate-600" />
        <span className="text-sm font-medium text-slate-700">
          {getButtonLabel()}
        </span>
        <ChevronDownIcon className="w-4 h-4 text-slate-600 ml-auto" />
      </Menu.Button>

      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-slate-100 z-50 divide-y divide-slate-100">
          {/* Sort Options */}
          <div className="p-2">
            <div className="px-2 py-1.5">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Urutan
              </p>
            </div>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${active ? "bg-slate-50" : ""} ${
                    filters?.sort === "latest"
                      ? "text-[#598c96] font-medium"
                      : "text-slate-700"
                  } group flex w-full items-center rounded-md px-3 py-2 text-sm gap-2 transition-colors`}
                  onClick={() => onFilterChange("sort", "latest")}
                >
                  <ArrowPathIcon className="w-4 h-4" />
                  Terbaru
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${active ? "bg-slate-50" : ""} ${
                    filters?.sort === "oldest"
                      ? "text-[#598c96] font-medium"
                      : "text-slate-700"
                  } group flex w-full items-center rounded-md px-3 py-2 text-sm gap-2 transition-colors`}
                  onClick={() => onFilterChange("sort", "oldest")}
                >
                  <ArrowsUpDownIcon className="w-4 h-4" />
                  Terlama
                </button>
              )}
            </Menu.Item>
          </div>

          {/* Reset Option */}
          <div className="p-2">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-red-50" : ""
                  } text-red-600 group flex w-full items-center rounded-md px-3 py-2 text-sm gap-2 transition-colors`}
                  onClick={handleReset}
                >
                  <XMarkIcon className="w-4 h-4" />
                  Reset Urutan
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
function KatalogPage() {
  const [presenter] = useState(() => new KatalogPresenter());
  const [produkList, setProdukList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState(null);
  const [kategoriList, setKategoriList] = useState([]); // Tambahan
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

      // Ambil kategori dari presenter
      const kategoriData = await presenter.getCategories();
      setKategoriList(kategoriData);
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

  return (
    <div style={{ minHeight: "100vh", background: "#fff", marginTop: "2rem" }}>
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
        {/* Filter Search + Kategori + Sort */}
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
          <div className="flex gap-3">
            {/* Dropdown kategori */}
            <select
              value={filters.kategori}
              onChange={(e) =>
                handleFilterOrSortChange("kategori", e.target.value)
              }
              className="border border-slate-200 rounded-xl px-4 py-2.5 bg-white text-sm text-slate-700 min-w-[140px]"
            >
              <option value="">Semua Kategori</option>
              {kategoriList.map((kategori) => (
                <option key={kategori.id} value={kategori.slug}>
                  {kategori.nama_kategori}
                </option>
              ))}
            </select>

            {/* Dropdown sorting */}
            <FilterDropdown
              filters={filters}
              onFilterChange={handleFilterOrSortChange}
            />
          </div>
        </div>

        {/* Produk List */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
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
                    Tidak Ditemukan
                  </div>
                  <div style={{ fontSize: 15, marginBottom: 18 }}>
                    Coba kata kunci lain.
                  </div>
                </div>
              )}
        </div>

        {/* Pagination */}
        {!loading && meta && meta.last_page > 1 && (
          <Pagination meta={meta} onPageChange={handlePageChange} />
        )}
      </div>
    </div>
  );
}

export default KatalogPage;
