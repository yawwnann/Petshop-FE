import apiClient from "../../../api/apiClient";

const KonsultasiModel = {
  async getDokters() {
    // Ganti endpoint jika ada endpoint dokter khusus
    const res = await apiClient.get("/dokters");
    return res.data;
  },
  async getRiwayatKonsultasi(token) {
    const res = await apiClient.get("/konsultasi", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
  async ajukanKonsultasi(data, token) {
    const res = await apiClient.post("/konsultasi", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
};

export default KonsultasiModel;
