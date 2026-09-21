import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Modal,
} from "react-native";

import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

import styles from "./register.styles";

import { registerPelanggan } from "../../services/authService";

type FormErrors = {
  nama?: string;
  alamat?: string;
  noTelp?: string;
  email?: string;
  password?: string;
  passwordConfirmation?: string;
  jenisIdentitas?: string;
  fotoIdentitas?: string;
  general?: string;
};

export default function Register() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const isMobile = width < 768;

  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [noTelp, setNoTelp] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const [jenisIdentitas, setJenisIdentitas] = useState<"KTP" | "SIM">("KTP");

  const [fotoIdentitas, setFotoIdentitas] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<FormErrors>({});

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [successMessage, setSuccessMessage] = useState(
    "Akun kamu berhasil dibuat. Silakan login untuk mulai menggunakan Amanah Elektronik.",
  );

  // ==========================================================
  // VALIDASI
  // ==========================================================

  const isValidEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const isValidPhone = (value: string) => {
    const cleanedPhone = value.replace(/\D/g, "");

    return cleanedPhone.length >= 10 && cleanedPhone.length <= 13;
  };

  // ==========================================================
  // HAPUS ERROR
  // ==========================================================

  const clearError = (field: keyof FormErrors) => {
    setErrors((current) => {
      const updated = { ...current };

      delete updated[field];
      delete updated.general;

      return updated;
    });
  };

  // ==========================================================
  // PILIH FOTO
  // ==========================================================

  const handlePickImage = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        setErrors((current) => ({
          ...current,
          fotoIdentitas: "Izin galeri diperlukan untuk memilih foto identitas.",
        }));

        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setFotoIdentitas(result.assets[0].uri);

        clearError("fotoIdentitas");
      }
    } catch (error) {
      console.error("GAGAL MEMILIH FOTO:", error);

      setErrors((current) => ({
        ...current,
        fotoIdentitas: "Foto identitas gagal dipilih.",
      }));
    }
  };

  // ==========================================================
  // WEB FILE
  // ==========================================================

  const createWebFile = async (uri: string): Promise<File> => {
    const response = await fetch(uri);

    if (!response.ok) {
      throw new Error("Foto identitas tidak dapat dibaca.");
    }

    const blob = await response.blob();

    let extension = "jpg";
    let mimeType = "image/jpeg";

    if (blob.type === "image/png") {
      extension = "png";
      mimeType = "image/png";
    }

    const filename = `identitas_${Date.now()}.${extension}`;

    return new File([blob], filename, {
      type: mimeType,
    });
  };

  // ==========================================================
  // NATIVE FILE
  // ==========================================================

  const createNativeFile = (uri: string) => {
    const filename = uri.split("/").pop() || `identitas_${Date.now()}.jpg`;

    const extension = filename.split(".").pop()?.toLowerCase();

    let mimeType = "image/jpeg";

    if (extension === "png") {
      mimeType = "image/png";
    }

    return {
      uri,
      name: filename,
      type: mimeType,
    };
  };

  // ==========================================================
  // REGISTER
  // ==========================================================

  const handleRegister = async () => {
    const newErrors: FormErrors = {};

    // --------------------------------------------------------
    // NAMA
    // --------------------------------------------------------

    if (!nama.trim()) {
      newErrors.nama = "Nama pelanggan wajib diisi.";
    }

    // --------------------------------------------------------
    // ALAMAT
    // --------------------------------------------------------

    if (!alamat.trim()) {
      newErrors.alamat = "Alamat wajib diisi.";
    }

    // --------------------------------------------------------
    // NO TELEPON
    // --------------------------------------------------------

    const cleanedPhone = noTelp.replace(/\D/g, "");

    if (!noTelp.trim()) {
      newErrors.noTelp = "Nomor telepon wajib diisi.";
    } else if (!isValidPhone(noTelp)) {
      newErrors.noTelp = "Nomor telepon harus terdiri dari 10–13 digit.";
    }

    // --------------------------------------------------------
    // EMAIL
    // --------------------------------------------------------

    const cleanedEmail = email.trim().toLowerCase();

    if (!cleanedEmail) {
      newErrors.email = "Email wajib diisi.";
    } else if (!isValidEmail(cleanedEmail)) {
      newErrors.email = "Format email tidak valid.";
    }

    // --------------------------------------------------------
    // PASSWORD
    // --------------------------------------------------------

    if (!password) {
      newErrors.password = "Password wajib diisi.";
    } else if (password.length < 8) {
      newErrors.password = "Password minimal 8 karakter.";
    }

    // --------------------------------------------------------
    // KONFIRMASI PASSWORD
    // --------------------------------------------------------

    if (!passwordConfirmation) {
      newErrors.passwordConfirmation = "Konfirmasi password wajib diisi.";
    } else if (password !== passwordConfirmation) {
      newErrors.passwordConfirmation =
        "Konfirmasi password tidak sama dengan password.";
    }

    // --------------------------------------------------------
    // IDENTITAS
    // --------------------------------------------------------

    if (jenisIdentitas !== "KTP" && jenisIdentitas !== "SIM") {
      newErrors.jenisIdentitas = "Jenis identitas harus KTP atau SIM.";
    }

    // --------------------------------------------------------
    // FOTO
    // --------------------------------------------------------

    if (!fotoIdentitas) {
      newErrors.fotoIdentitas = "Foto identitas wajib diupload.";
    }

    // --------------------------------------------------------
    // STOP JIKA VALIDASI GAGAL
    // --------------------------------------------------------

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      setErrors({});

      // ======================================================
      // FORM DATA
      // ======================================================

      const formData = new FormData();

      formData.append("pelanggan_nama", nama.trim());

      formData.append("pelanggan_alamat", alamat.trim());

      formData.append("pelanggan_notelp", cleanedPhone);

      formData.append("pelanggan_email", cleanedEmail);

      formData.append("pelanggan_password", password);

      formData.append("pelanggan_password_confirmation", passwordConfirmation);

      formData.append("pelanggan_data_jenis", jenisIdentitas);

      // ======================================================
      // FILE
      // ======================================================

      if (Platform.OS === "web") {
        const webFile = await createWebFile(fotoIdentitas!);

        formData.append("pelanggan_data_file", webFile);
      } else {
        const nativeFile = createNativeFile(fotoIdentitas!);

        formData.append("pelanggan_data_file", nativeFile as any);
      }

      // ======================================================
      // DEBUG FORM DATA
      // ======================================================

      console.log("======================================");

      console.log("DATA REGISTER PELANGGAN");

      console.log("nama:", nama.trim());

      console.log("alamat:", alamat.trim());

      console.log("notelp:", cleanedPhone);

      console.log("email:", cleanedEmail);

      console.log("password:", "******");

      console.log("password_confirmation:", "******");

      console.log("jenis:", jenisIdentitas);

      console.log("foto:", fotoIdentitas);

      console.log("======================================");

      // ======================================================
      // KIRIM KE API
      // ======================================================

      const result = await registerPelanggan(formData);

      console.log("REGISTER RESPONSE:", result);

      // ======================================================
      // RESPONSE GAGAL
      // ======================================================

      if (!result?.success) {
        setErrors({
          general: result?.message || "Registrasi pelanggan gagal.",
        });

        return;
      }

      // ======================================================
      // BERHASIL
      // ======================================================

      setShowSuccessModal(true);
    } catch (error: any) {
      console.error("======================================");

      console.error("REGISTER ERROR:", error);

      console.error("STATUS:", error?.response?.status);

      console.error("SERVER RESPONSE:", error?.response?.data);

      console.error("======================================");

      // ======================================================
      // VALIDATION ERROR 422
      // ======================================================

      if (error?.response?.status === 422) {
        const responseData = error.response.data;

        const serverErrors = responseData?.errors;

        const mappedErrors: FormErrors = {};

        if (serverErrors) {
          Object.keys(serverErrors).forEach((key) => {
            const value = serverErrors[key];

            const message = Array.isArray(value) ? value[0] : String(value);

            switch (key) {
              case "pelanggan_nama":
                mappedErrors.nama = message;
                break;

              case "pelanggan_alamat":
                mappedErrors.alamat = message;
                break;

              case "pelanggan_notelp":
                mappedErrors.noTelp = message;
                break;

              case "pelanggan_email":
                mappedErrors.email = message;
                break;

              case "pelanggan_password":
                mappedErrors.password = message;
                break;

              case "pelanggan_password_confirmation":
                mappedErrors.passwordConfirmation = message;
                break;

              case "pelanggan_data_jenis":
                mappedErrors.jenisIdentitas = message;
                break;

              case "pelanggan_data_file":
                mappedErrors.fotoIdentitas = message;
                break;

              default:
                mappedErrors.general = message;
                break;
            }
          });
        }

        if (Object.keys(mappedErrors).length === 0) {
          mappedErrors.general =
            responseData?.message || "Data yang dimasukkan tidak valid.";
        }

        setErrors(mappedErrors);

        return;
      }

      // ======================================================
      // 401
      // ======================================================

      if (error?.response?.status === 401) {
        setErrors({
          general: "Registrasi tidak dapat dilakukan karena akses ditolak.",
        });

        return;
      }

      // ======================================================
      // 404
      // ======================================================

      if (error?.response?.status === 404) {
        setErrors({
          general:
            "Endpoint registrasi tidak ditemukan. Periksa route API Laravel.",
        });

        return;
      }

      // ======================================================
      // 500
      // ======================================================

      if (error?.response?.status === 500) {
        setErrors({
          general:
            error?.response?.data?.message ||
            "Terjadi kesalahan pada server Laravel.",
        });

        return;
      }

      // ======================================================
      // CONNECTION ERROR
      // ======================================================

      setErrors({
        general:
          "Tidak dapat terhubung ke server Laravel. Pastikan server sedang berjalan.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.page}>
      <Modal
        visible={showSuccessModal}
        transparent
        animationType="fade"
        onRequestClose={() => {}}
      >
        <View style={styles.successModalOverlay}>
          <View
            style={[
              styles.successModalContainer,
              isMobile && styles.successModalContainerMobile,
            ]}
          >
            {/* ICON SUCCESS */}

            <View style={styles.successIconContainer}>
              <Ionicons name="checkmark" size={42} color="#FFFFFF" />
            </View>

            {/* TITLE */}

            <Text style={styles.successModalTitle}>Registrasi Berhasil</Text>

            {/* MESSAGE */}

            <Text style={styles.successModalMessage}>{successMessage}</Text>

            {/* INFO */}

            <View style={styles.successInfoBox}>
              <Ionicons
                name="shield-checkmark-outline"
                size={20}
                color="#49B8FF"
              />

              <Text style={styles.successInfoText}>
                Data akun kamu telah berhasil disimpan dengan aman.
              </Text>
            </View>

            {/* BUTTON */}

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => {
                setShowSuccessModal(false);

                router.replace("/auth/login");
              }}
              style={styles.successButtonWrapper}
            >
              <LinearGradient
                colors={["#27A9D9", "#2776D8", "#3448D6"]}
                start={{
                  x: 0,
                  y: 0.5,
                }}
                end={{
                  x: 1,
                  y: 0.5,
                }}
                style={styles.successButton}
              >
                <Text style={styles.successButtonText}>Login Sekarang</Text>

                <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <LinearGradient
        colors={["#0B2A5B", "#112F68", "#142E63", "#0A1D42", "#071735"]}
        locations={[0, 0.3, 0.55, 0.78, 1]}
        start={{
          x: 0,
          y: 0,
        }}
        end={{
          x: 1,
          y: 1,
        }}
        style={styles.backgroundGradient}
      />

      <View
        pointerEvents="none"
        style={[
          styles.circle,
          styles.circleTopLeft,
          isMobile && styles.circleTopLeftMobile,
        ]}
      />

      <View
        pointerEvents="none"
        style={[
          styles.circle,
          styles.circleRight,
          isMobile && styles.circleRightMobile,
        ]}
      />

      <View
        pointerEvents="none"
        style={[
          styles.circle,
          styles.circleBottom,
          isMobile && styles.circleBottomMobile,
        ]}
      />

      <KeyboardAvoidingView
        style={{
          flex: 1,
        }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View
            style={[
              styles.registerContainer,
              isMobile && styles.registerContainerMobile,
            ]}
          >
            {/* ==================================================
                HEADER
            ================================================== */}

            <View style={styles.brandContainer}>
              <View style={styles.brandLogo}>
                <Ionicons name="person-add-outline" size={30} color="#7A8CFF" />
              </View>

              <Text style={styles.title}>Buat Akun</Text>

              <Text style={styles.subtitle}>
                Daftarkan diri untuk menggunakan
                {"\n"}
                Amanah Elektronik
              </Text>
            </View>

            {/* ==================================================
                GENERAL ERROR
            ================================================== */}

            {errors.general && (
              <View
                style={{
                  marginBottom: 18,
                  padding: 12,
                  borderRadius: 10,
                  backgroundColor: "rgba(239,68,68,0.10)",
                  borderWidth: 1,
                  borderColor: "rgba(239,68,68,0.35)",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                  }}
                >
                  <Ionicons
                    name="alert-circle-outline"
                    size={20}
                    color="#EF4444"
                  />

                  <Text
                    style={{
                      flex: 1,
                      marginLeft: 8,
                      color: "#EF4444",
                      fontSize: 13,
                      lineHeight: 19,
                    }}
                  >
                    {errors.general}
                  </Text>
                </View>
              </View>
            )}

            <View style={styles.form}>
              {/* ==================================================
                  NAMA
              ================================================== */}

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nama Pelanggan</Text>

                <TextInput
                  style={[
                    styles.input,
                    errors.nama && {
                      borderColor: "#EF4444",
                    },
                  ]}
                  placeholder="Masukkan nama lengkap"
                  placeholderTextColor="#94A3B8"
                  value={nama}
                  onChangeText={(value) => {
                    setNama(value);
                    clearError("nama");
                  }}
                  autoCapitalize="words"
                  autoCorrect={false}
                  editable={!loading}
                />

                {errors.nama && (
                  <Text
                    style={{
                      color: "#EF4444",
                      fontSize: 12,
                      marginTop: 5,
                    }}
                  >
                    {errors.nama}
                  </Text>
                )}
              </View>

              {/* ==================================================
                  ALAMAT
              ================================================== */}

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Alamat</Text>

                <TextInput
                  style={[
                    styles.input,
                    styles.textArea,
                    errors.alamat && {
                      borderColor: "#EF4444",
                    },
                  ]}
                  placeholder="Masukkan alamat lengkap"
                  placeholderTextColor="#94A3B8"
                  value={alamat}
                  onChangeText={(value) => {
                    setAlamat(value);
                    clearError("alamat");
                  }}
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                  autoCorrect={false}
                  editable={!loading}
                />

                {errors.alamat && (
                  <Text
                    style={{
                      color: "#EF4444",
                      fontSize: 12,
                      marginTop: 5,
                    }}
                  >
                    {errors.alamat}
                  </Text>
                )}
              </View>

              {/* ==================================================
                  NO TELEPON
              ================================================== */}

              <View style={styles.inputGroup}>
                <Text style={styles.label}>No. Telepon</Text>

                <TextInput
                  style={[
                    styles.input,
                    errors.noTelp && {
                      borderColor: "#EF4444",
                    },
                  ]}
                  placeholder="Contoh: 08123456789"
                  placeholderTextColor="#94A3B8"
                  value={noTelp}
                  onChangeText={(value) => {
                    const onlyNumber = value.replace(/\D/g, "");

                    setNoTelp(onlyNumber);

                    clearError("noTelp");
                  }}
                  keyboardType="phone-pad"
                  maxLength={13}
                  editable={!loading}
                />

                {errors.noTelp && (
                  <Text
                    style={{
                      color: "#EF4444",
                      fontSize: 12,
                      marginTop: 5,
                    }}
                  >
                    {errors.noTelp}
                  </Text>
                )}
              </View>

              {/* ==================================================
                  EMAIL
              ================================================== */}

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>

                <TextInput
                  style={[
                    styles.input,
                    errors.email && {
                      borderColor: "#EF4444",
                    },
                  ]}
                  placeholder="Masukkan email"
                  placeholderTextColor="#94A3B8"
                  value={email}
                  onChangeText={(value) => {
                    setEmail(value);
                    clearError("email");
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!loading}
                />

                {errors.email && (
                  <Text
                    style={{
                      color: "#EF4444",
                      fontSize: 12,
                      marginTop: 5,
                    }}
                  >
                    {errors.email}
                  </Text>
                )}
              </View>

              {/* ==================================================
                  PASSWORD
              ================================================== */}

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>

                <View
                  style={{
                    position: "relative",
                  }}
                >
                  <TextInput
                    style={[
                      styles.input,
                      {
                        paddingRight: 50,
                      },
                      errors.password && {
                        borderColor: "#EF4444",
                      },
                    ]}
                    placeholder="Minimal 8 karakter"
                    placeholderTextColor="#94A3B8"
                    value={password}
                    onChangeText={(value) => {
                      setPassword(value);
                      clearError("password");
                    }}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!loading}
                  />

                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      right: 15,
                      top: 0,
                      bottom: 0,
                      justifyContent: "center",
                    }}
                    onPress={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    <Ionicons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={21}
                      color="#94A3B8"
                    />
                  </TouchableOpacity>
                </View>

                {errors.password && (
                  <Text
                    style={{
                      color: "#EF4444",
                      fontSize: 12,
                      marginTop: 5,
                    }}
                  >
                    {errors.password}
                  </Text>
                )}
              </View>

              {/* ==================================================
                  KONFIRMASI PASSWORD
              ================================================== */}

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Konfirmasi Password</Text>

                <View
                  style={{
                    position: "relative",
                  }}
                >
                  <TextInput
                    style={[
                      styles.input,
                      {
                        paddingRight: 50,
                      },
                      errors.passwordConfirmation && {
                        borderColor: "#EF4444",
                      },
                    ]}
                    placeholder="Ulangi password"
                    placeholderTextColor="#94A3B8"
                    value={passwordConfirmation}
                    onChangeText={(value) => {
                      setPasswordConfirmation(value);

                      clearError("passwordConfirmation");
                    }}
                    secureTextEntry={!showPasswordConfirmation}
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!loading}
                  />

                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      right: 15,
                      top: 0,
                      bottom: 0,
                      justifyContent: "center",
                    }}
                    onPress={() =>
                      setShowPasswordConfirmation(!showPasswordConfirmation)
                    }
                    disabled={loading}
                  >
                    <Ionicons
                      name={
                        showPasswordConfirmation
                          ? "eye-off-outline"
                          : "eye-outline"
                      }
                      size={21}
                      color="#94A3B8"
                    />
                  </TouchableOpacity>
                </View>

                {errors.passwordConfirmation && (
                  <Text
                    style={{
                      color: "#EF4444",
                      fontSize: 12,
                      marginTop: 5,
                    }}
                  >
                    {errors.passwordConfirmation}
                  </Text>
                )}
              </View>

              {/* ==================================================
                  JENIS IDENTITAS
              ================================================== */}

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Jenis Identitas</Text>

                <View style={styles.identityContainer}>
                  <TouchableOpacity
                    style={[
                      styles.identityButton,
                      jenisIdentitas === "KTP" && styles.identityButtonActive,
                    ]}
                    onPress={() => {
                      setJenisIdentitas("KTP");

                      clearError("jenisIdentitas");
                    }}
                    activeOpacity={0.8}
                    disabled={loading}
                  >
                    <Text
                      style={[
                        styles.identityText,
                        jenisIdentitas === "KTP" && styles.identityTextActive,
                      ]}
                    >
                      KTP
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.identityButton,
                      jenisIdentitas === "SIM" && styles.identityButtonActive,
                    ]}
                    onPress={() => {
                      setJenisIdentitas("SIM");

                      clearError("jenisIdentitas");
                    }}
                    activeOpacity={0.8}
                    disabled={loading}
                  >
                    <Text
                      style={[
                        styles.identityText,
                        jenisIdentitas === "SIM" && styles.identityTextActive,
                      ]}
                    >
                      SIM
                    </Text>
                  </TouchableOpacity>
                </View>

                {errors.jenisIdentitas && (
                  <Text
                    style={{
                      color: "#EF4444",
                      fontSize: 12,
                      marginTop: 5,
                    }}
                  >
                    {errors.jenisIdentitas}
                  </Text>
                )}
              </View>

              {/* ==================================================
                  FOTO IDENTITAS
              ================================================== */}

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Foto Identitas</Text>

                <TouchableOpacity
                  style={[
                    styles.uploadButton,
                    errors.fotoIdentitas && {
                      borderColor: "#EF4444",
                    },
                  ]}
                  onPress={handlePickImage}
                  activeOpacity={0.8}
                  disabled={loading}
                >
                  <View>
                    <Ionicons name="camera-outline" size={28} color="#7A8CFF" />
                  </View>

                  <View style={styles.uploadContent}>
                    <Text style={styles.uploadTitle}>
                      {fotoIdentitas
                        ? "Ganti Foto Identitas"
                        : "Upload Foto Identitas"}
                    </Text>

                    <Text style={styles.uploadDescription}>
                      Pilih foto KTP atau SIM
                    </Text>
                  </View>

                  <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
                </TouchableOpacity>

                {errors.fotoIdentitas && (
                  <Text
                    style={{
                      color: "#EF4444",
                      fontSize: 12,
                      marginTop: 5,
                    }}
                  >
                    {errors.fotoIdentitas}
                  </Text>
                )}

                {fotoIdentitas && (
                  <View style={styles.imagePreviewContainer}>
                    <Image
                      source={{
                        uri: fotoIdentitas,
                      }}
                      style={styles.imagePreview}
                      resizeMode="cover"
                    />

                    <TouchableOpacity
                      style={styles.removeImageButton}
                      onPress={() => setFotoIdentitas(null)}
                      activeOpacity={0.8}
                      disabled={loading}
                    >
                      <Ionicons
                        name="trash-outline"
                        size={16}
                        color="#EF4444"
                      />

                      <Text style={styles.removeImageText}>Hapus Foto</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              {/* ==================================================
                  BUTTON REGISTER
              ================================================== */}

              <TouchableOpacity
                onPress={handleRegister}
                activeOpacity={0.85}
                disabled={loading}
              >
                <LinearGradient
                  colors={["#27A9D9", "#2776D8", "#3448D6"]}
                  start={{
                    x: 0,
                    y: 0.5,
                  }}
                  end={{
                    x: 1,
                    y: 0.5,
                  }}
                  style={styles.registerButton}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <>
                      <Text style={styles.registerButtonText}>Daftar</Text>
                    </>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* ==================================================
                LOGIN
            ================================================== */}

            <View style={styles.loginSection}>
              <Text style={styles.loginText}>Sudah punya akun?</Text>

              <TouchableOpacity
                onPress={() => router.push("/auth/login")}
                activeOpacity={0.7}
                disabled={loading}
              >
                <Text style={styles.loginLink}>Login sekarang</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.footerText}>© 2026 Amanah Elektronik</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
