import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  select,
  View,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import Dropdown from "react-native-input-select";
function AddVehicle() {
  const [country, setCountry] = useState();
  const { categories } = useSelector((state) => state.categoryReducer);
  const category = [
    {
      name: "car",
      specifications: "['color','transmission','seat','year']",
    },
    {
      name: "motorcycle",
      specifications: "['color','transmission','year']",
    },
    {
      name: "bicycle",
      specifications: "['color']",
    },
    {
      name: "scooter",
      specifications: "['color']",
    },
  ];
  console.log(country);
  console.log(categories.specifications);

  function categoryInput(category) {
    if (category == 1) {
      return;
    }
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={{ gap: 5 }}>
            <Text style={styles.label}>Name Vehicle</Text>
            <TextInput style={styles.textInput} placeholder="Honda Brio" />
          </View>
          <View style={{ gap: 5 }}>
            <Text style={styles.label}>City Location</Text>
            <TextInput style={styles.textInput} placeholder="Bandung" />
          </View>
          <View style={{ gap: 5 }}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.textInput}
              placeholder="250000"
              keyboardType="numeric"
            />
          </View>
          <View style={{ gap: 5 }}>
            <Text style={styles.label}>Category Vehicle</Text>
            <Dropdown
              style={styles.textInput}
              label="Country"
              placeholder="Car..."
              options={[
                { label: "Car", value: 1 },
                { label: "Motorcycle", value: 2 },
                { label: "Bicycle", value: 3 },
                { label: "Scooter", value: 4 },
              ]}
              selectedValue={country}
              onValueChange={(value) => setCountry(value)}
              primaryColor={"#22A6B3"}
              dropdownStyle={{
                borderWidth: 0, // To remove border, set borderWidth to 0
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gray",
    padding: 20,
    paddingVertical: 30,
  },
  form: {
    flex: 1,
    gap: 15,
    width: "80%",
  },
  label: {
    color: "black",
    fontSize: 18,
    marginStart: 5,
  },
  textInput: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 15,
    borderWidth: 0.5,
    borderColor: "black",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default AddVehicle;
