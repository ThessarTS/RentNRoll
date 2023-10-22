import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import carIcon from "../../assets/vector/car.png";
import motorcycleIcon from "../../assets/vector/motorcycle.png";
import bicycleIcon from "../../assets/vector/bicycle.png";
import scooterIcon from "../../assets/vector/scooter.png";
import CardCategory from "../components/CardCategory";
import CardVehicle from "../components/CardVehicle";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrendingVehicle } from "../store/action/actionCreator/actionVehicle";
import { fetchCategories } from "../store/action/actionCreator/actionCategory";
function Home({ navigation }) {
  let baseUrl =
    "https://003e-2001-448a-6021-5c1-1ce5-bdb-d488-5ae0.ngrok-free.app";
  // const [trend, setTrend] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [categories, setCategories] = useState([]);
  const trend = useSelector((state) => state.vehicleReducer.trending);
  const categories = useSelector((state) => state.categoryReducer.categories);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    dispatch(fetchCategories());
    dispatch(fetchTrendingVehicle()).then(() => {
      setLoading(false);
    });
  }, []);
  // console.log(trend, "<<<<");
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 16, fontSize: 18 }}>Loading...</Text>
      </View>
    );
  }
  const order = [];

  function getCategoryBackgroundColor(name) {
    if (name === "car") return "#30336B";
    else if (name === "motorcycle") return "#22A6B3";
    else if (name === "bicycle") return "#F9CA24";
    else return "#9B59B6";
  }
  function getCategoryImage(name) {
    if (name === "car") return carIcon;
    else if (name === "motorcycle") return motorcycleIcon;
    else if (name === "bicycle") return bicycleIcon;
    else return scooterIcon;
  }

  const RenderCategories = ({ category }) => {
    const { name } = category.item;
    const backgroundColor = getCategoryBackgroundColor(name);
    const image = getCategoryImage(name);

    return (
      <CardCategory
        name={name}
        image={image}
        backgroundColor={backgroundColor}
      />
    );
  };
  const RenderTrending = ({ vehicle }) => {
    const { name, image, price, rating } = vehicle.item;
    return (
      <CardVehicle
        name={name}
        image={image}
        price={price}
        rating={rating}
        navigation={navigation}
      />
    );
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
      <SafeAreaView>
        <ScrollView style={styles.scrollViewContainer}>
          <View style={styles.itemContainer}>
            <View style={styles.top}></View>

            {/* category */}
            <View style={[styles.categoryContainer, styles.shadowProp]}>
              <Text style={styles.categoryTitle}>Categories</Text>
              <FlatList
                style={{ marginTop: 10 }}
                data={categories}
                renderItem={(category) => (
                  <RenderCategories category={category} />
                )}
                keyExtractor={(category) => category.id}
                horizontal={true}
              />
            </View>
            {/* end category */}
            {/* Trending */}
            <View style={styles.itemsContainer}>
              <Text style={styles.itemTitle}>Trending</Text>
              <FlatList
                style={{ marginTop: 10 }}
                data={trend}
                // renderItem={(vehicle) => <CardVehicle vehicle={vehicle} />}
                renderItem={({ item }) => {
                  return <CardVehicle vehicle={item} navigation={navigation} />;
                }}
                keyExtractor={(item) => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View>
            {/* end Trending */}
            {/* Trending */}
            <View style={styles.itemsContainer}>
              <Text style={styles.itemTitle}>History</Text>
              {order.length ? (
                <FlatList
                  style={{ marginTop: 10 }}
                  data={order}
                  renderItem={(vehicle) => <RenderTrending vehicle={vehicle} />}
                  keyExtractor={(vehicle) => vehicle.id}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />
              ) : (
                <View
                  style={{
                    paddingVertical: 40,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f6f4f1",
                    marginTop: 10,
                    borderRadius: 10,
                  }}
                >
                  <FontAwesome name="history" size={24} color="black" />
                  <Text style={{ fontWeight: 500, fontSize: 18 }}>
                    Your History is empty
                  </Text>
                  <Text
                    style={{ fontWeight: 500, fontSize: 14, marginTop: 10 }}
                  >
                    Looks like you've never done a rental before
                  </Text>
                  <Pressable
                    style={{
                      backgroundColor: "#17799A",
                      padding: 10,
                      paddingHorizontal: 20,
                      borderRadius: 10,
                      marginTop: 10,
                    }}
                  >
                    <Text style={{ color: "white" }}>Rent Now</Text>
                  </Pressable>
                </View>
              )}
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
    backgroundColor: "#17799A",
  },

  categoryTitle: {
    fontSize: 20,
    fontWeight: 500,
    alignSelf: "flex-start",
  },
});

export default Home;
