import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Modal,
} from "react-native";

import { useRouter } from "expo-router";
import { useCart } from "../../context/CartContext";
import { Ionicons } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";

import styles from "../../styles/dashboard.styles";

import { getAlat, getKategori } from "../../services/dashboardService";

// ==========================================================
// TYPE DATA
// ==========================================================

interface Kategori {
  kategori_id: number;
  kategori_nama: string;
}

interface Alat {
  alat_id: number;
  alat_kategori_id: number;
  alat_nama: string;
  alat_deskripsi: string;
  alat_hargaperhari: number;
  alat_stok: number;

  alat_gambar?: string | null;
  alat_gambar_url?: string | null;

  kategori?: {
    kategori_id: number;
    kategori_nama: string;
  };
}

// ==========================================================
// HOME
// ==========================================================

export default function Home() {
  const router = useRouter();

  const { addToCart, getCartCount, cartItems } = useCart();

  const [categories, setCategories] = useState<Kategori[]>([]);
  const [products, setProducts] = useState<Alat[]>([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<Alat | null>(null);

  const [detailModalVisible, setDetailModalVisible] = useState(false);

  // ========================================================
  // NOTIFICATION
  // ========================================================

  const [cartNotification, setCartNotification] = useState(false);

  // Nama produk yang terakhir ditambahkan
  const [notificationProductName, setNotificationProductName] =
    useState("");

  // ========================================================
  // LOAD DATA
  // ========================================================

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      const [kategoriResponse, alatResponse] = await Promise.all([
        getKategori(),
        getAlat(),
      ]);

      console.log("KATEGORI RESPONSE:", kategoriResponse);
      console.log("ALAT RESPONSE:", alatResponse);

      // ======================================================
      // KATEGORI
      // ======================================================

      if (kategoriResponse?.success) {
        setCategories(kategoriResponse?.data || []);
      } else {
        setCategories([]);
      }

      // ======================================================
      // ALAT
      // ======================================================

      if (alatResponse?.success) {
        setProducts(alatResponse?.data || []);
      } else {
        setProducts([]);
      }
    } catch (error: any) {
      console.error("DASHBOARD ERROR:", error);
      console.error("DASHBOARD RESPONSE:", error?.response?.data);

      Alert.alert(
        "Gagal Memuat Data",
        error?.response?.data?.message ||
          "Data beranda tidak dapat diambil dari server.",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // ========================================================
  // USE EFFECT
  // ========================================================

  useEffect(() => {
    loadDashboardData();
  }, []);

  // ========================================================
  // FORMAT RUPIAH
  // ========================================================

  const formatRupiah = (value: number | string) => {
    const number = Number(value) || 0;

    return `Rp ${number.toLocaleString("id-ID")}`;
  };

  // ========================================================
  // CATEGORY ICON
  // ========================================================

  const getCategoryIcon = (categoryName: string) => {
    const name = categoryName.toLowerCase();

    if (name.includes("kamera") || name.includes("camera")) {
      return "camera-outline";
    }

    if (name.includes("laptop") || name.includes("komputer")) {
      return "laptop-outline";
    }

    if (name.includes("drone")) {
      return "paper-plane-outline";
    }

    if (
      name.includes("audio") ||
      name.includes("speaker") ||
      name.includes("sound")
    ) {
      return "headset-outline";
    }

    if (name.includes("proyektor") || name.includes("projector")) {
      return "videocam-outline";
    }

    if (name.includes("printer")) {
      return "print-outline";
    }

    if (name.includes("tv") || name.includes("televisi")) {
      return "tv-outline";
    }

    return "grid-outline";
  };

  // ========================================================
  // REFRESH
  // ========================================================

  const handleRefresh = () => {
    setRefreshing(true);

    loadDashboardData();
  };

  // ========================================================
  // PRODUCT IMAGE
  // ========================================================

  const getProductImage = (product: Alat) => {
    if (product.alat_gambar_url) {
      return {
        uri: product.alat_gambar_url,
      };
    }

    return require("../../../assets/images/gambar.png");
  };

  // ========================================================
  // BUKA DETAIL MODAL
  // ========================================================

  const openDetailModal = (product: Alat) => {
    setSelectedProduct(product);
    setDetailModalVisible(true);
  };

  // ========================================================
  // TUTUP DETAIL MODAL
  // ========================================================

  const closeDetailModal = () => {
    setDetailModalVisible(false);
    setSelectedProduct(null);
  };

  // ========================================================
  // CEK PRODUK SUDAH ADA DI KERANJANG
  // ========================================================

  const isProductInCart = (alatId: number) => {
    return cartItems.some((item) => item.alat_id === alatId);
  };

  // ========================================================
  // HANDLE ADD TO CART
  // ========================================================

  const handleAddToCart = () => {
    if (!selectedProduct) {
      return;
    }

    // ======================================================
    // CEK STOK
    // ======================================================

    if (selectedProduct.alat_stok <= 0) {
      Alert.alert(
        "Stok Tidak Tersedia",
        "Alat ini sedang tidak tersedia untuk disewa.",
      );

      return;
    }

    // ======================================================
    // CEK SUDAH ADA DI KERANJANG
    // ======================================================

    if (isProductInCart(selectedProduct.alat_id)) {
      Alert.alert(
        "Sudah Ada di Keranjang",
        `${selectedProduct.alat_nama} sudah ada di keranjang.`,
        [
          {
            text: "Lihat Keranjang",
            onPress: () => {
              closeDetailModal();

              router.push("/checkout");
            },
          },

          {
            text: "Tutup",
            style: "cancel",
          },
        ],
      );

      return;
    }

    // ======================================================
    // TAMBAHKAN KE KERANJANG
    // ======================================================

    addToCart({
      alat_id: selectedProduct.alat_id,

      alat_nama: selectedProduct.alat_nama,

      alat_deskripsi: selectedProduct.alat_deskripsi,

      alat_hargaperhari: selectedProduct.alat_hargaperhari,

      alat_stok: selectedProduct.alat_stok,

      alat_gambar: selectedProduct.alat_gambar,

      alat_gambar_url: selectedProduct.alat_gambar_url,

      jumlah: 1,

      durasi: 1,
    });

    // ======================================================
    // SIMPAN NAMA PRODUK UNTUK NOTIFICATION
    // ======================================================

    setNotificationProductName(selectedProduct.alat_nama);

    // ======================================================
    // TAMPILKAN NOTIFICATION
    // ======================================================

    setCartNotification(true);

    // ======================================================
    // NOTIFICATION HILANG OTOMATIS
    // ======================================================

    setTimeout(() => {
      setCartNotification(false);
    }, 2500);

    // ======================================================
    // MODAL DETAIL DITUTUP
    // ======================================================

    closeDetailModal();
  };

  // ========================================================
  // LOADING
  // ========================================================

  if (loading) {
    return (
      <View style={styles.page}>
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

        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#247BFF" />

          <Text style={styles.loadingText}>Memuat data...</Text>
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

      {/* ==================================================
          DECORATIVE CIRCLE
      ================================================== */}

      <View style={styles.circleTop} />

      <View style={styles.circleRight} />

      {/* ==================================================
          CONTENT
      ================================================== */}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      >
        {/* ==================================================
            HEADER
        ================================================== */}

        <View style={styles.header}>
          <View>
            <Text style={styles.username}>Welcome</Text>

            <Text style={styles.company}>Amanah Elektronik</Text>
          </View>

          <View style={styles.headerActions}>
            {/* NOTIFICATION */}

            <TouchableOpacity style={styles.iconButton} activeOpacity={0.8}>
              <Ionicons
                name="notifications-outline"
                size={25}
                color="#FFFFFF"
              />

              <View style={styles.notificationDot} />
            </TouchableOpacity>

            {/* CART */}

            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => router.push("/checkout")}
              activeOpacity={0.8}
            >
              <Ionicons name="cart-outline" size={27} color="#FFFFFF" />

              <View style={styles.cartBadge}>
                <Text style={styles.badgeText}>{getCartCount()}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* ==================================================
            PROMO BANNER
        ================================================== */}

        <View style={styles.promoContainer}>
          <LinearGradient
            colors={["#123E9B", "#0B3182", "#092762"]}
            start={{
              x: 0,
              y: 0,
            }}
            end={{
              x: 1,
              y: 1,
            }}
            style={styles.promoGradient}
          >
            <View style={styles.promoContent}>
              <View style={styles.promoTextContainer}>
                <View style={styles.promoLabel}>
                  <Text style={styles.promoLabelText}>🎉 Promo Hari Ini</Text>
                </View>

                <Text style={styles.promoTitleSmall}>Diskon Rental</Text>

                <Text style={styles.promoTitle}>
                  Kamera <Text style={styles.promoDiscount}>20%</Text>
                </Text>

                <Text style={styles.promoDescription}>
                  Berlaku sampai akhir bulan
                </Text>

                <TouchableOpacity
                  style={styles.promoButton}
                  onPress={() => router.push("/explore")}
                  activeOpacity={0.8}
                >
                  <Text style={styles.promoButtonText}>Sewa Sekarang</Text>

                  <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </View>

              <View style={styles.promoImageWrapper}>
                <Image
                  source={require("../../../assets/images/gambar.png")}
                  style={styles.promoImage}
                  resizeMode="contain"
                />
              </View>
            </View>
          </LinearGradient>

          <View style={styles.sliderDots}>
            <View style={styles.dot} />

            <View style={[styles.dot, styles.activeDot]} />

            <View style={styles.dot} />
          </View>
        </View>

        {/* ==================================================
            CATEGORY
        ================================================== */}

        <View style={styles.categorySection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScroll}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.kategori_id}
                style={styles.categoryItem}
                onPress={() => router.push("/explore")}
                activeOpacity={0.8}
              >
                <View style={styles.categoryIcon}>
                  <Ionicons
                    name={getCategoryIcon(category.kategori_nama) as any}
                    size={29}
                    color="#247BFF"
                  />
                </View>

                <Text style={styles.categoryText}>
                  {category.kategori_nama}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ==================================================
            REKOMENDASI HEADER
        ================================================== */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Rekomendasi</Text>

          <TouchableOpacity
            onPress={() => router.push("/explore")}
            activeOpacity={0.7}
          >
            <View style={styles.seeAll}>
              <Text style={styles.seeAllText}>Lihat Semua</Text>

              <Ionicons name="chevron-forward" size={18} color="#247BFF" />
            </View>
          </TouchableOpacity>
        </View>

        {/* ==================================================
            PRODUCT LIST
        ================================================== */}

        {products.length === 0 ? (
          <View style={styles.emptyProductContainer}>
            <Ionicons name="cube-outline" size={45} color="#64748B" />

            <Text style={styles.emptyProductText}>
              Belum ada alat tersedia
            </Text>
          </View>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productScroll}
          >
            {products.map((product) => (
              <View key={product.alat_id} style={styles.productCard}>
                {/* FAVORITE */}

                <TouchableOpacity
                  style={styles.favoriteButton}
                  activeOpacity={0.8}
                >
                  <Ionicons name="heart-outline" size={23} color="#FFFFFF" />
                </TouchableOpacity>

                {/* PRODUCT IMAGE */}

                <View style={styles.productImageWrapper}>
                  <Image
                    source={getProductImage(product)}
                    style={styles.productImage}
                    resizeMode="contain"
                  />
                </View>

                {/* PRODUCT INFO */}

                <Text style={styles.productName} numberOfLines={1}>
                  {product.alat_nama}
                </Text>

                <Text style={styles.productPrice}>
                  {formatRupiah(product.alat_hargaperhari)}
                  /Hari
                </Text>

                {/* STOCK */}

                <View style={styles.stockContainer}>
                  <View
                    style={[
                      styles.stockDot,
                      product.alat_stok <= 0 && styles.stockDotEmpty,
                    ]}
                  />

                  <Text style={styles.stockText}>
                    {product.alat_stok > 0
                      ? `Tersedia (${product.alat_stok})`
                      : "Tidak tersedia"}
                  </Text>
                </View>

                {/* DETAIL */}

                <TouchableOpacity
                  style={styles.detailButton}
                  onPress={() => openDetailModal(product)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.detailButtonText}>Detail</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        )}

        {/* ==================================================
            DISCOUNT CARD
        ================================================== */}

        <View style={styles.discountCard}>
          <View style={styles.discountIcon}>
            <Ionicons name="gift-outline" size={32} color="#FFFFFF" />
          </View>

          <View style={styles.discountInfo}>
            <Text style={styles.discountTitle}>
              Dapatkan Diskon Spesial
            </Text>

            <Text style={styles.discountText}>
              Sewa lebih lama, harga lebih hemat!
            </Text>
          </View>

          <TouchableOpacity
            style={styles.discountButton}
            onPress={() => router.push("/explore")}
            activeOpacity={0.8}
          >
            <Text style={styles.discountButtonText}>Cek Promo</Text>

            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* ==================================================
            KEUNGGULAN
        ================================================== */}

        <View style={styles.sectionHeaderSimple}>
          <Text style={styles.sectionTitle}>Keunggulan Kami</Text>
        </View>

        <View style={styles.featureGrid}>
          <View style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Ionicons name="shield-checkmark" size={32} color="#247BFF" />
            </View>

            <Text style={styles.featureTitle}>Produk Berkualitas</Text>

            <Text style={styles.featureText}>
              Barang terawat dan terjamin
            </Text>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Ionicons name="time-outline" size={32} color="#247BFF" />
            </View>

            <Text style={styles.featureTitle}>Sewa Fleksibel</Text>

            <Text style={styles.featureText}>
              Sewa harian sampai bulanan
            </Text>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Ionicons name="car-outline" size={32} color="#247BFF" />
            </View>

            <Text style={styles.featureTitle}>Pengiriman Cepat</Text>

            <Text style={styles.featureText}>
              Antar ke seluruh Indonesia
            </Text>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Ionicons name="headset" size={32} color="#247BFF" />
            </View>

            <Text style={styles.featureTitle}>Layanan 24/7</Text>

            <Text style={styles.featureText}>
              Customer service siap membantu
            </Text>
          </View>
        </View>

        {/* ==================================================
            FOOTER
        ================================================== */}

        <View style={styles.footer}>
          <Text style={styles.footerTitle}>Amanah Elektronik</Text>

          <Text style={styles.footerText}>
            Mudah • Aman • Terpercaya
          </Text>

          <Text style={styles.copyright}>
            © 2026 Amanah Elektronik
          </Text>
        </View>
      </ScrollView>

      {/* ==================================================
          DETAIL MODAL
      ================================================== */}

      <Modal
        visible={detailModalVisible}
        transparent
        animationType="slide"
        onRequestClose={closeDetailModal}
      >
        <View style={styles.detailModalOverlay}>
          <View style={styles.detailModalContainer}>
            {/* ==================================================
                HEADER
            ================================================== */}

            <View style={styles.detailModalHeader}>
              <Text style={styles.detailModalTitle}>
                Detail Alat
              </Text>

              <TouchableOpacity
                onPress={closeDetailModal}
                activeOpacity={0.8}
                style={styles.detailModalCloseButton}
              >
                <Ionicons
                  name="close"
                  size={24}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            </View>

            {/* ==================================================
                CONTENT
            ================================================== */}

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.detailModalContent}
            >
              {/* PRODUCT IMAGE */}

              <View style={styles.detailModalImageContainer}>
                {selectedProduct && (
                  <Image
                    source={getProductImage(selectedProduct)}
                    style={styles.detailModalImage}
                    resizeMode="contain"
                  />
                )}
              </View>

              {/* PRODUCT NAME */}

              <Text style={styles.detailModalProductName}>
                {selectedProduct?.alat_nama || "-"}
              </Text>

              {/* CATEGORY */}

              <View style={styles.detailModalCategory}>
                <Ionicons
                  name="pricetag-outline"
                  size={17}
                  color="#60A5FA"
                />

                <Text style={styles.detailModalCategoryText}>
                  {selectedProduct?.kategori?.kategori_nama ||
                    "Tidak ada kategori"}
                </Text>
              </View>

              {/* PRICE */}

              <View style={styles.detailModalPriceContainer}>
                <Text style={styles.detailModalPriceLabel}>
                  Harga sewa
                </Text>

                <Text style={styles.detailModalPrice}>
                  {selectedProduct
                    ? formatRupiah(
                        selectedProduct.alat_hargaperhari,
                      )
                    : "Rp 0"}

                  <Text style={styles.detailModalPriceUnit}>
                    {" "}
                    / Hari
                  </Text>
                </Text>
              </View>

              {/* STOCK */}

              <View style={styles.detailModalStock}>
                <Ionicons
                  name={
                    selectedProduct &&
                    selectedProduct.alat_stok > 0
                      ? "checkmark-circle"
                      : "close-circle"
                  }
                  size={20}
                  color={
                    selectedProduct &&
                    selectedProduct.alat_stok > 0
                      ? "#22C55E"
                      : "#EF4444"
                  }
                />

                <Text style={styles.detailModalStockText}>
                  {selectedProduct &&
                  selectedProduct.alat_stok > 0
                    ? `Tersedia ${selectedProduct.alat_stok} unit`
                    : "Tidak tersedia"}
                </Text>
              </View>

              {/* DESCRIPTION */}

              <View style={styles.detailModalDescription}>
                <Text
                  style={styles.detailModalDescriptionTitle}
                >
                  Deskripsi
                </Text>

                <Text
                  style={styles.detailModalDescriptionText}
                >
                  {selectedProduct?.alat_deskripsi ||
                    "Tidak ada deskripsi alat."}
                </Text>
              </View>
            </ScrollView>

            {/* ==================================================
                FOOTER / ADD TO CART
            ================================================== */}

            <View style={styles.detailModalFooter}>
              <TouchableOpacity
                onPress={handleAddToCart}
                disabled={
                  !selectedProduct ||
                  selectedProduct.alat_stok <= 0 ||
                  isProductInCart(selectedProduct.alat_id)
                }
                activeOpacity={0.85}
                style={[
                  styles.detailModalCartButton,

                  (!selectedProduct ||
                    selectedProduct.alat_stok <= 0 ||
                    isProductInCart(
                      selectedProduct.alat_id,
                    )) &&
                    styles.detailModalCartButtonDisabled,
                ]}
              >
                <LinearGradient
                  colors={
                    selectedProduct &&
                    isProductInCart(
                      selectedProduct.alat_id,
                    )
                      ? ["#64748B", "#475569"]
                      : ["#08AEEA", "#0879D1", "#0751A8"]
                  }
                  start={{
                    x: 0,
                    y: 0,
                  }}
                  end={{
                    x: 1,
                    y: 0,
                  }}
                  style={
                    styles.detailModalCartButtonGradient
                  }
                >
                  <Ionicons
                    name={
                      selectedProduct &&
                      isProductInCart(
                        selectedProduct.alat_id,
                      )
                        ? "checkmark-circle-outline"
                        : "cart-outline"
                    }
                    size={22}
                    color="#FFFFFF"
                  />

                  <Text
                    style={
                      styles.detailModalCartButtonText
                    }
                  >
                    {selectedProduct &&
                    selectedProduct.alat_stok <= 0
                      ? "Stok Tidak Tersedia"
                      : selectedProduct &&
                          isProductInCart(
                            selectedProduct.alat_id,
                          )
                        ? "Sudah di Keranjang"
                        : "Tambah ke Keranjang"}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* ==================================================
          CART SUCCESS NOTIFICATION
      ================================================== */}

      {cartNotification && (
        <View
          style={{
            position: "absolute",
            top: 60,
            left: 20,
            right: 20,
            zIndex: 9999,

            backgroundColor: "#0F766E",

            borderRadius: 14,

            paddingVertical: 14,
            paddingHorizontal: 16,

            flexDirection: "row",
            alignItems: "center",

            elevation: 10,

            shadowColor: "#000",

            shadowOffset: {
              width: 0,
              height: 4,
            },

            shadowOpacity: 0.25,

            shadowRadius: 8,
          }}
        >
          {/* ICON */}

          <Ionicons
            name="checkmark-circle"
            size={28}
            color="#FFFFFF"
          />

          {/* TEXT */}

          <View
            style={{
              marginLeft: 12,
              flex: 1,
            }}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 15,
                fontWeight: "700",
              }}
            >
              Berhasil ditambahkan
            </Text>

            <Text
              style={{
                color: "#D1FAE5",
                fontSize: 13,
                marginTop: 2,
              }}
              numberOfLines={1}
            >
              {notificationProductName} masuk ke keranjang
            </Text>
          </View>

          {/* LIHAT KERANJANG */}

          <TouchableOpacity
            onPress={() => {
              setCartNotification(false);

              router.push("/checkout");
            }}
            activeOpacity={0.7}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 13,
                fontWeight: "700",
              }}
            >
              Lihat
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}