import { Alert } from "react-native";

export const showAlert = (title, message, actionOk, actionCancel) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: "Cancel",
        onPress: () => actionCancel,
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => actionOk,
      },
    ],
    { cancelable: false }
  );
};

export const showAlertError = (message) => {
  Alert.alert("Wrong Input!", message, { cancelable: false });
};
