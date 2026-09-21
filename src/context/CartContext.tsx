import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useRef,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../context/AuthContext";

export interface CartItem {
  alat_id: number;
  alat_nama: string;
  alat_deskripsi?: string | null;
  alat_hargaperhari: number;
  alat_stok: number;
  alat_gambar?: string | null;
  alat_gambar_url?: string | null;
  jumlah: number;
  durasi: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => Promise<void>;
  removeFromCart: (alat_id: number) => Promise<void>;
  updateQuantity: (alat_id: number, jumlah: number) => Promise<void>;
  updateDuration: (alat_id: number, durasi: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartCount: () => number;
  getCartTotal: () => number;
  getItemSubtotal: (item: CartItem) => number;
  loadingCart: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_PREFIX = "@amanah_elektronik_cart_";

export function CartProvider({ children }: { children: ReactNode }) {
  const { pelanggan, loading: authLoading } = useAuth();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loadingCart, setLoadingCart] = useState(true);

  const activeUserIdRef = useRef<number | null>(null);
  const cartLoadedRef = useRef(false);

  const pelangganId = pelanggan?.pelanggan_id
    ? Number(pelanggan.pelanggan_id)
    : null;

  const getCartStorageKey = (userId: number) => {
    return `${CART_STORAGE_PREFIX}${userId}`;
  };

  useEffect(() => {
    let cancelled = false;

    const loadCartForUser = async () => {
      if (authLoading) {
        return;
      }

      if (!pelangganId) {
        activeUserIdRef.current = null;
        cartLoadedRef.current = false;

        if (!cancelled) {
          setCartItems([]);
          setLoadingCart(false);
        }

        return;
      }

      activeUserIdRef.current = pelangganId;
      cartLoadedRef.current = false;

      if (!cancelled) {
        setCartItems([]);
        setLoadingCart(true);
      }

      try {
        const storageKey = getCartStorageKey(pelangganId);
        const storedCart = await AsyncStorage.getItem(storageKey);

        if (cancelled || activeUserIdRef.current !== pelangganId) {
          return;
        }

        if (!storedCart) {
          setCartItems([]);
          return;
        }

        try {
          const parsedCart = JSON.parse(storedCart);

          if (Array.isArray(parsedCart)) {
            setCartItems(parsedCart);
          } else {
            setCartItems([]);
          }
        } catch (error) {
          console.error("PARSE CART ERROR:", error);
          setCartItems([]);
        }
      } catch (error) {
        console.error("LOAD CART ERROR:", error);

        if (!cancelled) {
          setCartItems([]);
        }
      } finally {
        if (!cancelled && activeUserIdRef.current === pelangganId) {
          cartLoadedRef.current = true;
          setLoadingCart(false);
        }
      }
    };

    loadCartForUser();

    return () => {
      cancelled = true;
    };
  }, [pelangganId, authLoading]);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!pelangganId) {
      return;
    }

    if (!cartLoadedRef.current) {
      return;
    }

    if (activeUserIdRef.current !== pelangganId) {
      return;
    }

    const saveCart = async () => {
      try {
        const storageKey = getCartStorageKey(pelangganId);

        await AsyncStorage.setItem(
          storageKey,
          JSON.stringify(cartItems),
        );
      } catch (error) {
        console.error("SAVE CART ERROR:", error);
      }
    };

