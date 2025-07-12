import React, { useState, useEffect, useCallback } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import apiClient from "../../../api/apiClient";
import {
  EyeIcon,
  ShoppingBagIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  InboxIcon,
  StarIcon,
  ChatBubbleLeftIcon,
  ArrowPathRoundedSquareIcon,
} from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { id } from "date-fns/locale";

// Helper Function: Format Rupiah
const formatRupiah = (angka) => {
  if (angka === null || angka === undefined) return "Rp 0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(angka);
};

// Helper Function: Warna Badge Status Pesanan
const getStatusPesananColor = (status) => {
  switch (status?.toLowerCase()) {
    case "baru":
    case "pending":
      return "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20";
    case "menunggu_konfirmasi_pembayaran":
    case "belum_bayar":
      return "bg-yellow-50 text-yellow-700 ring-1 ring-inset ring-yellow-600/20";
    case "lunas":
      return "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20";
    case "diproses":
      return "bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-600/20";
    case "dikirim":
      return "bg-purple-50 text-purple-700 ring-1 ring-inset ring-purple-600/20";
    case "selesai":
      return "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20";
    case "dibatalkan":
    case "batal":
      return "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20";
    default:
      return "bg-slate-50 text-slate-700 ring-1 ring-inset ring-slate-600/20";
  }
};

// Komponen Skeleton
const OrderCardSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 animate-pulse">
    <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-100">
      <div className="h-5 bg-slate-200 rounded w-32"></div>
      <div className="flex gap-2">
        <div className="h-6 bg-slate-200 rounded-full w-20"></div>
        <div className="h-4 bg-slate-200 rounded w-24"></div>
      </div>
    </div>
    <div className="space-y-3 mb-4">
      {[1, 2].map((i) => (
        <div key={i} className="flex gap-4">
          <div className="w-16 h-16 bg-slate-200 rounded-lg"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            <div className="h-3 bg-slate-200 rounded w-1/2"></div>
          </div>
          <div className="h-4 bg-slate-200 rounded w-20"></div>
        </div>
      ))}
    </div>
    <div className="flex justify-between items-center pt-4 border-t border-slate-100">
      <div className="h-6 bg-slate-200 rounded w-40"></div>
      <div className="flex gap-2">
        <div className="h-9 bg-slate-200 rounded-lg w-24"></div>
        <div className="h-9 bg-slate-200 rounded-lg w-24"></div>
      </div>
    </div>
  </div>
);

function PesananPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paginationData, setPaginationData] = useState(null);
  const [activeTab, setActiveTab] = useState("semua");

  const statusTabs = [
    { key: "semua", label: "Semua", icon: null },
    { key: "belum_bayar", label: "Belum Bayar", icon: null },
    { key: "diproses", label: "Diproses", icon: null },
    { key: "dikirim", label: "Dikirim", icon: null },
    { key: "selesai", label: "Selesai", icon: null },
    { key: "dibatalkan", label: "Dibatalkan", icon: null },
  ];

  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const fetchOrders = useCallback(
    async (page = 1) => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.get("/pesanan", {
          params: { page },
        });
        if (response.data && Array.isArray(response.data.data)) {
          setOrders(response.data.data);
          setPaginationData({
            meta: response.data.meta,
            links: response.data.links,
          });
        } else {
          console.warn("Format data pesanan tidak sesuai:", response.data);
          setOrders([]);
          setPaginationData(null);
          setError("Format data pesanan dari server tidak sesuai.");
        }
      } catch (err) {
        console.error("Gagal memuat riwayat pesanan:", err);
        if (err.response && err.response.status === 401) {
          setError(
            "Sesi Anda telah berakhir. Mohon login kembali untuk melihat riwayat pesanan Anda."
          );
          setTimeout(
            () =>
              navigate("/login", {
                replace: true,
                state: { from: location.pathname + location.search },
              }),
            3500
          );
        } else {
          setError(
            "Gagal memuat riwayat pesanan. Silakan coba lagi dalam beberapa saat."
          );
        }
        setOrders([]);
        setPaginationData(null);
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage, fetchOrders]);

  const handlePageChange = (page) => {
    if (
      page >= 1 &&
      page <= (paginationData?.meta?.last_page || 1) &&
      page !== currentPage
    ) {
      setSearchParams({ page: page.toString() });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderPageNumbers = () => {
    if (!paginationData || !paginationData.meta) return null;
    const { current_page, last_page } = paginationData.meta;
    const pageNumbers = [];
    const maxPagesToShow = 5;
    const halfPagesToShow = Math.floor(maxPagesToShow / 2);
    let startPage = Math.max(1, current_page - halfPagesToShow);
    let endPage = Math.min(last_page, current_page + halfPagesToShow);

    if (current_page <= halfPagesToShow) {
      endPage = Math.min(last_page, maxPagesToShow);
    }
    if (current_page + halfPagesToShow >= last_page) {
      startPage = Math.max(1, last_page - maxPagesToShow + 1);
    }

    if (startPage > 1) {
      pageNumbers.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-slate-700 ring-1 ring-inset ring-slate-300 hover:bg-slate-50 focus:z-20 focus:outline-offset-0 transition-colors"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pageNumbers.push(
          <span
            key="start-ellipsis"
            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-slate-700"
          >
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          aria-current={current_page === i ? "page" : undefined}
          className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold transition-colors ${
            current_page === i
              ? "z-10 bg-atk-primary text-white focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-atk-primary"
              : "text-atk-dark ring-1 ring-inset ring-slate-300 hover:bg-slate-50 focus:z-20 focus:outline-offset-0"
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < last_page) {
      if (endPage < last_page - 1) {
        pageNumbers.push(
          <span
            key="end-ellipsis"
            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-slate-700"
          >
            ...
          </span>
        );
      }
      pageNumbers.push(
        <button
          key={last_page}
          onClick={() => handlePageChange(last_page)}
          className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-slate-700 ring-1 ring-inset ring-slate-300 hover:bg-slate-50 focus:z-20 focus:outline-offset-0 transition-colors"
        >
          {last_page}
        </button>
      );
    }
    return pageNumbers;
  };

  const formatDate = (dateString) => {
    if (!dateString) return { tanggal: "N/A", jam: "" };
    const dateObj = new Date(dateString);
    return {
      tanggal: format(dateObj, "dd MMMM yyyy", { locale: id }),
      jam: format(dateObj, "HH:mm", { locale: id }),
    };
  };

  // Filter orders by activeTab
  const filteredOrders =
    activeTab === "semua"
      ? orders
      : orders.filter(
          (order) => (order.status || "").toLowerCase() === activeTab
        );

  return (
    <div className="bg-slate-50 min-h-screen py-8 mt-14 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-atk-dark mb-3">
            Riwayat Pesanan
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto">
            Lihat dan lacak semua transaksi pembelian Anda di sini. Kelola
            pesanan dengan mudah dan dapatkan update terkini.
          </p>
        </div>

        {/* Status Tabs
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-2">
            <div className="flex flex-wrap gap-1 sm:gap-2 justify-center">
              {statusTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab.key
                      ? "bg-atk-primary text-white shadow-md transform scale-105"
                      : "bg-transparent text-slate-600 hover:bg-slate-50 hover:text-atk-dark"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div> */}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl shadow-sm flex items-start">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-600 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-red-900 mb-1">
                Terjadi Kesalahan
              </h3>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Orders List */}
        <div className="space-y-6">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <OrderCardSkeleton key={i} />
            ))
          ) : filteredOrders.length > 0 ? (
            filteredOrders.map((order) => {
              const { tanggal, jam } = formatDate(
                order.created_at || order.tanggal_pesan
              );
              return (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 overflow-hidden"
                >
                  {/* Order Header */}
                  <div className="p-6 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-atk-primary rounded-full flex items-center justify-center">
                          <ShoppingBagIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-atk-dark text-lg">
                            Buana Petshop
                          </h3>
                          <p className="text-sm text-slate-500">
                            ID: #{order.id}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <span
                          className={`px-3 py-1.5 rounded-full text-xs font-bold inline-flex items-center justify-center ${getStatusPesananColor(
                            order.status
                          )}`}
                        >
                          {order.status
                            ? order.status.charAt(0).toUpperCase() +
                              order.status.slice(1).replace("_", " ")
                            : "N/A"}
                        </span>
                        <div className="text-xs text-slate-500 text-right sm:text-left">
                          <div className="font-medium">{tanggal}</div>
                          <div>{jam} WIB</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6">
                    <div className="space-y-4">
                      {(order.items || []).map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl"
                        >
                          <div className="relative">
                            <img
                              src={item.gambar_utama_url}
                              alt={item.nama_atk}
                              className="w-16 h-16 rounded-lg object-cover bg-white shadow-sm"
                              loading="lazy"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-atk-dark truncate mb-1">
                              {item.nama_atk || "Produk"}
                            </h4>
                            <div className="text-xs text-slate-500 flex items-center gap-2">
                              <span className="bg-slate-200 px-2 py-1 rounded">
                                {item.jumlah}x
                              </span>
                              <span>
                                {formatRupiah(item.harga_saat_pesanan || 0)}
                              </span>
                            </div>
                          </div>
                          <div className="font-bold text-atk-dark whitespace-nowrap">
                            {formatRupiah(
                              (item.harga_saat_pesanan || 0) *
                                (item.jumlah || 0)
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer Card */}
                  <div className="p-6 bg-slate-50 border-t border-slate-100">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-600">
                          Total Pesanan:
                        </span>
                        <span className="text-xl font-bold text-atk-primary">
                          {formatRupiah(order.total_harga)}
                        </span>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {order.status === "selesai" && (
                          <button className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors">
                            <StarIcon className="w-4 h-4" />
                            Nilai
                          </button>
                        )}
                        <button className="inline-flex items-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold px-4 py-2 rounded-lg transition-colors">
                          <ArrowPathRoundedSquareIcon className="w-4 h-4" />
                          Beli Lagi
                        </button>
                        <Link
                          to={`/pesanan/detail/${order.id}`}
                          className="inline-flex items-center gap-2  bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold px-4 py-2 rounded-lg transition-colors"
                        >
                          <EyeIcon className="w-4 h-4" />
                          Detail
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-20 px-6 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <InboxIcon className="h-12 w-12 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-600 mb-2">
                Belum Ada Riwayat Pesanan
              </h3>
              <p className="text-slate-500 mb-6 max-w-md mx-auto">
                Kamu belum pernah melakukan transaksi pesanan. Mulai berbelanja
                sekarang dan nikmati produk berkualitas dari kami.
              </p>
              <Link
                to="/katalog"
                className="inline-flex items-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-atk-primary hover:bg-atk-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-atk-primary transition-colors"
              >
                <ShoppingBagIcon className="h-5 w-5" />
                Mulai Belanja Sekarang
              </Link>
            </div>
          )}
        </div>

        {/* Pagination */}
        {paginationData &&
          paginationData.meta &&
          paginationData.meta.last_page > 1 &&
          !loading && (
            <div className="mt-8 bg-white rounded-xl shadow-sm border border-slate-100">
              <nav
                className="flex items-center justify-between px-6 py-4"
                aria-label="Pagination"
              >
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-slate-700">
                      Menampilkan{" "}
                      <span className="font-semibold text-atk-dark">
                        {paginationData.meta.from || 0}
                      </span>{" "}
                      -{" "}
                      <span className="font-semibold text-atk-dark">
                        {paginationData.meta.to || 0}
                      </span>{" "}
                      dari{" "}
                      <span className="font-semibold text-atk-dark">
                        {paginationData.meta.total || 0}
                      </span>{" "}
                      hasil
                    </p>
                  </div>
                  <div>
                    <nav
                      className="isolate inline-flex -space-x-px rounded-lg shadow-sm"
                      aria-label="Pagination"
                    >
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={!paginationData.links?.prev}
                        className={`relative inline-flex items-center rounded-l-lg px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-slate-300 focus:z-20 focus:outline-offset-0 transition-colors ${
                          !paginationData.links?.prev
                            ? "text-slate-400 cursor-not-allowed bg-slate-50"
                            : "text-atk-dark hover:bg-slate-50"
                        }`}
                      >
                        <ChevronLeftIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                        <span className="sr-only">Sebelumnya</span>
                      </button>
                      {renderPageNumbers()}
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={!paginationData.links?.next}
                        className={`relative inline-flex items-center rounded-r-lg px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-slate-300 focus:z-20 focus:outline-offset-0 transition-colors ${
                          !paginationData.links?.next
                            ? "text-slate-400 cursor-not-allowed bg-slate-50"
                            : "text-atk-dark hover:bg-slate-50"
                        }`}
                      >
                        <span className="sr-only">Berikutnya</span>
                        <ChevronRightIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </button>
                    </nav>
                  </div>
                </div>
                <div className="flex flex-1 justify-between sm:hidden">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={!paginationData.links?.prev}
                    className={`relative inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium transition-colors ${
                      !paginationData.links?.prev
                        ? "text-slate-400 cursor-not-allowed"
                        : "text-atk-dark hover:bg-slate-50"
                    }`}
                  >
                    Sebelumnya
                  </button>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={!paginationData.links?.next}
                    className={`relative ml-3 inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium transition-colors ${
                      !paginationData.links?.next
                        ? "text-slate-400 cursor-not-allowed"
                        : "text-atk-dark hover:bg-slate-50"
                    }`}
                  >
                    Berikutnya
                  </button>
                </div>
              </nav>
            </div>
          )}
      </div>
    </div>
  );
}

export default PesananPage;
