import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons, Entypo, FontAwesome } from "@expo/vector-icons";
import { fPrice } from "../helpers/fPrice";
import { fDate } from "../helpers/fDate";
import { getStatusBackgroundColor } from "../helpers/getBg";

function CardOrder({ order }) {
  return (
    <View style={styles.container}>
      <Text style={styles.itemsDetailTitle}>{order.Vehicle.name}</Text>
      <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
        <View>
          <Image source={{ uri: order.Vehicle.image }} style={{ width: 90, height: 65 }} resizeMode="contain" />
        </View>
        <View style={{ flex: 6, marginStart: 10, gap: 3 }}>
          <View style={[styles.headerItemContainer]}>
            <Ionicons name="location" size={15} color="gray" />
            <Text style={styles.itemsDetailInfo}>{order.Vehicle.location}</Text>
          </View>
          <View style={[styles.headerItemContainer, { marginStart: 2 }]}>
            <FontAwesome name="calendar-plus-o" size={12} color="gray" />
            <Text style={[styles.itemsDetailInfo, { marginStart: 2 }]}>{fDate(order.startDate)}</Text>
          </View>
          <View style={[styles.headerItemContainer, { marginStart: 2 }]}>
            <FontAwesome name="calendar-check-o" size={12} color="gray" />
            <Text style={[styles.itemsDetailInfo, { marginStart: 2 }]}>{fDate(order.endDate)}</Text>
          </View>
          <View style={[styles.headerItemContainer, { marginStart: 2 }]}>
            <Entypo name="price-tag" size={15} color="#17799A" />
            <Text style={[styles.itemsDetailInfo, { marginStart: 2 }]}>{fPrice(order.Vehicle.price)}</Text>
          </View>
        </View>
        <Pressable style={{ backgroundColor: getStatusBackgroundColor(order.status), padding: 7, borderRadius: 5 }}>
          <Text style={{ color: "white", fontSize: 10 }}>{order.status === "pending" ? "Pay Now" : order.status}</Text>
        </Pressable>
        <View>
          <Ionicons name="chevron-forward" size={24} color="#17799A" />
        </View>
      </View>
    </View>
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

export default CardOrder;
