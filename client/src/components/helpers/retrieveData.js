import AsyncStorage from "@react-native-async-storage/async-storage";

retrieveData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (!value) throw { name: "access_token-undefined" };
    console.log(value);
    return value;
  } catch (error) {
    console.log(error);
  }
};

export default retrieveData;
