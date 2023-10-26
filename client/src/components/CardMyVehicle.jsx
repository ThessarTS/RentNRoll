import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Entypo, AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { fPrice } from "../helpers/fPrice";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { deleteMyVehicle } from "../../store/actions";

function CardMyVehicle({ vehicles, totalOrders }) {
  const [isCanDelete, setIsCanDelete] = useState(false);
  const dispatch = useDispatch();
  const areAllOrdersCompleted = (data) => {
    const orders = data.Orders;
    if (orders.length === 0) {
      return true;
    }
    return orders.every((order) => order.status === true);
  };

  const delVehicle = async () => {
    try {
      const access_token = await AsyncStorage.getItem("access_token");
      dispatch(deleteMyVehicle(vehicles.id, access_token));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsCanDelete(areAllOrdersCompleted(vehicles));
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text style={styles.itemsDetailTitle}>{vehicles.name}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <View>
            <Image
              source={{
                uri: vehicles.image,
              }}
              style={{ width: 90, height: 65 }}
              resizeMode="contain"
            />
          </View>
          <View style={{ flex: 6, marginStart: 10, gap: 3 }}>
            <View style={[styles.headerItemContainer]}>
              <Ionicons name="location" size={15} color="gray" />
              <Text style={styles.itemsDetailInfo}>{vehicles.location}</Text>
            </View>
            <View style={[styles.headerItemContainer, { marginStart: 2 }]}>
              <Ionicons name="md-book-sharp" size={14} color="gray" />
              <Text style={[styles.itemsDetailInfo, { marginStart: 2 }]}>
                {totalOrders} {totalOrders > 1 ? "Orders" : "Order"}
              </Text>
            </View>
            <View style={[styles.headerItemContainer, { marginStart: 2 }]}>
              <Entypo name="price-tag" size={14} color="gray" />
              <Text style={[styles.itemsDetailInfo, { marginStart: 2 }]}>{fPrice(vehicles.price)}</Text>
            </View>
          </View>
          <View>
            {isCanDelete && (
              <Pressable style={{ backgroundColor: "tomato", padding: 7, borderRadius: 5 }} onPress={delVehicle}>
                <MaterialIcons name="delete-forever" size={15} color="white" />
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </>
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
    fontWeight: 500,
  },
  headerItemContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
  },
});

export default CardMyVehicle;
