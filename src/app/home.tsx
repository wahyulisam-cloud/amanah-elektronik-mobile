import { View, Text, StyleSheet } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 Selamat Datang di Home!</Text>

      <Text style={styles.subtitle}>
        Login berhasil menggunakan Expo Router.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 15,
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});