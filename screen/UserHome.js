import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { addToCart } from "../redux/actions";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { CartSkeleton } from "../components/Skeleton";

const UserHome = () => {
  const [shoes, setShoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    const fetchShoes = async () => {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "shoes"));
      setShoes(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      setLoading(false);
    };

    fetchShoes();
  }, []);

  const handleAddToCart = (shoe) => {
    dispatch(addToCart(shoe));
  };
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemsCount = cartItems.length;

  const CartCount = () => {
    return (
      <TouchableOpacity
        className="flex flex-row absolute bottom-5 left-[25%] bg-gray-300 p-4 w-[50%] rounded-2xl justify-evenly items-center"
        onPress={() => navigation.navigate("CartPage")}
      >
        <Text className="text-center">Items in Cart: {cartItemsCount}</Text>
        <AntDesign name="rightcircleo" size={24} color="black" />
      </TouchableOpacity>
    );
  };

  const itemDesing = () => {
    if (shoes.length === 1)
      return "p-2 border border-gray-400 rounded-lg w-full justify-center items-center";
    return "p-3 my-2 mx-2 border border-gray-400 rounded-lg w-[45%] justify-center items-center";
  };

  const renderItem = ({ item }) => (
    // <View className=>
    <View className={itemDesing()}>
      <Image
        source={{ uri: item.imageUrl }}
        className="w-[100%] h-32 rounded-lg"
      />
      <Text className="text-lg font-bold">{item.name}</Text>
      <Text>Price: ₹{item.price}</Text>
      <Text>Sizes: {item.sizes.join(", ")}</Text>
      <TouchableOpacity
        onPress={() => handleAddToCart(item)}
        className="mt-2 bg-blue-500 p-2 rounded w-full"
      >
        <Text className="text-white text-center">Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View className="flex-1 ">
        <CartSkeleton />
      </View>
    );
  }

  if (shoes.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>out of stock</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center w-full ">
      <FlatList
        data={shoes}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      {cartItemsCount > 0 && <CartCount />}
    </View>
  );
};

export default UserHome;
