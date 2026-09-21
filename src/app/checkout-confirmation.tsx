import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  TextInput,
  ActivityIndicator,
  Platform,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

import styles from "../styles/checkout-confirmation.styles";

// ==========================================================
// COMPONENT
// ==========================================================

export default function CheckoutConfirmation() {
  const router = useRouter();

  const { cartItems, loadingCart, clearCart } = useCart();

  const { pelanggan, loading: loadingAuth } = useAuth();

  const [tanggalSewa, setTanggalSewa] = useState<Date | null>(null);
  const [tanggalKembali, setTanggalKembali] = useState<Date | null>(null);

  // ========================================================
  // DATE PICKER NATIVE
  // ========================================================

  const [showDatePicker, setShowDatePicker] = useState(false);

  const [pickerType, setPickerType] = useState<
    "tanggalSewa" | "tanggalKembali" | null
  >(null);

  const [tempTanggal, setTempTanggal] = useState<Date>(new Date());

  const [alamatTransaksi, setAlamatTransaksi] = useState("");
  const [tempAlamat, setTempAlamat] = useState("");

  const [showAlamatModal, setShowAlamatModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [isCreatingRental, setIsCreatingRental] = useState(false);

  // ========================================================
  // INIT ALAMAT DARI PROFILE
  // ========================================================

  React.useEffect(() => {
    if (pelanggan && alamatTransaksi === "") {
      setAlamatTransaksi(pelanggan.pelanggan_alamat || "");
    }
  }, [pelanggan, alamatTransaksi]);

  // ========================================================
  // FORMAT RUPIAH
  // ========================================================

  const formatRupiah = (value: number | string) => {
    const number = Number(value) || 0;

    return `Rp ${number.toLocaleString("id-ID")}`;
  };

  // ========================================================
  // NORMALIZE DATE
  // ========================================================

  const normalizeDate = (date: Date) => {
    const normalized = new Date(date);

    normalized.setHours(0, 0, 0, 0);

    return normalized;
  };

  const today = useMemo(() => {
    return normalizeDate(new Date());
  }, []);

  // ========================================================
  // FORMAT DATE INPUT
  // ========================================================

  const formatDateInput = (date: Date | null) => {
    if (!date) {
      return "";
    }

    const year = date.getFullYear();

    const month = String(date.getMonth() + 1).padStart(2, "0");

    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // ========================================================
  // PARSE DATE INPUT
  // ========================================================

  const parseDateInput = (value: string) => {
    if (!value) {
      return null;
    }

    const [year, month, day] = value.split("-").map(Number);

    const date = new Date(year, month - 1, day);

    return normalizeDate(date);
  };

  // ========================================================
  // FORMAT TANGGAL
  // ========================================================

  const formatTanggal = (date: Date | null) => {
    if (!date) {
      return "Belum dipilih";
    }

    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // ========================================================
  // FORMAT DATE API
  // ========================================================

  const formatDateForApi = (date: Date) => {
    const year = date.getFullYear();

    const month = String(date.getMonth() + 1).padStart(2, "0");

    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // ========================================================
  // TOTAL UNIT
  // ========================================================

  const totalUnit = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + Number(item.jumlah || 0),
      0,
    );
  }, [cartItems]);

  // ========================================================
  // DURASI PENYEWAAN
  // ========================================================

  const durasiPenyewaan = useMemo(() => {
    if (!tanggalSewa || !tanggalKembali) {
      return null;
    }

    const start = normalizeDate(tanggalSewa);

    const end = normalizeDate(tanggalKembali);

    const difference = end.getTime() - start.getTime();

    const days = Math.floor(difference / (1000 * 60 * 60 * 24)) + 1;

    return Math.max(days, 1);
  }, [tanggalSewa, tanggalKembali]);

  // ========================================================
  // SUBTOTAL ITEM
  // ========================================================

  const getRentalSubtotal = (item: any) => {
    if (!durasiPenyewaan) {
      return 0;
    }

    const hargaPerHari = Number(item.alat_hargaperhari) || 0;

    const jumlah = Number(item.jumlah) || 0;

    return hargaPerHari * jumlah * durasiPenyewaan;
  };

  // ========================================================
  // TOTAL PENYEWAAN
  // ========================================================

  const totalPenyewaan = useMemo(() => {
    if (!durasiPenyewaan) {
      return 0;
    }

    return cartItems.reduce(
      (total, item) => total + getRentalSubtotal(item),
      0,
    );
  }, [cartItems, durasiPenyewaan]);

  // ========================================================
  // HANDLE TANGGAL SEWA
  // ========================================================

  const handleTanggalSewa = (value: string) => {
    const selected = parseDateInput(value);

    if (!selected) {
      setTanggalSewa(null);
      return;
    }

    if (selected < today) {
      Alert.alert(
        "Tanggal Tidak Valid",
        "Tanggal sewa tidak boleh sebelum hari ini.",
      );

      return;
    }

    setTanggalSewa(selected);

    if (tanggalKembali && normalizeDate(tanggalKembali) < selected) {
      setTanggalKembali(null);
    }
  };

  // ========================================================
  // HANDLE TANGGAL KEMBALI
  // ========================================================

  const handleTanggalKembali = (value: string) => {
    const selected = parseDateInput(value);

    if (!selected) {
      setTanggalKembali(null);
      return;
    }

    if (!tanggalSewa) {
      Alert.alert(
        "Pilih Tanggal Sewa",
        "Silakan pilih tanggal sewa terlebih dahulu.",
      );

      return;
    }

    const start = normalizeDate(tanggalSewa);

    if (selected < start) {
      Alert.alert(
        "Tanggal Tidak Valid",
        "Tanggal kembali tidak boleh lebih awal dari tanggal sewa.",
      );

      return;
    }

    setTanggalKembali(selected);
  };

  // ========================================================
  // BUKA DATE PICKER NATIVE
  // ========================================================

  const openNativeDatePicker = (type: "tanggalSewa" | "tanggalKembali") => {
    let initialDate = new Date();

    if (type === "tanggalSewa") {
      initialDate = tanggalSewa || today;
    }

    if (type === "tanggalKembali") {
      initialDate = tanggalKembali || tanggalSewa || today;
    }

    setPickerType(type);
    setTempTanggal(normalizeDate(initialDate));
    setShowDatePicker(true);
  };

  // ========================================================
  // HANDLE DATE PICKER NATIVE
  // ========================================================

  const handleNativeDateChange = (event: any, selectedDate?: Date) => {
    // Android menutup picker setelah tanggal dipilih
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }

    // User menekan Cancel
    if (event?.type === "dismissed") {
      setShowDatePicker(false);
      return;
    }

    if (!selectedDate || !pickerType) {
      return;
    }

    const selected = normalizeDate(selectedDate);

    // ------------------------------------------------------
    // TANGGAL SEWA
    // ------------------------------------------------------

    if (pickerType === "tanggalSewa") {
      if (selected < today) {
        Alert.alert(
          "Tanggal Tidak Valid",
          "Tanggal sewa tidak boleh sebelum hari ini.",
        );

        return;
      }

      setTanggalSewa(selected);

      // Jika tanggal kembali menjadi lebih awal
      // dari tanggal sewa baru, reset tanggal kembali.
      if (tanggalKembali && normalizeDate(tanggalKembali) < selected) {
        setTanggalKembali(null);
      }
    }

    // ------------------------------------------------------
    // TANGGAL KEMBALI
    // ------------------------------------------------------

    if (pickerType === "tanggalKembali") {
      if (!tanggalSewa) {
        Alert.alert(
          "Pilih Tanggal Sewa",
          "Silakan pilih tanggal sewa terlebih dahulu.",
        );

        return;
      }

      const start = normalizeDate(tanggalSewa);

      if (selected < start) {
        Alert.alert(
          "Tanggal Tidak Valid",
          "Tanggal kembali tidak boleh lebih awal dari tanggal sewa.",
        );

        return;
      }

      setTanggalKembali(selected);
    }

    setTempTanggal(selected);

    // Untuk iOS, tutup setelah memilih
    if (Platform.OS === "ios") {
      setShowDatePicker(false);
    }
  };

  // ========================================================
  // BUKA MODAL ALAMAT
  // ========================================================

  const openEditAlamat = () => {
    setTempAlamat(alamatTransaksi || pelanggan?.pelanggan_alamat || "");

    setShowAlamatModal(true);
  };

  // ========================================================
  // BATAL EDIT ALAMAT
  // ========================================================

  const cancelEditAlamat = () => {
    setTempAlamat("");

    setShowAlamatModal(false);
  };

  // ========================================================
  // SIMPAN ALAMAT
  // ========================================================

  const saveAlamat = () => {
    const alamat = tempAlamat.trim();

    if (!alamat) {
      Alert.alert(
        "Alamat Belum Diisi",
        "Silakan masukkan alamat penggunaan alat terlebih dahulu.",
      );

      return;
    }

    setAlamatTransaksi(alamat);

    setTempAlamat("");

    setShowAlamatModal(false);
  };

  // ========================================================
  // HANDLE BACK
  // ========================================================

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace("/checkout");
  };

  // ========================================================
  // SUBMIT RENTAL
  // ========================================================

  const submitRental = async () => {
    if (!pelanggan || !tanggalSewa || !tanggalKembali || !durasiPenyewaan) {
      return;
    }

    try {
      setIsCreatingRental(true);

      const payload = {
        tanggal_sewa: formatDateForApi(tanggalSewa),

        tanggal_kembali: formatDateForApi(tanggalKembali),

        detail: cartItems.map((item) => ({
          alat_id: Number(item.alat_id),
          jumlah: Number(item.jumlah),
        })),
      };

      console.log("================================");
      console.log("SUBMIT PENYEWAAN");
      console.log("PAYLOAD:");
      console.log(JSON.stringify(payload, null, 2));
      console.log("================================");

      const response = await api.post("/auth/pelanggan/penyewaan", payload);

      console.log("RESPONSE PENYEWAAN:");
      console.log(response.data);

      if (response.data?.success === false) {
        throw new Error(response.data?.message || "Penyewaan gagal dibuat.");
      }

      await clearCart();

      setShowConfirmModal(false);

      router.replace("/(tabs)/riwayat");
    } catch (error: any) {
      console.error("================================");
      console.error("CREATE RENTAL ERROR:");
      console.error(error?.response?.data || error);
      console.error("================================");

      let message = "Terjadi kesalahan saat membuat penyewaan.";

      if (error?.response?.data?.errors) {
        const errors = error.response.data.errors;

        const errorMessages = Object.values(errors)
          .flat()
          .map((item: any) => String(item))
          .join("\n");

        message = errorMessages;
      } else if (error?.response?.data?.message) {
        message = error.response.data.message;
      } else if (error?.message === "Network Error") {
        message =
          "Tidak dapat terhubung ke server. Pastikan Laravel API sedang berjalan.";
      }

      setShowConfirmModal(false);

      Alert.alert("Penyewaan Gagal", message);
    } finally {
      setIsCreatingRental(false);
    }
  };

  // ========================================================
  // HANDLE CREATE RENTAL
  // ========================================================

  const handleCreateRental = () => {
    console.log("========== BUTTON BUAT PENYEWAAN DIKLIK ==========");

    console.log("cartItems:", cartItems);
    console.log("pelanggan:", pelanggan);
    console.log("alamatTransaksi:", alamatTransaksi);
    console.log("tanggalSewa:", tanggalSewa);
    console.log("tanggalKembali:", tanggalKembali);
    console.log("durasiPenyewaan:", durasiPenyewaan);
    console.log("totalPenyewaan:", totalPenyewaan);
    console.log("isCreatingRental:", isCreatingRental);

    if (isCreatingRental) {
      console.log("STOP: sedang membuat penyewaan");

      return;
    }

    if (cartItems.length === 0) {
      console.log("STOP: cart kosong");

      Alert.alert(
        "Keranjang Kosong",
        "Tidak ada alat yang dapat diproses untuk checkout.",
      );

      router.replace("/checkout");

      return;
    }

    if (!pelanggan) {
      console.log("STOP: pelanggan tidak tersedia");

      Alert.alert(
        "Data Pelanggan Tidak Ditemukan",
        "Data akun pelanggan belum tersedia. Silakan login kembali.",
      );

      return;
    }

    if (!pelanggan.pelanggan_nama?.trim()) {
      console.log("STOP: nama pelanggan kosong");

      Alert.alert(
        "Data Pelanggan Tidak Lengkap",
        "Nama pelanggan tidak tersedia.",
      );

      return;
    }

    if (!pelanggan.pelanggan_id) {
      console.log("STOP: pelanggan_id tidak tersedia");

      Alert.alert(
        "Data Pelanggan Tidak Valid",
        "ID pelanggan tidak ditemukan. Silakan login kembali.",
      );

      return;
    }

    if (!alamatTransaksi.trim()) {
      console.log("STOP: alamat kosong");

      Alert.alert(
        "Alamat Belum Tersedia",
        "Silakan lengkapi alamat penggunaan alat terlebih dahulu.",
      );

      return;
    }

    if (!tanggalSewa) {
      console.log("STOP: tanggal sewa belum dipilih");

      Alert.alert(
        "Tanggal Sewa Belum Dipilih",
        "Silakan pilih tanggal sewa terlebih dahulu.",
      );

      return;
    }

    if (!tanggalKembali) {
      console.log("STOP: tanggal kembali belum dipilih");

      Alert.alert(
        "Tanggal Kembali Belum Dipilih",
        "Silakan pilih tanggal kembali terlebih dahulu.",
      );

      return;
    }

    if (!durasiPenyewaan) {
      console.log("STOP: durasi tidak tersedia");

      Alert.alert(
        "Periode Belum Lengkap",
        "Silakan tentukan tanggal sewa dan tanggal kembali.",
      );

      return;
    }

    const start = normalizeDate(tanggalSewa);

    const end = normalizeDate(tanggalKembali);

    if (end < start) {
      Alert.alert(
        "Tanggal Tidak Valid",
        "Tanggal kembali harus sama atau setelah tanggal sewa.",
      );

      return;
    }

    console.log("SEMUA VALIDASI LOLOS");

    console.log("MEMBUKA MODAL KONFIRMASI");

    setShowConfirmModal(true);
  };

  // ========================================================
  // LOADING
  // ========================================================

  if (loadingCart || loadingAuth) {
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
        <ActivityIndicator size="large" color="#08AEEA" />

        <Text style={styles.loadingText}>Memuat data checkout...</Text>
      </View>
    );
  }

  // ========================================================
  // EMPTY CART
  // ========================================================

  if (cartItems.length === 0) {
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

        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon}>
            <Ionicons name="cart-outline" size={55} color="#247BFF" />
          </View>

          <Text style={styles.emptyTitle}>Keranjang Kosong</Text>

          <Text style={styles.emptyText}>
            Tidak ada alat yang dapat diproses untuk checkout.
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

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.8}
          onPress={handleBack}
        >
          <Ionicons name="arrow-back" size={23} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Konfirmasi Penyewaan</Text>

          <Text style={styles.headerSubtitle}>
            Lengkapi data penyewaan Anda
          </Text>
        </View>
      </View>

      {/* ================================================= */}
      {/* CONTENT */}
      {/* ================================================= */}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* STEP */}

        <View style={styles.stepContainer}>
          <View style={styles.stepItem}>
            <View style={styles.stepActive}>
              <Ionicons name="cart" size={17} color="#FFFFFF" />
            </View>

            <Text style={styles.stepActiveText}>Keranjang</Text>
          </View>

          <View style={styles.stepLineActive} />

          <View style={styles.stepItem}>
            <View style={styles.stepActive}>
              <Ionicons name="checkmark" size={17} color="#FFFFFF" />
            </View>

            <Text style={styles.stepActiveText}>Checkout</Text>
          </View>

          <View style={styles.stepLine} />

          <View style={styles.stepItem}>
            <View style={styles.stepInactive}>
              <Text style={styles.stepNumber}>3</Text>
            </View>

            <Text style={styles.stepInactiveText}>Selesai</Text>
          </View>
        </View>

        {/* INFO */}

        <View style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <Ionicons
              name="information-circle-outline"
              size={24}
              color="#08AEEA"
            />
          </View>

          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Tentukan Periode Penyewaan</Text>

            <Text style={styles.infoText}>
              Silakan pilih tanggal sewa dan tanggal kembali. Durasi penyewaan
              akan dihitung otomatis setelah kedua tanggal dipilih.
            </Text>
          </View>
        </View>

        {/* TANGGAL */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Tanggal Penyewaan</Text>

          <Text style={styles.sectionSubtitle}>
            Tentukan kapan alat mulai digunakan dan dikembalikan
          </Text>
        </View>

        <View style={styles.formCard}>
          {/* ================================================= */}
          {/* TANGGAL SEWA */}
          {/* ================================================= */}

          <TouchableOpacity
            activeOpacity={0.8}
            disabled={Platform.OS === "web"}
            onPress={() => {
              if (Platform.OS !== "web") {
                openNativeDatePicker("tanggalSewa");
              }
            }}
          >
            <View style={styles.formRow}>
              <View style={styles.formIcon}>
                <Ionicons name="calendar-outline" size={20} color="#08AEEA" />
              </View>

              <View style={styles.formContent}>
                <Text style={styles.formLabel}>Tanggal Sewa</Text>

                {Platform.OS === "web" ? (
                  <input
                    type="date"
                    value={formatDateInput(tanggalSewa)}
                    min={formatDateInput(today)}
                    onChange={(event) => handleTanggalSewa(event.target.value)}
                    style={{
                      marginTop: 5,
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      color: tanggalSewa ? "#FFFFFF" : "#647A9F",
                      fontSize: 13,
                      fontFamily: "inherit",
                      width: "100%",
                      cursor: "pointer",
                      colorScheme: "dark",
                    }}
                  />
                ) : (
                  <Text
                    style={[
                      styles.formValue,
                      {
                        color: tanggalSewa ? "#FFFFFF" : "#647A9F",
                      },
                    ]}
                  >
                    {formatTanggal(tanggalSewa)}
                  </Text>
                )}
              </View>

              <Ionicons name="chevron-forward" size={18} color="#647A9F" />
            </View>
          </TouchableOpacity>

          <View style={styles.formDivider} />

          {/* ================================================= */}
          {/* TANGGAL KEMBALI */}
          {/* ================================================= */}

          <TouchableOpacity
            activeOpacity={tanggalSewa ? 0.8 : 1}
            disabled={Platform.OS === "web" || !tanggalSewa}
            onPress={() => {
              if (Platform.OS !== "web" && tanggalSewa) {
                openNativeDatePicker("tanggalKembali");
              }
            }}
          >
            <View style={styles.formRow}>
              <View style={styles.formIcon}>
                <Ionicons
                  name="calendar-clear-outline"
                  size={20}
                  color="#08AEEA"
                />
              </View>

              <View style={styles.formContent}>
                <Text style={styles.formLabel}>Tanggal Kembali</Text>

                {Platform.OS === "web" ? (
                  <input
                    type="date"
                    value={formatDateInput(tanggalKembali)}
                    min={
                      tanggalSewa
                        ? formatDateInput(tanggalSewa)
                        : formatDateInput(today)
                    }
                    disabled={!tanggalSewa}
                    onChange={(event) =>
                      handleTanggalKembali(event.target.value)
                    }
                    style={{
                      marginTop: 5,
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      color: tanggalKembali ? "#FFFFFF" : "#647A9F",
                      fontSize: 13,
                      fontFamily: "inherit",
                      width: "100%",
                      cursor: tanggalSewa ? "pointer" : "not-allowed",
                      opacity: tanggalSewa ? 1 : 0.5,
                      colorScheme: "dark",
                    }}
                  />
                ) : (
                  <Text
                    style={[
                      styles.formValue,
                      {
                        color: tanggalKembali ? "#FFFFFF" : "#647A9F",
                      },
                    ]}
                  >
                    {formatTanggal(tanggalKembali)}
                  </Text>
                )}
              </View>

              <Ionicons name="chevron-forward" size={18} color="#647A9F" />
            </View>
          </TouchableOpacity>

          <View style={styles.formDivider} />

          {/* ================================================= */}
          {/* DURASI */}
          {/* ================================================= */}

          <View style={styles.formRow}>
            <View style={styles.formIcon}>
              <Ionicons name="time-outline" size={20} color="#08AEEA" />
            </View>

            <View style={styles.formContent}>
              <Text style={styles.formLabel}>Durasi Penyewaan</Text>

              <Text
                style={[
                  styles.formValue,
                  {
                    color: durasiPenyewaan ? "#FFFFFF" : "#647A9F",
                  },
                ]}
              >
                {durasiPenyewaan
                  ? `${durasiPenyewaan} hari`
                  : "Akan dihitung otomatis"}
              </Text>
            </View>

            <View
              style={{
                backgroundColor: durasiPenyewaan
                  ? "rgba(8,174,234,0.1)"
                  : "rgba(100,116,139,0.1)",
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  color: durasiPenyewaan ? "#08AEEA" : "#647A9F",
                  fontSize: 10,
                  fontWeight: "700",
                }}
              >
                OTOMATIS
              </Text>
            </View>
          </View>
        </View>

        {/* ================================================= */}
        {/* DAFTAR ALAT */}
        {/* ================================================= */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Daftar Alat</Text>

          <Text style={styles.sectionSubtitle}>
            {cartItems.length} jenis alat • {totalUnit} unit
          </Text>
        </View>

        {cartItems.map((item) => {
          const hargaPerHari = Number(item.alat_hargaperhari) || 0;

          const jumlah = Number(item.jumlah) || 0;

          const subtotal = getRentalSubtotal(item);

          return (
            <View key={String(item.alat_id)} style={styles.itemCard}>
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

              <View style={styles.itemInfo}>
                <Text style={styles.productName} numberOfLines={2}>
                  {item.alat_nama}
                </Text>

                <Text style={styles.productPrice}>
                  {formatRupiah(hargaPerHari)}

                  <Text style={styles.priceUnit}> / hari</Text>
                </Text>

                <View style={styles.detailRow}>
                  <View style={styles.detailItem}>
                    <Ionicons name="cube-outline" size={16} color="#8EA4C8" />

                    <Text style={styles.detailText}>{jumlah} unit</Text>
                  </View>

                  {durasiPenyewaan && (
                    <View style={styles.detailItem}>
                      <Ionicons
                        name="calendar-outline"
                        size={16}
                        color="#8EA4C8"
                      />

                      <Text style={styles.detailText}>
                        {durasiPenyewaan} hari
                      </Text>
                    </View>
                  )}
                </View>

                <View style={styles.itemSubtotal}>
                  <Text style={styles.itemSubtotalLabel}>
                    {durasiPenyewaan
                      ? `${formatRupiah(
                          hargaPerHari,
                        )} × ${jumlah} × ${durasiPenyewaan}`
                      : "Pilih tanggal terlebih dahulu"}
                  </Text>

                  <Text style={styles.itemSubtotalValue}>
                    {durasiPenyewaan ? formatRupiah(subtotal) : "-"}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}

        {/* ================================================= */}
        {/* DATA PELANGGAN */}
        {/* ================================================= */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Data Pelanggan</Text>

          <Text style={styles.sectionSubtitle}>
            Data diambil otomatis dari akun yang sedang login
          </Text>
        </View>

        <View style={styles.formCard}>
          {/* NAMA */}

          <View style={styles.formRow}>
            <View style={styles.formIcon}>
              <Ionicons name="person-outline" size={20} color="#08AEEA" />
            </View>

            <View style={styles.formContent}>
              <Text style={styles.formLabel}>Pelanggan</Text>

              <Text style={styles.formValue}>
                {pelanggan?.pelanggan_nama || "Data pelanggan belum tersedia"}
              </Text>

              {pelanggan?.pelanggan_email ? (
                <Text
                  style={{
                    color: "#7188AD",
                    fontSize: 10,
                    marginTop: 3,
                  }}
                >
                  {pelanggan.pelanggan_email}
                </Text>
              ) : null}
            </View>

            <Ionicons name="checkmark-circle" size={20} color="#22C55E" />
          </View>

          <View style={styles.formDivider} />

          {/* ALAMAT */}

          <View style={styles.formRow}>
            <View style={styles.formIcon}>
              <Ionicons name="location-outline" size={20} color="#08AEEA" />
            </View>

            <View style={styles.formContent}>
              <Text style={styles.formLabel}>Alamat Penggunaan</Text>

              <Text style={styles.formValue}>
                {alamatTransaksi ? alamatTransaksi : "Alamat belum tersedia"}
              </Text>

              {alamatTransaksi ? (
                <Text
                  style={{
                    color: "#647A9F",
                    fontSize: 10,
                    marginTop: 4,
                  }}
                >
                  Alamat untuk transaksi ini
                </Text>
              ) : null}
            </View>
          </View>
        </View>

        {/* ================================================= */}
        {/* SUMMARY */}
        {/* ================================================= */}

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Ringkasan Penyewaan</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Pelanggan</Text>

            <Text style={styles.summaryValue}>
              {pelanggan?.pelanggan_nama || "-"}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tanggal sewa</Text>

            <Text
              style={[
                styles.summaryValue,
                {
                  color: tanggalSewa ? "#FFFFFF" : "#647A9F",
                },
              ]}
            >
              {formatTanggal(tanggalSewa)}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tanggal kembali</Text>

            <Text
              style={[
                styles.summaryValue,
                {
                  color: tanggalKembali ? "#FFFFFF" : "#647A9F",
                },
              ]}
            >
              {formatTanggal(tanggalKembali)}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Durasi</Text>

            <Text
              style={[
                styles.summaryValue,
                {
                  color: durasiPenyewaan ? "#FFFFFF" : "#647A9F",
                },
              ]}
            >
              {durasiPenyewaan ? `${durasiPenyewaan} hari` : "Belum dihitung"}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Jumlah jenis alat</Text>

            <Text style={styles.summaryValue}>{cartItems.length}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total unit</Text>

            <Text style={styles.summaryValue}>{totalUnit}</Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.totalRow}>
            <View>
              <Text style={styles.totalLabel}>Total Penyewaan</Text>

              <Text style={styles.totalDescription}>
                {durasiPenyewaan
                  ? "Belum termasuk biaya tambahan"
                  : "Pilih periode penyewaan terlebih dahulu"}
              </Text>
            </View>

            <Text style={styles.totalValue}>
              {durasiPenyewaan ? formatRupiah(totalPenyewaan) : "-"}
            </Text>
          </View>
        </View>

        {/* ================================================= */}
        {/* BUTTON */}
        {/* ================================================= */}

        <TouchableOpacity
          style={styles.createButton}
          activeOpacity={isCreatingRental ? 1 : 0.85}
          onPress={handleCreateRental}
          disabled={isCreatingRental}
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
            style={styles.createGradient}
          >
            {isCreatingRental ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Ionicons
                name="checkmark-circle-outline"
                size={22}
                color="#FFFFFF"
              />
            )}

            <Text style={styles.createText}>
              {isCreatingRental ? "Membuat Penyewaan..." : "Buat Penyewaan"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.securityText}>
          <Ionicons name="shield-checkmark-outline" size={14} color="#6F88B0" />{" "}
          Data penyewaan Anda akan diproses dengan aman.
        </Text>

        <View style={styles.bottomSpace} />
      </ScrollView>

      {/* ================================================= */}
      {/* NATIVE DATE PICKER */}
      {/* ================================================= */}

      {Platform.OS !== "web" && showDatePicker && (
        <DateTimePicker
          value={tempTanggal}
          mode="date"
          display="default"
          minimumDate={
            pickerType === "tanggalKembali" ? tanggalSewa || today : today
          }
          onChange={handleNativeDateChange}
        />
      )}

      {/* ================================================= */}
      {/* MODAL ALAMAT */}
      {/* ================================================= */}

      <Modal
        visible={showAlamatModal}
        transparent
        animationType="slide"
        onRequestClose={cancelEditAlamat}
      >
        <View style={styles.addressModalOverlay}>
          <View style={styles.addressModalContainer}>
            <View style={styles.addressModalHeader}>
              <View style={styles.addressModalTitleWrapper}>
                <View style={styles.addressModalIcon}>
                  <Ionicons name="location-outline" size={19} color="#08AEEA" />
                </View>

                <View>
                  <Text style={styles.addressModalTitle}>Ubah Alamat</Text>

                  <Text style={styles.addressModalSubtitle}>
                    Hanya untuk transaksi ini
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={cancelEditAlamat}
                style={styles.addressModalCloseButton}
              >
                <Ionicons name="close" size={18} color="#94A3B8" />
              </TouchableOpacity>
            </View>

            <View style={styles.addressModalInfo}>
              <Ionicons
                name="information-circle-outline"
                size={17}
                color="#08AEEA"
              />

              <Text style={styles.addressModalInfoText}>
                Perubahan alamat hanya berlaku untuk transaksi ini dan tidak
                mengubah alamat pada profil akun Anda.
              </Text>
            </View>

            <Text style={styles.addressModalLabel}>Alamat Penggunaan</Text>

            <TextInput
              value={tempAlamat}
              onChangeText={setTempAlamat}
              placeholder="Masukkan alamat penggunaan alat"
              placeholderTextColor="#647A9F"
              multiline
              textAlignVertical="top"
              style={styles.addressModalInput}
            />

            <View style={styles.addressModalActions}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={cancelEditAlamat}
                style={styles.addressModalCancelButton}
              >
                <Text style={styles.addressModalCancelText}>Batal</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={saveAlamat}
                style={styles.addressModalSaveButton}
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
                  style={styles.addressModalSaveGradient}
                >
                  <Ionicons name="checkmark" size={17} color="#FFFFFF" />

                  <Text style={styles.addressModalSaveText}>
                    Gunakan Alamat
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* ================================================= */}
      {/* MODAL KONFIRMASI PENYEWAAN */}
      {/* ================================================= */}

      <Modal
        visible={showConfirmModal}
        transparent
        animationType="fade"
        onRequestClose={() => {
          if (!isCreatingRental) {
            setShowConfirmModal(false);
          }
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.65)",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 22,
          }}
        >
          <View
            style={{
              width: "100%",
              maxWidth: 430,
              backgroundColor: "#071A3D",
              borderRadius: 22,
              padding: 22,
              borderWidth: 1,
              borderColor: "rgba(8,174,234,0.18)",
            }}
          >
            {/* ICON */}

            <View
              style={{
                width: 52,
                height: 52,
                borderRadius: 26,
                backgroundColor: "rgba(8,174,234,0.12)",
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
                marginBottom: 14,
              }}
            >
              <Ionicons
                name="checkmark-circle-outline"
                size={30}
                color="#08AEEA"
              />
            </View>

            {/* TITLE */}

            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 19,
                fontWeight: "800",
                textAlign: "center",
              }}
            >
              Konfirmasi Penyewaan
            </Text>

            <Text
              style={{
                color: "#8298BD",
                fontSize: 12,
                textAlign: "center",
                marginTop: 6,
                marginBottom: 20,
              }}
            >
              Pastikan data penyewaan Anda sudah benar
            </Text>

            {/* DETAIL */}

            <View
              style={{
                backgroundColor: "rgba(255,255,255,0.035)",
                borderRadius: 15,
                padding: 15,
                gap: 12,
              }}
            >
              {/* PELANGGAN */}

              <View>
                <Text
                  style={{
                    color: "#7188AD",
                    fontSize: 10,
                    marginBottom: 3,
                  }}
                >
                  Pelanggan
                </Text>

                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 13,
                    fontWeight: "600",
                  }}
                >
                  {pelanggan?.pelanggan_nama}
                </Text>
              </View>

              {/* ALAMAT */}

              <View>
                <Text
                  style={{
                    color: "#7188AD",
                    fontSize: 10,
                    marginBottom: 3,
                  }}
                >
                  Alamat
                </Text>

                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 13,
                    lineHeight: 19,
                  }}
                >
                  {alamatTransaksi}
                </Text>
              </View>

              {/* TANGGAL */}

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: "#7188AD",
                      fontSize: 10,
                      marginBottom: 3,
                    }}
                  >
                    Tanggal Sewa
                  </Text>

                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 12,
                      fontWeight: "600",
                    }}
                  >
                    {formatTanggal(tanggalSewa)}
                  </Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: "#7188AD",
                      fontSize: 10,
                      marginBottom: 3,
                    }}
                  >
                    Tanggal Kembali
                  </Text>

                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 12,
                      fontWeight: "600",
                    }}
                  >
                    {formatTanggal(tanggalKembali)}
                  </Text>
                </View>
              </View>

              {/* DURASI */}

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color: "#8298BD",
                    fontSize: 12,
                  }}
                >
                  Durasi
                </Text>

                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 12,
                    fontWeight: "700",
                  }}
                >
                  {durasiPenyewaan} hari
                </Text>
              </View>

              {/* TOTAL */}

              <View
                style={{
                  borderTopWidth: 1,
                  borderTopColor: "rgba(255,255,255,0.08)",
                  paddingTop: 12,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 13,
                    fontWeight: "700",
                  }}
                >
                  Total Penyewaan
                </Text>

                <Text
                  style={{
                    color: "#08AEEA",
                    fontSize: 17,
                    fontWeight: "800",
                  }}
                >
                  {formatRupiah(totalPenyewaan)}
                </Text>
              </View>
            </View>

            {/* BUTTON */}

            <View
              style={{
                flexDirection: "row",
                gap: 10,
                marginTop: 18,
              }}
            >
              {/* BATAL */}

              <TouchableOpacity
                activeOpacity={0.8}
                disabled={isCreatingRental}
                onPress={() => setShowConfirmModal(false)}
                style={{
                  flex: 1,
                  height: 48,
                  borderRadius: 13,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(255,255,255,0.06)",
                  borderWidth: 1,
                  borderColor: "rgba(255,255,255,0.08)",
                }}
              >
                <Text
                  style={{
                    color: "#A7B8D4",
                    fontSize: 12,
                    fontWeight: "700",
                  }}
                >
                  Batal
                </Text>
              </TouchableOpacity>

              {/* BUAT PENYEWAAN */}

              <TouchableOpacity
                activeOpacity={0.85}
                disabled={isCreatingRental}
                onPress={submitRental}
                style={{
                  flex: 1.4,
                  height: 48,
                  borderRadius: 13,
                  overflow: "hidden",
                }}
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
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    gap: 7,
                  }}
                >
                  {isCreatingRental ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <Ionicons
                      name="checkmark-circle-outline"
                      size={18}
                      color="#FFFFFF"
                    />
                  )}

                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 12,
                      fontWeight: "800",
                    }}
                  >
                    {isCreatingRental ? "Memproses..." : "Ya, Buat Penyewaan"}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
