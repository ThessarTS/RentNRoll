import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons, Entypo, FontAwesome } from "@expo/vector-icons";
import { fPrice } from "../helpers/fPrice";
import { fDate } from "../helpers/fDate";
import { updateOrderStatus } from "../../store/actions";
import { useDispatch } from "react-redux";
import { successAlert } from "../helpers/alert";

function CardOrder({ order, navigation }) {
  function getStatusBackgroundColor(status) {
    if (status === "returned") return "green";
    else return "#17799A";
  }
  const dispatch = useDispatch();
  const handleReturn = () => {
    const newStatus = {
      status: "returned",
    };
    dispatch(updateOrderStatus(newStatus, order.id)).then((data) => {
      successAlert(data.message);
      navigation.push("myrent");
    });
  };
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        navigation.navigate("detailorder", {
          name: order.Vehicle.name,
          id: order.id,
        });
      }}
    >
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
        <View style={{ flexDirection: "column", gap: 10 }}>
          {order?.status == "ongoing" && (
            <Pressable onPress={handleReturn} style={{ backgroundColor: "#17799A", borderRadius: 5, padding: 5 }}>
              <Text style={{ color: "white", fontWeight: "normal" }}>Return</Text>
            </Pressable>
          )}
          {order?.status == "returned" && (
            <Pressable style={{ backgroundColor: "green", borderRadius: 5, padding: 5 }}>
              <Text style={{ color: "white", fontWeight: "normal" }}>Returned</Text>
            </Pressable>
          )}
          {order?.status === "pending" && (
            <Pressable
              onPress={() => {
                navigation.navigate("detailorder", {
                  name: order.Vehicle.name,
                  id: order.id,
                });
              }}
              style={{
                backgroundColor: "#FF6347",
                borderRadius: 5,
                padding: 6,
              }}
            >
              <Text style={{ color: "white", fontWeight: "normal", fontSize: 11 }}>Pay Rent</Text>
            </Pressable>
          )}
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

export default CardOrder;
