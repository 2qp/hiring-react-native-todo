import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import type { JSX } from "react";

// type LoadingScreenProps = {};

type LoadingScreenType = () => // props: LoadingScreenProps

JSX.Element;

const LoadingScreen: LoadingScreenType = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007AFF" />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  text: {
    marginTop: 12,
    fontSize: 16,
    color: "#555",
  },
});

export { LoadingScreen };
export type { LoadingScreenType };
