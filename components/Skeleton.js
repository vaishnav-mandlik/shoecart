import { View } from "react-native";
import React from "react";

export const AdminSkeleton = () => {
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

export const CartSkeleton = () => {
  return (
    <View className=" justify-center items-center p-4 gap-4">
      <View className="flex flex-row ">
        <View className="w-[44%] h-52 bg-[#a8a8a8] rounded-xl"></View>
        <View className="w-[44%] h-52 bg-[#a8a8a8] rounded-xl ml-4"></View>
      </View>
      <View className="flex flex-row ">
        <View className="w-[44%] h-52 bg-[#a8a8a8] rounded-xl"></View>
        <View className="w-[44%] h-52 bg-[#a8a8a8] rounded-xl ml-4"></View>
      </View>
      <View className="flex flex-row ">
        <View className="w-[44%] h-52 bg-[#a8a8a8] rounded-xl"></View>
        <View className="w-[44%] h-52 bg-[#a8a8a8] rounded-xl ml-4"></View>
      </View>
    </View>
  );
};
