import {
  StyleSheet,
} from "react-native";

export default StyleSheet.create({

  // ========================================================
  // PAGE
  // ========================================================

  page: {
    flex: 1,
    backgroundColor: "#07184D",
  },

  // ========================================================
  // HEADER
  // ========================================================

  header: {
    height: 72,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor:
      "rgba(255,255,255,0.08)",
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor:
      "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "700",
  },

  headerPlaceholder: {
    width: 42,
  },

  // ========================================================
  // SCROLL
  // ========================================================

  scrollView: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 30,
  },

  // ========================================================
  // PROFILE HEADER
  // ========================================================

  profileHeader: {
    alignItems: "center",
    marginBottom: 26,
  },

  avatar: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: "#0879D1",
    borderWidth: 2,
    borderColor: "#08C9F5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 31,
    fontWeight: "800",
  },

  profileName: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "700",
    marginBottom: 4,
  },

  profileEmail: {
    color:
      "rgba(255,255,255,0.55)",
    fontSize: 14,
  },

  // ========================================================
  // FORM CARD
  // ========================================================

  formCard: {
    backgroundColor:
      "rgba(255,255,255,0.06)",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor:
      "rgba(255,255,255,0.08)",
  },

  // ========================================================
  // INPUT GROUP
  // ========================================================

  inputGroup: {
    marginBottom: 20,
  },

  inputLabel: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8,
  },

  inputWrapper: {
    minHeight: 52,
    borderRadius: 14,
    backgroundColor:
      "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor:
      "rgba(255,255,255,0.10)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },

  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 14,
    marginLeft: 11,
    paddingVertical: 0,
  },

  textAreaWrapper: {
    minHeight: 115,
    alignItems: "flex-start",
    paddingTop: 15,
  },

  textArea: {
    minHeight: 90,
    paddingTop: 0,
  },

  // ========================================================
  // INFO
  // ========================================================

  infoBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 18,
    padding: 15,
    borderRadius: 15,
    backgroundColor:
      "rgba(8,201,245,0.08)",
    borderWidth: 1,
    borderColor:
      "rgba(8,201,245,0.15)",
  },

  infoText: {
    flex: 1,
    color:
      "rgba(255,255,255,0.60)",
    fontSize: 12,
    lineHeight: 19,
    marginLeft: 10,
  },

  // ========================================================
  // SAVE BUTTON
  // ========================================================

  saveButton: {
    height: 54,
    borderRadius: 16,
    backgroundColor: "#0879D1",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 22,
  },

  saveButtonDisabled: {
    opacity: 0.6,
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 8,
  },

  // ========================================================
  // CANCEL
  // ========================================================

  cancelButton: {
    height: 50,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor:
      "rgba(255,255,255,0.06)",
  },

  cancelButtonText: {
    color:
      "rgba(255,255,255,0.70)",
    fontSize: 14,
    fontWeight: "600",
  },

  // ========================================================
  // LOADING
  // ========================================================

  loadingText: {
    color: "#FFFFFF",
    marginTop: 14,
    fontSize: 14,
  },

  // ========================================================
  // BOTTOM
  // ========================================================

  bottomSpace: {
    height: 30,
  },

});