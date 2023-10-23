import React, { useState } from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Entypo, AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import Modal from "react-native-modal";
import { handleLogout } from "../../store/actions/userAction";
import { useNavigation } from "@react-navigation/native";
function NavIcon() {
  const [modalLogout, setModalLogout] = useState(false);
  const navigate = useNavigation();
  const dispatch = useDispatch();

  const toggleLogout = () => {
    setModalLogout(!modalLogout);
  };

  const doLogout = () => {
    dispatch(handleLogout()).then(() => {
      navigate.push("loginRegister");
      toggleLogout();
    });
  };

  return (
    <View>
      <View style={styles.mastheadContainer}>
        <View style={{ marginEnd: 10, paddingBottom: 10, alignSelf: "flex-end" }}>
          <View style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}>
            <Pressable>
              <Entypo name="chat" size={25} color="white" />
            </Pressable>
            <Pressable style={styles.notifContainer}>
              <Icon name="bell-badge" size={25} color="white" />
            </Pressable>
            <Pressable onPress={toggleLogout}>
              <MaterialIcons name="logout" size={25} color="white" />
            </Pressable>
          </View>
        </View>
      </View>
      <Modal
        isVisible={modalLogout}
        onBackdropPress={toggleLogout}
        style={{
          justifyContent: "center",
          margin: 0,
        }}
      >
        <View style={styles.modalSettingContainer}>
          <Pressable style={{ alignItems: "center", justifyContent: "center" }}>
            <AntDesign name="warning" size={50} color="red" />
            <Text style={{ fontWeight: 600, fontSize: 20, marginTop: 10, marginBottom: 5 }}>Are you sure?</Text>
            <Text>You won't be able to revert this</Text>
            <View style={{ flexDirection: "row", gap: 5, marginTop: 10 }}>
              <Pressable style={{ backgroundColor: "#17799A", padding: 5, paddingHorizontal: 10, borderRadius: 5 }} onPress={doLogout}>
                <Text style={{ color: "white", fontWeight: 500 }}>Logout</Text>
              </Pressable>
              <Pressable style={{ backgroundColor: "red", padding: 5, paddingHorizontal: 10, borderRadius: 5 }} onPress={toggleLogout}>
                <Text style={{ color: "white", fontWeight: 500 }}>Cancel</Text>
              </Pressable>
            </View>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  mastheadContainer: {
    flexDirection: "row",
    gap: 5,
    paddingHorizontal: 20,
    paddingTop: 70,
    paddingBottom: 10,
    backgroundColor: "#17799A",
    justifyContent: "flex-end",
  },
  modalSettingContainer: {
    position: "relative",
    backgroundColor: "whitesmoke",
    height: "23%",
    width: "80%",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
  },
  cancelModalButton: { position: "absolute", top: 10, right: 20 },
});
export default NavIcon;
