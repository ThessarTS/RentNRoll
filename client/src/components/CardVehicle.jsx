import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { truncateName } from "../helpers/fName";
import { fPrice } from "../helpers/fPrice";

function CardVehicle({ id, image, name, price, rating, navigation, totalReviews }) {
  const goDetail = () => {
    navigation.navigate("detail", {
      name: name,
      id: id,
    });
  };

  return (
    <Pressable style={styles.container} onPress={goDetail}>
      <View style={styles.innerContainer}>
        <Image source={{ uri: `${image}` }} style={styles.image} resizeMode="contain" />
        <View style={styles.cardContainer}>
          <Text style={styles.title}>{truncateName(name)}</Text>
          <Text style={styles.price}>{fPrice(price)}</Text>
          <Text style={styles.rating}>
            <AntDesign name="star" size={12} color="#F8B84E" />({rating}) ({totalReviews} reviews)
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 10,
    margin: 5,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  innerContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
  },
  cardContainer: {
    padding: 10,
    paddingHorizontal: 7,
    gap: 5,
  },
  title: {
    fontSize: 13,
    fontWeight: "500",
  },
  image: {
    width: 150,
    height: 85,
  },
  price: {
    color: "#17799A",
    fontWeight: "600",
    fontSize: 11,
  },
  rating: {
    fontSize: 10,
    fontWeight: "600",
  },
});

export default CardVehicle;
