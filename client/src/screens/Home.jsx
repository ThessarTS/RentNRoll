import React, { useCallback, useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, Pressable, TextInput, FlatList, ScrollView, ImageBackground, ActivityIndicator, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import carIcon from "../../assets/vector/car.png";
import motorcycleIcon from "../../assets/vector/motorcycle.png";
import bicycleIcon from "../../assets/vector/bicycle.png";
import scooterIcon from "../../assets/vector/scooter.png";
import CardCategory from "../components/CardCategory";
import CardVehicle from "../components/CardVehicle";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo, MaterialIcons, AntDesign } from "@expo/vector-icons";
import bg from "../../assets/image/bg-home.png";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-native-modal";
import { fetchVehicles, fetchTrending, fetchCategory, getUser } from "../../store/actions";
import CardOrderHome from "../components/CardOrderHome";
import notFound from "../../assets/image/zzz.png";
import { fPrice } from "../helpers/fPrice";
import { useFocusEffect } from "@react-navigation/native";
import { errorAlert } from "../helpers/alert";
import AsyncStorage from "@react-native-async-storage/async-storage";
function Home({ navigation }) {
  const { vehicles, trending, loading } = useSelector((state) => state.vehicleReducer);
  const { profile } = useSelector((state) => state.userReducer);
  const { categories } = useSelector((state) => state.categoryReducer);
  const dispatch = useDispatch();
  const [search, setSearch] = useState(false);
  const [togleCategory, setTogleCategory] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState(vehicles);
  const [filteredCategory, setFilteredCategory] = useState(vehicles);

  const filterDataByName = (text) => {
    const newData = vehicles.filter((item) => {
      const itemName = item.name.toLowerCase();
      const searchText = text.toLowerCase();
      return itemName.indexOf(searchText) > -1;
    });
    setFilteredData(newData);
  };

  const filterDataByCategory = (name) => {
    const dataByCategory = vehicles.filter((item) => {
      return item.Category.name === name;
    });
    setFilteredCategory(dataByCategory);
    setTogleCategory(true);
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

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchVehicles());
      dispatch(fetchCategory());
      dispatch(fetchTrending());
      dispatch(getUser());
    }, [])
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 16, fontSize: 18 }}>Loading...</Text>
      </View>
    );
  }
  const goConversationList = async () => {
    try {
      const access_token = await AsyncStorage.getItem("access_token");
      if (!access_token) throw { message: "Login First" };
      navigation.push("ConversationList", {
        fullName: profile?.fullName,
        profilePicture: profile?.UserProfile.profilePicture,
        id: profile?.id,
        email: profile?.email,
      });
    } catch (error) {
      errorAlert(error.message);
      navigation.navigate("loginRegister");
    }
  };

  const RenderModalItems = ({ vehicle }) => {
    const { image, name, price, averageRating, totalReviews, location, id } = vehicle.item;
    const goDetail = () => {
      navigation.navigate("detail", {
        name: name,
        id: id,
      });
      setSearch(false);
      setTogleCategory(false);
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
            <Image source={{ uri: `${image}` }} style={{ width: 90, height: 65 }} resizeMode="contain" />
          </View>
          <View style={{ flex: 6, marginStart: 10, gap: 3 }}>
            <View style={[styles.headerItemContainer]}>
              <Ionicons name="location" size={15} color="#17799A" />
              <Text style={styles.itemsDetailInfo}>{location}</Text>
            </View>
            <View style={[styles.headerItemContainer, { marginStart: 2 }]}>
              <AntDesign name="star" size={13} color="#F8B84E" />
              <Text style={[styles.itemsDetailInfo, { marginStart: 2 }]}>
                {averageRating} ({totalReviews} Reviews)
              </Text>
            </View>
            <View style={[styles.headerItemContainer, { marginStart: 2 }]}>
              <Entypo name="price-tag" size={15} color="#17799A" />
              <Text style={[styles.itemsDetailInfo, { marginStart: 2 }]}>{fPrice(price)}/Day</Text>
            </View>
          </View>
          <View>
            <Ionicons name="chevron-forward" size={24} color="#17799A" />
          </View>
        </View>
      </Pressable>
    );
  };

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
      <Pressable
        onPress={() => {
          filterDataByCategory(name);
        }}
      >
        <CardCategory name={name} image={image} backgroundColor={backgroundColor} />
      </Pressable>
    );
  };
  const RenderCardVehicle = ({ vehicle }) => {
    const { name, image, price, averageRating, id, totalReviews } = vehicle.item;
    return <CardVehicle name={name} image={image} price={price} rating={averageRating} id={id} totalReviews={totalReviews} navigation={navigation} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.mastheadContainer}>
        <View style={styles.searchContainer}>
          <Ionicons name="ios-search-sharp" color="#17799A" size={25} />
          <TextInput placeholder="Search" value={searchValue} style={{ flex: 1 }} onChangeText={(text) => setSearchValue(text)} onSubmitEditing={() => handleInputSubmit(searchValue)} />
        </View>
        <Pressable style={styles.filterContainer} onPress={goConversationList}>
          <Entypo name="chat" size={25} color="white" />
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

              {/* history */}
              <View style={styles.itemsContainer}>
                <Text style={styles.itemTitle}>History</Text>
                {profile ? (
                  profile.Orders.length ? (
                    <FlatList
                      style={{ marginTop: 10 }}
                      data={profile.Orders}
                      renderItem={({ item }) => {
                        return <CardOrderHome orders={item} navigation={navigation} />;
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
                      <Text style={{ fontWeight: 500, fontSize: 18, marginTop: 5 }}>Your History is empty</Text>
                      <Text style={{ fontWeight: 500, fontSize: 14, marginTop: 10 }}>Looks like you've never done a rental before</Text>
                      <Pressable
                        onPress={() => navigation.navigate("Rent Now")}
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
                    <Text style={{ fontWeight: 500, fontSize: 18, marginTop: 5 }}>Your History is empty</Text>
                    <Text style={{ fontWeight: 500, fontSize: 14, marginTop: 10 }}>It seems like you haven't logged in yet.</Text>
                    <Pressable
                      onPress={() => navigation.navigate("You")}
                      style={{
                        backgroundColor: "#17799A",
                        padding: 10,
                        paddingHorizontal: 20,
                        borderRadius: 10,
                        marginTop: 10,
                      }}
                    >
                      <Text style={{ color: "white" }}>Login Now</Text>
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
                    backgroundColor: filteredData.length !== 0 ? "whitesmoke" : "white",
                    height: filteredData.length !== 0 || filteredCategory.length !== 0 ? "75%" : "45%",
                    padding: 20,
                    paddingVertical: 50,
                    gap: 5,
                    borderTopEndRadius: 16,
                    borderTopStartRadius: 16,
                  }}
                >
                  {filteredData.length !== 0 ? (
                    <FlatList style={{ marginTop: 10 }} data={filteredData} renderItem={(vehicle) => <RenderModalItems vehicle={vehicle} />} keyExtractor={(vehicle) => vehicle.id} showsHorizontalScrollIndicator={false} />
                  ) : (
                    <View style={{ flex: 1, justifyContent: "center" }}>
                      <Image source={notFound} style={{ flex: 1, width: null, height: null }} resizeMode="contain" />
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

                  <Pressable style={{ position: "absolute", top: 10, right: 20 }} onPress={() => toggleSearch(false)}>
                    <MaterialIcons name="cancel" size={30} color="red" />
                  </Pressable>
                </View>
              </Modal>
              {/* START Modal Ctegory filter */}
              <Modal
                isVisible={togleCategory}
                onBackdropPress={() => {
                  setTogleCategory(false);
                  setSearch(false);
                }}
                style={{
                  justifyContent: "flex-end",
                  margin: 0,
                }}
              >
                <View
                  style={{
                    backgroundColor: filteredCategory.length !== 0 ? "whitesmoke" : "white",
                    height: filteredCategory.length !== 0 ? "75%" : "45%",
                    padding: 20,
                    paddingVertical: 50,
                    gap: 5,
                    borderTopEndRadius: 16,
                    borderTopStartRadius: 16,
                  }}
                >
                  {filteredCategory.length !== 0 ? (
                    <FlatList style={{ marginTop: 10 }} data={filteredCategory} renderItem={(vehicle) => <RenderModalItems vehicle={vehicle} />} keyExtractor={(vehicle) => vehicle.id} showsHorizontalScrollIndicator={false} />
                  ) : (
                    <View style={{ flex: 1, justifyContent: "center" }}>
                      <Image source={notFound} style={{ flex: 1, width: null, height: null }} resizeMode="cover" />
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

                  <Pressable style={{ position: "absolute", top: 10, right: 20 }} onPress={() => setTogleCategory(false)}>
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
    minHeight: "100%",
  },

  categoryTitle: {
    fontSize: 20,
    fontWeight: 500,
    alignSelf: "flex-start",
  },
  modalContainer: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
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
