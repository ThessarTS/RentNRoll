import React from "react";
import { ImageBackground, SafeAreaView, StyleSheet, Text, View } from "react-native";
import bg from "../../assets/image/bg-account.png";
function MyOrder() {
  return (
    <ImageBackground source={bg} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <Text>My Order</Text>
      </SafeAreaView>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MyOrder;
