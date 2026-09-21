import { StyleSheet } from "react-native";

export default StyleSheet.create({
  // ==========================================================
  // PAGE
  // ==========================================================

  page: {
    flex: 1,
    backgroundColor: "#020D24",
  },

  backgroundCircleOne: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "rgba(36,123,255,0.08)",
    top: -100,
    right: -100,
  },

  backgroundCircleTwo: {
    position: "absolute",
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: "rgba(8,174,234,0.06)",
    bottom: 100,
    left: -120,
  },

  // ==========================================================
  // SCROLL
  // ==========================================================

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 55,
    paddingBottom: 35,
  },

  // ==========================================================
  // HEADER
  // ==========================================================

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 22,
  },

  smallTitle: {
    color: "#7188AD",
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 3,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "800",
  },

  cartButton: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.07)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.09)",
    alignItems: "center",
    justifyContent: "center",
  },

  cartBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    minWidth: 19,
    height: 19,
    borderRadius: 10,
    paddingHorizontal: 5,
    backgroundColor: "#EF4444",
    alignItems: "center",
    justifyContent: "center",
  },

  cartBadgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "800",
  },

  // ==========================================================
  // SEARCH
  // ==========================================================

  searchContainer: {
    height: 50,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.055)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 25,
  },

  searchInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 13,
    marginLeft: 10,
    outlineStyle: "none" as any,
  },

  // ==========================================================
  // SECTION
  // ==========================================================

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 13,
  },

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
  },

  sectionCount: {
    color: "#647A9F",
    fontSize: 11,
  },

  sectionHeaderProduct: {
    marginTop: 24,
    marginBottom: 14,
  },

  resultText: {
    color: "#647A9F",
    fontSize: 11,
    marginTop: 4,
  },

  // ==========================================================
  // CATEGORY
  // ==========================================================

  categoryContainer: {
    paddingRight: 10,
    gap: 10,
  },

  categoryItem: {
    width: 83,
    minHeight: 86,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.045)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 9,
  },

  categoryItemActive: {
    backgroundColor: "rgba(61,140,255,0.18)",
    borderColor: "rgba(61,140,255,0.30)",
  },

  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(61,140,255,0.10)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },

  categoryIconActive: {
    backgroundColor: "#3D8CFF",
  },

  categoryText: {
    color: "#8EA4C8",
    fontSize: 10,
    fontWeight: "600",
    textAlign: "center",
  },

  categoryTextActive: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  // ==========================================================
  // PRODUCT GRID
  // ==========================================================

  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 14,
  },

  productCard: {
    width: "48%",
    backgroundColor: "rgba(255,255,255,0.045)",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
    padding: 11,
    marginBottom: 2,
    overflow: "hidden",
  },

  productImageWrapper: {
    height: 145,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.045)",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },

  productImage: {
    width: "92%",
    height: "92%",
  },

  favoriteButton: {
    position: "absolute",
    top: 9,
    right: 9,
    width: 33,
    height: 33,
    borderRadius: 11,
    backgroundColor: "rgba(2,13,36,0.66)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.09)",
    justifyContent: "center",
    alignItems: "center",
  },

  productCategory: {
    color: "#3D8CFF",
    fontSize: 9,
    fontWeight: "700",
    marginTop: 11,
    textTransform: "uppercase",
  },

  productName: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 5,
    minHeight: 36,
    lineHeight: 18,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 8,
  },

  price: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },

  priceUnit: {
    color: "#7188AD",
    fontSize: 10,
    marginLeft: 3,
  },

  stockRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  stockDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#22C55E",
    marginRight: 6,
  },

  stockDotEmpty: {
    backgroundColor: "#EF4444",
  },

  stockText: {
    color: "#9DB1D2",
    fontSize: 9,
    flex: 1,
  },

  stockTextEmpty: {
    color: "#EF7777",
  },

  detailButton: {
    height: 39,
    borderRadius: 11,
    marginTop: 11,
    backgroundColor: "#246FDB",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  detailButtonDisabled: {
    backgroundColor: "#334155",
  },

  detailButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  // ==========================================================
  // EMPTY
  // ==========================================================

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 55,
  },

  emptyIcon: {
    width: 75,
    height: 75,
    borderRadius: 24,
    backgroundColor: "rgba(61,140,255,0.08)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  emptyTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
  },

  emptyText: {
    color: "#647A9F",
    fontSize: 11,
    textAlign: "center",
    lineHeight: 17,
    marginTop: 6,
    maxWidth: 290,
  },

  // ==========================================================
  // FOOTER
  // ==========================================================

  footer: {
    alignItems: "center",
    marginTop: 35,
    paddingTop: 22,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.06)",
  },

  footerTitle: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },

  footerText: {
    color: "#647A9F",
    fontSize: 10,
    marginTop: 5,
  },

  copyright: {
    color: "#445A7D",
    fontSize: 9,
    marginTop: 10,
  },

  // ==========================================================
  // DETAIL MODAL
  // ==========================================================

  detailModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.72)",
    justifyContent: "flex-end",
  },

  detailModalContainer: {
    width: "100%",
    maxHeight: "92%",
    backgroundColor: "#071A3D",
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    borderWidth: 1,
    borderColor: "rgba(8,174,234,0.18)",
    overflow: "hidden",
  },

  detailModalHeader: {
    height: 62,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },

  detailModalTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
  },

  detailModalCloseButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.055)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
    alignItems: "center",
    justifyContent: "center",
  },

  detailModalContent: {
    padding: 20,
    paddingBottom: 22,
  },

  detailModalImageContainer: {
    width: "100%",
    height: 235,
    borderRadius: 19,
    backgroundColor: "rgba(255,255,255,0.045)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
    overflow: "hidden",
  },

  detailModalImage: {
    width: "88%",
    height: "88%",
  },

  detailModalProductName: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
    lineHeight: 29,
  },

  detailModalCategory: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "rgba(61,140,255,0.09)",
    borderWidth: 1,
    borderColor: "rgba(61,140,255,0.14)",
    borderRadius: 9,
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginTop: 10,
  },

  detailModalCategoryText: {
    color: "#60A5FA",
    fontSize: 10,
    fontWeight: "700",
    marginLeft: 6,
  },

  detailModalPriceContainer: {
    marginTop: 20,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "rgba(8,174,234,0.07)",
    borderWidth: 1,
    borderColor: "rgba(8,174,234,0.12)",
  },

  detailModalPriceLabel: {
    color: "#7188AD",
    fontSize: 10,
    marginBottom: 4,
  },

  detailModalPrice: {
    color: "#08AEEA",
    fontSize: 22,
    fontWeight: "800",
  },

  detailModalPriceUnit: {
    color: "#7188AD",
    fontSize: 11,
    fontWeight: "500",
  },

  detailModalStock: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    paddingHorizontal: 3,
  },

  detailModalStockText: {
    color: "#D6E2F5",
    fontSize: 12,
    fontWeight: "700",
    marginLeft: 8,
  },

  detailModalDescription: {
    marginTop: 20,
    paddingTop: 17,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.06)",
  },

  detailModalDescriptionTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 8,
  },

  detailModalDescriptionText: {
    color: "#879BBC",
    fontSize: 12,
    lineHeight: 20,
  },

  detailModalFooter: {
    paddingHorizontal: 20,
    paddingTop: 13,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.06)",
    backgroundColor: "#071A3D",
  },

  detailModalCartButton: {
    height: 52,
    borderRadius: 14,
    overflow: "hidden",
  },

  detailModalCartButtonDisabled: {
    opacity: 0.7,
  },

  detailModalCartButtonGradient: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  detailModalCartButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },
});