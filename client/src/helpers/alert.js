import { StyleSheet } from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
export const errorAlert = (msg) => {
  Toast.show({
    type: ALERT_TYPE.WARNING,
    title: "Oopss...",
    textBody: msg,
    autoClose: 1500,
    textBodyStyle: styles.errorMsg,
    titleStyle: styles.errorMsg,
  });
};

export const successAlert = (msg) => {
  Toast.show({
    type: ALERT_TYPE.SUCCESS,
    title: msg,
    autoClose: 1500,
    titleStyle: styles.successMsg,
  });
};

const styles = StyleSheet.create({
  errorMsg: {
    color: "red",
  },
  successMsg: {
    color: "black",
  },
});
