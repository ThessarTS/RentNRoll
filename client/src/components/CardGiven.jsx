import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
function CardGiveRent({ vehicles, navigation }) {
  // console.log(vehicles, "<< dari card");
  const fPrice = (price) => {
    return price.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  };

  const goDetail = () => {
    navigation.navigate("detail", {
      name: name,
      id: id,
    });
  };
  return (
    <Pressable>
      <View style={styles.card}>
        <Text
          style={{
            textAlign: "center",
            marginBottom: 20,
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          {vehicles.name}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Image
            source={{
              uri: vehicles.image,
            }}
            style={styles.image}
          />
          <View style={{ gap: 4 }}>
            <Text style={styles.textCard}>Location: {vehicles.location}</Text>
            <Text style={styles.textCard}>Price: {fPrice(vehicles.price)}</Text>
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
    height: 90,
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
export default CardGiveRent;
