import React from "react";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useRouter } from "expo-router";

import styles from "../../styles/profile.styles";

import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const router = useRouter();

  const { pelanggan, loading, logout } = useAuth();

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
          Memuat profile...
        </Text>
      </View>
    );
  }

  // ==========================================================
  // JIKA DATA PELANGGAN TIDAK ADA
  // ==========================================================

  if (!pelanggan) {
    return (
      <View
        style={[
          styles.page,
          {
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 30,
          },
        ]}
      >
        <View style={styles.emptyIcon}>
          <Ionicons name="person-outline" size={42} color="#3978E8" />
        </View>

        <Text style={styles.emptyTitle}>Data Profile Tidak Ditemukan</Text>

        <Text
          style={[
            styles.emptyText,
            {
              textAlign: "center",
            },
          ]}
        >
          Data akun kamu belum tersedia. Silakan login kembali.
        </Text>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.replace("/auth/login")}
          activeOpacity={0.8}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ==========================================================
  // LOGOUT
  // ==========================================================

  const handleLogout = async () => {
    await logout();

    router.replace("/auth/login");
  };

  // ==========================================================
  // EDIT PROFILE
  // ==========================================================

  const handleEditProfile = () => {
    router.push("/edit-profile");
  };

  // ==========================================================
  // INITIAL AVATAR
  // ==========================================================

  const initial = pelanggan.pelanggan_nama?.charAt(0).toUpperCase() || "?";

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <View style={styles.page}>
      {/* =====================================================
          HEADER
      ===================================================== */}

      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Profile</Text>

          <Text style={styles.headerSubtitle}>Kelola informasi akun kamu</Text>
        </View>

        <View style={styles.headerIcon}>
          <Ionicons name="person-outline" size={23} color="#08C9F5" />
        </View>
      </View>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ===================================================
            PROFILE CARD
        =================================================== */}

        <View style={styles.profileCard}>
          {/* AVATAR */}

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>

          {/* NAMA */}

          <Text style={styles.name}>{pelanggan.pelanggan_nama}</Text>

          {/* EMAIL */}

          <Text style={styles.username}>{pelanggan.pelanggan_email}</Text>

          {/* EDIT PROFILE */}

          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEditProfile}
            activeOpacity={0.8}
          >
            <Ionicons name="create-outline" size={16} color="#FFFFFF" />

            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* ===================================================
            INFORMASI PRIBADI
        =================================================== */}

        <Text style={styles.sectionTitle}>Informasi Pribadi</Text>

        <View style={styles.infoCard}>
          {/* NAMA */}

          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Ionicons name="person-outline" size={19} color="#08C9F5" />
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Nama Lengkap</Text>

              <Text style={styles.infoValue}>{pelanggan.pelanggan_nama}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* EMAIL */}

          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Ionicons name="mail-outline" size={19} color="#08C9F5" />
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Email</Text>

              <Text style={styles.infoValue}>{pelanggan.pelanggan_email}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* NOMOR TELEPON */}

          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Ionicons name="call-outline" size={19} color="#08C9F5" />
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Nomor Telepon</Text>

              <Text style={styles.infoValue}>
                {pelanggan.pelanggan_notelp || "-"}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* ALAMAT */}

          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Ionicons name="location-outline" size={19} color="#08C9F5" />
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Alamat</Text>

              <Text style={styles.infoValue}>
                {pelanggan.pelanggan_alamat || "-"}
              </Text>
            </View>
          </View>
        </View>

        {/* ===================================================
            PENGATURAN
        =================================================== */}

        <Text style={styles.sectionTitle}>Pengaturan</Text>

        <View style={styles.menuCard}>
          {/* UBAH PASSWORD */}

          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => {
              console.log("Ubah password");
            }}
          >
            <View style={styles.menuIcon}>
              <Ionicons name="lock-closed-outline" size={20} color="#08C9F5" />
            </View>

            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Ubah Password</Text>

              <Text style={styles.menuDescription}>
                Perbarui password akun kamu
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color="rgba(255,255,255,0.40)"
            />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          {/* NOTIFIKASI */}

          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => {
              console.log("Pengaturan notifikasi");
            }}
          >
            <View style={styles.menuIcon}>
              <Ionicons
                name="notifications-outline"
                size={20}
                color="#08C9F5"
              />
            </View>

            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Notifikasi</Text>

              <Text style={styles.menuDescription}>
                Atur pemberitahuan penyewaan
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color="rgba(255,255,255,0.40)"
            />
          </TouchableOpacity>
        </View>

        {/* ===================================================
            LOGOUT
        =================================================== */}

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Ionicons name="log-out-outline" size={20} color="#FF5C67" />

          <Text style={styles.logoutText}>Keluar dari Akun</Text>
        </TouchableOpacity>

        {/* ===================================================
            FOOTER
        =================================================== */}

        <View style={styles.footer}>
          <Text style={styles.footerTitle}>Amanah Elektronik</Text>

          <Text style={styles.footerText}>Mudah • Aman • Terpercaya</Text>

          <Text style={styles.copyright}>© 2026 Amanah Elektronik</Text>
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
}
