import { useCallback, useState } from "react";
import { View, Text, StyleSheet, Pressable, Image, SafeAreaView, ScrollView } from "react-native";
import bg from "../../assets/image/bg-home.png";
import { Ionicons } from "@expo/vector-icons";
import notFound from "../../assets/image/zzz.png";
import { useDispatch, useSelector } from "react-redux";
import NavIcon from "../components/NavIcon";
import { ImageBackground } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import CardRent from "../components/CardRent";
import { getUser } from "../../store/actions";
import { fPrice } from "../helpers/fPrice";

function MyRent({ navigation }) {
  const navigate = useNavigation();
  const { profile } = useSelector((state) => state.userReducer);
  const { myGivenRent } = useSelector((state) => state.vehicleReducer);
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      dispatch(getUser());
    }, [])
  );

  const [togleRent, setTogleRent] = useState(false);
  return (
    <View style={styles.container}>
      <NavIcon />
      <View style={{ position: "absolute", top: 70, left: 20, flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Pressable onPress={() => navigate.goBack()}>
          <Ionicons name="arrow-back-sharp" size={24} color="white" />
        </Pressable>
        <Text style={{ color: "white", fontSize: 20 }}>My Rent</Text>
      </View>
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground source={bg} style={{ flex: 1 }}>
          <View style={styles.scrollViewContainer}>
            <View style={styles.itemContainer}>
              <View style={styles.top}></View>

              <View style={styles.profileContainer}>
                {/* profile */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 15,
                  }}
                >
                  {profile && (
                    <View>
                      <Image
                        source={{
                          uri: profile.UserProfile ? `${profile.UserProfile.profilePicture}` : "https://www.copaster.com/wp-content/uploads/2023/03/pp-kosong-wa-default.jpeg",
                        }}
                        style={styles.profileImage}
                      />
                    </View>
                  )}

                  <View style={{ flex: 6 }}>
                    <Text style={styles.profileName}>{profile ? profile.fullName : ""}</Text>
                    <View style={{ gap: 2 }}>
                      <Text style={{ fontSize: 15 }}>{profile && profile.totalAmount ? fPrice(profile.totalAmount) : "Rp 0"}</Text>
                      <Text style={styles.profileInfo}>{profile ? profile.email : ""}</Text>
                      {profile && profile.Orders && <Text style={styles.profileInfo}>{profile ? profile.Orders.length : 0} Orders</Text>}
                    </View>
                  </View>
                </View>
                {/*end  profile */}

                <View style={{ flexDirection: "row", gap: 10, borderRadius: 5, marginTop: 10 }}>
                  <Pressable
                    onPress={() => {
                      setTogleRent(false);
                    }}
                  >
                    <View style={{ borderBottomColor: !togleRent ? "#17799A" : "whitesmoke", paddingVertical: 5, borderRadius: 4, borderBottomWidth: !togleRent ? 2 : 0 }}>
                      <Text style={{ color: "black", fontSize: 13 }}>Taken Rent</Text>
                    </View>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setTogleRent(true);
                    }}
                  >
                    <View style={{ borderBottomColor: togleRent ? "#17799A" : "whitesmoke", paddingVertical: 5, borderRadius: 4, borderBottomWidth: togleRent ? 2 : 0 }}>
                      <Text style={{ color: "black", fontSize: 13 }}>Given Rent</Text>
                    </View>
                  </Pressable>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View>
                    {togleRent ? (
                      myGivenRent && myGivenRent.length > 0 ? (
                        myGivenRent.map((item) => <CardRent vehicles={item} UserId={profile.id} navigation={navigation} route={"given"} key={item.id} />)
                      ) : (
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: 30 }}>
                          <Image source={notFound} style={{ width: 200, height: 200 }} resizeMode="contain" />
                          <Text style={{ textAlign: "center", fontSize: 15, fontWeight: 500 }}>No Rent found</Text>
                        </View>
                      )
                    ) : profile.Orders ? (
                      profile.Orders.length > 0 ? (
                        profile.Orders.map((item) => <CardRent vehicles={item} UserId={profile.id} navigation={navigation} key={item.id} />)
                      ) : (
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: 30 }}>
                          <Image source={notFound} style={{ width: 200, height: 200 }} resizeMode="contain" />
                          <Text style={{ textAlign: "center", fontSize: 15, fontWeight: 500 }}>No Rent found</Text>
                        </View>
                      )
                    ) : (
                      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: 30 }}>
                        <ActivityIndicator size="large" />
                        <Text style={{ marginTop: 16, fontSize: 18 }}>Loading...</Text>
                      </View>
                    )}
                  </View>
                </ScrollView>
              </View>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
    flex: 1,
    zIndex: 0,
  },
  itemContainer: {
    backgroundColor: "white",
    height: "90%",
    paddingBottom: 20,
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

export default MyRent;
