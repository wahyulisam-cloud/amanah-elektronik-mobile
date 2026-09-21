import React from "react";
import { Stack } from "expo-router";

import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import MobileFrame from "../components/MobileFrame";

export default function RootLayout() {
  return (
    <AuthProvider>
      <CartProvider>
        <MobileFrame>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: "transparent",
              },
              animation: "fade",
            }}
          />
        </MobileFrame>
      </CartProvider>
    </AuthProvider>
  );
}