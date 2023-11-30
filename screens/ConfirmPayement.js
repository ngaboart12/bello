import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
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
import { Path, Svg } from "react-native-svg";

const ConfirmPayment = ({ navigation, route }) => {
  const { paymentMethod } = route.params;

  const cart = useSelector((state) => state.cart.cart);
  const [modalcheckout, setModalcheckout] = useState(true);
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
        navigation.navigate("ordercompleted");
        setModalcheckout(!modalcheckout);

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
    <View
      style={{
        backgroundColor: "fff",
        height: "100%",
        paddingHorizontal: 24,
        paddingTop: 35,
        gap: 20,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Svg
            width="10"
            height="16"
            viewBox="0 0 10 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M9.03033 0.46967C9.2966 0.735936 9.3208 1.1526 9.10295 1.44621L9.03033 1.53033L2.561 8L9.03033 14.4697C9.2966 14.7359 9.3208 15.1526 9.10295 15.4462L9.03033 15.5303C8.76406 15.7966 8.3474 15.8208 8.05379 15.6029L7.96967 15.5303L0.96967 8.53033C0.703403 8.26406 0.679197 7.8474 0.897052 7.55379L0.96967 7.46967L7.96967 0.46967C8.26256 0.176777 8.73744 0.176777 9.03033 0.46967Z"
              fill="black"
            />
          </Svg>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "700" }}>{paymentMethod}</Text>
        <Text></Text>
      </View>
      <View style={{ paddingTop: 15 }}>
        {cart.map((item, index) => (
          <View
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
              marginBottom: 17,
            }}
          >
            <View style={{ flexDirection: "row", gap: 10, height: 100 }}>
              <Image
                source={{ uri: `${item.url}` }}
                style={{ width: 100, height: 100 }}
              />
            </View>
            <View
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: 6,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "300", color: "#000" }}>
                hhhh
              </Text>

              <Text
                style={{ fontSize: 14, fontWeight: "500", color: "#696969" }}
              >
                {item.price} Rwf
              </Text>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 34,
                }}
              >
                <Text>Instock:{item.countInStock}</Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 10,
                  }}
                >
                  <Text>color</Text>
                  <Text
                    style={{
                      height: 20,
                      width: 20,
                      borderRadius: 4,
                      borderColor: "#000",
                      padding: 0.2,
                      borderColor: "black",
                      borderWidth: 1,
                      backgroundColor: "yellow",
                    }}
                  ></Text>
                  <Text
                    style={{
                      height: 20,
                      width: 20,
                      borderRadius: 4,
                      borderColor: "#000",
                      padding: 0.2,
                      borderColor: "black",
                      borderWidth: 1,
                      backgroundColor: "gray",
                    }}
                  ></Text>
                </View>
              </View>
            </View>
          </View>
        ))}
        <Text
          style={{
            alignSelf: "flex-end",
            paddingHorizontal: 20,
            color: "#FFB648",
            fontSize: 14,
          }}
        >
          viel all
        </Text>
      </View>

      <Modal animationType="slide" transparent={true} visible={modalcheckout}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text
              style={{
                width: 78,
                height: 4,
                borderRadius: 100,
                backgroundColor: "#a6a6a6",
                alignSelf: "center",
              }}
            ></Text>
            <View style={styles.container}>
              <View style={{}}>
                <View style={{ gap: 24, padding: 24 }}>
                  <Image
                    style={{
                      height: 36,
                      width: 55,
                      justifyContent: "center",
                      alignSelf: "center",
                    }}
                    source={
                      paymentMethod !== "Airtel Money"
                        ? require("../assets/image/mtn.png")
                        : require("../assets/image/airtel.png")
                    }
                  />
                  <Text
                    style={{
                      alignSelf: "center",
                      fontWeight: 500,
                      fontSize: 16,
                    }}
                  >
                    {paymentMethod}
                  </Text>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        paddingHorizontal: 35,
                        textAlign: "center",
                        color: "#696969",
                      }}
                    >
                      Please use Mobile USSD through your phone to pay
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: "100%",
                    height: 111,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#fff8ed",
                    marginBottom: 28,
                    gap: 5,
                    paddingVertical: 16,
                  }}
                >
                  {paymentMethod !== "Airtel Money" ? (
                    <>
                      <Text style={{ fontSize: 18, fontWeight: "medium" }}>
                        *182*8*1#
                      </Text>
                      <Text style={{ fontSize: 18, fontWeight: "medium" }}>
                        code
                      </Text>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "medium",
                          color: "#ffb547",
                        }}
                      >
                        *181814*
                      </Text>
                    </>
                  ) : (
                    <>
                      <Text style={{ fontSize: 18, fontWeight: "medium" }}>
                        *500*4#
                      </Text>
                      <Text style={{ fontSize: 18, fontWeight: "medium" }}>
                        code
                      </Text>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "medium",
                          color: "#ffb547",
                        }}
                      >
                        *585858*
                      </Text>
                    </>
                  )}
                </View>
                <View style={{ width: "100%", height: 55 }}>
                  <TouchableOpacity
                    onPress={addOrderToFirestore}
                    style={{
                      backgroundColor: "#FFB648",
                      height: 55,
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: "white",
                        fontSize: 16,
                      }}
                    >
                      Pay Now
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    gap: 8,
  },
  modalContent: {
    width: "100%",
    backgroundColor: "white",
    padding: 24,

    position: "absolute",
    bottom: 0,
  },
});

export default ConfirmPayment;
