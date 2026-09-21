import React, { useCallback, useEffect, useMemo, useState } from "react";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useRouter } from "expo-router";

import styles from "../../styles/riwayat.styles";

import { getRiwayatPelanggan } from "../../services/penyewaanService";

type Status = "Semua" | "Menunggu Pembayaran" | "Sedang Disewa" | "Selesai";

type RentalItem = {
  penyewaan_detail_id: number;
  penyewaan_detail_jumlah: number;
  alat?: {
    alat_id: number;
    alat_nama: string;
  } | null;
};

type RentalApi = {
  penyewaan_id: number;
  penyewaan_pelanggan_id: number;
  penyewaan_tglsewa: string;
  penyewaan_tglkembali: string;
  penyewaan_sttspembayaran: "Lunas" | "Belum Dibayar" | "DP";
  penyewaan_sttskembali: "Sudah Kembali" | "Belum Kembali";
  penyewaan_totalharga: number;
  created_at?: string;
  updated_at?: string;
  detail?: RentalItem[];
};

type Rental = {
  id: string;
  invoice: string;
  tanggalSewa: string;
  tanggalKembali: string;
  status: Exclude<Status, "Semua">;
  total: string;
  items: {
    nama: string;
    jumlah: number;
  }[];
};

const filters: Status[] = [
  "Semua",
  "Menunggu Pembayaran",
  "Sedang Disewa",
  "Selesai",
];

