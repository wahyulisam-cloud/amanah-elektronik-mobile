import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useRouter } from "expo-router";

import styles from "../styles/edit-profile.styles";

import { useAuth } from "../context/AuthContext";

import { updatePelanggan } from "../services/pelangganService";

export default function EditProfile() {
  const router = useRouter();

  const { pelanggan, updatePelanggan: updateAuthPelanggan } = useAuth();

  // ========================================================
  // STATE
  // ========================================================

  const [nama, setNama] = useState("");

  const [email, setEmail] = useState("");

  const [noTelp, setNoTelp] = useState("");

  const [alamat, setAlamat] = useState("");

  const [saving, setSaving] = useState(false);

  // ========================================================
  // LOAD DATA PROFILE
  // ========================================================

  useEffect(() => {
    if (!pelanggan) {
      return;
    }

    setNama(pelanggan.pelanggan_nama);

    setEmail(pelanggan.pelanggan_email);

    setNoTelp(pelanggan.pelanggan_notelp);

    setAlamat(pelanggan.pelanggan_alamat);
  }, [pelanggan]);

  // ========================================================
  // SIMPAN
  // ========================================================

  const handleSave = async () => {
    if (!pelanggan) {
      Alert.alert("Gagal", "Data pelanggan tidak ditemukan.");

      return;
    }

    // ------------------------------------------------------
    // VALIDASI NAMA
    // ------------------------------------------------------

    if (!nama.trim()) {
      Alert.alert("Data Belum Lengkap", "Nama lengkap wajib diisi.");

      return;
    }

    // ------------------------------------------------------
    // VALIDASI EMAIL
    // ------------------------------------------------------

    if (!email.trim()) {
      Alert.alert("Data Belum Lengkap", "Email wajib diisi.");

      return;
    }

    // ------------------------------------------------------
    // VALIDASI NOMOR TELEPON
    // ------------------------------------------------------

    if (!noTelp.trim()) {
      Alert.alert("Data Belum Lengkap", "Nomor telepon wajib diisi.");

      return;
    }

    // ------------------------------------------------------
    // VALIDASI ALAMAT
    // ------------------------------------------------------

    if (!alamat.trim()) {
      Alert.alert("Data Belum Lengkap", "Alamat wajib diisi.");

      return;
    }

    try {
      setSaving(true);

      const updateData = {
        pelanggan_nama: nama.trim(),

        pelanggan_email: email.trim(),

        pelanggan_notelp: noTelp.trim(),

        pelanggan_alamat: alamat.trim(),
      };

      // ====================================================
      // UPDATE DATABASE
      // ====================================================

      const response = await updatePelanggan(updateData);

      // ====================================================
      // CEK RESPONSE
      // ====================================================

      if (!response?.success || !response?.data) {
        Alert.alert(
          "Gagal",
          response?.message || "Data profile gagal diperbarui.",
        );

        return;
      }

      // ====================================================
      // DATA TERBARU DARI SERVER
      // ====================================================

      const updatedPelanggan = response.data;

      // ====================================================
      // UPDATE AUTH CONTEXT
      // ====================================================

      await updateAuthPelanggan(updatedPelanggan);

      // ====================================================
      // BERHASIL
      // ====================================================

      Alert.alert("Berhasil", "Data profile berhasil diperbarui.", [
        {
          text: "OK",
          onPress: () => {
            router.replace("/(tabs)/profile");
          },
        },
      ]);
    } catch (error: any) {
      console.error("EDIT PROFILE ERROR:", error?.response?.data || error);

      Alert.alert(
        "Gagal Memperbarui Profile",
        error?.response?.data?.message ||
          "Terjadi kesalahan saat memperbarui data profile.",
      );
    } finally {
      setSaving(false);
    }
  };

  // ========================================================
  // JIKA DATA BELUM ADA
  // ========================================================

  if (!pelanggan) {
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

        <Text style={styles.loadingText}>Memuat data profile...</Text>
      </View>
    );
  }

  // ========================================================
  // RENDER
  // ========================================================

  return (
    <KeyboardAvoidingView
      style={styles.page}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* ====================================================
          HEADER
      ==================================================== */}

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.replace("/(tabs)/profile")}
        >
          <Ionicons name="arrow-back" size={23} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Edit Profile</Text>

        <View style={styles.headerPlaceholder} />
      </View>

      {/* ====================================================
          CONTENT
      ==================================================== */}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ==================================================
            PROFILE HEADER
        ================================================== */}

        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {nama?.charAt(0).toUpperCase()}
            </Text>
          </View>

          <Text style={styles.profileName}>{nama || "-"}</Text>

          <Text style={styles.profileEmail}>{email || "-"}</Text>
        </View>

        {/* ==================================================
            FORM
        ================================================== */}

        <View style={styles.formCard}>
          {/* NAMA */}

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nama Lengkap</Text>

            <View style={styles.inputWrapper}>
              <Ionicons name="person-outline" size={20} color="#08C9F5" />

              <TextInput
                style={styles.input}
                value={nama}
                onChangeText={setNama}
                placeholder="Masukkan nama lengkap"
                placeholderTextColor="rgba(255,255,255,0.35)"
                autoCapitalize="words"
              />
            </View>
          </View>

          {/* EMAIL */}

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email</Text>

            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={20} color="#08C9F5" />

              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Masukkan email"
                placeholderTextColor="rgba(255,255,255,0.35)"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* NOMOR TELEPON */}

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nomor Telepon</Text>

            <View style={styles.inputWrapper}>
              <Ionicons name="call-outline" size={20} color="#08C9F5" />

              <TextInput
                style={styles.input}
                value={noTelp}
                onChangeText={setNoTelp}
                placeholder="Masukkan nomor telepon"
                placeholderTextColor="rgba(255,255,255,0.35)"
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* ALAMAT */}

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Alamat</Text>

            <View style={[styles.inputWrapper, styles.textAreaWrapper]}>
              <Ionicons name="location-outline" size={20} color="#08C9F5" />

              <TextInput
                style={[styles.input, styles.textArea]}
                value={alamat}
                onChangeText={setAlamat}
                placeholder="Masukkan alamat lengkap"
                placeholderTextColor="rgba(255,255,255,0.35)"
                multiline
                textAlignVertical="top"
              />
            </View>
          </View>
        </View>

        {/* ==================================================
            INFORMASI
        ================================================== */}

        <View style={styles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={20}
            color="#08C9F5"
          />

          <Text style={styles.infoText}>
            Pastikan data yang kamu masukkan sudah benar. Data ini akan
            digunakan untuk keperluan penyewaan.
          </Text>
        </View>

        {/* ==================================================
            BUTTON
        ================================================== */}

        <TouchableOpacity
          style={[styles.saveButton, saving && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={saving}
          activeOpacity={0.8}
        >
          {saving ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <>
              <Ionicons
                name="checkmark-circle-outline"
                size={20}
                color="#FFFFFF"
              />

              <Text style={styles.saveButtonText}>Simpan Perubahan</Text>
            </>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => router.replace("/(tabs)/profile")}
          disabled={saving}
          activeOpacity={0.8}
        >
          <Text style={styles.cancelButtonText}>Batal</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
