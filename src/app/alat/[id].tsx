import React from "react";
import {
  View,
  Text,
} from "react-native";

export default function AlatDetail() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#07184D",
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "700",
          color: "#FFFFFF",
        }}
      >
        Detail Alat
      </Text>

      <Text
        style={{
          marginTop: 8,
          color: "rgba(255,255,255,0.7)",
        }}
      >
        Detail peralatan elektronik
      </Text>
    </View>
  );
}