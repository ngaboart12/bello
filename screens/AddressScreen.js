// AddressScreen.js

import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../redux/Slices/addressSlice";
import { auth, db } from "../firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { ScrollView } from "react-native-gesture-handler";

const addressesData = [
  { id: "1", address: "123 Main St" },
  { id: "2", address: "456 Oak Ave" },
  { id: "3", address: "789 Pine Blvd" },
];

const AddressScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [street, setStreet] = useState("");
  const [zone, setZone] = useState("");
  const [cityError, setCityError] = useState(null);
  const [districtError, setDistrictError] = useState(null);
  const [streetError, setStreetError] = useState(null);
  const [zoneError, setZoneError] = useState(null);

  const [addresses, setAddresses] = useState(addressesData);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newAddress, setNewAddress] = useState("");

  const updateAddressForCurrentUser = async () => {
    const userId = auth.currentUser.uid;
    const newAddress = {
      city: city,
      district: district,
      street: street,
      zone: zone,
    };

    if (
      city.trim() === "" ||
      district.trim() === "" ||
      street.trim() === "" ||
      zone.trim() === ""
    ) {
      setCityError(city.trim() === "" ? "City required." : null);
      setDistrictError(district.trim() === "" ? "District required." : null);
      setStreetError(street.trim() === "" ? "Street required." : null);
      setZoneError(zone.trim() === "" ? "Zone required." : null);
      return; // Stop execution if any input is empty
    }

    try {
      // Reference to the users collection in Firestore
      const usersCollectionRef = collection(db, "users");

      // Create a query to find documents where uid is equal to currentUserUid
      const usersQuery = query(usersCollectionRef, where("uid", "==", userId));

      // Get the documents that match the query
      const usersSnapshot = await getDocs(usersQuery);

      // Update each matching document with the new address
      usersSnapshot.forEach(async (userDoc) => {
        const userDocRef = doc(db, "users", userDoc.id);
        await updateDoc(userDocRef, {
          address: newAddress,
        });
      });
      navigation.navigate("checkout");
      console.log("Addresses updated successfully");
    } catch (error) {
      console.error("Error updating addresses:", error);
    }
  };

  const addAddressItem = (data) => {
    dispatch(addAddress(data));
    setNewAddress("");
    toggleModal();
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 24,
        paddingHorizontal: 24,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "97%",
        marginVertical: 10,
      }}
    >
      <ScrollView>
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 600 }}>
            Add your delivery address
          </Text>
        </View>
        <View style={{ gap: 10 }}>
          <Text style={{ fontSize: 16, color: "#000", fontWeight: "400" }}>
            City
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
              placeholder="City"
              placeholderTextColor="black"
              style={{
                backgroundColor: "transparent",
                width: "100%",
              }}
              onChangeText={(inputCityText) => setCity(inputCityText)}
              value={city}
            />
          </View>
          {!!cityError && <Text style={styles.errorText}>{cityError}</Text>}
        </View>
        <View style={{ gap: 10 }}>
          <Text style={{ fontSize: 16, color: "#000", fontWeight: "400" }}>
            District
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
              placeholder="District"
              placeholderTextColor="black"
              style={{
                backgroundColor: "transparent",
                width: "100%",
              }}
              onChangeText={(inputDistrictText) =>
                setDistrict(inputDistrictText)
              }
              value={district}
            />
          </View>
          {!!districtError && (
            <Text style={styles.errorText}>{districtError}</Text>
          )}
        </View>
        <View style={{ gap: 10 }}>
          <Text style={{ fontSize: 16, color: "#000", fontWeight: "400" }}>
            street
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
              placeholder="Street or house no"
              placeholderTextColor="black"
              style={{
                backgroundColor: "transparent",
                width: "100%",
              }}
              onChangeText={(inputStreetText) => setStreet(inputStreetText)}
              value={street}
              returnKeyType="next"
            />
          </View>
          {!!streetError && <Text style={styles.errorText}>{streetError}</Text>}
        </View>
        <View style={{ gap: 10 }}>
          <Text style={{ fontSize: 16, color: "#000", fontWeight: "400" }}>
            Zone
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
              placeholder="Zone"
              placeholderTextColor="black"
              style={{
                backgroundColor: "transparent",
                width: "100%",
              }}
              onChangeText={(inputZoneText) => setZone(inputZoneText)}
              value={zone}
              returnKeyType="send"
            />
          </View>
          {!!zoneError && <Text style={styles.errorText}>{zoneError}</Text>}
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={updateAddressForCurrentUser}
        style={{
          backgroundColor: "#FFB648",
          height: 55,
          justifyContent: "center",
          width: "100%",
          bottom: 0,
          position: "absolute",
        }}
      >
        <Text style={{ textAlign: "center", color: "white", fontSize: 16 }}>
          Update address
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 60,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  errorText: {
    color: "red",
  },
  // ... (Other styles remain unchanged)
});

export default AddressScreen;
