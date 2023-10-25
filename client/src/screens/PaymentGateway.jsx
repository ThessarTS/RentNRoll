import { useCallback, useEffect, useState, useFocusEffect } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  Pressable,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDetail,
  fetchOrderById,
  midtransPayment,
  updateOrderStatus,
} from "../../store/actions";
import { WebView } from "react-native-webview";
import { fPrice } from "../helpers/fPrice";
import { fDate } from "../helpers/fDate";
import { successAlert } from "../helpers/alert";

function PaymentGateway({ navigation, route }) {
  const { id, vehicleId } = route.params;
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const { order } = useSelector((state) => state.orderReducer);
  const [midtransToken, setMidtransToken] = useState(""); // Initialize as empty
  const dispatch = useDispatch();
  // Function to set the Midtrans token received from your server

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
    <View style={{ flex: 1 }}>
      {midtransToken && (
        <WebView
          source={{
            uri: `${midtransToken.redirect_url}?token=${midtransToken.token}`,
          }}
          onNavigationStateChange={(navState) => {
            if (
              navState.url.includes("app.sandbox.midtrans.com/") &&
              navState.url.includes("/success")
            ) {
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
        <View style={styles.container}>
          <View style={styles.card}>
            <Text
              style={{
                textAlign: "center",
                marginBottom: 20,
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              {order?.Vehicle?.name}
            </Text>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {order && (
                <Image
                  source={{
                    uri: order.Vehicle.image,
                  }}
                  style={styles.image}
                />
              )}

              <View style={{ gap: 10 }}>
                <Text style={styles.textCard}>
                  Owner: {order?.Vehicle.User.fullName}
                </Text>
                <Text style={styles.textCard}>{order?.Vehicle.location}</Text>
                <Text style={styles.textCard}>
                  {order ? fPrice(order?.Vehicle.price) : 0}
                </Text>
                <Text style={styles.textCard}>Status: {order?.status}</Text>

                <Text style={styles.textCard}>
                  Start Date: {order ? fDate(order?.endDate) : ""}
                </Text>
                <Text style={styles.textCard}>
                  End Date: {order ? fDate(order?.startDate) : ""}
                </Text>
                <Text style={styles.textCard}>
                  Total Price: {order ? fPrice(order?.totalPrice) : ""}
                </Text>
              </View>
              {order?.status == "pending" && (
                <Pressable onPress={handlePayment} style={styles.rentButton}>
                  <Text style={styles.textButton}>Pay Order</Text>
                </Pressable>
              )}
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
    padding: 10,
  },
  rentButton: {
    backgroundColor: "#17799A",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 25,
  },
  returnButton: {
    backgroundColor: "red",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 25,
  },
  textButton: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  card: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    margin: 10,
    flex: 1,
    elevation: 3, // for Android shadow
    shadowColor: "#000", // for iOS shadow
    shadowOffset: { width: 1, height: 1 }, // for iOS shadow
    shadowOpacity: 0.3, // for iOS shadow
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 8,
  },
  textCard: {
    fontSize: 15,
  },
  rating: {
    fontSize: 12,
    fontWeight: "600",
  },
});
export default PaymentGateway;
