import React, { useEffect, useMemo, useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Modal,
  Alert,
} from "react-native";

import { useRouter } from "expo-router";

import { Ionicons } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";

import styles from "../../styles/explore.styles";

import { useCart } from "../../context/CartContext";

import { getAlat, getKategori } from "../../services/alatService";

// ==========================================================
// TYPE
// ==========================================================

interface Kategori {
  kategori_id: number;
  kategori_nama: string;
}

interface Alat {
  alat_id: number;
  alat_kategori_id: number;
  alat_nama: string;
  alat_deskripsi?: string | null;
  alat_hargaperhari: number;
  alat_stok: number;
  alat_gambar?: string | null;
  alat_gambar_url?: string | null;

  kategori?: {
    kategori_id: number;
    kategori_nama: string;
  } | null;
}

// ==========================================================
// COMPONENT
// ==========================================================

export default function Explore() {
  const router = useRouter();

  const { getCartCount, addToCart, cartItems } = useCart();

  // ========================================================
  // STATE
  // ========================================================

  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] = useState<number | "Semua">(
    "Semua",
  );

  const [categories, setCategories] = useState<Kategori[]>([]);

  const [products, setProducts] = useState<Alat[]>([]);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<Alat | null>(null);

  const [detailModalVisible, setDetailModalVisible] = useState(false);

  const [cartNotification, setCartNotification] = useState(false);

  const [notificationProductName, setNotificationProductName] = useState("");

  // ========================================================
  // CATEGORY ICON
  // ========================================================

  const getCategoryIcon = (kategoriNama: string) => {
    const name = kategoriNama.toLowerCase();

    if (name.includes("kamera") || name.includes("camera")) {
      return "camera-outline";
    }

    if (name.includes("laptop") || name.includes("komputer")) {
      return "laptop-outline";
    }

    if (name.includes("drone")) {
      return "airplane-outline";
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

    if (name.includes("lampu") || name.includes("lighting")) {
      return "bulb-outline";
    }

    if (name.includes("printer")) {
      return "print-outline";
    }

    if (name.includes("tv") || name.includes("televisi")) {
      return "tv-outline";
    }

    return "cube-outline";
  };

  // ========================================================
  // LOAD DATA
  // ========================================================

  const loadData = async () => {
    try {
      setLoading(true);

      const [alatResponse, kategoriResponse] = await Promise.all([
        getAlat(),
        getKategori(),
      ]);

      console.log("ALAT RESPONSE:", alatResponse);

      console.log("KATEGORI RESPONSE:", kategoriResponse);

      if (alatResponse?.success && Array.isArray(alatResponse.data)) {
        setProducts(alatResponse.data);
      } else {
        setProducts([]);
      }

      if (kategoriResponse?.success && Array.isArray(kategoriResponse.data)) {
        setCategories(kategoriResponse.data);
      } else {
        setCategories([]);
      }
    } catch (error) {
      console.error("ERROR LOAD EXPLORE:", error);

      setProducts([]);
      setCategories([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ========================================================
  // REFRESH
  // ========================================================

  const handleRefresh = async () => {
    setRefreshing(true);

    await loadData();
  };

  // ========================================================
  // FILTER
  // ========================================================

  const filteredProducts = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchCategory =
        selectedCategory === "Semua" ||
        Number(product.alat_kategori_id) === Number(selectedCategory);

      const nama = product.alat_nama?.toLowerCase() || "";

      const deskripsi = product.alat_deskripsi?.toLowerCase() || "";

      const kategoriNama = product.kategori?.kategori_nama?.toLowerCase() || "";

      const matchSearch =
        nama.includes(keyword) ||
        deskripsi.includes(keyword) ||
        kategoriNama.includes(keyword);

      return matchCategory && matchSearch;
    });
  }, [products, search, selectedCategory]);

  // ========================================================
  // FORMAT HARGA
  // ========================================================

  const formatPrice = (price: number | string) => {
    return new Intl.NumberFormat("id-ID").format(Number(price) || 0);
  };

  const formatRupiah = (price: number | string) => {
    return `Rp ${formatPrice(price)}`;
  };

  // ========================================================
  // CATEGORY NAME
  // ========================================================

  const getCategoryName = (product: Alat) => {
    if (product.kategori?.kategori_nama) {
      return product.kategori.kategori_nama;
    }

    const category = categories.find(
      (item) => Number(item.kategori_id) === Number(product.alat_kategori_id),
    );

    return category?.kategori_nama || "Tanpa Kategori";
  };

  // ========================================================
  // IMAGE
  // ========================================================

  const getImageSource = (product: Alat) => {
    if (product.alat_gambar_url) {
      return {
        uri: product.alat_gambar_url,
      };
    }

    return require("../../../assets/images/gambar.png");
  };

  // ========================================================
  // OPEN DETAIL
  // ========================================================

  const openDetailModal = (product: Alat) => {
    setSelectedProduct(product);
    setDetailModalVisible(true);
  };

  // ========================================================
  // CLOSE DETAIL
  // ========================================================

  const closeDetailModal = () => {
    setDetailModalVisible(false);
    setSelectedProduct(null);
  };

  // ========================================================
  // CHECK CART
  // ========================================================

  const isProductInCart = (alatId: number) => {
    return cartItems.some((item) => Number(item.alat_id) === Number(alatId));
  };

  // ========================================================
  // ADD TO CART
  // ========================================================

  const handleAddToCart = () => {
    if (!selectedProduct) {
      return;
    }

    if (selectedProduct.alat_stok <= 0) {
      Alert.alert(
        "Stok Tidak Tersedia",
        "Alat ini sedang tidak tersedia untuk disewa.",
      );

      return;
    }

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

    addToCart({
      alat_id: selectedProduct.alat_id,

      alat_nama: selectedProduct.alat_nama,

      alat_deskripsi: selectedProduct.alat_deskripsi || "",

      alat_hargaperhari: selectedProduct.alat_hargaperhari,

      alat_stok: selectedProduct.alat_stok,

      alat_gambar: selectedProduct.alat_gambar,

      alat_gambar_url: selectedProduct.alat_gambar_url,

      jumlah: 1,

      durasi: 1,
    });

    setNotificationProductName(selectedProduct.alat_nama);

    setCartNotification(true);

    setTimeout(() => {
      setCartNotification(false);
    }, 2500);

    closeDetailModal();
  };

  // ========================================================
  // LOADING
  // ========================================================

  if (loading) {
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
        <ActivityIndicator size="large" color="#3D8CFF" />

        <Text
          style={{
            color: "#FFFFFF",
            marginTop: 15,
          }}
        >
          Memuat peralatan...
        </Text>
      </View>
    );
  }

  // ========================================================
  // RENDER
  // ========================================================

  return (
    <View style={styles.page}>
      <View pointerEvents="none" style={styles.backgroundCircleOne} />

      <View pointerEvents="none" style={styles.backgroundCircleTwo} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {/* HEADER */}

        <View style={styles.header}>
          <View>
            <Text style={styles.smallTitle}>Temukan Peralatan</Text>

            <Text style={styles.title}>Explore</Text>
          </View>

          <TouchableOpacity
            style={styles.cartButton}
            activeOpacity={0.8}
            onPress={() => router.push("/checkout")}
          >
            <Ionicons name="cart-outline" size={24} color="#FFFFFF" />

            {getCartCount() > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>
                  {getCartCount() > 99 ? "99+" : getCartCount()}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* SEARCH */}

        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={21} color="#8FA6CC" />

          <TextInput
            style={styles.searchInput}
            placeholder="Cari peralatan..."
            placeholderTextColor="#7F94B8"
            value={search}
            onChangeText={setSearch}
          />

          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")}>
              <Ionicons name="close-circle" size={20} color="#8FA6CC" />
            </TouchableOpacity>
          )}
        </View>

        {/* KATEGORI */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Kategori</Text>

          <Text style={styles.sectionCount}>{categories.length} kategori</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}
        >
          <TouchableOpacity
            style={[
              styles.categoryItem,
              selectedCategory === "Semua" && styles.categoryItemActive,
            ]}
            onPress={() => setSelectedCategory("Semua")}
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.categoryIcon,
                selectedCategory === "Semua" && styles.categoryIconActive,
              ]}
            >
              <Ionicons
                name="grid-outline"
                size={23}
                color={selectedCategory === "Semua" ? "#FFFFFF" : "#3D8CFF"}
              />
            </View>

            <Text
              style={[
                styles.categoryText,
                selectedCategory === "Semua" && styles.categoryTextActive,
              ]}
            >
              Semua
            </Text>
          </TouchableOpacity>

          {categories.map((category) => {
            const active =
              Number(selectedCategory) === Number(category.kategori_id);

            return (
              <TouchableOpacity
                key={category.kategori_id}
                style={[
                  styles.categoryItem,
                  active && styles.categoryItemActive,
                ]}
                onPress={() => setSelectedCategory(category.kategori_id)}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.categoryIcon,
                    active && styles.categoryIconActive,
                  ]}
                >
                  <Ionicons
                    name={getCategoryIcon(category.kategori_nama) as any}
                    size={23}
                    color={active ? "#FFFFFF" : "#3D8CFF"}
                  />
                </View>

                <Text
                  style={[
                    styles.categoryText,
                    active && styles.categoryTextActive,
                  ]}
                >
                  {category.kategori_nama}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* PRODUCT HEADER */}

        <View style={styles.sectionHeaderProduct}>
          <View>
            <Text style={styles.sectionTitle}>
              {selectedCategory === "Semua"
                ? "Semua Peralatan"
                : categories.find(
                    (category) =>
                      Number(category.kategori_id) === Number(selectedCategory),
                  )?.kategori_nama || "Peralatan"}
            </Text>

            <Text style={styles.resultText}>
              {filteredProducts.length} peralatan ditemukan
            </Text>
          </View>
        </View>

        {/* PRODUCT GRID */}

        <View style={styles.productGrid}>
          {filteredProducts.map((product) => {
            const available = Number(product.alat_stok) > 0;

            const categoryName = getCategoryName(product);

            return (
              <View key={product.alat_id} style={styles.productCard}>
                {/* IMAGE */}

                <View style={styles.productImageWrapper}>
                  <Image
                    source={getImageSource(product)}
                    style={styles.productImage}
                    resizeMode="contain"
                  />

                  <TouchableOpacity
                    style={styles.favoriteButton}
                    onPress={() => {}}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="heart-outline" size={20} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>

                {/* CATEGORY */}

                <Text style={styles.productCategory}>{categoryName}</Text>

                {/* NAME */}

                <Text style={styles.productName} numberOfLines={2}>
                  {product.alat_nama}
                </Text>

                {/* PRICE */}

                <View style={styles.priceRow}>
                  <Text style={styles.price}>
                    Rp {formatPrice(product.alat_hargaperhari)}
                  </Text>

                  <Text style={styles.priceUnit}>/hari</Text>
                </View>

                {/* STOCK */}

                <View style={styles.stockRow}>
                  <View
                    style={[
                      styles.stockDot,
                      !available && styles.stockDotEmpty,
                    ]}
                  />

                  <Text
                    style={[
                      styles.stockText,
                      !available && styles.stockTextEmpty,
                    ]}
                  >
                    {available
                      ? `Tersedia (${product.alat_stok})`
                      : "Tidak tersedia"}
                  </Text>
                </View>

                {/* DETAIL */}

                <TouchableOpacity
                  style={[
                    styles.detailButton,
                    !available && styles.detailButtonDisabled,
                  ]}
                  disabled={!available}
                  onPress={() => openDetailModal(product)}
                  activeOpacity={0.85}
                >
                  <Text style={styles.detailButtonText}>
                    {available ? "Detail" : "Tidak Tersedia"}
                  </Text>

                  {available && (
                    <Ionicons name="arrow-forward" size={17} color="#FFFFFF" />
                  )}
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        {/* EMPTY */}

        {filteredProducts.length === 0 && (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIcon}>
              <Ionicons name="search-outline" size={38} color="#3D8CFF" />
            </View>

            <Text style={styles.emptyTitle}>Alat tidak ditemukan</Text>

            <Text style={styles.emptyText}>
              Coba gunakan kata pencarian atau kategori lainnya.
            </Text>

            {(search.length > 0 || selectedCategory !== "Semua") && (
              <TouchableOpacity
                onPress={() => {
                  setSearch("");
                  setSelectedCategory("Semua");
                }}
                style={{
                  marginTop: 15,
                }}
              >
                <Text
                  style={{
                    color: "#3D8CFF",
                    fontWeight: "600",
                  }}
                >
                  Reset Pencarian
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* FOOTER */}

        <View style={styles.footer}>
          <Text style={styles.footerTitle}>Amanah Elektronik</Text>

          <Text style={styles.footerText}>Mudah • Aman • Terpercaya</Text>

          <Text style={styles.copyright}>© 2026 Amanah Elektronik</Text>
        </View>
      </ScrollView>

      {/* ================================================== */}
      {/* DETAIL MODAL */}
      {/* ================================================== */}

      <Modal
        visible={detailModalVisible}
        transparent
        animationType="slide"
        onRequestClose={closeDetailModal}
      >
        <View style={styles.detailModalOverlay}>
          <View style={styles.detailModalContainer}>
            {/* HEADER */}

            <View style={styles.detailModalHeader}>
              <Text style={styles.detailModalTitle}>Detail Alat</Text>

              <TouchableOpacity
                onPress={closeDetailModal}
                activeOpacity={0.8}
                style={styles.detailModalCloseButton}
              >
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* CONTENT */}

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.detailModalContent}
            >
              <View style={styles.detailModalImageContainer}>
                {selectedProduct && (
                  <Image
                    source={getImageSource(selectedProduct)}
                    style={styles.detailModalImage}
                    resizeMode="contain"
                  />
                )}
              </View>

              <Text style={styles.detailModalProductName}>
                {selectedProduct?.alat_nama || "-"}
              </Text>

              <View style={styles.detailModalCategory}>
                <Ionicons name="pricetag-outline" size={17} color="#60A5FA" />

                <Text style={styles.detailModalCategoryText}>
                  {selectedProduct
                    ? getCategoryName(selectedProduct)
                    : "Tidak ada kategori"}
                </Text>
              </View>

              <View style={styles.detailModalPriceContainer}>
                <Text style={styles.detailModalPriceLabel}>Harga sewa</Text>

                <Text style={styles.detailModalPrice}>
                  {selectedProduct
                    ? formatRupiah(selectedProduct.alat_hargaperhari)
                    : "Rp 0"}

                  <Text style={styles.detailModalPriceUnit}> / Hari</Text>
                </Text>
              </View>

              <View style={styles.detailModalStock}>
                <Ionicons
                  name={
                    selectedProduct && selectedProduct.alat_stok > 0
                      ? "checkmark-circle"
                      : "close-circle"
                  }
                  size={20}
                  color={
                    selectedProduct && selectedProduct.alat_stok > 0
                      ? "#22C55E"
                      : "#EF4444"
                  }
                />

                <Text style={styles.detailModalStockText}>
                  {selectedProduct && selectedProduct.alat_stok > 0
                    ? `Tersedia ${selectedProduct.alat_stok} unit`
                    : "Tidak tersedia"}
                </Text>
              </View>

              <View style={styles.detailModalDescription}>
                <Text style={styles.detailModalDescriptionTitle}>
                  Deskripsi
                </Text>

                <Text style={styles.detailModalDescriptionText}>
                  {selectedProduct?.alat_deskripsi ||
                    "Tidak ada deskripsi alat."}
                </Text>
              </View>
            </ScrollView>

            {/* FOOTER */}

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
                    isProductInCart(selectedProduct.alat_id)) &&
                    styles.detailModalCartButtonDisabled,
                ]}
              >
                <LinearGradient
                  colors={
                    selectedProduct && isProductInCart(selectedProduct.alat_id)
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
                  style={styles.detailModalCartButtonGradient}
                >
                  <Ionicons
                    name={
                      selectedProduct &&
                      isProductInCart(selectedProduct.alat_id)
                        ? "checkmark-circle-outline"
                        : "cart-outline"
                    }
                    size={22}
                    color="#FFFFFF"
                  />

                  <Text style={styles.detailModalCartButtonText}>
                    {selectedProduct && selectedProduct.alat_stok <= 0
                      ? "Stok Tidak Tersedia"
                      : selectedProduct &&
                          isProductInCart(selectedProduct.alat_id)
                        ? "Sudah di Keranjang"
                        : "Tambah ke Keranjang"}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* ================================================== */}
      {/* CART NOTIFICATION */}
      {/* ================================================== */}

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
          <Ionicons name="checkmark-circle" size={28} color="#FFFFFF" />

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
