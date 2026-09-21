import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { getPelangganMe } from "../services/authService";

// ==========================================================
// TYPE DATA PELANGGAN
// ==========================================================

export interface PelangganData {
  pelanggan_id: number;
  pelanggan_nama: string;
  pelanggan_alamat: string;
  pelanggan_notelp: string;
  pelanggan_email: string;

  created_at?: string;
  updated_at?: string;
}

// ==========================================================
// TYPE CONTEXT
// ==========================================================

interface AuthContextType {
  token: string | null;

  pelanggan: PelangganData | null;

  isLoggedIn: boolean;

  loading: boolean;

  setAuthData: (
    token: string,
    pelanggan: PelangganData
  ) => Promise<void>;

  updatePelanggan: (
    data: PelangganData
  ) => Promise<void>;

  logout: () => Promise<void>;

  checkAuth: () => Promise<void>;
}

// ==========================================================
// STORAGE KEY
// ==========================================================

const STORAGE_KEYS = {
  token: "pelanggan_token",
  pelanggan: "pelanggan_data",
};

// ==========================================================
// CONTEXT
// ==========================================================

const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined
  );

// ==========================================================
// NORMALIZE DATA PELANGGAN
// ==========================================================

const normalizePelanggan = (
  rawData: any
): PelangganData | null => {
  if (!rawData) {
    return null;
  }

  const data = rawData;

  const pelangganId = Number(
    data?.pelanggan_id
  );

  const pelangganNama =
    data?.pelanggan_nama ?? "";

  const pelangganAlamat =
    data?.pelanggan_alamat ?? "";

  const pelangganNotelp =
    data?.pelanggan_notelp ?? "";

  const pelangganEmail =
    data?.pelanggan_email ?? "";

  if (!pelangganId || !pelangganNama) {
    return null;
  }

  return {
    pelanggan_id: pelangganId,

    pelanggan_nama:
      String(pelangganNama),

    pelanggan_alamat:
      String(pelangganAlamat),

    pelanggan_notelp:
      String(pelangganNotelp),

    pelanggan_email:
      String(pelangganEmail),

    created_at:
      data?.created_at,

    updated_at:
      data?.updated_at,
  };
};

