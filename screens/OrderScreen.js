import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Path, Svg } from "react-native-svg";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Pending from "../component/Pending";
import Completed from "../component/Completed";
import { useSelector } from "react-redux";
const TopTab = createMaterialTopTabNavigator();

const OrderScreen = ({ navigation }) => {
  return (
    <>
      <View style={styles.orderContain}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("homeTab")}>
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
          <View>
            <Text style={{ fontSize: 20, fontFamily: "Red-Hat" }}>Orders</Text>
          </View>
          <View></View>
        </View>
      </View>

      <TopTab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: "orange",
          },
          tabBarActiveTintColor: "orange",
          tabBarLabelStyle: {
            color: "black",
            fontWeight: "600",
            fontFamily: "Red-Hat",
          },

          tabBarStyle: {
            marginHorizontal: 20,
            backgroundColor: "white",
            shadowColor: "white",
          },
        }}
      >
        <TopTab.Screen name="Pending" component={Pending} />
        <TopTab.Screen name="Completed" component={Completed} />
      </TopTab.Navigator>
    </>
  );
};
const styles = StyleSheet.create({
  orderContain: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navbar: {
    display: "flex",
    flexDirection: "row",
  },
});

export default OrderScreen;
