import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart, clearCart } from "../redux/actions";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleBuy = () => {
    if (cartItems.length === 0) {
      ToastAndroid.showWithGravity(
        "Cart is Empty",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      return;
    }
    dispatch(clearCart());
    ToastAndroid.showWithGravity(
      "Purchase Successful",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
    navigation.goBack();
  };
  const handleAddItem = (item) => {
    dispatch(addToCart(item));
  };

  const handleRemoveItem = (item) => {
    dispatch(removeFromCart(item));
  };
  const groupCartItems = () => {
    const groupedItems = {};

    cartItems.forEach((item) => {
      if (groupedItems[item.id]) {
        groupedItems[item.id].count += 1;
      } else {
        groupedItems[item.id] = { ...item, count: 1 };
      }
    });

    return Object.values(groupedItems);
  };

  const groupedItems = groupCartItems();

  const calculateTotal = () => {
    return groupedItems.reduce(
      (total, item) => total + item.price * item.count,
      0
    );
  };

  const renderItem = ({ item }) => (
    <View className="m-4 p-3 border border-gray-400 rounded-lg flex-row justify-between items-center">
      <Image source={{ uri: item.imageUrl }} className="w-16 h-16 rounded-lg" />
      <View>
        <Text className="text-lg">{item.name}</Text>
        <Text>Price: ₹{item.price}</Text>
      </View>
      <View className="flex-row items-center">
        <TouchableOpacity onPress={() => handleRemoveItem(item)}>
          <AntDesign name="minuscircleo" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg mx-2">{item.count}</Text>
        <TouchableOpacity onPress={() => handleAddItem(item)}>
          <AntDesign name="pluscircleo" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <View className="flex-1 p-4">
      <FlatList
        data={groupedItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <View className="flex-row justify-between items-center">
        <View className="flex-col">
          <Text className="text-lg font-normal">Total: </Text>
          <Text className="text-xl font-semibold">₹{calculateTotal()}</Text>
        </View>
        <View className="flex-1 flex-col justify-center items-center">
          <TouchableOpacity
            onPress={handleBuy}
            className="bg-blue-500 p-3 rounded-xl mt-3 w-[90%]"
          >
            <Text className="text-white text-xl text-center font-semibold">
              Buy
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartPage;
