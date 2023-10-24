import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { fPrice } from "../helpers/fPrice";
import { truncateName } from "../helpers/fName";

function CardOrderHome({ orders, navigation }) {
  const goDetail = () => {
    navigation.navigate("detail", {
      name: orders.Vehicle.name,
      id: orders.Vehicle.id,
    });
  };

  return (
    <Pressable style={styles.container} onPress={goDetail}>
      <View style={styles.innerContainer}>
        <Image source={{ uri: `${orders.Vehicle.image}` }} style={styles.image} resizeMode="cover" />
        <View style={styles.cardContainer}>
          <Text style={styles.title}>{truncateName(orders.Vehicle.name)}</Text>
          <Text style={styles.price}>{fPrice(orders.Vehicle.price)}</Text>
          {/* <Text style={styles.rating}>
            <AntDesign name="star" size={15} color="#F8B84E" />({rating})
          </Text> */}
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
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
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
    width: 150,
    height: 85,
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

export default CardOrderHome;
