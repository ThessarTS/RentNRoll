import React from "react";
import { StyleSheet, Text, View } from "react-native";

function AddVehicle() {
  return (
    <View style={styles.container}>
      <Text>Add Vehicle</Text>
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

export default AddVehicle;
