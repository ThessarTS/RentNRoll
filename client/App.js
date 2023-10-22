import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import Home from "./src/screens/Home";
import Splash from "./src/screens/Splash";
import LoginRegister from "./src/screens/LoginRegister";
import Account from "./src/screens/Account";
import Detail from "./src/screens/Detail";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddVehicle from "./src/screens/AddVehicle";
import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store/reducers";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTab = () => {
  const [user, setUser] = useState(false);
  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        if (user) {
          setUser(true);
        }
      } catch (error) {
        console.error("Error while checking user:", error);
      }
    };

    checkUser();
  }, [user]);
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
      <Tab.Screen name="Rent Now" component={Home} />
      {user && <Tab.Screen name="Add Vehicle" component={AddVehicle} />}
      <Tab.Screen name="Your Order" component={Home} />
      <Tab.Screen name="You" component={Account} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
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
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
