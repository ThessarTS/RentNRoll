import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { fPrice } from "../helpers/fPrice";
import { truncateName } from "../helpers/fName";
import { getStatusBackgroundColor } from "../helpers/getBg";

function CardOrderHome({ orders, navigation }) {
  const goDetail = () => {
    navigation.navigate("detailorder", {
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
          <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
            <MaterialCommunityIcons name="list-status" color={getStatusBackgroundColor(orders.status)} />
            <Text style={[styles.status, { color: getStatusBackgroundColor(orders.status) }]}>{orders.status}</Text>
          </View>
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
    alignItems: "flex-start",
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
  status: {
    fontSize: 10,
    fontWeight: "400",
  },
});

export default CardOrderHome;
