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

  headerIcon: {
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
     PROFILE CARD
  ================================================== */

  profileCard: {
    alignItems: "center",

    paddingVertical: 25,
    paddingHorizontal: 20,

    borderRadius: 20,

    backgroundColor: "rgba(15,36,82,0.90)",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  /* ==================================================
     AVATAR
  ================================================== */

  avatar: {
    width: 82,
    height: 82,

    borderRadius: 41,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#1260E8",

    borderWidth: 3,
    borderColor: "rgba(8,201,245,0.40)",
  },

  avatarText: {
    fontSize: 34,

    fontWeight: "800",

    color: "#FFFFFF",
  },

  name: {
    marginTop: 13,

    fontSize: 22,

    fontWeight: "800",

    color: "#FFFFFF",
  },

  username: {
    marginTop: 4,

    fontSize: 13,

    color: "#08C9F5",
  },

  /* ==================================================
     EDIT BUTTON
  ================================================== */

  editButton: {
    flexDirection: "row",

    alignItems: "center",

    gap: 7,

    marginTop: 16,

    paddingHorizontal: 18,
    paddingVertical: 9,

    borderRadius: 10,

    backgroundColor: "#1260E8",
  },

  editButtonText: {
    fontSize: 12,

    fontWeight: "700",

    color: "#FFFFFF",
  },

  /* ==================================================
     SECTION
  ================================================== */

  sectionTitle: {
    marginTop: 24,
    marginBottom: 12,

    fontSize: 17,

    fontWeight: "800",

    color: "#FFFFFF",
  },

  /* ==================================================
     INFORMATION CARD
  ================================================== */

  infoCard: {
    paddingHorizontal: 15,

    borderRadius: 17,

    backgroundColor: "rgba(15,36,82,0.88)",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  infoRow: {
    flexDirection: "row",

    alignItems: "center",

    paddingVertical: 15,
  },

  infoIcon: {
    width: 42,
    height: 42,

    borderRadius: 12,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(8,201,245,0.08)",

    borderWidth: 1,
    borderColor: "rgba(8,201,245,0.15)",
  },

  infoContent: {
    flex: 1,

    marginLeft: 12,
  },

  infoLabel: {
    fontSize: 10,

    color: "rgba(255,255,255,0.45)",
  },

  infoValue: {
    marginTop: 4,

    fontSize: 13,

    fontWeight: "600",

    color: "#FFFFFF",
  },

  divider: {
    height: 1,

    backgroundColor: "rgba(255,255,255,0.07)",
  },

  /* ==================================================
     SETTINGS
  ================================================== */

  menuCard: {
    borderRadius: 17,

    backgroundColor: "rgba(15,36,82,0.88)",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",

    overflow: "hidden",
  },

  menuItem: {
    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal: 15,
    paddingVertical: 16,
  },

  menuIcon: {
    width: 42,
    height: 42,

    borderRadius: 12,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(8,201,245,0.08)",
  },

  menuContent: {
    flex: 1,

    marginLeft: 12,
  },

  menuTitle: {
    fontSize: 13,

    fontWeight: "700",

    color: "#FFFFFF",
  },

  menuDescription: {
    marginTop: 3,

    fontSize: 10,

    color: "rgba(255,255,255,0.45)",
  },

  menuDivider: {
    height: 1,

    marginLeft: 69,

    backgroundColor: "rgba(255,255,255,0.07)",
  },
  emptyIcon: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: "rgba(57, 120, 232, 0.12)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 10,
  },

  emptyText: {
    fontSize: 14,
    lineHeight: 21,
    color: "rgba(255,255,255,0.60)",
    marginBottom: 26,
  },

  loginButton: {
    minWidth: 140,
    height: 46,
    paddingHorizontal: 24,
    borderRadius: 14,
    backgroundColor: "#08C9F5",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#08C9F5",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },

  loginButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  /* ==================================================
     LOGOUT
  ================================================== */

  logoutButton: {
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",

    gap: 8,

    marginTop: 20,

    paddingVertical: 14,

    borderRadius: 13,

    backgroundColor: "rgba(255,92,103,0.08)",

    borderWidth: 1,
    borderColor: "rgba(255,92,103,0.20)",
  },

  logoutText: {
    fontSize: 13,

    fontWeight: "700",

    color: "#FF5C67",
  },

  /* ==================================================
     FOOTER
  ================================================== */

  footer: {
    alignItems: "center",

    marginTop: 28,
  },

  footerTitle: {
    fontSize: 12,

    fontWeight: "700",

    color: "rgba(255,255,255,0.70)",
  },

  footerText: {
    marginTop: 4,

    fontSize: 10,

    color: "rgba(255,255,255,0.40)",
  },

  copyright: {
    marginTop: 4,

    fontSize: 9,

    color: "rgba(255,255,255,0.30)",
  },

  bottomSpace: {
    height: 25,
  },
});

export default styles;
