import React from "react";
import { StyleSheet, Text, View } from "react-native";

function CardSpecification({ type, value }) {
  return (
    <View style={styles.container}>
      <Text style={styles.specType}>{type}</Text>
      <Text style={styles.specValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    width: 140,
    borderRadius: 10,
    margin: 5,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    padding: 20,
    paddingVertical: 10,
    gap: 10,
  },
  specType: {
    color: "gray",
  },
  specValue: {
    fontWeight: "500",
  },
});

export default CardSpecification;
