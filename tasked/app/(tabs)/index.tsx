import { StyleSheet, Text, View } from "react-native";

import { TodosApp } from "@/features/todo/todo-app";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/*  */}
      <Text style={styles.title}>tasked</Text>

      <View style={styles.content}>
        <TodosApp />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    marginTop: 84,
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
    marginTop: 16,
    width: "100%",
    flex: 1,
    paddingHorizontal: 16,
  },
});
