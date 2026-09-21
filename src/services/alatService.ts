import api from "./api";

// ==========================================================
// GET ALAT
// ==========================================================

export const getAlat = async () => {
  const response = await api.get("/alat", {
    headers: {
      Accept: "application/json",
    },
  });

  return response.data;
};

// ==========================================================
// GET KATEGORI
// ==========================================================

export const getKategori = async () => {
  const response = await api.get("/kategori", {
    headers: {
      Accept: "application/json",
    },
  });

  return response.data;
};