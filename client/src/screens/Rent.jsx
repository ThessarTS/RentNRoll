import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, SafeAreaView, ScrollView, View, Pressable, ActivityIndicator, Alert } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import { fetchVehicles } from "../../store/actions/vehicleAction";
import CardVehicleRent from "../components/CardVehicleRent";
import { useFocusEffect } from "@react-navigation/native";
import NavIcon from "../components/NavIcon";
import { errorAlert } from "../helpers/alert";

function Account({ navigation }) {
  const dispatch = useDispatch();
  const [startdate, setSelectedstartdate] = useState(new Date());
  const [enddate, setSelectedendate] = useState(new Date(startdate.getTime() + 24 * 60 * 60 * 1000));
  const countries = ["Jakarta", "Bandung", "Medan", "Batam", "Bali", "Aceh", "Bogor"];
  const [searched, setSearched] = useState(false);
  const { vehiclesQuery, loading } = useSelector((state) => state.vehicleReducer);
  const dropdownRef = useRef(null);
  const [errMsg, setErrMsg] = useState("");

  const [handleInput, setHandleInput] = useState({
    location: "",
    startdate: new Date(),
    enddate: new Date(startdate.getTime() + 24 * 60 * 60 * 1000),
  });

  const search = () => {
    if (handleInput.location !== "") {
      dispatch(fetchVehicles(handleInput)).then(() => {
        setSearched(true);
        setErrMsg("");
      });
    } else {
      setErrMsg("Input Location!");
      errorAlert(errMsg);
    }
  };

  const handlestartdateChange = (event, date) => {
    if (date !== undefined) {
      const today = new Date();
      if (date >= today) {
        setSelectedstartdate(date);

        const nextDay = new Date(date.getTime() + 24 * 60 * 60 * 1000);
        setSelectedendate(nextDay);

        setHandleInput((prevState) => ({
          ...prevState,
          startdate: date,
          enddate: nextDay,
        }));
      }
    }
  };

  const handleendateChange = (event, date) => {
    if (date !== undefined) {
      if (date >= startdate) {
        setSelectedendate(date);
        setHandleInput((prevState) => ({
          ...prevState,
          enddate: date,
        }));
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      setSearched(false);
      setHandleInput((prevState) => ({
        ...prevState,
        location: "",
        startdate: new Date(),
        enddate: new Date(startdate.getTime() + 24 * 60 * 60 * 1000),
      }));
      setSelectedstartdate(new Date());
      setSelectedendate(new Date(startdate.getTime() + 24 * 60 * 60 * 1000));

      dropdownRef.current.reset();
    }, [])
  );

  return (
    <View style={styles.container}>
      <NavIcon />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.scrollViewContainer}>
          <View style={styles.itemContainer}>
            <View style={styles.top}></View>

            <View style={{ backgroundColor: "white", marginHorizontal: 10, padding: 20, borderRadius: 8, gap: 20, shadowColor: "#171717", shadowOffset: { width: -2, height: 4 }, shadowOpacity: 0.2, shadowRadius: 3, flex: 1 }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
                <View style={{ backgroundColor: "#17799A", width: 35, height: 35, alignItems: "center", justifyContent: "center", borderRadius: 20 }}>
                  <MaterialIcons name="car-rental" size={25} color="white" />
                </View>
                <View>
                  <Text>A convenient way to travel in and out town</Text>
                </View>
              </View>

              <View style={{ gap: 10 }}>
                <SelectDropdown
                  ref={dropdownRef}
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
                    setHandleInput((prevState) => ({
                      ...prevState,
                      location: selectedItem,
                    }));
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
                    <View style={styles.rentstartdate}>
                      <AntDesign name="calendar" size={24} color="black" />
                      <DateTimePicker value={startdate} mode="date" is24Hour={true} display="default" minimumDate={new Date()} onChange={handlestartdateChange} />
                    </View>
                  </View>
                  <View style={styles.rentEndContainer}>
                    <Text>Drop-off Date</Text>
                    <View style={styles.rendendate}>
                      <DateTimePicker value={enddate} mode="date" is24Hour={true} display="default" minimumDate={startdate} onChange={handleendateChange} />
                      <AntDesign name="calendar" size={24} color="black" />
                    </View>
                  </View>
                </View>

                <Pressable style={styles.rentButton} onPress={search}>
                  <Text style={styles.rentAction}>Search</Text>
                </Pressable>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                {loading && (
                  <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 30 }}>
                    <ActivityIndicator size="large" />
                    <Text style={{ marginTop: 16, fontSize: 18 }}>Loading...</Text>
                  </View>
                )}

                {searched &&
                  vehiclesQuery.map((e) => {
                    return <CardVehicleRent vehicle={e} navigation={navigation} startdate={handleInput.startdate} key={e.id} endDate={enddate} startDate={startdate} />;
                  })}
              </ScrollView>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
  },

  scrollViewContainer: {
    position: "relative",
    zIndex: 0,
  },
  itemContainer: {
    backgroundColor: "white",
    height: "100%",
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
  rentstartdate: {
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
  rendendate: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },
  rentAction: {
    fontSize: 15,
    color: "white",
    fontWeight: "600",
  },
  rentButton: {
    backgroundColor: "#17799A",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  error: {
    color: "red",
  },
});

export default Account;
