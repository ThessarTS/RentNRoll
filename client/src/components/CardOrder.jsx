import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Ionicons, AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";

function CardOrder({ order }) {
  function fDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "short" });

    return `${day} ${month} ${year}`;
  }
  const fPrice = (price) => {
    return price.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  };

  function getStatusBackgroundColor(status) {
    if (status === "returned") return "green";
    else return "#17799A";
  }

  return (
    <View style={styles.container}>
      <Text style={styles.itemsDetailTitle}>{order.Vehicle.name}</Text>
      <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
        <View>
          <Image source={{ uri: order.Vehicle.image }} style={{ width: 90, height: 65 }} />
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
        <View style={{ backgroundColor: getStatusBackgroundColor(order.status), padding: 7, borderRadius: 7 }}>
          <Text style={{ color: "white", fontSize: 10 }}>{order.status}</Text>
        </View>
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
