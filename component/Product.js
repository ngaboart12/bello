import { View, Text, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/Slices/cartSlice";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { AntDesign } from "@expo/vector-icons";
import { Path, Svg } from "react-native-svg";

import {
  addToWishlist,
  removeFromWishlist,
  selectWishlist,
} from "../redux/Slices/wishSlice";

const Product = (props) => {
  const navigation = useNavigation();

  const { name, url, price, id } = props.data;
  const dispatch = useDispatch();

  const addItemToCart = (item) => {
    dispatch(addToCart(item));
  };
  const [Fontsloaded] = useFonts({
    indieflower: require("../assets/fonts/IndieFlower-Regular.ttf"),
    outfit: require("../assets/fonts/NotoSansNKoUnjoined-VariableFont_wght.ttf"),
  });
  if (!Fontsloaded) {
    return undefined;
  }

  const { product } = props.data;
  // const wishlist = useSelector(selectWishlist);

  const addToWishlistHandler = (item) => {
    dispatch(addToWishlist(item));
  };

  // const removeFromWishlistHandler = (item) => {
  //   dispatch(removeFromWishlist(item));
  // };

  // {wishlist.some(item => item.id === product.id) ? (
  //   <Button
  //     title="Remove from Wishlist"
  //     onPress={removeFromWishlistHandler}
  //   />
  // ) : (
  //   <Button
  //     title="Add to Wishlist"
  //     onPress={addToWishlistHandler}
  //   />

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("single", { id })}
      style={{
        width: 150,
        minHeight: 200,
        marginRight: 20,
        marginTop: 10,
        backgroundColor: "#f4f4f4",
      }}
    >
      <TouchableOpacity
        style={{ marginLeft: "auto", paddingRight: 6, paddingTop: 9 }}
        onPress={() => addToWishlistHandler(props.data)}
      >
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width="17"
          height="17"
          viewBox="0 0 14 14"
          fill="none"
        >
          <Path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6.99902 0.745991C8.11094 0.00798182 9.58802 -0.195904 10.8641 0.233405C13.6397 1.17315 14.5014 4.34989 13.7307 6.87764C12.5415 10.8477 7.46266 13.809 7.24725 13.9332C7.17067 13.9777 7.08587 14 7.00107 14C6.91628 14 6.83217 13.9785 6.75558 13.9347C6.54154 13.8119 1.49962 10.8943 0.270769 6.87836C0.270085 6.87836 0.270085 6.87764 0.270085 6.87764C-0.501281 4.34917 0.357616 1.17171 3.13057 0.233405C4.43259 -0.208826 5.85155 -0.0142733 6.99902 0.745991ZM3.44513 1.25858C1.20147 2.01812 0.637989 4.55162 1.24729 6.54956C2.20602 9.68107 5.99378 12.2131 7.00039 12.8399C8.01041 12.2067 11.8255 9.64661 12.7535 6.55243C13.3628 4.55234 12.7973 2.01884 10.5502 1.25858C9.46151 0.891726 8.19163 1.115 7.31495 1.82716C7.13169 1.97505 6.8773 1.97792 6.69266 1.83147C5.76402 1.09848 4.55089 0.883829 3.44513 1.25858ZM9.8937 2.68427C10.8258 3.00087 11.4788 3.86738 11.5588 4.89184C11.5814 5.18833 11.3715 5.44821 11.089 5.4719C11.0747 5.47334 11.061 5.47406 11.0466 5.47406C10.782 5.47406 10.5577 5.26084 10.5358 4.97942C10.4907 4.3893 10.1146 3.89107 9.57913 3.70944C9.30902 3.61755 9.16131 3.31387 9.24816 3.03174C9.33637 2.74888 9.6229 2.59525 9.8937 2.68427Z"
            fill="#8E8D8D"
          />
        </Svg>
      </TouchableOpacity>
      <View style={{ width: 150, height: 140 }}>
        <Image
          source={{ uri: url }}
          style={{ width: "100%", height: 140, objectFit: "contain" }}
        />
      </View>
      <View
        style={{
          width: "100%",
          padding: 6,
          gap: 5,
          marginRight: 15,
        }}
      >
        <Text style={{ fontFamily: "outfit", fontSize: 16 }}>{name}</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",

            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontFamily: "outfit", fontSize: 18, fontWeight: 600 }}>
            ${price}
          </Text>
          <TouchableOpacity onPress={() => addItemToCart(props.data)}>
            <AntDesign name="pluscircle" size={24} color="orange" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Product;
