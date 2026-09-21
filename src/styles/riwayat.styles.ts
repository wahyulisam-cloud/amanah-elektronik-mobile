import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  /* ==================================================
     PAGE
  ================================================== */

  page: {
    flex: 1,
    backgroundColor: "#06163F",
  },

  /* ==================================================
     HEADER
  ================================================== */

  header: {
    paddingHorizontal: 22,
    paddingTop: 28,
    paddingBottom: 18,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: "#07184D",
  },

  headerTitle: {
    fontSize: 23,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  headerSubtitle: {
    marginTop: 5,

    fontSize: 13,
    color: "rgba(255,255,255,0.60)",
  },

  historyIcon: {
    width: 45,
    height: 45,

    borderRadius: 23,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(8,201,245,0.10)",

    borderWidth: 1,
    borderColor: "rgba(8,201,245,0.25)",
  },

  /* ==================================================
     FILTER
  ================================================== */

  filterScroll: {
    flexGrow: 0,

    backgroundColor: "#07184D",
  },

  filterContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,

    gap: 9,
  },

  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 9,

    borderRadius: 20,

    backgroundColor: "rgba(255,255,255,0.055)",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.09)",
  },

  filterButtonActive: {
    backgroundColor: "#1260E8",

    borderColor: "#1260E8",
  },

  filterText: {
    fontSize: 12,
    fontWeight: "600",

    color: "rgba(255,255,255,0.62)",
  },

  filterTextActive: {
    color: "#FFFFFF",
  },

  /* ==================================================
     SCROLL
  ================================================== */

  scrollView: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 18,
    paddingTop: 20,
  },

  /* ==================================================
     RESULT HEADER
  ================================================== */

  resultHeader: {
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "space-between",

    marginBottom: 14,
  },

  resultTitle: {
    fontSize: 18,
    fontWeight: "800",

    color: "#FFFFFF",
  },

  resultCount: {
    fontSize: 12,

    color: "rgba(255,255,255,0.50)",
  },

  /* ==================================================
     CARD
  ================================================== */

  card: {
    width: "100%",

    marginBottom: 15,

    padding: 16,

    borderRadius: 18,

    backgroundColor: "rgba(15,36,82,0.88)",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  /* ==================================================
     CARD HEADER
  ================================================== */

  cardHeader: {
    flexDirection: "row",

    alignItems: "flex-start",
    justifyContent: "space-between",

    gap: 10,
  },

  invoice: {
    fontSize: 15,

    fontWeight: "800",

    color: "#FFFFFF",
  },

  transactionDate: {
    marginTop: 4,

    fontSize: 11,

    color: "rgba(255,255,255,0.45)",
  },

  /* ==================================================
     STATUS
  ================================================== */

  statusBadge: {
    flexDirection: "row",

    alignItems: "center",

    gap: 5,

    paddingHorizontal: 9,
    paddingVertical: 6,

    borderRadius: 12,
  },

  statusWaiting: {
    backgroundColor: "#D99118",
  },

  statusProcess: {
    backgroundColor: "#2475D9",
  },

  statusRental: {
    backgroundColor: "#168C8C",
  },

  statusDone: {
    backgroundColor: "#159447",
  },

  statusText: {
    fontSize: 10,

    fontWeight: "700",

    color: "#FFFFFF",
  },

  /* ==================================================
     DIVIDER
  ================================================== */

  divider: {
    height: 1,

    marginVertical: 14,

    backgroundColor: "rgba(255,255,255,0.07)",
  },

  /* ==================================================
     ITEMS
  ================================================== */

  itemSection: {
    flexDirection: "row",

    alignItems: "center",
  },

  itemIcon: {
    width: 48,
    height: 48,

    borderRadius: 13,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(8,201,245,0.08)",

    borderWidth: 1,
    borderColor: "rgba(8,201,245,0.16)",
  },

  itemInfo: {
    flex: 1,

    marginLeft: 12,
  },

  itemName: {
    fontSize: 14,

    fontWeight: "700",

    color: "#FFFFFF",

    marginBottom: 3,
  },

  itemQuantity: {
    fontSize: 12,

    fontWeight: "600",

    color: "#08C9F5",
  },

  moreItem: {
    marginTop: 2,

    fontSize: 11,

    color: "rgba(255,255,255,0.45)",
  },

  /* ==================================================
     DATE
  ================================================== */

  dateSection: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    marginTop: 17,

    padding: 12,

    borderRadius: 13,

    backgroundColor: "rgba(0,0,0,0.13)",
  },

  dateBox: {
    flexDirection: "row",

    alignItems: "center",

    flex: 1,
  },

  dateLabel: {
    marginLeft: 8,

    fontSize: 9,

    color: "rgba(255,255,255,0.45)",
  },

  dateValue: {
    marginLeft: 8,
    marginTop: 2,

    fontSize: 10,

    fontWeight: "600",

    color: "#FFFFFF",
  },

  /* ==================================================
     CARD FOOTER
  ================================================== */

  cardFooter: {
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "space-between",

    marginTop: 16,

    paddingTop: 14,

    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.07)",
  },

  totalLabel: {
    fontSize: 10,

    color: "rgba(255,255,255,0.45)",
  },

  totalPrice: {
    marginTop: 3,

    fontSize: 17,

    fontWeight: "800",

    color: "#08C9F5",
  },

  detailButton: {
    flexDirection: "row",

    alignItems: "center",

    gap: 5,

    paddingHorizontal: 17,
    paddingVertical: 10,

    borderRadius: 10,

    backgroundColor: "#1260E8",
  },

  detailButtonText: {
    fontSize: 12,

    fontWeight: "700",

    color: "#FFFFFF",
  },

  /* ==================================================
     EMPTY STATE
  ================================================== */

  emptyContainer: {
    alignItems: "center",

    justifyContent: "center",

    paddingHorizontal: 35,

    paddingTop: 70,
  },

  emptyIcon: {
    width: 90,
    height: 90,

    borderRadius: 45,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(38,103,220,0.13)",

    borderWidth: 1,
    borderColor: "rgba(38,103,220,0.25)",
  },

  emptyTitle: {
    marginTop: 20,

    fontSize: 18,

    fontWeight: "800",

    color: "#FFFFFF",
  },

  emptyText: {
    marginTop: 8,

    fontSize: 13,

    lineHeight: 20,

    textAlign: "center",

    color: "rgba(255,255,255,0.50)",
  },

  /* ==================================================
     BOTTOM
  ================================================== */

  bottomSpace: {
    height: 25,
  },

});

export default styles;