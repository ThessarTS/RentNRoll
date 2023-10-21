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
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";

function Detail({ route }) {
  const { name, id } = route.params;
  console.log(id);
  let baseUrl =
    "https://fd73-2001-448a-6021-5c1-9745-d939-1779-42e6.ngrok-free.app";
  const [startDate, setSelectedStartDate] = useState(new Date());
  const [endDate, setSelectedEndDate] = useState(new Date());
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchDetail = async () => {
    try {
      const { data } = await axios({
        url: baseUrl + "/vehicles/" + id,
        method: "GET",
      });
      setDetail(data);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(detail.vehicle);
  useEffect(() => {
    setLoading(true);
    fetchDetail().then(() => {
      setLoading(false);
    });
  }, []);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 16, fontSize: 18 }}>Loading...</Text>
      </View>
    );
  }
  const handleStartDateChange = (event, date) => {
    if (date !== undefined) {
      const today = new Date();
      if (date >= today) {
        setSelectedStartDate(date);
        setSelectedEndDate(date); // Perbarui End Date jika lebih kecil dari Start Date baru
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

  const spec = [
    {
      id: 1,
      type: "Engine Type",
      value: "Bensin",
    },
    {
      id: 2,
      type: "Transition",
      value: "Automatic",
    },
    {
      id: 3,
      type: "Capacity",
      value: 7,
    },
  ];

  const RenderSpec = ({ spec }) => {
    const { type, value } = spec.item;
    return <CardSpecification type={type} value={value} />;
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View style={styles.container}>
          {/* header */}
          <View style={styles.headerContainer}>
            <Image
              source={{
                uri: detail.vehicle
                  ? detail.vehicle.image
                  : "https://cdn3.tstatic.net/jualbeli/img/2022/3/2434453/1-765898205-Mobil-Toyota-Calya-G-MT-2020-Seken-Surat-Lengkap-Harga-Nego---Surabaya.jpg",
              }}
              style={styles.imageCover}
            />
            <View style={{ paddingHorizontal: 20, gap: 5 }}>
              <Text style={styles.headerTitle}>
                {" "}
                {detail.vehicle ? detail.vehicle.name : ""}
              </Text>
              <View style={{ alignItems: "center", flexDirection: "row" }}>
                <Ionicons name="location" size={18} color="#17799A" />
                <Text style={styles.location}>Location : Jakarta</Text>
              </View>
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  marginStart: 2,
                }}
              >
                <AntDesign name="star" size={15} color="#F8B84E" />
                <Text style={styles.rating}>
                  Rating: {detail.rating ? detail.rating : 0} (
                  {detail.vehicle ? detail.vehicle.Reviews.length : 0} Reviews)
                </Text>
              </View>
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  marginStart: 3,
                }}
              >
                <MaterialIcons name="category" size={15} color="#9B59B6" />
                <Text style={styles.headerCategories}>
                  Category: {detail.vehicle ? detail.vehicle.Category.name : ""}
                </Text>
              </View>
            </View>
          </View>
          {/* end header */}

          {/* spec */}
          {detail.vehicle ? (
            <View style={styles.itemContainer}>
              <Text style={{ fontSize: 17, fontWeight: 500 }}>
                {" "}
                Specification
              </Text>
              <FlatList
                data={detail.vehicle.Specifications}
                renderItem={({ item }) => {
                  return <CardSpecification spec={item} />;
                }}
                keyExtractor={(item) => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          ) : (
            <View style={styles.itemContainer}>
              <Text style={{ fontSize: 17, fontWeight: 500 }}>
                {" "}
                Specification
              </Text>
            </View>
          )}
          {/* end spec */}

          {/* owner */}
          <View style={styles.itemContainer}>
            <Text style={{ fontSize: 17, fontWeight: 500 }}> Owner</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={{
                    uri: "https://media.licdn.com/dms/image/C4E03AQGnouyn_2vSgw/profile-displayphoto-shrink_800_800/0/1646808937817?e=1703116800&v=beta&t=BZT5fOu-gScDu4h9GkegSv74GG0pSt47-0QAZOQHOeE",
                  }}
                  style={{ width: 60, height: 60, borderRadius: 50 }}
                />
                <Text style={{ fontSize: 18, fontWeight: 400 }}>
                  {detail.vehicle ? detail.vehicle.User.fullName : ""}
                </Text>
              </View>
              <View style={{ padding: 10, flexDirection: "row", gap: 15 }}>
                <Feather name="phone-call" size={24} color="#17799A" />
                <Ionicons
                  name="ios-chatbox-ellipses-outline"
                  size={25}
                  color="#17799A"
                />
              </View>
            </View>
          </View>
          {/* end owner */}
          {/*  */}
          <View style={styles.itemContainer}>
            <Text style={{ fontSize: 17, fontWeight: 500 }}> Rent Now</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                paddingBottom: 5,
              }}
            >
              <View style={{ alignItems: "flex-start", gap: 10, padding: 5 }}>
                <Text>Pick-up Date</Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
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
              <View
                style={{
                  alignItems: "flex-end",
                  gap: 10,
                  padding: 5,
                  borderBottomColor: "gray",
                }}
              >
                <Text>Drop-off Date</Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 7,
                  }}
                >
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
            <Pressable
              style={{
                backgroundColor: "#17799A",
                padding: 15,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
            >
              <Text style={{ fontSize: 18, color: "white", fontWeight: 600 }}>
                Rent
              </Text>
            </Pressable>
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
    objectFit: "contain",
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
  rating: {
    marginStart: 2,
    fontSize: 11,
    fontWeight: "600",
  },
  location: {
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
});

export default Detail;
