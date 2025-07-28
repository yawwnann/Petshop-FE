// File: src/pages/PaymentPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import apiClient from "../../../api/apiClient";
import PaymentProofUploadForm from "./PaymentProofUploadFormView.jsx";
import {
  ArrowPathIcon,
  CheckCircleIcon,
  BanknotesIcon,
  InformationCircleIcon,
  XCircleIcon,
  ArrowLeftIcon,
  ClockIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";

import { formatRupiah } from "../../../components/formatRupiah.jsx"; // Sesuaikan path jika berbeda

function PaymentPage() {
  const { orderId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [order, setOrder] = useState(location.state?.order || null);
  const [loadingOrder, setLoadingOrder] = useState(!location.state?.order);
  const [fetchError, setFetchError] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("transfer");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    if (!order && orderId) {
      const fetchOrderDetails = async () => {
        setLoadingOrder(true);
        setFetchError(null);
        try {
          const response = await apiClient.get(`/pesanan/${orderId}`);
          if (response.data && response.data.data) {
            setOrder(response.data.data);
          } else {
            throw new Error("Data pesanan tidak ditemukan.");
          }
        } catch (err) {
          console.error("Gagal memuat detail pesanan:", err);
          setFetchError(
            "Gagal memuat detail pesanan. Pastikan ID pesanan valid."
          );
        } finally {
          setLoadingOrder(false);
        }
      };
      fetchOrderDetails();
    } else if (order) {
      setLoadingOrder(false);
    }
  }, [orderId, order]);

  const handleSubmitPaymentMethod = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // For cash payment, we don't need to call API since the payment method
      // is already set when the order was created
      // Just show success message and redirect

      // Update local order data with cash payment method
      setOrder((prevOrder) => ({
        ...prevOrder,
        metode_pembayaran: "cash",
      }));

      // Show success message
      alert(
        "Pembayaran cash berhasil dikonfirmasi! Silakan datang ke toko kami untuk melakukan pembayaran dan pengambilan barang."
      );

      // Redirect to orders page
      navigate("/pesanan");
    } catch (err) {
      console.error("Gagal mengkonfirmasi pembayaran cash:", err);
      setSubmitError(
        "Gagal mengkonfirmasi pembayaran cash. Silakan coba lagi."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProofUploadSuccess = (data) => {
    alert(
      data.message || "Bukti pembayaran berhasil. Admin akan memverifikasi."
    );
    navigate(`/pesanan`);
  };

  const handleProofUploadError = (errorMessage) => {
    console.warn("Gagal unggah bukti dari PaymentPage:", errorMessage);
  };

  if (loadingOrder) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ArrowPathIcon className="animate-spin h-12 w-12 text-atk-primary mx-auto mb-4" />
          <p className="text-lg text-gray-700">Memuat detail pembayaran...</p>
        </div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm">
            <XCircleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Terjadi Kesalahan
            </h2>
            <p className="text-gray-600 mb-6">{fetchError}</p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-atk-primary text-white font-medium rounded-lg hover:bg-atk-secondary transition-colors"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm">
            <InformationCircleIcon className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Informasi Pesanan Tidak Ditemukan
            </h2>
            <p className="text-gray-600 mb-6">
              Tidak dapat menemukan detail untuk pesanan ini.
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-atk-primary text-white font-medium rounded-lg hover:bg-atk-secondary transition-colors"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-2xl mx-auto">
          {/* Navigation */}
          <div className="flex items-center gap-4 mb-8">
            <Link
              to="/pesanan"
              className="flex items-center gap-2 text-[#3B82F6] hover:text-[#6BA4B0] transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              <span className="text-sm font-medium">
                Kembali ke Daftar Pesanan
              </span>
            </Link>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            {/* Success Header */}
            <div className="p-8 text-center border-b border-gray-100 bg-gradient-to-r from-[#E0F2F7] to-[#6BA4B0]/10">
              <div className="w-20 h-20 bg-[#E0F2F7] rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="h-10 w-10 text-[#3B82F6]" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Pesanan Anda Berhasil Dibuat!
              </h1>
              <div className="flex items-center justify-center gap-2 text-gray-600 mb-4">
                <ClockIcon className="h-5 w-5" />
                <span className="text-sm">Batas waktu pembayaran: 24 jam</span>
              </div>
              <div className="space-y-2">
                <p className="text-gray-600">
                  ID Pesanan:{" "}
                  <span className="font-semibold text-[#3B82F6]">
                    {order.id}
                  </span>
                </p>
                <p className="text-lg">
                  Total Pembayaran:{" "}
                  <span className="font-bold text-emerald-700">
                    {formatRupiah(order.total_harga)}
                  </span>
                </p>
              </div>
            </div>

            {/* Payment Methods Selection */}
            <div className="p-8 bg-gray-50">
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <BanknotesIcon className="h-6 w-6 text-[#3B82F6]" />
                  Pilih Metode Pembayaran
                </h2>

                {/* Payment Method Tabs */}
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
                  <button
                    onClick={() => setSelectedPaymentMethod("transfer")}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md font-medium transition-colors ${
                      selectedPaymentMethod === "transfer"
                        ? "bg-[#E0F2F7] text-[#3B82F6] shadow-sm"
                        : "text-slate-600 hover:text-[#3B82F6]"
                    }`}
                  >
                    <CreditCardIcon className="h-5 w-5" />
                    Transfer Bank
                  </button>
                  <button
                    onClick={() => setSelectedPaymentMethod("cash")}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md font-medium transition-colors ${
                      selectedPaymentMethod === "cash"
                        ? "bg-[#E0F2F7] text-[#3B82F6] shadow-sm"
                        : "text-slate-600 hover:text-[#3B82F6]"
                    }`}
                  >
                    <BanknotesIcon className="h-5 w-5" />
                    Cash
                  </button>
                </div>

                {/* Transfer Bank Instructions */}
                {selectedPaymentMethod === "transfer" && (
                  <div>
                    <p className="text-gray-600 mb-4">
                      Silakan lakukan transfer ke salah satu rekening bank kami:
                    </p>
                    <div className="space-y-4">
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                        <p className="text-sm font-medium text-gray-700 mb-1">
                          Bank BCA
                        </p>
                        <p className="text-lg font-bold text-atk-primary">
                          1234567890
                        </p>
                        <p className="text-sm text-gray-500">
                          a/n: Buana Petshop
                        </p>
                      </div>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                        <p className="text-sm font-medium text-gray-700 mb-1">
                          Bank Mandiri
                        </p>
                        <p className="text-lg font-bold text-atk-primary">
                          0987654321
                        </p>
                        <p className="text-sm text-gray-500">
                          a/n: Buana Petshop
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm font-medium text-yellow-800 mb-2">
                        PENTING: Pastikan Anda mentransfer sesuai dengan jumlah
                        total di atas.
                      </p>
                      <p className="text-xs text-yellow-700">
                        Setelah melakukan transfer, mohon unggah bukti
                        pembayaran Anda di bawah ini dalam waktu 1x24 jam.
                      </p>
                    </div>
                  </div>
                )}

                {/* Cash Payment Instructions */}
                {selectedPaymentMethod === "cash" && (
                  <div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <CheckCircleIcon className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-green-800 mb-2">
                            Pembayaran Cash di Toko
                          </h3>
                          <p className="text-green-700 text-sm leading-relaxed">
                            Anda dapat melakukan pembayaran secara cash langsung
                            di toko kami. Barang akan disiapkan dan dapat
                            diambil setelah pembayaran selesai.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                          <ClockIcon className="h-5 w-5 text-[#3B82F6]" />
                          Informasi Pengambilan
                        </h4>
                        <div className="space-y-2 text-sm text-gray-600">
                          <p>
                            <strong>Total Pembayaran:</strong>{" "}
                            {formatRupiah(order.total_harga)}
                          </p>
                          <p>
                            <strong>ID Pesanan:</strong> #{order.id}
                          </p>
                          <p>
                            <strong>Status:</strong> Menunggu pembayaran cash
                          </p>
                        </div>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                          <InformationCircleIcon className="h-5 w-5" />
                          Langkah Pembayaran Cash
                        </h4>
                        <ol className="list-decimal list-inside space-y-1 text-sm text-blue-700">
                          <li>Datang ke toko kami dengan membawa ID pesanan</li>
                          <li>Berikan ID pesanan kepada staff kami</li>
                          <li>
                            Lakukan pembayaran cash sesuai total yang tertera
                          </li>
                          <li>
                            Barang akan disiapkan dan dapat langsung diambil
                          </li>
                        </ol>
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h4 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                          <ClockIcon className="h-5 w-5" />
                          Batas Waktu
                        </h4>
                        <p className="text-sm text-yellow-700">
                          Pesanan akan dibatalkan otomatis jika pembayaran cash
                          tidak dilakukan dalam waktu 24 jam.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Payment Method Button - Only for Cash */}
              {selectedPaymentMethod === "cash" && (
                <div className="mt-6">
                  <button
                    onClick={handleSubmitPaymentMethod}
                    disabled={isSubmitting}
                    className="w-full bg-[#3B82F6] hover:bg-[#2563EB] disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <ArrowPathIcon className="h-5 w-5 animate-spin" />
                        Mengirim...
                      </>
                    ) : (
                      <>
                        <CheckCircleIcon className="h-5 w-5" />
                        Konfirmasi Pembayaran Cash
                      </>
                    )}
                  </button>

                  {submitError && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-700">{submitError}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Upload Form */}
            <div className="p-8">
              <div className="bg-var--(petshop-blue) border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {selectedPaymentMethod === "cash"
                    ? "Informasi Pembayaran Cash"
                    : "Upload Bukti Pembayaran"}
                </h3>
                <p className="text-gray-600 mb-4">
                  {selectedPaymentMethod === "transfer"
                    ? "Setelah melakukan transfer bank, silakan upload bukti transfer Anda."
                    : "Untuk pembayaran cash, tidak perlu upload bukti pembayaran. Pembayaran akan dilakukan langsung di toko saat pengambilan barang."}
                </p>
                {selectedPaymentMethod !== "cash" ? (
                  <PaymentProofUploadForm
                    orderId={order.id}
                    paymentMethod={selectedPaymentMethod}
                    onUploadSuccess={handleProofUploadSuccess}
                    onUploadError={handleProofUploadError}
                  />
                ) : (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <CheckCircleIcon className="h-6 w-6 text-green-600" />
                      <div>
                        <h4 className="font-semibold text-green-800 mb-1">
                          Pembayaran Cash Dikonfirmasi
                        </h4>
                        <p className="text-green-700 text-sm">
                          Pesanan Anda telah dikonfirmasi untuk pembayaran cash.
                          Silakan datang ke toko kami dengan membawa ID pesanan
                          #{order.id} untuk melakukan pembayaran dan pengambilan
                          barang.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PaymentPage;
