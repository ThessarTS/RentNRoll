import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

function CardVehicle({ vehicle, navigation }) {
  const maxLength = 18;
  // console.log(vehicle, "<<< card");

  const truncateName = (name) => {
    if (name.length > maxLength) {
      return name.substring(0, maxLength) + "...";
    }
    return name;
  };

  const fPrice = (price) => {
    return price.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  };

  const goDetail = () => {
    navigation.navigate("detail", {
      name: vehicle.name,
      id: vehicle.id,
    });
  };

  return (
    <Pressable style={styles.container} onPress={goDetail}>
      <View style={styles.innerContainer}>
        <Image
          source={{ uri: `${vehicle.image}` }}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.cardContainer}>
          <Text style={styles.title}>{truncateName(vehicle.name)}</Text>
          <Text style={styles.price}>{fPrice(vehicle.price)}</Text>
          <Text style={styles.rating}>
            <AntDesign name="star" size={15} color="#F8B84E" />({4})
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

export default CardVehicle;
