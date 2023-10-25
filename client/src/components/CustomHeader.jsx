import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const CustomHeader = ({ title }) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>{"<"}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3498db",
    height: 60,
  },
  backButton: {
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonText: {
    color: "white",
    fontSize: 24,
  },
  title: {
    flex: 1,
    color: "white",
    fontSize: 20,
  },
});

export default CustomHeader;