// ==========================================================
// PROVIDER
// ==========================================================

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [token, setToken] =
    useState<string | null>(null);

  const [pelanggan, setPelanggan] =
    useState<PelangganData | null>(null);

  const [loading, setLoading] =
    useState(true);

  // ========================================================
  // CHECK AUTH
  // ========================================================

  const checkAuth = async () => {
    try {
      setLoading(true);

      const savedToken =
        await AsyncStorage.getItem(
          STORAGE_KEYS.token
        );

      console.log(
        "===== CHECK AUTH ====="
      );

      console.log(
        "TOKEN ADA:",
        !!savedToken
      );

      // ----------------------------------------------------
      // TIDAK ADA TOKEN
      // ----------------------------------------------------

      if (!savedToken) {
        console.log(
          "TIDAK ADA SESSION AKTIF"
        );

        setToken(null);
        setPelanggan(null);

        return;
      }

      // ----------------------------------------------------
      // TOKEN ADA
      // ----------------------------------------------------

      setToken(savedToken);

      // ----------------------------------------------------
      // AMBIL DATA TERBARU DARI SERVER
      // ----------------------------------------------------

      try {
        const response =
          await getPelangganMe();

        console.log(
          "RESPONSE /ME:",
          response
        );

        if (
          !response?.success ||
          !response?.data
        ) {
          throw new Error(
            "Data pelanggan dari server tidak valid."
          );
        }

        const normalizedData =
          normalizePelanggan(
            response.data
          );

        if (!normalizedData) {
          throw new Error(
            "Data pelanggan tidak valid."
          );
        }

        // --------------------------------------------------
        // SIMPAN DATA TERBARU
        // --------------------------------------------------

        setPelanggan(
          normalizedData
        );

        await AsyncStorage.setItem(
          STORAGE_KEYS.pelanggan,
          JSON.stringify(
            normalizedData
          )
        );

        console.log(
          "SESSION VALID"
        );

        console.log(
          "PELANGGAN ID:",
          normalizedData.pelanggan_id
        );

        console.log(
          "NAMA:",
          normalizedData.pelanggan_nama
        );
      } catch (error: any) {
        console.error(
          "GAGAL VALIDASI TOKEN:",
          error?.response?.data ||
            error
        );

        // ----------------------------------------------
        // TOKEN SUDAH TIDAK VALID
        // ----------------------------------------------

        await AsyncStorage.multiRemove([
          STORAGE_KEYS.token,
          STORAGE_KEYS.pelanggan,
        ]);

        setToken(null);
        setPelanggan(null);
      }
    } catch (error) {
      console.error(
        "AUTH CHECK ERROR:",
        error
      );

      setToken(null);
      setPelanggan(null);

      await AsyncStorage.multiRemove([
        STORAGE_KEYS.token,
        STORAGE_KEYS.pelanggan,
      ]);
    } finally {
      setLoading(false);
    }
  };

  // ========================================================
  // SET AUTH DATA
  // ========================================================

  const setAuthData = async (
    newToken: string,
    newPelanggan: PelangganData
  ) => {
    if (!newToken) {
      throw new Error(
        "Token login tidak tersedia."
      );
    }

    const normalizedData =
      normalizePelanggan(
        newPelanggan
      );

    if (!normalizedData) {
      throw new Error(
        "Data pelanggan tidak valid."
      );
    }

    // ------------------------------------------------------
    // SIMPAN TOKEN
    // ------------------------------------------------------

    await AsyncStorage.setItem(
      STORAGE_KEYS.token,
      newToken
    );

    // ------------------------------------------------------
    // SIMPAN DATA PELANGGAN
    // ------------------------------------------------------

    await AsyncStorage.setItem(
      STORAGE_KEYS.pelanggan,
      JSON.stringify(
        normalizedData
      )
    );

    // ------------------------------------------------------
    // UPDATE STATE
    // ------------------------------------------------------

    setToken(newToken);

    setPelanggan(
      normalizedData
    );

    console.log(
      "LOGIN SESSION BERHASIL DISIMPAN"
    );

    console.log(
      "PELANGGAN ID:",
      normalizedData.pelanggan_id
    );
  };

  // ========================================================
  // UPDATE PELANGGAN
  // ========================================================

  const updatePelanggan = async (
    data: PelangganData
  ) => {
    const normalizedData =
      normalizePelanggan(data);

    if (!normalizedData) {
      throw new Error(
        "Data pelanggan yang akan diperbarui tidak valid."
      );
    }

    setPelanggan(
      normalizedData
    );

    await AsyncStorage.setItem(
      STORAGE_KEYS.pelanggan,
      JSON.stringify(
        normalizedData
      )
    );

    console.log(
      "DATA PELANGGAN BERHASIL DIUPDATE"
    );
  };

  // ========================================================
  // LOGOUT
  // ========================================================

  const logout = async () => {
    try {
      console.log(
        "LOGOUT PELANGGAN..."
      );

      await AsyncStorage.multiRemove([
        STORAGE_KEYS.token,
        STORAGE_KEYS.pelanggan,

        "token",
        "user",
      ]);

      setToken(null);

      setPelanggan(null);

      console.log(
        "SESSION BERHASIL DIHAPUS"
      );
    } catch (error) {
      console.error(
        "LOGOUT ERROR:",
        error
      );
    }
  };

  // ========================================================
  // INITIAL AUTH CHECK
  // ========================================================

  useEffect(() => {
    checkAuth();
  }, []);

  // ========================================================
  // PROVIDER
  // ========================================================

  return (
    <AuthContext.Provider
      value={{
        token,

        pelanggan,

        isLoggedIn:
          !!token &&
          !!pelanggan,

        loading,

        setAuthData,

        updatePelanggan,

        logout,

        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ==========================================================
// HOOK
// ==========================================================

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth harus digunakan di dalam AuthProvider"
    );
  }

  return context;
}