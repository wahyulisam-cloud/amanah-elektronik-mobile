import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  /* ==================================================
     PAGE
  ================================================== */

  page: {
    flex: 1,

    backgroundColor: "#071735",

    position: "relative",
  },


  /* ==================================================
     BACKGROUND GRADIENT
  ================================================== */

  backgroundGradient: {
    position: "absolute",

    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    width: "100%",
    height: "100%",
  },


  /* ==================================================
     SCROLL
  ================================================== */

  scrollView: {
    flex: 1,

    backgroundColor: "transparent",
  },

  scrollContent: {
    flexGrow: 1,

    alignItems: "center",

    paddingHorizontal: 24,

    paddingVertical: 45,
  },


  /* ==================================================
     DECORATIVE CIRCLES
  ================================================== */

  circle: {
    position: "absolute",

    borderRadius: 999,

    borderWidth: 1,

    borderColor: "rgba(77, 154, 255, 0.16)",
  },


  /* ==================================================
     TOP LEFT CIRCLE
  ================================================== */

  circleTopLeft: {
    width: 420,
    height: 420,

    left: -230,
    top: -120,

    backgroundColor: "rgba(45, 102, 220, 0.10)",
  },

  circleTopLeftMobile: {
    width: 280,
    height: 280,

    left: -150,
    top: -80,
  },


  /* ==================================================
     RIGHT CIRCLE
  ================================================== */

  circleRight: {
    width: 450,
    height: 450,

    right: -250,
    top: "30%",

    backgroundColor: "rgba(30, 104, 255, 0.08)",
  },

  circleRightMobile: {
    width: 300,
    height: 300,

    right: -180,

    top: "35%",
  },


  /* ==================================================
     BOTTOM CIRCLE
  ================================================== */

  circleBottom: {
    width: 350,
    height: 350,

    left: "25%",
    bottom: -180,

    backgroundColor: "rgba(0, 166, 255, 0.06)",

    borderWidth: 0,
  },

  circleBottomMobile: {
    width: 230,
    height: 230,

    left: "20%",

    bottom: -120,
  },


  /* ==================================================
     REGISTER CONTAINER
  ================================================== */

  registerContainer: {
    width: "100%",

    maxWidth: 500,

    paddingHorizontal: 32,

    paddingVertical: 34,

    borderRadius: 30,

    /*
      GLASS EFFECT
    */

    backgroundColor: "rgba(255,255,255,0.075)",

    borderWidth: 1,

    borderColor: "rgba(111,178,255,0.30)",

    shadowColor: "#000B25",

    shadowOpacity: 0.45,

    shadowRadius: 30,

    shadowOffset: {
      width: 0,
      height: 14,
    },

    elevation: 12,
  },


  /* ==================================================
     MOBILE CONTAINER
  ================================================== */

  registerContainerMobile: {
    maxWidth: 390,

    paddingHorizontal: 22,

    paddingVertical: 28,

    borderRadius: 26,
  },


  /* ==================================================
     HEADER
  ================================================== */

  header: {
    alignItems: "center",

    marginBottom: 30,
  },


  /* ==================================================
     LOGO CIRCLE
  ================================================== */

  logoCircle: {
    width: 64,
    height: 64,

    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 16,

    backgroundColor: "rgba(255,255,255,0.08)",

    borderWidth: 1,

    borderColor: "rgba(85,166,255,0.35)",

    shadowColor: "#168BFF",

    shadowOpacity: 0.30,

    shadowRadius: 18,

    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 8,
  },


  logoText: {
    fontSize: 27,

    fontWeight: "800",

    color: "#6CB8FF",
  },


  /* ==================================================
     TITLE
  ================================================== */

  title: {
    fontSize: 28,

    fontWeight: "800",

    color: "#FFFFFF",

    textAlign: "center",
  },


  subtitle: {
    marginTop: 7,

    fontSize: 14,

    lineHeight: 21,

    color: "rgba(215,228,255,0.68)",

    textAlign: "center",
  },


  /* ==================================================
     FORM
  ================================================== */

  form: {
    width: "100%",
  },


  inputGroup: {
    marginBottom: 18,
  },
  /* ========================================
     BRAND
  ======================================== */

  brandContainer: {
    alignItems: "center",

    marginBottom: 36,
  },


  /* LOGO */

  brandLogo: {
    width: 64,
    height: 64,

    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 15,

    backgroundColor: "rgba(255,255,255,0.08)",

    borderWidth: 1,

    borderColor: "rgba(85,166,255,0.35)",

    shadowColor: "#168BFF",

    shadowOpacity: 0.35,

    shadowRadius: 18,

    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 8,
  },


  /* BRAND TITLE */

  brandTitle: {
    fontSize: 27,

    fontWeight: "800",

    color: "#FFFFFF",

    textAlign: "center",
  },


  /* BRAND SUBTITLE */

  brandSubtitle: {
    marginTop: 6,

    fontSize: 14,

    color: "rgba(210,225,255,0.70)",

    textAlign: "center",
  },

  /* ==================================================
     LABEL
  ================================================== */

  label: {
    marginBottom: 8,

    fontSize: 13,

    fontWeight: "700",

    color: "rgba(235,243,255,0.90)",
  },


  /* ==================================================
     INPUT
  ================================================== */

  input: {
    width: "100%",

    minHeight: 56,

    paddingHorizontal: 16,

    borderRadius: 16,

    borderWidth: 1,

    borderColor: "rgba(135,185,255,0.26)",

    backgroundColor: "rgba(255,255,255,0.055)",

    color: "#FFFFFF",

    fontSize: 14,
  },


  /* ==================================================
     TEXT AREA
  ================================================== */

  textArea: {
    minHeight: 100,

    paddingTop: 15,

    paddingBottom: 15,
  },


  /* ==================================================
     IDENTITAS CONTAINER
  ================================================== */

  identityContainer: {
    flexDirection: "row",

    gap: 12,
  },


  /* ==================================================
     IDENTITY BUTTON
  ================================================== */

  identityButton: {
    flex: 1,

    minHeight: 54,

    alignItems: "center",

    justifyContent: "center",

    borderRadius: 16,

    borderWidth: 1,

    borderColor: "rgba(135,185,255,0.26)",

    backgroundColor: "rgba(255,255,255,0.055)",
  },


  /* ACTIVE KTP / SIM */

  identityButtonActive: {
    backgroundColor: "rgba(55,143,255,0.25)",

    borderColor: "#4DA7FF",

    shadowColor: "#268AFF",

    shadowOpacity: 0.22,

    shadowRadius: 10,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,
  },


  identityText: {
    fontSize: 14,

    fontWeight: "700",

    color: "rgba(220,233,255,0.70)",
  },


  identityTextActive: {
    color: "#FFFFFF",

    fontWeight: "800",
  },


  /* ==================================================
     UPLOAD BUTTON
  ================================================== */

  uploadButton: {
    minHeight: 82,

    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal: 18,

    borderRadius: 18,

    borderWidth: 1,

    borderStyle: "dashed",

    borderColor: "rgba(94,174,255,0.55)",

    backgroundColor: "rgba(255,255,255,0.045)",
  },


  /* ==================================================
     UPLOAD ICON
  ================================================== */

  uploadIcon: {
    fontSize: 28,

    marginRight: 14,
  },


  uploadContent: {
    flex: 1,
  },


  uploadTitle: {
    fontSize: 14,

    fontWeight: "800",

    color: "#FFFFFF",
  },


  uploadDescription: {
    marginTop: 4,

    fontSize: 12,

    color: "rgba(190,215,255,0.58)",
  },


  /* ==================================================
     IMAGE PREVIEW
  ================================================== */

  imagePreviewContainer: {
    marginTop: 14,

    alignItems: "center",

    padding: 8,

    borderRadius: 18,

    backgroundColor: "rgba(255,255,255,0.04)",

    borderWidth: 1,

    borderColor: "rgba(135,185,255,0.18)",
  },


  imagePreview: {
    width: "100%",

    height: 190,

    borderRadius: 13,
  },


  /* ==================================================
     REMOVE IMAGE BUTTON
  ================================================== */

  removeImageButton: {
    marginTop: 12,

    paddingHorizontal: 18,

    paddingVertical: 9,

    borderRadius: 10,

    backgroundColor: "rgba(255,255,255,0.08)",

    borderWidth: 1,

    borderColor: "rgba(255,100,100,0.40)",
  },


  removeImageText: {
    color: "#FF9B9B",

    fontSize: 12,

    fontWeight: "700",
  },


  /* ==================================================
     REGISTER BUTTON
  ================================================== */

  registerButton: {
    width: "100%",

    minHeight: 56,

    alignItems: "center",

    justifyContent: "center",

    marginTop: 8,

    borderRadius: 17,

    backgroundColor: "#2B83E8",

    shadowColor: "#237BFF",

    shadowOpacity: 0.45,

    shadowRadius: 16,

    shadowOffset: {
      width: 0,
      height: 7,
    },

    elevation: 8,
  },


  registerButtonText: {
    fontSize: 16,

    fontWeight: "800",

    color: "#FFFFFF",
  },


  /* ==================================================
     LOGIN SECTION
  ================================================== */

  loginSection: {
    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

    flexWrap: "wrap",

    marginTop: 28,
  },


  loginText: {
    fontSize: 14,

    color: "rgba(215,228,255,0.68)",
  },


  loginLink: {
    marginLeft: 6,

    fontSize: 14,

    fontWeight: "800",

    color: "#49B8FF",
  },


  /* ==================================================
     FOOTER
  ================================================== */

  footerText: {
    marginTop: 30,

    fontSize: 11,

    color: "rgba(190,210,245,0.40)",

    textAlign: "center",
  },
  /* ==================================================
     SUCCESS MODAL
  ================================================== */

  successModalOverlay: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 24,

    backgroundColor: "rgba(3, 12, 32, 0.78)",
  },


  successModalContainer: {
    width: "100%",
    maxWidth: 430,

    paddingHorizontal: 30,
    paddingVertical: 32,

    borderRadius: 28,

    alignItems: "center",

    backgroundColor: "#0C2147",

    borderWidth: 1,

    borderColor: "rgba(91,174,255,0.30)",

    shadowColor: "#000000",

    shadowOpacity: 0.45,

    shadowRadius: 30,

    shadowOffset: {
      width: 0,
      height: 15,
    },

    elevation: 15,
  },


  successModalContainerMobile: {
    maxWidth: 360,

    paddingHorizontal: 24,

    paddingVertical: 28,

    borderRadius: 25,
  },


  /* ==================================================
     SUCCESS ICON
  ================================================== */

  successIconContainer: {
    width: 76,
    height: 76,

    borderRadius: 38,

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 20,

    backgroundColor: "#1F9D78",

    borderWidth: 5,

    borderColor: "rgba(99,255,202,0.12)",

    shadowColor: "#29D69D",

    shadowOpacity: 0.35,

    shadowRadius: 18,

    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 8,
  },


  /* ==================================================
     SUCCESS TITLE
  ================================================== */

  successModalTitle: {
    fontSize: 23,

    fontWeight: "800",

    color: "#FFFFFF",

    textAlign: "center",

    marginBottom: 10,
  },


  /* ==================================================
     SUCCESS MESSAGE
  ================================================== */

  successModalMessage: {
    fontSize: 14,

    lineHeight: 21,

    color: "rgba(220,232,255,0.72)",

    textAlign: "center",

    maxWidth: 340,

    marginBottom: 20,
  },


  /* ==================================================
     SUCCESS INFO
  ================================================== */

  successInfoBox: {
    width: "100%",

    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal: 14,

    paddingVertical: 13,

    borderRadius: 14,

    backgroundColor: "rgba(73,184,255,0.08)",

    borderWidth: 1,

    borderColor: "rgba(73,184,255,0.16)",

    marginBottom: 22,
  },


  successInfoText: {
    flex: 1,

    marginLeft: 10,

    fontSize: 12,

    lineHeight: 18,

    color: "rgba(210,228,255,0.68)",
  },


  /* ==================================================
     SUCCESS BUTTON
  ================================================== */

  successButtonWrapper: {
    width: "100%",
  },


  successButton: {
    width: "100%",

    minHeight: 54,

    borderRadius: 16,

    alignItems: "center",

    justifyContent: "center",

    flexDirection: "row",

    gap: 9,

    shadowColor: "#237BFF",

    shadowOpacity: 0.35,

    shadowRadius: 15,

    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 7,
  },


  successButtonText: {
    fontSize: 15,

    fontWeight: "800",

    color: "#FFFFFF",
  },
});
export default styles;