export default function Riwayat() {
  const router = useRouter();

  const [activeFilter, setActiveFilter] = useState<Status>("Semua");

  const [rentals, setRentals] = useState<Rental[]>([]);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  // ==========================================================
  // FORMAT TANGGAL
  // ==========================================================

  const formatTanggal = (value: string) => {
    if (!value) {
      return "-";
    }

    const date = new Date(`${value}T00:00:00`);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // ==========================================================
  // FORMAT RUPIAH
  // ==========================================================

  const formatRupiah = (value: number | string) => {
    const number = Number(value) || 0;

    return `Rp ${number.toLocaleString("id-ID")}`;
  };

  const getRentalStatus = (item: RentalApi): Exclude<Status, "Semua"> => {
    if (item.penyewaan_sttskembali === "Sudah Kembali") {
      return "Selesai";
    }

    if (item.penyewaan_sttspembayaran === "Belum Dibayar") {
      return "Menunggu Pembayaran";
    }

    if (
      item.penyewaan_sttspembayaran === "Lunas" &&
      item.penyewaan_sttskembali === "Belum Kembali"
    ) {
      return "Sedang Disewa";
    }

    return "Menunggu Pembayaran";
  };

  // ==========================================================
  // TRANSFORM DATA API
  // ==========================================================

  const transformRental = (item: RentalApi): Rental => {
    return {
      id: String(item.penyewaan_id),

      invoice: `INV-${String(item.penyewaan_id).padStart(4, "0")}`,

      tanggalSewa: formatTanggal(item.penyewaan_tglsewa),

      tanggalKembali: formatTanggal(item.penyewaan_tglkembali),

      status: getRentalStatus(item),

      total: formatRupiah(item.penyewaan_totalharga),

      items: (item.detail || []).map((detail) => ({
        nama: detail.alat?.alat_nama || "Alat tidak tersedia",

        jumlah: Number(detail.penyewaan_detail_jumlah) || 0,
      })),
    };
  };

  const loadRiwayat = useCallback(async () => {
    try {
      console.log("========== MULAI RIWAYAT ==========");

      const response = await getRiwayatPelanggan();

      console.log("RIWAYAT RESPONSE:", response);

      if (response?.success && Array.isArray(response?.data)) {
        const transformedData = response.data.map((item: RentalApi) =>
          transformRental(item),
        );

        console.log("RIWAYAT HASIL TRANSFORM:", transformedData);

        setRentals(transformedData);
      } else {
        console.warn("Response riwayat tidak memiliki data array:", response);

        setRentals([]);
      }
    } catch (error: any) {
      console.error("RIWAYAT ERROR:", error?.response?.data || error);

      setRentals([]);

      Alert.alert(
        "Gagal Memuat Riwayat",
        error?.response?.data?.message ||
          "Data riwayat penyewaan tidak dapat diambil.",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // ==========================================================
  // LOAD PERTAMA
  // ==========================================================

  useEffect(() => {
    loadRiwayat();
  }, [loadRiwayat]);

  // ==========================================================
  // REFRESH
  // ==========================================================

  const handleRefresh = async () => {
    setRefreshing(true);

    await loadRiwayat();
  };

  // ==========================================================
  // FILTER
  // ==========================================================

  const filteredData = useMemo(() => {
    if (activeFilter === "Semua") {
      return rentals;
    }

    return rentals.filter((item) => item.status === activeFilter);
  }, [rentals, activeFilter]);

  const getStatusStyle = (status: Rental["status"]) => {
    switch (status) {
      case "Menunggu Pembayaran":
        return styles.statusWaiting;

      case "Sedang Disewa":
        return styles.statusRental;

      case "Selesai":
        return styles.statusDone;

      default:
        return styles.statusWaiting;
    }
  };

  const getStatusIcon = (status: Rental["status"]) => {
    switch (status) {
      case "Menunggu Pembayaran":
        return "time-outline";

      case "Sedang Disewa":
        return "cube-outline";

      case "Selesai":
        return "checkmark-circle-outline";

      default:
        return "ellipse-outline";
    }
  };

  // ==========================================================
  // LOADING
  // ==========================================================

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
        <ActivityIndicator size="large" color="#08C9F5" />

        <Text
          style={{
            color: "#FFFFFF",
            marginTop: 14,
          }}
        >
          Memuat riwayat penyewaan...
        </Text>
      </View>
    );
  }

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <View style={styles.page}>
      {/* HEADER */}

      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Riwayat Penyewaan</Text>

          <Text style={styles.headerSubtitle}>
            Lihat semua aktivitas penyewaanmu
          </Text>
        </View>

        <View style={styles.historyIcon}>
          <Ionicons name="receipt-outline" size={23} color="#08C9F5" />
        </View>
      </View>

      {/* FILTER */}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={styles.filterContainer}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              activeFilter === filter && styles.filterButtonActive,
            ]}
            onPress={() => setActiveFilter(filter)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === filter && styles.filterTextActive,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* CONTENT */}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {/* HEADER HASIL */}

        <View style={styles.resultHeader}>
          <Text style={styles.resultTitle}>Penyewaan Saya</Text>

          <Text style={styles.resultCount}>
            {filteredData.length} transaksi
          </Text>
        </View>

        {/* LIST */}

        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <View key={item.id} style={styles.card}>
              {/* CARD HEADER */}

              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.invoice}>{item.invoice}</Text>

                  <Text style={styles.transactionDate}>
                    Transaksi #{item.id}
                  </Text>
                </View>

                <View style={[styles.statusBadge, getStatusStyle(item.status)]}>
                  <Ionicons
                    name={getStatusIcon(item.status) as any}
                    size={14}
                    color="#FFFFFF"
                  />

                  <Text style={styles.statusText}>{item.status}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              {/* ITEMS */}

              <View style={styles.itemSection}>
                <View style={styles.itemIcon}>
                  <Ionicons name="cube-outline" size={23} color="#08C9F5" />
                </View>

                <View style={styles.itemInfo}>
                  {item.items.slice(0, 2).map((product) => (
                    <Text
                      key={`${item.id}-${product.nama}`}
                      style={styles.itemName}
                      numberOfLines={1}
                    >
                      {product.nama}
                      {"  "}
                      <Text style={styles.itemQuantity}>x{product.jumlah}</Text>
                    </Text>
                  ))}

                  {item.items.length > 2 && (
                    <Text style={styles.moreItem}>
                      +{item.items.length - 2} barang lainnya
                    </Text>
                  )}
                </View>
              </View>

              {/* TANGGAL */}

              <View style={styles.dateSection}>
                <View style={styles.dateBox}>
                  <Ionicons name="calendar-outline" size={18} color="#8EA7D5" />

                  <View>
                    <Text style={styles.dateLabel}>Tanggal Sewa</Text>

                    <Text style={styles.dateValue}>{item.tanggalSewa}</Text>
                  </View>
                </View>

                <Ionicons name="arrow-forward" size={18} color="#5E76A8" />

                <View style={styles.dateBox}>
                  <Ionicons name="calendar-outline" size={18} color="#8EA7D5" />

                  <View>
                    <Text style={styles.dateLabel}>Tanggal Kembali</Text>

                    <Text style={styles.dateValue}>{item.tanggalKembali}</Text>
                  </View>
                </View>
              </View>

              {/* FOOTER */}

              <View style={styles.cardFooter}>
                <View>
                  <Text style={styles.totalLabel}>Total Penyewaan</Text>

                  <Text style={styles.totalPrice}>{item.total}</Text>
                </View>

                <TouchableOpacity
                  style={styles.detailButton}
                  activeOpacity={0.8}
                  onPress={() => {
                    router.push({
                      pathname: "/detail-penyewaan",
                      params: {
                        id: item.id,
                      },
                    });
                  }}
                >
                  <Text style={styles.detailButtonText}>Detail</Text>

                  <Ionicons name="chevron-forward" size={17} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIcon}>
              <Ionicons name="receipt-outline" size={42} color="#3978E8" />
            </View>

            <Text style={styles.emptyTitle}>Belum Ada Penyewaan</Text>

            <Text style={styles.emptyText}>
              Kamu belum memiliki riwayat penyewaan dengan status ini.
            </Text>
          </View>
        )}

        <View style={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
}
