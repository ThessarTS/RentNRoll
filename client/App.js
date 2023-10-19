import { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import Home from "./src/screens/Home";
import Splash from "./src/screens/Splash";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNav = () => {
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
          }

          return <Ionicons name={iconName} size={20} color={color} />;
        },
        tabBarActiveTintColor: "#17799A",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Rent Now" component={Home} />
      <Tab.Screen name="Your Order" component={Home} />
      <Tab.Screen name="You" component={Home} />
    </Tab.Navigator>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
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
          component={TabNav}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
