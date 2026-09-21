import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  /* ==================================================
     PAGE
  ================================================== */

  page: {
    flex: 1,
    backgroundColor: "#020D24",
  },

  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  circleTop: {
    position: "absolute",

    width: 360,
    height: 360,

    borderRadius: 180,

    top: -200,
    left: -130,

    backgroundColor: "rgba(0,110,255,0.12)",
  },

  circleRight: {
    position: "absolute",

    width: 280,
    height: 280,

    borderRadius: 140,

    top: 180,
    right: -200,

    backgroundColor: "rgba(0,190,255,0.04)",
  },

  /* ==================================================
     HEADER
  ================================================== */

  header: {
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 18,

    flexDirection: "row",
    alignItems: "center",

    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.07)",
  },

  backButton: {
    width: 44,
    height: 44,

    borderRadius: 14,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(255,255,255,0.06)",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.09)",
  },

  headerTitleContainer: {
    flex: 1,
    marginLeft: 13,
  },

  headerTitle: {
    fontSize: 21,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  headerSubtitle: {
    marginTop: 3,

    fontSize: 12,

    color: "rgba(255,255,255,0.55)",
  },

  clearButton: {
    width: 44,
    height: 44,

    borderRadius: 14,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(239,68,68,0.08)",

    borderWidth: 1,
    borderColor: "rgba(239,68,68,0.15)",
  },

  /* ==================================================
     SCROLL
  ================================================== */

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 30,
  },

  /* ==================================================
     CART CARD
  ================================================== */

  cartCard: {
    flexDirection: "row",

    padding: 13,

    marginBottom: 13,

    borderRadius: 18,

    backgroundColor: "rgba(12,31,67,0.90)",

    borderWidth: 1,
    borderColor: "rgba(97,144,225,0.16)",
  },

  imageContainer: {
    width: 100,
    height: 120,

    borderRadius: 14,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#FFFFFF",

    overflow: "hidden",
  },

  productImage: {
    width: "90%",
    height: "90%",
  },

  productInfo: {
    flex: 1,

    marginLeft: 13,
  },

  productTop: {
    flexDirection: "row",
    alignItems: "flex-start",

    justifyContent: "space-between",
  },

  productName: {
    flex: 1,

    paddingRight: 8,

    fontSize: 15,

    fontWeight: "800",

    lineHeight: 20,

    color: "#FFFFFF",
  },

  productPrice: {
    marginTop: 5,

    fontSize: 14,

    fontWeight: "700",

    color: "#247BFF",
  },

  priceUnit: {
    fontSize: 11,

    fontWeight: "400",

    color: "#94A3B8",
  },

  /* ==================================================
     CONTROL
  ================================================== */

  controlRow: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    marginTop: 11,
  },

  controlLabel: {
    fontSize: 11,

    color: "#94A3B8",
  },

  quantityControl: {
    flexDirection: "row",

    alignItems: "center",

    borderRadius: 9,

    backgroundColor: "rgba(255,255,255,0.06)",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  quantityButton: {
    width: 28,
    height: 28,

    alignItems: "center",
    justifyContent: "center",
  },

  quantityText: {
    minWidth: 28,

    textAlign: "center",

    fontSize: 12,

    fontWeight: "700",

    color: "#FFFFFF",
  },

  durationControl: {
    flexDirection: "row",

    alignItems: "center",

    borderRadius: 9,

    backgroundColor: "rgba(255,255,255,0.06)",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  durationButton: {
    width: 28,
    height: 28,

    alignItems: "center",
    justifyContent: "center",
  },

  durationText: {
    minWidth: 55,

    textAlign: "center",

    fontSize: 11,

    fontWeight: "700",

    color: "#FFFFFF",
  },

  /* ==================================================
     SUBTOTAL
  ================================================== */

  subtotalRow: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    marginTop: 12,

    paddingTop: 10,

    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.07)",
  },

  subtotalLabel: {
    fontSize: 11,

    color: "#94A3B8",
  },

  subtotalValue: {
    fontSize: 13,

    fontWeight: "800",

    color: "#FFFFFF",
  },

  /* ==================================================
     SUMMARY
  ================================================== */

  summaryCard: {
    marginTop: 10,

    padding: 18,

    borderRadius: 18,

    backgroundColor: "rgba(14,44,102,0.70)",

    borderWidth: 1,
    borderColor: "rgba(73,137,255,0.20)",
  },

  summaryTitle: {
    marginBottom: 16,

    fontSize: 16,

    fontWeight: "800",

    color: "#FFFFFF",
  },

  summaryRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: 10,
  },

  summaryLabel: {
    fontSize: 12,

    color: "#94A3B8",
  },

  summaryValue: {
    fontSize: 12,

    fontWeight: "700",

    color: "#FFFFFF",
  },

  summaryDivider: {
    height: 1,

    marginVertical: 6,

    backgroundColor: "rgba(255,255,255,0.08)",
  },

  totalRow: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    marginTop: 8,
  },

  totalLabel: {
    fontSize: 14,

    fontWeight: "800",

    color: "#FFFFFF",
  },

  totalDescription: {
    marginTop: 3,

    fontSize: 10,

    color: "#64748B",
  },

  totalValue: {
    fontSize: 18,

    fontWeight: "800",

    color: "#247BFF",
  },

  /* ==================================================
     CHECKOUT
  ================================================== */

  checkoutButton: {
    height: 53,

    marginTop: 18,

    borderRadius: 16,

    overflow: "hidden",
  },

  checkoutGradient: {
    flex: 1,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",
  },

  checkoutText: {
    marginRight: 10,

    fontSize: 15,

    fontWeight: "800",

    color: "#FFFFFF",
  },

  bottomSpace: {
    height: 20,
  },

  /* ==================================================
     EMPTY CART
  ================================================== */

  emptyContainer: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 40,
  },

  emptyIcon: {
    width: 110,
    height: 110,

    borderRadius: 55,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(36,123,255,0.10)",

    borderWidth: 1,
    borderColor: "rgba(36,123,255,0.20)",
  },

  emptyTitle: {
    marginTop: 25,

    fontSize: 21,

    fontWeight: "800",

    color: "#FFFFFF",

    textAlign: "center",
  },

  emptyText: {
    marginTop: 9,

    fontSize: 13,

    lineHeight: 20,

    color: "#94A3B8",

    textAlign: "center",
  },

  emptyButton: {
    width: "100%",

    height: 52,

    marginTop: 25,

    borderRadius: 16,

    overflow: "hidden",
  },

  emptyButtonGradient: {
    flex: 1,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",
  },

  emptyButtonText: {
    marginLeft: 9,

    fontSize: 14,

    fontWeight: "800",

    color: "#FFFFFF",
  },
  removeButton: {
    width: 38,
    height: 38,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 10,

    backgroundColor: "rgba(239,68,68,0.08)",

    borderWidth: 1,
    borderColor: "rgba(239,68,68,0.12)",

    zIndex: 20,

    elevation: 5,
  },
});
export default styles;
