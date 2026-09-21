import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // ==========================================================
  // PAGE
  // ==========================================================

  page: {
    flex: 1,
    backgroundColor: "#07184D",
  },

  content: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 30,
  },

  bottomSpace: {
    height: 30,
  },

  // ==========================================================
  // LOADING
  // ==========================================================

  loadingText: {
    color: "#FFFFFF",
    fontSize: 14,
    marginTop: 14,
    textAlign: "center",
  },

  emptyText: {
    color: "#FFFFFF",
    fontSize: 15,
    textAlign: "center",
    marginTop: 40,
  },

  // ==========================================================
  // HEADER
  // ==========================================================

  header: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: 18,

    backgroundColor: "#07184D",

    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.08)",
  },

  backButton: {
    width: 42,
    height: 42,

    borderRadius: 21,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(255,255,255,0.08)",
  },

  headerTitle: {
    flex: 1,

    color: "#FFFFFF",

    fontSize: 18,
    fontWeight: "700",

    textAlign: "center",

    marginHorizontal: 12,
  },

  headerPlaceholder: {
    width: 42,
    height: 42,
  },

  // ==========================================================
  // INVOICE CARD
  // ==========================================================

  invoiceCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: "#0B2465",

    borderRadius: 18,

    padding: 18,

    marginBottom: 24,

    borderWidth: 1,
    borderColor: "rgba(8,201,245,0.16)",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 4,
  },

  invoiceLabel: {
    color: "#8EA7D5",

    fontSize: 12,

    marginBottom: 5,
  },

  invoice: {
    color: "#FFFFFF",

    fontSize: 21,
    fontWeight: "800",

    letterSpacing: 0.5,
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 8,

    borderRadius: 20,

    backgroundColor: "rgba(8,201,245,0.16)",

    borderWidth: 1,
    borderColor: "rgba(8,201,245,0.28)",
  },

  statusText: {
    color: "#08C9F5",

    fontSize: 11,
    fontWeight: "700",

    textAlign: "center",
  },

  // ==========================================================
  // SECTION
  // ==========================================================

  section: {
    marginBottom: 24,
  },

  sectionTitle: {
    color: "#FFFFFF",

    fontSize: 16,
    fontWeight: "700",

    marginBottom: 12,
  },

  // ==========================================================
  // PERIODE PENYEWAAN
  // ==========================================================

  periodCard: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#0B2465",

    borderRadius: 16,

    padding: 16,

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
  },

  dateItem: {
    flex: 1,

    flexDirection: "row",
    alignItems: "center",

    gap: 10,
  },

  label: {
    color: "#8EA7D5",

    fontSize: 11,

    marginBottom: 4,
  },

  value: {
    color: "#FFFFFF",

    fontSize: 13,
    fontWeight: "600",

    maxWidth: 150,
  },

  durationCard: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "rgba(8,201,245,0.08)",

    borderRadius: 14,

    paddingHorizontal: 15,
    paddingVertical: 13,

    marginTop: 10,

    borderWidth: 1,
    borderColor: "rgba(8,201,245,0.12)",
  },

  durationText: {
    color: "#AFC2E8",

    fontSize: 13,

    marginLeft: 10,
  },

  durationValue: {
    color: "#08C9F5",

    fontWeight: "700",
  },

  // ==========================================================
  // ALAT
  // ==========================================================

  toolCard: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#0B2465",

    borderRadius: 16,

    padding: 14,

    marginBottom: 10,

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
  },

  toolIcon: {
    width: 48,
    height: 48,

    borderRadius: 14,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(8,201,245,0.10)",

    marginRight: 12,
  },

  toolInfo: {
    flex: 1,

    paddingRight: 8,
  },

  toolName: {
    color: "#FFFFFF",

    fontSize: 14,
    fontWeight: "700",

    marginBottom: 5,
  },

  toolQuantity: {
    color: "#8EA7D5",

    fontSize: 11,

    marginBottom: 4,
  },

  toolPrice: {
    color: "#AFC2E8",

    fontSize: 11,
  },

  subtotalContainer: {
    alignItems: "flex-end",

    minWidth: 90,
  },

  subtotalLabel: {
    color: "#6F87B8",

    fontSize: 10,

    marginBottom: 4,
  },

  subtotal: {
    color: "#08C9F5",

    fontSize: 12,
    fontWeight: "700",

    textAlign: "right",
  },

  // ==========================================================
  // DATA PELANGGAN
  // ==========================================================

  infoCard: {
    backgroundColor: "#0B2465",

    borderRadius: 16,

    paddingHorizontal: 16,

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingVertical: 14,

    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },

  // ==========================================================
  // PEMBAYARAN
  // ==========================================================

  paymentCard: {
    backgroundColor: "#0B2465",

    borderRadius: 16,

    padding: 16,

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
  },

  paymentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  divider: {
    height: 1,

    backgroundColor: "rgba(255,255,255,0.08)",

    marginVertical: 15,
  },

  totalRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  totalLabel: {
    color: "#AFC2E8",

    fontSize: 13,
    fontWeight: "500",
  },

  totalPrice: {
    color: "#08C9F5",

    fontSize: 18,
    fontWeight: "800",
  },
});

export default styles;