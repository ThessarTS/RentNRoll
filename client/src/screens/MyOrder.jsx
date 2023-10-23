import React, { useState } from "react";
import { StyleSheet, Text, SafeAreaView, ImageBackground, ScrollView, View, Image, Pressable, FlatList } from "react-native";
import bg from "../../assets/image/bg-home.png";
import { MaterialIcons } from "@expo/vector-icons";
import notFound from "../../assets/image/zzz.png";
import { useSelector } from "react-redux";
import CardOrder from "../components/CardOrder";
import NavIcon from "../components/NavIcon";

function Account({ navigation }) {
  const { profile } = useSelector((state) => state.userReducer);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const status = [
    {
      status: "All",
    },
    {
      status: "Pending",
    },
    {
      status: "Payment",
    },
    {
      status: "Ongoing",
    },
    {
      status: "Returned",
    },
  ];

  const filterOrderByStatus = (status) => {
    setSelectedStatus(status.toLowerCase() === "all" ? "All" : status);
  };

  const filteredOrders = profile && profile.Orders ? (selectedStatus === "All" ? profile.Orders : profile.Orders.filter((order) => order.status.toLowerCase() === selectedStatus.toLowerCase())) : [];

  const ButtonStatus = ({ status }) => {
    const isSelected = status.status === selectedStatus || (selectedStatus === null && status.status === "all");

    return (
      <Pressable
        onPress={() => filterOrderByStatus(status.status)}
        style={{
          marginEnd: 3,
          paddingBottom: 5,
          flex: 1,
          height: 30,
          alignItems: "center",
          justifyContent: "center",
          borderBottomWidth: 2,
          borderBottomColor: isSelected ? "#17799A" : "transparent",
        }}
      >
        <Text style={{ fontSize: 11 }}>{status.status}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <NavIcon />
      <SafeAreaView style={{ flex: 1 }}>
        {profile && profile.Orders && profile.Orders.length !== 0 ? (
          <ImageBackground source={bg} style={{ flex: 1 }}>
            <View style={styles.scrollViewContainer}>
              <View style={styles.itemContainer}>
                <View style={styles.top}></View>

                <View style={{ backgroundColor: "white", marginHorizontal: 10, padding: 20, borderRadius: 8, gap: 20, shadowColor: "#171717", shadowOffset: { width: -2, height: 4 }, shadowOpacity: 0.2, shadowRadius: 3, flex: 1 }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
                    <View style={{ backgroundColor: "#17799A", width: 35, height: 35, alignItems: "center", justifyContent: "center", borderRadius: "50%" }}>
                      <MaterialIcons name="car-rental" size={25} color="white" />
                    </View>
                    <View>
                      <Text>The collection of orders you have made</Text>
                    </View>
                  </View>

                  <View style={{ flexDirection: "row", gap: 5, alignItems: "center", justifyContent: "center" }}>
                    {status.map((e) => (
                      <ButtonStatus status={e} key={e.status} />
                    ))}
                  </View>

                  <ScrollView>
                    <View>
                      {filteredOrders.length !== 0 ? (
                        filteredOrders.map((order) => <CardOrder order={order} key={order.id} />)
                      ) : (
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                          <Image source={notFound} style={{ width: 200, height: 200 }} resizeMode="contain" />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 15,
                              fontWeight: 500,
                            }}
                          >
                            No orders found
                          </Text>
                        </View>
                      )}
                    </View>
                  </ScrollView>
                </View>
              </View>
            </View>
          </ImageBackground>
        ) : (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Image source={notFound} style={{ width: 200, height: 200 }} resizeMode="contain" />
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                fontWeight: 500,
              }}
            >
              Looks like you've never order before
            </Text>
            <Pressable
              style={{
                backgroundColor: "#17799A",
                padding: 10,
                paddingHorizontal: 20,
                borderRadius: 10,
                marginTop: 10,
              }}
            >
              <Text style={{ color: "white" }}>Rent Now</Text>
            </Pressable>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
  },
  mastheadContainer: {
    flexDirection: "row",
    gap: 5,
    paddingHorizontal: 20,
    paddingTop: 70,
    paddingBottom: 10,
    backgroundColor: "#17799A",
    justifyContent: "flex-end",
  },
  scrollViewContainer: {
    position: "relative",
    zIndex: 0,
  },
  itemContainer: {
    backgroundColor: "white",
    height: "100%",
    paddingBottom: 20,
  },
  top: {
    backgroundColor: "#17799A",
    width: "100%",
    height: 100,
    position: "absolute",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    zIndex: 0,
  },
  rentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  rentStartContainer: {
    alignItems: "flex-start",
    gap: 10,
    padding: 5,
  },
  rentStartDate: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rentEndContainer: {
    alignItems: "flex-end",
    gap: 10,
    padding: 5,
    borderBottomColor: "gray",
  },
  rendEndDate: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },
  rentAction: {
    fontSize: 15,
    color: "white",
    fontWeight: 600,
  },
  rentButton: {
    backgroundColor: "#17799A",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});

export default Account;
