import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, SafeAreaView, ImageBackground, ScrollView, View, Image, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import bg from "../../assets/image/bg-home.png";
import { Ionicons, Entypo, MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../store/actions/userAction";
import { useFocusEffect } from "@react-navigation/native";
import NavIcon from "../components/NavIcon";
import { getAccessToken } from "../helpers/getAccessToken";
import { fetchMyVehicles } from "../../store/actions";

function Profile({ navigation }) {
  const [user, setUser] = useState(null);
  const { profile } = useSelector((state) => state.userReducer);
  const { myVehicles } = useSelector((state) => state.vehicleReducer);

  //   console.log(profile);
  const dispatch = useDispatch();

  const [access_token, setAccessToken] = useState("");
  const getAccessToken = async () => {
    try {
      const access_token = await AsyncStorage.getItem("access_token");
      if (!access_token) {
        throw new Error("userNotFound");
      }
      setAccessToken(access_token);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAccessToken();
    dispatch(fetchMyVehicles(access_token));
  }, [access_token]);

  return (
    <View style={styles.container}>
      <NavIcon />
      <View style={{ position: "absolute", top: 70, left: 20, flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Pressable onPress={() => navigation.navigate("You")}>
          <Ionicons name="arrow-back-sharp" size={24} color="white" />
        </Pressable>
        <Text style={{ color: "white", fontSize: 20 }}>{profile.fullName}</Text>
      </View>
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground source={bg} style={{ flex: 1 }}>
          <ScrollView style={styles.scrollViewContainer}>
            <View style={styles.itemContainer}>
              <View style={styles.top}></View>

              {/* profile */}
              <View style={styles.profileContainer}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 15,
                  }}
                >
                  {profile && (
                    <Image
                      source={{
                        uri: profile.UserProfile ? `${profile.UserProfile.profilePicture}` : "https://www.copaster.com/wp-content/uploads/2023/03/pp-kosong-wa-default.jpeg",
                      }}
                      style={styles.profileImage}
                    />
                  )}

                  <View>
                    <Text style={styles.profileName}>{profile ? profile.fullName : ""}</Text>
                    <View style={{ gap: 2 }}>
                      <Text style={{ fontSize: 15 }}>Balance: {profile ? profile.Balances : ""}</Text>
                      <Text style={styles.profileInfo}>{profile ? profile.email : ""}</Text>
                      {profile && profile.Orders && <Text style={styles.profileInfo}>{profile ? profile.Orders.length : 0} Orders</Text>}
                    </View>
                  </View>
                </View>
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                  <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 5 }}>
                    <Text style={{ fontSize: 18, fontWeight: 700 }}>{myVehicles.length}</Text>
                    <Text style={{ fontSize: 12, color: "gray", fontWeight: 600 }}>Vehicles</Text>
                  </View>
                  <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 5 }}>
                    <Text style={{ fontSize: 18, fontWeight: 700 }}>{profile.Orders.length}</Text>
                    <Text style={{ fontSize: 12, color: "gray", fontWeight: 600 }}>Orders</Text>
                  </View>
                  <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 5 }}>
                    <Text style={{ fontSize: 18, fontWeight: 700 }}>5</Text>
                    <Text style={{ fontSize: 12, color: "gray", fontWeight: 600 }}>Reviews</Text>
                  </View>
                </View>
              </View>
              {/* end profile */}
            </View>
          </ScrollView>
        </ImageBackground>
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
    backgroundColor: "whitesmoke",
    height: "500%",
  },
  top: {
    backgroundColor: "#17799A",
    width: "100%",
    height: 100,
    position: "absolute",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    zIndex: 1,
  },
  profileContainer: {
    backgroundColor: "white",
    shadowColor: "black",
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 10,
    marginBottom: 20,
    gap: 15,
    zIndex: 2,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  profileButton: {
    backgroundColor: "#17799A",
    padding: 13,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },

  profileImage: {
    width: 85,
    height: 85,
    borderRadius: 10,
  },

  profileName: { fontSize: 18, marginBottom: 8, fontWeight: "600" },
  profileInfo: { fontSize: 13, color: "gray" },
  profileButtonText: { color: "white", fontWeight: "500" },

  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  itemsContainer: {
    paddingHorizontal: 10,
    gap: 5,
    justifyContent: "center",
  },

  itemsTitle: {
    marginStart: 3,
    fontSize: 14,
    fontWeight: "bold",
    color: "gray",
  },

  itemsBackgroundContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  memberContainer: {
    backgroundColor: "whitesmoke",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    gap: 3,
  },

  itemsDetailTitle: {
    fontSize: 14,
    fontWeight: "500",
  },
  itemsDetailInfo: {
    fontSize: 11,
    color: "green",
  },

  memberItemContainer: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "white",
  },
});

export default Profile;
