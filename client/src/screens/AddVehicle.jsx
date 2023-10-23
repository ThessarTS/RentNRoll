import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, ScrollView } from "react-native";
// import { TextInput } from "react-native-gesture-handler";
import Dropdown from "react-native-input-select";
function AddVehicle() {
  const [country, setCountry] = useState();
  console.log(country);
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
              placeholder="Select an option..."
              options={[
                { label: "Nigeria", value: "NG" },
                { label: "Åland Islands", value: "AX" },
                { label: "Algeria", value: "DZ" },
                { label: "American Samoa", value: "AS" },
                { label: "Andorra", value: "AD" },
              ]}
              selectedValue={country}
              onValueChange={(value) => setCountry(value)}
              primaryColor={"green"}
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
