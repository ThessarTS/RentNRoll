import React from "react";
import { StyleSheet, View, Button } from "react-native";

function Account({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title="Login" onPress={() => navigation.navigate("loginRegister")}></Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Account;
