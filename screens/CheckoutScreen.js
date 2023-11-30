import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Modal,
  Pressable,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import CheckBox from "expo-checkbox";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  decrementQuantiy,
  incrementQuantity,
  removeFromCart,
} from "../redux/Slices/cartSlice";

import { AntDesign } from "@expo/vector-icons";
import { Defs, Path, Pattern, Rect, Svg, Use } from "react-native-svg";
import { SelectList } from "react-native-dropdown-select-list";
import { auth, db } from "../firebaseConfig";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";

const CheckoutScreen = ({
  route,
  navigation,
  isVisible,
  onClose,
  onSelectPaymentMethod,
}) => {
  const [selectedAddress, setSelectedAddress] = useState("");

  const [selectedMethod, setSelectedMethod] = useState(null);
  // const { addressItem } = route.params;

  const paymentMethods = [
    {
      id: "mtn",
      name: "MTN Mobile Money",
      process: "18******565",
      url: require("../assets/image/mtn.png"),
    },
    {
      id: "airtel",
      name: "Airtel Money",
      process: "18******565",
      url: require("../assets/image/airtel.png"),
    },
  ];
  const [address, setAddress] = useState("");

  // const addAddress = async () => {
  //   const currentUserUid = auth.currentUser.uid;

  //   // Create a query to find the user document with the matching UID
  //   const q = query(
  //     collection(db, "users"),
  //     where("uid", "==", currentUserUid)
  //   );

  //   // Execute the query
  //   const querySnapshot = await getDocs(q);

  //   // Check if a matching document is found
  //   if (!querySnapshot.empty) {
  //     // Get the first document from the result (assuming UID is unique)
  //     const userDocument = querySnapshot.docs[0];

  //     // Retrieve the user document data
  //     const userData = (await getDoc(userDocument.ref)).data();

  //     setAddress(userData.address);
  //     console.log("User Data:", userData);

  //     try {
  //       if (!address || address.trim() === "") {
  //         setModalcheckout(!modalcheckout);
  //       } else {
  //         setModalcheckout(true);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // };
  useEffect(() => {
    const fetchData = async () => {
      // Get the current user
      const currentUser = auth.currentUser;

      // Create a reference to the 'users' collection
      const usersCollection = collection(db, "users");

      // Create a query to get documents where the 'uid' field is equal to the current user's UID
      const q = query(usersCollection, where("uid", "==", currentUser.uid));

      try {
        // Execute the query
        const querySnapshot = await getDocs(q);

        // Iterate through the documents
        querySnapshot.forEach((doc) => {
          setAddress(doc.data().address);

          // Handle the data as needed
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error
      }
    };

    fetchData();
  }, []);

  const handleCheckModal = () => {
    try {
      const user = auth.currentUser;
      if (!address) {
        alert("Please add an address before proceeding.");
        // setModalcheckout(!modalcheckout);
        navigation.navigate("address");
      } else if (user != null) {
        setModalcheckout(true);
      } else {
        navigation.navigate("login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePaymentMethodSelect = (method) => {
    setSelectedMethod(method);
    setModalcheckout(!modalcheckout);
    navigation.navigate("confirm", { paymentMethod: method });
  };
  const cart = useSelector((state) => state.cart.cart);
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  const dispatch = useDispatch();
  const [isChecked, setChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalcheckout, setModalcheckout] = useState(false);

  const ChangeAddress = () => {
    navigation.navigate("checkout");
    setModalVisible(!modalVisible);
  };

  const checkout = () => {
    navigation.navigate("order");
    setModalcheckout(!modalcheckout);
  };
  const [selected, setSelected] = useState("");
  const data = [
    { key: "1", value: "Mobiles", disabled: true },
    { key: "2", value: "Appliances" },
    { key: "3", value: "Cameras" },
    { key: "4", value: "Computers", disabled: true },
    { key: "5", value: "Vegetables" },
    { key: "6", value: "Diary Products" },
    { key: "7", value: "Drinks" },
  ];
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <View style={{ gap: 15, paddingTop: 38 }}>
        <View style={{ gap: 30, paddingHorizontal: 24, paddingBottom: 20 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
            <Text style={{ fontSize: 20, fontWeight: "700" }}>checkout</Text>
            <Text></Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: 24 }}>
          {cart.slice(0, 3).map((item, index) => (
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
                <Text
                  style={{ fontSize: 16, fontWeight: "300", color: "#000" }}
                >
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
        <View style={{ paddingHorizontal: 24 }}>
          <View style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <Text style={{ fontSize: 16, color: "#878080", fontSize: 16 }}>
              Delivery address
            </Text>
            <View
              style={{
                backgroundColor: "lightgray",
                padding: 18,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text>
                {address.district}, {address.zone}, {address.street}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("address")}>
                <Text
                  style={{
                    alignSelf: "center",
                    justifyContent: "center",
                    paddingTop: 2,
                    color: "#FFB648",
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  Change
                </Text>
              </TouchableOpacity>

              {/* <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <Text>This is a pop-up modal</Text>

                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                        paddingBottom: 15,
                      }}
                    >
                      <Text
                        style={{ fontSize: 16, color: "#000", fontWeight: "400" }}
                      >
                        Password
                      </Text>
                      <View
                        style={{
                          height: 60,
                          backgroundColor: "#EAE6E6",
                          padding: 10,

                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <TextInput
                          placeholder="Create Password"
                          placeholderTextColor="black"
                          style={{
                            backgroundColor: "transparent",
                            width: "80%",
                          }}
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                        paddingBottom: 15,
                      }}
                    >
                      <Text
                        style={{ fontSize: 16, color: "#000", fontWeight: "400" }}
                      >
                        Password
                      </Text>
                      <View
                        style={{
                          height: 60,
                          backgroundColor: "#EAE6E6",
                          padding: 10,

                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <TextInput
                          placeholder="Create Password"
                          placeholderTextColor="black"
                          style={{
                            backgroundColor: "transparent",
                            width: "80%",
                            height: "100%",
                          }}
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                        paddingBottom: 15,
                      }}
                    >
                      <Text
                        style={{ fontSize: 16, color: "#000", fontWeight: 400 }}
                      >
                        Password
                      </Text>
                      <View
                        style={{
                          height: 60,
                          backgroundColor: "#EAE6E6",
                          padding: 10,

                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <TextInput
                          placeholder="Create Password"
                          placeholderTextColor="black"
                          style={{
                            backgroundColor: "transparent",
                            width: "80%",
                            height: "100%",
                          }}
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                        paddingBottom: 15,
                      }}
                    >
                      <Text
                        style={{ fontSize: 16, color: "#000", fontWeight: "400" }}
                      >
                        Password
                      </Text>
                      <View
                        style={{
                          height: 60,
                          backgroundColor: "#EAE6E6",
                          padding: 10,

                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <TextInput
                          placeholder="Create Password"
                          placeholderTextColor="black"
                          style={{
                            backgroundColor: "transparent",
                            width: "80%",
                            height: "100%",
                          }}
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                        paddingBottom: 15,
                      }}
                    >
                      <Text
                        style={{ fontSize: 16, color: "#000", fontWeight: 400 }}
                      >
                        Password
                      </Text>
                      <View
                        style={{
                          height: 60,
                          backgroundColor: "#EAE6E6",
                          padding: 10,

                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <TextInput
                          placeholder="Create Password"
                          placeholderTextColor="black"
                          style={{
                            backgroundColor: "transparent",
                            width: "80%",
                            height: "100%",
                          }}
                        />
                      </View>
                    </View>
                    <Button title="Close Modal" onPress={ChangeAddress} />
                  </View>
                </View>
              </Modal> */}
            </View>
          </View>
        </View>

        {/* discount */}
      </View>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          bottom: 15,
          position: "absolute",
          gap: 10,
        }}
      >
        <View
          style={{
            paddingHorizontal: 24,
            gap: 16,
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 16, color: "#9c9c9c" }}>
              Product Price
            </Text>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Text style={{ fontSize: 18 }}>12000</Text>
              <Text
                style={{
                  color: "#696969",
                  fontSize: 12,
                  alignSelf: "flex-end",
                }}
              >
                Rwf
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 24,
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 16, color: "#9c9c9c" }}>
              Delivery price
            </Text>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Text style={{ fontSize: 18 }}>1000</Text>
              <Text
                style={{
                  color: "#696969",
                  fontSize: 12,
                  alignSelf: "flex-end",
                }}
              >
                Rwf
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 24,
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 16, fontWeight: "500", color: "#000" }}>
              Total Price
            </Text>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Text style={{ fontSize: 18 }}>${calculateTotalAmount()}</Text>
              <Text
                style={{
                  color: "#696969",
                  fontSize: 12,
                  alignSelf: "flex-end",
                }}
              >
                Rwf
              </Text>
            </View>
          </View>
        </View>
        <View style={{ width: "100%", height: 55, paddingHorizontal: 24 }}>
          <TouchableOpacity
            onPress={() => setModalcheckout(true)}
            style={{
              backgroundColor: "#FFB648",
              height: 55,
              justifyContent: "center",
            }}
          >
            <Text style={{ textAlign: "center", color: "white", fontSize: 16 }}>
              Chek it Out
            </Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            onBackdropPress={onClose}
            visible={modalcheckout}
            onRequestClose={onClose}
          >
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
                  <Text style={styles.title}>Select Payment Method</Text>

                  {paymentMethods.map((method) => (
                    <TouchableOpacity
                      key={method.id}
                      style={[
                        styles.paymentMethod,
                        selectedMethod === method && styles.selectedMethod,
                      ]}
                      onPress={() => handlePaymentMethodSelect(method.name)}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          gap: 20,
                          alignItems: "center",
                        }}
                      >
                        <Image source={method.url} />
                        <View>
                          <Text style={{}}>{method.name}</Text>
                          <Text style={{}}>{method.process}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  checkboxTit: {
    color: "#000",

    marginHorizontal: 1,
    padding: 0.2,
    borderColor: "black",
    borderWidth: 1,

    borderRadius: 4,
  },
  checkbox: {
    color: "#000",

    marginHorizontal: 1,
    padding: 0.2,
    borderColor: "black",
    borderWidth: 1,
    marginTop: 43,
    borderRadius: 4,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 16,
    fontWeight: "medium",
    marginBottom: 28,
  },
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#fafafa",
    backgroundColor: "#fafafa",
    width: "100%",
    height: 76,
  },
  selectedMethod: {
    backgroundColor: "#e6f7ff",
    borderColor: "#ffb567",
  },

  closeButton: {
    marginTop: 10,
    backgroundColor: "#e6e6e6",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    fontWeight: "bold",
  },
});
// const CheckoutScreen = () => {
//   const [isModalVisible, setModalVisible] = useState(false);

//   const toggleModal = () => {
//     setModalVisible(!isModalVisible);
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Show Modal" onPress={toggleModal} />

//       <Modal
//         animationType="slide" // You can use 'fade', 'slide', or 'none'
//         transparent={true}
//         visible={isModalVisible}
//         onRequestClose={toggleModal} // Android back button support
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text>This is a pop-up modal</Text>
//             <Button title="Close Modal" onPress={toggleModal} />
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   modalContent: {
//     width: 300,
//     backgroundColor: "white",
//     padding: 20,
//     borderRadius: 10,
//   },
// });

export default CheckoutScreen;
