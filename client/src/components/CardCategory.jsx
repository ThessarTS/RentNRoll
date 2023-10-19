import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

function CardCategory({ name, image, backgroundColor }) {
  return (
    <View style={styles.container}>
      <View style={[styles.cardContainer, { backgroundColor }]}>
        <Image source={image} style={{ width: 25, height: 25 }} />
      </View>
      <Text>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    marginTop: 10,
    overflow: "hidden",
  },
  cardContainer: {
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
});
export default CardCategory;
