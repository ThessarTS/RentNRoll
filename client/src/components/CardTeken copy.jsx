import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
function CardTakenRent({ vehicles, navigation }) {
  const fPrice = (price) => {
    return price.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  };

  const fDate = (date) => {
    return date.split("T")[0];
  };

  const goDetail = () => {
    navigation.navigate("detail", {
      // name: vehicles.name,
      id: vehicles.id,
    });
  };
  return (
    <Pressable
      onPress={() => {
        goDetail();
      }}
    >
      <View style={styles.card}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Image
            source={{
              uri: vehicles.Vehicle.image,
            }}
            style={styles.image}
          />
          <View style={{ gap: 5 }}>
            <Text style={styles.textCard}>
              Start: {fDate(vehicles.startDate)}
            </Text>
            <Text style={styles.textCard}>End: {fDate(vehicles.endDate)}</Text>

            <Text style={styles.textCard}>Status: {vehicles.status}</Text>
            <Text style={styles.textCard}>
              Total Price: {fPrice(vehicles.totalPrice)}
            </Text>
          </View>
          <View
            style={{ backgroundColor: "red", flex: 0, alignItems: "flex-end" }}
          ></View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
  },
  card: {
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    flex: 1,
    elevation: 3, // for Android shadow
    shadowColor: "#000", // for iOS shadow
    shadowOffset: { width: 1, height: 1 }, // for iOS shadow
    shadowOpacity: 0.3, // for iOS shadow
  },
  image: {
    width: "50%",
    height: 120,
    borderRadius: 10,
    marginBottom: 8,
    resizeMode: "contain",
  },
  textCard: {
    fontSize: 15,
  },
  rating: {
    fontSize: 12,
    fontWeight: "600",
  },
});
export default CardTakenRent;
