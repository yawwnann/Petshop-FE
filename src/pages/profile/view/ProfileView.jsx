import React, { useState, useEffect, Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import apiClient from "../../../api/apiClient";
import {
  UserCircleIcon,
  CameraIcon,
  XMarkIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

// Update color variables
const colors = {
  primary: "#598c96",
  secondary: "#8CBCC7",
  light: "#E0F2F7",
};

// (Salin kode LoadingSpinner dari jawaban sebelumnya)
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-20">
    <svg
      className="animate-spin h-8 w-8 text-blue-600"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    <span className="ml-3 text-gray-600">Memuat profil...</span>
  </div>
);

// Komponen Halaman Profil
function ProfilePage() {
  // Remove unused states
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Photo modal states
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState("");
  const [isSubmittingPhoto, setIsSubmittingPhoto] = useState(false);
  const [photoError, setPhotoError] = useState(null);
  const [photoSuccess, setPhotoSuccess] = useState(null);
  const fileInputRef = useRef(null);

  // Fetch data awal
  useEffect(() => {
    // --- Logika Fetch Data (Sama seperti sebelumnya) ---
    const fetchProfileData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await apiClient.get("/user");
        if (response.data && response.data.user) {
          setUser(response.data.user);
          setPreviewSource(response.data.user.profile_photo_url || ""); // Set foto awal untuk preview
        } else {
          setError("Gagal memuat data profil: format tidak dikenal.");
          setUser(null);
        }
      } catch (err) {
        console.error("Gagal memuat profil:", err); // Anda menggunakan err di sini
        let errorMessage = "Gagal memuat data profil. Silakan coba lagi.";
        // Dan menggunakan err.response di sini
        if (
          err.response &&
          (err.response.status === 401 || err.response.status === 403)
        ) {
          errorMessage =
            "Sesi Anda tidak valid atau berakhir. Silakan login kembali.";
        }
        setError(errorMessage);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    const token = localStorage.getItem("authToken");
    if (token) {
      fetchProfileData();
    } else {
      setError("Anda harus login...");
      setIsLoading(false);
      setUser(null);
    }
    // (Salin lengkap dari jawaban sebelumnya)
  }, []); // <-- Dependensi kosong penting

  // --- Fungsi Handler Modal ---

  const closePhotoModal = () => {
    setIsPhotoModalOpen(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }; // Reset input file

  // --- Fungsi Handler Submit ---

  // Ganti Foto
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      // Buat preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewSource(reader.result);
      };
      reader.readAsDataURL(file);
      setPhotoError(null); // Hapus error jika file valid dipilih
    } else {
      setSelectedFile(null);
      setPreviewSource(user?.profile_photo_url || ""); // Kembali ke foto lama
      setPhotoError("Pilih file gambar yang valid (jpg, png, gif, dll).");
    }
  };

  const handleChangePhotoSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setPhotoError("Pilih file foto terlebih dahulu.");
      return;
    }
    setIsSubmittingPhoto(true);
    setPhotoError(null);
    setPhotoSuccess(null);

    const formData = new FormData();
    // **GANTI 'profile_photo' JIKA NAMA FIELD DI API BERBEDA**
    formData.append("photo", selectedFile);

    try {
      // **GANTI ENDPOINT SESUAI API ANDA**
      const response = await apiClient.post("/user/profile-photo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data && response.data.user) {
        // Asumsi API mengembalikan data user terbaru (termasuk URL foto baru)
        setUser(response.data.user);
        setPreviewSource(response.data.user.profile_photo_url); // Update preview juga
        setPhotoSuccess("Foto profil berhasil diganti!");
        setTimeout(closePhotoModal, 1500);
      } else if (response.data && response.data.photo_url) {
        // Alternatif: Jika API hanya mengembalikan URL foto baru
        const newPhotoUrl = response.data.photo_url;
        setUser((prevUser) => ({
          ...prevUser,
          profile_photo_url: newPhotoUrl,
        }));
        setPreviewSource(newPhotoUrl);
        setPhotoSuccess("Foto profil berhasil diganti!");
        setTimeout(closePhotoModal, 1500);
      } else {
        throw new Error("Format respon upload tidak sesuai");
      }
    } catch (err) {
      console.error("Error ganti foto:", err);
      setPhotoError(
        err.response?.data?.message || "Gagal mengganti foto profil."
      );
    } finally {
      setIsSubmittingPhoto(false);
    }
  };

  // --- Handler Error Gambar (Sama) ---
  const handleProfileImageError = (_e) => {
    _e.target.onerror = null; // Hindari loop
    _e.target.style.display = "none"; // Sembunyikan gambar rusak
    console.warn("Gagal memuat foto profil utama:", _e.target.src);
  };
  // (Salin dari jawaban sebelumnya)

  // --- Render Utama ---
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="max-w-lg mx-auto mt-10 text-center p-6 bg-red-50 border border-red-300 text-red-800 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Oops! Terjadi Kesalahan</h2>
        <p>{error}</p>
        {(error.includes("login") || error.includes("Sesi")) && (
          <button
            onClick={() => navigate("/login")}
            className="mt-5 px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Ke Halaman Login
          </button>
        )}
      </div>
    );
  }

  if (user) {
    return (
      <div className="min-h-screen bg-white">
        <div className="min-h-[calc(100vh-4rem)] mt-30 py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Profile Header */}
            <div
              className={`bg-gradient-to-r from-[${colors.primary}] to-[${colors.secondary}] rounded-lg shadow-lg p-6 md:p-8 mb-8 text-white`}
            >
              <div className="flex flex-col items-center md:flex-row md:items-start">
                {/* Profile Photo */}
                <div className="relative mb-4 md:mb-0 md:mr-8 flex-shrink-0">
                  {previewSource || user.profile_photo_url ? (
                    <img
                      src={previewSource || user.profile_photo_url}
                      alt={user.name || "Foto Profil"}
                      className="h-28 w-28 md:h-32 md:w-32 rounded-full object-cover ring-4 ring-white"
                      onError={handleProfileImageError}
                    />
                  ) : (
                    <UserCircleIcon
                      className={`h-28 w-28 md:h-32 md:w-32 text-[${colors.light}]`}
                    />
                  )}
                  <button
                    onClick={() => setIsPhotoModalOpen(true)}
                    className={`absolute bottom-0 right-0 bg-white text-[${colors.primary}] p-2 rounded-full hover:bg-[${colors.light}] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[${colors.primary}] focus:ring-white transition-colors duration-150`}
                    title="Ganti Foto Profil"
                  >
                    <CameraIcon className="h-5 w-5" />
                  </button>
                </div>
                {/* User Info */}
                <div className="text-center md:text-left mt-2 md:mt-0">
                  <h1 className="text-2xl md:text-3xl font-bold">
                    {user.name || "Nama Pengguna"}
                  </h1>
                  <p
                    className={`text-base md:text-lg text-[${colors.light}] mt-1`}
                  >
                    {user.email || "email@example.com"}
                  </p>
                </div>
              </div>
            </div>

            {/* Account Details */}
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-6 border-b border-gray-200 pb-3">
                Detail Akun
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Nama Lengkap
                  </label>
                  <p className="text-base text-gray-900">{user.name || "-"}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Alamat Email
                  </label>
                  <p className="text-base text-gray-900">{user.email || "-"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Keep only the Photo Modal */}
        <Transition appear show={isPhotoModalOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={closePhotoModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-30" />
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
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center"
                    >
                      Ganti Foto Profil
                      <button
                        onClick={closePhotoModal}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <XMarkIcon className="h-6 w-6" />
                      </button>
                    </Dialog.Title>

                    <form
                      onSubmit={handleChangePhotoSubmit}
                      className="mt-4 space-y-4"
                    >
                      {photoError && (
                        <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                          {photoError}
                        </p>
                      )}
                      {photoSuccess && (
                        <p className="text-sm text-green-600 bg-green-50 p-3 rounded-md flex items-center">
                          <CheckCircleIcon className="h-5 w-5 mr-2" />
                          {photoSuccess}
                        </p>
                      )}

                      {/* Preview Gambar */}
                      <div className="flex justify-center">
                        {previewSource ? (
                          <img
                            src={previewSource}
                            alt="Preview"
                            className="h-32 w-32 rounded-full object-cover ring-4 ring-blue-200"
                          />
                        ) : (
                          <UserCircleIcon className="h-32 w-32 text-gray-300" />
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="photo-upload"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Pilih Foto Baru
                        </label>
                        <input
                          ref={fileInputRef}
                          type="file"
                          id="photo-upload"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        <p className="mt-1 text-xs text-gray-500">
                          Format: JPG, PNG, GIF. Ukuran maks: 2MB (Contoh).
                        </p>
                      </div>

                      <div className="mt-5 sm:mt-6">
                        <button
                          type="submit"
                          disabled={isSubmittingPhoto || !selectedFile}
                          className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmittingPhoto
                            ? "Mengupload..."
                            : "Upload & Simpan Foto"}
                        </button>
                      </div>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div> // Penutup div utama page (jika Navbar ada di App.js, sesuaikan ini)
    );
  }

  // Fallback jika user null tapi tidak loading/error
  return (
    <div className="text-center py-10 text-gray-500">
      Tidak dapat menampilkan profil.
    </div>
  );
}

export default ProfilePage;
