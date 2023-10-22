import React, { useEffect, useState } from "react";
import { StyleSheet, Text, SafeAreaView, ImageBackground, ScrollView, View, Image, Pressable } from "react-native";
import bg from "../../assets/image/bg-home.png";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import { AntDesign } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import Modal from "react-native-modal";

function Account({ navigation }) {
  const [startDate, setSelectedStartDate] = useState(new Date());
  const [endDate, setSelectedEndDate] = useState(new Date());
  const [settings, setSettings] = useState(false);
  const countries = ["Jakarta", "Bandung", "Medan", "Batam", "Bali", "Aceh", "Bogor"];

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
  const toggleSettings = () => {
    setSettings(!settings);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mastheadContainer}>
        <View style={{ marginEnd: 10, paddingBottom: 10, alignSelf: "flex-end" }}>
          <View style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}>
            <Pressable style={styles.iconContainer}>
              <Entypo name="chat" size={25} color="white" />
            </Pressable>
            <Pressable style={styles.iconContainer}>
              <Icon name="bell-badge" size={25} color="white" />
            </Pressable>
            <Pressable style={styles.iconContainer} onPress={toggleSettings}>
              <Ionicons name="settings" size={25} color="white" />
            </Pressable>
          </View>
        </View>
      </View>
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground source={bg} style={{ flex: 1 }}>
          <ScrollView style={styles.scrollViewContainer}>
            <View style={styles.itemContainer}>
              <View style={styles.top}></View>

              <View style={{ backgroundColor: "white", marginHorizontal: 10, padding: 20, borderRadius: 8, gap: 20, shadowColor: "#171717", shadowOffset: { width: -2, height: 4 }, shadowOpacity: 0.2, shadowRadius: 3 }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
                  <View style={{ backgroundColor: "#17799A", width: 35, height: 35, alignItems: "center", justifyContent: "center", borderRadius: "50%" }}>
                    <MaterialIcons name="car-rental" size={25} color="white" />
                  </View>
                  <View>
                    <Text>A convenient way to travel in and out town</Text>
                  </View>
                </View>

                <View style={{ gap: 10 }}>
                  <SelectDropdown
                    dropdownStyle={{ borderRadius: 8 }}
                    buttonStyle={{
                      backgroundColor: "white",
                      borderWidth: 1,
                      borderColor: "gray",
                      borderRadius: 8,
                      padding: 0,
                    }}
                    buttonTextStyle={{
                      fontSize: 15,
                    }}
                    defaultButtonText="Select Location"
                    data={countries}
                    onSelect={(selectedItem, index) => {
                      console.log(selectedItem, index);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item;
                    }}
                  />

                  <View style={styles.rentContainer}>
                    <View style={styles.rentStartContainer}>
                      <Text>Pick-up Date</Text>
                      <View style={styles.rentStartDate}>
                        <AntDesign name="calendar" size={24} color="black" />
                        <DateTimePicker value={startDate} mode="date" is24Hour={true} display="default" minimumDate={new Date()} onChange={handleStartDateChange} />
                      </View>
                    </View>
                    <View style={styles.rentEndContainer}>
                      <Text>Drop-off Date</Text>
                      <View style={styles.rendEndDate}>
                        <DateTimePicker value={endDate} mode="date" is24Hour={true} display="default" minimumDate={startDate} onChange={handleEndDateChange} />
                        <AntDesign name="calendar" size={24} color="black" />
                      </View>
                    </View>
                  </View>
                  <Pressable style={styles.rentButton}>
                    <Text style={styles.rentAction}>Search</Text>
                  </Pressable>
                </View>
              </View>
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
  mastheadContainer: {
    flexDirection: "row",
    gap: 5,
    paddingHorizontal: 20,
    paddingTop: 70,
    paddingBottom: 10,
    backgroundColor: "#17799A",
    justifyContent: "flex-end",
  },
  scrollViewContainer: {
    position: "relative",
    zIndex: 0,
  },
  itemContainer: {
    backgroundColor: "whitesmoke",
    height: "500%",
    paddingBottom: 20,
  },
  top: {
    backgroundColor: "#17799A",
    width: "100%",
    height: 100,
    position: "absolute",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    zIndex: 0,
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
});

export default Account;
