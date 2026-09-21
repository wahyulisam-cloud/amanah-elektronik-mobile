import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useLocalSearchParams, useRouter } from "expo-router";

import { getDetailPenyewaanPelanggan } from "../services/penyewaanService";

import styles from "../styles/detail-penyewaan.styles";

type RentalDetailItem = {
  penyewaan_detail_id: number;
  penyewaan_detail_jumlah: number;
  penyewaan_detail_subharga: number;
  penyewaan_detail_hargaperhari?: number;

  alat?: {
    alat_id: number;
    alat_nama: string;
    alat_hargaperhari?: number;
    alat_gambar?: string;
  } | null;
};

type RentalDetail = {
  penyewaan_id: number;
  penyewaan_pelanggan_id: number;

  penyewaan_tglsewa: string;
  penyewaan_tglkembali: string;

  penyewaan_sttspembayaran: "Lunas" | "Belum Dibayar" | "DP";

  penyewaan_sttskembali: "Sudah Kembali" | "Belum Kembali";

  penyewaan_totalharga: number;

  pelanggan?: {
    pelanggan_id: number;
    pelanggan_nama: string;
    pelanggan_notelp: string;
    pelanggan_email: string;
  } | null;

  detail?: RentalDetailItem[];
};

export default function DetailPenyewaan() {
  const router = useRouter();

  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const [data, setData] = useState<RentalDetail | null>(null);

  const [loading, setLoading] = useState(true);

  const formatTanggal = (value?: string) => {
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

  const formatRupiah = (value?: number | string) => {
    const number = Number(value) || 0;

    return `Rp ${number.toLocaleString("id-ID")}`;
  };

  const getStatus = () => {
    if (!data) {
      return "Menunggu Pembayaran";
    }

    if (data.penyewaan_sttskembali === "Sudah Kembali") {
      return "Selesai";
    }

    if (data.penyewaan_sttspembayaran === "Belum Dibayar") {
      return "Menunggu Pembayaran";
    }

    return "Sedang Disewa";
  };

  const loadDetail = async () => {
    try {
      if (!id) {
        Alert.alert("Error", "ID penyewaan tidak ditemukan.");

        router.back();

        return;
      }

      console.log("======================================");

      console.log("MENGAMBIL DETAIL PENYEWAAN:", id);

      const response = await getDetailPenyewaanPelanggan(id);

      console.log("DETAIL RESPONSE:", response);

      if (response?.success && response?.data) {
        setData(response.data);
      } else {
        Alert.alert(
          "Gagal",
          response?.message || "Data penyewaan tidak ditemukan.",
        );

        router.back();
      }
    } catch (error: any) {
      console.error("DETAIL PENYEWAAN ERROR:", error?.response?.data || error);

      Alert.alert(
        "Gagal Memuat Detail",
        error?.response?.data?.message ||
          "Detail penyewaan tidak dapat diambil.",
      );

      router.back();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDetail();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.page}>
        <ActivityIndicator size="large" color="#08C9F5" />

        <Text style={styles.loadingText}>Memuat detail penyewaan...</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.page}>
        <Text style={styles.emptyText}>Data penyewaan tidak ditemukan.</Text>
      </View>
    );
  }

  const durasi = Math.max(
    1,
    Math.floor(
      (new Date(`${data.penyewaan_tglkembali}T00:00:00`).getTime() -
        new Date(`${data.penyewaan_tglsewa}T00:00:00`).getTime()) /
        (1000 * 60 * 60 * 24),
    ) + 1,
  );

  return (
    <View style={styles.page}>
      {/* HEADER */}

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={23} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Detail Penyewaan</Text>

        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* INVOICE */}

        <View style={styles.invoiceCard}>
          <View>
            <Text style={styles.invoiceLabel}>Nomor Transaksi</Text>

            <Text style={styles.invoice}>
              INV-
              {String(data.penyewaan_id).padStart(4, "0")}
            </Text>
          </View>

          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{getStatus()}</Text>
          </View>
        </View>

        {/* PERIODE */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Periode Penyewaan</Text>

          <View style={styles.periodCard}>
            <View style={styles.dateItem}>
              <Ionicons name="calendar-outline" size={22} color="#08C9F5" />

              <View>
                <Text style={styles.label}>Tanggal Sewa</Text>

                <Text style={styles.value}>
                  {formatTanggal(data.penyewaan_tglsewa)}
                </Text>
              </View>
            </View>

            <Ionicons name="arrow-forward" size={20} color="#5E76A8" />

            <View style={styles.dateItem}>
              <Ionicons name="calendar-outline" size={22} color="#08C9F5" />

              <View>
                <Text style={styles.label}>Tanggal Kembali</Text>

                <Text style={styles.value}>
                  {formatTanggal(data.penyewaan_tglkembali)}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.durationCard}>
            <Ionicons name="time-outline" size={20} color="#08C9F5" />

            <Text style={styles.durationText}>
              Durasi Penyewaan:{" "}
              <Text style={styles.durationValue}>{durasi} Hari</Text>
            </Text>
          </View>
        </View>

        {/* ALAT */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Alat yang Disewa</Text>

          {data.detail?.map((detail) => (
            <View key={detail.penyewaan_detail_id} style={styles.toolCard}>
              <View style={styles.toolIcon}>
                <Ionicons name="cube-outline" size={24} color="#08C9F5" />
              </View>

              <View style={styles.toolInfo}>
                <Text style={styles.toolName}>
                  {detail.alat?.alat_nama || "Alat tidak tersedia"}
                </Text>

                <Text style={styles.toolQuantity}>
                  Jumlah: {detail.penyewaan_detail_jumlah}
                </Text>

                <Text style={styles.toolPrice}>
                  {formatRupiah(detail.alat?.alat_hargaperhari)} / hari
                </Text>
              </View>

              <View style={styles.subtotalContainer}>
                <Text style={styles.subtotalLabel}>Subtotal</Text>

                <Text style={styles.subtotal}>
                  {formatRupiah(detail.penyewaan_detail_subharga)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* DATA PELANGGAN */}

        {data.pelanggan && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Data Pelanggan</Text>

            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Nama</Text>

                <Text style={styles.value}>
                  {data.pelanggan.pelanggan_nama}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.label}>No. Telepon</Text>

                <Text style={styles.value}>
                  {data.pelanggan.pelanggan_notelp}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.label}>Email</Text>

                <Text style={styles.value}>
                  {data.pelanggan.pelanggan_email}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* PEMBAYARAN */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ringkasan Pembayaran</Text>

          <View style={styles.paymentCard}>
            <View style={styles.paymentRow}>
              <Text style={styles.label}>Status Pembayaran</Text>

              <Text style={styles.value}>{data.penyewaan_sttspembayaran}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Penyewaan</Text>

              <Text style={styles.totalPrice}>
                {formatRupiah(data.penyewaan_totalharga)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
}
