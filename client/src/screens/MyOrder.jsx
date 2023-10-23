import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, SafeAreaView, ImageBackground, ScrollView, View, Image, Pressable, FlatList } from "react-native";
import bg from "../../assets/image/bg-home.png";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import notFound from "../../assets/image/zzz.png";
import { useSelector } from "react-redux";
import CardOrder from "../components/CardOrder";

function Account({ navigation }) {
  const { profile } = useSelector((state) => state.userReducer);

  return (
    <View style={styles.container}>
      <View style={styles.mastheadContainer}>
        <View style={{ marginEnd: 10, paddingBottom: 10, alignSelf: "flex-end" }}>
          <View style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}>
            <Pressable>
              <Entypo name="chat" size={25} color="white" />
            </Pressable>
            <Pressable>
              <Icon name="bell-badge" size={25} color="white" />
            </Pressable>
          </View>
        </View>
      </View>
      <SafeAreaView style={{ flex: 1 }}>
        {profile && profile.Orders.length !== 0 ? (
          <ImageBackground source={bg} style={{ flex: 1 }}>
            <ScrollView style={styles.scrollViewContainer}>
              <View style={styles.itemContainer}>
                <View style={styles.top}></View>

                <View style={{ backgroundColor: "white", marginHorizontal: 10, padding: 20, borderRadius: 8, gap: 20, shadowColor: "#171717", shadowOffset: { width: -2, height: 4 }, shadowOpacity: 0.2, shadowRadius: 3 }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
                    <View style={{ backgroundColor: "#17799A", width: 35, height: 35, alignItems: "center", justifyContent: "center", borderRadius: "50%" }}>
                      <MaterialIcons name="car-rental" size={25} color="white" />
                    </View>
                    <View>
                      <Text>The collection of orders you have made</Text>
                    </View>
                  </View>

                  <View>
                    {profile.Orders.map((order) => (
                      <CardOrder order={order} key={order.id} />
                    ))}
                  </View>
                </View>
              </View>
            </ScrollView>
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
    height: "500%",
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
