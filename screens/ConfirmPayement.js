import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  onSnapshot,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import { updateCart } from "../redux/Slices/cartSlice";
import { auth, db } from "../firebaseConfig";

const ConfirmPayment = ({ navigation, route }) => {
  const { paymentMethod } = route.params;

  const cart = useSelector((state) => state.cart.cart);

  const renderCartItem = (item, index) => (
    <View key={index} style={styles.cartItem}>
      <Text style={styles.cartItemName}>{item.name}</Text>
      <Text style={styles.cartItemPrice}>{item.price} Rwf</Text>
    </View>
  );
  const dispatch = useDispatch();

  const addOrderToFirestore = async () => {
    const currentUserUid = auth.currentUser.uid;
    const status = "pending";

    // Create a query to find the user document with the matching UID
    const q = query(
      collection(db, "users"),
      where("uid", "==", currentUserUid)
    );

    // Execute the query
    const querySnapshot = await getDocs(q);

    // Check if a matching document is found
    if (!querySnapshot.empty) {
      // Get the first document from the result (assuming UID is unique)
      const userDocument = querySnapshot.docs[0];

      // Retrieve the user document data
      const userData = (await getDoc(userDocument.ref)).data();

      console.log("User Data:", userData);

      try {
        const orderData = {
          paymentMethod,
          personInfo: {
            customerName: userData.username,
            customerEmail: userData.email,
          },
          customerUid: userData.uid,
          address: userData.address,

          cart,
          status,
          // Add any other relevant order data
        };

        await addDoc(collection(db, "orders"), orderData);
        dispatch(updateCart([]));
        navigation.navigate("order");

        console.log("Order data added to Firestore successfully!");
      } catch (error) {
        console.error("Error adding order data to Firestore:", error);
      }
    } else {
      console.log("No matching user document found");
      return null; // or handle accordingly
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{paymentMethod}</Text>
      </View>

      <View style={styles.cartContainer}>{cart.map(renderCartItem)}</View>

      <View style={styles.paymentCodeContainer}>
        <Text style={styles.paymentCodeLabel}>Payment Code: 2490562</Text>
      </View>

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={addOrderToFirestore}
      >
        <Text style={styles.confirmButtonText}>Confirm Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#FFB648",
    paddingVertical: 16,
    paddingTop: 30,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    fontFamily: "Outfit",
    fontWeight: "100",
  },
  cartContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: "600",
  },
  cartItemPrice: {
    fontSize: 16,
    color: "#696969",
  },
  paymentCodeContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  paymentCodeLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  paymentCode: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFB648",
  },
  confirmButton: {
    backgroundColor: "#FFB648",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 24,
    borderRadius: 8,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  generateCodeButton: {
    backgroundColor: "#EAE6E6",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
  },
  generateCodeButtonText: {
    color: "#696969",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ConfirmPayment;
