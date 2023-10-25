import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import Home from "./src/screens/Home";
import Splash from "./src/screens/Splash";
import LoginRegister from "./src/screens/LoginRegister";
import Account from "./src/screens/Account";
import Detail from "./src/screens/Detail";
import AddVehicle from "./src/screens/AddVehicle";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store/reducers";
import Rent from "./src/screens/Rent";
import MyOrder from "./src/screens/MyOrder";
import { AlertNotificationRoot } from "react-native-alert-notification";
import Profile from "./src/screens/Profile";
import { useCallback } from "react";
import { getUser } from "./store/actions";
import MyRent from "./src/screens/MyRent";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTab = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.userReducer);
  useFocusEffect(
    useCallback(() => {
      dispatch(getUser());
    }, [])
  );
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          paddingTop: 13,
          backgroundColor: "white",
          elevation: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
        },
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "md-home" : "md-home-outline";
          } else if (route.name === "Your Order") {
            iconName = focused ? "book-sharp" : "book-outline";
          } else if (route.name === "Video") {
            iconName = focused ? "play-circle-sharp" : "play-circle-outline";
          } else if (route.name === "You") {
            iconName = focused ? "person-circle-sharp" : "person-circle-outline";
          } else if (route.name === "Rent Now") {
            iconName = focused ? "bicycle-sharp" : "bicycle-outline";
          } else if (route.name === "Add Vehicle") {
            iconName = focused ? "ios-add-circle-sharp" : "ios-add-circle-outline";
          }

          return <Ionicons name={iconName} size={20} color={color} />;
        },
        tabBarActiveTintColor: "#17799A",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Rent Now" component={Rent} />
      {profile && <Tab.Screen name="Add Vehicle" component={AddVehicle} />}
      <Tab.Screen name="Your Order" component={MyOrder} />
      {profile ? <Tab.Screen name="You" component={Account} /> : <Tab.Screen name="You" component={LoginRegister} />}
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <AlertNotificationRoot>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: true,
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: "#282424",
              },
            }}
          >
            <Stack.Screen
              name="splash"
              component={Splash}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="home"
              component={HomeTab}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="loginRegister"
              component={LoginRegister}
              options={{
                headerShown: false,
                tabBarStyle: {
                  display: "none",
                },
              }}
            />
            <Stack.Screen
              name="detail"
              component={Detail}
              options={({ route }) => ({
                headerShown: true,
                headerTintColor: "white",
                headerStyle: {
                  backgroundColor: "#17799A",
                },
                tabBarStyle: { display: "none" },
                title: route.params.name,
              })}
            />
            <Stack.Screen
              name="myprofile"
              component={Profile}
              options={({ route }) => ({
                headerShown: false,
                tabBarStyle: { display: "none" },
              })}
            />
            <Stack.Screen name="myrent" component={MyRent} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </AlertNotificationRoot>
    </Provider>
  );
}