    saveCart();
  }, [cartItems, pelangganId, authLoading]);

  const addToCart = async (item: CartItem) => {
    if (!pelangganId) {
      console.log("ADD CART: pelanggan belum tersedia.");
      return;
    }

    if (activeUserIdRef.current !== pelangganId) {
      console.log("ADD CART: user aktif tidak sesuai.");
      return;
    }

    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (cartItem) =>
          Number(cartItem.alat_id) === Number(item.alat_id),
      );

      if (existingItem) {
        return currentItems.map((cartItem) => {
          if (
            Number(cartItem.alat_id) !== Number(item.alat_id)
          ) {
            return cartItem;
          }

          const jumlahLama = Number(cartItem.jumlah) || 0;
          const jumlahTambah = Number(item.jumlah) || 1;
          const stok = Number(cartItem.alat_stok) || 0;

          const newJumlah = Math.min(
            jumlahLama + jumlahTambah,
            stok,
          );

          return {
            ...cartItem,
            jumlah: Math.max(1, newJumlah),
          };
        });
      }

      const stok = Number(item.alat_stok) || 0;
      const jumlah = Number(item.jumlah) || 1;

      if (stok <= 0) {
        return currentItems;
      }

      return [
        ...currentItems,
        {
          ...item,
          alat_id: Number(item.alat_id),
          alat_hargaperhari:
            Number(item.alat_hargaperhari) || 0,
          alat_stok: stok,
          jumlah: Math.min(
            Math.max(1, jumlah),
            stok,
          ),
          durasi: Math.max(
            1,
            Number(item.durasi) || 1,
          ),
        },
      ];
    });
  };

  const removeFromCart = async (alat_id: number) => {
    const userId = activeUserIdRef.current;

    console.log("================================");
    console.log("REMOVE CART DIPANGGIL");
    console.log("USER ID:", userId);
    console.log("ALAT ID:", alat_id);
    console.log("================================");

    if (!userId) {
      console.log("REMOVE CART GAGAL: user tidak tersedia.");
      return;
    }

    const targetId = Number(alat_id);

    const updatedItems = cartItems.filter(
      (item) => Number(item.alat_id) !== targetId,
    );

    console.log("CART SEBELUM:", cartItems);
    console.log("CART SESUDAH:", updatedItems);

    setCartItems(updatedItems);

    try {
      const storageKey = getCartStorageKey(userId);

      await AsyncStorage.setItem(
        storageKey,
        JSON.stringify(updatedItems),
      );

      console.log("CART BERHASIL DISIMPAN SETELAH HAPUS");
    } catch (error) {
      console.error("REMOVE CART STORAGE ERROR:", error);
    }
  };

  const updateQuantity = async (
    alat_id: number,
    jumlah: number,
  ) => {
    if (!pelangganId) {
      return;
    }

    if (activeUserIdRef.current !== pelangganId) {
      return;
    }

    const targetId = Number(alat_id);

    const updatedItems = cartItems.map((item) => {
      if (Number(item.alat_id) !== targetId) {
        return item;
      }

      const stok = Number(item.alat_stok) || 0;

      const safeJumlah = Math.max(
        1,
        Math.min(
          Number(jumlah) || 1,
          stok,
        ),
      );

      return {
        ...item,
        jumlah: safeJumlah,
      };
    });

    setCartItems(updatedItems);

    try {
      const storageKey = getCartStorageKey(pelangganId);

      await AsyncStorage.setItem(
        storageKey,
        JSON.stringify(updatedItems),
      );
    } catch (error) {
      console.error("UPDATE QUANTITY STORAGE ERROR:", error);
    }
  };

  const updateDuration = async (
    alat_id: number,
    durasi: number,
  ) => {
    if (!pelangganId) {
      return;
    }

    if (activeUserIdRef.current !== pelangganId) {
      return;
    }

    const targetId = Number(alat_id);

    const updatedItems = cartItems.map((item) => {
      if (Number(item.alat_id) !== targetId) {
        return item;
      }

      return {
        ...item,
        durasi: Math.max(
          1,
          Number(durasi) || 1,
        ),
      };
    });

    setCartItems(updatedItems);

    try {
      const storageKey = getCartStorageKey(pelangganId);

      await AsyncStorage.setItem(
        storageKey,
        JSON.stringify(updatedItems),
      );
    } catch (error) {
      console.error("UPDATE DURATION STORAGE ERROR:", error);
    }
  };

  const clearCart = async () => {
    const userId = activeUserIdRef.current;

    if (!userId) {
      setCartItems([]);
      return;
    }

    console.log("CLEAR CART USER:", userId);

    setCartItems([]);

    try {
      const storageKey = getCartStorageKey(userId);

      await AsyncStorage.removeItem(storageKey);

      console.log("CART BERHASIL DIKOSONGKAN");
    } catch (error) {
      console.error("CLEAR CART ERROR:", error);
    }
  };

  const getCartCount = () => {
    return cartItems.reduce(
      (total, item) =>
        total + Number(item.jumlah || 0),
      0,
    );
  };

  const getItemSubtotal = (item: CartItem) => {
    const harga =
      Number(item.alat_hargaperhari) || 0;

    const jumlah =
      Number(item.jumlah) || 0;

    const durasi =
      Number(item.durasi) || 1;

    return harga * jumlah * durasi;
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) =>
        total + getItemSubtotal(item),
      0,
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateDuration,
        clearCart,
        getCartCount,
        getCartTotal,
        getItemSubtotal,
        loadingCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart harus digunakan di dalam CartProvider.",
    );
  }

  return context;
}