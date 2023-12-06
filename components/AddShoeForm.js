import React, { useState } from "react";
import {
  Text,
  TextInput,
  ToastAndroid,
  View,
  TouchableOpacity,
} from "react-native";
import { collection, addDoc } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useNavigation } from "@react-navigation/native";

const AddShoeForm = ({ route }) => {
  const { onAddShoe } = route.params;
  const navigation = useNavigation();
  const [shoeName, setShoeName] = useState("");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (image) => {
    try {
      if (!image) return null;
      const response = await fetch(image);
      const theBlob = await response.blob();
      const fileRef = ref(storage, `shoes/${new Date().getTime()}`);
      await uploadBytesResumable(fileRef, theBlob);
      return getDownloadURL(fileRef);
    } catch (error) {
      ToastAndroid.showWithGravity(
        "Error while uploading image",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        const { uri } = result.assets[0];
        setImage(uri);
      }
    } catch (error) {
      ToastAndroid.showWithGravity(
        "Error while picking image",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  };

  const handleSubmit = async () => {
    setUploading(true);
    const imageUrl = await uploadImage(image);
    if (!imageUrl || !shoeName || !price || !sizes) {
      ToastAndroid.showWithGravity(
        "Please fill all the fields",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      return;
    }
    try {
      await addDoc(collection(db, "shoes"), {
        name: shoeName,
        price: parseFloat(price),
        sizes: sizes.split(",").map((size) => size.trim()),
        imageUrl,
      });
      ToastAndroid.showWithGravity(
        "Shoe added successfully",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      onAddShoe && onAddShoe();
      navigation.goBack();
    } catch (error) {
      ToastAndroid.showWithGravity(
        "Error while adding shoe",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
    setUploading(false);
    setShoeName("");
    setPrice("");
    setSizes("");
    setImage(null);
  };

  return (
    <View className="flex-1 p-4">
      <View className="mb-4 gap-2">
        <View>
          <Text className="text-md font-normal">Brand Name:</Text>
          <TextInput
            value={shoeName}
            onChangeText={setShoeName}
            className="border border-gray-400 mb-2 rounded-xl p-2"
            placeholder="Enter shoe brand name"
          />
        </View>
        <View>
          <Text className="text-md font-normal">Price:</Text>
          <TextInput
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            className="border border-gray-400 mb-2 rounded-xl p-2"
            placeholder="Enter shoe price"
          />
        </View>
        <View>
          <Text>Sizes (comma separated):</Text>
          <TextInput
            value={sizes}
            onChangeText={setSizes}
            className="border border-gray-400 mb-2 rounded-xl p-2"
            placeholder="Enter shoe sizes (comma separated)"
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={pickImage}
        className="bg-blue-500 p-2 rounded-xl"
      >
        <Text className="text-white text-center font-bold p-1">
          Upload an image
        </Text>
      </TouchableOpacity>
      {image && <Text>Image selected</Text>}
      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-blue-500 p-2 rounded-xl mt-3"
        disabled={uploading}
      >
        <Text className="text-white text-center font-bold p-1 ">
          {uploading ? "Uploading..." : "Add Shoe"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddShoeForm;
