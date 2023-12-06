import { View } from "react-native";
import React from "react";

const Skeleton = () => {
  return (
    <View className="justify-center items-center p-4 gap-4">
      <View className="w-[100%] h-32 bg-[#a8a8a8] rounded-xl"></View>
      <View className="w-[100%] h-32 bg-[#a8a8a8] rounded-xl"></View>
      <View className="w-[100%] h-32 bg-[#a8a8a8] rounded-xl"></View>
      <View className="w-[100%] h-32 bg-[#a8a8a8] rounded-xl"></View>
      <View className="w-[100%] h-32 bg-[#a8a8a8] rounded-xl"></View>
    </View>
  );
};

export default Skeleton;
