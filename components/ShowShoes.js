import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Skeleton from "./Skeleton";

const ShowShoes = () => {
  const [shoes, setShoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  useEffect(() => {
    fetchShoes();
  }, []);

  const fetchShoes = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, "shoes"));
    const shoesData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setShoes(shoesData);
    setLoading(false);
  };

  const refreshShoes = () => {
    fetchShoes();
  };

  const deleteShoe = async (id) => {
    await deleteDoc(doc(db, "shoes", id));
    setShoes(shoes.filter((shoe) => shoe.id !== id));
  };

  if (loading) {
    return (
      <View className="flex-1 ">
        <Skeleton />
      </View>
    );
  }

  if (shoes.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>404 No shoes found</Text>
        <Text> Click on the + icon to add a shoe</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 border border-black">
      <FlatList
        data={shoes}
        renderItem={({ item }) => (
          <View className="flex flex-row border p-3 m-3 rounded-2xl border-gray-400">
            <View className="mr-5 rounded-xl overflow-hidden">
              {item.imageUrl && (
                <Image
                  source={{ uri: item.imageUrl }}
                  style={{ width: 100, height: 100 }}
                />
              )}
            </View>
            <View>
              <View className="flex flex-row">
                <Text className="text-base font-medium">Brand: </Text>
                <Text className="text-base font-normal text-gray-800">
                  {item.name}
                </Text>
              </View>
              <View className="flex flex-row">
                <Text className="text-base font-medium">Cost: </Text>
                <Text className="text-base font-normal text-gray-800">
                  ₹{item.price}
                </Text>
              </View>
              <View className="flex flex-row">
                <Text className="text-base font-medium">Sizes: </Text>
                <Text className="text-base font-normal text-gray-800">
                  {item.sizes ? item.sizes.join(", ") : "N/A"}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => deleteShoe(item.id)}
              className="absolute right-3 top-3"
            >
              <MaterialIcons name="delete" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity
        className="absolute bottom-6 right-6"
        onPress={() =>
          navigation.navigate("AddShoeForm", { onAddShoe: refreshShoes })
        }
      >
        <AntDesign name="pluscircle" size={50} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default ShowShoes;
