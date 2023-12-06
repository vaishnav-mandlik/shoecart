import { StyleSheet, Text, View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserHome from "./screen/UserHome";
import Onboard from "./screen/Onboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import Login from "./screen/Login";
import AdminHome from "./screen/AdminHome";
import AddShoeForm from "./components/AddShoeForm";

export default function App() {
  const Stack = createNativeStackNavigator();
  const [isOnboarded, setIsOnboarded] = useState(null);

  const getData = async () => {
    const value = await AsyncStorage.getItem("onboard");
    if (value) {
      setIsOnboarded(true);
    } else {
      setIsOnboarded(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (isOnboarded === null) return null;

  if (!isOnboarded) {
    return (
      <>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="#000"
        />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Onboard"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="UserHome" component={UserHome} />
            <Stack.Screen name="AdminHome" component={AdminHome} />
            <Stack.Screen name="Onboard" component={Onboard} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="AddShoeForm" component={AddShoeForm} />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
  return (
    <>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#000"
      />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="UserHome" component={UserHome} />
          <Stack.Screen name="AdminHome" component={AdminHome} />
          <Stack.Screen name="Onboard" component={Onboard} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="AddShoeForm" component={AddShoeForm} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
