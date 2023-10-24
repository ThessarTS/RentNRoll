import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  SafeAreaView,
  Pressable,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useSelector } from "react-redux";
import Dropdown from "react-native-input-select";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";
import { addVehicle } from "../../store/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { errorAlert, successAlert } from "../helpers/alert";

function AddVehicle({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState();
  const [loading, setLoading] = useState(false);
  const { categories } = useSelector((state) => state.categoryReducer);
  const [image, setImage] = useState(null);
  const [specifications, setSpecifications] = useState([
    {
      name: "",
      value: "",
    },
  ]);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        errorAlert("Permission to access the camera roll is required!");
      }
    })();
  }, []);
  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const [input, setInput] = useState({
    name: "",
    CategoryId: "",
    price: "",
    location: "",
  });
  const formData = new FormData();
  formData.append("image", {
    name: "image.jpg",
    type: "image/jpeg",
    uri: image,
  });
  const handleChangeInput = (name, text) => {
    setInput((input) => ({
      ...input,
      [name]: text,
    }));
  };
  const handleChange = (index, name, value) => {
    const updatedSpecifications = [...specifications];
    updatedSpecifications[index] = {
      name,
      value,
    };
    setSpecifications(updatedSpecifications);
  };

  const handelSubmit = async () => {
    if (image) {
      const access_token = await AsyncStorage.getItem("access_token");
      formData.append("name", input.name);
      formData.append("CategoryId", selectedCategory);
      formData.append("price", Number(input.price));
      formData.append("location", input.location);
      formData.append("specifications", specifications);
      setLoading(true);
      dispatch(addVehicle(formData, access_token))
        .then((data) => {
          navigation.navigate("Home");
          successAlert(data.message);
          setSelectedCategory();
          setSpecifications([
            {
              name: "",
              value: "",
            },
          ]);
          setInput({
            name: "",
            CategoryId: "",
            price: "",
            location: "",
          });
          setImage(null);
          setLoading(false);
        })
        .catch((error) => {
          errorAlert(error.message);
          setLoading(false);
        });
    } else {
      errorAlert("please upload your vehicle image");
    }
  };
  function categoryInput() {
    const findCategory = categories.find((el) => {
      return el.id == selectedCategory;
    });
    if (!findCategory) {
      return (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontStyle: "italic", fontSize: 16 }}>
            Please Choose Category First
          </Text>
        </View>
      );
    }
    return (
      <SafeAreaView>
        <View
          style={{
            gap: 10,
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {JSON.parse(findCategory.specifications).map((el, idx) => {
            return (
              <View key={idx} style={{ width: "45%" }}>
                <Text style={styles.label}>{el}</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder=""
                  onChangeText={(text) => {
                    handleChange(idx, el, text); // Ensure that idx, el, and text are passed correctly
                  }}
                />
              </View>
            );
          })}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ marginBottom: 15 }}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {image && (
              <Image
                source={{ uri: image }}
                style={{
                  width: 200,
                  height: 200,
                  resizeMode: "cover",
                  borderWidth: 2,
                  borderColor: "#17799A",
                }}
              />
            )}
            {/* <Button title="Upload Image" onPress={selectImage} /> */}
          </View>
          <Pressable style={styles.buttonAction} onPress={selectImage}>
            <Text style={styles.textAction}>Upload Image</Text>
          </Pressable>
        </View>
        <View style={styles.form}>
          <View style={{ gap: 5 }}>
            <Text style={styles.label}>Name Vehicle</Text>
            <TextInput
              style={styles.textInput}
              value={input.name}
              onChangeText={(text) => handleChangeInput("name", text)}
              placeholder="Honda Brio"
            />
          </View>
          <View style={{ gap: 5 }}>
            <Text style={styles.label}>City Location</Text>
            <TextInput
              style={styles.textInput}
              value={input.location}
              onChangeText={(text) => handleChangeInput("location", text)}
              placeholder="Bandung"
            />
          </View>
          <View style={{ gap: 5, marginBottom: 10 }}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.textInput}
              placeholder="250000"
              keyboardType="numeric"
              value={input.price}
              onChangeText={(text) => handleChangeInput("price", text)}
            />
          </View>
          {loading && (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="large" />
              <Text style={{ marginTop: 16, fontSize: 18 }}>Loading...</Text>
            </View>
          )}
          <View style={{ gap: 5, paddingTop: 10 }}>
            <View style={{}}>
              <Dropdown
                style={styles.textInput}
                labelStyle={{ fontSize: 16, color: "black" }}
                label="Category"
                placeholder="Category Vehicle"
                options={[
                  { label: "Car", value: 1 },
                  { label: "Motorcycle", value: 2 },
                  { label: "Bicycle", value: 3 },
                  { label: "Scooter", value: 4 },
                ]}
                selectedValue={selectedCategory}
                onValueChange={(value) => setSelectedCategory(value)}
                primaryColor={"#22A6B3"}
                dropdownStyle={{
                  borderWidth: 0, // To remove border, set borderWidth to 0
                }}
              />
            </View>
          </View>
          {/* Spec input */}
          {categoryInput()}
          {/* {specificationInput(selectedCategory)} */}
          {/* Spec input */}
        </View>
        <Pressable style={styles.buttonAction} onPress={handelSubmit}>
          <Text style={styles.textAction}>Submit</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "start",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 20,
    paddingVertical: 30,
  },
  form: {
    flex: 1,
    gap: 15,
    width: "100%",
  },
  textAction: {
    color: "white",
    fontWeight: "bold",
  },
  buttonAction: {
    padding: 10,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#17799A",
    width: "100%",
    marginTop: 20,
  },
  label: {
    color: "black",
    fontSize: 16,
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
  labelSpec: {
    color: "black",
    fontSize: 24,
    marginStart: 5,
    fontWeight: "bold",
  },
  imageInput: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 50,
    width: 140,
    height: 140,
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
