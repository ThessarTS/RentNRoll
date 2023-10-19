import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
function CardVehicle({ image, name, price, rating }) {
  const maxLength = 18;
  const truncateName = (name) => {
    if (name.length > maxLength) {
      return name.substring(0, maxLength) + "...";
    }
    return name;
  };
  const fPrice = (price) => {
    return price.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
  };
  return (
    <View style={[styles.container, styles.shadowProp]}>
      <Image source={{ uri: `${image}` }} style={styles.image} resizeMode="contain" />
      <View style={styles.cardContainer}>
        <Text style={styles.title}>{truncateName(name)}</Text>
        <Text style={styles.price}>{fPrice(price)}</Text>
        <Text style={styles.rating}>
          <AntDesign name="star" size={15} color="#F8B84E" />({rating})
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    shadowColor: "black",
    borderRadius: 10,
    margin: 5,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  cardContainer: {
    padding: 10,
    paddingHorizontal: 15,
    gap: 5,
  },
  title: {
    fontSize: 13,
    fontWeight: "500",
  },
  image: {
    width: "100%",
    height: 90,
  },
  price: {
    color: "#17799A",
    fontWeight: "600",
    fontSize: 11,
  },
  rating: {
    fontSize: 11,
    fontWeight: "600",
  },
});

export default CardVehicle;
