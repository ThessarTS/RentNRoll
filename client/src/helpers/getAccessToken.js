import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAccessToken = async () => {
  try {
    const newUser = await AsyncStorage.getItem("access_token");
    if (!newUser) {
      throw new Error("userNotFound");
    }
    const newValue = {
      access_token: newUser,
    };
    return newValue;
  } catch (error) {
    console.log(error);
  }
};
