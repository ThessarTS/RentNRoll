import React from "react";
import { SafeAreaView, StyleSheet, View, Text, Image, Pressable, TextInput, FlatList, ScrollView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import carIcon from "../../assets/vector/car.png";
import motorcycleIcon from "../../assets/vector/motorcycle.png";
import bicycleIcon from "../../assets/vector/bicycle.png";
import scooterIcon from "../../assets/vector/scooter.png";
import CardCategory from "../components/CardCategory";
import CardVehicle from "../components/CardVehicle";

function Home() {
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
  const trending = [
    {
      id: 1,
      name: "Avanza Veloz 2018",
      image: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//92/MTA-61000784/toyota_toyota_avanza_1-3_veloz_mt_2018_putih_full01_h832rda0.jpg",
      price: 450000,
      rating: 4.5,
    },
    {
      id: 2,
      name: "Honda Scoopy 2023",
      image: "https://imgcdn.oto.com/large/gallery/color/73/985/honda-scoopy-esp-color-781667.jpg",
      price: 85000,
      rating: 3.6,
    },
    {
      id: 3,
      name: "Suzuki Pick Up 2014",
      image: "https://foto.kontan.co.id/nHuaBJpOFcJG7FYidDfIOomh_tg=/640x360/smart/2019/04/04/1979163550p.jpg",
      price: 200000,
      rating: 4.6,
    },
  ];

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
  const RenderTrending = ({ vehicle }) => {
    const { name, image, price, rating } = vehicle.item;
    return <CardVehicle name={name} image={image} price={price} rating={rating} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.mastheadContainer}>
        <View style={styles.searchContainer}>
          <Ionicons name="ios-search-sharp" color="#17799A" size={25} />
          <TextInput placeholder="Search" />
        </View>
        <Pressable style={styles.filterContainer}>
          <Ionicons name="filter-sharp" size={25} color="white" />
        </Pressable>
        <Pressable style={styles.notifContainer}>
          <Icon name="bell-badge" size={25} color="white" />
        </Pressable>
      </View>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={styles.scrollViewContainer}>
          <View style={styles.top}></View>
          <View style={styles.itemContainer}>
            {/* category */}
            <View style={[styles.categoryContainer, styles.shadowProp]}>
              <Text style={styles.categoryTitle}>Categories</Text>
              <FlatList style={{ marginTop: 10 }} data={categories} renderItem={(category) => <RenderCategories category={category} />} keyExtractor={(category) => category.id} horizontal={true} />
            </View>
            {/* end category */}
            {/* Trending */}
            <View style={styles.trendingContainer}>
              <Text style={styles.trendingTitle}>Trending</Text>
              <FlatList style={{ marginTop: 10 }} data={trending} renderItem={(vehicle) => <RenderTrending vehicle={vehicle} />} keyExtractor={(vehicle) => vehicle.id} horizontal={true} />
            </View>
            {/* end Trending */}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryContainer: {
    backgroundColor: "white",
    alignItems: "center",
    shadowColor: "black",
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 15,
  },
  trendingContainer: {
    marginTop: 40,
  },
  trendingTitle: {
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
    zIndex: 0,
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
    backgroundColor: "whitesmoke",
  },
  itemContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    zIndex: 1,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 500,
    alignSelf: "flex-start",
  },
});

export default Home;
