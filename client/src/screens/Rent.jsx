import React from "react";
import { View, Text, StyleSheet } from "react-native";
import bg from "../../assets/image/bg-home.png";
function Rent() {
  return (
    <View style={styles.container}>
      <Text>Rent Now</Text>
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

export default Rent;
