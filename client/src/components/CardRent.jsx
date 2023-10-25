import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Pressable, TouchableOpacity, TextInput } from "react-native";
import { Entypo, FontAwesome, AntDesign } from "@expo/vector-icons";
import { fDate } from "../helpers/fDate";
import { fPrice } from "../helpers/fPrice";
import { getStatusBackgroundColor } from "../helpers/getBg";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "../../store/actions";
import { errorAlert } from "../helpers/alert";
import AsyncStorage from "@react-native-async-storage/async-storage";

function CardRent({ vehicles, UserId }) {
  const [modalReview, setModalReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const postReview = async () => {
    try {
      const input = {
        rating: rating,
        message: comment,
        UserId: UserId,
        VehicleId: vehicles.Vehicle.id,
      };
      const access_token = await AsyncStorage.getItem("access_token");
      dispatch(addReview(input, access_token)).then(() => setModalReview(false));
    } catch (error) {
      errorAlert(error);
    }
  };

  const ModalReview = () => {
    const getRatingDescription = () => {
      switch (rating) {
        case 1:
          return "Very Bad";
        case 2:
          return "Bad";
        case 3:
          return "Average";
        case 4:
          return "Good";
        case 5:
          return "Very Good";
        default:
          return "";
      }
    };

    return (
      <Modal isVisible={modalReview} onBackdropPress={toggleReview} style={{ justifyContent: "center", margin: 0, alignItems: "center" }}>
        <View style={{ backgroundColor: "white", marginHorizontal: 20, alignItems: "center", padding: 20, width: "80%" }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start", width: "100%", gap: 10 }}>
            <View>
              <Image source={{ uri: vehicles.Vehicle.image }} style={{ width: 80, height: 80, borderRadius: 10 }} resizeMode="contain" />
            </View>
            <View style={{ flex: 4 }}>
              {rating > 0 ? (
                <View>
                  <Text style={{ fontSize: 13 }}>{getRatingDescription()}</Text>
                </View>
              ) : (
                <View>
                  <Text style={{ fontSize: 13 }}>Give Rating</Text>
                </View>
              )}
              <View style={{ flexDirection: "row", paddingTop: 5 }}>
                {[1, 2, 3, 4, 5].map((index) => (
                  <TouchableOpacity key={index} onPress={() => setRating(index)}>
                    <AntDesign name={index <= rating ? "star" : "staro"} size={20} color="#F8B84E" />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <TextInput
            style={{
              height: 100,
              width: "100%",
              color: "black",
              backgroundColor: "gray",
              justifyContent: "flex-start",
              padding: 10,
              paddingTop: 10,
              backgroundColor: "rgba(128, 128, 128, 0.1)",
              borderRadius: 5,
              fontSize: 11,
            }}
            placeholder="Share your rating and help other users make better choices"
            multiline={true}
            value={comment}
            onChangeText={(text) => setComment(text)}
          />

          <Pressable style={{ marginEnd: 5, alignSelf: "flex-end", marginTop: 20, backgroundColor: "#17799A", padding: 5, paddingHorizontal: 10, borderRadius: 5 }}>
            <Text style={{ color: "white" }} onPress={postReview}>
              Submit
            </Text>
          </Pressable>
        </View>
      </Modal>
    );
  };

  const toggleReview = () => {
    setRating(0);
    setModalReview(!modalReview);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text style={styles.itemsDetailTitle}>{vehicles.Vehicle.name}</Text>
          {vehicles.status === "returned" && (
            <Pressable style={{ flexDirection: "row", alignItems: "center", gap: 2 }} onPress={toggleReview}>
              <AntDesign name="star" size={12} color="#F8B84E" />
              <Text style={{ color: "gray", fontSize: 12 }}>Give Review</Text>
            </Pressable>
          )}
        </View>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <View>
            <Image
              source={{
                uri: vehicles.Vehicle.image,
              }}
              style={{ width: 90, height: 65 }}
              resizeMode="contain"
            />
          </View>
          <View style={{ flex: 6, marginStart: 10, gap: 3 }}>
            <View style={[styles.headerItemContainer, { marginStart: 2 }]}>
              <FontAwesome name="calendar-plus-o" size={12} color="gray" />
              <Text style={[styles.itemsDetailInfo, { marginStart: 2 }]}>{fDate(vehicles.startDate)}</Text>
            </View>
            <View style={[styles.headerItemContainer, { marginStart: 2 }]}>
              <FontAwesome name="calendar-check-o" size={12} color="gray" />
              <Text style={[styles.itemsDetailInfo, { marginStart: 2 }]}>{fDate(vehicles.endDate)}</Text>
            </View>
            <View style={[styles.headerItemContainer, { marginStart: 2 }]}>
              <Entypo name="price-tag" size={14} color="gray" />
              <Text style={[styles.itemsDetailInfo, { marginStart: 2 }]}>{fPrice(vehicles.Vehicle.price)}</Text>
            </View>
          </View>
          <View>
            <Pressable style={{ backgroundColor: getStatusBackgroundColor(vehicles.status), padding: 7, borderRadius: 5 }}>
              <Text style={{ color: "white", fontSize: 10 }}>{vehicles.status}</Text>
            </Pressable>
          </View>
        </View>
      </View>
      {ModalReview()}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    padding: 10,
    gap: 10,
  },
  itemsDetailTitle: {
    fontSize: 14,
    fontWeight: "500",
  },
  itemsDetailInfo: {
    fontSize: 11,
    color: "gray",
    fontWeight: 500,
  },
  headerItemContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
  },
});

export default CardRent;
