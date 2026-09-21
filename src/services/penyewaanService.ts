import api from "./api";

// ==========================================================
// GET RIWAYAT PENYEWAAN PELANGGAN
// ==========================================================

export const getRiwayatPelanggan = async () => {
  try {
    const response = await api.get(
      "/auth/pelanggan/penyewaan"
    );

    console.log("======================================");
    console.log("RIWAYAT PELANGGAN BERHASIL");
    console.log("STATUS:", response.status);
    console.log("URL:", response.config.url);
    console.log("DATA:", response.data);
    console.log("======================================");

    return response.data;
  } catch (error: any) {
    console.error("======================================");
    console.error("RIWAYAT PELANGGAN GAGAL");
    console.error("STATUS:", error?.response?.status);
    console.error("DATA:", error?.response?.data);
    console.error("MESSAGE:", error?.message);
    console.error("URL:", error?.config?.url);
    console.error(
      "AUTH:",
      error?.config?.headers?.Authorization
    );
    console.error("======================================");

    throw error;
  }
};

// ==========================================================
// GET DETAIL PENYEWAAN PELANGGAN
// ==========================================================

export const getDetailPenyewaanPelanggan = async (
  id: number | string
) => {
  try {
    const response = await api.get(
      `/auth/pelanggan/penyewaan/${id}`
    );

    console.log("======================================");
    console.log("DETAIL PENYEWAAN BERHASIL");
    console.log("STATUS:", response.status);
    console.log("URL:", response.config.url);
    console.log("DATA:", response.data);
    console.log("======================================");

    return response.data;
  } catch (error: any) {
    console.error("======================================");
    console.error("DETAIL PENYEWAAN GAGAL");
    console.error("STATUS:", error?.response?.status);
    console.error("DATA:", error?.response?.data);
    console.error("MESSAGE:", error?.message);
    console.error("URL:", error?.config?.url);
    console.error(
      "AUTH:",
      error?.config?.headers?.Authorization
    );
    console.error("======================================");

    throw error;
  }
};