import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons, Entypo, AntDesign } from "@expo/vector-icons";
import { fPrice } from "../helpers/fPrice";

function CardVehicleRent({ navigation, vehicle, startDate, endDate }) {
  const goDetail = () => {
    navigation.navigate("detail", {
      name: vehicle.name,
      id: vehicle.id,
      startdate: startDate.toISOString(),
      enddate: endDate.toISOString(),
    });
  };

  return (
    <Pressable style={styles.container} onPress={goDetail}>
      <Text style={styles.itemsDetailTitle}>{vehicle.name}</Text>
      <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
        <View>
          <Image source={{ uri: vehicle.image }} style={{ width: 90, height: 65 }} resizeMode="contain" />
        </View>
        <View style={{ flex: 6, marginStart: 10, gap: 3 }}>
          <View style={[styles.headerItemContainer]}>
            <Ionicons name="location" size={15} color="gray" />
            <Text style={styles.itemsDetailInfo}>{vehicle.location}</Text>
          </View>
          <View style={[styles.headerItemContainer, { marginStart: 2 }]}>
            <AntDesign name="star" size={15} color="#F8B84E" />
            <Text style={[styles.itemsDetailInfo, { marginStart: 2 }]}>
              ({vehicle.averageRating}) ({vehicle.totalReviews} reviews)
            </Text>
          </View>
          <View style={[styles.headerItemContainer, { marginStart: 2 }]}>
            <Entypo name="price-tag" size={15} color="#17799A" />
            <Text style={[styles.itemsDetailInfo, { marginStart: 2 }]}>{fPrice(vehicle.price)}</Text>
          </View>
        </View>
        <View>
          <Ionicons name="chevron-forward" size={24} color="#17799A" />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    padding: 10,
    gap: 10,
  },
  itemsDetailTitle: {
    fontSize: 14,
    fontWeight: "500",
  },
  itemsDetailInfo: {
    fontSize: 11,
    color: "gray",
  },
  headerItemContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
  },
});

export default CardVehicleRent;
