import React, { useState } from "react";
import { ImageBackground, Pressable, StyleSheet, Text, TextInput, View, Image } from "react-native";
import Checkbox from "expo-checkbox";
import banner from "../../assets/image/banner.jpg";
import { Ionicons } from "@expo/vector-icons";
import googleIcon from "../../assets/vector/google.png";
import Modal from "react-native-modal";

function Login({ navigation }) {
  const [isChecked, setChecked] = useState(false);
  const [formRegister, setFormRegister] = useState(false);

  const toggleRememberMe = () => {
    setChecked(!isChecked);
  };

  const toggleBottomSheet = () => {
    setFormRegister(!formRegister);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={banner} style={styles.backgroundImage} resizeMode="cover">
        <Text style={styles.textWithShadow}>{formRegister ? "Register" : "Log in"}</Text>
        <Pressable style={styles.buttonBack} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-sharp" size={20} color="white" />
        </Pressable>
      </ImageBackground>

      {/* login */}
      <View style={styles.formContainer}>
        <View style={{ gap: 5 }}>
          <Text style={styles.label}>Username</Text>
          <TextInput placeholder="username" style={styles.textInput} />
        </View>
        <View style={{ gap: 5 }}>
          <Text style={styles.label}>Password</Text>
          <TextInput placeholder="password" secureTextEntry={true} style={styles.textInput} />
        </View>
        <View style={styles.checkboxContainer}>
          <View style={styles.checkBoxView}>
            <Checkbox style={styles.checkbox} value={isChecked} onValueChange={toggleRememberMe} color={isChecked ? "#17799A" : undefined} />
            <Text style={{ paddingLeft: -50 }}>Remember Me</Text>
          </View>
        </View>
        <View style={{ marginTop: 15 }}>
          <View style={styles.actionContainer}>
            <Text style={{ textAlign: "center" }}>Dont have account? </Text>
            <Pressable onPress={toggleBottomSheet}>
              <Text style={{ textDecorationLine: "underline", color: "#17799A" }}>Register Now</Text>
            </Pressable>
          </View>
          <Pressable style={styles.buttonAction}>
            <Text style={styles.textAction}>Log In</Text>
          </Pressable>
        </View>
        <View style={styles.lineContainer}>
          <View style={styles.line}></View>
          <Text style={styles.orText}>or log in with</Text>
          <View style={styles.line}></View>
        </View>
        <View>
          <Pressable style={styles.buttonGoggle} onPress={() => navigation.navigate("register")}>
            <Image source={googleIcon} style={styles.googleIcon} />
            <Text style={styles.googleText}>Google</Text>
          </Pressable>
        </View>
      </View>
      {/* end login */}

      {/* register */}
      <Modal
        isVisible={formRegister}
        onBackdropPress={toggleBottomSheet}
        style={{
          justifyContent: "flex-end",
          margin: 0,
        }}
      >
        <View style={styles.registerContainer}>
          <View style={styles.formContainer}>
            <View style={{ gap: 5 }}>
              <Text style={styles.label}>Username</Text>
              <TextInput placeholder="username" style={styles.textInput} />
            </View>
            <View style={{ gap: 5 }}>
              <Text style={styles.label}>Email</Text>
              <TextInput placeholder="email" style={styles.textInput} />
            </View>
            <View style={{ gap: 5 }}>
              <Text style={styles.label}>Password</Text>
              <TextInput placeholder="password" secureTextEntry={true} style={styles.textInput} />
            </View>

            <View style={{ marginTop: 15 }}>
              <View style={styles.actionContainer}>
                <Text style={{ textAlign: "center" }}>Already have account? </Text>
                <Pressable onPress={toggleBottomSheet}>
                  <Text style={{ textDecorationLine: "underline", color: "#17799A" }}>Log in</Text>
                </Pressable>
              </View>
              <Pressable style={styles.buttonAction}>
                <Text style={styles.textAction}>Register</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      {/* end register */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#17799A",
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
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    zIndex: -1,
  },

  backgroundImage: {
    height: 250,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 20,
    position: "relative",
  },

  textWithShadow: {
    fontSize: 24,
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },

  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "gray",
  },

  orText: {
    color: "#777",
    fontSize: 16,
    marginHorizontal: 10,
  },

  buttonBack: {
    position: "absolute",
    top: 40,
    margin: 20,
    zIndex: 0,
    flex: 1,
    alignSelf: "flex-start",
    backgroundColor: "#17799A",
    height: 30,
    width: 30,
    borderRadius: "50%",
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  formContainer: {
    gap: 15,
    flex: 1,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    paddingVertical: 30,
  },

  registerContainer: {
    backgroundColor: "white",
    height: "72%",
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  checkboxContainer: {
    flexDirection: "row",
    paddingHorizontal: 5,
    marginTop: 10,
  },

  checkBoxView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  label: {
    color: "black",
    fontSize: 18,
    marginStart: 5,
  },

  actionContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 8,
  },

  buttonAction: {
    padding: 10,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#17799A",
  },

  buttonGoggle: {
    padding: 10,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "whitesmoke",
    flexDirection: "row",
    gap: 5,
  },

  googleIcon: {
    width: 20,
    height: 20,
  },

  googleText: {
    color: "#17799A",
    fontWeight: "bold",
  },
  textAction: {
    color: "white",
    fontWeight: "bold",
  },
});
export default Login;
