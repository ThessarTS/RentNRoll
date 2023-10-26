import { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, Pressable, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { MaterialIcons, AntDesign, Entypo, Feather, Ionicons, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetail, fetchOrderById, midtransPayment, updateOrderStatus } from "../../store/actions";
import { WebView } from "react-native-webview";
import { fPrice } from "../helpers/fPrice";
import { fDate } from "../helpers/fDate";

function PaymentGateway({ navigation, route }) {
  const { id } = route.params;
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const { order } = useSelector((state) => state.orderReducer);
  const [midtransToken, setMidtransToken] = useState("");
  const dispatch = useDispatch();
  console.log(order);

  useEffect(() => {
    setLoadingPage(true);
    dispatch(fetchOrderById(id)).then(() => {
      setLoadingPage(false);
    });
  }, []);
  if (loadingPage) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 16, fontSize: 18 }}>Loading...</Text>
      </View>
    );
  }

  const handlePayment = async () => {
    setLoading(true);
    dispatch(midtransPayment(route.params.id)).then((data) => {
      setMidtransToken(data);
      setLoading(false);
      dispatch(fetchOrderById(id));
    });
  };
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      {midtransToken && (
        <WebView
          source={{
            uri: `${midtransToken.redirect_url}?token=${midtransToken.token}`,
          }}
          onNavigationStateChange={(navState) => {
            if (navState.url.includes("app.sandbox.midtrans.com/") && navState.url.includes("/success")) {
              console.log("Payment successful");
              setTimeout(() => {
                navigation.navigate("Your Order");
              }, 5000);
            }
          }}
          style={{ flex: 1 }}
        />
      )}
      {!midtransToken && (
        <ScrollView>
          <View style={[styles.container]}>
            <View style={styles.headerContainer}>
              <Image source={{ uri: order?.Vehicle.image }} style={styles.imageCover} resizeMode="cover" />
              <View style={styles.headerItems}>
                <Text style={styles.headerTitle}> {order?.Vehicle.name}</Text>
                <View style={[styles.headerItemContainer]}>
                  <Ionicons name="location" size={18} color="#17799A" />
                  <Text style={styles.location}>Location : {order?.Vehicle.location}</Text>
                </View>
                <View style={[styles.headerItemContainer, { marginStart: 3 }]}>
                  <FontAwesome name="calendar-plus-o" size={13} />
                  <Text style={styles.location}>Start Date : {fDate(order?.startDate)}</Text>
                </View>
                <View style={[styles.headerItemContainer, { marginStart: 3 }]}>
                  <FontAwesome name="calendar-check-o" size={13} />
                  <Text style={styles.location}>End Date : {fDate(order?.startDate)}</Text>
                </View>
              </View>

              <View style={[styles.itemContainer, { marginTop: 15 }]}>
                <View style={{ height: 25, alignItems: "Center", justifyContent: "center", borderLeftColor: "#17799A", borderLeftWidth: 2, paddingHorizontal: 5 }}>
                  <Text style={styles.itemTitle}>Owner</Text>
                </View>
                <View style={styles.ownerContainer}>
                  <View style={styles.ownerItem}>
                    <Image
                      source={{
                        uri: order?.image ? `${order.Vehicle.User.profilePicture}` : "https://www.copaster.com/wp-content/uploads/2023/03/pp-kosong-wa-default.jpeg",
                      }}
                      style={styles.ownerImage}
                    />
                    <Text style={styles.itemTitle}>{order?.Vehicle.User.fullName}</Text>
                  </View>
                  <Pressable style={styles.ownerAction}>
                    <Ionicons name="ios-chatbox-ellipses-outline" size={25} color="#17799A" />
                  </Pressable>
                </View>
              </View>
              <View style={styles.itemContainer}>
                <View style={{ height: 25, alignItems: "Center", justifyContent: "center", borderLeftColor: "#17799A", borderLeftWidth: 2, paddingHorizontal: 5 }}>
                  <Text style={[styles.itemTitle]}>Payment</Text>
                </View>
                <View style={{ marginVertical: 10 }}>
                  <View style={[styles.headerItemContainer, { marginStart: 3 }]}>
                    <MaterialCommunityIcons name="list-status" size={24} color="black" />
                    <Text style={[styles.location, { marginStart: 15 }]}>Status : {order?.status}</Text>
                  </View>
                  <View style={[styles.headerItemContainer, { marginStart: 3 }]}>
                    <Entypo name="price-tag" size={23} color="black" />
                    <Text style={[styles.location, { marginStart: 15 }]}>Total Price : {fPrice(order?.totalPrice)}</Text>
                  </View>
                </View>
              </View>
            </View>
            {order?.status === "pending" && (
              <Pressable style={styles.payButton} onPress={handlePayment}>
                <Text style={{ color: "white" }}>Pay Now</Text>
              </Pressable>
            )}
            {order?.status === "ongoing" && (
              <Pressable style={styles.rentButton}>
                <Text style={{ color: "white" }}>Pay Now</Text>
              </Pressable>
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    gap: 5,
  },

  imageCover: {
    width: "100%",
    height: 250,
    marginBottom: 10,
    objectFit: "cover",
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
  },

  headerCategories: {
    fontSize: 11,
    marginStart: 5,
    fontWeight: "600",
  },
  headerItems: {
    paddingHorizontal: 20,
    gap: 5,
  },

  headerItemContainer: {
    alignItems: "center",
    flexDirection: "row",
  },

  rating: {
    marginStart: 3,
    fontSize: 11,
    fontWeight: "600",
  },

  location: {
    marginStart: 3,
    fontSize: 11,
    fontWeight: "600",
  },

  headerContainer: {
    backgroundColor: "white",
    paddingVertical: 20,
  },

  itemContainer: {
    padding: 20,
    paddingVertical: 15,
    marginVertical: 5,
    gap: 10,
    backgroundColor: "white",
  },

  itemTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  ownerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  ownerItem: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  ownerImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },

  ownerAction: {
    padding: 10,
    flexDirection: "row",
    gap: 15,
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
  payButton: {
    backgroundColor: "#FF6347",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginHorizontal: 20,
  },
  returnButton: {
    backgroundColor: "green",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginHorizontal: 20,
  },
});
export default PaymentGateway;
