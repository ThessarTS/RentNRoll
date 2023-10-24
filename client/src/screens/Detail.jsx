import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Image,
  View,
  ScrollView,
  StyleSheet,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import CardSpecification from "../components/CardSpecification";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetail } from "../../store/actions";

function Detail({ route }) {
  const { name, id } = route.params;
  const detail = useSelector((state) => state.vehicleReducer.vehicle);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoadingDetail(true);
    dispatch(fetchDetail(id)).then(() => {
      setLoadingDetail(false).catch((error) => {
        console.log(error);
      });
    });
  }, []);

  const fPrice = (price) => {
    return price.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  };

  const [startDate, setSelectedStartDate] = useState(new Date());
  const [endDate, setSelectedEndDate] = useState(new Date());

  const handleStartDateChange = (event, date) => {
    if (date !== undefined) {
      const today = new Date();
      if (date >= today) {
        setSelectedStartDate(date);
        setSelectedEndDate(date);
      }
    }
  };

  const handleEndDateChange = (event, date) => {
    if (date !== undefined) {
      if (date >= setSelectedStartDate) {
        setSelectedEndDate(date);
      }
    }
  };
  if (loadingDetail) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 16, fontSize: 18 }}>Loading...</Text>
      </View>
    );
  }
  const spec = detail ? detail.vehicle.Specifications : [];

  const RenderSpec = ({ spec }) => {
    const { name, value } = spec.item;
    return <CardSpecification name={name} value={value} />;
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* header */}
          <View style={styles.headerContainer}>
            {detail && (
              <Image
                source={{ uri: detail.vehicle.image }}
                style={styles.imageCover}
                resizeMode="cover"
              />
            )}
            <View style={styles.headerItems}>
              <Text style={styles.headerTitle}> {name}</Text>
              <View style={[styles.headerItemContainer]}>
                <Ionicons name="location" size={18} color="#17799A" />
                <Text style={styles.location}>Location : Jakarta</Text>
              </View>
              <View style={[styles.headerItemContainer, { marginStart: 2 }]}>
                <AntDesign name="star" size={15} color="#F8B84E" />
                <Text style={styles.rating}>
                  Rating: {detail ? detail.rating : ""} (
                  {detail ? detail.vehicle.Reviews.length : 0} Reviews)
                </Text>
              </View>
              <View style={[styles.headerItemContainer, { marginStart: 3 }]}>
                <MaterialIcons name="category" size={15} color="#9B59B6" />
                <Text style={styles.headerCategories}>
                  Category: {detail ? detail.vehicle.Category.name : ""}
                </Text>
              </View>
            </View>
          </View>
          {/* end header */}

          {/* spec */}
          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}> Specification</Text>
            <FlatList
              data={spec}
              renderItem={(spec) => <RenderSpec spec={spec} />}
              keyExtractor={(spec) => spec.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          {/* end spec */}

          {/* owner */}
          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}> Owner</Text>
            <View style={styles.ownerContainer}>
              <View style={styles.ownerItem}>
                {/* di edit untuk munculkan foto profile */}
                {detail?.vehicle.User.UserProfile.profilePicture && (
                  <Image
                    source={{
                      uri: detail.vehicle.User.UserProfile.profilePicture,
                    }}
                    style={styles.ownerImage}
                  />
                )}
                {/* di edit untuk munculkan foto profile */}
                <Text style={styles.itemTitle}>
                  {detail ? detail.vehicle.User.fullName : ""}
                </Text>
              </View>
              <View style={styles.ownerAction}>
                <Feather name="phone-call" size={24} color="#17799A" />
                <Ionicons
                  name="ios-chatbox-ellipses-outline"
                  size={25}
                  color="#17799A"
                />
              </View>
            </View>
          </View>
          {/* end spec */}

          {/* Rent Action */}
          <View style={styles.itemContainer}>
            <View style={styles.rentHeaderContainer}>
              <Text style={styles.itemTitle}> Rent Now</Text>
              <View style={[styles.headerItemContainer]}>
                <Entypo name="price-tag" size={24} color="#17799A" />
                <Text style={styles.location}>
                  {fPrice(detail ? detail.vehicle.price : "")}/day
                </Text>
              </View>
            </View>
            <View style={styles.rentContainer}>
              <View style={styles.rentStartContainer}>
                <Text>Pick-up Date</Text>
                <View style={styles.rentStartDate}>
                  <AntDesign name="calendar" size={24} color="black" />
                  <DateTimePicker
                    value={startDate}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    minimumDate={new Date()}
                    onChange={handleStartDateChange}
                  />
                </View>
              </View>
              <View style={styles.rentEndContainer}>
                <Text>Drop-off Date</Text>
                <View style={styles.rendEndDate}>
                  <DateTimePicker
                    value={endDate}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    minimumDate={startDate}
                    onChange={handleEndDateChange}
                  />
                  <AntDesign name="calendar" size={24} color="black" />
                </View>
              </View>
            </View>
            <Pressable style={styles.rentButton}>
              <Text style={styles.rentAction}>Rent</Text>
            </Pressable>
            {/* end rent Action */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "whitesmoke",
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
    gap: 10,
    backgroundColor: "white",
  },

  itemTitle: {
    fontSize: 17,
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
  rentHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default Detail;
