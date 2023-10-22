import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, View, Text, Pressable, TextInput, FlatList, ScrollView, ImageBackground } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import carIcon from "../../assets/vector/car.png";
import motorcycleIcon from "../../assets/vector/motorcycle.png";
import bicycleIcon from "../../assets/vector/bicycle.png";
import scooterIcon from "../../assets/vector/scooter.png";
import CardCategory from "../components/CardCategory";
import CardVehicle from "../components/CardVehicle";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import bg from "../../assets/image/bg-home.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchVehicles, fetchTrending } from "../../store/actions/vehicleAction";

function Home({ navigation }) {
  const { vehicles, trending } = useSelector((state) => state.vehicleReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVehicles());
    dispatch(fetchTrending());
  }, []);
  const categories = [
    {
      id: 1,
      name: "Car",
      image: carIcon,
    },
    {
      id: 2,
      name: "Motorcycle",
      image: motorcycleIcon,
    },
    {
      id: 3,
      name: "Bicycle",
      image: bicycleIcon,
    },
    {
      id: 4,
      name: "Scooter",
      image: scooterIcon,
    },
  ];

  const order = [];

  function getCategoryBackgroundColor(name) {
    if (name === "Car") return "#30336B";
    else if (name === "Motorcycle") return "#22A6B3";
    else if (name === "Bicycle") return "#F9CA24";
    else return "#9B59B6";
  }

  const RenderCategories = ({ category }) => {
    const { name, image } = category.item;
    const backgroundColor = getCategoryBackgroundColor(name);
    return <CardCategory name={name} image={image} backgroundColor={backgroundColor} />;
  };
  const RenderCardVehicle = ({ vehicle }) => {
    const { name, image, price, rating, id } = vehicle.item;
    return <CardVehicle name={name} image={image} price={price} rating={rating} id={id} navigation={navigation} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.mastheadContainer}>
        <View style={styles.searchContainer}>
          <Ionicons name="ios-search-sharp" color="#17799A" size={25} />
          <TextInput placeholder="Search" />
        </View>
        <Pressable style={styles.filterContainer}>
          <Entypo name="chat" size={25} color="white" />
        </Pressable>
        <Pressable style={styles.notifContainer}>
          <Icon name="bell-badge" size={25} color="white" />
        </Pressable>
      </View>
      <SafeAreaView>
        <ImageBackground source={bg} style={{ width: "100%" }}>
          <ScrollView style={styles.scrollViewContainer}>
            <View style={styles.itemContainer}>
              <View style={styles.top}></View>

              {/* category */}
              <View style={[styles.categoryContainer, styles.shadowProp]}>
                <Text style={styles.categoryTitle}>Categories</Text>
                <FlatList style={{ marginTop: 10 }} data={categories} renderItem={(category) => <RenderCategories category={category} />} keyExtractor={(category) => category.id} horizontal={true} />
              </View>
              {/* end category */}
              {/* Trending */}
              <View style={styles.itemsContainer}>
                <Text style={styles.itemTitle}>Trending</Text>
                <FlatList style={{ marginTop: 10 }} data={trending} renderItem={(vehicle) => <RenderCardVehicle vehicle={vehicle} />} keyExtractor={(vehicle) => vehicle.id} horizontal={true} showsHorizontalScrollIndicator={false} />
              </View>
              {/* end Trending */}
              {/* Near You */}
              {/* <View style={styles.itemsContainer}>
                <Text style={styles.itemTitle}>Near You</Text>
                <FlatList style={{ marginTop: 10 }} data={trending} renderItem={(vehicle) => <RenderCardVehicle vehicle={vehicle} />} keyExtractor={(vehicle) => vehicle.id} horizontal={true} showsHorizontalScrollIndicator={false} />
              </View> */}
              {/* end Near You */}
              {/* Trending */}
              <View style={styles.itemsContainer}>
                <Text style={styles.itemTitle}>History</Text>
                {order.length ? (
                  <FlatList style={{ marginTop: 10 }} data={order} renderItem={(vehicle) => <RenderTrending vehicle={vehicle} />} keyExtractor={(vehicle) => vehicle.id} horizontal={true} showsHorizontalScrollIndicator={false} />
                ) : (
                  <View style={{ paddingVertical: 40, alignItems: "center", justifyContent: "center", backgroundColor: "#f6f4f1", marginTop: 10, borderRadius: 10 }}>
                    <FontAwesome name="history" size={24} color="black" />
                    <Text style={{ fontWeight: 500, fontSize: 18 }}>Your History is empty</Text>
                    <Text style={{ fontWeight: 500, fontSize: 14, marginTop: 10 }}>Looks like you've never done a rental before</Text>
                    <Pressable style={{ backgroundColor: "#17799A", padding: 10, paddingHorizontal: 20, borderRadius: 10, marginTop: 10 }}>
                      <Text style={{ color: "white" }}>Rent Now</Text>
                    </Pressable>
                  </View>
                )}
              </View>
              {/* end Trending */}
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
  categoryContainer: {
    backgroundColor: "white",
    alignItems: "center",
    shadowColor: "black",
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    zIndex: 2,
  },
  itemContainer: {
    paddingTop: 10,
    gap: 10,
    zIndex: 0,
    backgroundColor: "whitesmoke",
  },

  itemsContainer: {
    padding: 20,
    backgroundColor: "white",
  },
  itemTitle: {
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  top: {
    backgroundColor: "#17799A",
    width: "100%",
    height: 70,
    position: "absolute",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    zIndex: 1,
  },
  mastheadContainer: {
    flexDirection: "row",
    gap: 5,
    paddingHorizontal: 20,
    paddingTop: 70,
    paddingBottom: 10,
    backgroundColor: "#17799A",
  },
  searchContainer: {
    flex: 6,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginEnd: 5,
  },
  filterContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  notifContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollViewContainer: {
    position: "relative",
  },

  categoryTitle: {
    fontSize: 20,
    fontWeight: 500,
    alignSelf: "flex-start",
  },
});

export default Home;
