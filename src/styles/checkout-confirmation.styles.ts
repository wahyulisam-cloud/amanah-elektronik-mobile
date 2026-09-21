import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // ========================================================
  // PAGE
  // ========================================================

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
    width: 230,
    height: 230,
    borderRadius: 115,
    backgroundColor: "rgba(8,174,234,0.07)",
    top: -120,
    right: -80,
  },

  circleRight: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(36,123,255,0.05)",
    top: 330,
    right: -100,
  },

  // ========================================================
  // HEADER
  // ========================================================

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 18,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  headerTitleContainer: {
    flex: 1,
    marginLeft: 14,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
  },

  headerSubtitle: {
    color: "#8EA4C8",
    fontSize: 12,
    marginTop: 3,
  },

  // ========================================================
  // SCROLL
  // ========================================================

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  // ========================================================
  // STEP
  // ========================================================

  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  stepItem: {
    alignItems: "center",
  },

  stepActive: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#0879D1",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(8,174,234,0.5)",
  },

  stepInactive: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },

  stepNumber: {
    color: "#647A9F",
    fontSize: 14,
    fontWeight: "700",
  },

  stepActiveText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "600",
    marginTop: 5,
  },

  stepInactiveText: {
    color: "#647A9F",
    fontSize: 10,
    marginTop: 5,
  },

  stepLineActive: {
    flex: 1,
    height: 1,
    backgroundColor: "#0879D1",
    marginHorizontal: 8,
    marginBottom: 17,
  },

  stepLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.12)",
    marginHorizontal: 8,
    marginBottom: 17,
  },

  // ========================================================
  // INFO
  // ========================================================

  infoCard: {
    flexDirection: "row",
    backgroundColor: "rgba(8,174,234,0.08)",
    borderWidth: 1,
    borderColor: "rgba(8,174,234,0.16)",
    borderRadius: 18,
    padding: 15,
    marginBottom: 22,
  },

  infoIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "rgba(8,174,234,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },

  infoContent: {
    flex: 1,
    marginLeft: 12,
  },

  infoTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 4,
  },

  infoText: {
    color: "#8EA4C8",
    fontSize: 12,
    lineHeight: 18,
  },

  // ========================================================
  // SECTION
  // ========================================================

  sectionHeader: {
    marginBottom: 10,
  },

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },

  sectionSubtitle: {
    color: "#7188AD",
    fontSize: 11,
    marginTop: 3,
  },

  // ========================================================
  // ITEM
  // ========================================================

  itemCard: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.055)",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    padding: 12,
    marginBottom: 12,
  },

  imageContainer: {
    width: 88,
    height: 100,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.06)",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  productImage: {
    width: 78,
    height: 90,
  },

  itemInfo: {
    flex: 1,
    marginLeft: 13,
  },

  productName: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 19,
  },

  productPrice: {
    color: "#08AEEA",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 5,
  },

  priceUnit: {
    color: "#7188AD",
    fontSize: 10,
    fontWeight: "400",
  },

  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 9,
    gap: 14,
  },

  detailItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  detailText: {
    color: "#8EA4C8",
    fontSize: 11,
    marginLeft: 5,
  },

  itemSubtotal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    paddingTop: 9,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.07)",
  },

  itemSubtotalLabel: {
    color: "#7188AD",
    fontSize: 11,
  },

  itemSubtotalValue: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },

  // ========================================================
  // FORM
  // ========================================================

  formCard: {
    backgroundColor: "rgba(255,255,255,0.055)",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    paddingHorizontal: 15,
    marginBottom: 22,
  },

  formRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },

  formIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "rgba(8,174,234,0.09)",
    alignItems: "center",
    justifyContent: "center",
  },

  formContent: {
    flex: 1,
    marginLeft: 12,
  },

  formLabel: {
    color: "#7188AD",
    fontSize: 10,
    marginBottom: 3,
  },

  formValue: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },

  formDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.07)",
  },

  // ========================================================
  // SUMMARY
  // ========================================================

  summaryCard: {
    backgroundColor: "rgba(255,255,255,0.055)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    padding: 17,
    marginBottom: 18,
  },

  summaryTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 15,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  summaryLabel: {
    color: "#8EA4C8",
    fontSize: 12,
  },

  summaryValue: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },

  summaryDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    marginVertical: 7,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  totalLabel: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

  totalDescription: {
    color: "#647A9F",
    fontSize: 10,
    marginTop: 3,
  },

  totalValue: {
    color: "#08AEEA",
    fontSize: 17,
    fontWeight: "800",
  },

  // ========================================================
  // BUTTON
  // ========================================================

  createButton: {
    borderRadius: 16,
    overflow: "hidden",
    marginTop: 2,
  },

  createGradient: {
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
    gap: 9,
  },

  createText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

  securityText: {
    color: "#647A9F",
    fontSize: 10,
    textAlign: "center",
    marginTop: 12,
  },

  // ========================================================
  // EMPTY
  // ========================================================

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 35,
  },

  emptyIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(36,123,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22,
  },

  emptyTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },

  emptyText: {
    color: "#8EA4C8",
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 25,
  },

  emptyButton: {
    width: "100%",
    borderRadius: 15,
    overflow: "hidden",
  },

  emptyButtonGradient: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  emptyButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

  // ========================================================
  // LOADING
  // ========================================================

  loadingText: {
    color: "#FFFFFF",
    fontSize: 13,
  },

  bottomSpace: {
    height: 35,
  },

  // ==========================================================
