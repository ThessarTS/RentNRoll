import React from "react";
import { View, StyleSheet, Image } from "react-native";
import logoWhite from "../../assets/image/Logo-White.png";

function Splash() {
  return (
    <View style={styles.container}>
      <Image source={logoWhite} style={{ width: 120, height: 120 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#17799A",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Splash;
