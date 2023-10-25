import React from "react";
import { StyleSheet, Text, View } from "react-native";

function CardSpecification({ name, value }) {
  return (
    <View style={styles.container}>
      <Text style={styles.specType}>{name}</Text>
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
    paddingVertical: 5,
    gap: 5,
  },
  specType: {
    color: "gray",
  },
  specValue: {
    fontWeight: "500",
  },
});

export default CardSpecification;
