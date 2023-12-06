import { View, Text, TouchableOpacity } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import React from "react";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Onboard = () => {
  const navigation = useNavigation();
  const onDone = async () => {
    await AsyncStorage.setItem("onboard", "true");
    navigation.navigate("Login");
  };

  return (
    <Onboarding
      onSkip={onDone}
      onDone={onDone}
      containerStyles={{ paddingHorizontal: 20 }}
      bottomBarHighlight={false}
      DoneButtonComponent={({ ...props }) => (
        <TouchableOpacity style={{ paddingHorizontal: 20 }} {...props}>
          <Text style={{ fontSize: 15 }}>Done</Text>
        </TouchableOpacity>
      )}
      pages={[
        {
          backgroundColor: "#9bc4fa",
          image: (
            <View style={{ width: 300, height: 300 }}>
              <LottieView
                style={{ flex: 1 }}
                source={require("../assets/shoe.json")}
                autoPlay
                loop
              />
            </View>
          ),
          title: "Shoe Store",
          subtitle: "Buy your favourite shoes",
        },
        {
          backgroundColor: "#f5e5cb",
          image: (
            <View style={{ width: 300, height: 300 }}>
              <LottieView
                style={{ flex: 1 }}
                source={require("../assets/cart.json")}
                autoPlay
                loop
              />
            </View>
          ),
          title: "Shoe Cart",
          subtitle: "Add to cart your favourite shoes",
        },
        {
          backgroundColor: "#d49bfa",
          image: (
            <View style={{ width: 300, height: 300 }}>
              <LottieView
                style={{ flex: 1 }}
                source={require("../assets/admin.json")}
                autoPlay
                loop
              />
            </View>
          ),
          title: "Admin Panel",
          subtitle: "Admin can add, delete, update shoes",
        },
      ]}
    />
  );
};

export default Onboard;
