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
  ImageBackground,
  ActivityIndicator,
  Image,
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
import { Entypo } from "@expo/vector-icons";
import bg from "../../assets/image/bg-home.png";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-native-modal";
import { MaterialIcons } from "@expo/vector-icons";
import { fetchCategory } from "../../store/actions/categoryAction";
import {
  fetchVehicles,
  fetchTrending,
} from "../../store/actions/vehicleAction";
import { AntDesign } from "@expo/vector-icons";
import notFound from "../../assets/image/not-found.jpg";
import CardOrderHome from "../components/CardOrderHome";
// import CardOrderHome from "../components/CardOrderHome";

import notFound from "../../assets/image/zzz.png";

function Home({ navigation }) {
  const { vehicles, trending, loading } = useSelector(
    (state) => state.vehicleReducer
  );
  const { profile } = useSelector((state) => state.userReducer);
  const categories = useSelector((state) => state.categoryReducer.categories);
  const dispatch = useDispatch();
  const [loadingCategory, setLoadingCategory] = useState(false);

  const [search, setSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState(vehicles);

  const filterDataByName = (text) => {
    const newData = vehicles.filter((item) => {
      const itemName = item.name.toLowerCase();
      const searchText = text.toLowerCase();
      return itemName.indexOf(searchText) > -1;
    });
    setFilteredData(newData);
  };

  const toggleSearch = (value) => {
    setSearch(value);
  };

  const handleInputSubmit = (text) => {
    setSearchValue(text);

    if (text.trim() !== "") {
      filterDataByName(text);
      toggleSearch(true);
    } else {
      setFilteredData(vehicles);
      toggleSearch(false);
    }
  };

  const fPrice = (price) => {
    return price.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  };

  useEffect(() => {
    dispatch(fetchVehicles());
    dispatch(fetchCategory());
    dispatch(fetchTrending());
  }, []);
  // console.log(vehicles.item, "<<<<");

  console.log(profile);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 16, fontSize: 18 }}>Loading...</Text>
      </View>
    );
  }

  const RenderModalItems = ({ vehicle }) => {
    const { image, name, price, averageRating, totalReviews } = vehicle.item;
    const goDetail = () => {
      navigation.navigate("detail", {
        name: name,
        id: id,
      });
      setSearch(false);
    };

    return (
      <Pressable style={styles.modalContainer} onPress={goDetail}>
        <Text style={styles.itemsDetailTitle}>{name}</Text>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <View>
            <Image
              source={{ uri: `${image}` }}
              style={{ width: 90, height: 65 }}
              resizeMode="contain"
            />
          </View>
          <View style={{ flex: 6, marginStart: 10, gap: 3 }}>
            <View style={[styles.headerItemContainer]}>
              <Ionicons name="location" size={15} color="#17799A" />
              <Text style={styles.itemsDetailInfo}>Jakarta</Text>
            </View>
            <View style={[styles.headerItemContainer, { marginStart: 2 }]}>
              <AntDesign name="star" size={13} color="#F8B84E" />
              <Text style={[styles.itemsDetailInfo, { marginStart: 2 }]}>
                {averageRating} ({totalReviews} Reviews)
              </Text>
            </View>
            <View style={[styles.headerItemContainer, { marginStart: 2 }]}>
              <Entypo name="price-tag" size={15} color="#17799A" />
              <Text style={[styles.itemsDetailInfo, { marginStart: 2 }]}>
                {fPrice(price)} /Day
              </Text>
            </View>
          </View>
          <View>
            <Ionicons name="chevron-forward" size={24} color="#17799A" />
          </View>
        </View>
      </Pressable>
    );
  };

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
  const RenderCardVehicle = ({ vehicle }) => {
    const { name, image, price, rating, id } = vehicle.item;
    return (
      <CardVehicle
        name={name}
        image={image}
        price={price}
        rating={rating}
        id={id}
        navigation={navigation}
      />
    );
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.mastheadContainer}>
        <View style={styles.searchContainer}>
          <Ionicons name="ios-search-sharp" color="#17799A" size={25} />
          <TextInput
            placeholder="Search"
            value={searchValue}
            style={{ flex: 1 }}
            onChangeText={(text) => setSearchValue(text)}
            onSubmitEditing={() => handleInputSubmit(searchValue)}
          />
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
                  data={trending}
                  renderItem={(vehicle) => (
                    <RenderCardVehicle vehicle={vehicle} />
                  )}
                  keyExtractor={(vehicle) => vehicle.id}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
              {/* end Trending */}

              {/* history */}
              <View style={styles.itemsContainer}>
                <Text style={styles.itemTitle}>History</Text>
                {profile ? (
                  profile.Orders.length ? (
                    <FlatList
                      style={{ marginTop: 10 }}
                      data={profile.Orders}
                      renderItem={({ item }) => {
                        return (
                          <CardOrderHome
                            orders={item}
                            navigation={navigation}
                          />
                        );
                      }}
                      keyExtractor={(item) => item.id}
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
                  )
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
              {/* end history */}
              <Modal
                isVisible={search}
                onBackdropPress={toggleSearch}
                style={{
                  justifyContent: "flex-end",
                  margin: 0,
                }}
              >
                <View
                  style={{
                    backgroundColor:
                      filteredData.length !== 0 ? "whitesmoke" : "white",
                    height: filteredData.length !== 0 ? "75%" : "45%",
                    padding: 20,
                    paddingVertical: 50,
                    gap: 5,
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                  }}
                >
                  {filteredData.length !== 0 ? (
                    <FlatList
                      style={{ marginTop: 10 }}
                      data={filteredData}
                      renderItem={(vehicle) => (
                        <RenderModalItems vehicle={vehicle} />
                      )}
                      keyExtractor={(vehicle) => vehicle.id}
                      showsHorizontalScrollIndicator={false}
                    />
                  ) : (
                    <View style={{ flex: 1, justifyContent: "center" }}>
                      <Image
                        source={notFound}
                        style={{ flex: 1, width: null, height: null }}
                        resizeMode="cover"
                      />
                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            textAlign: "center",
                            fontSize: 20,
                            fontWeight: 500,
                          }}
                        >
                          Vehicle not Found
                        </Text>
                      </View>
                    </View>
                  )}

                  <Pressable
                    style={{ position: "absolute", top: 10, right: 20 }}
                    onPress={() => toggleSearch(false)}
                  >
                    <MaterialIcons name="cancel" size={30} color="red" />
                  </Pressable>
                </View>
              </Modal>
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
  modalContainer: {
    backgroundColor: "white",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    padding: 10,
  },
  itemsDetailTitle: {
    fontSize: 14,
    fontWeight: "500",
  },
  itemsDetailInfo: {
    fontSize: 11,
    color: "green",
  },
  headerItemContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
});

export default Home;