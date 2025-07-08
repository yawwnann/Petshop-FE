import React, { useEffect, useState, useMemo } from "react";
import KonsultasiPresenter from "../presenter/KonsultasiPresenter";

export default function KonsultasiView({ token }) {
  const [dokters, setDokters] = useState([]);
  const [riwayat, setRiwayat] = useState([]);
  const [form, setForm] = useState({
    dokter_id: "",
    tanggal: "",
    waktu: "",
    catatan: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const presenter = useMemo(() => new KonsultasiPresenter(token), [token]);

  useEffect(() => {
    presenter.getDokters().then(setDokters);
    presenter.getRiwayatKonsultasi().then(setRiwayat);
  }, [presenter]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await presenter.ajukanKonsultasi(form);
      setSuccess("Pengajuan konsultasi berhasil!");
      setForm({ dokter_id: "", tanggal: "", waktu: "", catatan: "" });
      setRiwayat(await presenter.getRiwayatKonsultasi());
      setModalOpen(false);
    } catch (err) {
      setError(err?.response?.data?.message || "Gagal mengajukan konsultasi");
    }
    setLoading(false);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Diterima":
        return "bg-green-100 text-green-800 border-green-200";
      case "selesai":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Dibatalkan":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mt-15 md:mt-20 mx-auto py-4 md:py-8 px-2 md:px-4">
        {/* Header Section */}
        <div
          className="bg-white rounded-3xl shadow-xl p-8 mb-8 border-2"
          style={{ borderColor: "var(--petshop-blue)" }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                style={{ backgroundColor: "var(--petshop-blue)" }}
              >
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4h4m-4 0V7m0 4v8a2 2 0 002 2h4a2 2 0 002-2v-8"
                  />
                </svg>
              </div>
              <div>
                <h1
                  className="text-3xl font-bold"
                  style={{ color: "var(--petshop-blue)" }}
                >
                  Konsultasi Dokter
                </h1>
                <p className="text-gray-600 mt-1">
                  Kelola jadwal konsultasi dengan dokter hewan
                </p>
              </div>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="group relative w-full md:w-auto mt-4 md:mt-0 px-8 py-4 rounded-2xl font-bold text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              style={{ backgroundColor: "var(--petshop-blue)" }}
            >
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span>Jadwal Baru</span>
              </div>
              <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-2xl text-green-800 shadow-lg animate-pulse">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              {success}
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-2xl text-red-800 shadow-lg animate-pulse">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </div>
          </div>
        )}

        {/* Modal Form */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setModalOpen(false)}
            ></div>
            <div
              className="relative bg-white rounded-xl md:rounded-3xl shadow-2xl w-full max-w-full md:max-w-lg border-4 transform animate-bounce-in"
              style={{ borderColor: "var(--petshop-blue)" }}
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: "var(--petshop-blue)" }}
                    >
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4h4"
                        />
                      </svg>
                    </div>
                    <h3
                      className="text-2xl font-bold"
                      style={{ color: "var(--petshop-blue)" }}
                    >
                      Jadwal Konsultasi
                    </h3>
                  </div>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                    style={{ color: "var(--petshop-pink-accent)" }}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      className="block text-sm font-bold mb-3"
                      style={{ color: "var(--petshop-blue)" }}
                    >
                      Pilih Dokter
                    </label>
                    <div className="relative">
                      <select
                        name="dokter_id"
                        value={form.dokter_id}
                        onChange={handleChange}
                        required
                        className="w-full p-4 rounded-xl border-2 focus:ring-4 focus:ring-opacity-50 appearance-none bg-white shadow-sm"
                        style={{
                          borderColor: "var(--petshop-blue-light)",
                          focusRingColor: "var(--petshop-blue)",
                        }}
                      >
                        <option value="">Pilih Dokter</option>
                        {dokters.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.nama}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                        <svg
                          className="w-5 h-5"
                          style={{ color: "var(--petshop-blue)" }}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-sm font-bold mb-3"
                        style={{ color: "var(--petshop-blue)" }}
                      >
                        Tanggal
                      </label>
                      <input
                        type="date"
                        name="tanggal"
                        value={form.tanggal}
                        onChange={handleChange}
                        required
                        className="w-full p-4 rounded-xl border-2 focus:ring-4 focus:ring-opacity-50 shadow-sm"
                        style={{
                          borderColor: "var(--petshop-blue-light)",
                          focusRingColor: "var(--petshop-blue)",
                        }}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-sm font-bold mb-3"
                        style={{ color: "var(--petshop-blue)" }}
                      >
                        Waktu
                      </label>
                      <input
                        type="time"
                        name="waktu"
                        value={form.waktu}
                        onChange={handleChange}
                        required
                        className="w-full p-4 rounded-xl border-2 focus:ring-4 focus:ring-opacity-50 shadow-sm"
                        style={{
                          borderColor: "var(--petshop-blue-light)",
                          focusRingColor: "var(--petshop-blue)",
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-sm font-bold mb-3"
                      style={{ color: "var(--petshop-blue)" }}
                    >
                      Catatan (opsional)
                    </label>
                    <textarea
                      name="catatan"
                      value={form.catatan}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Jelaskan kondisi hewan peliharaan Anda..."
                      className="w-full p-4 rounded-xl border-2 focus:ring-4 focus:ring-opacity-50 shadow-sm resize-none"
                      style={{
                        borderColor: "var(--petshop-blue-light)",
                        focusRingColor: "var(--petshop-blue)",
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl font-bold text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    style={{ backgroundColor: "var(--petshop-blue)" }}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                        Mengajukan...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Ajukan Konsultasi
                      </div>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Riwayat Konsultasi Section */}
        <div
          className="bg-white rounded-3xl shadow-xl p-8 border-2"
          style={{ borderColor: "var(--petshop-blue)" }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
              style={{ backgroundColor: "var(--petshop-blue)" }}
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h2
              className="text-2xl font-bold"
              style={{ color: "var(--petshop-blue)" }}
            >
              Riwayat Konsultasi
            </h2>
          </div>

          {riwayat.length === 0 ? (
            <div className="text-center py-16">
              <div
                className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "var(--petshop-pink)" }}
              >
                <svg
                  className="w-12 h-12"
                  style={{ color: "var(--petshop-blue)" }}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3
                className="text-xl font-bold mb-2"
                style={{ color: "var(--petshop-blue)" }}
              >
                Belum Ada Riwayat Konsultasi
              </h3>
              <p className="text-gray-600">
                Klik tombol "Jadwal Baru" untuk membuat konsultasi pertama Anda
              </p>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {riwayat.map((k) => (
                <div
                  key={k.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 overflow-hidden"
                  style={{ borderColor: "var(--petshop-blue-light)" }}
                >
                  <div
                    className="h-2"
                    style={{ backgroundColor: "var(--petshop-blue)" }}
                  ></div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3
                        className="font-bold text-lg"
                        style={{ color: "var(--petshop-blue)" }}
                      >
                        {k.dokter?.nama || "Dokter Tidak Diketahui"}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(
                          k.status
                        )}`}
                      >
                        {k.status}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <svg
                          className="w-5 h-5 flex-shrink-0"
                          style={{ color: "var(--petshop-pink-accent)" }}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4h4"
                          />
                        </svg>
                        <span className="text-gray-700">{k.tanggal}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <svg
                          className="w-5 h-5 flex-shrink-0"
                          style={{ color: "var(--petshop-pink-accent)" }}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-gray-700">{k.waktu}</span>
                      </div>

                      {k.catatan && (
                        <div className="flex items-start gap-3">
                          <svg
                            className="w-5 h-5 flex-shrink-0 mt-1"
                            style={{ color: "var(--petshop-pink-accent)" }}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                          <span className="text-gray-700 text-sm">
                            {k.catatan}
                          </span>
                        </div>
                      )}

                      <div
                        className="pt-3 border-t"
                        style={{ borderColor: "var(--petshop-blue-light)" }}
                      >
                        <div className="flex items-start gap-3">
                          <svg
                            className="w-5 h-5 flex-shrink-0 mt-1"
                            style={{ color: "var(--petshop-pink-accent)" }}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">
                              Hasil Konsultasi:
                            </p>
                            <p className="text-sm text-gray-700">
                              {k.hasil_konsultasi ||
                                "Menunggu hasil konsultasi"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
