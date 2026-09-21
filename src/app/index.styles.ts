import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  /* ==================================================
     PAGE
  ================================================== */

  page: {
    flex: 1,
    backgroundColor: "#07184D",
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
    minHeight: "100%",

    backgroundColor: "transparent",
  },

  /* ==================================================
     DECORATIVE CIRCLES
  ================================================== */

  circle: {
    position: "absolute",

    borderRadius: 999,

    zIndex: 0,

    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.035)",
  },

  /* --------------------------------------------------
     TOP LEFT CIRCLE
  -------------------------------------------------- */

  circleTopLeft: {
    width: 360,
    height: 360,

    left: -160,
    top: 70,

    backgroundColor: "rgba(0, 220, 255, 0.07)",
  },

  circleTopLeftMobile: {
    width: 190,
    height: 190,

    left: -95,
    top: 80,
  },

  /* --------------------------------------------------
     CENTER CIRCLE
  -------------------------------------------------- */

  circleCenter: {
    width: 430,
    height: 430,

    left: "38%",
    top: "30%",

    backgroundColor: "rgba(0, 125, 255, 0.055)",
  },

  circleCenterMobile: {
    width: 230,
    height: 230,

    left: "55%",
    top: "34%",
  },

  /* --------------------------------------------------
     BOTTOM RIGHT CIRCLE
  -------------------------------------------------- */

  circleBottomRight: {
    width: 420,
    height: 420,

    right: -170,
    bottom: -100,

    backgroundColor: "rgba(0, 180, 255, 0.05)",
  },

  circleBottomRightMobile: {
    width: 220,
    height: 220,

    right: -120,
    bottom: 60,
  },

  /* --------------------------------------------------
     BOTTOM LEFT CIRCLE
  -------------------------------------------------- */

  circleBottomLeft: {
    width: 180,
    height: 180,

    left: 40,
    bottom: 40,

    backgroundColor: "rgba(0, 210, 255, 0.045)",

    borderWidth: 0,
  },

  circleBottomLeftMobile: {
    width: 100,
    height: 100,

    left: -45,
    bottom: 120,
  },

  /* ==================================================
     TOP BAR
  ================================================== */

  topBar: {
    width: "100%",
    maxWidth: 1200,

    alignSelf: "center",

    paddingHorizontal: 40,
    paddingTop: 25,

    alignItems: "flex-end",

    zIndex: 10,
  },

  topBarMobile: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  /* ==================================================
     AUTH BUTTONS
  ================================================== */

  authButtons: {
    flexDirection: "row",

    alignItems: "center",

    gap: 10,
  },

  /* ==================================================
     LOGIN BUTTON
  ================================================== */

  loginButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,

    borderRadius: 10,

    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderColor: "#D5DEED",

    shadowColor: "#001F5C",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 3,
  },

  loginText: {
    fontSize: 14,

    fontWeight: "700",

    color: "#123B8E",
  },

  /* ==================================================
     REGISTER BUTTON
  ================================================== */

  registerButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,

    borderRadius: 10,

    backgroundColor: "#123B8E",

    shadowColor: "#001F5C",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,
  },

  registerText: {
    fontSize: 14,

    fontWeight: "700",

    color: "#FFFFFF",
  },

  /* ==================================================
     MAIN CONTENT
  ================================================== */

  mainContent: {
    flex: 1,

    alignItems: "center",

    justifyContent: "center",

    paddingHorizontal: 20,

    paddingVertical: 50,

    minHeight: 620,

    backgroundColor: "transparent",

    zIndex: 2,
  },

  mainContentMobile: {
    minHeight: 580,

    paddingHorizontal: 25,

    paddingVertical: 35,
  },

  /* ==================================================
     IMAGE / GLASS CONTAINER
  ================================================== */

  imageWrapper: {
    width: 420,
    height: 350,

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 28,

    borderRadius: 32,

    /*
      Glassmorphism transparan
      Tidak menggunakan putih solid
    */
    backgroundColor: "rgba(255, 255, 255, 0.08)",

    borderWidth: 1,

    borderColor: "rgba(255, 255, 255, 0.18)",

    /*
      Shadow lembut
    */
    shadowColor: "#001A4D",
    shadowOpacity: 0.18,
    shadowRadius: 20,

    shadowOffset: {
      width: 0,
      height: 10,
    },

    elevation: 8,
  },

  imageWrapperMobile: {
    width: 310,
    height: 260,

    marginBottom: 24,

    borderRadius: 28,
  },

  image: {
    width: "96%",
    height: "96%",
  },

  /* ==================================================
     TITLE
  ================================================== */

  title: {
    fontSize: 30,

    fontWeight: "800",

    color: "#FFFFFF",

    textAlign: "center",

    letterSpacing: 1,
  },

  /* ==================================================
     DESCRIPTION
  ================================================== */

  description: {
    maxWidth: 520,

    marginTop: 12,

    fontSize: 15,

    lineHeight: 24,

    color: "rgba(255, 255, 255, 0.82)",

    textAlign: "center",
  },

  /* ==================================================
     FOOTER
  ================================================== */

  footer: {
    width: "100%",

    paddingVertical: 22,

    paddingHorizontal: 20,

    alignItems: "center",

    borderTopWidth: 1,

    borderTopColor: "rgba(255, 255, 255, 0.12)",

    backgroundColor: "rgba(4, 25, 75, 0.55)",

    zIndex: 5,
  },

  footerTitle: {
    fontSize: 13,

    fontWeight: "700",

    color: "#FFFFFF",

    textAlign: "center",
  },

  footerText: {
    marginTop: 5,

    fontSize: 11,

    color: "rgba(255, 255, 255, 0.65)",

    textAlign: "center",
  },

});

export default styles;