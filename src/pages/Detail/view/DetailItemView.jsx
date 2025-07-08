import React, { useState, useEffect, Fragment } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; // Import Link
import apiClient from "../../../api/apiClient";
import {
  ShoppingCartIcon,
  CheckCircleIcon,
  XCircleIcon,
  ChevronLeftIcon,
  MinusIcon,
  PlusIcon,
  ClockIcon,
  InformationCircleIcon,
  TagIcon, // Digunakan di AtkCard
} from "@heroicons/react/24/solid";
import { Dialog, Transition } from "@headlessui/react";

// --- Helper Function: Format Rupiah ---
const formatRupiah = (angka) => {
  if (angka === null || angka === undefined) return "Rp -";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(angka);
};

// --- Komponen: Item Card (Untuk Produk Terkait) ---
function ItemCard({ item }) {
  const navigate = useNavigate();
  const viewDetail = (slug) => navigate(`/anjr/${slug}`);
  const statusBadgeColor =
    item.status_ketersediaan?.toLowerCase() === "tersedia"
      ? "bg-emerald-100 text-emerald-800"
      : "bg-rose-100 text-rose-800";

  const handleSimpleAddToCart = (e) => {
    e.stopPropagation();
    alert(`Tambah ${item.nama_item} (dari related) (belum implementasi)`);
  };

  return (
    <div className="item-card group bg-white rounded-lg border border-slate-200/80 overflow-hidden transition-shadow duration-300 hover:shadow-md flex flex-col h-full">
      <div
        className="relative overflow-hidden aspect-[4/3] cursor-pointer"
        onClick={() => viewDetail(item.slug)}
      >
        <img
          src={item.gambar_utama}
          alt={item.nama_item}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-2 left-2 z-10 flex flex-col space-y-1">
          {item.kategori && (
            <span className="bg-emerald-600/80 backdrop-blur-sm text-white text-xs font-medium px-2 py-0.5 rounded">
              <TagIcon className="w-3 h-3 mr-1 opacity-80" />{" "}
              {item.kategori.nama_kategori}
            </span>
          )}
          {item.status_ketersediaan && (
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded ${statusBadgeColor}`}
            >
              {item.status_ketersediaan}
            </span>
          )}
        </div>
      </div>
      <div className="p-4 flex flex-row justify-between items-end flex-grow">
        <div
          className="flex-grow mr-2 cursor-pointer"
          onClick={() => viewDetail(item.slug)}
        >
          <h3 className="text-base font-semibold text-slate-800 mb-1 line-clamp-2">
            {item.nama_item}
          </h3>
          <p className="text-lg font-bold text-emerald-700">
            {formatRupiah(item.harga)}
          </p>
        </div>
        <button
          onClick={handleSimpleAddToCart}
          disabled={item.status_ketersediaan?.toLowerCase() !== "tersedia"}
          className="flex-shrink-0 p-2 bg-emerald-600 text-white rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-400"
          title="Tambah ke Keranjang"
        >
          <ShoppingCartIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

// --- Komponen Loading Detail (Skeleton) ---
const DetailLoadingSkeleton = () => (
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-pulse">
    <div className="mb-6 h-5 w-1/4 bg-slate-300 rounded"></div>{" "}
    {/* <--- Warna skeleton disesuaikan */}
    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 lg:gap-16">
      <div className="md:col-span-2 w-full aspect-w-1 aspect-h-1 bg-slate-300 rounded-lg"></div>{" "}
      {/* <--- Warna skeleton disesuaikan */}
      <div className="md:col-span-3">
        <div className="h-4 w-1/3 bg-slate-300 rounded mb-3"></div>
        <div className="h-8 w-3/4 bg-slate-300 rounded mb-4"></div>
        <div className="h-10 w-1/2 bg-slate-300 rounded mb-6"></div>
        <div className="h-5 w-1/4 bg-slate-300 rounded mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 w-full bg-slate-300 rounded"></div>
          <div className="h-4 w-full bg-slate-300 rounded"></div>
          <div className="h-4 w-5/6 bg-slate-300 rounded"></div>
        </div>
        <div className="mt-8 flex items-center gap-4">
          <div className="h-10 w-24 bg-slate-300 rounded"></div>
          <div className="h-12 w-48 bg-slate-400 rounded-lg"></div>
        </div>
      </div>
    </div>
  </div>
);

// --- Komponen Loading Card (Skeleton) untuk related items ---
const SkeletonCard = () => (
  <div className="bg-white rounded-lg border border-slate-200/80 overflow-hidden animate-pulse shadow-md">
    {" "}
    {/* <--- Warna border disesuaikan */}
    <div className="w-full h-48 bg-slate-200/80"></div>{" "}
    {/* <--- Warna skeleton disesuaikan */}
    <div className="p-4">
      <div className="h-5 w-3/4 bg-slate-200/80 rounded mb-2"></div>
      <div className="h-6 w-1/3 bg-slate-200/80 rounded"></div>
    </div>
  </div>
);

// --- Komponen Utama Halaman Detail Item ---
function DetailItemPage() {
  const [itemDetail, setItemDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedItemList, setRelatedItemList] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(false);
  const [relatedError, setRelatedError] = useState(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    message: "",
    type: "info",
  });
  const { slug } = useParams();
  const navigate = useNavigate();
  function closeModal() {
    setIsModalOpen(false);
  }
  function openModal(type, title, message) {
    setModalContent({ type, title, message });
    setIsModalOpen(true);
  }
  useEffect(() => {
    const fetchDetailItem = async () => {
      setLoading(true);
      setError(null);
      setItemDetail(null);
      setRelatedItemList([]);
      try {
        const response = await apiClient.get(`/produks/${slug}`);
        if (response.data && response.data.data) {
          setItemDetail(response.data.data);
          setQuantity(1);
        } else {
          setError("Data Item tidak ditemukan atau format tidak sesuai.");
        }
      } catch (err) {
        console.error(`Gagal memuat detail Item (slug: ${slug}):`, err);
        if (err.response && err.response.status === 404) {
          setError("Item yang Anda cari tidak ditemukan.");
        } else {
          setError("Terjadi kesalahan saat memuat detail Item.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchDetailItem();
  }, [slug]);

  // --- Fetch Related Item --- (Diubah dari Related ATK)
  useEffect(() => {
    const fetchRelatedItem = async (categorySlug, currentItemId) => {
      if (!categorySlug) return;

      setRelatedLoading(true);
      setRelatedError(null);
      try {
        const response = await apiClient.get(`/produks`, {
          params: {
            kategori: categorySlug,
            per_page: 3,
          },
        });

        if (response.data && response.data.data) {
          // Filter out current Item from related list
          const filteredRelated = response.data.data.filter(
            (item) => item.id !== currentItemId
          );
          setRelatedItemList(filteredRelated.slice(0, 3)); // Limit to 3 items
        }
      } catch (err) {
        console.error("Gagal memuat Item terkait:", err);
        setRelatedError("Gagal memuat Item terkait");
      } finally {
        setRelatedLoading(false);
      }
    };

    if (itemDetail && itemDetail.kategori) {
      fetchRelatedItem(itemDetail.kategori.slug, itemDetail.id);
    }
  }, [itemDetail]);

  const handleQuantityChange = (amount) => {
    const newQuantity = Math.max(1, quantity + amount);
    setQuantity(newQuantity);
  };

  const handleAddToCart = async () => {
    if (!itemDetail) return;

    setIsAddingToCart(true);

    try {
      const response = await apiClient.post("/keranjang", {
        item_id: itemDetail.id,
        quantity: quantity,
      });

      if (response.status === 201 || response.status === 200) {
        openModal(
          "success",
          "Berhasil!",
          `${itemDetail.nama_item} telah ditambahkan ke keranjang.`
        );
      }
    } catch (err) {
      console.error("Gagal menambahkan ke keranjang:", err);

      let errorMessage = "Gagal menambahkan ke keranjang.";
      if (err.response) {
        if (err.response.status === 401) {
          errorMessage = "Silakan login terlebih dahulu.";
        } else if (err.response.data && err.response.data.message) {
          errorMessage = err.response.data.message;
        }
      }

      openModal("error", "Gagal!", errorMessage);
    } finally {
      setIsAddingToCart(false);
    }
  };

  // Tambahkan handler untuk tombol beli
  const handleBuyNow = async () => {
    if (!itemDetail) return;
    setIsAddingToCart(true);
    try {
      const response = await apiClient.post("/keranjang", {
        item_id: itemDetail.id,
        quantity: quantity,
      });
      if (response.status === 201 || response.status === 200) {
        openModal(
          "success",
          "Berhasil!",
          `${itemDetail.nama_item} telah ditambahkan ke keranjang.`
        );
        setTimeout(() => {
          navigate("/keranjang");
        }, 1000);
      }
    } catch (err) {
      let errorMessage = "Gagal menambahkan ke keranjang.";
      if (err.response) {
        if (err.response.status === 401) {
          errorMessage = "Silakan login terlebih dahulu.";
        } else if (err.response.data && err.response.data.message) {
          errorMessage = err.response.data.message;
        }
      }
      openModal("error", "Gagal!", errorMessage);
    } finally {
      setIsAddingToCart(false);
    }
  };

  if (loading) {
    return <DetailLoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="text-center">
          <XCircleIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Oops! Terjadi Kesalahan
          </h2>
          <p className="text-slate-600 mb-6">{error}</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => window.history.back()}
              className="px-6 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
            >
              Kembali
            </button>
            <Link
              to="/katalog"
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Lihat Katalog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!itemDetail) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="text-center">
          <InformationCircleIcon className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Item Tidak Ditemukan
          </h2>
          <p className="text-slate-600 mb-6">
            Item yang Anda cari tidak tersedia atau telah dihapus.
          </p>
          <Link
            to="/katalog"
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Lihat Katalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 mt-10">
        {/* Tombol Kembali */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium shadow-sm"
        >
          <ChevronLeftIcon className="w-5 h-5" />
          Kembali
        </button>
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol
            className="flex items-center space-x-2 text-sm"
            style={{ color: "var(--atk-secondary)" }}
          >
            <li>
              <Link
                to="/katalog"
                style={{
                  color: "var(--atk-primary)",
                  textDecoration: "underline",
                }}
              >
                Katalog
              </Link>
            </li>
            <li>
              <ChevronLeftIcon className="w-4 h-4" />
            </li>
            {itemDetail.kategori && (
              <>
                <li>
                  <Link
                    to={`/katalog?kategori_slug=${itemDetail.kategori.slug}`}
                    style={{
                      color: "var(--atk-secondary)",
                      textDecoration: "underline",
                    }}
                  >
                    {itemDetail.kategori.nama_kategori}
                  </Link>
                </li>
                <li>
                  <ChevronLeftIcon className="w-4 h-4" />
                </li>
              </>
            )}
            <li style={{ color: "var(--atk-dark)", fontWeight: 600 }}>
              {itemDetail.nama_item}
            </li>
          </ol>
        </nav>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 lg:gap-16">
          {/* Image Section */}
          <div className="md:col-span-2">
            <div
              style={{
                borderRadius: 16,
                border: "1px solid #eee",
                overflow: "hidden",
                background: "#fafafa",
              }}
            >
              <img
                src={itemDetail.gambar_utama}
                alt={itemDetail.nama_item}
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                  background: "#f5f5f5",
                }}
                loading="lazy"
              />
              {itemDetail.status_ketersediaan && (
                <div style={{ position: "absolute", top: 16, right: 16 }}>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      borderRadius: 8,
                      padding: "4px 14px",
                      background:
                        itemDetail.status_ketersediaan.toLowerCase() ===
                        "tersedia"
                          ? "var(--atk-primary)"
                          : "#eee",
                      color: "#fff",
                    }}
                  >
                    {itemDetail.status_ketersediaan}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="md:col-span-3">
            {/* Category Badge */}
            {itemDetail.kategori && (
              <div className="mb-3">
                <span
                  style={{
                    fontSize: 13,
                    color: "var(--atk-secondary)",
                    background: "#f5f5f5",
                    borderRadius: 8,
                    padding: "4px 12px",
                    fontWeight: 500,
                  }}
                >
                  {itemDetail.kategori.nama_kategori}
                </span>
              </div>
            )}

            {/* Title */}
            <h1
              style={{
                fontWeight: 800,
                fontSize: "2.1rem",
                color: "var(--atk-dark)",
                marginBottom: 12,
              }}
            >
              {itemDetail.nama_item}
            </h1>

            {/* Price */}
            <div style={{ marginBottom: 18 }}>
              <p
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: "var(--atk-primary)",
                }}
              >
                {formatRupiah(itemDetail.harga)}
              </p>
              {itemDetail.stok !== undefined && (
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--atk-secondary)",
                    marginTop: 2,
                  }}
                >
                  Stok: {itemDetail.stok} unit
                </p>
              )}
            </div>

            {/* Description */}
            {itemDetail.deskripsi && (
              <div style={{ marginBottom: 28 }}>
                <h3
                  style={{
                    fontWeight: 600,
                    fontSize: 16,
                    color: "var(--atk-dark)",
                    marginBottom: 8,
                  }}
                >
                  Deskripsi
                </h3>
                <div
                  style={{
                    color: "var(--atk-dark)",
                    fontSize: 15,
                    lineHeight: 1.7,
                  }}
                >
                  {itemDetail.deskripsi}
                </div>
              </div>
            )}

            {/* Add to Cart Section */}
            <div style={{ borderTop: "1px solid #eee", paddingTop: 18 }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 16,
                  alignItems: "center",
                }}
              >
                {/* Quantity Selector */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #eee",
                    borderRadius: 8,
                    background: "#f8fafc",
                  }}
                >
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    style={{
                      padding: 8,
                      background: "none",
                      border: "none",
                      color: "var(--atk-primary)",
                      fontSize: 18,
                      cursor: quantity <= 1 ? "not-allowed" : "pointer",
                      opacity: quantity <= 1 ? 0.5 : 1,
                      transition: "color 0.2s",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.color = "var(--atk-secondary)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.color = "var(--atk-primary)")
                    }
                  >
                    -
                  </button>
                  <span
                    style={{ padding: "0 18px", fontSize: 18, fontWeight: 600 }}
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    style={{
                      padding: 8,
                      background: "none",
                      border: "none",
                      color: "var(--atk-primary)",
                      fontSize: 18,
                      cursor: "pointer",
                      transition: "color 0.2s",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.color = "var(--atk-secondary)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.color = "var(--atk-primary)")
                    }
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={
                    isAddingToCart ||
                    itemDetail.status_ketersediaan?.toLowerCase() !== "tersedia"
                  }
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    padding: "12px 32px",
                    fontSize: 17,
                    fontWeight: 700,
                    borderRadius: 8,
                    background:
                      itemDetail.status_ketersediaan?.toLowerCase() ===
                      "tersedia"
                        ? "var(--atk-primary)"
                        : "#eee",
                    color: "#fff",
                    border: "none",
                    cursor:
                      isAddingToCart ||
                      itemDetail.status_ketersediaan?.toLowerCase() !==
                        "tersedia"
                        ? "not-allowed"
                        : "pointer",
                    minWidth: 180,
                    transition: "background 0.2s, color 0.2s",
                  }}
                  onMouseOver={(e) => {
                    if (
                      itemDetail.status_ketersediaan?.toLowerCase() ===
                      "tersedia"
                    ) {
                      e.currentTarget.style.background = "var(--atk-secondary)";
                    }
                  }}
                  onMouseOut={(e) => {
                    if (
                      itemDetail.status_ketersediaan?.toLowerCase() ===
                      "tersedia"
                    ) {
                      e.currentTarget.style.background = "var(--atk-primary)";
                    }
                  }}
                >
                  <ShoppingCartIcon className="w-5 h-5 mr-2" />
                  Tambah ke Keranjang
                </button>
                {/* Tombol Beli Sekarang */}
                <button
                  onClick={handleBuyNow}
                  disabled={
                    itemDetail.status_ketersediaan?.toLowerCase() !== "tersedia"
                  }
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "12px 32px",
                    fontSize: 17,
                    fontWeight: 700,
                    borderRadius: 8,
                    background: "var(--atk-secondary)",
                    color: "#fff",
                    border: "none",
                    cursor:
                      itemDetail.status_ketersediaan?.toLowerCase() !==
                      "tersedia"
                        ? "not-allowed"
                        : "pointer",
                    minWidth: 180,
                  }}
                >
                  Beli Sekarang
                </button>
              </div>
              {/* Stock Warning */}
              {itemDetail.status_ketersediaan?.toLowerCase() !== "tersedia" && (
                <p style={{ color: "#e53935", fontSize: 13, marginTop: 8 }}>
                  Maaf, Item ini sedang tidak tersedia.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Related Item Section */}
        {relatedItemList.length > 0 && (
          <div style={{ marginTop: 56 }}>
            <h2
              style={{
                fontWeight: 700,
                fontSize: 22,
                color: "var(--atk-dark)",
                marginBottom: 18,
              }}
            >
              Item Terkait
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedItemList.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: "#fff",
                    border: "1px solid #eee",
                    borderRadius: 12,
                    padding: 14,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  <img
                    src={item.gambar_utama}
                    alt={item.nama_item}
                    style={{
                      width: "100%",
                      height: 90,
                      objectFit: "cover",
                      borderRadius: 8,
                      background: "#f5f5f5",
                      marginBottom: 8,
                    }}
                  />
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: 15,
                      color: "var(--atk-dark)",
                      marginBottom: 2,
                    }}
                  >
                    {item.nama_item}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "var(--atk-secondary)",
                      marginBottom: 2,
                    }}
                  >
                    {item.kategori?.nama_kategori || "-"}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "var(--atk-primary)",
                      marginBottom: 6,
                    }}
                  >
                    {formatRupiah(item.harga)}
                  </div>
                  <button
                    onClick={() =>
                      (window.location.href = `/anjr/${item.slug}`)
                    }
                    style={{
                      border: "1px solid var(--atk-primary)",
                      background: "none",
                      color: "var(--atk-primary)",
                      borderRadius: 8,
                      padding: "0.4rem 0",
                      fontWeight: 500,
                      fontSize: 14,
                      cursor: "pointer",
                    }}
                  >
                    Detail
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Loading */}
        {relatedLoading && (
          <div style={{ marginTop: 56 }}>
            <h2
              style={{
                fontWeight: 700,
                fontSize: 22,
                color: "var(--atk-dark)",
                marginBottom: 18,
              }}
            >
              Item Terkait
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    background: "#fafafa",
                    borderRadius: 12,
                    border: "1px solid #eee",
                    height: 120,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Related Error */}
        {relatedError && (
          <div style={{ marginTop: 56 }}>
            <h2
              style={{
                fontWeight: 700,
                fontSize: 22,
                color: "var(--atk-dark)",
                marginBottom: 18,
              }}
            >
              Item Terkait
            </h2>
            <div className="text-center py-8">
              <p style={{ color: "var(--atk-secondary)" }}>{relatedError}</p>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0k " />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  style={{
                    background: "#fff",
                    borderRadius: 16,
                    border: "1px solid #eee",
                    boxShadow: "0 2px 16px 0 rgba(44,44,44,0.08)",
                    padding: 28,
                    maxWidth: 380,
                    width: "100%",
                  }}
                >
                  <Dialog.Title
                    as="h3"
                    style={{
                      fontWeight: 700,
                      fontSize: 18,
                      marginBottom: 14,
                      color:
                        modalContent.type === "success"
                          ? "var(--atk-primary)"
                          : modalContent.type === "error"
                          ? "#e53935"
                          : "var(--atk-dark)",
                    }}
                  >
                    {modalContent.title}
                  </Dialog.Title>
                  <div
                    style={{
                      fontSize: 15,
                      color: "var(--atk-dark)",
                      marginBottom: 24,
                    }}
                  >
                    {modalContent.message}
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button
                      type="button"
                      style={{
                        border: "none",
                        background: "var(--atk-primary)",
                        color: "#fff",
                        borderRadius: 8,
                        padding: "0.6rem 1.5rem",
                        fontWeight: 600,
                        fontSize: 15,
                        cursor: "pointer",
                      }}
                      onClick={closeModal}
                    >
                      Tutup
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default DetailItemPage;
