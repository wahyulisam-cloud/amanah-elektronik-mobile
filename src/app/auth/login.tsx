import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  ActivityIndicator,
  Animated,
} from "react-native";

import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import styles from "./login.styles";

import { loginPelanggan } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const router = useRouter();

  const { setAuthData } = useAuth();

  const { width, height } = useWindowDimensions();

  const isMobile = width < 768;
  const isSmallMobile = width < 380;
  const isShortScreen = height < 700;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const toastOpacity = React.useRef(new Animated.Value(0)).current;
  const toastTranslateY = React.useRef(new Animated.Value(-15)).current;

  // ==========================================================
  // VALIDASI EMAIL
  // ==========================================================

  const validateEmail = (value: string) => {
    const emailValue = value.trim();

    if (!emailValue) {
      return "Email pelanggan wajib diisi.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailValue)) {
      return "Format email tidak valid.";
    }

    return "";
  };

  // ==========================================================
  // EMAIL CHANGE
  // ==========================================================

  const handleEmailChange = (value: string) => {
    setEmail(value);

    if (emailError) {
      setEmailError("");
    }

    if (generalError) {
      setGeneralError("");
    }
  };

  // ==========================================================
  // PASSWORD CHANGE
  // ==========================================================

  const handlePasswordChange = (value: string) => {
    setPassword(value);

    if (passwordError) {
      setPasswordError("");
    }

    if (generalError) {
      setGeneralError("");
    }
  };

  // ==========================================================
  // SUCCESS TOAST
  // ==========================================================

  const showLoginSuccess = () => {
    setShowSuccessToast(true);

    toastOpacity.setValue(0);
    toastTranslateY.setValue(-15);

    Animated.parallel([
      Animated.timing(toastOpacity, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),

      Animated.spring(toastTranslateY, {
        toValue: 0,
        friction: 8,
        tension: 70,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      Animated.parallel([
        Animated.timing(toastOpacity, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),

        Animated.timing(toastTranslateY, {
          toValue: -10,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowSuccessToast(false);
      });
    }, 1800);
  };

  // ==========================================================
  // LOGIN
  // ==========================================================

  const handleLogin = async () => {
    setEmailError("");
    setPasswordError("");
    setGeneralError("");

    const emailValidation = validateEmail(email);

    if (emailValidation) {
      setEmailError(emailValidation);
      return;
    }

    if (!password.trim()) {
      setPasswordError("Password wajib diisi.");
      return;
    }

    try {
      setLoading(true);

      const result = await loginPelanggan(email.trim(), password);

      if (!result?.success) {
        const message = result?.message || "Email atau password salah.";

        const lowerMessage = String(message).toLowerCase();

        if (
          lowerMessage.includes("email") ||
          lowerMessage.includes("pelanggan") ||
          lowerMessage.includes("akun") ||
          lowerMessage.includes("user")
        ) {
          setEmailError(message);
        } else if (
          lowerMessage.includes("password") ||
          lowerMessage.includes("credential") ||
          lowerMessage.includes("credentials")
        ) {
          setPasswordError(message);
        } else {
          setGeneralError(message);
        }

        return;
      }

      if (!result?.token) {
        setGeneralError("Token login tidak ditemukan.");
        return;
      }

      if (!result?.data) {
        setGeneralError("Data pelanggan tidak ditemukan.");
        return;
      }

      await setAuthData(result.token, result.data);

      // ======================================================
      // LOGIN BERHASIL
      // ======================================================

      setLoading(false);

      showLoginSuccess();

      setTimeout(() => {
        router.replace("/(tabs)");
      }, 1600);
    } catch (error: any) {
      console.error("LOGIN ERROR:", error);

      if (error?.response) {
        const status = error.response.status;

        const message =
          error.response.data?.message || "Email atau password salah.";

        if (status === 401) {
          setPasswordError("Email atau password salah.");
          return;
        }

        if (status === 422) {
          const errors = error.response.data?.errors;

          if (errors?.email?.[0]) {
            setEmailError(errors.email[0]);
          }

          if (errors?.password?.[0]) {
            setPasswordError(errors.password[0]);
          }

          if (!errors?.email?.[0] && !errors?.password?.[0]) {
            setGeneralError(message);
          }

          return;
        }

        setGeneralError(message);

        return;
      }

      setGeneralError("Tidak dapat terhubung ke server Laravel.");
    } finally {
      if (!showSuccessToast) {
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.page}>
      {/* ===================================================== */}
      {/* BACKGROUND */}
      {/* ===================================================== */}

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

      {/* ===================================================== */}
      {/* DECORATIVE BACKGROUND */}
      {/* ===================================================== */}

      <View
        pointerEvents="none"
        style={[
          styles.circle,
          styles.circleTopRight,
          isMobile && styles.circleTopRightMobile,
        ]}
      />

      <View
        pointerEvents="none"
        style={[
          styles.circle,
          styles.circleBottomLeft,
          isMobile && styles.circleBottomLeftMobile,
        ]}
      />

      <View
        pointerEvents="none"
        style={[
          styles.glow,
          styles.glowLeft,
          isMobile && styles.glowLeftMobile,
        ]}
      />

      <View
        pointerEvents="none"
        style={[
          styles.glow,
          styles.glowRight,
          isMobile && styles.glowRightMobile,
        ]}
      />

      {/* ===================================================== */}
      {/* SUCCESS TOAST */}
      {/* ===================================================== */}

      {showSuccessToast && (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.successToast,
            {
              opacity: toastOpacity,
              transform: [
                {
                  translateY: toastTranslateY,
                },
              ],
            },
          ]}
        >
          <View style={styles.successToastIcon}>
            <Ionicons name="checkmark" size={17} color="#FFFFFF" />
          </View>

          <View style={styles.successToastContent}>
            <Text style={styles.successToastTitle}>Login berhasil</Text>

            <Text style={styles.successToastText}>Selamat datang kembali!</Text>
          </View>
        </Animated.View>
      )}

      {/* ===================================================== */}
      {/* CONTENT */}
      {/* ===================================================== */}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          isMobile && styles.scrollContentMobile,
          isSmallMobile && styles.scrollContentSmall,
          isShortScreen && styles.scrollContentShort,
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bounces={false}
      >
        {/* =================================================== */}
        {/* BRAND */}
        {/* =================================================== */}

        <View
          style={[
            styles.brandContainer,
            isMobile && styles.brandContainerMobile,
          ]}
        >
          <View style={[styles.brandLogo, isMobile && styles.brandLogoMobile]}>
            <Ionicons name="flash" size={28} color="#7A8CFF" />
          </View>

          <Text
            style={[styles.brandTitle, isMobile && styles.brandTitleMobile]}
          >
            Amanah Elektronik
          </Text>

          <Text
            style={[
              styles.brandSubtitle,
              isMobile && styles.brandSubtitleMobile,
            ]}
          >
            Rental Elektronik Terpercaya
          </Text>
        </View>

        {/* =================================================== */}
        {/* LOGIN CARD */}
        {/* =================================================== */}

        <View
          style={[
            styles.loginContainer,
            isMobile && styles.loginContainerMobile,
            isSmallMobile && styles.loginContainerSmall,
          ]}
        >
          {/* HEADER */}

          <View style={styles.header}>
            <Text style={styles.title}>Welcome</Text>

            <Text style={styles.subtitle}>
              Masuk ke akun Anda untuk melanjutkan
            </Text>
          </View>

          {/* FORM */}

          <View style={styles.form}>
            {/* EMAIL */}

            <View>
              <View
                style={[
                  styles.inputWrapper,
                  emailError && styles.inputWrapperError,
                ]}
              >
                <Ionicons
                  name="mail-outline"
                  size={21}
                  color={emailError ? "#EF4444" : "#54A9FF"}
                  style={styles.inputIcon}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Masukkan email"
                  placeholderTextColor="rgba(255,255,255,0.48)"
                  value={email}
                  onChangeText={handleEmailChange}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  editable={!loading}
                  returnKeyType="next"
                />
              </View>

              {emailError ? (
                <View style={styles.errorRow}>
                  <Ionicons
                    name="alert-circle-outline"
                    size={14}
                    color="#EF4444"
                  />

                  <Text style={styles.errorText}>{emailError}</Text>
                </View>
              ) : null}
            </View>

            {/* PASSWORD */}

            <View style={styles.passwordSection}>
              <View
                style={[
                  styles.inputWrapper,
                  passwordError && styles.inputWrapperError,
                ]}
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={passwordError ? "#EF4444" : "#54A9FF"}
                  style={styles.inputIcon}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Masukkan password"
                  placeholderTextColor="rgba(255,255,255,0.48)"
                  value={password}
                  onChangeText={handlePasswordChange}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!loading}
                  returnKeyType="done"
                  onSubmitEditing={handleLogin}
                />

                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  activeOpacity={0.7}
                  disabled={loading}
                  style={styles.eyeButton}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={21}
                    color="rgba(255,255,255,0.60)"
                  />
                </TouchableOpacity>
              </View>

              {passwordError ? (
                <View style={styles.errorRow}>
                  <Ionicons
                    name="alert-circle-outline"
                    size={14}
                    color="#EF4444"
                  />

                  <Text style={styles.errorText}>{passwordError}</Text>
                </View>
              ) : null}
            </View>

            {/* GENERAL ERROR */}

            {generalError ? (
              <View style={styles.generalError}>
                <Ionicons
                  name="alert-circle-outline"
                  size={17}
                  color="#EF4444"
                />

                <Text style={styles.generalErrorText}>{generalError}</Text>
              </View>
            ) : null}

            {/* LOGIN BUTTON */}

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleLogin}
              disabled={loading}
              style={styles.loginButtonWrapper}
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
                style={styles.loginButton}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <>
                    <Text style={styles.loginButtonText}>Login</Text>
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* =================================================== */}
        {/* REGISTER */}
        {/* =================================================== */}

        <View
          style={[
            styles.registerSection,
            isMobile && styles.registerSectionMobile,
          ]}
        >
          <Text style={styles.registerText}>Belum memiliki akun?</Text>

          <TouchableOpacity
            onPress={() => router.push("/auth/register")}
            activeOpacity={0.7}
            disabled={loading}
          >
            <Text style={styles.registerLink}>Daftar sekarang</Text>
          </TouchableOpacity>
        </View>

        {/* =================================================== */}
        {/* FOOTER */}
        {/* =================================================== */}

        <Text style={styles.footerText}>© 2026 Amanah Elektronik</Text>
      </ScrollView>
    </View>
  );
}
