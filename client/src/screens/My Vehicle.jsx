import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  FlatList,
} from "react-native";

import { useSelector } from "react-redux";
import CardTakenRent from "../components/CardTeken copy";
import CardGiveRent from "../components/CardGiven";

function MyVehicle({ navigation }) {
  const { profile } = useSelector((state) => state.userReducer);
  const [togleRent, setTogleRent] = useState(false);
  return (
    // <ScrollView>
    <View style={styles.container}>
      <View>
        <View>
          {/* take rent and give rent */}
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              // height: 200,
              paddingVertical: 2,
              paddingHorizontal: 2,
              backgroundColor: "whitesmoke",
              borderWidth: 1,
              borderRadius: 5,
              borderColor: "#17799A",
              marginTop: 55,
            }}
          >
            <Pressable
              onPress={() => {
                setTogleRent(false);
              }}
            >
              <View
                style={{
                  backgroundColor: !togleRent ? "#17799A" : "whitesmoke",
                  padding: 10,
                  borderRadius: 4,
                }}
              >
                <Text
                  style={{
                    color: !togleRent ? "white" : "black",
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  Taken rent
                </Text>
              </View>
            </Pressable>
            <Pressable
              onPress={() => {
                setTogleRent(true);
              }}
            >
              <View
                style={{
                  padding: 10,
                  borderRadius: 4,
                  backgroundColor: togleRent ? "#17799A" : "whitesmoke",
                }}
              >
                <Text
                  style={{
                    color: togleRent ? "white" : "black",
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  Give rent
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>

      <View style={{ padding: 5 }}>
        {togleRent ? (
          <FlatList
            data={profile.Vehicles}
            renderItem={({ item }) => (
              <CardGiveRent
                vehicles={item}
                navigation={navigation}
                review={profile}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <FlatList
            data={profile.Orders}
            renderItem={({ item }) => (
              <CardTakenRent
                vehicles={item}
                navigation={navigation}
                review={profile}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        )}

        {/* <CardTakenRent /> */}
      </View>
    </View>
    // </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  cardContent: {
    flexDirection: "column", // This sets the content to be displayed in a column layout
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    margin: 10,
    flex: 1,
    elevation: 3, // for Android shadow
    shadowColor: "#000", // for iOS shadow
    shadowOffset: { width: 1, height: 1 }, // for iOS shadow
    shadowOpacity: 0.3, // for iOS shadow
  },
  image: {
    width: "50%",
    height: 90,
    borderRadius: 10,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textCard: {
    fontSize: 16,
  },

  totalReviews: {
    fontSize: 16,
  },
  mastheadContainer: {
    flexDirection: "row",
    gap: 5,
    paddingHorizontal: 20,
    paddingTop: 70,
    paddingBottom: 10,
    backgroundColor: "#17799A",
    justifyContent: "flex-end",
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
    zIndex: 1,
  },
  profileContainer: {
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
  profileButton: {
    backgroundColor: "#17799A",
    padding: 13,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },

  profileImage: {
    width: 85,
    height: 85,
    borderRadius: 10,
  },

  profileName: { fontSize: 18, marginBottom: 8, fontWeight: "600" },
  profileInfo: { fontSize: 13, color: "gray" },
  profileButtonText: { color: "white", fontWeight: "500" },

  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  itemsContainer: {
    paddingHorizontal: 10,
    gap: 5,
    justifyContent: "center",
  },

  itemsTitle: {
    marginStart: 3,
    fontSize: 14,
    fontWeight: "bold",
    color: "gray",
  },

  itemsBackgroundContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  memberContainer: {
    backgroundColor: "whitesmoke",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    gap: 3,
  },

  itemsDetailTitle: {
    fontSize: 14,
    fontWeight: "500",
  },
  itemsDetailInfo: {
    fontSize: 11,
    color: "green",
  },

  memberItemContainer: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "white",
  },
});

export default MyVehicle;
