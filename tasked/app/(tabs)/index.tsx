import { StyleSheet, Text, View } from "react-native";

import { TodosApp } from "@/features/todo/todo-app";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <View style={styles.outsideSafeArea}>
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <View style={styles.container}>
          {/*  */}
          <Text style={styles.title}>tasked</Text>

          <View style={styles.content}>
            <TodosApp />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  outsideSafeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    marginTop: 40,
    marginLeft: 27,
    width: 109,
    height: 41,
    fontWeight: "700",
    fontSize: 32,
    lineHeight: 32,
    letterSpacing: -0.41,
    color: "#111111",
  },
  content: {
    marginTop: 8,
    width: "100%",
    flex: 1,
  },
});
