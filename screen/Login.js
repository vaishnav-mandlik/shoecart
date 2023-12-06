import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const navigation = useNavigation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const onLogin = () => {
    navigation.navigate(isAdmin ? "AdminHome" : "UserHome");
  };
  return (
    <View className="flex-1 items-center justify-center bg-white ">
      <View className="absolute bottom-[-100] right-20 w-full h-2/5 bg-[#9bc4fa] rounded-full" />
      <View className="absolute bottom-10 left-[-200] w-full h-2/5 bg-green-200 rounded-full" />
      <Text className="text-4xl font-bold mb-12 text-black">
        {`Welcome ${isAdmin ? "Admin" : "User"}`}
      </Text>
      <View className="w-4/5">
        <TextInput
          className="border-b border-black mb-5 text-lg text-black"
          placeholder="Username"
          onChangeText={(text) => setUserName(text)}
          value={userName}
        />
        <TextInput
          className="border-b border-black mb-5 text-lg text-black"
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
      </View>
      <TouchableOpacity
        className="bg-black py-4 px-9 rounded-full mt-5"
        onPress={onLogin}
      >
        <Text className="text-white text-xl font-bold">Log in</Text>
      </TouchableOpacity>
      <Text className="mt-5 text-black">Forgotten Password?</Text>
      <View className="flex flex-row gap-4 mt-3">
        <Entypo name="facebook-with-circle" size={32} color="black" />
        <AntDesign name="google" size={32} color="black" />
        <Entypo name="twitter-with-circle" size={32} color="black" />
      </View>
      <TouchableOpacity onPress={() => setIsAdmin(!isAdmin)}>
        <Text className="mt-5 text-black font-bold">{`Or Login as a ${
          isAdmin ? "User" : "Admin"
        }`}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
