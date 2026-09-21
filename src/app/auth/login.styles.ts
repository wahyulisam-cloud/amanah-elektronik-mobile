import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  /* ==========================================================
     PAGE
  ========================================================== */

  page: {
    flex: 1,
    backgroundColor: "#071735",
    position: "relative",
    overflow: "hidden",
  },

  /* ==========================================================
     BACKGROUND
  ========================================================== */

  backgroundGradient: {
    position: "absolute",

    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    width: "100%",
    height: "100%",
  },

  /* ==========================================================
     SCROLL
  ========================================================== */

  scrollView: {
    flex: 1,
    backgroundColor: "transparent",
  },

  scrollContent: {
    flexGrow: 1,

    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 24,
    paddingVertical: 38,
  },

  scrollContentMobile: {
    paddingHorizontal: 20,
    paddingVertical: 28,
  },

  scrollContentSmall: {
    paddingHorizontal: 16,
    paddingVertical: 22,
  },

  scrollContentShort: {
    justifyContent: "flex-start",
    paddingTop: 24,
    paddingBottom: 24,
  },

  /* ==========================================================
     DECORATIVE CIRCLES
  ========================================================== */

  circle: {
    position: "absolute",

    borderRadius: 999,

    borderWidth: 1,

    borderColor: "rgba(77,154,255,0.13)",

    backgroundColor: "rgba(45,102,220,0.055)",
  },

  /* TOP RIGHT */

  circleTopRight: {
    width: 390,
    height: 390,

    right: -190,
    top: -135,
  },

  circleTopRightMobile: {
    width: 280,
    height: 280,

    right: -155,
    top: -105,
  },

  /* BOTTOM LEFT */

  circleBottomLeft: {
    width: 390,
    height: 390,

    left: -220,
    bottom: -190,

    backgroundColor: "rgba(30,104,255,0.055)",
  },

  circleBottomLeftMobile: {
    width: 270,
    height: 270,

    left: -160,
    bottom: -130,
  },

  /* ==========================================================
     GLOW
  ========================================================== */

  glow: {
    position: "absolute",

    width: 190,
    height: 190,

    borderRadius: 999,

    backgroundColor: "rgba(0,166,255,0.055)",
  },

  glowLeft: {
    left: -125,
    top: "43%",
  },

  glowLeftMobile: {
    width: 145,
    height: 145,

    left: -95,
    top: "42%",
  },

  glowRight: {
    right: -125,
    top: "57%",

    backgroundColor: "rgba(57,91,255,0.07)",
  },

  glowRightMobile: {
    width: 145,
    height: 145,

    right: -95,
    top: "58%",
  },

  /* ==========================================================
     BRAND
  ========================================================== */

  brandContainer: {
    alignItems: "center",

    marginBottom: 22,
  },

  brandContainerMobile: {
    marginBottom: 20,
  },

  /* LOGO */

  brandLogo: {
    width: 56,
    height: 56,

    borderRadius: 18,

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 11,

    backgroundColor: "rgba(255,255,255,0.07)",

    borderWidth: 1,

    borderColor: "rgba(85,166,255,0.27)",

    shadowColor: "#168BFF",

    shadowOpacity: 0.25,

    shadowRadius: 14,

    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 7,
  },

  brandLogoMobile: {
    width: 55,
    height: 55,

    borderRadius: 16,

    marginBottom: 10,
  },

  /* BRAND TITLE */

  brandTitle: {
    fontSize: 27,

    fontWeight: "800",

    color: "#FFFFFF",

    textAlign: "center",

    letterSpacing: 0.1,
  },

  brandTitleMobile: {
    fontSize: 26,
  },
  brandSubtitle: {
    marginTop: 5,
    fontSize: 13,
    fontWeight: "500",
    color: "rgba(210,225,255,0.65)",
    textAlign: "center",
  },

  brandSubtitleMobile: {
    fontSize: 14,
    marginTop: 4,
  },
  /* ==========================================================
     LOGIN CARD
  ========================================================== */

  loginContainer: {
    width: "100%",

    maxWidth: 420,

    paddingHorizontal: 30,

    paddingVertical: 28,

    borderRadius: 26,

    backgroundColor: "rgba(255,255,255,0.075)",

    borderWidth: 1,

    borderColor: "rgba(111,178,255,0.27)",

    shadowColor: "#000B25",

    shadowOpacity: 0.42,

    shadowRadius: 25,

    shadowOffset: {
      width: 0,
      height: 12,
    },

    elevation: 10,
  },

  loginContainerMobile: {
    maxWidth: 390,

    paddingHorizontal: 23,

    paddingVertical: 25,

    borderRadius: 24,
  },

  loginContainerSmall: {
    paddingHorizontal: 19,

    paddingVertical: 23,

    borderRadius: 22,
  },

  /* ==========================================================
     HEADER
  ========================================================== */

  header: {
    alignItems: "center",

    marginBottom: 24,
  },

  /* TITLE */

  title: {
    fontSize: 25,

    fontWeight: "800",

    color: "#FFFFFF",

    textAlign: "center",

    letterSpacing: -0.2,
  },

  /* SUBTITLE */

  subtitle: {
    marginTop: 6,

    fontSize: 13,

    color: "rgba(215,228,255,0.62)",

    textAlign: "center",

    lineHeight: 19,
  },

  /* ==========================================================
     FORM
  ========================================================== */

  form: {
    width: "100%",
  },

  /* ==========================================================
     INPUT
  ========================================================== */

  inputWrapper: {
    width: "100%",

    height: 54,

    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal: 16,

    borderRadius: 15,

    backgroundColor: "rgba(255,255,255,0.052)",

    borderWidth: 1,

    borderColor: "rgba(135,185,255,0.22)",
  },

  inputWrapperError: {
    borderWidth: 1,

    borderColor: "#EF4444",

    backgroundColor: "rgba(239,68,68,0.035)",
  },

  /* INPUT ICON */

  inputIcon: {
    marginRight: 12,
  },

  /* INPUT */

  input: {
    flex: 1,

    height: "100%",

    fontSize: 14,

    color: "#FFFFFF",

    paddingVertical: 0,
  },

  /* EYE */

  eyeButton: {
    width: 34,
    height: 40,

    alignItems: "flex-end",

    justifyContent: "center",
  },

  /* PASSWORD */

  passwordSection: {
    marginTop: 20,
  },

  /* ==========================================================
     ERRORS
  ========================================================== */

  errorRow: {
    flexDirection: "row",

    alignItems: "flex-start",

    marginTop: 6,

    paddingHorizontal: 3,
  },

  errorText: {
    flex: 1,

    marginLeft: 5,

    color: "#EF4444",

    fontSize: 11,

    lineHeight: 16,
  },

  generalError: {
    flexDirection: "row",

    alignItems: "center",

    marginTop: 13,

    paddingVertical: 9,

    paddingHorizontal: 11,

    borderRadius: 9,

    backgroundColor: "rgba(239,68,68,0.08)",

    borderWidth: 1,

    borderColor: "rgba(239,68,68,0.20)",
  },

  generalErrorText: {
    flex: 1,

    marginLeft: 7,

    color: "#EF4444",

    fontSize: 11,

    lineHeight: 16,
  },

  /* ==========================================================
     LOGIN BUTTON
  ========================================================== */

  loginButtonWrapper: {
    width: "100%",

    marginTop: 19,

    borderRadius: 15,

    overflow: "hidden",
  },

  loginButton: {
    width: "100%",

    height: 54,

    borderRadius: 15,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    shadowColor: "#237BFF",

    shadowOpacity: 0.35,

    shadowRadius: 14,

    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 7,
  },

  loginButtonText: {
    fontSize: 16,

    fontWeight: "800",

    color: "#FFFFFF",
  },

  loginButtonIcon: {
    marginLeft: 9,
  },

  /* ==========================================================
     REGISTER
  ========================================================== */

  registerSection: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    flexWrap: "wrap",

    marginTop: 20,
  },

  registerSectionMobile: {
    marginTop: 18,
  },

  registerText: {
    fontSize: 12,

    color: "rgba(215,228,255,0.60)",
  },

  registerLink: {
    marginLeft: 5,

    fontSize: 12,

    fontWeight: "800",

    color: "#49B8FF",
  },

  /* ==========================================================
     FOOTER
  ========================================================== */

  footerText: {
    marginTop: 19,

    fontSize: 10,

    color: "rgba(190,210,245,0.35)",

    textAlign: "center",
  },

  /* ==========================================================
   SUCCESS TOAST
========================================================== */

  successToast: {
    position: "absolute",

    zIndex: 1000,

    top: 72,

    alignSelf: "center",

    width: "88%",

    maxWidth: 360,

    minHeight: 68,

    flexDirection: "row",

    alignItems: "center",

    paddingVertical: 13,

    paddingHorizontal: 15,

    borderRadius: 17,

    backgroundColor: "rgba(7,26,61,0.96)",

    borderWidth: 1,

    borderColor: "rgba(34,197,94,0.32)",

    shadowColor: "#000",

    shadowOpacity: 0.38,

    shadowRadius: 22,

    shadowOffset: {
      width: 0,
      height: 10,
    },

    elevation: 15,
  },

  successToastIcon: {
    width: 38,
    height: 38,

    borderRadius: 19,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#22C55E",

    marginRight: 12,
  },

  successToastContent: {
    flex: 1,
  },

  successToastTitle: {
    color: "#FFFFFF",

    fontSize: 14,

    fontWeight: "800",
  },

  successToastText: {
    color: "rgba(220,235,255,0.68)",

    fontSize: 11,

    marginTop: 3,

    lineHeight: 16,
  },
});

export default styles;
