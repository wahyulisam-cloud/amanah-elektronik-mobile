import api from "./api";

// ==========================================================
// REGISTER PELANGGAN
// ==========================================================

export const registerPelanggan = async (
  formData: FormData
) => {
  const response = await api.post(
    "/auth/pelanggan/register",
    formData,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  return response.data;
};

// ==========================================================
// LOGIN PELANGGAN
// ==========================================================

export const loginPelanggan = async (
  email: string,
  password: string
) => {
  const response = await api.post(
    "/pelanggan/login",
    {
      pelanggan_email: email,
      pelanggan_password: password,
    },
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

// ==========================================================
// GET DATA PELANGGAN YANG SEDANG LOGIN
// ==========================================================

export const getPelangganMe = async () => {
  try {
    const response = await api.get(
      "/auth/pelanggan/me"
    );

    console.log("===== DATA PELANGGAN ME =====");
    console.log(response.data);
    console.log("=============================");

    return response.data;
  } catch (error: any) {
    console.error(
      "===== GAGAL GET PELANGGAN ME ====="
    );

    console.error(
      error?.response?.data || error
    );

    console.error(
      "==================================="
    );

    throw error;
  }
};