import React from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

import { useRouter } from "expo-router";

import { Ionicons } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";

import { useCart } from "../context/CartContext";

import styles from "../styles/checkout.styles";

// ==========================================================
// COMPONENT
// ==========================================================

export default function Checkout() {
  const router = useRouter();

  const { cartItems, removeFromCart, updateQuantity, clearCart, loadingCart } =
    useCart();

  // ========================================================
  // FORMAT RUPIAH
  // ========================================================

  const formatRupiah = (value: number | string) => {
    const number = Number(value) || 0;

    return `Rp ${number.toLocaleString("id-ID")}`;
  };

  // ========================================================
  // HANDLE BACK
  // ========================================================

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace("/");
  };

  // ========================================================
  // REMOVE ITEM
  // ========================================================
  const handleRemove = (alat_id: number, alat_nama: string) => {
    Alert.alert(
      "Hapus Alat",
      `Apakah "${alat_nama}" ingin dihapus dari keranjang?`,
      [
        {
          text: "Batal",
          style: "cancel",
        },
        {
          text: "Hapus",
          style: "destructive",
          onPress: async () => {
            console.log("MULAI HAPUS:", alat_id, alat_nama);

            await removeFromCart(Number(alat_id));

            console.log("SELESAI HAPUS:", alat_id);
          },
        },
      ],
    );
  };

  // ========================================================
  // CLEAR CART
  // ========================================================

  const handleClearCart = () => {
    if (cartItems.length === 0) {
      return;
    }

    Alert.alert(
      "Kosongkan Keranjang",
      "Apakah semua alat ingin dihapus dari keranjang?",
      [
        {
          text: "Batal",
          style: "cancel",
        },
        {
          text: "Kosongkan",
          style: "destructive",
          onPress: async () => {
            try {
              await clearCart();
            } catch (error) {
              console.error("CLEAR CART ERROR:", error);

              Alert.alert("Gagal", "Keranjang gagal dikosongkan.");
            }
          },
        },
      ],
    );
  };

  // ========================================================
  // HANDLE CHECKOUT
  // ========================================================

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert("Keranjang Kosong", "Silakan pilih alat terlebih dahulu.");

      return;
    }

    router.push("/checkout-confirmation");
  };

  // ========================================================
  // TOTAL UNIT
  //
  // HANYA MENGHITUNG JUMLAH BARANG
  // TIDAK MENGHITUNG DURASI
  // ========================================================

  const totalUnit = cartItems.reduce(
    (total, item) => total + Number(item.jumlah || 0),
    0,
  );

  // ========================================================
  // LOADING
  // ========================================================

  if (loadingCart) {
    return (
      <View
        style={[
          styles.page,
          {
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <Text
          style={{
            color: "#FFFFFF",
          }}
        >
          Memuat keranjang...
        </Text>
      </View>
    );
  }

  // ========================================================
  // EMPTY CART
  // ========================================================

  if (cartItems.length === 0) {
    return (
      <View style={styles.page}>
        {/* BACKGROUND */}

        <LinearGradient
          colors={["#061B52", "#061743", "#041332", "#020D24"]}
          start={{
            x: 0,
            y: 0,
          }}
          end={{
            x: 1,
            y: 1,
          }}
          style={styles.background}
        />

        {/* EMPTY */}

        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon}>
            <Ionicons name="cart-outline" size={55} color="#247BFF" />
          </View>

          <Text style={styles.emptyTitle}>Keranjang Masih Kosong</Text>

          <Text style={styles.emptyText}>
            Pilih alat yang ingin Anda sewa dan tambahkan ke keranjang.
          </Text>

          <TouchableOpacity
            style={styles.emptyButton}
            activeOpacity={0.85}
            onPress={() => router.replace("/")}
          >
            <LinearGradient
              colors={["#08AEEA", "#0879D1", "#0751A8"]}
              start={{
                x: 0,
                y: 0,
              }}
              end={{
                x: 1,
                y: 0,
              }}
              style={styles.emptyButtonGradient}
            >
              <Ionicons name="arrow-back" size={20} color="#FFFFFF" />

              <Text style={styles.emptyButtonText}>Mulai Belanja</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // ========================================================
  // RENDER
  // ========================================================

  return (
    <View style={styles.page}>
      {/* ==================================================
          BACKGROUND
      ================================================== */}

      <LinearGradient
        colors={["#061B52", "#061743", "#041332", "#020D24"]}
        start={{
          x: 0,
          y: 0,
        }}
        end={{
          x: 1,
          y: 1,
        }}
        style={styles.background}
      />

      <View style={styles.circleTop} />

      <View style={styles.circleRight} />

      {/* ==================================================
          HEADER
      ================================================== */}

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.8}
          onPress={handleBack}
        >
          <Ionicons name="arrow-back" size={23} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Keranjang</Text>

          <Text style={styles.headerSubtitle}>
            {cartItems.length} jenis alat
          </Text>
        </View>

        {/* ==================================================
            CLEAR CART
        ================================================== */}

        {cartItems.length > 0 && (
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={handleClearCart}
            style={{
              padding: 8,
            }}
          >
            <Ionicons name="trash-outline" size={21} color="#EF4444" />
          </TouchableOpacity>
        )}
      </View>

      {/* ==================================================
          CART LIST
      ================================================== */}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {cartItems.map((item) => (
          <View key={String(item.alat_id)} style={styles.cartCard}>
            {/* ==================================================
                IMAGE
            ================================================== */}

            <View style={styles.imageContainer}>
              <Image
                source={
                  item.alat_gambar_url
                    ? {
                        uri: item.alat_gambar_url,
                      }
                    : require("../../assets/images/gambar.png")
                }
                style={styles.productImage}
                resizeMode="contain"
              />
            </View>

            {/* ==================================================
                INFO
            ================================================== */}

            <View style={styles.productInfo}>
              {/* ==================================================
                  PRODUCT NAME + REMOVE
              ================================================== */}

              <View style={styles.productTop}>
                <Text style={styles.productName} numberOfLines={2}>
                  {item.alat_nama}
                </Text>

                {/* ==================================================
                    DELETE BUTTON
                ================================================== */}

                <TouchableOpacity
                  style={styles.removeButton}
                  activeOpacity={0.6}
                  hitSlop={{
                    top: 15,
                    bottom: 15,
                    left: 15,
                    right: 15,
                  }}
                  onPress={() =>
                    handleRemove(Number(item.alat_id), item.alat_nama)
                  }
                >
                  <Ionicons name="trash-outline" size={20} color="#EF4444" />
                </TouchableOpacity>
              </View>

              {/* ==================================================
                  PRICE
              ================================================== */}

              <Text style={styles.productPrice}>
                {formatRupiah(item.alat_hargaperhari)}

                <Text style={styles.priceUnit}> / hari</Text>
              </Text>

              {/* ==================================================
                  JUMLAH
              ================================================== */}

              <View style={styles.controlRow}>
                <Text style={styles.controlLabel}>Jumlah</Text>

                <View style={styles.quantityControl}>
                  {/* MINUS */}

                  <TouchableOpacity
                    style={styles.quantityButton}
                    activeOpacity={0.7}
                    onPress={() =>
                      updateQuantity(item.alat_id, item.jumlah - 1)
                    }
                    disabled={item.jumlah <= 1}
                  >
                    <Ionicons
                      name="remove"
                      size={17}
                      color={item.jumlah <= 1 ? "#475569" : "#FFFFFF"}
                    />
                  </TouchableOpacity>

                  {/* VALUE */}

                  <Text style={styles.quantityText}>{item.jumlah}</Text>

                  {/* PLUS */}

                  <TouchableOpacity
                    style={styles.quantityButton}
                    activeOpacity={0.7}
                    onPress={() =>
                      updateQuantity(item.alat_id, item.jumlah + 1)
                    }
                    disabled={item.jumlah >= item.alat_stok}
                  >
                    <Ionicons
                      name="add"
                      size={17}
                      color={
                        item.jumlah >= item.alat_stok ? "#475569" : "#FFFFFF"
                      }
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* ==================================================
                  STOCK INFO
              ================================================== */}

              <Text
                style={{
                  marginTop: 6,
                  fontSize: 11,
                  color: "#7187A8",
                }}
              >
                Stok tersedia: {item.alat_stok} unit
              </Text>

              {/* ==================================================
                  PRICE INFO
              ================================================== */}

              <View
                style={{
                  marginTop: 10,
                  paddingTop: 10,
                  borderTopWidth: 1,
                  borderTopColor: "rgba(255,255,255,0.06)",
                }}
              >
                <Text
                  style={{
                    fontSize: 11,
                    color: "#7187A8",
                  }}
                >
                  Harga dihitung berdasarkan tanggal penyewaan
                </Text>
              </View>
            </View>
          </View>
        ))}

        {/* ==================================================
            CART SUMMARY
        ================================================== */}

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Ringkasan Keranjang</Text>

          {/* JENIS ALAT */}

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Jumlah jenis alat</Text>

            <Text style={styles.summaryValue}>{cartItems.length}</Text>
          </View>

          {/* TOTAL UNIT */}

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total unit</Text>

            <Text style={styles.summaryValue}>{totalUnit}</Text>
          </View>
        </View>

        {/* ==================================================
            CHECKOUT
        ================================================== */}

        <TouchableOpacity
          style={styles.checkoutButton}
          activeOpacity={0.85}
          onPress={handleCheckout}
        >
          <LinearGradient
            colors={["#08AEEA", "#0879D1", "#0751A8"]}
            start={{
              x: 0,
              y: 0,
            }}
            end={{
              x: 1,
              y: 0,
            }}
            style={styles.checkoutGradient}
          >
            <Text style={styles.checkoutText}>Lanjut ke Checkout</Text>

            <Ionicons name="arrow-forward" size={21} color="#FFFFFF" />
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
}
