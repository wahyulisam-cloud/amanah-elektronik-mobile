import React from "react";
import {
  View,
  StyleSheet,
  useWindowDimensions,
  Platform,
} from "react-native";

type MobileFrameProps = {
  children: React.ReactNode;
};

export default function MobileFrame({ children }: MobileFrameProps) {
  const { width, height } = useWindowDimensions();

  // Hanya aktif ketika aplikasi dibuka melalui Web
  if (Platform.OS !== "web") {
    return <>{children}</>;
  }

  // Lebar maksimal frame seperti HP
  const FRAME_WIDTH = 430;

  const frameWidth = Math.min(width, FRAME_WIDTH);

  return (
    <View style={styles.webContainer}>
      <View
        style={[
          styles.mobileFrame,
          {
            width: frameWidth,
            height: height,
          },
        ]}
      >
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#EAF3F8",
  },

  mobileFrame: {
    overflow: "hidden",
    backgroundColor: "#FFFFFF",

    // Shadow untuk desktop/web
    shadowColor: "#07184D",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.18,
    shadowRadius: 24,

    elevation: 10,
  },
});