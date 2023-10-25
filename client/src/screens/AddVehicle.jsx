import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View, ScrollView, SafeAreaView, Pressable, Image, ActivityIndicator, ImageBackground, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useSelector } from "react-redux";
import Dropdown from "react-native-input-select";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";
import { addVehicle } from "../../store/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { errorAlert, successAlert } from "../helpers/alert";
import NavIcon from "../components/NavIcon";
import bg from "../../assets/image/bg-home.png";
import { AntDesign, MaterialIcons, Feather } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { useFocusEffect } from "@react-navigation/native";

function AddVehicle({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState();
  const [loading, setLoading] = useState(false);
  const { categories } = useSelector((state) => state.categoryReducer);
  const [image, setImage] = useState(null);
  const [specifications, setSpecifications] = useState([{ name: "", value: "" }]);
  const [filledSpecifications, setFilledSpecifications] = useState([]);
  const dispatch = useDispatch();
  const [spec, setSpec] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

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

    // Menyimpan spesifikasi yang sudah diisi
    const updatedFilledSpecifications = [...filledSpecifications];
    updatedFilledSpecifications[index] = {
      name,
      value,
    };
    setFilledSpecifications(updatedFilledSpecifications);
  };

  const toggleSpec = () => {
    setSpec(!spec);
  };

  useFocusEffect(
    useCallback(() => {
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
      setSpecifications([
        {
          name: "",
          value: "",
        },
      ]);

      setFilledSpecifications([]);
      setImage(null);
      setLoading(false);
    }, [])
  );

  const handelSubmit = async () => {
    if (image) {
      const access_token = await AsyncStorage.getItem("access_token");
      formData.append("name", input.name);
      formData.append("CategoryId", selectedCategory);
      formData.append("price", Number(input.price));
      formData.append("location", input.location);

      const areAllSpecificationsFilled = specifications.every((spec) => spec.name !== "" && spec.value !== "");

      if (!areAllSpecificationsFilled) {
        errorAlert("Please fill in all specifications");
        return;
      }

      formData.append("specifications", JSON.stringify(specifications));
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
          setSpecifications([
            {
              name: "",
              value: "",
            },
          ]);

          setFilledSpecifications([]);
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

  const categoryInput = () => {
    const findCategory = categories.find((el) => el.id === selectedCategory);

    if (!findCategory) {
      return <View></View>;
    }

    return (
      <Modal
        isVisible={spec}
        onBackdropPress={toggleSpec}
        style={{
          justifyContent: "flex-end",
          margin: 0,
        }}
      >
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <View
            style={{
              backgroundColor: "white",
              gap: 10,
              padding: 20,
              paddingVertical: 30,
              borderTopEndRadius: 16,
              borderTopStartRadius: 16,
              minHeight: 500, // Sesuaikan kebutuhan
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "500", marginBottom: 10 }}>Input Specifications</Text>

            <ScrollView style={{ padding: 10 }}>
              {JSON.parse(findCategory.specifications).map((el, idx) => {
                return (
                  <View key={idx} style={{ gap: 5, marginVertical: 5 }}>
                    <Text style={styles.label}>{el.charAt(0).toUpperCase() + el.slice(1)}</Text>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                      <TextInput
                        style={styles.textInput}
                        placeholder=""
                        returnKeyType={"done"}
                        onChangeText={(text) => {
                          handleChange(idx, el, text);
                        }}
                        // Set nilai TextInput dari filledSpecifications
                        value={filledSpecifications[idx] ? filledSpecifications[idx].value : ""}
                      />
                    </TouchableWithoutFeedback>
                  </View>
                );
              })}
            </ScrollView>

            <Pressable style={styles.buttonAction} onPress={toggleSpec}>
              <Text style={styles.textAction}>Save</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <NavIcon />
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground source={bg} style={{ flex: 1 }}>
          <ScrollView style={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.itemContainer}>
              <View style={styles.top}></View>
              <View style={styles.uploadContainer}>
                {/* icon */}
                <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
                  <View style={{ backgroundColor: "#17799A", width: 35, height: 35, alignItems: "center", justifyContent: "center", borderRadius: "50%" }}>
                    <MaterialIcons name="car-rental" size={25} color="white" />
                  </View>
                  <View>
                    <Text>A convenient way to travel in and out town</Text>
                  </View>
                </View>
                {/* icon */}
                <View style={{ marginBottom: 15, zIndex: 1 }}>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  ></View>
                </View>
                <View style={styles.form}>
                  <View style={{ gap: 5 }}>
                    <Text style={styles.label}>Name Vehicle</Text>
                    <TextInput style={styles.textInput} value={input.name} returnKeyType={"done"} onChangeText={(text) => handleChangeInput("name", text)} placeholder="Honda Brio" />
                  </View>
                  <View style={{ gap: 5 }}>
                    <Text style={styles.label}>City Location</Text>
                    <TextInput style={styles.textInput} value={input.location} returnKeyType={"done"} onChangeText={(text) => handleChangeInput("location", text)} placeholder="Bandung" />
                  </View>
                  <View style={{ gap: 5, marginBottom: 10 }}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput style={styles.textInput} placeholder="250000" keyboardType="numeric" returnKeyType="done" value={input.price} onChangeText={(text) => handleChangeInput("price", text)} />
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
                        labelStyle={{ fontSize: 16, color: "black", marginStart: 5 }}
                        label="Category"
                        placeholder="Select Category Vehicle"
                        options={[
                          { label: "Car", value: 1 },
                          { label: "Motorcycle", value: 2 },
                          { label: "Bicycle", value: 3 },
                          { label: "Scooter", value: 4 },
                        ]}
                        selectedValue={selectedCategory}
                        onValueChange={(value) => {
                          setSelectedCategory(value);
                          setSpec(true);
                        }}
                        primaryColor={"#22A6B3"}
                        dropdownStyle={{
                          height: 50,
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
                        }}
                      />
                      {specifications.every((spec) => spec.value.trim() !== "") && (
                        <Pressable style={{ flexDirection: "row", gap: 2, alignItems: "center", marginStart: 5 }} onPress={toggleSpec}>
                          <AntDesign name="eyeo" size={15} color="black" />
                          <Text style={{ fontSize: 11 }}>See Detail</Text>
                        </Pressable>
                      )}
                    </View>
                  </View>
                  {/* Spec input */}
                  {categoryInput()}
                  {/* Spec input */}
                  {image ? (
                    <View>
                      <Image
                        source={{ uri: image }}
                        style={{
                          width: "100%",
                          height: 200,
                          resizeMode: "cover",
                          borderWidth: 2,
                          borderRadius: 5,
                          borderColor: "#17799A",
                        }}
                      />
                      <Pressable style={{ flexDirection: "row", marginVertical: 10, gap: 5, alignItems: "center" }}>
                        <Feather name="edit-3" size={17} color="gray" />
                        <Text style={{ fontSize: 13, color: "gray" }}>Edit Photo</Text>
                      </Pressable>
                    </View>
                  ) : (
                    <Pressable
                      onPress={selectImage}
                      style={{ flexDirection: "row", alignItems: "center", gap: 5, padding: 40, justifyContent: "center", borderColor: "#17799A", borderWidth: 1, backgroundColor: "rgba(128, 128, 128, 0.1)", borderRadius: 5 }}
                    >
                      <AntDesign name="addfile" size={24} color="black" />
                      <Text style={{ color: "gray" }}>Upload Image</Text>
                    </Pressable>
                  )}

                  {/* button submit */}
                </View>
                <Pressable style={styles.buttonAction} onPress={handelSubmit}>
                  <Text style={styles.textAction}>Submit</Text>
                </Pressable>
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
    backgroundColor: "white",
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
  scrollViewContainer: {
    position: "relative",
    zIndex: 0,
  },
  itemContainer: {
    backgroundColor: "whitesmoke",
    height: "500%",
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
  uploadContainer: {
    backgroundColor: "white",
    shadowColor: "black",
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 10,
    marginBottom: 20,
    gap: 15,
    zIndex: 2,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default AddVehicle;
