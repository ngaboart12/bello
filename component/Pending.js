// import { View, Text } from 'react-native'
// import React from 'react'

// const Pending = () => {
//   return (
//     <View>
//       <Text>Pending</Text>
//     </View>
//   )
// }

// export default Pending

// PendingOrdersScreen.js
// PendingOrdersScreen.js

// PendingOrdersScreen.js
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firestore = getFirestore();
const auth = getAuth();

const PendingOrdersScreen = () => {
  const [pendingOrders, setPendingOrders] = useState([]);

  useEffect(() => {
    const getCurrentUserOrders = async () => {
      // Get the current user's UID
      const userUid = auth.currentUser.uid;

      // Create a query to get orders for the current user with status 'pending'
      const q = query(
        collection(firestore, "orders"),
        where("status", "==", "pending"),
        where("customerUid", "==", userUid)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const orders = [];
        snapshot.forEach((doc) => {
          orders.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPendingOrders(orders);
      });

      return unsubscribe;
    };
    console.log(pendingOrders);

    getCurrentUserOrders();
  }, []);

  if (pendingOrders.length === 0) {
    return <Text>No orders placed</Text>;
  }

  return (
    <View style={{ paddingHorizontal: 24, gap: 10 }}>
      {pendingOrders.map((order) => (
        <View key={order.id} style={{ marginBottom: 10 }}>
          <Text style={{ fontWeight: "bold" }}>Order ID: {order.id}</Text>
          <Text>Status: {order.status}</Text>
          <Text>Order Total: ${order.totalAmount}</Text>

          {/* Display products from the cart */}
          <Text style={{ marginTop: 5, fontWeight: "bold" }}>
            Products in Cart:
          </Text>
          {/* {pendingOrders.cart.map((product) => (
            <View key={product.productId} style={{ marginLeft: 10 }}>
              <Text>{product.productName}</Text>
              <Text>Quantity: {product.quantity}</Text>
              <Text>Price: ${product.price}</Text>
            </View>
          ))} */}
        </View>
      ))}
    </View>
  );
};

export default PendingOrdersScreen;
