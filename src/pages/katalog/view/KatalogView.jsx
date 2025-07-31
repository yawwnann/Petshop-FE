// src/app/katalog/KatalogPage.jsx
"use client";

import React, {
  useState,
  useEffect,
  Fragment,
  useRef,
  useCallback,
} from "react";
import { KatalogPresenter } from "../presenter/KatalogPresenter";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  ArrowPathIcon,
  ChevronDownIcon,
  FunnelIcon,
  ExclamationTriangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
  TagIcon,
  StarIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { ArrowsUpDownIcon, HeartIcon } from "@heroicons/react/24/outline";
import { cn } from "../../../lib/utils";
import { useCart } from "../../../context/CartContext";
import { Transition, Menu } from "@headlessui/react";
// import { useNavigate } from "react-router-dom"; // Uncomment if using React Router for navigation

// --- Helper Function: formatRupiah ---
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

// --- Component: FilterChips ---
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
    // Hanya tambahkan chip jika label sort spesifik tersedia
    if (sortLabels[filters.sort]) {
      activeFilters.push({ type: "sort", label: sortLabels[filters.sort] });
    }
  }
  // Anda bisa menambahkan filter harga di sini jika diimplementasikan
  // if (filters.minPrice || filters.maxPrice) {
  //   activeFilters.push({ type: "price", label: `Harga: ${filters.minPrice || 'Min'} - ${filters.maxPrice || 'Max'}` });
  // }

  if (activeFilters.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <span className="text-xs font-medium text-slate-600">Filter Aktif:</span>
      {activeFilters.map((filter, idx) => (
        <span
          key={idx}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#e6f0f2] text-[#598c96] text-xs font-medium rounded-full border border-[#c5dde2] shadow-sm"
        >
          <FunnelIcon className="w-3 h-3" />
          {filter.label}
          <button
            onClick={() => onRemoveFilter(filter.type)}
            className="ml-1 hover:bg-[#c5dde2] rounded-full p-0.5 transition-all duration-200"
            aria-label={`Hapus filter ${filter.label}`}
          >
            <XMarkIcon className="w-3 h-3" />
          </button>
        </span>
      ))}
      <button
        onClick={onResetAll}
        className="text-xs text-[#598c96] hover:text-[#3a5c63] font-medium underline transition-all duration-200"
      >
        Reset Semua
      </button>
    </div>
  );
}

// --- Component: ProdukCard ---
function ProdukCard({ produk, presenter }) {
  const { addToCart } = useCart();
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [isLiked, setIsLiked] = useState(false);

  const isTersedia = presenter.isProductAvailable(produk);

  const namaProdukDisplay =
    produk?.nama_produk || produk?.nama || "Nama Produk Tidak Tersedia";
  const gambarUtama = produk?.gambar_utama_url || produk?.gambar_utama;
  const hargaProduk = produk?.harga;

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (feedback.type === 'loading' || !isTersedia) return;

    setFeedback({ type: 'loading', message: 'Menambahkan...' });
    const result = await addToCart(produk, 'produk');

    if (result.success) {
      alert('Produk berhasil ditambahkan!');
      setFeedback({ type: null, message: '' }); // Reset loading state
    } else {
      alert('Gagal menambahkan produk.');
      setFeedback({ type: 'error', message: 'Gagal menambahkan produk.' });
      // Optionally keep error state for a bit before resetting
      setTimeout(() => setFeedback({ type: null, message: '' }), 2000);
    }
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden transition-all duration-500 ease-out hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full relative shadow-lg border border-slate-100 hover:border-[#8CBCC7]">
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
          <button
            onClick={handleAddToCart}
            disabled={!isTersedia || feedback.type === 'loading'}
            title={isTersedia ? "Beli Sekarang" : "Stok Habis"}
            className="add-to-cart-button w-full bg-gradient-to-r from-[#598c96] to-[#8CBCC7] hover:from-[#8CBCC7] hover:to-[#598c96] text-white font-semibold py-3 px-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 ease-in-out flex items-center justify-center text-sm focus:outline-none focus:ring-2 focus:ring-[#598c96] focus:ring-offset-2 disabled:bg-slate-400/70 disabled:text-slate-100 disabled:cursor-not-allowed disabled:hover:shadow-md disabled:hover:bg-slate-400/70 group/button"
          >
            {feedback.type === 'loading' ? (
              <>
                <ArrowPathIcon className="w-4 h-4 animate-spin" />
                <span className="transition-all duration-200">...</span>
              </>
            ) : (
              <>
                <ShoppingCartIcon className="w-4 h-4 mr-2 transition-transform duration-200 group-hover/button:scale-110" />
                <span className="transition-all duration-200">
                  {isTersedia ? "Beli" : "Habis"}
                </span>
              </>
            )}
          </button>
        </div>
      </div>


    </div>
  );
}