// MODAL UBAH ALAMAT - WEB GLASS COMPACT
// ==========================================================

addressModalOverlay: {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(2, 13, 36, 0.45)",
  paddingHorizontal: 20,
},

addressModalContainer: {
  width: "100%",
  maxWidth: 390,
  borderRadius: 18,

  backgroundColor: "#07184D",

  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.16)",

  paddingHorizontal: 16,
  paddingTop: 14,
  paddingBottom: 14,

  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 10,
  },
  shadowOpacity: 0.35,
  shadowRadius: 25,

  elevation: 20,
},

// ==========================================================
// HEADER
// ==========================================================

addressModalHeader: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 12,
},

addressModalTitleWrapper: {
  flexDirection: "row",
  alignItems: "center",
  flex: 1,
},

addressModalIcon: {
  width: 32,
  height: 32,
  borderRadius: 9,

  alignItems: "center",
  justifyContent: "center",

  backgroundColor: "rgba(8,174,234,0.12)",
  borderWidth: 1,
  borderColor: "rgba(8,174,234,0.18)",
},

addressModalTitleContent: {
  marginLeft: 9,
  flex: 1,
},

addressModalTitle: {
  color: "#FFFFFF",
  fontSize: 15,
  fontWeight: "700",
},

addressModalSubtitle: {
  color: "rgba(160,180,210,0.72)",
  fontSize: 10,
  marginTop: 2,
},

addressModalCloseButton: {
  width: 30,
  height: 30,
  borderRadius: 9,

  alignItems: "center",
  justifyContent: "center",

  backgroundColor: "rgba(255,255,255,0.06)",
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.10)",
},

// ==========================================================
// INFO
// ==========================================================

addressModalInfo: {
  flexDirection: "row",
  alignItems: "center",

  backgroundColor: "rgba(8,174,234,0.06)",

  borderRadius: 9,
  borderWidth: 1,
  borderColor: "rgba(8,174,234,0.10)",

  paddingHorizontal: 9,
  paddingVertical: 7,

  marginBottom: 11,
},

addressModalInfoText: {
  flex: 1,

  color: "rgba(174,194,220,0.78)",
  fontSize: 10,

  marginLeft: 6,
  lineHeight: 15,
},

// ==========================================================
// LABEL
// ==========================================================

addressModalLabel: {
  color: "rgba(255,255,255,0.92)",
  fontSize: 11.5,
  fontWeight: "600",

  marginBottom: 5,
},

// ==========================================================
// INPUT
// ==========================================================

addressModalInput: {
  height: 65,

  borderRadius: 10,
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.12)",

  backgroundColor: "rgba(255,255,255,0.055)",

  color: "#FFFFFF",

  fontSize: 12.5,
  lineHeight: 18,

  paddingHorizontal: 11,
  paddingVertical: 9,
},

// ==========================================================
// BUTTON
// ==========================================================

addressModalActions: {
  flexDirection: "row",

  marginTop: 11,
},

addressModalCancelButton: {
  flex: 1,

  height: 39,

  borderRadius: 9,

  alignItems: "center",
  justifyContent: "center",

  backgroundColor: "rgba(255,255,255,0.055)",

  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.10)",

  marginRight: 4,
},

addressModalCancelText: {
  color: "rgba(190,204,225,0.88)",
  fontSize: 11.5,
  fontWeight: "700",
},

addressModalSaveButton: {
  flex: 1,

  height: 39,

  borderRadius: 9,

  overflow: "hidden",

  marginLeft: 4,
},

addressModalSaveGradient: {
  flex: 1,

  alignItems: "center",
  justifyContent: "center",

  flexDirection: "row",
},

addressModalSaveText: {
  color: "#FFFFFF",
  fontSize: 11.5,
  fontWeight: "700",

  marginLeft: 5,
},
});

export default styles;