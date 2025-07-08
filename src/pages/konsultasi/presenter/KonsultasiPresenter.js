import KonsultasiModel from "../model/KonsultasiModel";

export default class KonsultasiPresenter {
  constructor(token) {
    this.token = token;
  }

  async getDokters() {
    return await KonsultasiModel.getDokters();
  }

  async getRiwayatKonsultasi() {
    return await KonsultasiModel.getRiwayatKonsultasi(this.token);
  }

  async ajukanKonsultasi(data) {
    return await KonsultasiModel.ajukanKonsultasi(data, this.token);
  }
}