// --- Component: Pagination ---
function Pagination({ meta, onPageChange }) {
  if (!meta || !meta.links || meta.last_page <= 1) return null;

  const handlePageClick = (pageUrl) => {
    if (!pageUrl) return;
    try {
      const url = new URL(pageUrl);
      const page = url.searchParams.get("page");
      if (page) onPageChange(page);
    } catch (e) {
      // Fallback for relative URLs or non-standard formats
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

// --- Component: SkeletonCard ---
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

// --- Component: FilterDropdown (for Sorting) ---
function FilterDropdown({ filters, onFilterChange }) {
  const getButtonLabel = () => {
    if (filters.sort === 'created_at' && filters.order === 'asc') {
      return 'Terlama';
    }
    return 'Terbaru'; // Default
  };

  const sortOptions = [
    {
      label: "Terbaru",
      sort: "created_at",
      order: "desc",
      icon: <ArrowPathIcon className="w-4 h-4 text-slate-500" />,
    },
    {
      label: "Terlama",
      sort: "created_at",
      order: "asc",
      icon: <ArrowsUpDownIcon className="w-4 h-4 text-slate-500" />,
    },
  ];

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#598c96] focus:ring-offset-0 transition-all duration-200">
          <span className="hidden sm:inline">Urutkan:</span>
          <span className="font-semibold">{getButtonLabel()}</span>
          <ChevronDownIcon
            className="-mr-1 ml-1 h-4 w-4 text-slate-400"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-2xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-2">
            {sortOptions.map((option) => (
              <Menu.Item key={option.value}>
                {({ active }) => (
                  <button
                    onClick={() => onFilterChange("sort", option.sort, option.order)}
                    className={`${active ? "bg-slate-50" : ""}
                      group flex w-full items-center rounded-lg px-4 py-2.5 text-sm ${
                      filters.sort === option.sort && filters.order === option.order
                        ? "font-bold text-[#598c96]"
                        : "text-slate-700"
                    }`}
                  >
                    <div className="mr-3">{option.icon}</div>
                    {option.label}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

// --- Component: SearchBar (Sudah dirombak di jawaban sebelumnya) ---
function SearchBar({
  initialSearchTerm,
  onSearchSubmit,
  onClearSearch,
  isSearching,
}) {
  const [localSearch, setLocalSearch] = useState(initialSearchTerm);
  const searchTimeout = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    setLocalSearch(initialSearchTerm);
  }, [initialSearchTerm]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocalSearch(value);

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(() => {
      onSearchSubmit(value.trim());
    }, 500);
  };

  const handleSubmit = () => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    onSearchSubmit(localSearch.trim());
  };

  const handleClear = () => {
    setLocalSearch("");
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    onClearSearch();
    searchInputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <MagnifyingGlassIcon
          className={`h-5 w-5 ${
            isSearching ? "text-[#598c96] animate-pulse" : "text-slate-400"
          }`}
        />
      </div>

      <input
        type="text"
        placeholder="Cari nama hewan, ras, atau kategori..."
        value={localSearch}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        ref={searchInputRef}
        className="block w-full pl-10 pr-24 py-3 border border-slate-200 rounded-xl
                   text-sm placeholder-slate-400 bg-white shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-[#598c96] focus:border-transparent
                   transition-all duration-200 disabled:bg-slate-50 disabled:text-slate-500"
        disabled={isSearching}
      />

      {localSearch && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-16 px-2 flex items-center
                      text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Hapus pencarian"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      )}

      <button
        onClick={handleSubmit}
        disabled={!localSearch.trim() || isSearching}
        className={`absolute inset-y-0 right-0 px-4 flex items-center rounded-r-xl
                     ${
                       !localSearch.trim() || isSearching
                         ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                         : "bg-[#598c96] text-white hover:bg-[#3a5c63]"
                     } transition-colors`}
        aria-label="Cari"
      >
        {isSearching ? (
          <ArrowPathIcon className="h-4 w-4 animate-spin" />
        ) : (
          <MagnifyingGlassIcon className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
function KatalogView() {
  const presenterRef = useRef(new KatalogPresenter());

  const [produkList, setProdukList] = useState([]);
  const [loading, setLoading] = useState(true); // Loading umum untuk seluruh halaman
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState(null);
  const [kategoriList, setKategoriList] = useState([]);

  // State untuk filters, ini adalah state "source of truth" untuk filter yang diterapkan
  const [filters, setFilters] = useState({
    search: "",
    kategori: "",
    sort: "latest",
    minPrice: "",
    maxPrice: "",
  });

  // State khusus untuk indikator loading search bar (debounce)
  const [isSearching, setIsSearching] = useState(false);

  // Fungsi untuk memperbarui semua state terkait data dari presenter
  const updateStateFromPresenter = useCallback(() => {
    try {
      setProdukList(presenterRef.current.getProdukList() || []);
      setMeta(presenterRef.current.getMeta());
      // Sangat penting: Sinkronkan state `filters` di komponen dengan yang di presenter
      setFilters(presenterRef.current.getFilters());

      // Atur pesan error "Tidak ada produk" jika tidak ada produk setelah loading selesai
      if (
        !presenterRef.current.getLoading() &&
        (!presenterRef.current.getProdukList() ||
          presenterRef.current.getProdukList().length === 0) &&
        !presenterRef.current.getError() // Jangan menimpa error dari jaringan/server
      ) {
        setError("Tidak ada produk yang sesuai dengan kriteria pencarian.");
      } else {
        // Ambil error dari presenter (misal: error jaringan)
        setError(presenterRef.current.getError());
      }
    } catch (err) {
      console.error("Error updating state from presenter:", err);
      setError("Terjadi kesalahan saat memperbarui tampilan data.");
      setProdukList([]);
    }
  }, []);

  // Fungsi penanganan error terpusat
  const handleError = useCallback((err) => {
    console.error("Operation failed:", err);
    let errorMessage = "Terjadi kesalahan. Silakan coba lagi.";

    if (err.response) {
      const status = err.response.status;
      switch (status) {
        case 500:
          errorMessage = "Terjadi kesalahan server. Silakan coba lagi nanti.";
          break;
        case 404:
          errorMessage = "Data tidak ditemukan.";
          break;
        case 401:
          errorMessage = "Sesi Anda telah berakhir. Silakan login kembali.";
          break;
        default:
          errorMessage =
            err.response.data?.message ||
            "Terjadi kesalahan. Silakan coba lagi.";
      }
    } else if (err.request) {
      errorMessage =
        "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.";
    } else if (err.message) {
      errorMessage = err.message;
    }

    setError(errorMessage);
    setProdukList([]); // Kosongkan daftar produk jika terjadi error
  }, []);

  // Effect untuk inisialisasi data saat komponen pertama kali di-mount
  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await presenterRef.current.initialize();
        if (result.error) {
          throw new Error(result.error);
        }
        const categories = presenterRef.current.getKategoriList();
        setKategoriList(categories || []);
        updateStateFromPresenter(); // Perbarui state UI dari data awal presenter
      } catch (err) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, [updateStateFromPresenter, handleError]);

  // Fungsi sentral untuk memicu perubahan filter/sort (kecuali search)
  const handleFilterOrSortChange = useCallback(
    async (type, value) => {
      setLoading(true); // Aktifkan loading umum
      setError(null); // Bersihkan error sebelumnya

      // Perbarui state `filters` di komponen secara optimis (UI responsif)
      setFilters((prevFilters) => ({
        ...prevFilters,
        [type]: value,
      }));

      try {
        const result = await presenterRef.current.handleFilterOrSortChange(
          type,
          value
        );

        if (result.error) {
          throw new Error(result.error);
        }
        updateStateFromPresenter(); // Perbarui state UI dari presenter setelah fetch
      } catch (err) {
        handleError(err);
      } finally {
        setLoading(false); // Nonaktifkan loading umum
      }
    },
    [updateStateFromPresenter, handleError]
  );

  // Fungsi khusus untuk menangani submit pencarian (dipanggil dari SearchBar)
  const handleSearchSubmit = useCallback(
    async (searchTerm) => {
      setIsSearching(true); // Aktifkan indikator loading khusus search bar
      setLoading(true); // Aktifkan loading umum juga
      setError(null); // Bersihkan error sebelumnya

      // Perbarui state `filters` di komponen secara optimis (UI responsif)
      setFilters((prevFilters) => ({
        ...prevFilters,
        search: searchTerm,
      }));

      try {
        const result = await presenterRef.current.handleFilterOrSortChange(
          "search", // Selalu "search" untuk pencarian
          searchTerm
        );

        if (result.error) {
          throw new Error(result.error);
        }
        updateStateFromPresenter(); // Perbarui state UI dari presenter setelah fetch
      } catch (err) {
        handleError(err);
      } finally {
        setIsSearching(false); // Nonaktifkan indikator loading search bar
        setLoading(false); // Nonaktifkan loading umum
      }
    },
    [updateStateFromPresenter, handleError]
  );

  // Fungsi khusus untuk membersihkan pencarian (dipanggil dari SearchBar)
  const handleClearSearch = useCallback(() => {
    handleSearchSubmit(""); // Memicu pencarian dengan string kosong
  }, [handleSearchSubmit]);

  // Fungsi untuk menangani perubahan halaman
  const handlePageChange = useCallback(
    async (page) => {
      setLoading(true);
      setError(null);
      try {
        const result = await presenterRef.current.handlePageChange(page);
        if (result.error) {
          throw new Error(result.error);
        }
        updateStateFromPresenter();
      } catch (err) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    },
    [updateStateFromPresenter, handleError]
  );

  // Fungsi untuk menghapus filter individu dari chip
  const handleRemoveFilter = useCallback(
    async (type) => {
      let newValue = "";
      if (type === "search") {
        handleClearSearch(); // Panggil fungsi khusus untuk membersihkan search
        return;
      } else if (type === "kategori") {
        newValue = ""; // Nilai default untuk kategori
      } else if (type === "sort") {
        newValue = "latest"; // Nilai default untuk sort
      }
      // Untuk filter non-search, gunakan handleFilterOrSortChange umum
      handleFilterOrSortChange(type, newValue);
    },
    [handleFilterOrSortChange, handleClearSearch]
  );

  // Fungsi untuk mereset semua filter
  const handleResetAllFilters = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await presenterRef.current.resetAllFilters(); // Memanggil metode reset di presenter
      if (result.error) {
        throw new Error(result.error);
      }
      updateStateFromPresenter(); // Perbarui state UI dari presenter setelah reset
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, [updateStateFromPresenter, handleError]);

  return (
    <div style={{ minHeight: "100vh", background: "#fff", marginTop: "2rem" }}>
      <header style={{ padding: "2.5rem 0 1.5rem 0", textAlign: "center" }}>
        <h1
          style={{
            fontWeight: 800,
            margin: "0 auto",
          }}
        >
          Temukan hewan peliharaan berkualitas untuk menemani hari-hari Anda.
        </h1>
      </header>

      <div className="container mx-auto px-4 sm:px-5 lg:px-6 py-4 md:py-6">
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between bg-white p-4 rounded-2xl shadow-md border border-slate-100">
          {/* Menggunakan SearchBar yang sudah dirombak */}
          <SearchBar
            initialSearchTerm={filters.search} // Memberikan nilai awal dari state filters
            isSearching={isSearching} // Memberikan state loading khusus search
            onSearchSubmit={handleSearchSubmit} // Callback saat pencarian di-submit
            onClearSearch={handleClearSearch} // Callback saat pencarian dibersihkan
          />
          <div className="flex gap-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <TagIcon className="h-4 w-4 text-slate-400" />
              </div>
              <select
                value={filters.kategori}
                onChange={(e) =>
                  handleFilterOrSortChange("kategori", e.target.value)
                }
                className="block pl-9 pr-8 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-700 bg-white appearance-none min-w-[160px] focus:outline-none focus:ring-2 focus:ring-[#598c96] focus:border-transparent shadow-sm transition-all duration-200"
              >
                <option value="">Semua Kategori</option>
                {kategoriList.map((kategori) => (
                  <option key={kategori.id} value={kategori.slug}>
                    {kategori.nama_kategori}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                <ChevronDownIcon className="h-4 w-4 text-slate-400" />
              </div>
            </div>

            <FilterDropdown
              filters={filters}
              onFilterChange={handleFilterOrSortChange} // Pass the handler directly
            />
          </div>
        </div>

        {/* Filter Chips Display */}
        <FilterChips
          filters={filters}
          onRemoveFilter={handleRemoveFilter}
          onResetAll={handleResetAllFilters}
        />

        {error && (
          <div className="mb-8 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700">
            <p className="flex items-center gap-2">
              <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
              {error}
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {/* Menampilkan SkeletonCard jika sedang loading atau isSearching aktif */}
          {loading || isSearching ? (
            Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          ) : produkList && produkList.length > 0 ? (
            produkList.map((produk) => (
              <ProdukCard
                key={produk.id}
                produk={produk}
                presenter={presenterRef.current}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-16 text-slate-600">
              <div className="font-bold text-xl mb-2">
                {error || "Tidak ada produk yang ditemukan"}
              </div>
              <p className="text-slate-500">
                Silakan coba dengan filter atau kata kunci lain
              </p>
            </div>
          )}
        </div>

        {!loading && meta && meta.last_page > 1 && (
          <Pagination meta={meta} onPageChange={handlePageChange} />
        )}
      </div>
    </div>
  );
}

export default KatalogView;
