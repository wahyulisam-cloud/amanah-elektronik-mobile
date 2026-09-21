import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  /* ==================================================
     PAGE
  ================================================== */

  page: {
    flex: 1,
    backgroundColor: "#020D24",
    position: "relative",
  },

  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  scrollView: {
    flex: 1,
    backgroundColor: "transparent",
  },

  scrollContent: {
    paddingBottom: 30,
  },

  /* ==================================================
     DECORATIVE CIRCLES
  ================================================== */

  circleTop: {
    position: "absolute",

    width: 360,
    height: 360,

    borderRadius: 180,

    top: -190,
    left: -100,

    backgroundColor: "rgba(0, 110, 255, 0.13)",
  },

  circleRight: {
    position: "absolute",

    width: 280,
    height: 280,

    borderRadius: 140,

    top: 120,
    right: -190,

    backgroundColor: "rgba(0, 190, 255, 0.045)",
  },

  /* ==================================================
     HEADER
  ================================================== */

  header: {
    paddingHorizontal: 24,
    paddingTop: 45,
    paddingBottom: 25,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  hello: {
    fontSize: 17,
    color: "rgba(255,255,255,0.85)",
    marginBottom: 5,
  },

  username: {
    fontSize: 36,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },

  company: {
    marginTop: 2,
    fontSize: 15,
    color: "rgba(255,255,255,0.65)",
  },

  headerActions: {
    flexDirection: "row",
    gap: 12,
  },

  iconButton: {
    width: 62,
    height: 62,

    borderRadius: 31,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(255,255,255,0.055)",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",

    position: "relative",
  },

  notificationDot: {
    position: "absolute",

    width: 11,
    height: 11,

    borderRadius: 6,

    backgroundColor: "#247BFF",

    top: 7,
    right: 7,
  },

  cartBadge: {
    position: "absolute",

    minWidth: 23,
    height: 23,

    borderRadius: 12,

    backgroundColor: "#247BFF",

    top: -3,
    right: -2,

    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 5,
  },

  badgeText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  /* ==================================================
     PROMO
  ================================================== */

  promoContainer: {
    marginHorizontal: 24,
    marginBottom: 30,

    borderRadius: 20,

    position: "relative",

    overflow: "hidden",

    borderWidth: 1,
    borderColor: "rgba(89,169,255,0.32)",
  },

  promoGradient: {
    minHeight: 245,

    paddingHorizontal: 22,
    paddingVertical: 22,
  },

  promoContent: {
    flex: 1,

    flexDirection: "row",

    alignItems: "center",
    justifyContent: "space-between",
  },

  promoTextContainer: {
    flex: 1,
    zIndex: 2,
  },

  promoLabel: {
    alignSelf: "flex-start",

    paddingHorizontal: 12,
    paddingVertical: 7,

    borderRadius: 9,

    backgroundColor: "rgba(36,123,255,0.30)",

    marginBottom: 18,
  },

  promoLabelText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },

  promoTitleSmall: {
    fontSize: 18,
    color: "#FFFFFF",
    marginBottom: 2,
  },

  promoTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  promoDiscount: {
    color: "#1C8CFF",
  },

  promoDescription: {
    marginTop: 5,

    fontSize: 13,

    color: "rgba(255,255,255,0.72)",
  },

  promoButton: {
    marginTop: 18,

    alignSelf: "flex-start",

    flexDirection: "row",
    alignItems: "center",

    gap: 10,

    paddingHorizontal: 17,
    paddingVertical: 12,

    borderRadius: 10,

    backgroundColor: "#1262E8",
  },

  promoButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },

  promoImageWrapper: {
    width: 175,
    height: 175,

    alignItems: "center",
    justifyContent: "center",

    marginLeft: 5,
  },

  promoImage: {
    width: "100%",
    height: "100%",
  },

  sliderDots: {
    position: "absolute",

    bottom: 9,
    left: 0,
    right: 0,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    gap: 6,
  },

  dot: {
    width: 7,
    height: 7,

    borderRadius: 4,

    backgroundColor: "rgba(255,255,255,0.45)",
  },

  activeDot: {
    width: 19,
    backgroundColor: "#247BFF",
  },

  /* ==================================================
     CATEGORY
  ================================================== */

  categorySection: {
    marginBottom: 28,
  },

  categoryScroll: {
    paddingHorizontal: 24,
    gap: 16,
  },

  categoryItem: {
    alignItems: "center",

    width: 74,
  },

  categoryIcon: {
    width: 64,
    height: 64,

    borderRadius: 32,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(19,63,145,0.30)",

    borderWidth: 1,
    borderColor: "rgba(68,128,255,0.20)",
  },

  categoryText: {
    marginTop: 8,

    fontSize: 12,

    color: "rgba(255,255,255,0.88)",

    textAlign: "center",
  },

  /* ==================================================
     SECTION HEADER
  ================================================== */

  sectionHeader: {
    paddingHorizontal: 24,

    flexDirection: "row",

    alignItems: "center",
    justifyContent: "space-between",

    marginBottom: 15,
  },

  sectionHeaderSimple: {
    paddingHorizontal: 24,
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 21,

    fontWeight: "800",

    color: "#FFFFFF",
  },

  seeAll: {
    flexDirection: "row",
    alignItems: "center",
  },

  seeAllText: {
    fontSize: 13,

    fontWeight: "600",

    color: "#247BFF",
  },

  /* ==================================================
     PRODUCT
  ================================================== */

  productScroll: {
    paddingHorizontal: 24,
    gap: 12,

    paddingBottom: 8,
  },

  productCard: {
    width: 205,

    minHeight: 335,

    borderRadius: 17,

    padding: 12,

    backgroundColor: "rgba(12,31,67,0.88)",

    borderWidth: 1,
    borderColor: "rgba(97,144,225,0.18)",

    position: "relative",
  },

  favoriteButton: {
    position: "absolute",

    top: 12,
    right: 12,

    zIndex: 5,

    width: 35,
    height: 35,

    borderRadius: 18,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(3,15,40,0.65)",
  },

  productImageWrapper: {
    width: "100%",
    height: 150,

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 8,
  },

  productImage: {
    width: "100%",
    height: "100%",
  },

  productName: {
    fontSize: 16,

    fontWeight: "800",

    color: "#FFFFFF",

    marginTop: 3,
  },

  productPrice: {
    marginTop: 6,

    fontSize: 15,

    fontWeight: "700",

    color: "#247BFF",
  },

  stockContainer: {
    flexDirection: "row",

    alignItems: "center",

    marginTop: 9,
  },

  stockDot: {
    width: 8,
    height: 8,

    borderRadius: 4,

    backgroundColor: "#18D64D",

    marginRight: 6,
  },

  stockText: {
    fontSize: 12,

    color: "#79E995",
  },

  detailButton: {
    marginTop: "auto",

    height: 43,

    borderRadius: 10,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#145CE0",
  },

  detailButtonText: {
    fontSize: 14,

    fontWeight: "800",

    color: "#FFFFFF",
  },

  /* ==================================================
     DISCOUNT
  ================================================== */

  discountCard: {
    marginHorizontal: 24,
    marginTop: 28,
    marginBottom: 30,

    minHeight: 105,

    borderRadius: 18,

    padding: 14,

    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "rgba(14,44,102,0.70)",

    borderWidth: 1,
    borderColor: "rgba(73,137,255,0.20)",
  },

  discountIcon: {
    width: 62,
    height: 62,

    borderRadius: 15,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#1767E8",
  },

  discountInfo: {
    flex: 1,

    marginLeft: 13,
  },

  discountTitle: {
    fontSize: 15,

    fontWeight: "800",

    color: "#FFFFFF",
  },

  discountText: {
    marginTop: 5,

    fontSize: 11,

    color: "rgba(255,255,255,0.65)",
  },

  discountButton: {
    flexDirection: "row",
    alignItems: "center",

    gap: 5,

    paddingHorizontal: 14,
    paddingVertical: 12,

    borderRadius: 22,

    backgroundColor: "#123F9D",
  },

  discountButtonText: {
    fontSize: 11,

    fontWeight: "700",

    color: "#FFFFFF",
  },

  /* ==================================================
     FEATURES
  ================================================== */

  featureGrid: {
    paddingHorizontal: 24,

    flexDirection: "row",
    flexWrap: "wrap",

    gap: 10,
  },

  featureCard: {
    width: "48%",

    minHeight: 150,

    borderRadius: 15,

    padding: 14,

    backgroundColor: "rgba(11,29,62,0.86)",

    borderWidth: 1,
    borderColor: "rgba(97,144,225,0.16)",
  },

  featureIcon: {
    width: 52,
    height: 52,

    borderRadius: 14,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(25,92,220,0.16)",

    marginBottom: 12,
  },

  featureTitle: {
    fontSize: 13,

    fontWeight: "800",

    color: "#FFFFFF",

    marginBottom: 6,
  },

  featureText: {
    fontSize: 11,

    lineHeight: 17,

    color: "rgba(255,255,255,0.62)",
  },

  /* ==================================================
     FOOTER
  ================================================== */

  footer: {
    alignItems: "center",

    paddingTop: 35,
    paddingBottom: 15,

    marginHorizontal: 24,
  },

  footerTitle: {
    fontSize: 14,

    fontWeight: "700",

    color: "#FFFFFF",
  },

  footerText: {
    marginTop: 5,

    fontSize: 11,

    color: "rgba(255,255,255,0.55)",
  },

  copyright: {
    marginTop: 4,

    fontSize: 10,

    color: "rgba(255,255,255,0.35)",
  },
  /* ==================================================
     LOADING
  ================================================== */

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 15,
    color: "#FFFFFF",
    fontSize: 14,
  },

  /* ==================================================
     EMPTY PRODUCT
  ================================================== */

  emptyProductContainer: {
    paddingVertical: 30,
    alignItems: "center",
  },

  emptyProductText: {
    marginTop: 10,
    color: "#94A3B8",
    fontSize: 14,
  },

  /* ==================================================
     STOCK EMPTY
  ================================================== */

  stockDotEmpty: {
    backgroundColor: "#EF4444",
  },

  /* ==================================================
     DETAIL MODAL
  ================================================== */

  detailModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.65)",
    justifyContent: "flex-end",
  },

  detailModalContainer: {
    backgroundColor: "#07184D",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: "88%",
    paddingBottom: 25,
    overflow: "hidden",
  },

  detailModalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 10,
  },

  detailModalTitle: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "700",
  },

  detailModalCloseButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(255,255,255,0.10)",
    justifyContent: "center",
    alignItems: "center",
  },

  detailModalContent: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },

  detailModalImageContainer: {
    height: 220,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    overflow: "hidden",
  },

  detailModalImage: {
    width: "85%",
    height: "85%",
  },

  detailModalProductName: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 20,
  },

  detailModalCategory: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  detailModalCategoryText: {
    color: "#94A3B8",
    fontSize: 14,
    marginLeft: 6,
  },

  detailModalPriceContainer: {
    marginTop: 18,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "rgba(36,123,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(36,123,255,0.25)",
  },

  detailModalPriceLabel: {
    color: "#94A3B8",
    fontSize: 13,
  },

  detailModalPrice: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 4,
  },

  detailModalPriceUnit: {
    color: "#94A3B8",
    fontSize: 14,
    fontWeight: "400",
  },

  detailModalStock: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
  },

  detailModalStockText: {
    color: "#FFFFFF",
    fontSize: 14,
    marginLeft: 8,
  },

  detailModalDescription: {
    marginTop: 20,
  },

  detailModalDescriptionTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },

  detailModalDescriptionText: {
    color: "#B8C4D9",
    fontSize: 14,
    lineHeight: 22,
  },

  detailModalFooter: {
    paddingHorizontal: 20,
    paddingTop: 14,
  },

  detailModalCartButton: {
    height: 52,
    borderRadius: 16,
    overflow: "hidden",
  },

  detailModalCartButtonDisabled: {
    opacity: 0.5,
  },

  detailModalCartButtonGradient: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  detailModalCartButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 9,
  },
});
export default styles;