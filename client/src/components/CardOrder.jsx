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
      navigation.navigate("Home");
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.itemsDetailTitle}>{order.Vehicle.name}</Text>
      <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
        <View>
          <Image
            source={{ uri: order.Vehicle.image }}
            style={{ width: 90, height: 65 }}
          />
        </View>
        <View style={{ flex: 6, marginStart: 10, gap: 3 }}>
          <View style={[styles.headerItemContainer]}>
            <Ionicons name="location" size={15} color="gray" />
            <Text style={styles.itemsDetailInfo}>{order.Vehicle.location}</Text>
          </View>
          <View style={[styles.headerItemContainer, { marginStart: 2 }]}>
            <FontAwesome name="calendar-plus-o" size={12} color="gray" />
            <Text style={[styles.itemsDetailInfo, { marginStart: 2 }]}>
              {fDate(order.startDate)}
            </Text>
          </View>
          <View style={[styles.headerItemContainer, { marginStart: 2 }]}>
            <FontAwesome name="calendar-check-o" size={12} color="gray" />
            <Text style={[styles.itemsDetailInfo, { marginStart: 2 }]}>
              {fDate(order.endDate)}
            </Text>
          </View>
          <View style={[styles.headerItemContainer, { marginStart: 2 }]}>
            <Entypo name="price-tag" size={15} color="#17799A" />
            <Text style={[styles.itemsDetailInfo, { marginStart: 2 }]}>
              {fPrice(order.Vehicle.price)}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "column", gap: 10 }}>
          <View
            style={{
              backgroundColor: getStatusBackgroundColor(order.status),
              padding: 7,
              borderRadius: 7,
            }}
          >
            <Text style={{ color: "white", fontSize: 10 }}>{order.status}</Text>
          </View>
          {order?.status == "ongoing" && (
            <Pressable
              onPress={handleReturn}
              style={{ backgroundColor: "red", borderRadius: 10, padding: 5 }}
            >
              <Text style={{ color: "white", fontWeight: "normal" }}>
                Return
              </Text>
            </Pressable>
          )}
          {order?.status == "pending" && (
            <Pressable
              onPress={() => {
                navigation.navigate("detailorder", {
                  id: order.id,
                });
              }}
              style={{
                backgroundColor: "green",
                borderRadius: 5,
                padding: 6,
              }}
            >
              <Text
                style={{ color: "white", fontWeight: "normal", fontSize: 11 }}
              >
                Pay Rent
              </Text>
            </Pressable>
          )}
        </View>

        <View>
          {/* {order?.status == "ongoing" && (
            <Pressable
              onPress={handleReturn}
              style={{ backgroundColor: "red", borderRadius: 10, padding: 5 }}
            >
              <Text style={{ color: "white", fontWeight: "normal" }}>
                Return
              </Text>
            </Pressable>
          )}
          {order?.status == "pending" && (
            <Pressable
              onPress={() => {
                navigation.navigate("detailorder", {
                  id: order.id,
                });
              }}
              style={{
                backgroundColor: "#17799A",
                borderRadius: 5,
                padding: 6,
              }}
            >
              <Text
                style={{ color: "white", fontWeight: "normal", fontSize: 11 }}
              >
                Pay Rent
              </Text>
            </Pressable>
          )} */}

          {/* <Ionicons name="chevron-forward" size={24} color="#17799A" /> */}
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
