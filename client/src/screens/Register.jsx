import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import Modal from "react-native-modal";

function Register() {
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  const toggleBottomSheet = () => {
    setBottomSheetVisible(!isBottomSheetVisible);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Open Bottom Sheet" onPress={toggleBottomSheet} />

      <Modal
        isVisible={isBottomSheetVisible}
        onBackdropPress={toggleBottomSheet}
        style={{
          justifyContent: "flex-end",
          margin: 0,
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            height: "75%",
            padding: 16,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
        >
          <Text style={{ fontSize: 18 }}>Bottom Sheet Content</Text>
          <Button title="Close" onPress={toggleBottomSheet} />
        </View>
      </Modal>
    </View>
  );
}

export default Register;
