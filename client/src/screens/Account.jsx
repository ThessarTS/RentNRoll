import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  View,
  Image,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import bg from "../../assets/image/bg-home.png";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../store/actions/userAction";

function Account({ navigation }) {
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState(false);
  const dispatch = useDispatch();
  async function getUser() {
    try {
      const newUser = await AsyncStorage.getItem("access_token");
      if (!newUser) {
        throw new Error("userNotFound");
      }
      // console.log(newUser);
      const newValue = {
        access_token: newUser,
      };
      dispatch(fetchProfile(newValue)).then((data) => {
        console.log(data, "<<< screen");
        setUser(data);
      });
    } catch (error) {
      await navigation.navigate("loginRegister");
    }
  }

  async function logout() {
    try {
      await AsyncStorage.removeItem("access_token");
      await navigation.navigate("loginRegister");
      toggleSettings();
    } catch (error) {
      console.error("Error while logging out:", error);
    }
  }

  const toggleSettings = () => {
    setSettings(!settings);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.mastheadContainer}>
        <View
          style={{ marginEnd: 10, paddingBottom: 10, alignSelf: "flex-end" }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}
          >
            <Pressable style={styles.iconContainer}>
              <Entypo name="chat" size={25} color="white" />
            </Pressable>
            <Pressable style={styles.iconContainer}>
              <Icon name="bell-badge" size={25} color="white" />
            </Pressable>
            <Pressable style={styles.iconContainer} onPress={toggleSettings}>
              <Ionicons name="settings" size={25} color="white" />
            </Pressable>
          </View>
        </View>
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
                  <Image
                    source={{
                      uri: "https://media.licdn.com/dms/image/C4E03AQGnouyn_2vSgw/profile-displayphoto-shrink_800_800/0/1646808937817?e=1703116800&v=beta&t=BZT5fOu-gScDu4h9GkegSv74GG0pSt47-0QAZOQHOeE",
                    }}
                    style={styles.profileImage}
                  />
                  <View>
                    <Text style={styles.profileName}>
                      {user ? user.fullName : ""}
                    </Text>
                    <View style={{ gap: 2 }}>
                      <Text style={styles.profileInfo}>
                        {user ? user.email : ""}
                      </Text>
                      <Text style={styles.profileInfo}>
                        {user ? user.Orders.length : 0} Orders
                      </Text>
                    </View>
                  </View>
                </View>
                <View>
                  <Pressable style={styles.profileButton}>
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
                    <Pressable style={styles.memberItemContainer}>
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
                    <Pressable
                      style={styles.memberItemContainer}
                      onPress={toggleSettings}
                    >
                      <View style={{ flex: 1 }}>
                        <Ionicons
                          name="settings-outline"
                          size={25}
                          color="gray"
                        />
                      </View>
                      <View style={{ gap: 2, flex: 6 }}>
                        <Text style={styles.itemsDetailTitle}>Settings</Text>
                        <Text
                          style={[styles.itemsDetailInfo, { color: "gray" }]}
                        >
                          View and set your account preferences.
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
                    {/* end setting */}
                  </View>
                </View>
                {/* end member */}
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
        <Modal
          isVisible={settings}
          onBackdropPress={toggleSettings}
          style={{
            justifyContent: "flex-end",
            margin: 0,
          }}
        >
          <View style={styles.modalSettingContainer}>
            <Pressable style={styles.logoutButton} onPress={logout}>
              <View style={{ flex: 1 }}>
                <AntDesign name="logout" size={24} color="gray" />
              </View>
              <View style={{ flex: 6 }}>
                <Text style={{ fontWeight: 500, color: "gray" }}>Log Out</Text>
              </View>
              <View>
                <Ionicons name="chevron-forward" size={24} color="gray" />
              </View>
            </Pressable>
            <Pressable
              style={styles.cancelModalButton}
              onPress={toggleSettings}
            >
              <MaterialIcons name="cancel" size={30} color="red" />
            </Pressable>
          </View>
        </Modal>
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

  modalSettingContainer: {
    position: "relative",
    backgroundColor: "whitesmoke",
    height: "20%",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  logoutButton: {
    backgroundColor: "white",
    padding: 20,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 5,
  },

  memberItemContainer: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "white",
  },

  cancelModalButton: { position: "absolute", top: 10, right: 20 },
});

export default Account;
