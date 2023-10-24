import React, { useCallback, useState } from "react";
import { StyleSheet, Text, SafeAreaView, ImageBackground, ScrollView, View, Image, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import bg from "../../assets/image/bg-home.png";
import { Ionicons, Entypo, MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../store/actions";
import { useFocusEffect } from "@react-navigation/native";
import NavIcon from "../components/NavIcon";

function Account({ navigation }) {
  const [user, setUser] = useState(null);
  const { profile } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <NavIcon />
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
                        uri: profile.UserProfile
                          ? `${profile.UserProfile.profilePicture}`
                          : "https://www.copaster.com/wp-content/uploads/2023/03/pp-kosong-wa-default.jpeg",
                      }}
                      style={styles.profileImage}
                    />
                  )}

                  <View>
                    <Text style={styles.profileName}>
                      {profile ? profile.fullName : ""}
                    </Text>
                    <View style={{ gap: 2 }}>
                      <Text style={{ fontSize: 15 }}>
                        Balance: {profile ? profile.Balances : ""}
                      </Text>
                      <Text style={styles.profileInfo}>
                        {profile ? profile.email : ""}
                      </Text>
                      {profile && profile.Orders && (
                        <Text style={styles.profileInfo}>
                          {profile ? profile.Orders.length : 0} Orders
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
                <View>
                  <Pressable
                    style={styles.profileButton}
                    onPress={() =>
                      navigation.navigate("myprofile", {
                        name: profile && profile.fullName,
                      })
                    }
                  >
                    <Text style={styles.profileButtonText}>
                      View My Profile
                    </Text>
                  </Pressable>
                </View>
              </View>
              {/* end profile */}
              <View style={{ gap: 20 }}>
                {/* myorder */}
                <View style={styles.itemsContainer}>
                  <Text style={styles.itemsTitle}>My Order</Text>
                  <Pressable style={styles.itemsBackgroundContainer}>
                    <View style={{ flex: 1 }}>
                      <Ionicons name="book-sharp" size={25} color="#17799A" />
                    </View>
                    <View style={{ gap: 2, flex: 6 }}>
                      <Text style={styles.itemsDetailTitle}>Order</Text>
                      <Text style={styles.itemsDetailInfo}>
                        Contains all of your order data.
                      </Text>
                    </View>
                    <Pressable>
                      <Ionicons
                        name="chevron-forward"
                        size={24}
                        color="#17799A"
                      />
                    </Pressable>
                  </Pressable>
                </View>
                {/* endMyorder */}

                {/* myRent */}
                <View style={styles.itemsContainer}>
                  <Text style={styles.itemsTitle}>My Rent</Text>
                  <Pressable style={styles.itemsBackgroundContainer}>
                    <View style={{ flex: 1 }}>
                      <Entypo name="book" size={25} color="#17799A" />
                    </View>
                    <View style={{ gap: 2, flex: 6 }}>
                      <Text style={styles.itemsDetailTitle}>Rent</Text>
                      <Text style={styles.itemsDetailInfo}>
                        View the details of your rent.
                      </Text>
                    </View>
                    <Pressable>
                      <Ionicons
                        name="chevron-forward"
                        size={24}
                        color="#17799A"
                      />
                    </Pressable>
                  </Pressable>
                </View>
                {/* endMyRent */}

                {/* member features */}
                <View style={styles.itemsContainer}>
                  <Text style={styles.itemsTitle}>Member Features</Text>
                  <View style={styles.memberContainer}>
                    {/* add vehicle */}
                    <Pressable
                      style={styles.memberItemContainer}
                      onPress={() => navigation.navigate("Add Vehicle")}
                    >
                      <View style={{ flex: 1 }}>
                        <Ionicons
                          name="ios-add-circle-outline"
                          size={25}
                          color="gray"
                        />
                      </View>
                      <View style={{ gap: 2, flex: 6 }}>
                        <Text style={styles.itemsDetailTitle}>Add Vehicle</Text>
                        <Text
                          style={[styles.itemsDetailInfo, { color: "gray" }]}
                        >
                          Register your vehicle now.
                        </Text>
                      </View>
                      <View>
                        <Ionicons
                          name="chevron-forward"
                          size={24}
                          color="#17799A"
                        />
                      </View>
                    </Pressable>
                    {/* end add vehicle */}

                    {/* my vehicle */}
                    <Pressable
                      style={styles.memberItemContainer}
                      onPress={() => {
                        navigation.navigate("myvehicle");
                      }}
                    >
                      <View style={{ flex: 1 }}>
                        <Ionicons name="bicycle-sharp" size={25} color="gray" />
                      </View>
                      <View style={{ gap: 2, flex: 6 }}>
                        <Text style={styles.itemsDetailTitle}>My Vehicle</Text>
                        <Text
                          style={[styles.itemsDetailInfo, { color: "gray" }]}
                        >
                          View your vehicle now.
                        </Text>
                      </View>
                      <View>
                        <Ionicons
                          name="chevron-forward"
                          size={24}
                          color="#17799A"
                        />
                      </View>
                    </Pressable>
                    {/* end my vehicle */}

                    {/* setting */}
                    <Pressable style={styles.memberItemContainer}>
                      <View style={{ flex: 1 }}>
                        <MaterialIcons name="logout" size={25} color="gray" />
                      </View>
                      <View style={{ flex: 6, justifyContent: "center" }}>
                        <Text style={styles.itemsDetailTitle}>Logout</Text>
                      </View>
                      <View>
                        <Ionicons
                          name="chevron-forward"
                          size={24}
                          color="#17799A"
                        />
                      </View>
                    </Pressable>
                    {/* end setting */}
                  </View>
                </View>
                {/* end member */}
              </View>
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

export default Account;
