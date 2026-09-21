import api from "./api";

export const getPelangganProfile = async () => {
  const response = await api.get("/auth/pelanggan/me");

  return response.data;
};

export const updatePelanggan = async (data: {
  pelanggan_nama: string;
  pelanggan_alamat: string;
  pelanggan_notelp: string;
  pelanggan_email: string;
}) => {
  const response = await api.put(
    "/auth/pelanggan/profile",
    data
  );

  return response.data;
};